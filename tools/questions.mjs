#!/usr/bin/env node
// Question bank tooling. No dependencies, just Node 18+.
//
//   node tools/questions.mjs check              validate js/questions.js (also run in CI)
//   node tools/questions.mjs report             coverage by level, sport, tag, country and decade
//   node tools/questions.mjs find <text>        search existing questions (any language)
//   node tools/questions.mjs add <file>         add questions from a .json or .csv file
//   node tools/questions.mjs format             rewrite js/questions.js in canonical order
//
// See docs/QUESTIONS.md for the fields, tags and writing rules.
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const QUESTIONS_FILE = path.join(ROOT, "js/questions.js");
const LEVELS = { 1: "easy", 2: "medium", 3: "hard" };
const LEVEL_MIX = { 1: 2, 2: 2, 3: 1 };   // questions per day, as in js/game.js

export const SPORTS = [
  "football", "tennis", "cycling", "motorsport", "athletics", "olympics", "winter", "rugby",
  "golf", "cricket", "boxing", "darts", "snooker", "horse racing", "rowing", "sailing",
  "swimming", "equestrian", "climbing", "basketball", "gaelic games", "surfing"
];

// Sections of js/questions.js, in file order.
const SECTIONS = [
  ["Football", ["football"]], ["Tennis", ["tennis"]], ["Cycling", ["cycling"]],
  ["Motorsport", ["motorsport"]], ["Athletics & Olympics", ["athletics", "olympics"]],
  ["Winter sports", ["winter"]], ["Rugby", ["rugby"]], ["Golf", ["golf"]], ["Cricket", ["cricket"]]
];
const OTHER = "Other sports";

// Capitalised words that may appear in both question and answer without giving the place away.
const GENERIC_WORDS = new Set([
  "Olympic", "Olympics", "Olímpico", "Olímpicos", "Stadium", "Estadio", "Cricket", "Palace", "Arena",
  "National", "Nacional", "Park", "Royal", "Circuit", "Circuito", "Grand", "Winter", "Summer", "World",
  "Games", "Juegos", "Hall", "Club", "Centre", "Center", "Racecourse", "Hipódromo", "Olímpic", "Hospital",
  "Course", "Ground", "Theatre", "Piazza", "Country", "Mount",
  "Badminton"   // the estate gave its name to the sport: the question is the riddle
]);

// ── Loading & saving ───────────────────────────────────

function loadScript(file, globalName) {
  const sandbox = { window: {} };
  vm.runInNewContext(fs.readFileSync(path.join(ROOT, file), "utf8"), sandbox, { filename: file });
  return sandbox.window[globalName];
}

export function loadQuestions() {
  return loadScript("js/questions.js", "QUESTIONS");
}

export function loadTags() {
  const tags = loadScript("js/tags.js", "TAGS");
  return { ...tags, all: { ...tags.competitions, ...tags.kinds } };
}

function sectionOf(q) {
  const found = SECTIONS.find(([, sports]) => sports.includes(q.sport));
  return found ? found[0] : OTHER;
}

export function render(questions) {
  const order = [...SECTIONS.map(([name]) => name), OTHER];
  const sorted = questions
    .map((q, i) => ({ q, i }))
    .sort((a, b) => order.indexOf(sectionOf(a.q)) - order.indexOf(sectionOf(b.q)) || a.i - b.i)
    .map(({ q }) => q);
  const s = (v) => JSON.stringify(v);
  let current = null;
  const blocks = sorted.map((q) => {
    let head = "";
    if (sectionOf(q) !== current) {
      head = `${current ? "\n" : ""}  // ───────────── ${sectionOf(q)} ─────────────\n`;
      current = sectionOf(q);
    }
    return `${head}  {
    id: ${s(q.id)}, sport: ${s(q.sport)}, level: ${q.level}, tags: ${s(q.tags || [])},
    q: ${s(q.q)},
    answer: ${s(q.answer)},
    lat: ${q.lat}, lng: ${q.lng}, year: ${q.year},
    fact: ${s(q.fact)},
    es: {
      q: ${s(q.es.q)},
      answer: ${s(q.es.answer)},
      fact: ${s(q.es.fact)}
    }
  }`;
  });
  return `// Question bank. Each daily puzzle draws 5 questions from here.
// Rule: the question must never name the place (or anything right next to it).
// Edit by hand or with tools/questions.mjs (see docs/QUESTIONS.md), then run
// \`node tools/questions.mjs check\`.
// Fields: id (permanent, never reused: players' history refers to it),
//         sport, level (1 easy, 2 medium, 3 hard — how hard the place is to pin),
//         tags (from js/tags.js), q (question), answer (place shown after guessing),
//         lat, lng (the venue itself), year, fact (short trivia shown on reveal),
//         es: { q, answer, fact } — Spanish version of the texts.
window.QUESTIONS = [
${blocks.join(",\n")}
];
`;
}

