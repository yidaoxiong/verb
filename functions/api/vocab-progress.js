import { ensureAuthTables, getSessionUser } from './_auth.js';

const json = (body, status = 200) => new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' } });
const ratings = ['again', 'hard', 'good', 'easy'];
export function validReview(body) {
  const match = /^(school|houhai):([1-9]\d*)$/.exec(body?.itemId || '');
  return Boolean(match && Number(match[2]) <= (match[1] === 'school' ? 173 : 223)
    && /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(body.reviewId || '')
    && ratings.includes(body.rating));
}

// Anki-style interval scheduling. Review events are immutable and replayable;
// duplicate delivery never advances the interval a second time.
export function scheduleReviews(events) {
  const cards = {};
  for (const event of events) {
    const old = cards[event.item_id] || { repetitions: 0, easeFactor: 2.5, intervalDays: 0 };
    const rating = event.rating;
    let repetitions = old.repetitions + 1;
    let easeFactor = Math.max(1.3, old.easeFactor + (rating === 'easy' ? 0.15 : rating === 'hard' ? -0.15 : rating === 'again' ? -0.2 : 0));
    let intervalDays = repetitions === 1 ? (rating === 'easy' ? 4 : rating === 'hard' ? 1 : 2)
      : Math.max(1, Math.round(Math.max(1, old.intervalDays) * easeFactor * (rating === 'hard' ? 0.75 : rating === 'easy' ? 1.3 : 1)));
    if (rating === 'again') { repetitions = 0; intervalDays = 0; }
    cards[event.item_id] = { itemId: event.item_id, repetitions, easeFactor, intervalDays, rating,
      dueAt: new Date(Date.parse(event.reviewed_at) + (rating === 'again' ? 600000 : intervalDays * 86400000)).toISOString() };
  }
  return cards;
}

async function ensure(db) {
  await db.batch([
    db.prepare('CREATE TABLE IF NOT EXISTS english_vocab_reviews (sequence INTEGER PRIMARY KEY AUTOINCREMENT, review_id TEXT NOT NULL UNIQUE, user_id TEXT NOT NULL, item_id TEXT NOT NULL, rating TEXT NOT NULL, reviewed_at TEXT NOT NULL)'),
    db.prepare('CREATE INDEX IF NOT EXISTS english_vocab_reviews_user_item ON english_vocab_reviews(user_id, item_id, sequence)')
  ]);
}
export async function onRequestGet({ request, env }) {
  try {
    await ensureAuthTables(env.DB);
    const user = await getSessionUser(request, env.DB);
    if (!user) return json({ error: '请先登录。' }, 401);
    await ensure(env.DB);
    const { results } = await env.DB.prepare('SELECT item_id, rating, reviewed_at FROM english_vocab_reviews WHERE user_id = ? ORDER BY sequence').bind(user.id).all();
    return json({ cards: Object.values(scheduleReviews(results)) });
  } catch { return json({ error: '词汇复习记录暂时无法读取，请稍后重试。' }, 503); }
}
export async function onRequestPost({ request, env }) {
  try {
    await ensureAuthTables(env.DB);
    const user = await getSessionUser(request, env.DB);
    if (!user) return json({ error: '请先登录。' }, 401);
    const body = await request.json().catch(() => null);
    if (!validReview(body)) return json({ error: '无效的词汇复习记录。' }, 400);
    await ensure(env.DB);
    await env.DB.prepare('INSERT OR IGNORE INTO english_vocab_reviews (review_id, user_id, item_id, rating, reviewed_at) VALUES (?, ?, ?, ?, ?)').bind(body.reviewId, user.id, body.itemId, body.rating, new Date().toISOString()).run();
    const event = await env.DB.prepare('SELECT user_id, item_id, rating FROM english_vocab_reviews WHERE review_id = ?').bind(body.reviewId).first();
    if (event.user_id !== user.id || event.item_id !== body.itemId || event.rating !== body.rating) return json({ error: '复习编号已被使用。' }, 409);
    const { results } = await env.DB.prepare('SELECT item_id, rating, reviewed_at FROM english_vocab_reviews WHERE user_id = ? AND item_id = ? ORDER BY sequence').bind(user.id, body.itemId).all();
    return json({ card: scheduleReviews(results)[body.itemId] });
  } catch { return json({ error: '词汇复习记录暂时无法保存，请重试。' }, 503); }
}

