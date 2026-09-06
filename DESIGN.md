# Poly Board Games Cafe — Design System

Internal reference for the Poly visual language.
Single stylesheet, vanilla CSS, no framework dependencies.

---

## 1. Color Palette

### Primary Tokens (`:root` CSS Variables)

| Token | Hex | Role |
|---|---|---|
| `--ink` | `#17202b` | Primary text, borders, dark backgrounds (header, footer) |
| `--cream` | `#f8f3e7` | Page background — warm off-white |
| `--paper` | `#fffdf7` | Card & section backgrounds — lighter than cream |
| `--blue` | `#1769c2` | Brand accent, hero board, card art cycling colors |
| `--yellow` | `#ffd21c` | CTA highlights, accent shadows, game master strip |
| `--red` | `#f43b36` | Brand die, pawn, hard-difficulty badge, eyebrow diamond |
| `--green` | `#33b447` | Brand letter, pawn, easy-difficulty badge |
| `--line` | `#d9d3c6` | Subtle borders, dividers, card meta separators |
| `--blue-dark` | `#0b4388` | Declared — currently **unused** |
| `--orange` | `#ff9f1c` | Declared — currently **unused** |

### Hardcoded Colors (Recurring)

| Hex | Usage |
|---|---|
| `#4f5660` | Hero lead text |
| `#5d6269` | Section heading body, filter text, tab text |
| `#60656d` | Mini-note text, promo description |
| `#6a6e73` | Results count, empty state text, menu item description |
| `#686d73` | Card copy description |
| `#aeb5bd` | Footer secondary text (on dark bg) |
| `#f0ece2` | Search box bg, mood tag bg, promo chip bg |
| `#20c84b` | Easy difficulty filter dot |
| `#f4c800` | Medium difficulty filter dot |
| `#fa3d36` | Hard difficulty filter dot |
| `rgba(23,32,43,.15)` | Header border-bottom, game controls shadow |
| `rgba(23,32,43,.05)` | Menu section shadow |

### Card Accent Colors (Cycling)

Cards cycle through 6 accent colors via `--card-accent`:
`--blue`, `--yellow`, `--green`, `--red`, `--orange`, `--blue-dark`
These set the card art background and hover shadow color.

### Known Inconsistencies

- Medium difficulty: filter dot `#f4c800` vs badge `#e9bf00`
- Hard difficulty: filter dot `#fa3d36` vs badge `#f43b36`

---

## 2. Typography

### Font Stack

| Context | Font | Source | Weights |
|---|---|---|---|
| Headings, brand, badges, playful elements | **Fredoka** | Google Fonts | 500, 600, 700 |
| Body text, navigation, UI elements | **DM Sans** | Google Fonts | 400, 500, 600, 700 |

### Type Scale

| Size | Where Used |
|---|---|
| `clamp(64px, 7vw, 99px)` | `h1` — hero headline |
| `clamp(54px, 6vw, 78px)` | `h2` — section headlines |
| `clamp(38px, 4.5vw, 60px)` | Hero board message strong |
| `62px` | Card art watermark (pseudo-element) |
| `48px` | Scribble decorations |
| `46px` | Floating cards |
| `39px` | Strip doodle |
| `31px` | Brand logo, game master icon |
| `26px` | Empty state heading |
| `25px` | Search icon, game master strip span |
| `21px` | Board message |
| `20px` | Card copy heading |
| `18px` | Hero lead, game master body, promo card heading |
| `17px` | Section heading body, player count |
| `16px` | Menu price |
| `15px` | Menu item heading |
| `14px` | Navigation, promo description |
| `13px` | Filter buttons, results count, menu item description |
| `12px` | Eyebrow, game number, mini-note, card description, players, mood tags, promo chips |
| `10px` | Mood tag (smallest) |
| `9px` | Brand tagline "board games cafe" |

### Font Weights

| Weight | Usage |
|---|---|
| `800` | Menu prices |
| `700` | Brand, headings, buttons, badges, filter active, tabs, card headings |
| `600` | Navigation, player filter select, body font medium |
| `400` | Body text default |

### Letter Spacing

| Value | Context |
|---|---|
| `-4px` | Brand logo (tight, compact) |
| `-3px` | `h1`, `h2` (display headings) |
| `-0.3px` | Card copy h3 |
| `2px` | Eyebrow label (spread) |
| `1.7px` | Brand tagline |
| `1px` | Game number badge |

### Line Heights

| Value | Context |
|---|---|
| `.96` | `h1`, `h2` (very tight for display) |
| `1.12` | Card copy h3 |
| `1.2` | Board message |
| `1.5` | Body text, mini-note, card descriptions |
| `1.65` | Hero lead, section body copy |

---

## 3. Spacing System

### Container Widths

| Pattern | Usage |
|---|---|
| `min(1180px, calc(100% - 40px))` | Site header, hero, games section, menu section (desktop) |
| `min(1180px, calc(100% - 24px))` | Same containers at ≤680px |
| `max(20px, calc((100% - 920px) / 2))` | Game master strip content |
| `max(20px, calc((100% - 1180px) / 2))` | Footer content |

