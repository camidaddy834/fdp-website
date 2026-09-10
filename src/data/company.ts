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
  placeholder: true,
  items: [
    {
      abbr: "HUB",
      name: "Historically Underutilized Business",
      issuer: "State of Texas",
      logo: null as string | null,
    },
    {
      abbr: "DBE",
      name: "Disadvantaged Business Enterprise",
      issuer: "Issuing agency TBD",
      logo: null as string | null,
    },
    {
      abbr: "SBE",
      name: "Small Business Enterprise",
      issuer: "Issuing agency TBD",
      logo: null as string | null,
    },
    {
      abbr: "FCSI",
      name: "Foodservice Consultants Society International (member)",
      issuer: "Professional affiliation",
      logo: null as string | null,
    },
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
  placeholder: true,
  members: [
    { name: "[Principal name]", title: "Principal / Founder", photo: null, bio: "Short bio — background, focus areas, years in foodservice design." },
    { name: "[Team member]", title: "Senior Designer", photo: null, bio: "Short bio placeholder." },
    { name: "[Team member]", title: "Project Manager", photo: null, bio: "Short bio placeholder." },
    { name: "[Team member]", title: "Foodservice Designer", photo: null, bio: "Short bio placeholder." },
    { name: "[Team member]", title: "Equipment Specialist", photo: null, bio: "Short bio placeholder." },
    { name: "[Team member]", title: "Designer", photo: null, bio: "Short bio placeholder." },
  ] as TeamMember[],
};

/** Capabilities Statement content (also feeds the downloadable PDF). */
export const CAPABILITIES = {
  placeholder: true,
  intro:
    "Foodservice Design Professionals provides master planning, foodservice facility design, and equipment specification for institutional and commercial clients across six sectors.",
  coreCompetencies: [
    "Foodservice master planning & programming",
    "Kitchen & servery design",
    "Equipment specification & biddable schedules",
    "Utility & ventilation coordination",
    "Concept development & test fits",
    "Construction-phase support",
  ],
  differentiators: [
    "Foodservice design is our sole discipline — not a side practice.",
    "30+ years designing high-volume facilities across Texas.",
    "Designs engineered around throughput, labor, and long-term durability.",
  ],
  snapshot: [
    { label: "Founded", value: "1997" },
    { label: "Business Name", value: "Foodservice Design Professionals LLC" },   
    { label: "DUNS", value: "02153580" },
    { label: "UEID", value: "QUNELMMQ2SN9" },
    { label: "CAGE", value: "7YWH3" },     
    { label: "Certifications", value: "WBE, WOSB, SBA, SBE, SDB and HUB" },
    { label: "NAICS CODE", value: "541310 - Architectural Services " },
    { label: "SIC CODE", value: "8712 - Architectural Services" },
    { label: "NIGP CODE", value: "906-07: Architect Services, Professional, Including Consulting" },
    { label: "NIGP CODE", value: "918-52: Food Service Consulting"},
    { label: "UNSPSC CODE", value: "2141505 - Computer Generated Design Services"}  ,  

  ],
  pdfPath: "/fdp-capabilities-statement.pdf",
};
