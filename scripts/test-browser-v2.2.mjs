#!/usr/bin/env node
import assert from 'node:assert/strict';
import http from 'node:http';
import path from 'node:path';
import { readFile } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { testDatabase } from './test-vocab-learning.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const playwrightEntry = process.argv[2] || process.env.PLAYWRIGHT_ENTRY;
const browserExecutable = process.argv[3] || process.env.BROWSER_EXECUTABLE;
const screenshotPath = process.argv[4] || '';
if (!playwrightEntry || !browserExecutable) {
  throw new Error('Pass Playwright entry and browser executable paths, or set PLAYWRIGHT_ENTRY and BROWSER_EXECUTABLE.');
}

const { chromium } = await import(pathToFileURL(playwrightEntry).href);
const { db, sqlite } = testDatabase();
const api = Object.fromEntries(await Promise.all(['auth', 'progress', 'checkins', 'vocab-progress'].map(async name => [
  name,
  await import(pathToFileURL(path.join(root, 'functions', 'api', `${name}.js`)).href),
])));

const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8', '.json': 'application/json; charset=utf-8' };
const server = http.createServer(async (request, response) => {
  try {
    const url = new URL(request.url, 'http://127.0.0.1');
    if (url.pathname === '/favicon.ico') { response.writeHead(204); response.end(); return; }
    if (url.pathname.startsWith('/api/')) {
      const handler = api[url.pathname.slice(5)];
      if (!handler) { response.writeHead(404); response.end(); return; }
      let body = '';
      for await (const chunk of request) body += chunk;
      const headers = { ...request.headers, cookie: 'slashbro_session=test-a' };
      const webRequest = new Request(url, { method: request.method, headers, ...(body ? { body } : {}) });
      const result = await handler[request.method === 'POST' ? 'onRequestPost' : 'onRequestGet']({ request: webRequest, env: { DB: db } });
      response.writeHead(result.status, Object.fromEntries(result.headers));
      response.end(await result.text());
      return;
    }
    const relative = url.pathname === '/' ? 'index.html' : decodeURIComponent(url.pathname).replace(/^\/+/, '');
    const filename = path.resolve(root, relative);
    if (!filename.startsWith(root + path.sep) && filename !== path.join(root, 'index.html')) { response.writeHead(403); response.end(); return; }
    const content = await readFile(filename);
    response.writeHead(200, { 'content-type': types[path.extname(filename)] || 'text/plain; charset=utf-8' });
    response.end(content);
  } catch (error) {
    response.writeHead(error?.code === 'ENOENT' ? 404 : 500);
    response.end(String(error));
  }
});
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));

const browser = await chromium.launch({ headless: true, executablePath: browserExecutable, args: ['--no-sandbox'] });
const page = await browser.newPage({ viewport: { width: 1024, height: 768 } });
const errors = [];
page.on('pageerror', error => errors.push(String(error)));
page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });

async function inkPixels() {
  return page.locator('#handwritingOverlay').evaluate(canvas => {
    const pixels = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height).data;
    let count = 0;
    for (let index = 3; index < pixels.length; index += 4) if (pixels[index]) count += 1;
    return count;
  });
}

async function drawWithPen() {
  const panel = await page.locator('#studyPanel').boundingBox();
  assert(panel, 'study panel must be visible');
  // At tablet width the centred card leaves a wide study-panel gutter. Using
  // that blank area verifies drawing without accidentally tapping a control.
  const x = panel.x + 35;
  const y = panel.y + Math.min(panel.height - 80, Math.max(170, panel.height * 0.44));
  const cdp = await page.context().newCDPSession(page);
  await cdp.send('Input.dispatchMouseEvent', { type: 'mousePressed', x, y, button: 'left', buttons: 1, pointerType: 'pen', force: 0.5 });
  await cdp.send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: x + 45, y: y + 18, button: 'left', buttons: 1, pointerType: 'pen', force: 0.65 });
  await cdp.send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: x + 82, y: y - 5, button: 'left', buttons: 1, pointerType: 'pen', force: 0.7 });
  await cdp.send('Input.dispatchMouseEvent', { type: 'mouseReleased', x: x + 82, y: y - 5, button: 'left', buttons: 0, pointerType: 'pen', force: 0 });
}

