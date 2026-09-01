#!/usr/bin/env node

/**
 * Build the browser-ready word data from Alex's source workbooks.
 *
 * The source workbooks are read only.  This script intentionally uses the
 * bundled Python/pandas runtime for extraction because it is also available
 * on the desktop used to regenerate this static site.  No workbook is copied
 * into the repository.
 */
import { spawnSync } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outputDir = path.join(root, 'data');
const schoolPath = process.argv[2] || process.env.ALEX_SCHOOL_XLSX;
const houhaiPath = process.argv[3] || process.env.ALEX_HOUHAI_XLSX;
const python = process.env.ALEX_EDUCATION_PYTHON || 'python3';

if (!schoolPath || !houhaiPath) {
  throw new Error('Pass the school and Houhai workbook paths as arguments, or set ALEX_SCHOOL_XLSX and ALEX_HOUHAI_XLSX.');
}

const extractor = String.raw`
import json
import sys
import unicodedata
import pandas as pd

def text(value):
    if value is None or (isinstance(value, float) and pd.isna(value)):
        return ''
    return unicodedata.normalize('NFC', str(value).strip())

def read_book(module, filename):
    frame = pd.read_excel(filename, sheet_name='单词表', dtype=object)
    rows = []
    for _, row in frame.iterrows():
        source = {str(column): text(row[column]) for column in frame.columns}
        source['序号'] = int(row['序号'])
        rows.append({'module': module, 'source': source})
    return rows

print(json.dumps(read_book('school', sys.argv[1]) + read_book('houhai', sys.argv[2]), ensure_ascii=False))
`;

const result = spawnSync(python, ['-c', extractor, schoolPath, houhaiPath], { encoding: 'utf8' });
if (result.error) throw result.error;
if (result.status !== 0) throw new Error(result.stderr || `word extraction failed with status ${result.status}`);

const extracted = JSON.parse(result.stdout);
const aliasRules = {
  school: {
    'maths (=mathematics, AmE math)': ['maths', 'mathematics', 'math'],
    'PE (=physical education)': ['PE', 'physical education'],
    'life (pl. lives)': ['life', 'lives'],
    'bike (=bicycle)': ['bike', 'bicycle'],
    'UK (=United Kingdom)': ['UK', 'United Kingdom'],
    'UN (=United Nations)': ['UN', 'United Nations'],
    'Olympics (= the Olympic Games)': ['Olympics', 'the Olympic Games'],
  },
  houhai: {
    'follow (the) directions': ['follow directions', 'follow the directions'],
    'go past (the traffic lights)': ['go past', 'go past the traffic lights'],
    'turn left/right': ['turn left', 'turn right'],
    'shopping centre (AmE shopping center)': ['shopping centre', 'shopping center'],
    'programme (AmE program)': ['programme', 'program'],
    'neighbourhood (AmE neighborhood)': ['neighbourhood', 'neighborhood'],
    'transport (AmE transportation)': ['transport', 'transportation'],
    'organisation (AmE organization)': ['organisation', 'organization'],
  },
};

function canonicalWord(module, rawWord) {
  const explicit = aliasRules[module]?.[rawWord];
  if (explicit) return explicit[0];
  // Parenthetical source annotations are display metadata, not answer text.
  return rawWord.replace(/\s*\([^)]*\)/g, '').trim();
}

function mapRecord(item) {
  const { module, source } = item;
  const rawWord = source['单词'];
  const explicitAnswers = aliasRules[module]?.[rawWord];
  const answer = canonicalWord(module, rawWord);
  const answerVariants = [...new Set((explicitAnswers || [answer]).map(value => value.normalize('NFC')))].filter(Boolean);
  const base = {
    id: `${module}:${source['序号']}`,
    module,
    sourceIndex: source['序号'],
    word: rawWord,
    answer,
    answerVariants,
    answerLength: answer.length,
    maxAnswerLength: Math.max(...answerVariants.map(value => value.length)),
    pronunciation: source[module === 'school' ? '注音' : '音标'],
    partOfSpeech: source['词性'],
    meaning: source['中文含义'],
    englishExample: source[module === 'school' ? '例句' : '英文例句'],
    chineseExample: source['例句中文解释'],
    unit: source['所属Unit'],
    topic: source['单元主题'],
    lesson: source['所属Lesson'],
    source,
  };
  if (module === 'school') base.lessonTitle = source['课文题目'];
  if (module === 'houhai') base.category = source['词汇类别'];
  return base;
}

