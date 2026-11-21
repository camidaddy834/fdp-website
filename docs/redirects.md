# 301 Redirects — Wix → new site

Built so the fdp.org cutover keeps Google rankings and old inbound links alive.
**Date:** 2026-11-21. Rules live in [`public/_redirects`](../public/_redirects)
(Netlify copies it to `dist/_redirects` at build).

## Where the old URLs came from

Both Wix sitemaps, pulled live from the old site:

- `foodservicedesignprofessionals.com/pages-sitemap.xml` — 19 pages
- `foodservicedesignprofessionals.com/blog-posts-sitemap.xml` — 11 blog posts

Wix slugs don't match their content, so each page was identified by its real
title / rendered content, not its slug.

## The map

### Pages

| Old Wix URL | New URL | Why |
|---|---|---|
| `/home` | `/` | Wix duplicate homepage |
| `/who-we-are` | `/about` | "Who We Are" = company/about page |
| `/what-we-do-1` | `/capabilities` | "What We Do" = services |
| `/2nd-project` | `/capabilities` | page was actually the **Capability Statement** |
| `/featured-projects` | `/portfolio` | projects index |
| `/blog` | `/news` | the news/blog index |
| `/social` | `/` | no equivalent; social links are in the footer |
| `/corporate` | `/portfolio/corporate/` | portfolio category |
| `/copy-of-healthcare` | `/portfolio/health-care/` | portfolio category |
| `/copy-of-higher-education` | `/portfolio/universities/` | portfolio category |
| `/copy-of-casino-s` | `/portfolio/hospitality/` | casinos = hospitality |
| `/copy-of-casino-s-1` | `/portfolio/hospitality/` | duplicate casino category |
| `/copy-of-culinary` | `/portfolio` | category unclear (renders mixed content) → index |
| `/3rd-project` … `/6th-project` | `/portfolio` | **abandoned Wix template demos** (Lorem-ipsum "YC Towers / Cleave House" placeholders, no real project) |

> **`/about` is deliberately not redirected.** On the old Wix site `/about`
> held the *contact* page, but the new site serves its own real About page at
> `/about` — the better match for that slug, so it resolves natively.

### Blog posts (`/post/…` → `/news/…`)

Several old posts used dated Wix permalinks; the target was found from the post title.

| Old Wix URL | New URL |
|---|---|
| `/post/fdp-recently-published-in-the-fcsi-the-americas-magazine` | `/news/fdp-recently-published-in-the-fcsi-the-americas-magazine/` |
| `/post/coppell-high-school-transformation` | `/news/coppell-high-school-transformation/` |
| `/post/mercedes-benz-financial-services` | `/news/mercedes-benz-financial-services/` |
| `/post/holland-hall-lessons-learnt` | `/news/holland-hall-lessons-learnt/` |
| `/post/updated-and-celebrated` | `/news/updated-and-celebrated/` |
| `/post/2016/08/01/wide-open-west` | `/news/wide-open-west/` |
| `/post/2019/04/19/smooth-sleek-and-modern` | `/news/smooth-sleek-and-modern/` |
| `/post/2016/03/03/01` | `/news/northside-high-school-culinary/` (title: "…Culinary Space at Northside High School") |
| `/post/2016/03/02/how-we-do-it` | `/news/texas-architect-magazine/` (title: "Texas Architect Magazine") |
| `/post/2016/03/03/02` | `/news/fcsi-quarterly-showcase/` (title: "FCSI – The America's Quarterly") |
| `/post/2017/02/04/foodservice-design-professionals-taking-the-next-steps-to-embrace-technology` | `/news/embracing-vr-technology/` |

A final wildcard `/post/*  →  /news` catches any stray old post that isn't listed.

## One required Netlify step (so the old domain's equity transfers)

The path rules above fire on **any** domain this Netlify site serves. Google
currently indexes the site under **`foodservicedesignprofessionals.com`**, so at
cutover:

1. In **Netlify → Domain management**, add `foodservicedesignprofessionals.com`
   (and `www.`) as **domain aliases** on this site.
2. Keep them pointed here (don't park them elsewhere). Netlify will serve the
   new site on those hosts, and the `_redirects` rules will 301 every old path
   to its new URL — so `…professionals.com/blog` → `fdp.org/news`, etc.
3. Optionally set `fdp.org` as the **primary domain** so every alias 301s to it.

Without the alias, old-domain links would hit the parked Wix domain instead of
these redirects.

## After deploy — verify

Netlify applies redirects immediately on deploy. Spot-check a few:

```bash
curl -sI https://fdp.org/blog | grep -i location          # → /news
curl -sI https://fdp.org/post/wide-open-west ; \
  curl -sI "https://fdp.org/post/2016/08/01/wide-open-west" | grep -i location   # → /news/wide-open-west/
curl -sI https://fdp.org/corporate | grep -i location     # → /portfolio/corporate/
```

Then in **Google Search Console**, submit the new `fdp.org/sitemap.xml` and use
**URL Inspection** on a couple of old URLs to confirm Google sees the 301.

## Maintaining it

Add new rules to `public/_redirects` whenever a URL changes. Format is
`from  to  status` (use `301` for permanent). First match wins, so keep specific
paths above the `/*` wildcards.
