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
  const GAME_VIEW = { center: [48, 12], zoom: 4 };

  const SPORT_ICONS = {
    football: "⚽", tennis: "🎾", cycling: "🚴", motorsport: "🏎️", athletics: "🏃",
    olympics: "🏅", winter: "⛷️", rugby: "🏉", golf: "⛳", cricket: "🏏",
    boxing: "🥊", darts: "🎯", snooker: "🎱", "horse racing": "🏇", rowing: "🚣",
    sailing: "⛵", swimming: "🏊", equestrian: "🐎", climbing: "🧗",
    basketball: "🏀", "gaelic games": "🏑"
  };
  const LEVEL_COLORS = { 1: "var(--t4)", 2: "var(--t3)", 3: "var(--t1)" };
  const TIER_COLORS = { 4: "var(--t4)", 3: "var(--t3)", 2: "var(--t2)", 1: "var(--t1)" };
  const TIER_EMOJI = { 4: "🟩", 3: "🟨", 2: "🟧", 1: "🟥" };

  const $ = (id) => document.getElementById(id);
  const icon = (q) => SPORT_ICONS[q.sport] || "🏆";
  const pad2 = (n) => String(n).padStart(2, "0");

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
    return n.toLocaleString(t("locale"), { useGrouping: "always" });
  }

  function applyStaticTexts() {
    document.documentElement.lang = lang;
    document.title = t("title");
    document.querySelectorAll("[data-i18n]").forEach((el) => { el.textContent = t(el.dataset.i18n); });
    document.querySelectorAll("[data-i18n-html]").forEach((el) => { el.innerHTML = t(el.dataset.i18nHtml); });
    document.querySelectorAll("[data-i18n-aria]").forEach((el) => { el.setAttribute("aria-label", t(el.dataset.i18nAria)); });
    $("btn-lang").textContent = lang === "es" ? "EN" : "ES";
    $("practice-tag").textContent = t("practiceTag");
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
    return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
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

  function loadStats() {
    return { ...DEFAULT_STATS, ...load(STORE_STATS, {}) };
  }

  function recordGame(day, total) {
    const s = loadStats();
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

  // ── Small animation helpers ─────────────────────────────
  const reducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function countUp(el, from, to, ms = 700) {
    if (reducedMotion || from === to) { el.textContent = num(to); return; }
    const start = performance.now();
    const step = (now) => {
      const p = Math.min(1, (now - start) / ms);
      const eased = 1 - (1 - p) ** 3;
      el.textContent = num(Math.round(from + (to - from) * eased));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  function buzz(pattern) {
    if (navigator.vibrate) navigator.vibrate(pattern);
  }

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
  const map = L.map("map", {
    center: GAME_VIEW.center,
    zoom: GAME_VIEW.zoom,
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
  const cssVar = (name) => css.getPropertyValue(name).trim();
  for (let lng = -180; lng <= 180; lng += 15) {
    L.polyline([[-85, lng], [85, lng]], { color: cssVar("--graticule"), weight: 1, interactive: false }).addTo(map);
  }
  for (let lat = -75; lat <= 75; lat += 15) {
    L.polyline([[lat, -180], [lat, 180]], { color: cssVar("--graticule"), weight: 1, interactive: false }).addTo(map);
  }
  // Rings that cross the antimeridian (eastern Russia, Fiji) would be drawn as a band
  // across the whole map; shift their western half by 360° so they stay in one piece.
  const countries = topojson.feature(window.WORLD_TOPO, window.WORLD_TOPO.objects.countries);
  countries.features.forEach((f) => {
    const polygons = f.geometry.type === "Polygon" ? [f.geometry.coordinates] : f.geometry.coordinates;
    polygons.forEach((rings) => rings.forEach((ring) => {
      const lngs = ring.map((c) => c[0]);
      const lats = ring.map((c) => c[1]);
      if (Math.max(...lngs) - Math.min(...lngs) > 180 && Math.min(...lats) > -80) {
        ring.forEach((c) => { if (c[0] < 0) c[0] += 360; });
      }
    }));
  });
  L.geoJSON(countries, {
    interactive: false,
    style: { fillColor: cssVar("--land"), fillOpacity: 1, color: cssVar("--land-border"), weight: 0.7 }
  }).addTo(map);
  map.attributionControl.setPrefix('<a href="https://leafletjs.com">Leaflet</a>');
  map.attributionControl.addAttribution('<a href="https://www.naturalearthdata.com/">Natural Earth</a>');

  const layer = L.layerGroup().addTo(map);
  const svgRenderer = L.svg({ padding: 0.5 });   // routes are SVG so they can be animated
  let pendingMarker = null;

  function pinIcon(kind, label) {
    return L.divIcon({
      className: "",
      html: `<div class="pin ${kind}">${label ? `<span class="pin-label">${label}</span>` : ""}</div>`,
      iconSize: [18, 18],
      iconAnchor: [9, 9]
    });
  }

  function addRoute(guess, q) {
    return L.polyline([[guess.lat, guess.lng], [q.lat, q.lng]], {
      renderer: svgRenderer, className: "route", interactive: false
    }).addTo(layer);
  }

  function addPair(guess, q, label) {
    addRoute(guess, q);
    L.marker([guess.lat, guess.lng], { icon: pinIcon("guess"), interactive: false }).addTo(layer);
    L.marker([q.lat, q.lng], { icon: pinIcon("target", label), interactive: false }).addTo(layer);
    return L.latLngBounds([[guess.lat, guess.lng], [q.lat, q.lng]]);
  }

  // Draws the line from the guess to the answer, then drops the answer pin.
  function animateRoute(guess, q, done) {
    const line = addRoute(guess, q);
    const path = line.getElement();
    const finish = () => {
      path.style.transition = path.style.strokeDasharray = path.style.strokeDashoffset = "";
      L.marker([q.lat, q.lng], { icon: pinIcon("target"), interactive: false }).addTo(layer);
      done();
    };
    if (reducedMotion || !path || !path.getTotalLength) { finish(); return; }
    const len = path.getTotalLength();
    path.style.strokeDasharray = `${len}`;
    path.style.strokeDashoffset = `${len}`;
    path.getBoundingClientRect();
    path.style.transition = "stroke-dashoffset .6s cubic-bezier(.2,.8,.2,1)";
    path.style.strokeDashoffset = "0";
    setTimeout(finish, 620);
  }

  map.on("click", (e) => {
    if (document.body.classList.contains("is-intro") || game.revealed || game.guesses.length >= ROUNDS) return;
    const ll = e.latlng.wrap();
    game.pending = ll;
    if (pendingMarker) pendingMarker.setLatLng(ll);
    else pendingMarker = L.marker(ll, { icon: pinIcon("guess"), interactive: false }).addTo(layer);
    const btn = $("btn-confirm");
    btn.disabled = false;
    btn.textContent = t("confirm");
    buzz(8);
  });

  // ── Intro screen ────────────────────────────────────────
  function renderIntro() {
    const date = new Intl.DateTimeFormat(t("locale"), { day: "numeric", month: "long" }).format(new Date());
    $("intro-eyebrow").textContent = t("eyebrow", { n: game.day, date });
    $("lineup").innerHTML = game.questions.map((q, i) => `
      <li class="${game.guesses[i] ? "done" : ""}" style="--lvl:${LEVEL_COLORS[q.level]}">
        <span class="l-icon">${icon(q)}</span>
        <span class="l-sport">${t("sports")[q.sport] || q.sport}</span>
        <span class="l-level">${t("levels")[q.level]}</span>
      </li>`).join("");
    $("start-label").textContent = game.guesses.length ? t("resume", { n: game.guesses.length + 1 }) : t("start");
    const s = loadStats();
    const streakAlive = s.streak > 0 && s.lastDay === game.day - 1;
    $("intro-meta").innerHTML = streakAlive ? t("introStreak", { n: s.streak }) : t("introMeta");
  }

  function showIntro() {
    document.body.classList.add("is-intro");
    renderIntro();
    const wide = window.innerWidth > 900;
    map.setView(wide ? [47, -14] : [42, 10], wide ? 4 : 3, { animate: false });
  }

  function startGame() {
    document.body.classList.remove("is-intro");
    showQuestion();
  }

  // ── Question card ───────────────────────────────────────
  function currentQuestion() {
    const idx = game.revealed ? game.guesses.length - 1 : game.guesses.length;
    return game.questions[Math.min(idx, ROUNDS - 1)];
  }

  function renderPanelHead() {
    const q = currentQuestion();
    const round = Math.min(game.guesses.length + (game.revealed ? 0 : 1), ROUNDS);
    $("sport-tag").textContent = `${icon(q)} ${t("sports")[q.sport] || q.sport}`;
    const level = $("level");
    level.textContent = t("levels")[q.level] || "";
    level.style.setProperty("--lvl", LEVEL_COLORS[q.level]);
    $("practice-tag").hidden = !game.practice;
    $("round").innerHTML = `${t("round")} <b>${pad2(round)}</b>/${pad2(ROUNDS)}`;

    $("progress").innerHTML = Array.from({ length: ROUNDS }, (_, i) => {
      const g = game.guesses[i];
      const cls = g ? `s${tier(g.points)}` : i === game.guesses.length ? "current" : "";
      return `<span class="${cls}"></span>`;
    }).join("");
  }

  function totalScore() {
    return game.guesses.reduce((s, g) => s + g.points, 0);
  }

  function renderQuestion() {
    $("question").textContent = loc(game.questions[game.guesses.length], "q");
    const btn = $("btn-confirm");
    btn.disabled = !game.pending;
    btn.textContent = game.pending ? t("confirm") : t("tapMap");
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
    renderPanelHead();
    map.flyTo(GAME_VIEW.center, GAME_VIEW.zoom, { duration: 0.8 });
  }

  // Static texts of the answer card (safe to call again after a language switch).
  function renderReveal() {
    const q = game.questions[game.guesses.length - 1];
    const g = game.guesses[game.guesses.length - 1];
    const tr = tier(g.points);
    $("panel").style.setProperty("--tier", TIER_COLORS[tr]);
    $("tier-label").textContent = t("tiers")[tr];
    $("answer").innerHTML = "";
    $("answer").append(loc(q, "answer"));
    if (q.year > 0) {
      const y = document.createElement("small");
      y.textContent = ` · ${q.year}`;
      $("answer").append(y);
    }
    $("distance").textContent = t("away", { distance: fmtKm(g.km) });
    $("fact").textContent = loc(q, "fact");
    $("btn-next").textContent = game.guesses.length >= ROUNDS ? t("seeResults") : t("next");
  }

  function confirmGuess() {
    if (!game.pending) return;
    const q = game.questions[game.guesses.length];
    const guess = game.pending;
    const km = haversineKm(guess, q);
    const points = scoreFor(km);
    const before = totalScore();
    game.guesses.push({ lat: guess.lat, lng: guess.lng, km, points });
    game.revealed = true;
    persist();

    layer.clearLayers();
    pendingMarker = null;
    L.marker(guess, { icon: pinIcon("guess"), interactive: false }).addTo(layer);
    map.getContainer().classList.add("map-locked");

    renderReveal();
    $("points").textContent = "0";
    $("score").textContent = num(before);
    $("meter-fill").style.width = "0";
    $("ask").hidden = true;
    $("reveal").hidden = false;
    renderPanelHead();

    // Fly so both pins fit above the card, then draw the route and count the points up.
    const bounds = L.latLngBounds([guess, [q.lat, q.lng]]);
    let played = false;
    const play = () => {
      if (played) return;
      played = true;
      animateRoute(guess, q, () => {
        countUp($("points"), 0, points);
        countUp($("score"), before, before + points);
        $("meter-fill").style.width = `${(points / MAX_POINTS) * 100}%`;
        buzz(tier(points) >= 3 ? [18, 50, 18] : 12);
      });
    };
    map.once("moveend", play);
    setTimeout(play, 1100);   // in case the map didn't need to move
    map.flyToBounds(bounds, {
      paddingTopLeft: [50, 80],
      paddingBottomRight: [50, $("panel").offsetHeight + 40],
      maxZoom: 8,
      duration: 0.8
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
    if (!game.practice) recordGame(game.day, totalScore());
    showSummaryMap();
    openResults(true);
  }

  function showSummaryMap() {
    layer.clearLayers();
    let bounds = null;
    game.questions.forEach((q, i) => {
      const g = game.guesses[i];
      if (!g) return;
      const b = addPair(g, q, String(i + 1));
      bounds = bounds ? bounds.extend(b) : b;
    });
    $("panel").classList.add("hidden");
    map.getContainer().classList.add("map-locked");
    if (bounds) map.flyToBounds(bounds, { paddingTopLeft: [50, 90], paddingBottomRight: [50, 90], maxZoom: 6, duration: 0.9 });
  }

  function verdict(total) {
    const thresholds = [1500, 2500, 3500, 4500];
    return t("verdicts")[thresholds.filter((x) => total >= x).length];
  }

  function openResults(animate = false) {
    const total = totalScore();
    $("results-kicker").textContent = game.practice ? t("practiceRound") : `SportGuessr #${game.day}`;
    if (animate) countUp($("final-score"), 0, total, 1100);
    else $("final-score").textContent = num(total);
    $("verdict").textContent = verdict(total);
    $("tiers").innerHTML = game.guesses.map((g) => `<span class="s${tier(g.points)}"></span>`).join("");

    const recap = $("recap");
    recap.innerHTML = "";
    game.questions.forEach((q, i) => {
      const g = game.guesses[i];
      const li = document.createElement("li");
      li.innerHTML = `<span class="r-n">${pad2(i + 1)}</span>
        <span class="r-place"><span class="r-name"></span><span class="r-sub"></span></span>
        <span class="r-pts s${tier(g.points)}">${num(g.points)}</span>`;
      li.querySelector(".r-name").textContent = loc(q, "answer");
      li.querySelector(".r-sub").textContent = `${icon(q)} ${t("away", { distance: fmtKm(g.km) })}`;
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
    return `SportGuessr #${game.day} · ${num(total)}/${num(ROUNDS * MAX_POINTS)}\n${squares}\n${url}`;
  }

  async function share() {
    const text = shareText();
    const label = $("share-label");
    try {
      if (navigator.share && /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent)) {
        await navigator.share({ text });
        return;
      }
      await navigator.clipboard.writeText(text);
      label.textContent = t("copied");
    } catch {
      label.textContent = t("copyFailed");
    }
    setTimeout(() => { label.textContent = t("share"); }, 2200);
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
      $("countdown").textContent = [h, m, s].map(pad2).join(":");
    };
    tick();
    countdownTimer = setInterval(tick, 1000);
  }

  // ── Stats modal ─────────────────────────────────────────
  function openStats() {
    const s = loadStats();
    const avg = s.played ? Math.round(s.total / s.played) : 0;
    const items = [
      [s.played, t("played")],
      [num(avg), t("average")],
      [s.streak, t("streak")],
      [s.maxStreak, t("maxStreak")]
    ];
    $("stat-grid").innerHTML = items.map(([v, l]) => `<div class="stat"><b>${v}</b><small>${l}</small></div>`).join("") +
      `<div class="stat wide"><small>${t("best")}</small><b>${num(s.best)}</b></div>`;

    const max = Math.max(1, ...s.dist);
    const todayBucket = s.lastDay === game.day && !game.practice && game.guesses.length === ROUNDS ? distBucket(totalScore()) : -1;
    $("dist").innerHTML = s.dist.map((n, i) =>
      `<div class="dist-row"><span>${DIST_LABELS[i]}</span>
        <div class="dist-bar${i === todayBucket ? " today" : ""}" style="width:${10 + (n / max) * 90}%">${n}</div></div>`
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
    startGame();
  }

  // Re-render whatever is on screen in the other language.
  function toggleLanguage() {
    lang = lang === "es" ? "en" : "es";
    save(STORE_LANG, lang);
    applyStaticTexts();
    if (document.body.classList.contains("is-intro")) renderIntro();
    if (game.questions.length) renderPanelHead();
    if (!$("ask").hidden) renderQuestion();
    if (!$("reveal").hidden && game.revealed) renderReveal();
    if ($("modal-results").open) openResults();
    if ($("modal-stats").open) openStats();
  }

  // ── Wiring ──────────────────────────────────────────────
  $("btn-start").addEventListener("click", startGame);
  $("btn-confirm").addEventListener("click", confirmGuess);
  $("btn-next").addEventListener("click", next);
  $("btn-help").addEventListener("click", () => openModal("modal-help"));
  $("btn-stats").addEventListener("click", openStats);
  $("btn-lang").addEventListener("click", toggleLanguage);
  $("btn-share").addEventListener("click", share);
  $("btn-map").addEventListener("click", () => $("modal-results").close());
  $("btn-show-results").addEventListener("click", () => openResults());
  $("btn-practice").addEventListener("click", startPractice);
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Enter" || document.querySelector("dialog[open]")) return;
    if (document.body.classList.contains("is-intro")) startGame();
    else if (!$("ask").hidden && !$("btn-confirm").disabled) confirmGuess();
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
      document.body.classList.remove("is-intro");
      renderPanelHead();
      showSummaryMap();
      openResults();
      return;
    }
    showIntro();
  }

  // Expose a few internals for debugging / tests.
  window.SportGuessr = { questionsForDay, scoreFor, haversineKm, dayNumber };

  boot();
})();
