#!/usr/bin/env node
import assert from 'node:assert/strict';
import { DatabaseSync } from 'node:sqlite';
import { createHash } from 'node:crypto';
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';
import { onRequestGet, onRequestPost, parseSession } from '../functions/api/checkins.js';
import { validReview } from '../functions/api/vocab-progress.js';

const require = createRequire(import.meta.url);
const logic = require('../data/practice-logic.js');
const normalization = require('../data/answer-normalization.js');
const school = require('../data/school-words.js');
const hash = value => createHash('sha256').update(value).digest('base64url');

function testDatabase() {
  const sqlite = new DatabaseSync(':memory:');
  let batches = Promise.resolve();
  const db = {
    prepare(sql) {
      let args = [];
      return {
        bind(...values) { args = values; return this; },
        async run() { return sqlite.prepare(sql).run(...args); },
        async first() { return sqlite.prepare(sql).get(...args) || null; },
        async all() { return { results: sqlite.prepare(sql).all(...args) }; },
      };
    },
    batch(statements) {
      const job = batches.then(async () => {
        sqlite.exec('BEGIN');
        try {
          const result = [];
          for (const statement of statements) result.push(await statement.run());
          sqlite.exec('COMMIT');
          return result;
        } catch (error) {
          sqlite.exec('ROLLBACK');
          throw error;
        }
      });
      batches = job.catch(() => {});
      return job;
    },
  };
  sqlite.exec('CREATE TABLE users (id TEXT PRIMARY KEY, username TEXT UNIQUE, password_hash TEXT, password_salt TEXT, password_scheme TEXT); CREATE TABLE auth_sessions (token_hash TEXT PRIMARY KEY, user_id TEXT, expires_at TEXT);');
  for (const id of ['test-a', 'test-b']) {
    sqlite.prepare('INSERT INTO users VALUES (?, ?, ?, ?, ?)').run(id, id, 'unused', 'unused', 'client-v1');
    sqlite.prepare('INSERT INTO auth_sessions VALUES (?, ?, ?)').run(hash(id), id, '2999-01-01T00:00:00.000Z');
  }
  return { db, sqlite };
}

function request(body, method = 'POST', user = 'test-a', includeQuestions = false) {
  const url = includeQuestions ? 'https://test/api/checkins?from=2026-09-01&to=2026-09-02&include=questions' : 'https://test/api/checkins';
  return new Request(url, {
    method,
    headers: { Cookie: `slashbro_session=${user}`, 'content-type': 'application/json' },
    ...(method === 'POST' ? { body: JSON.stringify(body) } : {}),
  });
}

function payload(sessionId, completedAt, scopes) {
  return {
    sessionId,
    module: 'school',
    studyDate: '2026-09-01',
    startedAt: completedAt,
    completedAt,
    elapsedSeconds: 60,
    answers: Array.from({ length: 20 }, (_, index) => ({ questionId: index === 19 ? 'school:unknown' : `school:${index + 1}`, correct: index < 10 })),
    ...(scopes === undefined ? {} : { scopes }),
  };
}

const firstId = '8c2e5d62-6423-4df6-9d9f-9e4e4c6b9d31';
const secondId = '7b1f4c51-5312-4ce5-8c8e-8d3d3b5a8c20';
const firstPayload = payload(firstId, '2026-09-01T10:01:00.000Z', [{ unit: 'Unit One', lesson: '基础练习' }, { unit: 'Unit One', lesson: '基础练习' }]);
const secondPayload = payload(secondId, '2026-09-01T11:01:00.000Z');
assert.deepEqual(parseSession(firstPayload).scopes, [{ unit: 'Unit One', lesson: '基础练习' }]);
assert.equal(parseSession(payload(firstId, '2026-09-01T10:01:00.000Z', [{ unit: '', lesson: '基础练习' }])).error, '学习范围记录格式不正确。');

const { db, sqlite } = testDatabase();
const post = body => onRequestPost({ env: { DB: db }, request: request(body) });
const firstResponse = await post(firstPayload);
assert.equal(firstResponse.status, 201);
assert.deepEqual((await firstResponse.json()).session.scopes, [{ unit: 'Unit One', lesson: '基础练习' }], 'saved response keeps actual scope labels');
const replayResponse = await post(firstPayload);
assert.equal(replayResponse.status, 200, 'same payload is idempotent');
const replayBody = await replayResponse.json();
assert.equal(replayBody.idempotent, true);
assert.deepEqual(replayBody.session.scopes, [{ unit: 'Unit One', lesson: '基础练习' }], 'idempotent response keeps scope labels');
assert.equal(sqlite.prepare('SELECT COUNT(*) AS n FROM english_practice_answers').get().n, 20);
assert.equal(sqlite.prepare('SELECT COUNT(*) AS n FROM english_practice_session_scopes').get().n, 1, 'duplicate scope is ignored');
assert.equal((await post(secondPayload)).status, 201, 'legacy payload without scopes remains valid');
assert.equal(sqlite.prepare('SELECT COUNT(*) AS n FROM english_practice_sessions WHERE study_date = ? AND module = ?').get('2026-09-01', 'school').n, 2, 'same day and module keeps both sessions');

const detail = await (await onRequestGet({ env: { DB: db }, request: request(null, 'GET', 'test-a', true) })).json();
assert.equal(detail.sessions.length, 2);
assert.equal(detail.sessions[0].questions.length, 20);
assert.deepEqual(detail.sessions[0].scopes, [{ unit: 'Unit One', lesson: '基础练习' }]);
assert.deepEqual(detail.sessions[1].scopes, []);
assert.equal(detail.sessions[1].questions.at(-1).questionId, 'school:unknown');
assert.equal((await onRequestGet({ env: { DB: db }, request: new Request('https://test/api/checkins?from=2026-09-01&to=2026-09-08&include=questions', { headers: { Cookie: 'slashbro_session=test-a' } }) })).status, 400);
assert.deepEqual((await (await onRequestGet({ env: { DB: db }, request: request(null, 'GET', 'test-b', true) })).json()).sessions, []);

assert.equal(validReview({ reviewId: crypto.randomUUID(), itemId: 'school:185', rating: 'good' }), true);
assert.equal(validReview({ reviewId: crypto.randomUUID(), itemId: 'school:186', rating: 'good' }), false);
assert.equal(logic.canRateVocabulary('school', false, false, false), false);
assert.equal(logic.canRateVocabulary('school', true, true, false), true, 'correct first answer can rate immediately');
assert.equal(logic.canRateVocabulary('school', true, false, false), false, 'wrong first answer requires correction');
assert.equal(logic.canRateVocabulary('school', true, false, true), true, 'one correction unlocks rating');
assert.equal(logic.canRateVocabulary('houhai', true, true, false), true);
assert.equal(logic.canRateVocabulary('verb', true, false, false), true);
const sentence = school.find(entry => entry.id === 'school:181');
assert(logic.isSentenceCard(sentence));
assert.deepEqual(logic.sentenceParts(sentence).map(part => part.answers.length), [1, 1]);
assert.deepEqual(logic.metrics(0, 61000, 17), { elapsedSeconds: 61, speed: 19.7, accuracy: 85, correctCount: 17 });
assert.equal(normalization.matches('school', school.find(entry => entry.id === 'school:185'), 'I LIKE FOLK DANCE BEST'), true);

sqlite.close();
console.log('v2.2.1 tests passed: PDF cards, scope persistence, legacy/idempotent check-ins, repeated sessions, conditional correction, and first-answer metrics');

if (process.argv[1] && import.meta.url !== pathToFileURL(process.argv[1]).href) process.exitCode = 0;
