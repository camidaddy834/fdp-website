/* ============================================================
   Company content: mission, certifications, team, capabilities.
   EVERYTHING below is PLACEHOLDER content — replace with FDP's
   real wording, certifications, bios, photos, and NAICS codes.
   `placeholder: true` drives the visible "needs real content" flags.
   ============================================================ */

export const MISSION = {
  placeholder: true,
  statement:
    "To design foodservice facilities that perform — spaces that serve more people, run more efficiently, and endure for decades — while making the process straightforward for the owners, operators, and design teams we partner with.",
  // Optional supporting values shown beneath the statement
  values: [
    {
      title: "Performance first",
      body: "We design around how a kitchen actually runs, not just how it looks on a plan.",
    },
    {
      title: "Partnership",
      body: "We coordinate closely with architects, operators, and MEP so nothing gets value-engineered into a bottleneck.",
    },
    {
      title: "Longevity",
      body: "We specify for the long haul — equipment and layouts that hold up under real-world volume.",
    },
  ],
};

/**
 * Certifications & affiliations. These are EXAMPLES of the kinds of
 * credentials a firm like FDP might hold — replace every entry with
 * FDP's actual certifications (and add logo files to /public/certs/).
 */
export const CERTIFICATIONS = {
  placeholder: false,
  items: [
    { abbr: "WBE", name: "Women's Business Enterprise", issuer: "Diversity certification", logo: null as string | null },
    { abbr: "WOSB", name: "Woman-Owned Small Business", issuer: "U.S. SBA program", logo: null as string | null },
    { abbr: "SBA", name: "Small Business Administration", issuer: "Federal", logo: null as string | null },
    { abbr: "SBE", name: "Small Business Enterprise", issuer: "Diversity certification", logo: null as string | null },
    { abbr: "SDB", name: "Small Disadvantaged Business", issuer: "U.S. SBA program", logo: null as string | null },
    { abbr: "HUB", name: "Historically Underutilized Business", issuer: "State of Texas", logo: null as string | null },
  ],
};

/**
 * Team members. Photos go in /public/team/ (e.g. "/team/jane-doe.jpg").
 * With photo: null, a branded monogram placeholder renders instead.
 */
export interface TeamMember {
  name: string;
  title: string;
  bio?: string;
  photo?: string | null;
}

export const TEAM = {
  placeholder: false,
  members: [
    {
      name: "Melissa Moore, FCSI",
      title: "Chief Executive Officer",
      photo: null,
      bio: "Melissa leads FDP with 17 years of design experience, 20+ years in the foodservice industry, and 30+ years of leadership. Based in South Texas, she designs, coordinates, and oversees projects for her team across the region.",
    },
    {
      name: "Lance Brooks",
      title: "President",
      photo: null,
      bio: "Lance brings 24+ years of design experience and 30+ years in the foodservice industry. Based in North Texas, he designs, coordinates, and oversees projects for his team across the region.",
    },
  ] as TeamMember[],
};

/** Capabilities Statement content (also feeds the downloadable PDF). */
export const CAPABILITIES = {
  placeholder: false,
  intro:
    "FDP is a professional foodservice facility design firm that combines multidisciplinary experience with cutting-edge technology and highly skilled professionals — serving diverse markets nationally and internationally.",
  coreCompetencies: [
    "Commercial, non-commercial & industrial foodservice",
    "New designs and renovations / expansions",
    "District-wide assessments",
    "Facility design guidelines",
    "Programming, schematic design, design development, construction documents & administration",
    "3D renderings",
    "Revit software",
    "VR technology",
  ],
  differentiators: [
    "Certified WBE, WOSB, SBA, SBE, SDB & HUB.",
    "Cutting-edge tools — Revit, 3D rendering, and VR technology.",
    "Diverse market experience, nationally and internationally, since 1997.",
  ],
  snapshot: [
    { label: "Business Name", value: "Foodservice Design Professionals LLC" },
    { label: "Founded", value: "1997" },
    { label: "DUNS", value: "02153580" },
    { label: "UEID", value: "QUNELMMQ2SN9" },
    { label: "CAGE", value: "7YWH3" },
    { label: "Certifications", value: "WBE, WOSB, SBA, SBE, SDB & HUB" },
    { label: "NAICS", value: "541310 — Architectural Services" },
    { label: "SIC", value: "8712 — Architectural Services" },
    { label: "NIGP", value: "906-07 Architect Services; 918-52 Food Service Consulting" },
    { label: "UNSPSC", value: "82141505 — Computer Generated Design Services" },
  ],
  pdfPath: "/fdp-capabilities-statement.pdf",
};
