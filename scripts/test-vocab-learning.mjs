import assert from 'node:assert/strict';
import { DatabaseSync } from 'node:sqlite';
import { createHash } from 'node:crypto';
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';
import { onRequestGet, onRequestPost, scheduleReviews } from '../functions/api/vocab-progress.js';
const require = createRequire(import.meta.url);
const logic = require('../data/practice-logic.js');
const school = require('../data/school-words.js');
const houhai = require('../data/houhai-words.js');

export function testDatabase() {
  const sqlite = new DatabaseSync(':memory:');
  let batches = Promise.resolve();
  const db = {
    prepare(sql) {
      let args = [];
      return {
        bind(...values) { args = values; return this; },
        async run() { return sqlite.prepare(sql).run(...args); },
        async first() { return sqlite.prepare(sql).get(...args) || null; },
        async all() { return { results: sqlite.prepare(sql).all(...args) }; }
      };
    },
    batch(statements) {
      const job = batches.then(async () => {
        sqlite.exec('BEGIN');
        try { const result = []; for (const statement of statements) result.push(await statement.run()); sqlite.exec('COMMIT'); return result; }
        catch (error) { sqlite.exec('ROLLBACK'); throw error; }
      });
      batches = job.catch(() => {});
      return job;
    }
  };
  sqlite.exec("CREATE TABLE users (id TEXT PRIMARY KEY, username TEXT UNIQUE, password_hash TEXT, password_salt TEXT, password_scheme TEXT); CREATE TABLE auth_sessions (token_hash TEXT PRIMARY KEY, user_id TEXT, expires_at TEXT);");
  for (const id of ['test-a', 'test-b']) {
    sqlite.prepare('INSERT INTO users VALUES (?, ?, ?, ?, ?)').run(id, id, 'unused', 'unused', 'client-v1');
    sqlite.prepare('INSERT INTO auth_sessions VALUES (?, ?, ?)').run(createHash('sha256').update(id).digest('base64url'), id, '2999-01-01T00:00:00.000Z');
  }
  return { db, sqlite };
}
export async function runTests() {
  const { db, sqlite } = testDatabase();
  const post = (body, user = 'test-a') => onRequestPost({ env: { DB: db }, request: new Request('https://test/api/vocab-progress', { method: 'POST', headers: { Cookie: 'slashbro_session=' + user, 'content-type': 'application/json' }, body: JSON.stringify(body) }) });
  const get = user => onRequestGet({ env: { DB: db }, request: new Request('https://test/api/vocab-progress', { headers: user ? { Cookie: 'slashbro_session=' + user } : {} }) });
  assert.equal((await get()).status, 401);
  const event = { reviewId: crypto.randomUUID(), itemId: 'school:1', rating: 'again' };
  assert.equal((await post({ ...event, itemId: 'school:174' })).status, 400);
  const first = await (await post(event)).json();
  assert.equal(first.card.intervalDays, 0);
  assert(Math.abs(Date.parse(first.card.dueAt) - Date.now() - 600000) < 3000);
  await post(event);
  assert.equal(sqlite.prepare('SELECT COUNT(*) n FROM english_vocab_reviews').get().n, 1);
  assert.equal((await post(event, 'test-b')).status, 409);
  assert.deepEqual((await (await get('test-b')).json()).cards, []);
  const good = await (await post({ ...event, reviewId: crypto.randomUUID(), rating: 'good' })).json();
  const easy = await (await post({ ...event, reviewId: crypto.randomUUID(), rating: 'easy' })).json();
  assert(easy.card.intervalDays > good.card.intervalDays);
  assert.equal((await (await get('test-a')).json()).cards[0].intervalDays, easy.card.intervalDays);

  const state = { units: new Set(), lessons: new Set() };
  logic.selectUnits(school, state, ['Unit One']);
  assert.deepEqual([...state.lessons], ['Unit One::Lesson 1', 'Unit One::Lesson 2', 'Unit One::Lesson 3', 'Unit One::Lesson 4']);
  logic.selectUnits(school, state, ['Unit Two']);
  assert([...state.lessons].every(key => key.startsWith('Unit Two::')));
  logic.selectUnits(houhai, state, ['Unit 7', 'Unit 8']);
  assert.equal(state.lessons.size, 6);
  logic.selectLessons(houhai, state, false);
  assert.equal(state.lessons.size, 0);
  logic.selectLessons(houhai, state, true);
  assert.equal(state.lessons.size, 6);
  const now = Date.now();
  const cards = { 'school:1': { dueAt: new Date(now - 1000).toISOString() }, 'school:2': { dueAt: new Date(now + 86400000).toISOString() } };
  const queue = logic.scheduledQueue(school, cards, n => n - 1, now);
  assert.equal(queue[0].id, 'school:1');
  assert(!queue.some(word => word.id === 'school:2'));
  assert.equal(queue.length, 20);
  const small = logic.scheduledQueue(school.slice(0, 6), cards, n => n - 1, now);
  assert.equal(small.length, 20);
  assert.equal(new Set(small.slice(0,6).map(word=>word.id)).size, 6);
  for (let i=1;i<small.length;i++) assert.notEqual(small[i].id,small[i-1].id);
  assert.deepEqual(scheduleReviews([]), {});
  console.log('v2.1 API SQLite tests passed: auth isolation, idempotency, persistence, intervals, filtering, and 20-question scheduling');
  sqlite.close();
}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) await runTests();
