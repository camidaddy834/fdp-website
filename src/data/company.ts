/* ============================================================
   Company content: mission, certifications, team, capabilities.
   EVERYTHING below is PLACEHOLDER content — replace with FDP's
   real wording, certifications, bios, photos, and NAICS codes.
   `placeholder: true` drives the visible "needs real content" flags.
   ============================================================ */

export const MISSION = {
  placeholder: false,
  // First entry is the lead paragraph (shown large); the rest read as body copy.
  statement: [
    "Our mission at Foodservice Design Professionals is to transform our clients’ aspirations into reality by delivering exceptional food service facility designs. We are dedicated to collaborating closely with our clients to understand their unique needs and operational requirements. Through a synthesis of creativity, functionality, and sustainability, we strive to design environments that enhance operational efficiency and elevate the overall dining experience.",
    "Our mission’s core is a commitment to innovation and continuous improvement. We aim to stay at the forefront of industry trends, incorporating the latest technologies and design principles to ensure our client’s facilities are state-of-the-art and adaptable to evolving needs.",
    "A passion for excellence drives us, and our mission is to exceed client expectations by providing aesthetically pleasing, operationally seamless, and environmentally responsible designs. In every project, we emphasize quality craftsmanship, attention to detail, and a client-centric approach to ensure the successful realization of our clients’ visions.",
    "In summary, our mission at Foodservice Design Professionals is to be a trusted partner for food service facility design, committed to excellence, innovation, sustainability, and client satisfaction.",
  ],
  // Optional supporting values shown beneath the statement
  values: [
    {
      title: "Client-first",
      body: "We collaborate closely to understand each client’s unique needs and operational requirements — then design around their vision.",
    },
    {
      title: "Innovation",
      body: "We stay at the forefront of industry trends, bringing the latest technologies and design principles to every facility.",
    },
    {
      title: "Sustainable by design",
      body: "We balance creativity, functionality, and sustainability — spaces that are aesthetically pleasing, operationally seamless, and environmentally responsible.",
    },
  ],
};

/**
 * Company history — a 57+ year lineage the client wants to showcase, with
 * original drawings and media. ALL milestone copy below is PLACEHOLDER.
 * NOTE: the homepage/positioning currently says "Founded 1997"; the client
 * says 57+ years (≈1969). Confirm the real founding year and reconcile the two.
 * Archive images go in /public/history/ and get listed in `archive`.
 */
export const HISTORY = {
  placeholder: true,
  yearsLabel: "57+ years",
  foundedYear: 1969, // VERIFY — conflicts with the "Founded 1997" stat elsewhere
  intro:
    "For more than five decades, FDP has planned and designed foodservice facilities across the country. This is a placeholder history — replace with FDP's real story, milestones, and the original drawings and media the team wants to feature.",
  milestones: [
    { year: "1969", title: "The firm is founded", body: "Placeholder — the founding story: who started FDP, where, and the first projects on the board." },
    { year: "1980s", title: "Growth across Texas", body: "Placeholder — expansion, notable early clients, and the practice's growing reputation." },
    { year: "1997", title: "A new chapter", body: "Placeholder — reconcile with the '1997' founding date used elsewhere (LLC formation vs. firm origin?)." },
    { year: "2010s", title: "Modern practice", body: "Placeholder — technology, BIM/CAD, and the shift to today's design approach." },
    { year: "Today", title: "Dallas & Houston", body: "Placeholder — the practice now: two offices, ten markets, and decades of built work." },
  ],
  // Original drawings & media. Add files to /public/history/ and list them here.
  // Empty for now → the page shows branded placeholder tiles.
  archive: [] as { src: string; caption: string }[],
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
  placeholder?: boolean;
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
      name: "Lance Brooks, FCSI",
      title: "President",
      photo: null,
      bio: "Lance brings 24+ years of design experience and 30+ years in the foodservice industry. Based in North Texas, he designs, coordinates, and oversees projects for his team across the region.",
    },
    // Placeholders — replace name/title/photo as real staff are added.
    { name: "[Team member 03]", title: "[Title]", photo: null, placeholder: true },
    { name: "[Team member 04]", title: "[Title]", photo: null, placeholder: true },
    { name: "[Team member 05]", title: "[Title]", photo: null, placeholder: true },
    { name: "[Team member 06]", title: "[Title]", photo: null, placeholder: true },
    { name: "[Team member 07]", title: "[Title]", photo: null, placeholder: true },
    { name: "[Team member 08]", title: "[Title]", photo: null, placeholder: true },
    { name: "[Team member 09]", title: "[Title]", photo: null, placeholder: true },
    { name: "[Team member 10]", title: "[Title]", photo: null, placeholder: true },
    { name: "[Team member 11]", title: "[Title]", photo: null, placeholder: true },
    { name: "[Team member 12]", title: "[Title]", photo: null, placeholder: true },
    { name: "[Team member 13]", title: "[Title]", photo: null, placeholder: true },
    { name: "[Team member 14]", title: "[Title]", photo: null, placeholder: true },
    { name: "[Team member 15]", title: "[Title]", photo: null, placeholder: true },
    { name: "[Team member 16]", title: "[Title]", photo: null, placeholder: true },
    { name: "[Team member 17]", title: "[Title]", photo: null, placeholder: true },
    { name: "[Team member 18]", title: "[Title]", photo: null, placeholder: true },
    { name: "[Team member 19]", title: "[Title]", photo: null, placeholder: true },
    { name: "[Team member 20]", title: "[Title]", photo: null, placeholder: true },
    { name: "[Team member 21]", title: "[Title]", photo: null, placeholder: true },
    { name: "[Team member 22]", title: "[Title]", photo: null, placeholder: true },
    { name: "[Team member 23]", title: "[Title]", photo: null, placeholder: true },
    { name: "[Team member 24]", title: "[Title]", photo: null, placeholder: true },
    { name: "[Team member 25]", title: "[Title]", photo: null, placeholder: true },
    { name: "[Team member 26]", title: "[Title]", photo: null, placeholder: true },
    { name: "[Team member 27]", title: "[Title]", photo: null, placeholder: true },
    { name: "[Team member 28]", title: "[Title]", photo: null, placeholder: true },
    { name: "[Team member 29]", title: "[Title]", photo: null, placeholder: true },
    { name: "[Team member 30]", title: "[Title]", photo: null, placeholder: true },
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
