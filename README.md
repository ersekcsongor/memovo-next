# Memovo — Next.js

The Memovo site: 21 pages in English, Hungarian and Romanian, built with Next.js 16 (App Router), React 19, TypeScript and Tailwind CSS v4.

```bash
npm run dev     # http://localhost:3000
npm run build   # production build, prerenders all 21 routes
npm run start   # serve the production build
```

## Frontend

Every page is React styled with Tailwind v4, and all of it ships as prerendered HTML with the interactive parts hydrating in the browser.

### Routes

| Route | Source |
| --- | --- |
| `/` | `app/page.tsx` |
| `/weddings` | `app/weddings/page.tsx` |
| `/events/[event]` | `app/events/[event]/page.tsx` — one template, 7 pages from `data/events.ts` |
| `/gallery`, `/gallery-demo` | `app/gallery/page.tsx`, `app/gallery-demo/page.tsx` |
| `/pricing`, `/how-it-works`, `/our-story`, `/meet-the-founders`, `/press-features`, `/community-events`, `/reviews`, `/faqs`, `/design-themes`, `/contact` | one folder each under `app/` |

Every route is static: `next build` prerenders all of them, including the seven event pages via `generateStaticParams`.

### Layout

`app/layout.tsx` wraps every page with `ConsentBar`, `Header`, `Footer` and `ChatBubble`, and loads Comfortaa, Montserrat and Playfair Display through `next/font/google`.

Each route splits into a server shim that carries `metadata` and a `"use client"` view that renders the copy, so SEO metadata and translation both work.

### Data

Page copy and assets live in `data/`, so the same content feeds several routes:

- `data/assets.ts` — every image path. The files ship with the repo in `public/images` and `public/flags`.
- `data/content.ts` — steps, features, plans, FAQs, reviews and gallery themes. Text fields hold translation keys.
- `data/events.ts` — the seven event pages, typed as `EventPage`, with a `copy` block per language.
- `data/currency.ts` — the six currencies and their rates.
- `data/i18n.ts` + `data/i18n.home.ts` — the English, Hungarian and Romanian dictionaries.

### Language switching

`components/LanguageProvider.tsx` holds the active language in React context and persists it to `localStorage`, so switching updates every string in place and survives navigation. The picker sits in the header next to the account button.

`useT()` returns a lookup that falls back to English for any key a translation is missing. English is the source of truth: `TranslationKey` is derived from the English dictionary, so TypeScript flags a Hungarian or Romanian entry that goes missing.

Customer review quotes stay in English — they are verbatim words from named people. The labels around them are translated.

### Currency switching

`components/Pricing.tsx` owns the selected currency in `useState`, so the cards re-render in place with no reload. Plans store a `usd` base amount and `data/currency.ts` converts it; a `null` amount renders the "Contact Us" label instead of a price.

### Images

All 53 photos and the 6 language flags live in `public/images` and `public/flags`, about 6 MB in total. Nothing is fetched from a remote host, so `images.remotePatterns` is empty and the pages render with no third-party requests. The built-in optimizer serves resized WebP copies and caches them on disk for 30 days.

Carousel slides load eagerly: they sit outside the viewport horizontally, where lazy loading never triggers.

### Design tokens

`app/globals.css` holds the palette and typography in a Tailwind v4 `@theme` block — `--color-navy: #072a47`, `--color-coral: #e58783`, `--color-blush: #fdecea`, and the rest. A second group maps the same palette onto shadcn's semantic token names (`--color-foreground`, `--color-muted-foreground`, `--color-secondary`), so components copied from a shadcn registry land on the brand colours with no class edits. The cookie-consent bar keeps its own `:root` variables.

## Backend

There is none. The repo has no API routes, no server actions, no database and no environment variables — `app/` holds page files only, and the seven runtime dependencies (`next`, `react`, `react-dom`, `framer-motion`, `@tabler/icons-react`, `clsx`, `tailwind-merge`) are all frontend packages.

Two pieces of work still happen outside the browser:

- **Build time** — `next build` renders all 19 routes to HTML and resolves `generateStaticParams` for the event pages. The output is a folder of static files.
- **Serve time** — `next start` runs a Node process that hands back those files and resizes images on first request through `/_next/image`. No application code of ours executes there.

Features that need a real server later — gallery uploads, guest accounts, payments — would arrive as a separate service. Nothing in this repo depends on one today.

## Screenshots

`scripts/shots.mjs` renders each route in its own list (19 of the 21) with Puppeteer, reports page height and any broken images, and writes full-page PNGs to `shots/`. It needs the production server running on port 3100 and Puppeteer available:

```bash
npm run build && npm run start -- -p 3100
node scripts/shots.mjs
```
