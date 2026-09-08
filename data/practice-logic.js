// Small deterministic-friendly helpers shared by the browser and local tests.
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.PracticeLogic = api;
}(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  function shuffle(items, randomIndex = limit => Math.floor(Math.random() * limit)) {
    const result = [...items];
    for (let index = result.length - 1; index > 0; index -= 1) {
      const target = randomIndex(index + 1);
      [result[index], result[target]] = [result[target], result[index]];
    }
    return result;
  }

  function buildVocabQueue(pool, randomIndex) {
    if (!Array.isArray(pool) || !pool.length) return [];
    if (pool.length >= 20) return shuffle(pool, randomIndex).slice(0, 20);
    const result = [];
    let previous = null;
    while (result.length < 20) {
      const round = shuffle(pool, randomIndex);
      if (previous && round.length > 1 && round[0].id === previous.id) [round[0], round[1]] = [round[1], round[0]];
      for (const entry of round) {
        if (result.length >= 20) break;
        result.push(entry);
        previous = entry;
      }
    }
    return result;
  }

  function metrics(startedAt, completedAt, correctCount) {
    const elapsedSeconds = Math.max(1, Math.round((completedAt - startedAt) / 1000));
    return { elapsedSeconds, speed: Math.round((20 * 60 / elapsedSeconds) * 10) / 10, accuracy: Math.round(correctCount / 20 * 100), correctCount };
  }

  function lessonKey(word) { return word.unit + '::' + word.lesson; }
  function isVocabModule(module) { return module === 'school' || module === 'houhai'; }
  function isSentenceCard(entry) { return entry?.cardType === 'sentence' || Array.isArray(entry?.sentenceParts); }
  function sentenceParts(entry) {
    if (isSentenceCard(entry) && Array.isArray(entry.sentenceParts)) return entry.sentenceParts;
    return [{ prompt: entry?.chineseExample || '', answers: Array.isArray(entry?.answerVariants) ? entry.answerVariants : [entry?.answer || entry?.word || ''] }];
  }
  function requiresSecondInput(module) { return isVocabModule(module); }
  function canRateVocabulary(module, firstSubmitted, secondSubmitted) {
    return Boolean(firstSubmitted) && (!requiresSecondInput(module) || Boolean(secondSubmitted));
  }
  function selectUnits(source, state, units) {
    state.units = new Set(units);
    state.lessons = new Set(source.filter(word => state.units.has(word.unit)).map(lessonKey));
  }
  function selectLessons(source, state, all) {
    state.lessons = new Set(all ? source.filter(word => state.units.has(word.unit)).map(lessonKey) : []);
  }
  function scheduledQueue(pool, cards, randomIndex, now = Date.now(), count = 20) {
    if (!pool.length) return [];
    const due = [], fresh = [], future = [];
    for (const word of pool) {
      const card = cards[word.id];
      if (!card) fresh.push(word);
      else if (Date.parse(card.dueAt) <= now) due.push(word);
      else future.push(word);
    }
    const byDue = (a, b) => Date.parse(cards[a.id].dueAt) - Date.parse(cards[b.id].dueAt);
    due.sort(byDue);
    future.sort(byDue);
    const ordered = [...due, ...shuffle(fresh, randomIndex), ...future];
    const result = [];
    // Complete a full pass before repeating; failed cards lead each later pass.
    while (result.length < count) {
      const round = [...ordered];
      if (round.length > 1 && result.at(-1)?.id === round[0].id) [round[0], round[1]] = [round[1], round[0]];
      result.push(...round.slice(0, count - result.length));
    }
    return result;
  }
  return { shuffle, buildVocabQueue, metrics, lessonKey, selectUnits, selectLessons, scheduledQueue, isVocabModule, isSentenceCard, sentenceParts, requiresSecondInput, canRateVocabulary };
}));
