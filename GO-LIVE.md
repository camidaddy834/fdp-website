# Go-Live / Domain Cutover

Steps to move the site from staging (`new.fdp.org`) to production (`fdp.org`),
which currently still serves the old Wix site. Work top to bottom on launch day.

> **Already handled — do NOT change:** canonical URLs, OpenGraph/social tags,
> and `sitemap.xml` all derive from `astro.config.mjs` → `site: 'https://fdp.org'`.
> They already point at the production domain. No edits needed there at cutover.

---

## 0. Blocker before launch

- [ ] **Headshots** — replace the initials monograms for Melissa Moore & Lance
      Brooks on the About page (and the full Team page) with real photos.

## 1. DNS

- [ ] Point `fdp.org` (and `www.fdp.org`) DNS at Netlify.
- [ ] In Netlify → **Domain settings**, add `fdp.org` as the primary domain and
      confirm the SSL/TLS certificate issues cleanly (Let's Encrypt).
- [ ] Decide `www` vs apex and set the redirect so only one is canonical.

## 2. Swap staging URLs in the CMS config

File: `public/admin/config.yml` — change these 3 lines from `new.fdp.org` to
`fdp.org` (editor-facing "View live" links only; not public SEO):

```yaml
site_url:    https://fdp.org
display_url: https://fdp.org
logo_url:    https://fdp.org/fdp-logo.png
```

Then commit + push → Netlify rebuilds.

## 3. CMS auth worker

- [ ] In the Cloudflare/Netlify auth worker env, `ALLOWED_DOMAINS` already
      includes `fdp.org` — leave it. After cutover is confirmed stable, you can
      drop `new.fdp.org` from `ALLOWED_DOMAINS`.

## 4. Verify redirects (old Wix → new)

- [ ] Spot-check the 301 redirect map against your top ~5 traffic pages on the
      old site — confirm each old URL lands on the right new page, not a 404.

## 5. Analytics & Search Console

- [ ] Confirm **GTM/GA4** fires on `fdp.org` and the Request-a-Proposal event
      registers (submit a test).
- [ ] Add/confirm the `fdp.org` property in **Google Search Console** and submit
      `https://fdp.org/sitemap.xml`.

## 6. Functional smoke test on the live domain

- [ ] Submit the **Request a Proposal** form → confirm the Resend email lands in
      the correct inbox (`proposal@fdp.org`).
- [ ] Click every nav item + footer social links — no 404s.
- [ ] Test on a real phone: nav, galleries, the Our Legacy lightbox, forms.
- [ ] Load `fdp.org/admin/` and confirm staff can sign in and the "View live"
      links now go to `fdp.org`.

## 7. Post-launch (first day)

- [ ] Re-confirm GA4 is receiving real traffic.
- [ ] Hand off CMS login + a 2-minute how-to to staff.

---

## Parked (not blockers)

- ~96 "HGR Mag Archive" PDFs — not placed on the site.
- The montage `.mp4` — kept for social, not placed on the site.

## Update staging-only docs (optional, after launch)

`docs/cms-setup.md` and `docs/analytics-setup.md` describe the staging setup and
reference `new.fdp.org`. They're internal notes (not shipped) — update whenever
convenient; not required for launch.
