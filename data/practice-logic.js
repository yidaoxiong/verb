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

  return { shuffle, buildVocabQueue, metrics };
}));
