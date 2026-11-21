# QA & Accessibility Audit

Cross-browser / responsive QA and a WCAG 2.1 AA accessibility pass across the
whole site. **Date:** 2026-11-21.

> **Status: all findings below fixed.** Re-audited after fixes — every page
> reports a clean heading outline, no contrast failures, no missing alt/labels.

## Method

- **Code review** of the layout, components, and all page templates (the fastest
  way to catch and fix structural a11y issues at the source).
- **Rendered testing** in a Chromium engine at mobile (375px), and desktop:
  horizontal-overflow check, mobile-menu behavior, tap-target sizes, keyboard
  focus visibility, and an automated sweep (missing alt, unlabeled controls,
  heading-level skips, duplicate IDs, landmarks) run against all 11 page types.
- **Contrast** computed numerically (WCAG relative-luminance formula) for every
  text/background token pair.

> **Cross-browser caveat:** testing used a Chromium engine, so Safari/WebKit and
> Firefox/Gecko were not run live. The CSS is standards-based; the only
> engine-sensitive features are modern but widely supported — see notes below.

## Findings & fixes

| # | Issue | WCAG | Severity | Fix |
|---|-------|------|----------|-----|
| 1 | Keyboard **focus ring invisible on dark sections** — the navy `--accent` outline was only 1.5:1 against the dark navy footer / CTA bands | 2.4.7, 2.4.11 | **Medium** | Two-ring focus style in `global.css`: navy outline **+ white inner ring** (`box-shadow`), so focus stays visible on any background |
| 2 | **`--muted` grey failed AA** on the page background (4.38:1, needs 4.5) | 1.4.3 | **Medium** | Darkened `--muted` `#6a7284` → `#626a7a` (now 4.9:1 on `--ground`, 5.4:1 on white) |
| 3 | **Heading levels skipped** — footer section headings were `h4` (h2→h4 on every page); card/name grids jumped h1→h3 on about, portfolio, and team | 1.3.1 | **Medium** | Footer `h4`→`h2`; about "How we work" and team group labels promoted to `h2`; portfolio grids got a screen-reader-only `h2` ("`.sr-only`" helper added) |
| 4 | **Required form fields had no visible marker** (screen readers already got `required`, but sighted users didn't) | 3.3.2 | Low | Added a navy `*` to Name/Email labels and a "* Required field" note on the contact form |
| 5 | **Project card announced its title twice** — the card image `alt` duplicated the `h3` inside the same link | 1.1.1 / 4.1.2 | Low | Card hero image is now decorative (`alt=""`); the visible `h3` names the link |
| 6 | **Breadcrumbs weren't a landmark** — plain `<p>` with unguarded `/` separators | 1.3.1 | Low | Wrapped in `<nav aria-label="Breadcrumb">`; `/` separators marked `aria-hidden` |

## Cross-browser / responsive — PASS

- **No horizontal scroll** and no overflowing elements at 375px (or any tested width).
- **Zoom is not disabled** (viewport has no `maximum-scale` / `user-scalable=no`) — pinch-zoom works (1.4.4).
- **Mobile menu** opens/closes correctly, toggles `aria-expanded` + label, all 11 links ≥44px tall (2.5.5 target size).
- **Responsive grids** collapse cleanly (3→2→1 columns) at the defined breakpoints.
- **Landmarks** present on every page: `header`, `nav[Primary]`, `main`, `footer`, plus labeled breadcrumb/consent regions. Each page has exactly one `h1`.
- **Reduced motion** honored (`prefers-reduced-motion` disables transitions/smooth-scroll).

### Modern-CSS notes (for older engines)
These are used and are well-supported in current Chrome/Safari/Firefox (2023+);
they degrade gracefully, but note them if very old browsers must be supported:
- `color-mix()` (header background tint) — supported Safari 16.2+, Firefox 113+.
- `backdrop-filter` (header blur) — falls back to a solid-ish bar if unsupported.
- `100dvh`, `aspect-ratio`, `clamp()`, `text-wrap: balance/pretty` — all degrade
  to sensible defaults.

## Still worth a manual pass (not automatable here)

- A real **screen-reader** run-through (VoiceOver / NVDA) of the nav dropdowns and
  the contact form submit/error flow.
- **Live Safari + Firefox** spot-check once the domain is cut over.
- **200% browser zoom** reflow check (1.4.10) on the densest pages (team, portfolio).
- Confirm any **future CMS-added images** get meaningful `alt` text (the editor
  exposes an alt field on image uploads).