function save(questions) {
  fs.writeFileSync(QUESTIONS_FILE, render(questions));
}

// ── Validation ─────────────────────────────────────────

const normalize = (text) => text.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();

function capitalisedWords(text) {
  return (text.match(/[\p{Lu}][\p{L}'’-]{4,}/gu) || []).filter((w) => !GENERIC_WORDS.has(w));
}

function haversineKm(a, b) {
  const toRad = (x) => (x * Math.PI) / 180;
  const h = Math.sin(toRad(b.lat - a.lat) / 2) ** 2 +
    Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(toRad(b.lng - a.lng) / 2) ** 2;
  return 12742 * Math.asin(Math.min(1, Math.sqrt(h)));
}

export function validate(questions, tags) {
  const errors = [];
  const warnings = [];
  const label = (q, i) => `#${i} "${String(q.answer || q.q || "?").slice(0, 50)}"`;

  questions.forEach((q, i) => {
    const err = (msg) => errors.push(`${label(q, i)}: ${msg}`);
    const warn = (msg) => warnings.push(`${label(q, i)}: ${msg}`);

    if (typeof q.id !== "string" || !/^q\d{4}$/.test(q.id)) err(`id must look like "q0042", got ${JSON.stringify(q.id)}`);
    for (const f of ["q", "answer", "fact"]) {
      if (typeof q[f] !== "string" || !q[f].trim()) err(`missing ${f}`);
      if (!q.es || typeof q.es[f] !== "string" || !q.es[f].trim()) err(`missing es.${f}`);
    }
    if (!SPORTS.includes(q.sport)) err(`unknown sport "${q.sport}" (add it to SPORTS, js/game.js and js/i18n.js)`);
    if (![1, 2, 3].includes(q.level)) err(`level must be 1, 2 or 3, got ${q.level}`);
    if (typeof q.lat !== "number" || q.lat < -85 || q.lat > 85) err(`bad lat ${q.lat}`);
    if (typeof q.lng !== "number" || q.lng < -180 || q.lng > 180) err(`bad lng ${q.lng}`);
    if (!Number.isInteger(q.year)) err(`year must be an integer, got ${q.year}`);
    if (!Array.isArray(q.tags) || !q.tags.length) err("needs at least one tag");
    else {
      for (const t of q.tags) if (!tags.all[t]) err(`unknown tag "${t}" (see js/tags.js)`);
      if (new Set(q.tags).size !== q.tags.length) err("repeated tag");
    }
    if (typeof q.q !== "string" || !q.es || typeof q.es.q !== "string") return;

    // The golden rule: the question must not name the place.
    const leaks = [...capitalisedWords(q.answer), ...capitalisedWords(q.es.answer)]
      .filter((w) => normalize(q.q).includes(normalize(w)) || normalize(q.es.q).includes(normalize(w)));
    if (leaks.length) err(`question names the place: ${[...new Set(leaks)].join(", ")}`);

    if (!/[?¿]/.test(q.q) || !/\?/.test(q.es.q)) warn("question should end with a question mark");
    if (q.q.length > 180) warn(`long question (${q.q.length} chars)`);
    if (q.q === q.es.q || q.fact === q.es.fact) warn("Spanish text looks untranslated");
  });

  // Ids are permanent: each one used once.
  const ids = new Map();
  questions.forEach((q, i) => {
    if (ids.has(q.id)) errors.push(`#${i} reuses id ${q.id} (also #${ids.get(q.id)})`);
    else ids.set(q.id, i);
  });

  // Duplicates: same question, or same answer, year and sport.
  const seen = new Map();
  questions.forEach((q, i) => {
    for (const key of [`q:${normalize(q.q || "")}`, `a:${q.sport}|${normalize(q.answer || "")}|${q.year}`]) {
      if (seen.has(key)) errors.push(`#${i} duplicates #${seen.get(key)} (${key.slice(2, 70)})`);
      else seen.set(key, i);
    }
  });

  // Same venue written with different coordinates.
  questions.forEach((a, i) => questions.forEach((b, j) => {
    if (j > i && a.answer === b.answer && haversineKm(a, b) > 5) {
      warnings.push(`#${i} and #${j} share the answer "${a.answer}" but are ${Math.round(haversineKm(a, b))} km apart`);
    }
  }));

  return { errors, warnings };
}

// ── Country lookup (for the report) ────────────────────

function countryLookup() {
  const sandbox = { window: {}, self: {} };
  vm.runInNewContext(fs.readFileSync(path.join(ROOT, "vendor/topojson/topojson-client.min.js"), "utf8"), sandbox);
  vm.runInNewContext(fs.readFileSync(path.join(ROOT, "vendor/world/countries-50m.js"), "utf8"), sandbox);
  const topo = sandbox.window.WORLD_TOPO;
  const topojson = sandbox.topojson || sandbox.self.topojson;   // the UMD build attaches to `this`
  const features = topojson.feature(topo, topo.objects.countries).features;
  const inRing = (pt, ring) => {
    let inside = false;
    for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
      const [xi, yi] = ring[i];
      const [xj, yj] = ring[j];
      if ((yi > pt[1]) !== (yj > pt[1]) && pt[0] < ((xj - xi) * (pt[1] - yi)) / (yj - yi) + xi) inside = !inside;
    }
    return inside;
  };
  const polygonsOf = (f) => (f.geometry.type === "Polygon" ? [f.geometry.coordinates] : f.geometry.coordinates);
  return (q) => {
    const pt = [q.lng, q.lat];
    const hit = features.find((f) => polygonsOf(f).some((rings) => inRing(pt, rings[0]) && !rings.slice(1).some((h) => inRing(pt, h))));
    if (hit) return hit.properties.name;
    // Coastal venues can fall just outside the 1:50m outline: use the nearest border point.
    let best = null;
    let bestKm = Infinity;
    for (const f of features) {
      for (const rings of polygonsOf(f)) {
        for (const [lng, lat] of rings[0]) {
          const km = haversineKm(q, { lat, lng });
          if (km < bestKm) { bestKm = km; best = f.properties.name; }
        }
      }
    }
    return best;
  };
}

// ── Commands ───────────────────────────────────────────

function check() {
  const questions = loadQuestions();
  const { errors, warnings } = validate(questions, loadTags());
  warnings.forEach((w) => console.log(`warning  ${w}`));
  errors.forEach((e) => console.log(`error    ${e}`));
  console.log(`\n${questions.length} questions · ${errors.length} errors · ${warnings.length} warnings`);
  if (errors.length) process.exitCode = 1;
}

function table(title, counts, total) {
  console.log(`\n${title}`);
  const rows = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  const width = Math.max(...rows.map(([k]) => k.length));
  for (const [k, n] of rows) {
    const bar = "█".repeat(Math.max(1, Math.round((n / total) * 60)));
    console.log(`  ${k.padEnd(width)}  ${String(n).padStart(4)}  ${bar}`);
  }
}

function report() {
  const questions = loadQuestions();
  const tags = loadTags();
  const country = countryLookup();
  const count = (keyOf) => questions.reduce((acc, q) => {
    for (const k of [].concat(keyOf(q))) acc[k] = (acc[k] || 0) + 1;
    return acc;
  }, {});
  const n = questions.length;

  console.log(`${n} questions`);
  console.log("\nLevel                  questions   days before the pool reshuffles");
  for (const [lvl, name] of Object.entries(LEVELS)) {
    const k = questions.filter((q) => q.level === Number(lvl)).length;
    console.log(`  ${`${lvl} ${name}`.padEnd(20)} ${String(k).padStart(9)}   ${Math.floor(k / LEVEL_MIX[lvl])}`);
  }
  table("Sport", count((q) => q.sport), n);
  table("Competition", count((q) => q.tags.filter((t) => tags.competitions[t])), n);
  table("Kind", count((q) => q.tags.filter((t) => tags.kinds[t])), n);
  const unused = Object.keys(tags.all).filter((t) => !questions.some((q) => q.tags.includes(t)));
  if (unused.length) console.log(`\n  Tags not used yet: ${unused.join(", ")}`);
  const countries = count(country);
  table(`Country (${Object.keys(countries).length} countries)`, countries, n);
  table("Decade", count((q) => (q.year < 1900 ? "before 1900" : `${Math.floor(q.year / 10) * 10}s`)), n);
}

function find(text) {
  const needle = normalize(text);
  const questions = loadQuestions();
  const hits = questions
    .map((q, i) => ({ q, i }))
    .filter(({ q }) => [q.q, q.answer, q.fact, q.es.q, q.es.answer, q.es.fact].some((t) => normalize(t).includes(needle)));
  for (const { q, i } of hits) {
    console.log(`${q.id}  L${q.level} ${q.sport} ${q.year}  ${q.answer}  [${q.tags.join(", ")}]\n       ${q.q}`);
  }
  console.log(`${hits.length} match${hits.length === 1 ? "" : "es"}`);
}

// CSV with a header row; columns as in docs/QUESTIONS.md. Fields may be quoted ("...", "" for a quote).
// The separator is detected from the header: "," (Google Sheets) or ";" (Excel in Spanish).
export function parseCsv(text) {
  text = text.replace(/^\uFEFF/, "");
  const firstLine = text.split(/\r?\n/, 1)[0];
  const sep = (firstLine.match(/;/g) || []).length > (firstLine.match(/,/g) || []).length ? ";" : ",";
  const rows = [];
  let row = [];
  let field = "";
  let quoted = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c === '"' && text[i + 1] === '"') { field += '"'; i++; }
      else if (c === '"') quoted = false;
      else field += c;
    } else if (c === '"') quoted = true;
    else if (c === sep) { row.push(field); field = ""; }
    else if (c === "\n" || c === "\r") {
      if (c === "\r" && text[i + 1] === "\n") i++;
      row.push(field); field = "";
      if (row.some((v) => v.trim())) rows.push(row);
      row = [];
    } else field += c;
  }
  row.push(field);
  if (row.some((v) => v.trim())) rows.push(row);
  const [header, ...data] = rows;
  const cols = header.map((h) => h.trim().toLowerCase());
  return data.map((r) => {
    const get = (name) => (r[cols.indexOf(name)] ?? "").trim();
    return {
      id: get("id") || undefined,
      sport: get("sport"),
      level: Number(get("level")),
      tags: get("tags").split("|").map((t) => t.trim()).filter(Boolean),
      q: get("q"),
      answer: get("answer"),
      lat: Number(get("lat")),
      lng: Number(get("lng")),
      year: Number(get("year")),
      fact: get("fact"),
      es: { q: get("q_es"), answer: get("answer_es"), fact: get("fact_es") }
    };
  });
}

