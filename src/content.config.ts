import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

/** The industry verticals FDP designs for. Slugs drive the portfolio URLs.
 *  To add a vertical: add its slug here AND a label/blurb in VERTICAL_META
 *  (src/data/site.ts) — TypeScript will flag the pair if you miss one. */
export const VERTICALS = [
  "government",
  "corporate",
  "health-care",
  "hospitality",
  "sports",
  "universities",
  "k-12",
  "retail",
  "correctional",
  "production-centers",
] as const;

/**
 * Case-study projects. Each lives as a Markdown file in src/content/projects/,
 * where the frontmatter holds the facts and the body holds the narrative
 * (challenge -> design solution -> outcome).
 */
const projects = defineCollection({
  // Every .md file here becomes a project — except underscore-prefixed files
  // (e.g. _TEMPLATE.md), which are ignored so starters/notes can live alongside.
  loader: glob({ pattern: ["**/*.md", "!**/_*.md"], base: "./src/content/projects" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      client: z.string().optional(),
      sector: z.enum(VERTICALS),
      location: z.string(),
      year: z.number().int().optional(),
      // Key stats surfaced on cards and case-study headers
      squareFeet: z.number().int().optional(),
      seats: z.number().int().optional(),
      services: z.array(z.string()).default([]),
      summary: z.string(),
      heroImage: image().optional(),
      gallery: z.array(image()).default([]),
      featured: z.boolean().default(false),
      order: z.number().default(100),
      draft: z.boolean().default(false),
    }),
});

/**
 * News / blog posts (migrated from the old Wix site). heroImage is a public
 * path string (files live in /public/news/), so no image() helper is needed.
 */
const news = defineCollection({
  loader: glob({ pattern: ["**/*.md", "!**/_*.md"], base: "./src/content/news" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    author: z.string().default("FDP"),
    excerpt: z.string().optional(),
    heroImage: z.string().optional(),
    originalUrl: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects, news };
