#!/usr/bin/env node
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { onRequestGet, onRequestPost, parseSession } from '../functions/api/checkins.js';

const hash = value => createHash('sha256').update(value).digest('base64url');

class FakeStatement {
  constructor(db, sql) { this.db = db; this.sql = sql; this.args = []; }
  bind(...args) { this.args = args; return this; }
  async first() {
    if (this.sql.startsWith('PRAGMA table_info(users)')) return { results: [{ name: 'password_scheme' }] };
    if (this.sql.includes('FROM auth_sessions JOIN users')) {
      const [tokenHash] = this.args;
      const session = this.db.authSessions.find(item => item.token_hash === tokenHash && item.expires_at > new Date().toISOString());
      return session ? this.db.users.find(user => user.id === session.user_id) || null : null;
    }
    if (this.sql.includes('FROM english_practice_sessions WHERE id = ? AND user_id = ?')) {
      const [id, userId] = this.args;
      return this.db.sessions.find(item => item.id === id && item.user_id === userId) || null;
    }
    if (this.sql.includes('FROM english_practice_sessions WHERE id = ? LIMIT 1')) {
      const [id] = this.args;
      return this.db.sessions.find(item => item.id === id) || null;
    }
    return null;
  }
  async all() {
    if (this.sql.startsWith('PRAGMA table_info(users)')) return { results: [{ name: 'password_scheme' }] };
    if (this.sql.includes('FROM english_practice_sessions')) {
      const [userId, from, to] = this.args;
      return { results: this.db.sessions.filter(item => item.user_id === userId && item.study_date >= from && item.study_date <= to) };
    }
    return { results: [] };
  }
  async run() { return { success: true }; }
}

class FakeDB {
  constructor() {
    this.users = [{ id: 'user-1', username: 'alice' }, { id: 'user-2', username: 'bob' }];
    this.authSessions = [{ token_hash: hash('alice-token'), user_id: 'user-1', expires_at: '2999-01-01T00:00:00.000Z' }, { token_hash: hash('bob-token'), user_id: 'user-2', expires_at: '2999-01-01T00:00:00.000Z' }];
    this.sessions = [];
    this.answers = [];
  }
  prepare(sql) { return new FakeStatement(this, sql); }
  async batch(statements) {
    for (const statement of statements) {
      if (statement.sql.startsWith('INSERT INTO english_practice_sessions')) {
        const [id, userId, module, studyDate, startedAt, completedAt, elapsedSeconds, speed, accuracy] = statement.args;
        this.sessions.push({ id, user_id: userId, module, study_date: studyDate, started_at: startedAt, completed_at: completedAt, elapsed_seconds: elapsedSeconds, speed, accuracy, question_count: 20 });
      } else if (statement.sql.startsWith('INSERT INTO english_practice_answers')) {
        const [sessionId, userId, questionIndex, questionId, correct] = statement.args;
        this.answers.push({ session_id: sessionId, user_id: userId, question_index: questionIndex, question_id: questionId, is_correct: correct });
      }
    }
    return [];
  }
}

function context(db, token = 'alice-token') { return { request: new Request('https://verb.test/api/checkins', { headers: { cookie: `slashbro_session=${token}` } }), env: { DB: db } }; }
async function body(response) { return response.json(); }
function payload(overrides = {}) { return { sessionId: '8c2e5d62-6423-4df6-9d9f-9e4e4c6b9d31', module: 'school', studyDate: '2026-09-01', startedAt: '2026-09-01T10:00:00.000Z', completedAt: '2026-09-01T10:01:00.000Z', elapsedSeconds: 60, answers: Array.from({ length: 20 }, (_, index) => ({ questionId: `school:${index + 1}`, correct: index % 2 === 0 })), ...overrides }; }
async function post(db, data, token = 'alice-token') { const request = new Request('https://verb.test/api/checkins', { method: 'POST', headers: { cookie: `slashbro_session=${token}`, 'content-type': 'application/json' }, body: JSON.stringify(data) }); return onRequestPost({ request, env: { DB: db } }); }

const unauthDb = new FakeDB();
assert.equal((await onRequestGet({ request: new Request('https://verb.test/api/checkins'), env: { DB: unauthDb } })).status, 401);
assert.equal((await onRequestPost({ request: new Request('https://verb.test/api/checkins', { method: 'POST', body: '{}' }), env: { DB: unauthDb } })).status, 401);

const invalid = parseSession(payload({ module: 'math', answers: [] }));
assert.match(invalid.error, /模块/);
assert.match(parseSession(payload({ answers: payload().answers.slice(0, 19) })).error, /20/);
assert.match(parseSession(payload({ studyDate: '2026-08-31' })).error, /日期/);

const db = new FakeDB();
const created = await post(db, payload());
assert.equal(created.status, 201);
const createdBody = await body(created);
assert.equal(createdBody.session.accuracy, 50);
assert.equal(createdBody.session.speed, 20);
assert.equal(createdBody.session.questionCount, 20);
assert.equal(db.sessions.length, 1);
assert.equal(db.answers.length, 20);

const replay = await post(db, payload());
assert.equal(replay.status, 200);
assert.equal((await body(replay)).idempotent, true);
assert.equal(db.sessions.length, 1);
assert.equal(db.answers.length, 20);

assert.equal((await post(db, payload({ module: 'bad' }))).status, 400);
assert.equal((await post(db, payload({ answers: payload().answers.slice(0, 19) }))).status, 400);
assert.equal((await post(db, payload({ sessionId: 'not-a-uuid' }))).status, 400);
assert.equal((await post(db, payload({ elapsedSeconds: 0 }))).status, 400);
assert.equal((await post(db, payload({ studyDate: '2027-01-18' }))).status, 400);

assert.equal((await post(db, payload(), 'bob-token')).status, 409);
const bobData = await body(await onRequestGet(context(db, 'bob-token')));
assert.deepEqual(bobData.sessions, []);
const aliceData = await body(await onRequestGet(context(db, 'alice-token')));
assert.equal(aliceData.sessions.length, 1);
assert.equal(aliceData.sessions[0].sessionId, payload().sessionId);

console.log('checkins API ok: auth isolation, exact 20 validation, metrics, answers privacy, and idempotency verified');
