import { ensureAuthTables, getSessionUser } from './_auth.js';

const GOAL_START = '2026-09-01';
const GOAL_END = '2027-01-17';
const MODULES = new Set(['verb', 'school', 'houhai']);
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

const json = (payload, status = 200) => new Response(JSON.stringify(payload), {
  status,
  headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
});

function validDate(value) {
  if (typeof value !== 'string' || !DATE_RE.test(value)) return false;
  const [year, month, day] = value.split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day;
}

function inGoal(value) {
  return validDate(value) && value >= GOAL_START && value <= GOAL_END;
}

function validTimestamp(value) {
  if (typeof value !== 'string' || value.length > 80) return false;
  return Number.isFinite(Date.parse(value));
}

function roundSpeed(elapsedSeconds) {
  return Math.round((20 * 60 / elapsedSeconds) * 10) / 10;
}

function sessionView(row) {
  return {
    sessionId: row.id,
    module: row.module,
    studyDate: row.study_date,
    startedAt: row.started_at,
    completedAt: row.completed_at,
    elapsedSeconds: Number(row.elapsed_seconds),
    speed: Number(row.speed),
    accuracy: Number(row.accuracy),
    questionCount: Number(row.question_count),
  };
}

export async function ensureCheckinTables(db) {
  await db.batch([
    db.prepare(`CREATE TABLE IF NOT EXISTS english_practice_sessions (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      module TEXT NOT NULL,
      study_date TEXT NOT NULL,
      started_at TEXT NOT NULL,
      completed_at TEXT NOT NULL,
      elapsed_seconds INTEGER NOT NULL,
      speed REAL NOT NULL,
      accuracy INTEGER NOT NULL,
      question_count INTEGER NOT NULL,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )`),
    db.prepare(`CREATE TABLE IF NOT EXISTS english_practice_answers (
      session_id TEXT NOT NULL,
      user_id TEXT NOT NULL,
      question_index INTEGER NOT NULL,
      question_id TEXT NOT NULL,
      is_correct INTEGER NOT NULL,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (session_id, question_index)
    )`),
    db.prepare('CREATE INDEX IF NOT EXISTS english_practice_sessions_user_date_idx ON english_practice_sessions(user_id, study_date)'),
    db.prepare('CREATE INDEX IF NOT EXISTS english_practice_sessions_user_completed_idx ON english_practice_sessions(user_id, completed_at)'),
    db.prepare('CREATE INDEX IF NOT EXISTS english_practice_answers_user_idx ON english_practice_answers(user_id, session_id)'),
  ]);
}

function parseAnswers(value) {
  if (!Array.isArray(value) || value.length !== 20) return { error: '每次打卡必须恰好完成20道题。' };
  const answers = [];
  for (let index = 0; index < value.length; index += 1) {
    const item = value[index];
    if (!item || typeof item !== 'object' || typeof item.questionId !== 'string' || item.questionId.length < 1 || item.questionId.length > 160) {
      return { error: '题目记录格式不正确。' };
    }
    const correct = typeof item.correct === 'boolean' ? item.correct : item.isCorrect;
    if (typeof correct !== 'boolean') return { error: '题目正确率记录格式不正确。' };
    // Only these fields are retained.  In particular, the actual typed answer
    // is deliberately neither accepted into the database nor echoed back.
    answers.push({ questionIndex: index + 1, questionId: item.questionId, correct });
  }
  return { answers };
}

function parseSession(body) {
  if (!body || typeof body !== 'object') return { error: '请求无效。' };
  const sessionId = body.sessionId;
  const module = body.module;
  const studyDate = body.studyDate ?? body.date;
  if (typeof sessionId !== 'string' || !UUID_RE.test(sessionId)) return { error: 'sessionId 必须是有效 UUID。' };
  if (typeof module !== 'string' || !MODULES.has(module)) return { error: '学习模块不正确。' };
  if (!inGoal(studyDate)) return { error: `打卡日期必须在 ${GOAL_START} 至 ${GOAL_END} 之间。` };

  const elapsedSeconds = Number.isInteger(body.elapsedSeconds) ? body.elapsedSeconds : body.elapsed;
  if (!Number.isInteger(elapsedSeconds) || elapsedSeconds < 1 || elapsedSeconds > 7 * 86400) return { error: '用时必须是有效的整数秒数。' };
  const parsedAnswers = parseAnswers(body.answers);
  if (parsedAnswers.error) return parsedAnswers;

  const completedAt = body.completedAt ?? new Date().toISOString();
  if (!validTimestamp(completedAt)) return { error: '完成时间格式不正确。' };
  const startedAt = body.startedAt ?? new Date(Date.parse(completedAt) - elapsedSeconds * 1000).toISOString();
  if (!validTimestamp(startedAt)) return { error: '开始时间格式不正确。' };
  if (Date.parse(startedAt) > Date.parse(completedAt)) return { error: '开始时间不能晚于完成时间。' };

  const correctCount = parsedAnswers.answers.filter(answer => answer.correct).length;
  return {
    sessionId,
    module,
    studyDate,
    startedAt: new Date(startedAt).toISOString(),
    completedAt: new Date(completedAt).toISOString(),
    elapsedSeconds,
    speed: roundSpeed(elapsedSeconds),
    accuracy: Math.round(correctCount / 20 * 100),
    answers: parsedAnswers.answers,
  };
}

