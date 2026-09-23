# Adding content

Projects and news posts are just Markdown files. Add or edit a file and the
site updates itself — no templates or lists to touch. Nothing here needs a
designer or developer.

## Add a project (case study)

**Option A — from the terminal (fastest):**

```bash
npm run new:project -- "El Paso CC Culinary Center" universities
```

This creates a ready-to-edit file at `src/content/projects/<slug>.md`, marked
`draft: true`. Open it, fill in the details, then set `draft: false` to publish.

**Option B — copy the template by hand (works from GitHub in a browser too):**

1. Copy `src/content/projects/_TEMPLATE.md` to a new file in the same folder.
2. Name it in lowercase with hyphens, e.g. `acme-cafeteria.md`. That name
   becomes the URL: `/work/acme-cafeteria/`.
3. Fill in the fields and write the story. The template explains every field.

Either way, once published the project shows up automatically on:

- the **Portfolio** page (and its sector count),
- its **sector** page (e.g. `/portfolio/universities/`),
- its own **case-study** page at `/work/<slug>/`,
- and the **homepage** "Selected work" strip if you set `featured: true`
  (the three lowest `order` values among featured projects are shown).

### The fields

| Field | Required | Notes |
| --- | --- | --- |
| `title` | ✅ | Case-study headline. |
| `sector` | ✅ | One slug from the list below. |
| `location` | ✅ | e.g. `"Houston, TX"`. |
| `summary` | ✅ | 1–2 sentences, shown on cards and page header. |
| `client` | – | Owner / client name. |
| `year` | – | A number, e.g. `2025`. |
| `squareFeet` | – | Number; shown as `12,000 sq ft` on the card. |
| `seats` | – | Number; used on the card if there's no `squareFeet`. |
| `services` | – | List, e.g. `["Foodservice Design", "Equipment Specification"]`. |
| `heroImage` | – | Path into `src/assets/projects/`. Omit for a branded placeholder. |
| `gallery` | – | List of image paths. |
| `featured` | – | `true` to also feature on the homepage. Default `false`. |
| `order` | – | Lower sorts first. Default `100`. |
| `draft` | – | `true` keeps it off the live site. Default `false`. |

**Sectors:** `government` · `corporate` · `health-care` · `hospitality` ·
`sports` · `universities` · `k-12` · `retail` · `correctional` ·
`production-centers`

A project with no images still looks right — an FDP-branded placeholder stands
in for a missing hero. To add a vertical, add its slug to `VERTICALS` in
`src/content.config.ts` and a matching label/blurb in `VERTICAL_META`
(`src/data/site.ts`); the build will tell you if you miss one.

## Add a news post

Drop a Markdown file in `src/content/news/`. Frontmatter: `title`, `date`
(`YYYY-MM-DD`), optional `author`, `excerpt`, `heroImage` (a path under
`/public/news/`), `originalUrl`, and `draft`. It appears on `/news/` and at
`/news/<slug>/`.

## Add History archive drawings & media

The History page (`/history`) shows a gallery of original drawings and media.
It handles large scans (JPGs and single-page PDFs) by generating web-optimized
copies automatically — you don't touch the website code.

1. Put the full-resolution scans in the **`history-originals/`** folder at the
   project root. (This folder stays on your machine — it is git-ignored and not
   deployed, so the big files never bloat the repo.)
2. Run:

   ```bash
   npm run history:build
   ```

   For each scan this writes a web-optimized full view (`public/history/<name>.jpg`,
   ~2600px) and a grid thumbnail (`public/history/thumbs/<name>.jpg`). PDFs are
   rasterized from their first page.
3. The History page auto-discovers them — each thumbnail links to the full view.
   Remove a scan and re-run to drop it.

Then deploy (below). Keep your true originals wherever you archive them; only the
optimized copies live in the repo.

## Publishing

Content only goes live after a deploy. Commit the new file, then run:

```bash
./deploy.sh
```
