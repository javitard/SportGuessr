# Writing questions

All questions live in [`js/questions.js`](../js/questions.js). Tags are defined in [`js/tags.js`](../js/tags.js).
The tool [`tools/questions.mjs`](../tools/questions.mjs) (Node 18+, no install needed) validates, searches and adds them.

```bash
node tools/questions.mjs check          # validate everything (CI runs this on every push and PR)
node tools/questions.mjs report         # what we have: by level, sport, competition, kind, country, decade
node tools/questions.mjs find "Messi"   # search before writing, to avoid duplicates (accents ignored)
node tools/questions.mjs add new.csv    # add a batch from a spreadsheet (.csv) or a .json file
node tools/questions.mjs format         # rewrite js/questions.js in canonical order
```

`add` validates the whole bank with the new questions and **writes nothing if there is any error**.

## The golden rule

**The question must never name the place**, nor anything right next to it, including inside a team or event name
("Miracle of Bern", "Lisbon Lions", "Paris–Roubaix", "Bayern's own stadium"). Naming *another* place to mislead is fine
("Inter Milan won the 2010 final" → Madrid). `check` flags any capitalised word from the answer that appears in the
question; generic words like *Stadium* or *Olympic* are allowed (list in `GENERIC_WORDS`).

## Fields

| Field | Meaning |
| --- | --- |
| `id` | Permanent identifier like `q0042`. `add` assigns it; never change or reuse one, since players' history refers to it. |
| `sport` | One of the sports listed in `SPORTS` (tools/questions.mjs). A new sport also needs an icon in `js/game.js` and names in `js/i18n.js`. |
| `level` | How hard the **place** is to pin, not how obscure the fact is. `1` easy (famous city), `2` medium, `3` hard (small town or a surprise). Each day uses 2 easy, 2 medium and 1 hard. |
| `tags` | At least one, from `js/tags.js` (below). |
| `q` / `es.q` | The question in English and Spanish. Ends with a question mark, ideally under 150 characters. |
| `answer` / `es.answer` | Shown after guessing: `"Venue, City"`. |
| `lat`, `lng` | The venue itself (stadium, track, course…), not the city centre. Decimal degrees. |
| `year` | When it happened (negative for BC). Shown next to the answer. |
| `fact` / `es.fact` | One short sentence of trivia shown after guessing. It may name the place. |

## Tags

**Competitions**: a daily puzzle never has two questions from the same competition:
`world-cup`, `euros`, `champions-league`, `uefa-cups`, `olympics`, `winter-olympics`, `grand-slam`, `f1`, `motogp`,
`tour-de-france`, `rugby-world-cup`, `ryder-cup`.

**Kinds**: what the question is about: `final`, `record`, `first`, `host`, `venue`, `birthplace`, `derby`,
`women`, `upset`, `history`, `organisation`.

Adding a tag is just a new line in `js/tags.js`.

## Adding a batch from a spreadsheet

1. Copy [`docs/questions-template.csv`](questions-template.csv) into Google Sheets or Excel: one row per question.
2. Columns: `sport, level, tags, q, answer, lat, lng, year, fact, q_es, answer_es, fact_es`.
   Separate several tags with `|` (e.g. `champions-league|final`).
3. Export as CSV. Commas (Google Sheets) and semicolons (Excel in Spanish) both work.
4. Run `node tools/questions.mjs add file.csv`, fix any errors it lists, then `check`.

To get coordinates, right-click the venue in Google Maps: the first item is `lat, lng`.

## Checklist before committing

- [ ] `find` shows the event isn't already in the bank.
- [ ] The question doesn't name the place (`check` passes).
- [ ] Coordinates point at the venue.
- [ ] The level is about the place being easy or hard to find.
- [ ] The fact is accurate. Double-check anything from the last couple of years.
- [ ] `report` still looks balanced: easy questions run out first, since two are used every day.
