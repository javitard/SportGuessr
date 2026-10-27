// Player history and profile stats. Kept separate from the game so the same history
// can later be synced to an account (phase 2) without changing how stats are computed.
//
// History format, saved in localStorage under STORE_HISTORY (and, later, in the cloud):
//   [{ v: 2, day, date: "2026-10-22", practice: false, score,
//      rounds: [{ id: "q0042", sport, level, km, points, glat, glng }] }]
// `id` is the question's permanent id; `glat`/`glng` is where the player dropped the pin.
// `points` is the answer's precision (0–1,000, see scoring.js). `score` is the day total:
// out of 1,000 from v2, out of 5,000 in v1, so use gameScore() rather than reading it.
window.Profile = (() => {
  "use strict";

  const STORE_HISTORY = "sg_history_v1";
  const MIN_ANSWERS_FOR_SPORT = 3;   // before a sport can be called strongest / weakest

  function loadHistory() {
    try {
      const h = JSON.parse(localStorage.getItem(STORE_HISTORY));
      return Array.isArray(h) ? h : [];
    } catch {
      return [];
    }
  }

  function saveHistory(history) {
    try { localStorage.setItem(STORE_HISTORY, JSON.stringify(history)); } catch { /* ignore */ }
  }

  // Adds a finished game. A daily puzzle is only ever recorded once.
  function addGame({ day, date, practice, questions, guesses }) {
    const history = loadHistory();
    if (!practice && history.some((g) => !g.practice && g.day === day)) return history;
    const round2 = (x) => Math.round(x * 1000) / 1000;
    history.push({
      v: 2,
      day,
      date,
      practice: !!practice,
      score: window.Scoring.total(guesses.map((g) => g.points)),
      rounds: questions.map((q, i) => ({
        id: q.id,
        sport: q.sport,
        level: q.level,
        km: Math.round(guesses[i].km * 10) / 10,
        points: guesses[i].points,
        glat: round2(guesses[i].lat),
        glng: round2(guesses[i].lng)
      }))
    });
    saveHistory(history);
    return history;
  }

  const average = (xs) => (xs.length ? Math.round(xs.reduce((a, b) => a + b, 0) / xs.length) : 0);
  const gameScore = (g) => window.Scoring.total(g.rounds.map((r) => r.points));

  // Achievements are checked against the whole history plus the running stats.
  const ACHIEVEMENTS = [
    { key: "kickoff", test: (h) => h.some((g) => !g.practice) },
    { key: "bullseye", test: (h) => h.some((g) => g.rounds.some((r) => r.points >= 1000)) },
    { key: "hattrick", test: (h) => h.some((g) => g.rounds.filter((r) => r.points >= 900).length >= 3) },
    { key: "cleansheet", test: (h) => h.some((g) => g.rounds.length === 5 && g.rounds.every((r) => r.points >= 250)) },
    { key: "club800", test: (h) => h.some((g) => !g.practice && gameScore(g) >= 800) },
    { key: "week", goal: 7, progress: (h, s) => s.maxStreak },
    {
      key: "allrounder",
      goal: 8,
      progress: (h) => new Set(h.flatMap((g) => g.rounds.filter((r) => r.points >= 600).map((r) => r.sport))).size
    },
    { key: "marathon", goal: 30, progress: (h, s) => s.played }
  ];

  // Everything the profile screen shows, from history + stats + the question bank.
  function compute(history, stats, questionsById) {
    const rounds = history.flatMap((g) => g.rounds);

    const sportMap = new Map();
    for (const r of rounds) {
      if (!sportMap.has(r.sport)) sportMap.set(r.sport, []);
      sportMap.get(r.sport).push(r.points);
    }
    // Listed by how often they've come up; strongest/weakest by average.
    const bySport = [...sportMap.entries()]
      .map(([sport, pts]) => ({ sport, n: pts.length, avg: average(pts) }))
      .sort((a, b) => b.n - a.n || b.avg - a.avg);
    const ranked = bySport.filter((s) => s.n >= MIN_ANSWERS_FOR_SPORT).sort((a, b) => b.avg - a.avg);

    const byLevel = [1, 2, 3].map((level) => {
      const pts = rounds.filter((r) => r.level === level).map((r) => r.points);
      return { level, n: pts.length, avg: average(pts) };
    });

    const pins = rounds
      .map((r) => {
        const q = questionsById.get(r.id);
        return q ? { lat: q.lat, lng: q.lng, points: r.points } : null;
      })
      .filter(Boolean);

    const achievements = ACHIEVEMENTS.map((a) => {
      if (a.goal) {
        const value = Math.min(a.goal, a.progress(history, stats));
        return { key: a.key, unlocked: value >= a.goal, value, goal: a.goal };
      }
      return { key: a.key, unlocked: a.test(history, stats) };
    });

    return {
      answers: rounds.length,
      bySport,
      strongest: ranked.length >= 2 ? ranked[0] : null,
      weakest: ranked.length >= 2 ? ranked[ranked.length - 1] : null,
      byLevel,
      pins,
      achievements
    };
  }

  return { loadHistory, addGame, compute, ACHIEVEMENTS, STORE_HISTORY };
})();