const school = extracted.filter(item => item.module === 'school').map(mapRecord);
const houhai = extracted.filter(item => item.module === 'houhai').map(mapRecord);
if (school.length !== 173) throw new Error(`school source count ${school.length}, expected 173`);
if (houhai.length !== 223) throw new Error(`houhai source count ${houhai.length}, expected 223`);
for (const [module, rows] of [['school', school], ['houhai', houhai]]) {
  rows.forEach((row, index) => {
    if (row.sourceIndex !== index + 1) throw new Error(`${module} row ${index + 1} has source index ${row.sourceIndex}`);
    if (!row.id || !row.word || !row.answer || !row.meaning || !row.englishExample || !row.chineseExample) {
      throw new Error(`${module} row ${index + 1} has an empty required field`);
    }
  });
}

const normalizationSource = `// Generated by scripts/build-word-data.mjs. Do not edit by hand.\n(function (root, factory) {\n  const api = factory();\n  if (typeof module === 'object' && module.exports) module.exports = api;\n  if (root) root.AnswerNormalization = api;\n}(typeof globalThis !== 'undefined' ? globalThis : this, function () {\n  const explicit = ${JSON.stringify(aliasRules, null, 2)};\n  const quoteMap = /[‘’‚‛]/g;\n  const doubleQuoteMap = /[“”„‟]/g;\n  const hyphenMap = /[\\u2010-\\u2015\\u2212\\uFE58\\uFE63\\uFF0D]/g;\n  function normalizeAnswer(value) {\n    return String(value == null ? '' : value)\n      .normalize('NFKC')\n      .replace(quoteMap, "'")\n      .replace(doubleQuoteMap, '\"')\n      .replace(hyphenMap, ' ')\n      .toLowerCase()\n      .trim()\n      .replace(/\\s+/g, ' ');\n  }\n  function explicitVariants(module, rawWord) {\n    return explicit[module] && explicit[module][rawWord] ? [...explicit[module][rawWord]] : [];\n  }\n  function variantsFor(module, entry) {\n    if (entry && Array.isArray(entry.answerVariants) && entry.answerVariants.length) return entry.answerVariants;\n    const rawWord = typeof entry === 'string' ? entry : entry?.word;\n    const answer = typeof entry === 'string' ? entry : entry?.answer;\n    return explicitVariants(module, rawWord).length ? explicitVariants(module, rawWord) : [answer || rawWord || ''];\n  }\n  function matches(module, entry, input) {\n    const candidate = normalizeAnswer(input);\n    return Boolean(candidate) && variantsFor(module, entry).some(value => normalizeAnswer(value) === candidate);\n  }\n  return { explicit, normalizeAnswer, variantsFor, matches };\n}));\n`;

const normalizationOutput = normalizationSource.replace(
  "const hyphenMap = /[\\u2010-\\u2015\\u2212\\uFE58\\uFE63\\uFF0D]/g;",
  "const hyphenMap = /[-\\u2010-\\u2015\\u2212\\uFE58\\uFE63\\uFF0D]/g;",
);

function dataSource(name, data) {
  return `// Generated by scripts/build-word-data.mjs. Do not edit by hand.\n(function (root, factory) {\n  const data = factory();\n  if (typeof module === 'object' && module.exports) module.exports = data;\n  if (root) root.${name} = data;\n}(typeof globalThis !== 'undefined' ? globalThis : this, function () {\n  return ${JSON.stringify(data, null, 2)};\n}));\n`;
}

await mkdir(outputDir, { recursive: true });
await writeFile(path.join(outputDir, 'school-words.js'), dataSource('SchoolWords', school), 'utf8');
await writeFile(path.join(outputDir, 'houhai-words.js'), dataSource('HouhaiWords', houhai), 'utf8');
await writeFile(path.join(outputDir, 'answer-normalization.js'), normalizationOutput, 'utf8');
console.log(JSON.stringify({ school: school.length, houhai: houhai.length, outputDir }, null, 2));
