# Performance — Core Web Vitals

Performance tuning pass against Core Web Vitals (LCP, CLS, INP). **Date:** 2026-11-21.

## Baseline

The site was already fast — static Astro, tiny HTML/CSS, fonts with
`display:swap`. Measured on the homepage (text hero, no image):

| Metric | Baseline | Target | Status |
|---|---|---|---|
| TTFB | 417 ms | < 800 ms | ✅ |
| FCP | 900 ms | < 1.8 s | ✅ |
| CLS | **0** | < 0.1 | ✅ |

The gaps were on **image-heavy pages** (case studies, news), where the hero
image is the LCP element but wasn't prioritized — plus some avoidable bytes.

## Findings & fixes

| # | Issue | Metric | Fix |
|---|-------|--------|-----|
| 1 | **Case-study hero images were `loading="lazy"`** — the LCP element was deprioritized, so the browser discovered and fetched it late | LCP | Hero now `loading="eager"` + `fetchpriority="high"` (`work/[slug]`) |
| 2 | **News hero `<img>` had no dimensions** — browser couldn't reserve space, risking layout shift; also loaded lazily | CLS, LCP | Added `width`/`height` + `aspect-ratio` (reserves space) and `eager`/`fetchpriority` |
| 3 | **Images served at full desktop size to phones** — a 375px phone downloaded the 1180px (107KB) hero and 720px cards | LCP (mobile), data | Responsive `srcset` via Astro `widths` + `sizes` on hero, cards, and gallery — a retina phone now pulls ~72KB, a 1× phone the 480w variant |
| 4 | **`bg-drawing.webp` was 150KB** — a full-page texture shown at 9% opacity, far heavier than needed | load weight (every page) | Recompressed with Pillow → **51KB** (−66%); invisible at 9% opacity |

## After

Re-measured on the case-study page (the worst case), uncached:

- **LCP element is correctly the hero image**, now loaded eagerly at high
  priority (fetch completes in the first paint window).
- **CLS = 0** on desktop *and* mobile (375px).
- Mobile hero transfer dropped from **107KB → ~72KB** (retina) / **480w** on 1× screens.
- Background texture: **150KB → 51KB** on every page.

## INP note

INP is governed by main-thread JS. The only non-trivial script is **Google Tag
Manager** (loaded `async`, behind Consent Mode). For a near-static marketing
site this is fine; if INP ever regresses, the lever is trimming GTM
tags/triggers, not the site code.

## Optional future optimizations (not done)

- **News hero images are unoptimized public files** (`/public/news/*.png`) — they
  aren't run through Astro's image pipeline (the schema stores a public path).
  Moving them to `src/assets` + Astro `<Image>` would add webp + responsive
  sizing. Bigger refactor; news is lower-traffic.
- **Netlify HUD script** (`/.netlify/scripts/hud`, ~11KB) is injected at the edge.
  It can be disabled in the Netlify dashboard if desired.
- **Webfonts**: 9 weights across 3 families. All are used (some via CSS
  inheritance), and `display:swap` keeps them off the critical path, so they
  weren't trimmed. Self-hosting is an option if the third-party connection ever
  matters.