### Gap / Spacing Scale

| Value | Context |
|---|---|
| `5px` | Filter group internal gap |
| `7px` | Player filter gap |
| `8px` | Search box gap, promo games gap |
| `9px` | Eyebrow gap (icon + text) |
| `10px` | Menu tabs gap |
| `12px` | Game controls gap, menu item internal gap |
| `14px` | Menu list gap, promo list gap, legend gap |
| `18px` | Game grid gap |
| `22px` | Menu body gap |
| `24px` | Hero actions gap, game master strip gap |
| `30px` | Footer gap |
| `32px` | Navigation gap |
| `40px` | Section heading gap |
| `52px` | Hero grid gap |

### Key Margins

| Value | Context |
|---|---|
| `44px auto 70px` | Hero section |
| `55px 0 25px` | Game controls (top margin) |
| `100px 0 110px` | Games section |
| `34px auto 0` | Show more button |
| `60px auto` | Menu section |
| `70px 20px` | Empty state |

---

## 4. Shadow & Border

### Shadow Pattern — Flat Offset (No Blur)

All shadows use the format: `Xpx Ypx 0 color`
No blur radius, ever. This creates the retro paper-cutout aesthetic.

| Offset | Usage |
|---|---|
| `9px 11px 0 var(--yellow)` | Hero board (largest) |
| `7px 8px 0 var(--card-accent)` | Game card hover |
| `6px 7px 0 var(--ink)` | Dice |
| `5px 6px 0 var(--ink)` | Floating cards |
| `4px 5px 0 var(--ink)` | Pawns |
| `4px 5px 0 rgba(23,32,43,.15)` | Game controls |
| `4px 5px 0 rgba(23,32,43,.05)` | Menu section (very subtle) |
| `3px 4px 0 var(--ink)` | Primary button |
| `3px 4px 0 var(--yellow)` | Show more button, active tab |
| `3px 3px 0 var(--ink)` | Game master icon |
| `2px 2px 0 var(--ink)` | Difficulty badges, game cards (default) |
| `1px 2px 0 var(--ink)` | Brand letters, brand die |

### Border Patterns

| Style | Usage |
|---|---|
| `2px solid var(--ink)` | Game cards, game controls, menu items, promo cards |
| `2px solid var(--line)` | Card meta, player filter, menu item borders |
| `3px solid var(--ink)` | Game master strip (top/bottom) |
| `2px dashed var(--line)` | Empty state |
| `1px solid rgba(23,32,43,.15)` | Site header border-bottom |

### Border Radius Scale

| Value | Usage |
|---|---|
| `999px` | Pill shapes — buttons, mood tags, promo chips, CTA |
| `38% 34% 36% 28% / 28% 34% 36% 38%` | Hero board (organic blob) |
| `45% 45% 22% 22%` | Pawn body shape |
| `50%` | Circles — difficulty badges, icons, pawn heads, dice dots |
| `24px` | Dice |
| `18px` | Game cards, game controls, menu section, empty state |
| `14px` | Floating cards, promo cards |
| `12px` | Tab buttons, menu items |
| `11px` | Search box |
| `10px` | Filter buttons |
| `7px` | Brand die |

---

## 5. Component Catalog

### Header (`.site-header`)

- Flex, space-between, centered, height `86px` (72px on mobile)
- Content width: `min(1180px, calc(100% - 40px))`
- Bottom border: `1px solid rgba(23,32,43,.15)`

### Brand Logo (`.brand`)

- CSS Grid, 4 columns
- Fredoka 31px, weight 700, letter-spacing -4px
- Each letter: colored `<span>` with white text-stroke + ink text-shadow
- Inline CSS die shape (red square with white dots, rotated -9deg)
- Tagline: "board games cafe" — 9px, spread letter-spacing

### Navigation (`nav`)

- Flex, gap 32px, DM Sans 14px, weight 600
- Links: inherit color, transition .2s ease, hover → blue
- CTA: pill shape (999px radius), ink bg, white text + yellow span accent

### Hero Section (`.hero`)

- CSS Grid: `1.02fr .98fr`, min-height 570px, gap 52px
- Left: eyebrow + h1 + lead text + CTA button + mini-note
- Right: `.hero-board` — organic blob illustration container

### Hero Board (`.hero-board`)

- 560px tall, blue bg, asymmetric blob border-radius
- Sunburst overlay (repeating-conic-gradient)
- Contains: floating cards, pawns, dice, board message, doodles
- Shadow: `9px 11px 0 var(--yellow)`
- Rotated 1deg

### Game Master Strip (`.game-master-strip`)

- Full-width yellow band, border-block: 3px solid ink
- Flex: red circle icon + text + arrow doodle
- Content width: `max(20px, calc((100% - 920px) / 2))`

### Game Controls (`.game-controls`)

- CSS Grid: `minmax(230px, 1fr) auto auto`
- Paper bg, 2px solid ink, 18px radius, offset shadow
- Contains: search box + difficulty filters + player dropdown

### Search Box (`.search-box`)

