# Browser CMS Setup — Sveltia CMS

Staff can edit projects and news from a browser at **https://fdp.org/admin/** —
no code, no local tools. This doc covers the **one-time setup** and how
publishing works day to day.

> **Status:** Editor code is committed (`public/admin/`). The three setup steps
> below (Netlify auto-deploy, GitHub OAuth app, Cloudflare auth worker) are
> **not done yet** — until they are, logging in at `/admin/` won't work.

---

## How it works (the big picture)

```
Staff edit at fdp.org/admin/
        │  (Sveltia commits the changed .md file to GitHub)
        ▼
GitHub  →  branch: main
        │  (a push to main triggers a build)
        ▼
Netlify continuous deployment  →  rebuilds & publishes  →  fdp.org
```

The CMS just writes Markdown to the repo — the **exact same files** we edit by
hand (`src/content/projects/*.md`, `src/content/news/*.md`). Netlify does the
rest. The key enabler is **step 1**: Netlify must auto-build on every push.

---

## Step 1 — Make pushes to `main` actually build  ⭐ (the important one)

Today the site is published manually with `./deploy.sh`. For the CMS to work,
a commit to `main` has to rebuild the site **on its own** — otherwise a staff
edit lands in GitHub but never goes live.

**The repo is already linked to Netlify for continuous deployment.** The reason
pushes don't build isn't a missing link — it's Netlify's **"Unrecognized Git
contributor"** protection: on a private repo, Netlify refuses to build commits
whose author email isn't a *verified email on the Netlify account*. (That's why
Charlie's GitHub Desktop commits — authored by an Apple `…@privaterelay.appleid.com`
address — never triggered a build.)

This matters doubly for the CMS, because **Sveltia commits as whoever is logged
in** (each editor's GitHub account email, or their GitHub `…@users.noreply.github.com`
address if their email is private). So those author emails need to be verified
too, or their edits won't build.

**The fix (one-time):**

1. Go to **app.netlify.com** → the FDP site
   (site ID `b6de1cbe-1d5b-4186-9d62-58bd9da92d2c`).
2. **User settings → Emails** (or the account-level email settings) → **Add
   email address** → add and **verify** each commit-author email that should be
   allowed to trigger builds:
   - Charlie's own GitHub commit email (so manual/GitHub-Desktop pushes build).
   - The email Sveltia will commit under for each editor. Easiest way to find
     it: make one test edit in the CMS, open the resulting commit on GitHub, and
     read the author email — then add that one.
3. Confirm the site's build settings under **Site configuration → Build &
   deploy** match `netlify.toml` (**branch** `main`, **command** `npm run build`,
   **publish** `dist`) and that **`RESEND_API_KEY`** (+ any other env vars) are
   present — CD builds use these the same way manual deploys did.
4. Push any commit to `main` (or hit **Deploys → Trigger deploy**) and confirm a
   from-GitHub build runs to success.

> If managing per-editor emails gets fiddly, the simplest robust setup is to
> have everyone edit through **one shared "FDP Web Editor" GitHub account** whose
> email is verified on Netlify — then there's exactly one author email to trust.
> Ask and we'll set that up.

After this, **a push to `main` publishes automatically** — for the CMS and for
us. `./deploy.sh` stays as a manual fallback.

---

## Step 2 — Create a GitHub OAuth app

This lets staff "Log in with GitHub" from the editor.

1. **github.com → Settings → Developer settings → OAuth Apps → New OAuth App**
   (do this on an account/org that owns or can access the repo).
2. Fill in:
   - **Application name:** `FDP Content Manager`
   - **Homepage URL:** `https://fdp.org`
   - **Authorization callback URL:** `https://<worker-name>.<your-subdomain>.workers.dev/callback`
     (you'll get the exact worker URL in step 3 — you can come back and edit this
     field after deploying the worker).
3. **Register application.** Copy the **Client ID**, then **Generate a new
   client secret** and copy that too. You'll paste both into the worker.

---

## Step 3 — Deploy the auth worker (Cloudflare)

Sveltia needs a tiny serverless relay to complete the GitHub OAuth handshake.
The maintained one is **`sveltia-cms-auth`**. You already use Cloudflare (for
Web Analytics), so this is free and quick.

**Easiest path — deploy from the repo:**

1. In the **Cloudflare dashboard → Workers & Pages → Create → Import a
   repository**, or use the one-click deploy button in the
   [`sveltia-cms-auth` README](https://github.com/sveltia/sveltia-cms-auth).
2. After it deploys, open the worker → **Settings → Variables** and add:
   - `GITHUB_CLIENT_ID` = the Client ID from step 2
   - `GITHUB_CLIENT_SECRET` = the client secret from step 2 (mark as **encrypted**)
   - `ALLOWED_DOMAINS` = `fdp.org` (optional but recommended — locks the worker
     to our site)
3. Copy the worker's URL, e.g. `https://sveltia-cms-auth.<you>.workers.dev`.
4. Go back to the **GitHub OAuth app** (step 2) and set the **callback URL** to
   that worker URL **+ `/callback`**.
5. Put the worker URL into **`public/admin/config.yml`** as `base_url`
   (replace the `REPLACE-WITH-AUTH-WORKER` placeholder), commit, and let Netlify
   redeploy.

---

## Step 4 — Give staff access

The editor commits as the logged-in GitHub user, so each editor needs a GitHub
account with write access to the repo:

- **github.com → the repo → Settings → Collaborators → Add people**, or add
  them to a team with write access if the repo is in an org.
- They accept the invite, then go to **https://fdp.org/admin/** and **Log in
  with GitHub**.

(If you'd rather not give everyone a GitHub login, we can switch to an
org/GitHub-App model later — ask and we'll revisit.)

---

## Day-to-day: how staff use it

1. Go to **https://fdp.org/admin/** → **Log in with GitHub**.
2. Pick **Projects** or **News** in the sidebar.
3. Edit an existing entry or click **New**. Fill in the form; drag images into
   the image fields (they upload to the right folder automatically).
4. Click **Publish** (or **Save**). Sveltia commits to `main`; Netlify rebuilds
   and the change is live in ~1–2 minutes.

**Fields map 1:1 to the site:** a project's sector, square footage, services,
hero image, gallery, "Feature on homepage", and the case-study body all behave
exactly as a hand-edited file would. Set **Draft** to keep something off the
live site while it's in progress.

---

## Notes & gotchas

- **Images, two conventions (handled for you):** project photos upload to
  `src/assets/projects/` (Astro-optimized) and are written as
  `../../assets/projects/<file>`; news images upload to `public/news/` and are
  written as `/news/<file>`. The config sets this per-field, so editors just
  drag and drop.
- **The `_TEMPLATE` project** may appear in the Projects list (the CMS reads the
  whole folder). It's harmless — it's excluded from the live site by its
  underscore name. Tell editors to ignore the one titled "Project Name," or we
  can remove it since the CMS now replaces its purpose.
- **Formatting of saved files:** Sveltia may quote YAML frontmatter slightly
  differently than our hand-written files (e.g. flow vs. block lists). It's
  functionally identical — Astro parses both — just expect cosmetic diffs.
- **Want a review step before publish?** We can enable Sveltia's *editorial
  workflow*, which saves edits to a branch/PR for approval instead of straight
  to `main`. It's safer but adds a click; off by default. Ask and we'll turn it
  on.
- **`site.ts` / `company.ts` stay in code.** Offices, nav, phone numbers and
  the like are site configuration, not content — intentionally not in the CMS.
