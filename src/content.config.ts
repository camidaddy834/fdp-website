import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

/** The six industry verticals FDP designs for. Slugs drive the portfolio URLs. */
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
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
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

export const collections = { projects };
