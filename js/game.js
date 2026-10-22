(() => {
  "use strict";

  // ── Config ──────────────────────────────────────────────
  const LAUNCH = Date.UTC(2026, 9, 22);   // Puzzle #1 (months are 0-based)
  const ROUNDS = 5;
  const MAX_POINTS = 1000;
  const PERFECT_KM = 10;                   // anything this close scores 1000
  const DECAY_KM = 500;                    // points = 1000 * e^(-km / DECAY_KM)
  const LEVEL_MIX = [2, 2, 1];             // easy, medium, hard questions per day
  const SEED = 0x5f0a7;
  const STORE_STATE = "sg_state_v1";
  const STORE_STATS = "sg_stats_v1";
  const STORE_LANG = "sg_lang";

  const SPORT_ICONS = {
    football: "⚽", tennis: "🎾", cycling: "🚴", motorsport: "🏎️", athletics: "🏃",
    olympics: "🏅", winter: "⛷️", rugby: "🏉", golf: "⛳", cricket: "🏏",
    boxing: "🥊", darts: "🎯", snooker: "🎱", "horse racing": "🏇", rowing: "🚣",
    sailing: "⛵", swimming: "🏊", equestrian: "🐎", climbing: "🧗",
    basketball: "🏀", "gaelic games": "🏑"
  };

  const $ = (id) => document.getElementById(id);

  // ── Language ────────────────────────────────────────────
  const LANGS = Object.keys(window.I18N);
  let lang = load(STORE_LANG, null);
  if (!LANGS.includes(lang)) {
    const prefs = navigator.languages || [navigator.language || "en"];
    lang = prefs.some((l) => l.toLowerCase().startsWith("es")) ? "es" : "en";
  }

  function t(key, vars = {}) {
    const text = window.I18N[lang][key] ?? window.I18N.en[key];
    return typeof text === "string" ? text.replace(/\{(\w+)\}/g, (_, k) => vars[k]) : text;
  }

  // Question text in the current language, falling back to English.
  function loc(q, field) {
    return (q[lang] && q[lang][field]) || q[field];
  }

  function num(n) {
    return n.toLocaleString(t("locale"));
  }

  function applyStaticTexts() {
    document.documentElement.lang = lang;
    document.title = t("title");
    document.querySelectorAll("[data-i18n]").forEach((el) => { el.textContent = t(el.dataset.i18n); });
    document.querySelectorAll("[data-i18n-html]").forEach((el) => { el.innerHTML = t(el.dataset.i18nHtml); });
    document.querySelectorAll("[data-i18n-aria]").forEach((el) => { el.setAttribute("aria-label", t(el.dataset.i18nAria)); });
    $("btn-lang").textContent = lang === "es" ? "EN" : "ES";
    $("sport-badge").dataset.practice = t("practiceTag");
    $("final-max").textContent = `/ ${num(ROUNDS * MAX_POINTS)}`;
  }

  // ── Seeded randomness & daily selection ─────────────────
  function mulberry32(a) {
    return () => {
      a |= 0; a = (a + 0x6d2b79f5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function shuffle(arr, rand) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  // Each pool is walked in a shuffled order; once exhausted, a new cycle
  // with a different shuffle starts. Same day → same questions for everyone.
  function pickFromPool(pool, index, salt) {
    const cycle = Math.floor(index / pool.length);
    const order = shuffle(pool, mulberry32(SEED + salt * 7919 + cycle * 104729));
    return order[index % pool.length];
  }

  // Every day gets the same difficulty mix, played from easiest to hardest.
  function questionsForDay(day) {
    const all = window.QUESTIONS.map((q, i) => ({ ...q, id: i }));
    const picks = [];
    // Skip repeats (possible where two shuffle cycles meet) and venues already used today.
    const take = (pool, count, salt) => {
      for (let i = (day - 1) * count, added = 0; added < count; i++) {
        const q = pickFromPool(pool, i, salt);
        if (picks.some((p) => p.id === q.id || haversineKm(p, q) < 1)) continue;
        picks.push(q);
        added++;
      }
    };
    LEVEL_MIX.forEach((count, i) => take(all.filter((q) => q.level === i + 1), count, i + 1));
    return picks;
  }

  function randomQuestions() {
    return shuffle(window.QUESTIONS.map((q, i) => ({ ...q, id: i })), Math.random)
      .slice(0, ROUNDS)
      .sort((a, b) => a.level - b.level);
  }

  // ── Dates ───────────────────────────────────────────────
  function todayKey(d = new Date()) {
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  }

  function dayNumber(d = new Date()) {
    const local = Date.UTC(d.getFullYear(), d.getMonth(), d.getDate());
    return Math.max(1, Math.floor((local - LAUNCH) / 86400000) + 1);
  }

  // ── Geo & scoring ───────────────────────────────────────
  function haversineKm(a, b) {
    const R = 6371;
    const toRad = (x) => (x * Math.PI) / 180;
    const dLat = toRad(b.lat - a.lat);
    const dLng = toRad(b.lng - a.lng);
    const h = Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
    return 2 * R * Math.asin(Math.min(1, Math.sqrt(h)));
  }

  function scoreFor(km) {
    if (km <= PERFECT_KM) return MAX_POINTS;
    return Math.round(MAX_POINTS * Math.exp(-km / DECAY_KM));
  }

  function tier(points) {
    if (points >= 900) return 4;
    if (points >= 600) return 3;
    if (points >= 250) return 2;
    return 1;
  }
  const TIER_EMOJI = { 4: "🟩", 3: "🟨", 2: "🟧", 1: "🟥" };

  function fmtKm(km) {
    if (km < 1) return `${Math.round(km * 1000)} m`;
    if (km < 10) return `${km.toFixed(1)} km`;
    return `${num(Math.round(km))} km`;
  }

  // ── Storage (fails gracefully in private mode) ──────────
  function load(key, fallback) {
    try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; }
  }
  function save(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* ignore */ }
  }

  const DEFAULT_STATS = { played: 0, total: 0, best: 0, streak: 0, maxStreak: 0, lastDay: 0, dist: [0, 0, 0, 0, 0] };

  function recordGame(day, total) {
    const s = { ...DEFAULT_STATS, ...load(STORE_STATS, {}) };
    if (s.lastDay === day) return s;
    s.played += 1;
    s.total += total;
    s.best = Math.max(s.best, total);
    s.streak = s.lastDay === day - 1 ? s.streak + 1 : 1;
    s.maxStreak = Math.max(s.maxStreak, s.streak);
    s.lastDay = day;
    s.dist[distBucket(total)] += 1;
    save(STORE_STATS, s);
    return s;
  }

  const DIST_LABELS = ["0–999", "1000–1999", "2000–2999", "3000–3999", "4000–5000"];
  function distBucket(total) { return Math.min(4, Math.floor(total / 1000)); }

  // ── Game state ──────────────────────────────────────────
  const game = {
    practice: false,
    day: dayNumber(),
    questions: [],
    guesses: [],          // { lat, lng, km, points }
    pending: null,        // L.LatLng of the unconfirmed guess
    revealed: false
  };

  // ── Map ─────────────────────────────────────────────────
  const dark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  const map = L.map("map", {
    center: [48, 12],
    zoom: 4,
    minZoom: 2,
    maxZoom: 10,
    preferCanvas: true,
    worldCopyJump: false,
    maxBounds: [[-85, -200], [85, 200]],
    maxBoundsViscosity: 1,
    zoomControl: false,
    attributionControl: true
  });
  L.control.zoom({ position: "topright" }).addTo(map);

  // Country shapes are bundled with the game (no tile server, no API key, no labels).
  const css = getComputedStyle(document.documentElement);
  L.geoJSON(topojson.feature(window.WORLD_TOPO, window.WORLD_TOPO.objects.countries), {
    interactive: false,
    style: {
      fillColor: css.getPropertyValue("--land").trim(),
      fillOpacity: 1,
      color: css.getPropertyValue("--land-border").trim(),
      weight: 0.8
    }
  }).addTo(map);
  map.attributionControl.addAttribution('Map data: <a href="https://www.naturalearthdata.com/">Natural Earth</a>');

  const layer = L.layerGroup().addTo(map);
  let pendingMarker = null;

  function pinIcon(kind, label) {
    return L.divIcon({
      className: "",
      html: `<div class="pin ${kind}"></div>${label ? `<div class="pin-label">${label}</div>` : ""}`,
      iconSize: [26, 26],
      iconAnchor: [13, 30]
    });
  }

  function drawPair(guess, q, label) {
    const g = [guess.lat, guess.lng];
    const t = [q.lat, q.lng];
    L.polyline([g, t], { color: dark ? "#e8edf5" : "#0f1b2d", weight: 2, dashArray: "6 6", opacity: .8 }).addTo(layer);
    L.marker(g, { icon: pinIcon("guess"), interactive: false }).addTo(layer);
    L.marker(t, { icon: pinIcon("target", label), interactive: false }).addTo(layer);
    return L.latLngBounds([g, t]);
  }

  map.on("click", (e) => {
    if (game.revealed || game.guesses.length >= ROUNDS) return;
    const ll = e.latlng.wrap();
    game.pending = ll;
    if (pendingMarker) pendingMarker.setLatLng(ll);
    else pendingMarker = L.marker(ll, { icon: pinIcon("guess"), interactive: false }).addTo(layer);
    const btn = $("btn-confirm");
    btn.disabled = false;
    btn.textContent = t("confirm");
  });

  // ── Rendering ───────────────────────────────────────────
  function renderHeader() {
    const round = Math.min(game.guesses.length + (game.revealed ? 0 : 1), ROUNDS);
    const idx = game.revealed ? game.guesses.length - 1 : game.guesses.length;
    const q = game.questions[Math.min(idx, ROUNDS - 1)];
    const badge = $("sport-badge");
    badge.textContent = `${SPORT_ICONS[q.sport] || "🏆"} ${t("sports")[q.sport] || q.sport} · ${round}/${ROUNDS}`;
    const level = $("level");
    level.textContent = t("levels")[q.level] || "";
    level.className = `level l${q.level}`;
    badge.classList.toggle("practice", game.practice);
    $("score").textContent = num(totalScore());

    const dots = $("dots");
    dots.innerHTML = "";
    for (let i = 0; i < ROUNDS; i++) {
      const d = document.createElement("span");
      d.className = "dot";
      if (game.guesses[i]) d.classList.add(`s${tier(game.guesses[i].points)}`);
      else if (i === game.guesses.length) d.classList.add("current");
      dots.appendChild(d);
    }
  }

  function totalScore() {
    return game.guesses.reduce((s, g) => s + g.points, 0);
  }

  function showQuestion() {
    layer.clearLayers();
    pendingMarker = null;
    game.pending = null;
    game.revealed = false;
    renderQuestion();
    $("ask").hidden = false;
    $("reveal").hidden = true;
    $("panel").classList.remove("hidden");
    $("btn-show-results").hidden = true;
    map.getContainer().classList.remove("map-locked");
    renderHeader();
    map.flyTo([48, 12], 4, { duration: 0.8 });
  }

  function renderQuestion() {
    $("question").textContent = loc(game.questions[game.guesses.length], "q");
    const btn = $("btn-confirm");
    btn.disabled = !game.pending;
    btn.textContent = game.pending ? t("confirm") : t("tapMap");
  }

  function renderReveal() {
    const q = game.questions[game.guesses.length - 1];
    const g = game.guesses[game.guesses.length - 1];
    $("answer").textContent = loc(q, "answer") + (q.year > 0 ? ` (${q.year})` : "");
    $("distance").textContent = t("away", { distance: fmtKm(g.km) });
    $("points").textContent = `+${num(g.points)} ${t("pts")}`;
    $("fact").textContent = loc(q, "fact");
    $("btn-next").textContent = game.guesses.length >= ROUNDS ? t("seeResults") : t("next");
  }

  function confirmGuess() {
    if (!game.pending) return;
    const q = game.questions[game.guesses.length];
    const km = haversineKm(game.pending, q);
    const points = scoreFor(km);
    game.guesses.push({ lat: game.pending.lat, lng: game.pending.lng, km, points });
    game.revealed = true;
    persist();

    layer.clearLayers();
    pendingMarker = null;
    const bounds = drawPair(game.pending, q);
    map.getContainer().classList.add("map-locked");

    renderReveal();
    $("bar-fill").style.width = "0";
    requestAnimationFrame(() => requestAnimationFrame(() => {
      $("bar-fill").style.width = `${(points / MAX_POINTS) * 100}%`;
    }));
    $("ask").hidden = true;
    $("reveal").hidden = false;
    renderHeader();
    // Fit both pins in the part of the map not covered by the (now taller) panel.
    map.flyToBounds(bounds, {
      paddingTopLeft: [50, 50],
      paddingBottomRight: [50, $("panel").offsetHeight + 40],
      maxZoom: 9,
      duration: 0.9
    });
  }

  function next() {
    if (game.guesses.length >= ROUNDS) finish();
    else showQuestion();
  }

  function persist() {
    if (game.practice) return;
    save(STORE_STATE, { date: todayKey(), day: game.day, puzzle: puzzleKey(), guesses: game.guesses });
  }

  // Identifies today's question set, so saved progress is dropped if the bank was edited.
  function puzzleKey() {
    return game.questions.map((q) => q.answer).join("|");
  }

  // ── End of game ─────────────────────────────────────────
  function finish() {
    const total = totalScore();
    if (!game.practice) recordGame(game.day, total);
    showSummaryMap();
    openResults();
  }

  function showSummaryMap() {
    layer.clearLayers();
    let bounds = null;
    game.questions.forEach((q, i) => {
      const g = game.guesses[i];
      if (!g) return;
      const b = drawPair(g, q, String(i + 1));
      bounds = bounds ? bounds.extend(b) : b;
    });
    $("panel").classList.add("hidden");
    map.getContainer().classList.add("map-locked");
    if (bounds) map.flyToBounds(bounds, { padding: [50, 50], maxZoom: 6, duration: 0.9 });
  }

  function verdict(total) {
    const thresholds = [1500, 2500, 3500, 4500];
    return t("verdicts")[thresholds.filter((x) => total >= x).length];
  }

  function openResults() {
    const total = totalScore();
    $("results-kicker").textContent = game.practice ? t("practiceRound") : `SportGuessr #${game.day}`;
    $("final-score").textContent = num(total);
    $("verdict").textContent = verdict(total);

    const recap = $("recap");
    recap.innerHTML = "";
    game.questions.forEach((q, i) => {
      const g = game.guesses[i];
      const li = document.createElement("li");
      li.innerHTML = `<span>${TIER_EMOJI[tier(g.points)]}</span>
        <span class="r-place"></span>
        <span class="r-pts">${g.points}</span>`;
      const place = li.querySelector(".r-place");
      place.textContent = `${SPORT_ICONS[q.sport] || "🏆"} ${loc(q, "answer")}`;
      const dist = document.createElement("span");
      dist.className = "r-dist";
      dist.textContent = t("away", { distance: fmtKm(g.km) });
      place.appendChild(dist);
      recap.appendChild(li);
    });

    $("btn-share").hidden = game.practice;
    $("btn-show-results").hidden = false;
    openModal("modal-results");
    startCountdown();
  }

  function shareText() {
    const total = totalScore();
    const squares = game.guesses.map((g) => TIER_EMOJI[tier(g.points)]).join("");
    const url = location.origin + location.pathname;
    return `SportGuessr #${game.day} 📍 ${num(total)}/${num(ROUNDS * MAX_POINTS)}\n${squares}\n${url}`;
  }

  async function share() {
    const text = shareText();
    const btn = $("btn-share");
    try {
      if (navigator.share && /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent)) {
        await navigator.share({ text });
        return;
      }
      await navigator.clipboard.writeText(text);
      btn.textContent = t("copied");
    } catch {
      btn.textContent = t("copyFailed");
    }
    setTimeout(() => { btn.textContent = t("share"); }, 2000);
  }

  let countdownTimer = null;
  function startCountdown() {
    clearInterval(countdownTimer);
    const tick = () => {
      const now = new Date();
      const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
      let s = Math.max(0, Math.floor((midnight - now) / 1000));
      if (s === 0 && !game.practice) { location.reload(); return; }
      const h = Math.floor(s / 3600); s -= h * 3600;
      const m = Math.floor(s / 60); s -= m * 60;
      $("countdown").textContent = [h, m, s].map((x) => String(x).padStart(2, "0")).join(":");
    };
    tick();
    countdownTimer = setInterval(tick, 1000);
  }

  // ── Stats modal ─────────────────────────────────────────
  function openStats() {
    const s = { ...DEFAULT_STATS, ...load(STORE_STATS, {}) };
    const avg = s.played ? Math.round(s.total / s.played) : 0;
    const items = [
      [s.played, t("played")],
      [num(avg), t("average")],
      [s.streak, t("streak")],
      [s.maxStreak, t("maxStreak")]
    ];
    $("stat-grid").innerHTML = items.map(([v, l]) => `<div><b>${v}</b><small>${l}</small></div>`).join("") +
      `<div style="grid-column: 1 / -1; margin-top: 6px"><small>${t("best")}: <b style="font-size:14px">${num(s.best)}</b></small></div>`;

    const max = Math.max(1, ...s.dist);
    const todayBucket = s.lastDay === game.day && !game.practice && game.guesses.length === ROUNDS ? distBucket(totalScore()) : -1;
    $("dist").innerHTML = s.dist.map((n, i) =>
      `<div class="dist-row"><span>${DIST_LABELS[i]}</span>
        <div class="dist-bar${i === todayBucket ? " today" : ""}" style="width:${8 + (n / max) * 80}%">${n}</div></div>`
    ).reverse().join("");
    openModal("modal-stats");
  }

  // ── Modals ──────────────────────────────────────────────
  function openModal(id) {
    const m = $(id);
    if (!m.open) m.showModal();
  }

  document.querySelectorAll("dialog").forEach((d) => {
    d.addEventListener("click", (e) => {
      if (e.target === d || e.target.closest("[data-close]")) d.close();
    });
  });

  // ── Practice ────────────────────────────────────────────
  function startPractice() {
    game.practice = true;
    game.questions = randomQuestions();
    game.guesses = [];
    $("modal-results").close();
    showQuestion();
  }

  // Re-render whatever is on screen in the other language.
  function toggleLanguage() {
    lang = lang === "es" ? "en" : "es";
    save(STORE_LANG, lang);
    applyStaticTexts();
    if (game.questions.length) renderHeader();
    if (!$("ask").hidden) renderQuestion();
    if (!$("reveal").hidden) renderReveal();
    if ($("modal-results").open) openResults();
    if ($("modal-stats").open) openStats();
  }

  // ── Wiring ──────────────────────────────────────────────
  $("btn-confirm").addEventListener("click", confirmGuess);
  $("btn-next").addEventListener("click", next);
  $("btn-help").addEventListener("click", () => openModal("modal-help"));
  $("btn-stats").addEventListener("click", openStats);
  $("btn-lang").addEventListener("click", toggleLanguage);
  $("btn-share").addEventListener("click", share);
  $("btn-map").addEventListener("click", () => $("modal-results").close());
  $("btn-show-results").addEventListener("click", openResults);
  $("btn-practice").addEventListener("click", startPractice);
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Enter" || document.querySelector("dialog[open]")) return;
    if (!$("ask").hidden && !$("btn-confirm").disabled) confirmGuess();
    else if (!$("reveal").hidden) next();
  });

  // ── Boot ────────────────────────────────────────────────
  function boot() {
    applyStaticTexts();
    game.questions = questionsForDay(game.day);
    const saved = load(STORE_STATE, null);
    if (saved && saved.date === todayKey() && saved.day === game.day && saved.puzzle === puzzleKey() &&
        Array.isArray(saved.guesses)) {
      game.guesses = saved.guesses.slice(0, ROUNDS);
    }

    if (game.guesses.length >= ROUNDS) {
      renderHeader();
      showSummaryMap();
      openResults();
      return;
    }

    showQuestion();
    if (!load("sg_seen_help", false)) {
      save("sg_seen_help", true);
      openModal("modal-help");
    }
  }

  // Expose a few internals for debugging / tests.
  window.SportGuessr = { questionsForDay, scoreFor, haversineKm, dayNumber };

  boot();
})();
