# Memovo Brand Guidelines v1.0

> Last updated: 2026-09-01
> Status: Live — every value below is read from the running site.

Memovo is a QR-code photo album for events. A host creates a gallery, guests scan
one code, and every photo lands in one private place. No app, no sign-up.

**Source of truth:** the Tailwind v4 `@theme` block in `app/globals.css` holds the
live tokens. This document records what those values are and why. Change the CSS
and update this file in the same commit.

## Quick Reference

| Element | Value |
|---------|-------|
| Primary Color | #DB2777 |
| Secondary Color | #171114 |
| Accent Color | #FDF2F5 |
| Primary Font | Comfortaa |
| Voice | Warm, plain, informal |

---

## 0. Brand Foundation

### Core Attributes

| Attribute | Description |
|-----------|-------------|
| **Private by default** | A gallery is closed. The host decides who sees it |
| **One scan** | A QR code is the whole onboarding. No app, no account for guests |
| **Every guest's view** | The day arrives from a hundred angles, gathered in one album |
| **For any occasion** | Weddings, engagements, parties, memorials, company events |

---

## 1. Color Palette

### Primary Colors

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| Coral | #DB2777 | rgb(219,39,119) | Buttons, bands, icons, the accent line in headings |
| Coral Dark | #BE185D | rgb(190,24,93) | Pink text and small icons on light surfaces |
| Coral Light | #FCE7EF | rgb(252,231,239) | Blooms behind the hero visual |

Coral carries white text at 4.6:1, so it can fill a button. Small pink text on a
light surface uses Coral Dark, which clears 6.4:1 on white.

### Secondary Colors

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| Navy | #171114 | rgb(23,17,20) | Headings, body text, the phone shell |
| Pink Band | #FBD0E0 | rgb(251,208,224) | The soft band behind the hero blooms |

Navy is a near-black with a plum cast. It keeps the dark tone in family with the
pink, so it reads as part of the palette.

### Accent Colors

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| Blush | #FDF2F5 | rgb(253,242,245) | Hero ground, active menu rows, language pills |
| Cream | #FFF7F9 | rgb(255,247,249) | Card surfaces, hover states |

### Neutral Palette

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| Background | #FFFFFF | rgb(255,255,255) | Every section background |
| Text Primary | #171114 | rgb(23,17,20) | Headings, body text |
| Text Secondary | #6B6169 | rgb(107,97,105) | Captions, muted copy — 5.1:1 on white |
| Border | #E9E4E7 | rgb(233,228,231) | Hairlines, dividers, outlined buttons |
| Muted Surface | #F7F7F8 | rgb(247,247,248) | Rare neutral fill |

### Semantic Colors

Memovo defines no separate success, warning, or error hues. Form validation and
API failures use Coral Dark for the message and the standard border colour for the
field, so an error reads as part of the brand.

| State | Hex | Usage |
|-------|-----|-------|
| Error | #BE185D | Field messages, failed submissions |
| Focus ring | #171114 | 2px outline, 2px offset, follows the control's own shape |

### Accessibility

| Pair | Ratio | Passes |
|------|-------|--------|
| White on Coral | 4.6:1 | AA small text |
| Coral Dark on White | 6.4:1 | AA small text |
| Coral Dark on Blush | 5.5:1 | AA small text |
| Navy 70% on Blush | 6.7:1 | AA small text |
| Text Secondary on White | 5.1:1 | AA small text |

Touch targets are 44px minimum (`min-h-11`), 48px for hero calls to action
(`min-h-12`).

---

## 2. Typography

### Font Stack

| Role | Family | Weights | CSS variable |
|------|--------|---------|--------------|
| Heading | 'Comfortaa' | 400, 600, 700 | `--font-heading` |
| Body | 'Montserrat' | 400, 500, 600, 700 | `--font-body` |
| Accent | 'Playfair Display' | 400, 600 italic | `--font-accent` |

Comfortaa's rounded terminals carry the warmth. Playfair Display appears only for
names and dates on the invite card, where a celebration wants a serif.

### Type Scale

