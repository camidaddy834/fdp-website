# Analytics & Conversion Tracking — Setup Guide

How analytics is wired on the FDP site, and the exact steps to finish the
Google Analytics 4 (GA4) setup inside Google Tag Manager (GTM).

## How it works (already in code)

Analytics runs through **Google Tag Manager**, not a hardcoded GA4 snippet.
The site loads the GTM container and pushes events to the `dataLayer`; GA4 and
the conversion tags are configured inside the GTM web UI.

- **Container:** `GTM-TMHTCZNM` — a **Web** container. Set in
  [`src/data/site.ts`](../src/data/site.ts) as `SITE.gtmId`.
  - ⚠️ It **must be a Web container.** The first attempt (`GTM-K7FCBSBB`) was
    created as a mobile/Firebase container, which only offers the "Google
    Analytics (Firebase)" tag and won't accept the website's `gtm.js` snippet.
    If a future container ever shows only Firebase as the GA option, it's the
    wrong type — create a new **Web** container instead.
- **Loader:** [`src/layouts/BaseLayout.astro`](../src/layouts/BaseLayout.astro)
  renders the GTM container script in `<head>` plus the required `<noscript>`
  iframe right after `<body>`. Both are gated on `SITE.gtmId` (empty = GTM off).
- **Also running:** Cloudflare Web Analytics (cookieless, pageview-only) via
  `SITE.cfBeaconToken` — independent of GTM.

### Events pushed to the dataLayer

| Event | Where it fires | File |
| --- | --- | --- |
| `form_start` | First focus on any proposal-form field | `src/pages/contact.astro` |
| `generate_lead` | Thank-you page load (after a successful submit); includes `value: 1`, `currency: "USD"` | `src/pages/contact/thanks.astro` |

The thank-you page (`/contact/thanks/`) is `noindex` and excluded from the
sitemap, so it only loads after a real submission — which is what makes it a
clean conversion signal (both for GA4 and as a Cloudflare pageview).

---

## Part A — Create the GA4 property & get the Measurement ID

Skip if a GA4 property already exists. You need its `G-XXXXXXXXXX` ID before
touching GTM.

1. Go to **analytics.google.com** → bottom-left **Admin** (gear icon).
2. **Account** column → pick an account, or **Create account** ("Foodservice
   Design Professionals").
3. **Property** column → **Create** → **Property**.
   - Name: `FDP Website`; time zone Central Time; currency USD → **Next** →
     fill industry/size → **Create**, accept terms.
4. On the data-collection screen, choose **Web**.
   - Website URL: `https://fdp.org` (or `new.fdp.org` for now)
   - Stream name: `FDP Web` → **Create stream**.
5. The stream detail panel shows the **Measurement ID** top-right:
   **`G-XXXXXXXXXX`**. Copy it — it's the one value GTM needs.
   - Ignore the on-screen "install tag" instructions; GTM already handles
     installation.

---

## Part B — Create the base Google tag in GTM

> **Naming note:** The tag once called **"GA4 Configuration"** is now the
> **"Google tag"** type (Google merged them in 2024). Either name does the same
> job. Avoid **"Google Analytics (Firebase)"** (mobile apps, orange flame) and
> anything "Universal Analytics" (retired).

1. **tagmanager.google.com** → open container **`GTM-TMHTCZNM`**.
2. **Tags** → **New** → name it `GA4 - Google Tag (Base)`.
3. Click **Tag Configuration** → search **"Google tag"** (or **"GA4
   Configuration"** if that's what the container shows) → select it.
4. **Tag ID / Measurement ID:** paste `G-XXXXXXXXXX` from Part A.
5. Leave Configuration settings at defaults.
6. Click **Triggering** → **Initialization - All Pages**.
   - *Initialization (not "All Pages") guarantees the base tag fires before any
     event tags.*
7. **Save.**

This base tag alone already sends **pageviews** to GA4.

---

## Part C — Event tags (so `form_start` & `generate_lead` reach GA4)

Create two **Custom Event triggers**, then two **GA4 Event tags**.

### Triggers
1. **Triggers** → **New** → name `CE - generate_lead`.
2. Trigger Configuration → **Custom Event**.
3. **Event name:** `generate_lead` (must match the `event:` value in the
   dataLayer push exactly).
4. Keep "All Custom Events" → **Save**.
5. Repeat for `form_start` (trigger `CE - form_start`, event name `form_start`).

### Tags
1. **Tags** → **New** → name `GA4 Event - generate_lead`.
2. Tag Configuration → **Google Analytics: GA4 Event**.
3. **Measurement ID / Tag:** select the base Google tag, or paste
   `G-XXXXXXXXXX`.
4. **Event Name:** `generate_lead`.
5. *(Optional, recommended for this one)* **Event Parameters** → add:
   - `value` → `{{DLV - value}}`
   - `currency` → `{{DLV - currency}}`

   Create those variables via **Variables → New → Data Layer Variable**
   (names `value` and `currency`). The thanks-page push already includes
   `value: 1` and `currency: "USD"`.
6. **Triggering** → `CE - generate_lead` → **Save**.
7. Repeat for `form_start` (tag `GA4 Event - form_start`, event name
   `form_start`, trigger `CE - form_start`; no value/currency needed).

---

## Part D — Test, then publish

1. Top-right → **Preview**. Enter `https://new.fdp.org` → **Connect**.
   (The container must be **deployed to the live site first** — see below.)
2. Load a page → Tag Assistant should show the **Google tag** fire.
3. Focus the contact-form field → **`form_start`** fires. Submit a test → on
   `/contact/thanks/` → **`generate_lead`** fires.
4. Back in GTM → **Submit** → version name `GA4 setup` → **Publish**.
5. In GA4: **Admin → Key events** → once `generate_lead` appears (after a real
   test; can take minutes to hours), toggle it on as a **Key event**. That's
   what makes it count as a conversion.

---

## Deploying container changes to the live site

The container ID is baked into the site at build time, so any change to
`SITE.gtmId` needs a redeploy:

```
./deploy.sh
```

(Push via GitHub Desktop first if you also want it in the repo.) GTM **tag**
changes, by contrast, publish instantly from the GTM UI — no site redeploy
needed once the container is live.

---

## ⚠️ Cookie consent — do before publishing GA4 tags

GA4/GTM set cookies and the site currently has **no consent banner**. For a
US-only B2B site the risk is lower, but a clean setup adds a lightweight consent
banner wired to **GTM Consent Mode** before GA4 tags go live. Not yet built.
