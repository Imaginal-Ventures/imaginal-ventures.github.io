# Handoff: Imaginal Ventures — Marketing Website

## Overview
This is the marketing website for **Imaginal Ventures**, an advisory firm that helps
purpose-led founders scale from traction to sustainable business. It is a single-page,
long-scroll "magazine spread" site with an anchored top nav, a split hero, and a series
of editorial content sections (premise, problems, programs, Trust Pulse diagnostic,
team, testimonials, field notes, and a closing CTA/footer).

## About the Design Files
The files in this bundle are **design references created in HTML + in-browser React
(via Babel)** — a working prototype that shows the intended look, copy, and behavior.
They are **not production code to ship as-is**. The task is to **recreate this design in
the target codebase's environment** (e.g. Next.js/React, Astro, Vue, plain static HTML,
or a CMS like Webflow) using that environment's established patterns, then wire up real
content, SEO, and deployment.

If no codebase exists yet, the recommended production stack is a **static-site framework
that pre-renders to HTML** (Next.js static export, Astro, or Eleventy) — the current
prototype renders JSX in the browser at runtime, which is fine for previewing but should
be compiled ahead of time for a real public site (faster load, proper SEO indexing).

## Fidelity
**High-fidelity.** Colors, typography, spacing, layout, and copy are final and intended
to be reproduced faithfully. Recreate the UI pixel-accurately. The only intentionally
unfinished items are flagged inline as `TODO` (see **Known TODOs** below).

---

## Tech Structure (as prototyped)

- **`Imaginal Website.html`** — entry point. Loads Google Fonts, React 18.3.1 + Babel
  standalone (CDN), then the three JSX modules and `image-slot.js`. Renders into `#root`.
- **`site-brand.jsx`** — the design system: color tokens (`C`), font tokens (`F`), the
  `Wordmark` SVG component, the animated `ImaginalCell` / `CellGraphic` "cell" mark,
  `NavBar`, `SectionHead`, and `Plate` frame components. **Load first.**
- **`site-home-b.jsx`** — the entire live homepage, exported as `HomeVariationB`. Contains
  all section markup and the local content data arrays (`PROGRAMS`, `PROBLEMS`, `NOTES`,
  `TEAM`, `VALUES`).
- **`site-app.jsx`** — mounts `<App>` → `<HomeVariationB/>` into `#root`. **Load last.**
- **`image-slot.js`** — a `<image-slot>` web component used as a drag-to-fill placeholder
  for team photos and value images. In production, replace with real `<img>` tags.
- **`Imaginal Website (standalone).html`** — a fully self-contained, offline copy of the
  rendered site (everything inlined). Good for previewing the finished look in any browser
  without the other files. Do **not** build from this — build from the source files above.

> Note: `site-home-a.jsx` and `site-home-c.jsx` existed as earlier design variations and are
> **not** part of the live site (only `site-home-b.jsx` is mounted). They are not included
> in this bundle.

Script load order in the HTML `<head>`/`<body>` matters:
`react` → `react-dom` → `babel` → `image-slot.js` → `site-brand.jsx` → `site-home-b.jsx` → `site-app.jsx`.

---

## Design Tokens

### Colors (from `site-brand.jsx`, object `C`)
| Token | Hex | Use |
|---|---|---|
| `ink` | `#13171c` | Primary text, dark hero panel, dark buttons |
| `bone` | `#f3f2eb` | Primary page background (warm off-white) |
| `bone2` | `#ecebe4` | Secondary/darker bone (body bg behind canvas) |
| `cell` | `#c8504c` | Brand accent (terracotta red) — emphasis, active states, "cell" mark |
| `slate` | `#5b6370` | Body/secondary text |
| `mute` | `#9aa0a6` | Tertiary text, mono meta labels, muted UI |
| `rule` | `#d8d6cc` | Hairline borders/dividers |
| `ruleSoft` | `#e2e0d6` | Softer inner dividers |
| dark-panel rule | `#2a2f36` | Divider lines inside the dark `ink` hero panel |

### Typography (from object `F`)
- **Display** — `Cormorant Garamond`, serif. Used *italic, weight 500* for all large
  headlines (hero H1 is 88px, section headlines ~27–36px), letter-spacing ≈ `-0.02em`,
  line-height ≈ 1.02. Accent words are wrapped in `<em>` colored `cell`.
- **Body** — `Newsreader`, serif. Body copy 15–19px, line-height ≈ 1.5–1.55, color `slate`.
- **Mono** — `IBM Plex Mono`, monospace. All eyebrows, nav items, section indices (§ 01),
  meta labels, tags, and buttons. ~9–11px, `letter-spacing: .14em–.18em`, `text-transform:
  uppercase`.

Google Fonts import (already in the HTML):
`Cormorant Garamond` (ital 500/600), `Newsreader` (300/400/500 + ital 400/500),
`IBM Plex Mono` (400/500).

### Layout
- Content column: `max-width: 1280px`, centered (`margin: 0 auto`).
- Standard horizontal padding: `64px` (some sections `56px`).
- Sections separated by `1px solid rule` top/bottom borders.
- Heavy use of CSS grid and flex with explicit `gap`.

---

## Screens / Sections (single page, top → bottom)

All live in `HomeVariationB` in `site-home-b.jsx`.

1. **Nav bar** (`NavBar`) — Wordmark + "Est. 2017" on the left; mono anchor links on the
   right (Home, Philosophy, Team, Problems Worth Solving, Offering, On Trust, Field Notes).
   Active link gets an underline in `ink`. Anchors scroll to section `id`s.

