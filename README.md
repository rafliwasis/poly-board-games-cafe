# Poly Board Games Cafe

A website for **Poly Board Games Cafe**: a browsable catalog of 100+ board games, a food & drink menu, a table reservation flow, and an AI-powered "Game Master" that recommends a game (or teaches you the rules of one) based on a plain-language request.

Built with [Next.js](https://nextjs.org/) (Pages Router) serving a set of hand-crafted static mockup pages, with one live API route for the AI feature.

## What it does

- **Home / catalog** — Poly's brand intro plus a searchable, filterable catalog of the full game library (search by name, filter by difficulty and player count).
- **Game Master AI** — a chat-style widget where a guest can type something like *"we're 6 people who like bluffing games"* or *"how do you play Azul?"* and get back either:
  - a **recommendation**: one game from the real catalog, with a short tailored reason, or
  - **rules/instructions** for a game the guest already named, or
  - a **clarifying question** if the request is too vague to answer confidently.

  It replies in whatever language the guest wrote in (English or Indonesian). See [RECOMMENDER_POC.md](RECOMMENDER_POC.md) for the proof-of-concept behind this feature, including the full ML request flow.
- **Menu** — food and drink menu with tabbed categories.
- **About** — cafe information and FAQ.
- **Reservation** — a table-booking preview (time/table selection) that hands off a pre-filled message to WhatsApp for confirmation.

## Tech stack

- **Frontend:** Next.js Pages Router, vanilla JS/CSS mockups served from `public/` (no CSS framework — see [DESIGN.md](DESIGN.md) for the full design system).
- **Backend:** a single Next.js API route (`/api/recommend`) that talks to the [Groq](https://groq.com/) API (`openai/gpt-oss-20b`) for fast LLM inference. The game catalog is injected into the prompt so the model can only recommend games that actually exist — it never invents one.
- **Deployment:** configured for [Vercel](https://vercel.com/) (`vercel.json`).

## Run locally

Install dependencies and start the Next.js development server:

```powershell
npm ci
npm run dev
```

Then visit <http://localhost:3000>.

### Enabling the Game Master AI

The recommender needs a Groq API key. Create `.env.local` in the project root:

```
GROQ_API_KEY=your-groq-api-key
```

Without it, the rest of the site still works — only the AI recommendation path returns a "not configured yet" message.

## Project structure

```text
components/                Shared Next.js transition components
data/games.js              Server-side catalog + game guides used by /api/recommend
pages/                      Clean routes: /, /about, /menu, /reservation
pages/api/recommend.js      Game Master AI endpoint (Groq-backed)
public/                     Canonical browser-ready mockup
  images/games/             Board-game artwork and source notes
  site-header.js            Shared navigation for every mockup page
  home-static.html + app.js + game-master.js   Home, game catalog, AI widget
  menu-static.html + menu.js                   Food and drink menu
  about-static.html                            Cafe information and FAQ
  reservation-static.html + .js                Table-booking mockup
  styles.css                Shared visual system
```

The Next.js Pages Router provides clean public routes and hands off to the canonical mockup files in `public/`, so edits have one source of truth.

## Next.js + TypeScript handoff

The game-guide mockup is separated to keep a future migration mechanical:

- Keep browser-ready artwork in `public/images/games/`; this is the only asset source.
- Rename `game-details.js` to `data/game-details.ts`, export `gameDetails`, and use the documented `GameDetail` shape as a TypeScript interface. The image object supports separate `cardSrc` and `modalSrc` artwork with `src` as the legacy fallback.
- Port `gameCard()` and the `#game-dialog` markup into `GameCard` and `GameModal` components.
- Port `reservation.js` into typed `ReservationForm`, `TimePicker`, and `TableMap` components; replace the mock occupancy map with an availability API response.
- Make the catalog/modal wrapper a Client Component because opening the modal and applying filters are interactive.
- Keep `gameDetails` server-safe: it contains data only and does not access browser APIs.
