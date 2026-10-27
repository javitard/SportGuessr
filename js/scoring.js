// Scoring rules, shared by the game and the profile.
//
// Each answer first gets a precision from 0 to 1,000 for how close the pin is:
// 1,000 within PERFECT_KM, then 1000 * e^(-km / DECAY_KM). The points it adds to the day
// are that precision applied to the question's maximum, which grows with a multiplier:
// 100 for the first question up to 300 for the last, so a perfect day is 1,000 points.
// Saved games keep only the precision, so their points can always be worked out again.
window.Scoring = (() => {
  "use strict";

  const PRECISION_MAX = 1000;
  const PERFECT_KM = 10;
  const DECAY_KM = 500;
  const BASE_POINTS = 100;
  const MULTIPLIERS = [1, 1.5, 2, 2.5, 3];
  const MAX_TOTAL = MULTIPLIERS.reduce((s, m) => s + m * BASE_POINTS, 0);   // 1,000

  function precisionFor(km) {
    if (km <= PERFECT_KM) return PRECISION_MAX;
    return Math.round(PRECISION_MAX * Math.exp(-km / DECAY_KM));
  }

  // Most a question can score, by its position in the game (0-based).
  function maxFor(round) {
    return BASE_POINTS * MULTIPLIERS[round];
  }

  function pointsFor(precision, round) {
    return Math.round((precision * maxFor(round)) / PRECISION_MAX);
  }

  // Day total from the precisions of the answers, in the order they were played.
  function total(precisions) {
    return precisions.reduce((s, p, i) => s + pointsFor(p, i), 0);
  }

  return { PRECISION_MAX, MULTIPLIERS, MAX_TOTAL, precisionFor, maxFor, pointsFor, total };
})();
