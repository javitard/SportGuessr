(() => {
  "use strict";

  // ── Config ──────────────────────────────────────────────
  const LAUNCH = Date.UTC(2026, 9, 22);   // Puzzle #1 (months are 0-based)
  const { PRECISION_MAX, MAX_TOTAL } = window.Scoring;   // scoring rules live in scoring.js
  const ROUNDS = window.Scoring.MULTIPLIERS.length;
  const ROUND_SECONDS = 60;                // time to answer each question
  const LEVEL_MIX = [2, 2, 1];             // easy, medium, hard questions per day
  const SEED = 0x5f0a7;
  const STORE_STATE = "sg_state_v1";
  const STORE_STATS = "sg_stats_v2";        // v1 kept day totals out of 5,000
  const STORE_STATS_V1 = "sg_stats_v1";
  const STORE_LANG = "sg_lang";
  // Starting view for every question: the inhabited world, so no continent is favoured.
  const WORLD_VIEW = [[-42, -125], [66, 150]];

  const SPORT_ICONS = {
    football: "⚽", tennis: "🎾", cycling: "🚴", motorsport: "🏎️", athletics: "🏃",
    olympics: "🏅", winter: "⛷️", rugby: "🏉", golf: "⛳", cricket: "🏏",
    boxing: "🥊", darts: "🎯", snooker: "🎱", "horse racing": "🏇", rowing: "🚣",
    sailing: "⛵", swimming: "🏊", equestrian: "🐎", climbing: "🧗",
    basketball: "🏀", "gaelic games": "🏑", surfing: "🏄"
  };
  // How a locked-in pin moves once it has turned into its sport: balls bounce,
  // anything ridden or sailed rocks along, the rest spin or pulse.
  const SPORT_MOTION = {
    football: "bounce", tennis: "bounce", rugby: "bounce", basketball: "bounce", golf: "bounce",
    cricket: "bounce", "gaelic games": "bounce", snooker: "spin", olympics: "spin", darts: "pop",
    boxing: "pop", cycling: "ride", motorsport: "ride", "horse racing": "ride", equestrian: "ride",
    rowing: "ride", sailing: "ride", swimming: "ride", surfing: "ride", athletics: "ride",
    winter: "ride", climbing: "pop"
  };
  // Masthead "ears" (the boxes beside an old paper's title) flip through these.
  const EAR_SPORTS = ["⚽", "🏀", "🎾", "🚴", "⛳", "🏉", "🏎️", "⛷️", "🥊", "🏇"];
  const EAR_GEO = ["🌍", "🏔️", "🇪🇸", "🧭", "🇧🇷", "🗺️", "🇮🇹", "🏟️", "🇬🇧", "⛰️", "🇯🇵", "🇫🇷"];
  // Each round is harder and worth more: its colour warms up from green to red.
  const ROUND_COLORS = ["var(--t4)", "color-mix(in srgb, var(--t4), var(--t3))", "var(--t3)", "var(--t2)", "var(--t1)"];
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
    $("final-max").textContent = `/ ${num(MAX_TOTAL)}`;
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

  const RECENT_DAYS = 20;   // a question never comes back within this many days

  // Each difficulty pool is walked in a shuffled order; once exhausted, a new cycle
  // with a different shuffle starts. A question that can't be used on its day (same
  // venue or same competition as another pick, or seen in the last few days) waits in
  // a queue and goes first on a later day, so no question is ever skipped or bunched up.
  // Days are built in order from day 1, so the same day gives the same questions
  // to everyone.
  const schedule = [];   // schedule[day] = 5 questions

  function questionsForDay(day) {
    if (schedule[day]) return schedule[day];
    const all = window.QUESTIONS;
    const pools = LEVEL_MIX.map((count, i) => ({
      count,
      salt: i + 1,
      items: all.filter((q) => q.level === i + 1),
      cursor: 0,
      waiting: []
    }));
    const lastSeen = new Map();   // question id → last day it was played
    const competitions = window.TAGS.competitions;
    const sameCompetition = (a, b) => a.tags.some((t) => competitions[t] && b.tags.includes(t));

    const nextFrom = (pool) => {
      if (pool.waiting.length) return pool.waiting.shift();
      const cycle = Math.floor(pool.cursor / pool.items.length);
      const order = shuffle(pool.items, mulberry32(SEED + pool.salt * 7919 + cycle * 104729));
      return order[pool.cursor++ % pool.items.length];
    };

    // Rebuilt from day 1 so every pool's position is right; cheap even years in.
    for (let d = 1; d <= day; d++) {
      const picks = [];
      pools.forEach((pool) => {
        const deferred = [];
        // Never look at more than the whole pool, so a tiny bank can't loop forever.
        for (let tries = 0; picks.filter((q) => q.level === pool.salt).length < pool.count &&
             tries < pool.items.length + pool.waiting.length; tries++) {
          const q = nextFrom(pool);
          const recent = lastSeen.has(q.id) && d - lastSeen.get(q.id) <= RECENT_DAYS;
          const clash = picks.some((p) => haversineKm(p, q) < 1 || sameCompetition(p, q));
          if (recent || clash) deferred.push(q);
          else picks.push(q);
        }
        // Safety net for a small bank: rather than a short puzzle, accept a repeated competition.
        while (picks.filter((q) => q.level === pool.salt).length < pool.count && deferred.length) {
          const i = deferred.findIndex((q) => !picks.some((p) => p.id === q.id || haversineKm(p, q) < 1));
          if (i < 0) break;
          picks.push(deferred.splice(i, 1)[0]);
        }
        pool.waiting.push(...deferred);
      });
      picks.forEach((q) => lastSeen.set(q.id, d));
      schedule[d] = picks;
    }
    return schedule[day];
  }

  function randomQuestions() {
    return shuffle(window.QUESTIONS, Math.random)
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

  // Colour band of an answer, from its precision (0–1,000), so every question is judged alike.
  function tier(precision) {
    if (precision >= 900) return 4;
    if (precision >= 600) return 3;
    if (precision >= 250) return 2;
    return 1;
  }

  const pct = (precision) => `${Math.round((precision / PRECISION_MAX) * 100)}%`;
  const mult = (round) => `×${num(window.Scoring.MULTIPLIERS[round])}`;

  // ── Label placement (GeoJSON rings are [lng, lat]) ──────
  function ringArea(ring) {
    let a = 0;
    for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) a += ring[j][0] * ring[i][1] - ring[i][0] * ring[j][1];
    return a / 2;
  }

  // Outer ring of the country's biggest polygon (its mainland).
  function largestRing(geometry) {
    const polygons = geometry.type === "Polygon" ? [geometry.coordinates] : geometry.coordinates;
    return polygons.map((rings) => rings[0]).reduce((a, b) => (Math.abs(ringArea(b)) > Math.abs(ringArea(a)) ? b : a));
  }

  // Longitudes where the ring crosses a parallel, sorted: pairs of them bound the inside.
  function crossings(ring, lat) {
    const xs = [];
    for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
      const [x1, y1] = ring[j];
      const [x2, y2] = ring[i];
      if ((y1 > lat) !== (y2 > lat)) xs.push(x1 + ((lat - y1) / (y2 - y1)) * (x2 - x1));
    }
    return xs.sort((a, b) => a - b);
  }

  // A point well inside the ring, as [lat, lng]: its centroid, or for odd shapes whose
  // centroid falls outside (crescents, long coasts), the middle of the widest stretch of
  // land along the centroid's parallel.
  function labelPoint(ring) {
    let a = 0, cx = 0, cy = 0;
    for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
      const f = ring[j][0] * ring[i][1] - ring[i][0] * ring[j][1];
      a += f;
      cx += (ring[j][0] + ring[i][0]) * f;
      cy += (ring[j][1] + ring[i][1]) * f;
    }
    if (a === 0) return [ring[0][1], ring[0][0]];
    cx /= 3 * a;
    cy /= 3 * a;
    const xs = crossings(ring, cy);
    let best = null;
    for (let i = 0; i + 1 < xs.length; i += 2) {
      if (cx >= xs[i] && cx <= xs[i + 1]) return [cy, cx];
      if (!best || xs[i + 1] - xs[i] > best[1] - best[0]) best = [xs[i], xs[i + 1]];
    }
    return best ? [cy, (best[0] + best[1]) / 2] : [cy, cx];
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
    let saved = load(STORE_STATS, null);
    if (!saved) {
      // Old stats were out of 5,000: scale them to 1,000. The five score bands line up one to one.
      const old = load(STORE_STATS_V1, null);
      saved = old ? { ...old, total: Math.round(old.total / 5), best: Math.round(old.best / 5) } : {};
      if (old) save(STORE_STATS, saved);
    }
    return { ...DEFAULT_STATS, ...saved };
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

  const DIST_LABELS = ["0–199", "200–399", "400–599", "600–799", "800–1000"];
  function distBucket(total) { return Math.min(4, Math.floor(total / 200)); }

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
    guesses: [],          // { lat, lng, km, points }: points is the precision, 0–1,000;
                          // lat, lng and km are null when the time ran out
    deadline: null,       // { round, at }: when the current question's time runs out
    pending: null,        // L.LatLng of the unconfirmed guess
    revealed: false
  };

  // ── Map ─────────────────────────────────────────────────
  const map = L.map("map", {
    center: [20, 10],
    zoom: 2,
    minZoom: 1,
    zoomSnap: 0.25,
    maxZoom: 10,
    preferCanvas: true,
    worldCopyJump: false,
    maxBounds: [[-85, -400], [85, 400]],   // wide enough to offset the world beside the intro text
    maxBoundsViscosity: 1,
    zoomControl: false,
    attributionControl: true
  });
  L.control.zoom({ position: "topright" }).addTo(map);

  // Satellite imagery (no labels, no API key), so cities show up without giving names away.
  // The bundled country shapes are drawn underneath as a fallback if the tiles can't load,
  // and their borders again on top so you can tell which country you're in.
  const css = getComputedStyle(document.documentElement);
  const cssVar = (name) => css.getPropertyValue(name).trim();
  map.createPane("fallback").style.zIndex = 150;   // below the tile pane (200)
  L.tileLayer("https://tiles.maps.eox.at/wmts/1.0.0/s2cloudless-2024_3857/default/g/{z}/{y}/{x}.jpg", {
    maxNativeZoom: 14,
    attribution: '<a href="https://s2maps.eu">Sentinel-2 cloudless</a> by EOX (modified Copernicus Sentinel data 2024)'
  }).addTo(map);
  for (let lng = -180; lng <= 180; lng += 15) {
    L.polyline([[-85, lng], [85, lng]], { pane: "fallback", color: cssVar("--graticule"), weight: 1, interactive: false }).addTo(map);
  }
  for (let lat = -75; lat <= 75; lat += 15) {
    L.polyline([[lat, -180], [lat, 180]], { pane: "fallback", color: cssVar("--graticule"), weight: 1, interactive: false }).addTo(map);
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
    pane: "fallback",
    interactive: false,
    style: { fillColor: cssVar("--land"), fillOpacity: 1, color: cssVar("--land-border"), weight: 0.7 }
  }).addTo(map);
  L.geoJSON(countries, {
    interactive: false,
    style: { fill: false, color: cssVar("--sat-border"), weight: 0.8 }
  }).addTo(map);

  // Country codes (ES, FR…) once you zoom in. A country is labelled when its main landmass is
  // wide enough on screen to hold the code, so big countries show up first and small ones later.
  const LABEL_MIN_ZOOM = 3;
  const LABEL_MIN_PX = 40;
  map.createPane("labels").style.zIndex = 450;   // over the borders, under the pins
  const countryLabels = countries.features.flatMap((f) => {
    const code = window.COUNTRY_CODES[f.id] || window.COUNTRY_CODES[f.properties.name];
    if (!code) return [];
    const ring = largestRing(f.geometry);
    const lngs = ring.map((c) => c[0]);
    const marker = L.marker(labelPoint(ring), {
      pane: "labels",
      interactive: false,
      keyboard: false,
      icon: L.divIcon({ className: "country-label", html: `<span>${code}</span>`, iconSize: null })
    });
    return [{ width: Math.max(...lngs) - Math.min(...lngs), marker }];
  });

  function updateCountryLabels() {
    const zoom = map.getZoom();
    const worldPx = 256 * 2 ** zoom;
    for (const l of countryLabels) {
      const show = zoom >= LABEL_MIN_ZOOM && (l.width / 360) * worldPx >= LABEL_MIN_PX;
      if (show && !map.hasLayer(l.marker)) l.marker.addTo(map);
      else if (!show && map.hasLayer(l.marker)) l.marker.remove();
    }
  }
  map.on("zoomend", updateCountryLabels);
  updateCountryLabels();
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

  // The guess pin turned into the question's sport. `still` for the summary map.
  function sportPin(q, still) {
    const motion = still ? "still" : `m-${SPORT_MOTION[q.sport] || "pop"}`;
    return L.divIcon({
      className: "",
      html: `<div class="sport-pin ${motion}"><span>${icon(q)}</span></div>`,
      iconSize: [36, 36],
      iconAnchor: [18, 18]
    });
  }

  function addRoute(guess, q) {
    return L.polyline([[guess.lat, guess.lng], [q.lat, q.lng]], {
      renderer: svgRenderer, className: "route", interactive: false
    }).addTo(layer);
  }

  function addPair(guess, q, label) {
    addRoute(guess, q);
    L.marker([guess.lat, guess.lng], { icon: sportPin(q, true), interactive: false }).addTo(layer);
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
    $("intro-edition").textContent = t("edition", { n: game.day });
    $("intro-date").textContent = new Intl.DateTimeFormat(t("locale"), { weekday: "long", day: "numeric", month: "long", year: "numeric" }).format(new Date());
    // A staircase of stadium tickets: each one a step higher, with more stars and a bigger multiplier.
    $("lineup").innerHTML = game.questions.map((_, i) => `
      <li class="${game.guesses[i] ? "done" : ""}" style="--lvl:${ROUND_COLORS[i]}; --step:${i}">
        <span class="l-round"><span class="l-word">${t("round")}</span> ${i + 1}</span>
        <span class="l-stars" aria-hidden="true">${"★".repeat(i + 1)}${"☆".repeat(ROUNDS - i - 1)}</span>
        <span class="l-mult num">${mult(i)}</span>
        <span class="l-max">${num(window.Scoring.maxFor(i))} ${t("pts")}</span>
      </li>`).join("");
    $("start-label").textContent = game.guesses.length ? t("resume", { n: game.guesses.length + 1 }) : t("start");
    const s = loadStats();
    const streakAlive = s.streak > 0 && s.lastDay === game.day - 1;
    $("intro-meta").innerHTML = streakAlive ? t("introStreak", { n: s.streak }) : t("introMeta");
  }

  // The masthead ears flip to their next emoji in turn, only while the front page is showing.
  let earTick = 0;
  function flipEar(id, list) {
    if (!document.body.classList.contains("is-intro")) return;
    const el = $(id);
    el.textContent = list[earTick % list.length];
    el.classList.remove("flip");
    void el.offsetWidth;   // restart the animation
    el.classList.add("flip");
  }
  setInterval(() => { earTick++; flipEar("ear-sport", EAR_SPORTS); }, 2800);
  setTimeout(() => setInterval(() => flipEar("ear-geo", EAR_GEO), 2800), 1400);

  function showIntro() {
    document.body.classList.add("is-intro");
    renderIntro();
    // The title and play cards sit in the middle, over a faded world map that fills the screen.
    map.fitBounds(WORLD_VIEW, { paddingTopLeft: [8, 64], paddingBottomRight: [8, 8], animate: false });
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
    $("max-tag").textContent = t("maxTag", { max: num(window.Scoring.maxFor(round - 1)) });
    const badge = $("mult-badge");
    badge.textContent = mult(round - 1);
    badge.style.setProperty("--lvl", ROUND_COLORS[round - 1]);
    $("practice-tag").hidden = !game.practice;
    $("round").innerHTML = `${t("round")} <b>${pad2(round)}</b>/${pad2(ROUNDS)}`;

    $("progress").innerHTML = Array.from({ length: ROUNDS }, (_, i) => {
      const g = game.guesses[i];
      const cls = g ? `s${tier(g.points)}` : i === game.guesses.length ? "current" : "";
      return `<span class="${cls}"></span>`;
    }).join("");
  }

  function totalScore() {
    return window.Scoring.total(game.guesses.map((g) => g.points));
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
    $("timer-wrap").hidden = false;
    map.flyToBounds(WORLD_VIEW, {
      paddingTopLeft: [8, 64],
      paddingBottomRight: [8, $("panel").offsetHeight + 24],
      duration: 0.8
    });
    startRoundTimer();
  }

  // ── Round timer ─────────────────────────────────────────
  // Each question has ROUND_SECONDS. The deadline is saved with the game, so reloading
  // the page doesn't reset the clock. When it runs out, a pin already on the map is
  // taken as the answer; with no pin the question scores 0.
  let roundTimer = null;

  function startRoundTimer() {
    stopRoundTimer();
    const round = game.guesses.length;
    if (!game.deadline || game.deadline.round !== round) {
      game.deadline = { round, at: Date.now() + ROUND_SECONDS * 1000 };
      persist();
    }
    // Capped, so a device clock set back can't hand out extra time.
    const left = () => Math.min(game.deadline.at - Date.now(), ROUND_SECONDS * 1000);

    const tick = () => {
      const s = Math.max(0, Math.ceil(left() / 1000));
      $("timer").textContent = `${Math.floor(s / 60)}:${pad2(s % 60)}`;
      $("timer-fill").style.width = `${Math.max(0, left()) / (ROUND_SECONDS * 10)}%`;
      $("panel").classList.toggle("hurry", s <= 10);
      if (left() <= 0) timeUp();
    };
    roundTimer = setInterval(tick, 250);
    tick();
  }

  function stopRoundTimer() {
    clearInterval(roundTimer);
    roundTimer = null;
    $("panel").classList.remove("hurry");
  }

  function timeUp() {
    stopRoundTimer();
    if (game.revealed || game.guesses.length >= ROUNDS) return;
    if (game.pending) { confirmGuess(); return; }
    const q = game.questions[game.guesses.length];
    const before = totalScore();
    game.guesses.push({ lat: null, lng: null, km: null, points: 0 });
    game.revealed = true;
    persist();
    openReveal(before);
    L.marker([q.lat, q.lng], { icon: pinIcon("target"), interactive: false }).addTo(layer);
    buzz([30, 60, 30]);
    map.flyTo([q.lat, q.lng], Math.max(map.getZoom(), 4), { duration: 0.8 });
  }

  // An answer given in time has a pin; one that ran out of time has none.
  const timedOut = (g) => g.km == null;

  // Static texts of the answer card (safe to call again after a language switch).
  function renderReveal() {
    const q = game.questions[game.guesses.length - 1];
    const g = game.guesses[game.guesses.length - 1];
    const tr = tier(g.points);
    $("panel").style.setProperty("--tier", TIER_COLORS[tr]);
    $("tier-label").textContent = timedOut(g) ? t("timeUp") : t("tiers")[tr];
    $("answer").innerHTML = "";
    $("answer").append(loc(q, "answer"));
    if (q.year > 0) {
      const y = document.createElement("small");
      y.textContent = ` · ${q.year}`;
      $("answer").append(y);
    }
    $("points-max").textContent = `/ ${num(window.Scoring.maxFor(game.guesses.length - 1))} ${t("pts")}`;
    $("distance").textContent = timedOut(g) ? t("noAnswer") : t("away", { distance: fmtKm(g.km) });
    $("fact").textContent = loc(q, "fact");
    $("btn-next").textContent = game.guesses.length >= ROUNDS ? t("seeResults") : t("next");
  }

  // Switches the card from the question to its answer, with the points still at 0.
  function openReveal(before) {
    layer.clearLayers();
    pendingMarker = null;
    map.getContainer().classList.add("map-locked");
    renderReveal();
    $("points").textContent = "0";
    $("score").textContent = num(before);
    $("meter-fill").style.width = "0";
    $("timer-wrap").hidden = true;
    $("ask").hidden = true;
    $("reveal").hidden = false;
    renderPanelHead();
  }

  function confirmGuess() {
    if (!game.pending) return;
    stopRoundTimer();
    const q = game.questions[game.guesses.length];
    const guess = game.pending;
    const km = haversineKm(guess, q);
    const precision = window.Scoring.precisionFor(km);
    const points = window.Scoring.pointsFor(precision, game.guesses.length);
    const before = totalScore();
    game.guesses.push({ lat: guess.lat, lng: guess.lng, km, points: precision });
    game.revealed = true;
    persist();
    openReveal(before);
    // The pin lands, then turns into the question's sport and keeps moving.
    const guessMarker = L.marker(guess, { icon: pinIcon("guess"), interactive: false }).addTo(layer);
    setTimeout(() => guessMarker.setIcon(sportPin(q)), 350);

    // Fly so both pins fit above the card, then draw the route and count the points up.
    const bounds = L.latLngBounds([guess, [q.lat, q.lng]]);
    let played = false;
    const play = () => {
      if (played) return;
      played = true;
      animateRoute(guess, q, () => {
        countUp($("points"), 0, points);
        countUp($("score"), before, before + points);
        $("meter-fill").style.width = pct(precision);
        buzz(tier(precision) >= 3 ? [18, 50, 18] : 12);
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
    save(STORE_STATE, { date: todayKey(), day: game.day, puzzle: puzzleKey(), guesses: game.guesses, deadline: game.deadline });
  }

  // Identifies today's question set, so saved progress is dropped if the bank was edited.
  function puzzleKey() {
    return game.questions.map((q) => q.id).join("|");
  }

  function recordHistory() {
    window.Profile.addGame({
      day: game.day,
      date: todayKey(),
      practice: game.practice,
      questions: game.questions,
      guesses: game.guesses
    });
  }

  // ── End of game ─────────────────────────────────────────
  function finish() {
    if (!game.practice) recordGame(game.day, totalScore());
    recordHistory();
    showSummaryMap();
    openResults(true);
  }

  function showSummaryMap() {
    layer.clearLayers();
    let bounds = null;
    game.questions.forEach((q, i) => {
      const g = game.guesses[i];
      if (!g) return;
      let b;
      if (timedOut(g)) {
        L.marker([q.lat, q.lng], { icon: pinIcon("target", String(i + 1)), interactive: false }).addTo(layer);
        b = L.latLngBounds([[q.lat, q.lng], [q.lat, q.lng]]);
      } else {
        b = addPair(g, q, String(i + 1));
      }
      bounds = bounds ? bounds.extend(b) : b;
    });
    $("panel").classList.add("hidden");
    map.getContainer().classList.add("map-locked");
    if (bounds) map.flyToBounds(bounds, { paddingTopLeft: [50, 90], paddingBottomRight: [50, 90], maxZoom: 6, duration: 0.9 });
  }

  function verdict(total) {
    const thresholds = [300, 500, 700, 900];
    return t("verdicts")[thresholds.filter((x) => total >= x).length];
  }

  function openResults(animate = false) {
    const total = totalScore();
    $("results-kicker").textContent = game.practice ? t("practiceRound") : `SportGeo #${game.day}`;
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
        <span class="r-pts s${tier(g.points)}">${num(window.Scoring.pointsFor(g.points, i))}</span>`;
      li.querySelector(".r-name").textContent = loc(q, "answer");
      li.querySelector(".r-sub").textContent = `${icon(q)} ${timedOut(g) ? t("timeUp") : t("away", { distance: fmtKm(g.km) })}`;
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
    return `SportGeo #${game.day} · ${num(total)}/${num(MAX_TOTAL)}\n${squares}\n${url}`;
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

  // ── Profile modal ───────────────────────────────────────
  const ACHIEVEMENT_ICONS = {
    kickoff: '<path d="M8 5v14l11-7z"/>',
    bullseye: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
    hattrick: '<circle cx="5.5" cy="12" r="2.5"/><circle cx="12" cy="12" r="2.5"/><circle cx="18.5" cy="12" r="2.5"/>',
    cleansheet: '<path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z"/><path d="M9 12l2 2 4-4"/>',
    club800: '<path d="M8 4h8v5a4 4 0 0 1-8 0z"/><path d="M8 6H5v1a3 3 0 0 0 3 3M16 6h3v1a3 3 0 0 1-3 3M12 13v4M8 20h8"/>',
    week: '<path d="M12 3c1 3.5 5 5.5 5 10a5 5 0 0 1-10 0c0-2.5 1.5-4 2.5-5.5.5 2 1.5 3 2.5 3.5 0-3 0-5.5 0-8z"/>',
    allrounder: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>',
    marathon: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>'
  };

  const SPORTS_SHOWN = 6;   // the rest go in a "show all" fold
  let profileMap = null;
  let profilePins = null;

  function drawProfileMap(pins) {
    if (!profileMap) {
      profileMap = L.map("profile-map", {
        zoomControl: false,
        attributionControl: false,
        preferCanvas: true,
        minZoom: 0,
        maxZoom: 6,
        zoomSnap: 0.25,
        worldCopyJump: false
      });
      L.geoJSON(countries, {
        interactive: false,
        style: { fillColor: cssVar("--land"), fillOpacity: 1, color: cssVar("--land-border"), weight: 0.5 }
      }).addTo(profileMap);
      profilePins = L.layerGroup().addTo(profileMap);
    }
    profileMap.invalidateSize();
    profilePins.clearLayers();
    for (const p of pins) {
      L.circleMarker([p.lat, p.lng], {
        radius: 5,
        color: cssVar("--bg"),
        weight: 1.5,
        fillColor: cssVar(`--t${tier(p.points)}`),
        fillOpacity: 1,
        interactive: false
      }).addTo(profilePins);
    }
    if (pins.length) profileMap.fitBounds(L.latLngBounds(pins.map((p) => [p.lat, p.lng])), { padding: [24, 24], maxZoom: 4 });
    else profileMap.fitBounds(WORLD_VIEW);
  }

  function meterRow(label, avg, sub) {
    return `<div class="meter-row">
      <span class="mr-label">${label}</span>
      <span class="mr-bar"><span style="width:${pct(avg)}; background:${TIER_COLORS[tier(avg)]}"></span></span>
      <span class="mr-value num">${pct(avg)}</span>
      <small class="mr-sub">${sub}</small>
    </div>`;
  }

  function openStats() {
    const s = loadStats();
    const history = window.Profile.loadHistory();
    const byId = new Map(window.QUESTIONS.map((q) => [q.id, q]));
    const p = window.Profile.compute(history, s, byId);
    const sportName = (sport) => `${SPORT_ICONS[sport] || "🏆"} ${t("sports")[sport] || sport}`;

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

    const hasData = p.answers > 0;
    $("profile-empty").hidden = hasData;
    $("profile-data").hidden = !hasData;

    if (hasData) {
      $("highlights").innerHTML = p.strongest
        ? `<div class="highlight"><small>${t("strongest")}</small><b>${sportName(p.strongest.sport)}</b><span class="num">${pct(p.strongest.avg)}</span></div>
           <div class="highlight"><small>${t("weakest")}</small><b>${sportName(p.weakest.sport)}</b><span class="num">${pct(p.weakest.avg)}</span></div>`
        : `<p class="muted">${t("needMore")}</p>`;
      const answers = (n) => (n === 1 ? t("answersOne") : t("answersN", { n }));
      const sportRows = p.bySport.map((x) => meterRow(sportName(x.sport), x.avg, answers(x.n)));
      $("by-sport").innerHTML = sportRows.slice(0, SPORTS_SHOWN).join("");
      $("by-sport-more").innerHTML = sportRows.slice(SPORTS_SHOWN).join("");
      $("by-sport-more-wrap").hidden = sportRows.length <= SPORTS_SHOWN;
      $("by-sport-more-label").textContent = t("showAllSports", { n: sportRows.length });
      $("by-level").innerHTML = p.byLevel
        .filter((x) => x.n)
        .map((x) => meterRow(t("levels")[x.level], x.avg, answers(x.n)))
        .join("");
      $("achievements").innerHTML = p.achievements.map((a) => `
        <div class="badge-card${a.unlocked ? " unlocked" : ""}">
          <svg viewBox="0 0 24 24" aria-hidden="true">${ACHIEVEMENT_ICONS[a.key]}</svg>
          <div>
            <b>${t("achievements")[a.key][0]}</b>
            <small>${t("achievements")[a.key][1]}${a.goal && !a.unlocked ? ` · ${a.value}/${a.goal}` : ""}</small>
          </div>
        </div>`).join("");
      $("achievements-count").textContent =
        `${p.achievements.filter((a) => a.unlocked).length}/${p.achievements.length}`;
    }

    openModal("modal-stats");
    if (hasData) requestAnimationFrame(() => drawProfileMap(p.pins));
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
    game.deadline = null;
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
    if (!$("ask").hidden && game.guesses.length < ROUNDS) renderQuestion();
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

  // ── Updates ─────────────────────────────────────────────
  // A deployed page carries its own version. If the server already has a newer one
  // (the browser served this page from its cache), reload once to pick it up.
  const APP_VERSION = document.querySelector('meta[name="app-version"]').content;

  async function checkForUpdate() {
    if (APP_VERSION.startsWith("__")) return;   // local copy, not a deploy
    try {
      const res = await fetch(`version.json?t=${Date.now()}`, { cache: "no-store" });
      const { version } = await res.json();
      if (!version || version === APP_VERSION || sessionStorage.getItem("sg_reloaded_for") === version) return;
      sessionStorage.setItem("sg_reloaded_for", version);
      location.reload();
    } catch { /* offline, or no version file: keep playing */ }
  }

  // Coming back to a tab left open: load the new day's puzzle or a new release,
  // but never in the middle of a question.
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState !== "visible" || game.practice) return;
    const idle = document.body.classList.contains("is-intro") || game.guesses.length >= ROUNDS;
    if (!idle) return;
    if (dayNumber() !== game.day) location.reload();
    else checkForUpdate();
  });

  // ── Boot ────────────────────────────────────────────────
  function boot() {
    applyStaticTexts();
    game.questions = questionsForDay(game.day);
    const saved = load(STORE_STATE, null);
    if (saved && saved.date === todayKey() && saved.day === game.day && saved.puzzle === puzzleKey() &&
        Array.isArray(saved.guesses)) {
      game.guesses = saved.guesses.slice(0, ROUNDS);
      game.deadline = saved.deadline || null;
    }

    if (game.guesses.length >= ROUNDS) {
      recordHistory();   // no-op if already recorded; fills in games finished before history existed
      document.body.classList.remove("is-intro");
      renderPanelHead();
      showSummaryMap();
      openResults();
      return;
    }
    showIntro();
  }

  // Expose a few internals for debugging / tests.
  window.SportGeo = { questionsForDay, scoring: window.Scoring, haversineKm, dayNumber };

  boot();
  checkForUpdate();
})();
