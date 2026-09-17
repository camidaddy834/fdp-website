#!/usr/bin/env node
/**
 * Scaffold a new project case study.
 *
 *   npm run new:project -- "El Paso CC Culinary Center" universities
 *
 * Creates src/content/projects/<slug>.md, pre-filled and ready to edit.
 * The sector is validated against the real VERTICALS list in
 * src/content.config.ts, so a typo fails loudly instead of at build time.
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

// Pull the sector slugs straight from content.config.ts so this never drifts.
const config = readFileSync(join(root, "src/content.config.ts"), "utf8");
const block = config.match(/VERTICALS\s*=\s*\[([\s\S]*?)\]/);
const sectors = block ? [...block[1].matchAll(/"([^"]+)"/g)].map((m) => m[1]) : [];

const [title, sector] = process.argv.slice(2);

function fail(msg) {
  console.error(`\n  ✗ ${msg}\n`);
  console.error('  Usage: npm run new:project -- "Project Title" <sector>');
  console.error(`  Sectors: ${sectors.join(" · ")}\n`);
  process.exit(1);
}

if (!title) fail("Missing project title.");
if (!sector) fail("Missing sector.");
if (!sectors.includes(sector)) fail(`"${sector}" is not a valid sector.`);

const slug = title
  .toLowerCase()
  .replace(/['’]/g, "")
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/^-+|-+$/g, "");

const file = join(root, "src/content/projects", `${slug}.md`);
if (existsSync(file)) fail(`src/content/projects/${slug}.md already exists.`);

const body = `---
title: "${title.replace(/"/g, '\\"')}"
sector: "${sector}"
location: "City, TX"
summary: "One or two sentences describing the project — shown on cards and at the top of the page."
# Optional — delete any you don't have:
# client: "Client / owner name"
# year: 2025
# squareFeet: 12000
# seats: 300
# services: ["Foodservice Design", "Equipment Specification"]
# heroImage: ../../assets/projects/${slug}.jpg
featured: false
order: 100
draft: true
---

## The challenge

What the client needed and the constraints FDP was brought in to solve.

## The design solution

How FDP approached it — layout, flow, and equipment decisions.

## The outcome

The result, plus any awards or recognition.
`;

writeFileSync(file, body);
console.log(`\n  ✓ Created src/content/projects/${slug}.md`);
console.log(`    URL: /work/${slug}/  (sector: ${sector})`);
console.log(`    It's marked draft: true — flip to false when it's ready to publish.\n`);