function add(file) {
  if (!file) throw new Error("usage: node tools/questions.mjs add <file.json|file.csv>");
  const text = fs.readFileSync(file, "utf8");
  const incoming = file.endsWith(".csv") ? parseCsv(text) : JSON.parse(text);
  const questions = loadQuestions();
  assignIds(questions, incoming);
  const merged = [...questions, ...incoming];
  const { errors, warnings } = validate(merged, loadTags());
  warnings.forEach((w) => console.log(`warning  ${w}`));
  if (errors.length) {
    errors.forEach((e) => console.log(`error    ${e}`));
    console.log(`\nNothing was added: fix the ${errors.length} error(s) above.`);
    process.exitCode = 1;
    return;
  }
  save(merged);
  console.log(`Added ${incoming.length} questions (${merged.length} in total).`);
}

// New questions get the next free ids. Ids are never renumbered or reused, because
// players' saved history refers to them.
export function assignIds(existing, incoming) {
  let next = Math.max(0, ...existing.map((q) => Number(String(q.id).slice(1)) || 0)) + 1;
  for (const q of incoming) {
    if (!q.id) q.id = `q${String(next++).padStart(4, "0")}`;
  }
}

function format() {
  save(loadQuestions());
  console.log("js/questions.js rewritten.");
}

const COMMANDS = { check, report, find, add, format };

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const [cmd, ...args] = process.argv.slice(2);
  if (!COMMANDS[cmd]) {
    console.log("usage: node tools/questions.mjs <check|report|find|add|format> [args]");
    process.exitCode = 1;
  } else {
    COMMANDS[cmd](...args);
  }
}
