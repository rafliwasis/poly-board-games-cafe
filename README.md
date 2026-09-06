# Poly Board Games Cafe

A responsive website concept for Poly Board Games Cafe, built from the supplied brand materials and game catalog.

## Current experience

- Brand-led introduction to Poly and its Game Master service
- Searchable catalog of 102 board games
- Difficulty and player-count filters
- Progressive game-card loading
- Responsive desktop and mobile layouts

## Run locally

Install dependencies and start the Next.js development server:

```powershell
npm ci
npm run dev
```

Then visit <http://localhost:3000>.

The current Next.js pages wrap the existing static experience in `public/`. The original root-level files are retained as the editable mockup source while the component migration is in progress.

## Next.js + TypeScript handoff

The game-guide mockup is separated to keep the migration mechanical:

- Keep the browser-ready artwork in `public/images/games/`; the matching root-level assets are retained for the static mockup.
- Rename `game-details.js` to `data/game-details.ts`, export `gameDetails`, and use the documented `GameDetail` shape as a TypeScript interface. The image object supports separate `cardSrc` and `modalSrc` artwork with `src` as the legacy fallback.
- Port `gameCard()` and the `#game-dialog` markup into `GameCard` and `GameModal` components.
- Make the catalog/modal wrapper a Client Component because opening the modal and applying filters are interactive.
- Keep `gameDetails` server-safe: it contains data only and does not access browser APIs.
