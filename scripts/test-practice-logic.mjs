#!/usr/bin/env node
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const logic = require('../data/practice-logic.js');
const school = require('../data/school-words.js');
const houhai = require('../data/houhai-words.js');

const deterministicRandom = limit => limit - 1;
for (const [module, pool] of [['verb', Array.from({ length: 150 }, (_, i) => ({ id: `verb:${i + 1}` }))], ['school', school], ['houhai', houhai]]) {
  const queue = logic.buildVocabQueue(pool, deterministicRandom);
  assert.equal(queue.length, 20, `${module} fixed 20 questions`);
  assert.equal(new Set(queue.map(item => item.id)).size, Math.min(20, pool.length), `${module} pool uniqueness`);
}

const smallPool = [{ id: 'a' }, { id: 'b' }, { id: 'c' }];
const smallQueue = logic.buildVocabQueue(smallPool, () => 0);
assert.equal(smallQueue.length, 20);
for (let index = 1; index < smallQueue.length; index += 1) assert.notEqual(smallQueue[index].id, smallQueue[index - 1].id, 'round boundary must not repeat');

assert.deepEqual(logic.metrics(1000, 1000, 0), { elapsedSeconds: 1, speed: 1200, accuracy: 0, correctCount: 0 });
assert.deepEqual(logic.metrics(0, 61000, 17), { elapsedSeconds: 61, speed: 19.7, accuracy: 85, correctCount: 17 });

console.log('practice logic ok: three modules fixed 20-question queues, round boundaries, and metrics verified');