export async function onRequestGet({ request, env }) {
  await ensureAuthTables(env.DB);
  await ensureCheckinTables(env.DB);
  const user = await getSessionUser(request, env.DB);
  if (!user) return json({ error: '请先登录。' }, 401);

  const url = new URL(request.url);
  const from = url.searchParams.get('from') || GOAL_START;
  const to = url.searchParams.get('to') || GOAL_END;
  if (!validDate(from) || !validDate(to) || from > to) return json({ error: '日期范围不正确。' }, 400);
  const { results } = await env.DB.prepare(`SELECT id, module, study_date, started_at, completed_at,
      elapsed_seconds, speed, accuracy, question_count
      FROM english_practice_sessions
      WHERE user_id = ? AND study_date >= ? AND study_date <= ?
      ORDER BY completed_at ASC, id ASC`).bind(user.id, from, to).all();
  return json({ goal: { startDate: GOAL_START, endDate: GOAL_END, days: 139 }, sessions: results.map(sessionView) });
}

export async function onRequestPost({ request, env }) {
  try {
    await ensureAuthTables(env.DB);
    await ensureCheckinTables(env.DB);
    const user = await getSessionUser(request, env.DB);
    if (!user) return json({ error: '请先登录。' }, 401);
    const body = await request.json().catch(() => null);
    const parsed = parseSession(body);
    if (parsed.error) return json({ error: parsed.error }, 400);

    const existing = await env.DB.prepare(`SELECT id, module, study_date, started_at, completed_at,
        elapsed_seconds, speed, accuracy, question_count
        FROM english_practice_sessions WHERE id = ? AND user_id = ? LIMIT 1`).bind(parsed.sessionId, user.id).first();
    if (existing) return json({ ok: true, idempotent: true, session: sessionView(existing) });
    const occupied = await env.DB.prepare('SELECT id FROM english_practice_sessions WHERE id = ? LIMIT 1').bind(parsed.sessionId).first();
    if (occupied) return json({ error: 'sessionId 已被使用。' }, 409);

    const statements = [env.DB.prepare(`INSERT INTO english_practice_sessions
      (id, user_id, module, study_date, started_at, completed_at, elapsed_seconds, speed, accuracy, question_count)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 20)`).bind(
      parsed.sessionId, user.id, parsed.module, parsed.studyDate, parsed.startedAt, parsed.completedAt,
      parsed.elapsedSeconds, parsed.speed, parsed.accuracy,
    )];
    for (const answer of parsed.answers) {
      statements.push(env.DB.prepare(`INSERT INTO english_practice_answers
        (session_id, user_id, question_index, question_id, is_correct)
        VALUES (?, ?, ?, ?, ?)`).bind(parsed.sessionId, user.id, answer.questionIndex, answer.questionId, answer.correct ? 1 : 0));
    }
    await env.DB.batch(statements);
    const saved = await env.DB.prepare(`SELECT id, module, study_date, started_at, completed_at,
        elapsed_seconds, speed, accuracy, question_count
        FROM english_practice_sessions WHERE id = ? AND user_id = ? LIMIT 1`).bind(parsed.sessionId, user.id).first();
    return json({ ok: true, idempotent: false, session: sessionView(saved) }, 201);
  } catch {
    return json({ error: '打卡记录暂时无法保存，请稍后重试。' }, 503);
  }
}

// Exported only to make the validation contract directly testable in the
// local test runner; Cloudflare Pages ignores the named helpers at runtime.
export { inGoal, parseSession, roundSpeed };