2. **Hero** — 50/50 grid (`1fr 1.1fr`), `min-height: 720px`, bordered bottom.
   - Left: dark `ink` panel, mono meta row top ("Fig. 02 — Imaginal cells, T=0" · "· 2026"),
     the **animated cell graphic** centered, and a mono caption row bottom
     ("Latent · activating · activated" / "Three states, one form.").
   - Right: `bone` panel. Eyebrow (mono, `cell`): "Imaginal · for purpose-led founders".
     H1 (display italic, 88px): "Build the business *that lasts the growth.*" ("lasts the
     growth" in `cell`). Lede paragraph (19px `slate`). Two buttons: primary solid `ink`
     ("Begin a conversation →"), secondary outline ("The Offering").

3. **Proof numbers** — stat row (300+ ventures, 20 cohorts, since 2017).

4. **§01 Premise** — founder's note / positioning statement.

5. **§02 Problems Worth Solving** — three problems from the `PROBLEMS` array (Capital,
   Team, Stage), each with roman-numeral index, headline, body, and "meets: <program>".

6. **§03 Offering / Programs** — a 12-week periodization bar chart (`PeriodizationStrip`,
   phases base/build/peak/recover with `peak` in `cell`) plus four program cards from the
   `PROGRAMS` array: (01) Growth Strategy Sprint, (02) Team Scaling Sprint, (03) Advisory,
   (04) Leadership Offsite. Each card: mono code + duration, display name, body (with `\n`
   paragraph breaks — rendered `white-space: pre-line`), and a bottom mono tag.

7. **§04 Trust Pulse** — promotes the external trust diagnostic hosted at **cbosystem.com**
   (links out). (There is a companion 2-page print document, "Imaginal Trust Pulse", in the
   parent project — not required for the website.)

8. **Team** — founder bios from the `TEAM` array (Erin O'Keefe Graham — Managing Partner;
   Dorothy Spence — Founding Partner). Each: photo slot (`<image-slot>` → replace with real
   image, `object-fit: cover`, custom `position`), name, role, multi-paragraph bio, and a
   pull quote.

9. **Values** — the three Imaginal values from the `VALUES` array (Art & Science, Candid
   Curiosity, Effortful Growth), each with an image slot, caption, credit line, and body.

10. **§05 Testimony** — testimonial quotes.

11. **§06 Field Notes** — three recent posts from the `NOTES` array, linking to the
    Substack (`imaginalventures.substack.com`).

12. **§07 CTA + Footer** — closing call to action ("Begin a conversation") and footer.

---

## Interactions & Behavior
- **Anchor nav**: nav links are in-page `#id` anchors; `html { scroll-behavior: smooth }`.
- **Active nav state**: the current section link is highlighted (underline in `ink`).
- **Animated cell graphic**: the hexagonal "cell" mark in the hero animates activation on
  load (cells transition from latent outline → filled `cell` color). See `ImaginalCell`
  in `site-brand.jsx` for the activation logic and percentage readout.
- **Wordmark**: an SVG that renders "imaginal" in display italic with a two-tone clip
  across a baseline rule (top half outlined stroke, bottom half filled). See `Wordmark`.
- **Hover states**: buttons and links darken/underline on hover (mono links, solid/outline
  buttons). Reproduce standard hover affordances.
- **Image slots**: `<image-slot>` is a prototype drag-to-fill placeholder. In production,
  swap for real `<img>`/`<picture>` with the same `object-fit`/`object-position`.

## State Management
Minimal. The prototype is essentially static presentational content driven by the local
data arrays. The only dynamic behavior is the cell-graphic animation (self-contained in
`ImaginalCell`) and nav active-state. No data fetching, forms, or global state in the
prototype. In production, the content arrays (`PROGRAMS`, `PROBLEMS`, `TEAM`, `VALUES`,
`NOTES`) are the natural candidates to move into a CMS or content files.

## Assets
- **Wordmark & cell mark**: generated in code as SVG (no image files) — port the SVG logic
  or export static SVGs.
- **Team photos & value images**: currently empty `<image-slot>` placeholders — real images
  need to be supplied and dropped in (Erin, Dorothy; and three value images).
- **Fonts**: Google Fonts (Cormorant Garamond, Newsreader, IBM Plex Mono) — self-host for
  production if desired.

## External links / integrations to wire up
- **Trust Pulse diagnostic** → `https://cbosystem.com`
- **Field Notes** → `https://imaginalventures.substack.com/`
- **Contact CTA** → currently `#contact` anchor; needs a real destination (mailto or form).
  The Trust Pulse print doc uses `dorothy@imaginalventures.com` as the contact.

## Known TODOs (flagged in source)
- `NOTES` array: swap placeholder post titles/dates for the real recent Substack posts.
- Team/value **image slots** need real images.
- Contact CTA needs a real destination (email or form backend).

## Production checklist (beyond recreating the UI)
- Pre-compile JSX → static HTML/JS (don't ship the runtime Babel setup).
- Add `<title>`, meta description, favicon, and OpenGraph/social-share image.
- Mobile/responsive QA — the prototype is tuned for desktop (1280px column); verify and
  adjust the hero grid, program cards, and team layout at tablet/phone widths.
- Analytics (optional): GA4 / Plausible.
- Deploy to a static host (Netlify / Vercel / Cloudflare Pages) and point the domain.

## Files in this bundle
- `Imaginal Website.html` — entry point (source of truth for structure & load order)
- `site-brand.jsx` — design system (tokens, wordmark, cell mark, nav, section chrome)
- `site-home-b.jsx` — the full homepage + content data
- `site-app.jsx` — mount
- `image-slot.js` — placeholder web component (replace in production)
- `Imaginal Website (standalone).html` — self-contained rendered preview (view-only)
