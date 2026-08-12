# Memovo — Next.js

A recreation of the Memovo site, built with Next.js 16 (App Router), React 19, TypeScript and Tailwind CSS v4.

## Running it

```bash
npm run dev     # http://localhost:3000
npm run build   # production build, prerenders all 19 routes
npm run start   # serve the production build
```

## Routes

| Route | Source |
| --- | --- |
| `/` | `app/page.tsx` |
| `/weddings` | `app/weddings/page.tsx` |
| `/events/[event]` | `app/events/[event]/page.tsx` — one template, 7 pages from `data/events.ts` |
| `/pricing`, `/how-it-works`, `/our-story`, `/meet-the-founders`, `/press-features`, `/community-events`, `/reviews`, `/faqs`, `/design-themes`, `/contact` | one folder each under `app/` |

Every route is static: `next build` prerenders all of them, including the seven event pages via `generateStaticParams`.

## Layout

`app/layout.tsx` wraps every page with `ConsentBar`, `Header`, `Footer` and `ChatBubble`, and loads Comfortaa, Montserrat and Playfair Display through `next/font/google`.

Each route splits into a server shim that carries `metadata` and a `"use client"` view that renders the copy, so SEO metadata and translation both work.

## Data

Page copy and assets live in `data/`, so the same content feeds several routes:

- `data/assets.ts` — every image URL, hot-linked from the source CDN at `https://assets.memovo.com` (the host the photos still live on). No images are stored in this repo.
- `data/content.ts` — steps, features, plans, FAQs, reviews and gallery themes. Text fields hold translation keys.
- `data/events.ts` — the seven event pages, typed as `EventPage`, with a `copy` block per language.
- `data/currency.ts` — the six currencies and their rates.
- `data/i18n.ts` + `data/i18n.home.ts` — the English, Hungarian and Romanian dictionaries.

## Language switching

`components/LanguageProvider.tsx` holds the active language in React context and persists it to `localStorage`, so switching updates every string in place and survives navigation. The picker sits in the header next to the account button.

`useT()` returns a lookup that falls back to English for any key a translation is missing. English is the source of truth: `TranslationKey` is derived from the English dictionary, so TypeScript flags a Hungarian or Romanian entry that goes missing.

Customer review quotes stay in English — they are verbatim words from named people. The labels around them are translated.

## Currency switching

`components/Pricing.tsx` owns the selected currency in `useState`, so the cards re-render in place with no reload. Plans store a `usd` base amount and `data/currency.ts` converts it; a `null` amount renders the "Contact Us" label instead of a price.

## Images

`next.config.ts` allowlists the two CDN hosts the photos load from, `memovo.com` and `assets.memovo.com`, in `images.remotePatterns`, and the built-in optimizer caches each file on disk for 30 days. Requesting the originals directly from the browser makes the CDN drop responses once a page fires 30+ of them at once, so requests go through the optimizer.

Carousel slides load eagerly: they sit outside the viewport horizontally, where lazy loading never triggers.

## Design tokens

`app/globals.css` holds the palette and typography in a Tailwind v4 `@theme` block, taken from the live site's Elementor globals — `--color-navy: #072a47`, `--color-coral: #e58783`, `--color-blush: #fdecea`, and the rest. The cookie-consent bar keeps its own `:root` variables mirrored from `consent`.

## Screenshots

`scripts/shots.mjs` renders every route with Puppeteer, reports page height and any broken images, and writes full-page PNGs to `shots/`. It needs the production server running on port 3100 and Puppeteer available:

```bash
npm run build && npm run start -- -p 3100
node scripts/shots.mjs
```