| Element | Mobile | Desktop | Weight | Notes |
|---------|--------|---------|--------|-------|
| h1 | 36px | 54px | 700 | `leading-[1.1]`, last line in Coral |
| h2 | 24px | 30px | 700 | Section headings, centred |
| h3 | 16px | 16px | 700 | Card titles |
| Body | 16px | 16px | 400 | Hero sub-copy |
| Small | 14px | 14px | 400 | Card copy, lists, most body text |
| Eyebrow | 12px | 12px | 600 | Uppercase, `tracking-[0.18em]`, Coral Dark |
| Nav | 15px | 15px | 500 | Comfortaa, Coral Dark |

### Font Loading

Loaded through `next/font/google` in `app/layout.tsx`, which self-hosts the files
and sets the CSS variables. No external font request leaves the page.

---

## 3. Logo Usage

### Variants

| Variant | Component | When |
|---------|-----------|------|
| Brand | `<Wordmark />` | Default. Coral Dark on any light surface |
| Light | `<Wordmark tone="light" />` | White, for a dark surface |

The wordmark is set text: `memovo` in Comfortaa bold with tight tracking, followed
by a superscript trademark mark. It lives in one component, so a real logo file can
replace it in a single place.

### Clear Space

Half the wordmark's cap height on every side. In the header the 68px bar and the
24px container padding already provide this.

### Minimum Size

28px cap height in the header, 24px inside the phone menu panel. Below 24px the
trademark mark stops resolving.

### Don'ts

- Do not stretch, rotate, or add a drop shadow.
- Do not recolour the wordmark outside the two variants.
- Do not place the brand variant on a surface darker than Blush.
- Do not build a tagline lockup; the eyebrow line carries that job.

---

## 4. Voice & Tone

### Brand Personality

| Trait | Description |
|-------|-------------|
| **Warm** | Speaks to people at a wedding, a birthday, a funeral. Never a vendor voice |
| **Plain** | Short sentences, ordinary words, no product jargon |
| **Informal** | Addresses the reader directly and familiarly in every language |
| **Practical** | Says what happens next: scan, upload, done |

### Voice Chart

| Trait | How it sounds | Example |
|-------|---------------|---------|
| Warm | Names the moment, and the feature follows | "Every moment your guests capture" |
| Plain | One idea per sentence | "One QR code. Guests scan, snap, and upload." |
| Informal | Second person, familiar register | "Kezdd el ingyen" |
| Practical | Concrete and finite | "No app, no sign-up." |

### Tone by Context

| Context | Tone | Example |
|---------|------|---------|
| Marketing | Warm, benefit-first | "Collect every smile, every hug, every memory." |
| Memorial pages | Gentle, unhurried | "A place for everyone's memories" |
| Buttons | Verb first, short | "Create Your Wedding Gallery" |
| Errors | Calm, names the next step | "Check the address and try again." |
| Consent and legal | Plain, no hedging | "Your privacy matters to us." |

### Language Register

Hungarian uses informal **tegezés** (te/ti). Romanian uses informal plural
**voi / vostru / voastră**. Formal `ön` and `dumneavoastră` are prohibited: this is
a celebration brand, and the formal register reads like a bank letter.

Two spelling rules that come up constantly:

- Hungarian headings take sentence case. English Title Case is wrong in HU and RO.
- HU and RO copy uses the en dash. The em dash belongs to English only.

### Prohibited Terms

| Avoid | Reason |
|-------|--------|
| Seamless | Overused, says nothing |
| Revolutionary | Overclaim |
| Effortlessly | Filler adverb |
| Leverage | Use "use" |
| Ön / dumneavoastră | Formal register, off-brand |
| Assistant or tooling names | The product carries the work; the toolchain stays out of it |

### Forbidden Phrases

Contrast constructions are prohibited on every surface — page copy, headings, alt
text, code comments, commit messages:

- "not just X, but Y"
- "unlike X"
- "in contrast"
- "compared to"
- "rather than X"
- "X isn't Y, it's Z"

State each claim directly so the sentence stands on its own.

---

## 5. Imagery Guidelines

### Photography Style

Real celebrations photographed as they happen. Guests holding phones, hands
raising glasses, candles, cake, confetti on the floor. Warm daylight or string
lights, shallow depth of field, plenty of white in the frame so the picture sits
easily on a blush ground.

Every photograph is Pexels-licensed and its provenance is recorded in
`public/images/CREDITS.md`. A photo carrying another company's branding, a
watermark, or a named private individual never ships.