async function fillCurrent(stage) {
  await page.evaluate(stageName => {
    const sentence = globalThis.PracticeLogic.isSentenceCard(current);
    if (sentence) {
      const target = stageName === 'first' ? '#sentenceFirstInputs' : '#sentenceSecondInputs';
      const inputs = [...document.querySelectorAll(`${target} .sentence-card-input`)];
      globalThis.PracticeLogic.sentenceParts(current).forEach((part, index) => {
        inputs[index].value = part.answers[0];
        inputs[index].dispatchEvent(new Event('input', { bubbles: true }));
      });
      return;
    }
    const target = stageName === 'first' ? '#letterInputs' : '#secondLetterInputs';
    const letters = [...globalThis.AnswerNormalization.variantsFor(currentModule, current)[0].replace(/[^a-z0-9]/gi, '')];
    const inputs = [...document.querySelectorAll(`${target} .letter-cell`)];
    inputs.forEach((input, index) => {
      input.value = letters[index] || '';
      input.dispatchEvent(new Event('input', { bubbles: true }));
    });
  }, stage);
}

async function fillWrongCurrent() {
  await page.evaluate(() => {
    const sentence = globalThis.PracticeLogic.isSentenceCard(current);
    const selector = sentence ? '#sentenceFirstInputs .sentence-card-input' : '#letterInputs .letter-cell';
    document.querySelectorAll(selector).forEach(input => {
      input.value = sentence ? 'not the answer' : 'x';
      input.dispatchEvent(new Event('input', { bubbles: true }));
    });
  });
}

async function answerCopyState() {
  return page.evaluate(() => {
    if (globalThis.PracticeLogic.isSentenceCard(current)) {
      const rows = [...document.querySelectorAll('#sentenceAnswerList .sentence-answer')];
      return {
        kind: 'sentence',
        valid: rows.length > 0 && rows.every(row => row.firstElementChild?.tagName === 'STRONG'
          && row.lastElementChild?.tagName === 'SPAN'
          && row.firstElementChild.textContent.trim()
          && row.lastElementChild.textContent.trim()),
      };
    }
    const english = document.querySelector('#vocabEnglishExample');
    const chinese = document.querySelector('#vocabChineseExampleAnswer');
    return {
      kind: 'word',
      valid: Boolean(english?.textContent.trim() && chinese?.textContent.trim()
        && (english.compareDocumentPosition(chinese) & Node.DOCUMENT_POSITION_FOLLOWING)),
    };
  });
}

async function rateVocabularyAndWait() {
  const before = await page.locator('#studyCount').innerText();
  await page.locator('[data-vocab-rating="good"]').click();
  await page.waitForFunction(previous => {
    const complete = !document.querySelector('#completeState')?.classList.contains('hidden');
    const nextVisible = !document.querySelector('#revealAnswerButton')?.classList.contains('hidden')
      && document.querySelector('#studyCount')?.textContent !== previous;
    return complete || nextVisible;
  }, before);
}

