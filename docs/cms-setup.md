# Browser CMS — Sveltia CMS

Staff edit **projects** and **news** from a browser at
**https://new.fdp.org/admin/** — no code, no local tools. Saving an edit
auto-publishes to the live site in ~1–2 minutes.

> **Status: LIVE and working** (since 2026-11-20). The full chain — edit →
> commit → auto-build → publish — is verified end to end.

---

## How it works

```
Staff edit at  new.fdp.org/admin/   (Sveltia CMS, served from public/admin/)
      │  Sveltia commits the changed Markdown file to GitHub (main)
      ▼
GitHub  camidaddy834/fdp-website   (PUBLIC repo)
      │  a push to main triggers a build
      ▼
Netlify continuous deployment  →  rebuild  →  https://new.fdp.org
```

The CMS writes the **same Markdown files we hand-edit**
(`src/content/projects/*.md`, `src/content/news/*.md`). Netlify auto-builds on
every push to `main`, so edits go live on their own.

- **Editor code:** [`public/admin/`](../public/admin/) — `index.html` loads
  Sveltia CMS from a CDN; `config.yml` defines the GitHub backend and the two
  collections. `public/` is copied verbatim by Astro, so the editor is served
  at `/admin/` with no build step of its own.
- **`site.ts` / `company.ts` stay in code** — offices, nav, phone numbers, team
  and capabilities are site configuration, intentionally not in the CMS.

### What staff can edit

| Collection | Fields |
| --- | --- |
| **Projects** | title, sector (10 verticals), location, summary, client, year, square feet, seats, services, hero image, gallery, "Feature on homepage", sort order, draft, and the case-study body |
| **News** | title, date, author, excerpt, hero image, original URL, draft, body |

Image uploads are wired per-field so they land in the right place and are
written in the existing format: **project** images → `src/assets/projects/`
(written `../../assets/projects/<file>`, Astro-optimized); **news** images →
`public/news/` (written `/news/<file>`).

---

## Day-to-day use (for staff)

1. Go to **https://new.fdp.org/admin/** → **Sign In with GitHub**.
2. Pick **Projects** or **News**, open an entry or click **New**.
3. Fill in the form; drag images into the image fields.
4. Click **Save**. The change commits and publishes automatically.

**Checking your edit:** it takes **~1–2 minutes** to build. Then view it on
**`new.fdp.org`** (not `fdp.org` — see below) and **hard-refresh**
(Cmd/Ctrl+Shift+R) to beat browser cache. To watch the build happen, keep the
[Netlify deploys page](https://app.netlify.com/projects/fdp-foodservice-design/deploys)
open — you'll see it go from *Building* to green *Published*.

> **`fdp.org` vs `new.fdp.org`:** the new site currently lives at
> **new.fdp.org**; **`fdp.org` still serves the OLD Wix site** until the domain
> is cut over. CMS "View live" links point at `new.fdp.org` for now.

---

## The setup that's in place (reference)

Everything below is **already done** — this section documents it for future
maintenance, not as steps to repeat.

### 1. Repository is PUBLIC

`camidaddy834/fdp-website` is a **public** repo. This was a deliberate choice:
Netlify's free plan only builds commits from **one Git contributor on private
repos**, and the CMS commits under `camidaddy834`'s GitHub email — an Apple
"Hide My Email" relay that couldn't be verified on Netlify. Making the repo
public **removes the contributor limit entirely** — unlimited editors, every
edit builds, free. Before going public we scanned the repo and full history:
**no secrets** (the Resend API key and all other secrets live in Netlify /
Cloudflare environment settings; `.env` is gitignored).

### 2. Auth — Cloudflare Worker + GitHub App

Sign-in uses Sveltia's GitHub App flow through a small Cloudflare Worker.

- **Worker:** `sveltia-cms-auth`, deployed at
  **`https://sveltia-cms-auth.fooddesignpro.workers.dev`**
  (Cloudflare account; `workers.dev` subdomain `fooddesignpro`). Source is the
  official [`sveltia/sveltia-cms-auth`](https://github.com/sveltia/sveltia-cms-auth),
  cloned to `~/sveltia-cms-auth` and deployed with `npx wrangler deploy`.
  Worker **secrets** (set via `npx wrangler secret put <NAME>`):
  - `GITHUB_CLIENT_ID`
  - `GITHUB_CLIENT_SECRET`
  - `ALLOWED_DOMAINS` = `fdp.org, new.fdp.org`
- **GitHub App:** "Sveltia CMS Auth for FDP" (App ID `5840084`, **Client ID
  `Iv23liYcpgtgbR11SeAg`**), owned by and installed on **`camidaddy834`** /
  `fdp-website`. Redirect URI = the worker URL + `/callback`. Repository
  permissions: Contents **Read & write**, Pull requests **Read & write**,
  Metadata **Read-only**. The client secret lives under the app's
  **Credentials** tab (GitHub moved it there from the General page).
- **`config.yml`** points `base_url` at the worker URL.

> Two GitHub accounts exist: **`camidaddy834`** (owns the repo — use this) and
> `camidaddy-ftsc`. The app was created and installed as `camidaddy834`.

### 3. Schema accepts CMS `null` values

Sveltia writes an **empty optional field as `null`**, but Zod's `.optional()`
rejects null — which broke the first CMS build. `content.config.ts` now uses
**`.nullish()`** on optional fields (accepts missing *or* null), and coerces
nullable list fields back to `[]`. Keep this in mind if you add new optional
fields: use `.nullish()`, not `.optional()`.

---

## Adding more editors

Because the repo is public, each editor can use **their own GitHub account**
(with proper per-person attribution):

1. **github.com → the repo → Settings → Collaborators → Add people** → invite
   their GitHub username (write access).
2. They accept, then go to **https://new.fdp.org/admin/** and **Sign In with
   GitHub**.

That's it — no shared login needed, and every editor's commits build.

---

## Maintenance notes

- **Workflow for code changes (devs):** a push to `main` auto-builds now, so
  `./deploy.sh` is just a **manual fallback**. Because the CMS also commits to
  `main`, **pull before making local code edits** (GitHub Desktop → Fetch →
  Pull) or your local copy and GitHub will drift apart.
- **After the domain cutover to `fdp.org`:** switch `site_url` / `display_url`
  in `public/admin/config.yml` back to `https://fdp.org`, and (optional) drop
  `new.fdp.org` from the worker's `ALLOWED_DOMAINS`.
- **Updating the worker:** edit in `~/sveltia-cms-auth` and run
  `npx wrangler deploy`; change a secret with
  `npx wrangler secret put <NAME>`.
- **Editorial workflow (review before publish):** not enabled — saves go
  straight to `main`. Sveltia supports an editorial/PR workflow if you ever want
  an approval step.
- **The `_TEMPLATE` project** appears in the CMS project list (the CMS reads the
  whole folder). It's harmless — excluded from the live site by its underscore
  name.
- **Frontmatter formatting:** Sveltia rewrites YAML in its own style (unquoted
  strings, block-style lists, explicit `null` for empty fields). Functionally
  identical — expect cosmetic diffs.

---

## Cookie consent

A consent banner ([`src/components/ConsentBanner.astro`](../src/components/ConsentBanner.astro))
wired to **Google Consent Mode v2** is live and independent of the CMS. Default
is denied until the visitor opts in; a footer "Cookie preferences" link reopens
it. See [`docs/analytics-setup.md`](./analytics-setup.md) for the analytics/GTM
details.
