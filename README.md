# SportGuessr 📍

A daily sports geography game. Every day you get **5 famous sporting moments** (mostly European) —
click on the map where they happened. The closer you are, the more points you score (up to 1,000 per
question, 5,000 per day).

Inspired by [Farflung](https://farflung.game/) and [GeoSports](https://geosports.app/).

## Features

- Same 5 questions for everyone each day (deterministic, no backend needed), new set at local midnight
- Distance-based scoring: `1000 × e^(-km / 500)`, full marks within 10 km
- Every day has the same difficulty curve: 2 easy, 2 medium and 1 hard question, played in that order
- Football plus F1, cycling, tennis, winter sports, rugby, golf, Olympics and more (193 questions)
- English and Spanish: picks the browser language, switchable with the EN/ES button
- Shareable emoji result (🟩🟨🟧🟥), stats & streaks saved in the browser
- Practice rounds with random questions after finishing the daily game
- Map without labels (no cheating by reading city names), bundled with the game: no tile server or API key needed
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

Questions live in [`js/questions.js`](js/questions.js):

```js
{
  sport: "football",                 // used for the icon
  level: 2,                          // 1 easy, 2 medium, 3 hard (how hard the place is to pin)
  q: "Where did ... happen?",
  answer: "Stadium name, City",
  lat: 41.0745, lng: 28.7656,        // the venue itself
  year: 2005,
  fact: "Short trivia shown after guessing.",
  es: {                              // Spanish texts
    q: "¿Dónde ocurrió ...?",
    answer: "Nombre del estadio, Ciudad",
    fact: "Dato curioso que se muestra al responder."
  }
}
```

Golden rule: **the question must never name the place** (city, region, stadium) or anything right next to it,
including inside team or event names (e.g. "Miracle of Bern", "Lisbon Lions", Paris–Roubaix).

Interface texts are in [`js/i18n.js`](js/i18n.js).

Puzzle #1 is 22 October 2026 (`LAUNCH` in `js/game.js`). Adding questions to the bank changes the
upcoming sequence, so it's best to add them in batches.

## Credits

- Fonts: [Barlow Condensed](https://fonts.google.com/specimen/Barlow+Condensed) and [Geist](https://vercel.com/font) (SIL OFL), self-hosted in `vendor/fonts`
- Map: [Leaflet](https://leafletjs.com/) (vendored in `vendor/leaflet`, BSD-2-Clause)
- Country shapes: [Natural Earth](https://www.naturalearthdata.com/) 1:50m via [world-atlas](https://github.com/topojson/world-atlas) (ISC), read with [topojson-client](https://github.com/topojson/topojson-client) (ISC)
