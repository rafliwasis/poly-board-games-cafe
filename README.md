# Poly Board Games Cafe

A responsive website concept for Poly Board Games Cafe, built from the supplied brand materials and game catalog.

## Current experience

- Brand-led introduction to Poly and its Game Master service
- Searchable catalog of 102 board games
- Difficulty and player-count filters
- Progressive game-card loading
- Interactive reservation preview with time and table selection
- Pre-filled WhatsApp booking handoff (pending Poly's confirmed number)
- Responsive desktop and mobile layouts

## Run locally

Install dependencies and start the Next.js development server:

```powershell
npm ci
npm run dev
```

Then visit <http://localhost:3000>.

The current Next.js Pages Router provides clean public routes and hands off to the canonical mockup files in `public/`. Root-level duplicates have been removed, so edits now have one source of truth.

## Project structure

```text
components/                Shared Next.js transition components
pages/                     Clean routes: /, /about, /menu, /reservation
public/                    Canonical browser-ready mockup
  images/games/            Board-game artwork and source notes
  site-header.js           Shared navigation for every mockup page
  index.html + app.js      Home and game catalog
  menu.html + menu.js      Food and drink menu
  about.html               Cafe information and FAQ
  reservation.html + .js  Table-booking mockup
  styles.css               Shared visual system
```

## Next.js + TypeScript handoff

The game-guide mockup is separated to keep the migration mechanical:

- Keep browser-ready artwork in `public/images/games/`; this is the only asset source.
- Rename `game-details.js` to `data/game-details.ts`, export `gameDetails`, and use the documented `GameDetail` shape as a TypeScript interface. The image object supports separate `cardSrc` and `modalSrc` artwork with `src` as the legacy fallback.
- Port `gameCard()` and the `#game-dialog` markup into `GameCard` and `GameModal` components.
- Port `reservation.js` into typed `ReservationForm`, `TimePicker`, and `TableMap` components; replace the mock occupancy map with an availability API response.
- Make the catalog/modal wrapper a Client Component because opening the modal and applying filters are interactive.
- Keep `gameDetails` server-safe: it contains data only and does not access browser APIs.
