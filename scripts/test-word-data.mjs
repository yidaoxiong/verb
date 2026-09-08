#!/usr/bin/env node
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const school = require('../data/school-words.js');
const houhai = require('../data/houhai-words.js');
const normalization = require('../data/answer-normalization.js');

function checkRows(rows, module, expectedCount) {
  assert.equal(rows.length, expectedCount, `${module} count`);
  assert.equal(new Set(rows.map(row => row.id)).size, expectedCount, `${module} stable ids`);
  rows.forEach((row, index) => {
    assert.equal(row.id, `${module}:${index + 1}`);
    assert.equal(row.sourceIndex, index + 1);
    for (const field of ['word', 'answer', 'meaning', 'pronunciation', 'partOfSpeech', 'englishExample', 'chineseExample', 'unit', 'lesson']) {
      assert.ok(row[field], `${module}:${index + 1} ${field}`);
      assert.equal(row[field], row[field].normalize('NFC'), `${module}:${index + 1} NFC`);
    }
    assert.ok(Array.isArray(row.answerVariants) && row.answerVariants.length > 0);
    assert.equal(row.maxAnswerLength, Math.max(...row.answerVariants.map(value => value.length)));
  });
}

checkRows(school, 'school', 185);
checkRows(houhai, 'houhai', 223);
assert.deepEqual(school.slice(0, 173).map(row => row.id), Array.from({ length: 173 }, (_, index) => `school:${index + 1}`));
assert.deepEqual(school.slice(-12).map(row => row.id), Array.from({ length: 12 }, (_, index) => `school:${index + 174}`));
assert.deepEqual(school.slice(173, 180).map(row => row.word), ['famous', 'better', 'hobby', 'travel', 'good idea', 'watch films', 'folk dance']);
assert.deepEqual(school.slice(173, 180).map(row => row.englishExample), [
  'Animal World is a famous TV programme.',
  'Which one do you like better?',
  'Watching films is my hobby.',
  'I like to travel with my family.',
  'That is a good idea.',
  'I like to watch films at weekends.',
  'I like folk dance best.',
]);
assert.equal(school[173].unit, 'Unit One');
assert.equal(school[173].lesson, '基础练习');
assert.equal(school.filter(row => row.cardType === 'sentence').length, 5);
assert.deepEqual(school.filter(row => row.cardType === 'sentence').map(row => row.id), ['school:181', 'school:182', 'school:183', 'school:184', 'school:185']);
assert.deepEqual(houhai.filter(row => row.answer === 'opinion').map(row => row.id), ['houhai:101', 'houhai:184']);
assert.deepEqual(houhai.filter(row => row.answer === 'review').map(row => row.id), ['houhai:137', 'houhai:138']);
assert.deepEqual(houhai.filter(row => row.answer === 'taste').map(row => row.id), ['houhai:195', 'houhai:196']);

const byWord = (rows, raw) => rows.find(row => row.word === raw);
for (const [raw, answers] of [
  ['maths (=mathematics, AmE math)', ['maths', 'mathematics', 'math']],
  ['PE (=physical education)', ['PE', 'physical education']],
  ['life (pl. lives)', ['life', 'lives']],
  ['bike (=bicycle)', ['bike', 'bicycle']],
  ['UK (=United Kingdom)', ['UK', 'United Kingdom']],
  ['UN (=United Nations)', ['UN', 'United Nations']],
  ['Olympics (= the Olympic Games)', ['Olympics', 'the Olympic Games']],
]) assert.deepEqual(byWord(school, raw).answerVariants, answers);
for (const [raw, answers] of [
  ['follow (the) directions', ['follow directions', 'follow the directions']],
  ['go past (the traffic lights)', ['go past', 'go past the traffic lights']],
  ['turn left/right', ['turn left', 'turn right']],
  ['shopping centre (AmE shopping center)', ['shopping centre', 'shopping center']],
  ['programme (AmE program)', ['programme', 'program']],
  ['neighbourhood (AmE neighborhood)', ['neighbourhood', 'neighborhood']],
  ['transport (AmE transportation)', ['transport', 'transportation']],
  ['organisation (AmE organization)', ['organisation', 'organization']],
]) assert.deepEqual(byWord(houhai, raw).answerVariants, answers);

assert.equal(normalization.normalizeAnswer('  Follow-the directions  '), 'follow the directions');
assert.equal(normalization.normalizeAnswer('“Centre”'), '"centre"');
assert.equal(normalization.matches('school', byWord(school, 'maths (=mathematics, AmE math)'), 'MATHEMATICS'), true);
assert.equal(normalization.matches('houhai', byWord(houhai, 'follow (the) directions'), 'follow the directions'), true);
assert.equal(normalization.matches('houhai', byWord(houhai, 'follow (the) directions'), 'follow directions'), true);
assert.equal(normalization.matches('houhai', byWord(houhai, 'follow (the) directions'), 'follow the'), false);
assert.equal(normalization.normalizeAnswer(' I like folk dance best. '), 'i like folk dance best');
assert.equal(normalization.matches('school', school.find(row => row.id === 'school:185'), 'i like folk dance best'), true);
assert.deepEqual(school.find(row => row.id === 'school:184').sentenceParts[0].answers, ['I like to travel.', 'I like travelling.']);

console.log('word data ok: school=185 (173 stable + 12 PDF supplement), houhai=223, explicit variants and duplicate identities verified');