- Flex, gap 8px, warm gray bg (#f0ece2), 11px radius, height 46px

### Filter Buttons (`.filter`)

- Borderless, 10px radius, padding 0 11px
- Default: transparent bg, #5d6269 text
- Active: ink bg, white text

### Game Card (`.game-card`)

- CSS Grid child, paper bg, 2px solid ink, 18px radius
- Flex column: card-art (128px) → card-copy → card-meta
- Hover: `translateY(-6px) rotate(-.5deg)`, accent-colored shadow
- Animation: cardIn .35s fade-up

### Card Art (`.card-art`)

- 128px height (105px on mobile), colored by `--card-accent`
- Sunburst pseudo-element overlay
- Game mark via `::after { content: attr(data-mark) }`

### Difficulty Badge (`.difficulty-badge`)

- 30x30px circle, white border, ink offset shadow
- Colors: `.E` green (#20c84b), `.M` yellow (#e9bf00), `.H` red (#f43b36)

### Empty State (`.empty-state`)

- Centered, 70px 20px padding
- Dashed border, 18px radius
- Yellow circle with "?" + heading + description

### Show More Button (`.show-more`)

- Pill shape (999px), ink bg, yellow offset shadow
- Centered, margin-top 34px
- Hidden when no more results

### Menu Section (`.menu-section`)

- Centered, 46px padding, paper bg, 2px solid ink, 18px radius
- Subtle shadow: `4px 5px 0 rgba(23,32,43,.05)`

### Tab Buttons (`.tab-button`)

- Borderless, 12px radius, weight 700
- Active: ink bg + white text + 3px 4px 0 yellow shadow
- Inactive: transparent bg

### Menu Items (`.menu-item`)

- Flex row, space-between, white bg, line border, 12px radius, 14px padding

### Promo Cards (`.promo-card`)

- Gradient bg (#fff → #fffaf0), 2px solid ink, 14px radius
- Flex column, gap 10px, 16px padding

### Promo Chips (`.promo-chip`)

- Pill shape (999px), warm gray bg (#f0ece2), 12px font, weight 700

### Footer

- Dark bg (ink), white text, min-height 160px
- Flex, space-between, centered vertically
- Content width: `max(20px, calc((100% - 1180px) / 2))`
- Brand variant: no text-shadow, no die shadow

---

## 6. Layout & Grid

### Max Content Width

`1180px` with `40px` horizontal padding (reduces to `24px` at ≤680px)

### Game Grid

| Breakpoint | Columns | Gap |
|---|---|---|
| >980px | 4 | 18px |
| 680–980px | 3 | 18px |
| 430–680px | 2 | 11px |
| <430px | 1 | — |

### Hero Grid

| Breakpoint | Layout |
|---|---|
| >980px | 2-column: `1.02fr .98fr` |
| ≤980px | Single column, stacked |

### Menu Grid

| Breakpoint | Columns |
|---|---|
| >980px | 3 |
| 430–980px | 2 |
| <430px | 1 |

### Breakpoints Summary

| Breakpoint | Key Changes |
|---|---|
| `980px` | Hero stacks, game grid 4→3, controls stack, section heading stacks |
| `680px` | Nav text links hidden (CTA only), header shrinks, game grid 3→2, footer stacks, menu 3→2 |
| `430px` | Game grid 2→1, menu 2→1, green pawn hidden, board shrinks |

### Accessibility

- `prefers-reduced-motion: reduce` — disables all animations/transitions
- `aria-label` on nav, hero illustration, filter controls
- `aria-live="polite"` on game grid for screen reader updates

---

## 7. Do's & Don'ts

### Do

- Use CSS variables (`--ink`, `--cream`, etc.) for all colors
- Keep shadows flat offset: `Xpx Ypx 0 color` — never add blur
- Use Fredoka for headings, DM Sans for body text
- Maintain 2px solid ink borders on cards, 3px on strips
- Use `999px` radius for all pill/rounded-full shapes
- Build illustrations with CSS shapes — no image files
- Use the card accent color cycling system for visual variety
- Include difficulty badges on all game cards
- Maintain the playful/retro paper-cutout feel

### Don't

- Don't use hardcoded hex when a CSS variable exists
- Don't add blur radius to box-shadows
- Don't use images for illustrations — everything is CSS-only
- Don't use fonts outside Fredoka / DM Sans pairing
- Don't break the flat offset shadow pattern with drop-shadow or filter: drop-shadow
- Don't use border-radius values that aren't in the established scale
- Don't mix font weights below 400 or above 800
- Don't add new colors without updating `:root` tokens first
- Don't ignore `prefers-reduced-motion`

### Color Usage Quick Reference

| Element | Color |
|---|---|
| Primary text | `var(--ink)` |
| Page background | `var(--cream)` |
| Card/section backgrounds | `var(--paper)` |
| CTA / highlights | `var(--yellow)` |
| Interactive hover | `var(--blue)` |
| Danger / accent | `var(--red)` |
| Success / accent | `var(--green)` |
| Subtle borders | `var(--line)` |
