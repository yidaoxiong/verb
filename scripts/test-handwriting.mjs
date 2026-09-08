#!/usr/bin/env node
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { readFile } from 'node:fs/promises';

const require = createRequire(import.meta.url);
const handwriting = require('../data/handwriting-logic.js');
const practice = require('../data/practice-logic.js');
const [appSource, pageSource] = await Promise.all([readFile(new URL('../app.js', import.meta.url), 'utf8'), readFile(new URL('../index.html', import.meta.url), 'utf8')]);

const first = handwriting.createBoard();
assert.equal(handwriting.hasInk(first), false, 'empty canvas cannot submit');
assert.equal(handwriting.canSubmit('first', first, { checked: false, current: true }), false);
first.strokes.push([{ x: 0.1, y: 0.2, pressure: 0.5 }]);
assert.equal(handwriting.hasInk(first), true);
assert.equal(handwriting.canSubmit('first', first, { checked: false, current: true }), true);
assert.equal(handwriting.canWrite('first', { checked: true, current: true }), false);
assert.equal(handwriting.undo(first), true);
assert.equal(handwriting.hasInk(first), false);
first.strokes.push([{ x: 0.2, y: 0.3, pressure: 0.5 }]);
handwriting.clear(first);
assert.equal(handwriting.hasInk(first), false, 'clear removes all in-memory strokes');

const second = handwriting.createBoard();
assert.equal(handwriting.canWrite('second', { checked: true, selfAssessment: null, submitted: false, current: true }), false);
assert.equal(handwriting.canWrite('second', { checked: true, selfAssessment: false, submitted: false, current: true }), true);
assert.equal(handwriting.canSubmit('second', second, { checked: true, selfAssessment: false, submitted: false, current: true }), false);
second.strokes.push([{ x: 0.4, y: 0.5, pressure: 0.7 }]);
assert.equal(handwriting.canSubmit('second', second, { checked: true, selfAssessment: true, submitted: false, current: true }), true);
assert.equal(handwriting.canWrite('second', { checked: true, selfAssessment: true, submitted: true, current: true }), false);

assert.deepEqual(handwriting.canvasSize(390, 160, 2), { width: 390, height: 160, ratio: 2, pixelWidth: 780, pixelHeight: 320 });
assert.deepEqual(handwriting.canvasSize(0, 0, 0), { width: 1, height: 1, ratio: 1, pixelWidth: 1, pixelHeight: 1 });
assert.equal(handwriting.supportedPointerType('pen'), true);
assert.equal(handwriting.supportedPointerType('touch'), false, 'touch must keep normal scrolling/clicking');
assert.equal(handwriting.supportedPointerType('mouse'), false, 'mouse must keep normal clicking');
assert.equal(handwriting.shouldCapturePointer('pen'), true, 'Apple Pencil pointer is captured');
assert.equal(handwriting.shouldCapturePointer('touch'), false, 'touch pointer is not captured');
assert.equal(handwriting.shouldCapturePointer('mouse'), false, 'mouse pointer is not captured');
assert.match(appSource, /pointerType === 'pen'/, 'UI capture is pen-only');
assert.match(appSource, /handwritingOverlay/, 'UI uses a full-page handwriting overlay');
assert.doesNotMatch(pageSource, /vocabInputMode|handwriting-canvas|secondHandwritingCanvas/, 'no handwriting mode switch or boxed canvas remains');
assert.equal(practice.canRateVocabulary('school', true, false), false);
assert.equal(practice.canRateVocabulary('school', true, true), true);
assert.equal(practice.metrics(0, 61000, 17).accuracy, 85, 'second handwriting does not alter first-answer accuracy');

console.log('handwriting tests passed: empty/undo/clear, self-assessment and second gating, DPR sizing, pen-only capture, and first metrics');
