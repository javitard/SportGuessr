# Matchpin 📍

A daily sports geography game. Every day you get **5 famous sporting moments** (mostly European) —
click on the map where they happened. The closer you are, the more points you score (up to 1,000 per
day).

Inspired by [Farflung](https://farflung.game/) and [GeoSports](https://geosports.app/).

## Features

- Same 5 questions for everyone each day (deterministic, no backend needed), new set at local midnight
- Distance-based scoring with a growing multiplier (rules in [`js/scoring.js`](js/scoring.js)): each answer's
  precision is `e^(-km / 500)`, full marks within 10 km, applied to the question's maximum. The first question is
  worth up to 100 points and the multiplier rises by 0.5 each round (×1, ×1.5, ×2, ×2.5, ×3), so a perfect day is
  1,000 points
- Every day has the same difficulty curve: 2 easy, 2 medium and 1 hard question, played in that order
- Football plus F1, cycling, tennis, winter sports, rugby, golf, Olympics and more (392 questions)
- English and Spanish: picks the browser language, switchable with the EN/ES button
- Shareable emoji result (🟩🟨🟧🟥), stats & streaks saved in the browser
- Practice rounds with random questions after finishing the daily game
- Satellite map without labels (cities show up, but no names to read), from
  [Sentinel-2 cloudless](https://s2maps.eu) with no API key; the bundled country shapes draw the borders and stand
  in if the imagery can't load
- Zoom in and each country shows its two-letter code (ES, FR…), big countries first and small ones as they get room
- Night-stadium dark theme, start screen with today's line-up, animated reveal, share preview image (`og-image.png`), mobile friendly

## Run locally

It's a static site, no build step:

```bash
npx http-server .    # or: python3 -m http.server
```

Then open http://localhost:8080.

## Deploy (GitHub Pages)

The workflow in [`.github/workflows/pages.yml`](.github/workflows/pages.yml) publishes the site on every push to `main`.

1. Go to **Settings → Pages** and set *Source* to **GitHub Actions** (one-time setup).
2. Push to `main`: the game is live at `https://<user>.github.io/SportGuessr/` a minute later.

On deploy, the workflow replaces the `__VERSION__` placeholders in `index.html` with the commit id and writes
`version.json`. Every CSS/JS file is requested as `file?v=<commit>`, so a refresh never mixes old cached files with a
new release, and a page served from the browser cache notices the newer `version.json` and reloads itself once.

## Adding questions

Questions live in [`js/questions.js`](js/questions.js), with English and Spanish texts, a difficulty level and tags.
See **[docs/QUESTIONS.md](docs/QUESTIONS.md)** for the fields, tags and writing rules, and use the tool:

```bash
node tools/questions.mjs check        # validate (also runs in CI and before every deploy)
node tools/questions.mjs report       # coverage by level, sport, competition, country, decade
node tools/questions.mjs find <text>  # search existing questions
node tools/questions.mjs add new.csv  # add a batch from a spreadsheet or JSON file
```

Puzzle #1 is 22 October 2026 (`LAUNCH` in `js/game.js`). Adding questions changes the upcoming sequence, so it's
best to add them in batches.

## Credits

- Fonts: [Barlow Condensed](https://fonts.google.com/specimen/Barlow+Condensed) and [Geist](https://vercel.com/font) (SIL OFL), self-hosted in `vendor/fonts`
- Map: [Leaflet](https://leafletjs.com/) (vendored in `vendor/leaflet`, BSD-2-Clause)
- Satellite imagery: [Sentinel-2 cloudless](https://s2maps.eu) by EOX IT Services GmbH, contains modified Copernicus
  Sentinel data 2024 ([CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/), non-commercial use)
- Country shapes: [Natural Earth](https://www.naturalearthdata.com/) 1:50m via [world-atlas](https://github.com/topojson/world-atlas) (ISC), read with [topojson-client](https://github.com/topojson/topojson-client) (ISC)
