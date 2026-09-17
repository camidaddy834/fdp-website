---
# ── HOW TO ADD A PROJECT ────────────────────────────────────────────────
# 1. Copy this file to a new name ending in .md, e.g. "acme-cafeteria.md".
#    The file name (without .md) becomes the URL: /work/acme-cafeteria/
#    Use lowercase words separated by hyphens; no spaces.
# 2. Fill in the fields below and write the story underneath.
# 3. That's it — the project appears automatically on the portfolio page,
#    its sector page, and (if featured) the homepage. Nothing else to edit.
#
# Files whose name starts with "_" (like this one) are ignored, so this
# template never shows up on the site.
# ────────────────────────────────────────────────────────────────────────

# REQUIRED ------------------------------------------------------------------
title: "Project Name"                 # Shown as the case-study headline
sector: "corporate"                   # MUST be one of the sector slugs below
location: "City, TX"                  # e.g. "Houston, TX"
summary: "One or two sentences describing the project — shown on cards and at the top of the page."

# Sector slugs (pick exactly one for `sector` above):
#   government · corporate · health-care · hospitality · sports
#   universities · k-12 · retail · correctional · production-centers

# OPTIONAL — delete any line you don't have -------------------------------
client: "Client / owner name"
year: 2025                            # Number, no quotes
squareFeet: 12000                     # Number — shown as "12,000 sq ft" on the card
seats: 300                            # Number — shown as "300 seats" if there's no squareFeet
services: ["Foodservice Design", "Equipment Specification"]   # List of strings

# Hero + gallery images. Put image files in src/assets/projects/ and point to
# them here. If you leave heroImage out, a branded FDP placeholder is shown —
# so a project looks fine with no photos at all.
# heroImage: ../../assets/projects/your-image.jpg
# gallery:
#   - ../../assets/projects/your-image-2.jpg
#   - ../../assets/projects/your-image-3.jpg

# Placement controls -------------------------------------------------------
featured: false                       # true = also show on the homepage (top 3 featured)
order: 100                            # Lower numbers sort first. Default 100.
draft: false                          # true = keep it out of the live site (work in progress)
---

## The challenge

What the client needed and the constraints — the problem FDP was brought in to solve.

## The design solution

How FDP approached it: the layout, flow, and equipment decisions that made it work.
Use **bold** for the details worth emphasizing.

## The outcome

The result — how the finished facility performs, plus any awards or recognition.