Hero photographs are framed: `rounded-3xl`, a 4px white border, a soft shadow, and
full strength. A photograph darkened behind text stops being a photograph.

### Illustrations

Memovo ships no illustration files. The phone card and the host dashboard are
drawn from boxes in `components/Blocks.tsx`, so they restyle with the tokens and
stay current with the palette on their own.

### Icons

Tabler icons through `@tabler/icons-react`. Stroke 1.6 for feature icons at 32px,
stroke 2 for inline icons at 16px. Icons inherit `text-coral`, so they cannot
drift off palette. Raster icon files are prohibited.

---

## 6. Design Components

### Buttons

| Level | Classes | When |
|-------|---------|------|
| Primary | `min-h-12 rounded-full bg-coral px-7 font-semibold text-white hover:brightness-95` | One per screen: the way to buy |
| Secondary | `min-h-12 rounded-full border border-border bg-white px-7 font-semibold text-navy hover:bg-cream` | Beside the primary |
| Outlined pink | `min-h-11 rounded-full border-2 border-coral px-6 text-sm font-semibold text-coral-ink hover:bg-blush` | Inside sections, away from the hero |

Every button is a full pill. Memovo uses no square buttons.

### Spacing Scale

Tailwind's 4px scale. The intervals that repeat across the site:

| Token | px | Where |
|-------|----|-------|
| `gap-3` | 12 | Icon and label |
| `gap-5` | 20 | Card grids |
| `py-10 md:py-16` | 40 / 64 | Section rhythm |
| `pt-28 md:pt-32` | 112 / 128 | Hero top, clearing the 68px bar |
| `max-w-[1140px]` | — | Container width, 24px side padding |

### Border Radius

| Token | px | Where |
|-------|----|-------|
| `rounded-full` | pill | Buttons, badges, pills, avatars |
| `rounded-3xl` | 24 | Hero photograph frame |
| `rounded-2xl` | 16 | Cards, panels, testimonials |
| `rounded-xl` | 12 | Feature cards, menu rows |
| `rounded-lg` | 8 | Dropdown panels |

---

## AI Image Generation

### Base Prompt Template

```
Candid documentary photograph of {subject} at {occasion}, guests holding phones,
warm natural light, shallow depth of field, soft pastel and blush tones, airy
white background, unposed, editorial celebration photography, 35mm
```

### Style Keywords

| Category | Keywords |
|----------|----------|
| **Framing** | candid, documentary, unposed, over-the-shoulder |
| **Light** | warm natural light, golden hour, string lights, window light |
| **Lens** | shallow depth of field, 35mm, film grain |
| **Palette** | blush, soft pink, cream, airy white |
| **Subjects** | hands, phones, cake, candles, confetti, raised glasses |

### Visual Mood Descriptors

- warm
- intimate
- unhurried
- joyful
- clean

### Visual Don'ts

| Avoid | Reason |
|-------|--------|
| Corporate stock posing | People smiling at the camera on cue kill the documentary feel |
| Cold blue or teal grading | Fights the blush palette |
| Heavy vignettes and dark backgrounds | The site is white; a dark photo sits on it as a hole |
| Visible branding or watermarks | Another company's mark on a Memovo page |
| Text rendered inside the image | It cannot be translated into HU or RO |
| Recognisable named individuals | No consent, and no way to obtain it |

### Example Prompts

**Wedding hero**:
```
Candid documentary photograph of a bride and groom exchanging vows, a guest's phone
raised in the foreground, warm natural light, shallow depth of field, blush and cream
tones, airy white background, unposed, editorial celebration photography, 35mm
```

**Kids party hero**:
```
Candid documentary photograph of a child at a birthday cake under a cluster of pastel
balloons, warm indoor light, shallow depth of field, soft pink and cream tones, airy
white background, unposed, 35mm
```

**Business hero**:
```
Candid documentary photograph of colleagues raising glasses at an office celebration,
warm string lights, shallow depth of field, blush tones, airy background, unposed, 35mm
```

---

## Changelog

| Version | Date | Change |
|---------|------|--------|
| 1.0 | 2026-09-01 | First edition, written from the live site's tokens, fonts and copy |
