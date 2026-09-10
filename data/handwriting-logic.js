// In-memory helpers for the optional Apple Pencil ink layer used by all study modules.
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.HandwritingLogic = api;
}(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  function createBoard() { return { strokes: [], active: null }; }
  function hasInk(board) { return Boolean(board?.strokes?.some(stroke => Array.isArray(stroke) && stroke.length > 0)); }
  function clear(board) { if (!board) return; board.strokes = []; board.active = null; }
  function undo(board) { if (!board || !board.strokes?.length) return false; board.strokes.pop(); board.active = null; return true; }
  function canvasSize(cssWidth, cssHeight, devicePixelRatio = 1) {
    const width = Math.max(1, Math.round(Number(cssWidth) || 0));
    const height = Math.max(1, Math.round(Number(cssHeight) || 0));
    const ratio = Math.max(1, Math.min(4, Number(devicePixelRatio) || 1));
    return { width, height, ratio, pixelWidth: Math.max(1, Math.round(width * ratio)), pixelHeight: Math.max(1, Math.round(height * ratio)) };
  }
  function canWrite(stage, { checked = false, selfAssessment = null, submitted = false, current = true } = {}) {
    return Boolean(current) && (stage === 'first' ? !checked : checked && selfAssessment === false && !submitted);
  }
  function canSubmit(stage, board, state = {}) {
    return canWrite(stage, state) && hasInk(board);
  }
  function supportedPointerType(pointerType) { return pointerType === 'pen'; }
  function shouldCapturePointer(pointerType) { return supportedPointerType(pointerType); }
  return { createBoard, hasInk, clear, undo, canvasSize, canWrite, canSubmit, supportedPointerType, shouldCapturePointer };
}));