try {
  await page.goto(`http://127.0.0.1:${server.address().port}/`, { waitUntil: 'networkidle' });
  await page.waitForFunction(() => globalThis.SchoolWords?.length === 185 && document.querySelector('#accountButton')?.textContent === 'test-a');
  assert.equal(await page.locator('.version').innerText(), 'v2.2.1');
  assert.equal(await page.locator('#vocabChineseExample').count(), 0, 'word question must not contain the Chinese example');
  assert.equal(await page.locator('#handwritingOverlay').evaluate(element => getComputedStyle(element).pointerEvents), 'none');
  assert.equal(await page.locator('#handwritingOverlay').evaluate(element => getComputedStyle(element).backgroundColor), 'rgba(0, 0, 0, 0)');

  const unitFilters = page.locator('#schoolUnitFilters');
  await unitFilters.getByRole('button', { name: '全部取消', exact: true }).click();
  await unitFilters.getByLabel('Unit One', { exact: true }).check();
  const lessonFilters = page.locator('#schoolLessonFilters');
  assert.equal(await lessonFilters.locator('input').count(), 5);
  await lessonFilters.getByRole('button', { name: '全部取消', exact: true }).click();
  await lessonFilters.getByLabel('基础练习', { exact: true }).check();
  await page.locator('#startSchoolButton').click();
  await page.waitForSelector('#studyPanel:not(.hidden)');

  const initialStatus = await page.locator('#handwritingStatus').innerText();
  const panel = await page.locator('#studyPanel').boundingBox();
  await page.mouse.move(panel.x + 50, panel.y + 180);
  await page.mouse.down();
  await page.mouse.move(panel.x + 120, panel.y + 200);
  await page.mouse.up();
  assert.equal(await page.locator('#handwritingStatus').innerText(), initialStatus, 'mouse must not draw');
  assert.equal(await inkPixels(), 0, 'mouse must leave ink layer empty');

  let sawWordAnswer = false;
  let sawSentenceAnswer = false;
  const recordAnswerCopy = async () => {
    const state = await answerCopyState();
    assert.equal(state.valid, true, `${state.kind} answer must show English before its Chinese translation`);
    if (state.kind === 'word') sawWordAnswer = true;
    else sawSentenceAnswer = true;
  };

  await drawWithPen();
  assert.match(await page.locator('#handwritingStatus').innerText(), /已书写 1 笔/);
  assert((await inkPixels()) > 0, 'pen stroke must render');
  await page.setViewportSize({ width: 1024, height: 820 });
  await page.waitForTimeout(50);
  assert((await inkPixels()) > 0, 'current ink must survive viewport resize');
  await page.locator('#revealAnswerButton').click();
  await page.waitForSelector('#handwritingSelfAssessment:not(.hidden)');
  assert(await page.locator('#vocabSecondCheck').evaluate(element => element.classList.contains('hidden')), 'second input stays hidden before handwritten self-assessment');
  assert((await inkPixels()) > 0, 'first handwriting stays visible for comparison');
  await recordAnswerCopy();
  if (screenshotPath) await page.screenshot({ path: screenshotPath.replace(/\.png$/i, '-study.png'), fullPage: true });
  await page.locator('#handwritingFirstCorrectButton').click();
  await page.waitForSelector('#vocabRatings:not(.hidden)');
  assert(await page.locator('#vocabSecondCheck').evaluate(element => element.classList.contains('hidden')), 'correct handwriting skips correction');
  assert((await inkPixels()) > 0, 'correct handwriting remains visible while rating');
  await rateVocabularyAndWait();

  await drawWithPen();
  await page.locator('#revealAnswerButton').click();
  await page.waitForSelector('#handwritingSelfAssessment:not(.hidden)');
  await recordAnswerCopy();
  await page.locator('#handwritingFirstNeedsCorrectionButton').click();
  await page.waitForSelector('#vocabSecondCheck:not(.hidden)');
  assert.equal(await inkPixels(), 0, 'second-writing stage starts with a clean layer');
  await drawWithPen();
  await page.locator('#secondAnswerButton').click();
  await page.waitForSelector('#vocabRatings:not(.hidden)');
  await rateVocabularyAndWait();

  await fillWrongCurrent();
  await page.locator('#revealAnswerButton').click();
  await recordAnswerCopy();
  assert.match(await page.locator('#resultText').innerText(), /首次回答有误/);
  await page.waitForSelector('#vocabSecondCheck:not(.hidden)');
  assert(await page.locator('#vocabRatings').evaluate(element => element.classList.contains('hidden')), 'wrong first answer must block rating');
  await fillCurrent('second');
  await page.locator('#secondAnswerButton').click();
  await page.waitForSelector('#vocabRatings:not(.hidden)');
  await rateVocabularyAndWait();

  for (let answered = 3; answered < 20; answered += 1) {
    await fillCurrent('first');
    await page.locator('#revealAnswerButton').click();
    await recordAnswerCopy();
    assert.match(await page.locator('#resultText').innerText(), /首次回答正确/);
    assert(await page.locator('#vocabSecondCheck').evaluate(element => element.classList.contains('hidden')), 'correct first answer skips correction');
    await page.waitForSelector('#vocabRatings:not(.hidden)');
    await rateVocabularyAndWait();
  }
  assert.equal(sawWordAnswer, true, 'word answer translation flow was exercised');
  assert.equal(sawSentenceAnswer, true, 'sentence answer translation flow was exercised');
  await page.waitForSelector('#completeState:not(.hidden)');
  assert.match(await page.locator('#completeMetrics').innerText(), /90/);
  await page.locator('#completeBackButton').click();
  await page.waitForSelector('#analyticsPanel:not(.hidden)');
  assert.match(await page.locator('#historyRows').innerText(), /Unit One · 基础练习/);

  await page.reload({ waitUntil: 'networkidle' });
  await page.waitForFunction(() => document.querySelector('#historyRows')?.innerText.includes('查看 20 题记录'));
  assert.match(await page.locator('#historyRows').innerText(), /Unit One · 基础练习/);

  await page.locator('#startHouhaiButton').click();
  await page.waitForSelector('#studyPanel:not(.hidden)');
  await fillCurrent('first');
  await page.locator('#revealAnswerButton').click();
  assert.deepEqual(await answerCopyState(), { kind: 'word', valid: true }, 'Houhai answer shows English followed by Chinese translation');
  assert(await page.locator('#vocabSecondCheck').evaluate(element => element.classList.contains('hidden')), 'correct Houhai answer skips correction');
  await page.waitForSelector('#vocabRatings:not(.hidden)');
  await rateVocabularyAndWait();
  await page.locator('#backButton').click();

  await page.locator('#startVerbButton').click();
  await drawWithPen();
  assert((await inkPixels()) > 0, 'verb module accepts pen strokes');
  await page.locator('#revealAnswerButton').click();
  await page.waitForSelector('#verbHandwritingSelfAssessment:not(.hidden)');
  assert((await inkPixels()) > 0, 'verb handwriting remains visible with answer');
  await page.locator('#handwritingClearButton').click();
  assert.equal(await inkPixels(), 0, 'clear remains available after reveal');
  await page.locator('#verbHandwritingFirstCorrectButton').click();
  await page.waitForSelector('#ratingBlock:not(.hidden)');
  await page.locator('[data-rating="good"]').click();
  await page.locator('#backButton').click();

  const widths = [];
  for (const width of [390, 320]) {
    await page.setViewportSize({ width, height: 760 });
    await page.waitForTimeout(50);
    widths.push({ width, scrollWidth: await page.evaluate(() => document.documentElement.scrollWidth) });
    assert((await page.evaluate(() => document.documentElement.scrollWidth)) <= width, `${width}px viewport must not overflow`);
  }
  if (screenshotPath) {
    await page.setViewportSize({ width: 1024, height: 820 });
    await page.screenshot({ path: screenshotPath, fullPage: true });
  }

  assert.equal(sqlite.prepare('SELECT COUNT(*) AS count FROM english_practice_sessions').get().count, 1);
  assert.equal(sqlite.prepare('SELECT COUNT(*) AS count FROM english_practice_answers').get().count, 20);
  assert.equal(sqlite.prepare('SELECT COUNT(*) AS count FROM english_practice_session_scopes').get().count, 1);
  assert.deepEqual(errors, []);
  console.log(JSON.stringify({ passed: true, schoolQuestions: 20, schoolCount: 185, widths }));
} finally {
  await browser.close();
  await new Promise(resolve => server.close(resolve));
  sqlite.close();
}
