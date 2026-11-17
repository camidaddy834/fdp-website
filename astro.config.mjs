// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // Canonical production origin. Drives absolute URLs for <link rel="canonical">,
  // og:url, the sitemap, robots.txt, and the LocalBusiness/Organization schema.
  site: 'https://fdp.org',
});
