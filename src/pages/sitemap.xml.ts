import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { VERTICALS } from "../content.config";

/**
 * Hand-rolled sitemap so we control exactly what gets submitted:
 *  - draft projects and draft news posts are excluded
 *  - only portfolio verticals that actually have a published project are listed
 *    (empty sector pages would be thin content)
 *  - news posts carry a <lastmod> from their frontmatter date
 */
export const GET: APIRoute = async ({ site }) => {
  const origin = (site?.href ?? "https://fdp.org/").replace(/\/$/, "");
  const url = (p: string) => `${origin}${p}`;

  const projects = (await getCollection("projects")).filter((p) => !p.data.draft);
  const news = (await getCollection("news")).filter((n) => !n.data.draft);

  // Verticals with at least one published project.
  const populatedVerticals = VERTICALS.filter((v) =>
    projects.some((p) => p.data.sector === v),
  );

  type Entry = { loc: string; lastmod?: string; priority?: string };
  const entries: Entry[] = [
    { loc: url("/"), priority: "1.0" },
    { loc: url("/about") },
    { loc: url("/history") },
    { loc: url("/portfolio"), priority: "0.9" },
    { loc: url("/testimonials") },
    { loc: url("/capabilities") },
    { loc: url("/team") },
    { loc: url("/news") },
    { loc: url("/contact"), priority: "0.9" },
    ...populatedVerticals.map((v) => ({ loc: url(`/portfolio/${v}/`) })),
    ...projects.map((p) => ({ loc: url(`/work/${p.id}/`), priority: "0.8" })),
    ...news.map((n) => ({
      loc: url(`/news/${n.id}/`),
      lastmod: n.data.date.toISOString().slice(0, 10),
    })),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(
    (e) =>
      `  <url>\n    <loc>${e.loc}</loc>${
        e.lastmod ? `\n    <lastmod>${e.lastmod}</lastmod>` : ""
      }${e.priority ? `\n    <priority>${e.priority}</priority>` : ""}\n  </url>`,
  )
  .join("\n")}
</urlset>
`;

  return new Response(body, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
};
