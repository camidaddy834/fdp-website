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
 * Company history — FDP's lineage traces to 1967 through three predecessor
 * firms, merged and renamed FDP in 2022 (source: FDP Firm Profile). The client
 * wants to showcase this history with original drawings and media: add files to
 * /public/history/ and list them in `archive` (empty → branded placeholder tiles).
 */
export const HISTORY = {
  placeholder: false,
  yearsLabel: "Since 1967",
  headline: "A legacy dating to 1967",
  foundedYear: 1967,
  intro:
    "Foodservice Design Professionals is built on the combined experience of three respected foodservice consulting firms — H. G. Rice & Company, Blasdel & Associates, and Millunzi & Associates — with more than 100 years of combined expertise and roots reaching back to 1967.",
  milestones: [
    { year: "1967", title: "H. G. Rice & Company", body: "The oldest of FDP's founding firms is established, beginning a legacy of foodservice consulting that carries through to today." },
    { year: "1975", title: "Blasdel & Associates", body: "Blasdel & Associates, Inc. is founded, deepening the expertise that would later come together under FDP." },
    { year: "1997", title: "Millunzi & Associates", body: "Millunzi & Associates, Inc. is established — the third firm in FDP's lineage." },
    { year: "2022", title: "Foodservice Design Professionals", body: "CEO Melissa Moore, FCSI, and President Lance Brooks acquire Millunzi & Associates and rename the firm Foodservice Design Professionals, LLC — uniting 100+ years of combined foodservice excellence." },
    { year: "Today", title: "Dallas & Houston", body: "FDP designs foodservice facilities across the United States and internationally from two Texas offices, carrying that legacy forward." },
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
 * Team members (source: "FDP Staff 2025" roster). Photos go in /public/team/
 * (e.g. "/team/jane-doe.jpg"); with photo: null a monogram of initials renders.
 * `lead` marks the two principals; `location` is the office (Dallas | Houston).
 */
export interface TeamMember {
  name: string;
  title: string;
  location?: string;
  bio?: string;
  photo?: string | null;
  lead?: boolean;
}

export const TEAM = {
  placeholder: false,
  members: [
    // Principals
    {
      name: "Melissa Moore, FCSI",
      title: "Chief Executive Officer",
      location: "Houston",
      lead: true,
      photo: null,
      bio: "Melissa leads FDP with 17 years of design experience, 20+ years in the foodservice industry, and 30+ years of leadership. Based in South Texas, she designs, coordinates, and oversees projects for her team across the region.",
    },
    {
      name: "Lance Brooks, FCSI",
      title: "President",
      location: "Dallas",
      lead: true,
      photo: null,
      bio: "Lance brings 24+ years of design experience and 30+ years in the foodservice industry. Based in North Texas, he designs, coordinates, and oversees projects for his team across the region.",
    },
    // Dallas
    { name: "Christina MacMicken", title: "CA Manager", location: "Dallas", photo: null },
    { name: "Sherri Myers", title: "Project Manager", location: "Dallas", photo: null },
    { name: "John Imes", title: "Project Manager", location: "Dallas", photo: null },
    { name: "Trey Rieper", title: "Project Manager", location: "Dallas", photo: null },
    { name: "Ray Kanjia", title: "Project Manager", location: "Dallas", photo: null },
    { name: "Ling Weng", title: "Project Manager", location: "Dallas", photo: null },
    { name: "Nate Cummins", title: "APM / CA", location: "Dallas", photo: null },
    { name: "Charles Scott", title: "Engineer", location: "Dallas", photo: null },
    { name: "Tyler Carniglia", title: "Engineer", location: "Dallas", photo: null },
    { name: "Alex Ortega", title: "Engineer", location: "Dallas", photo: null },
    { name: "Michelle Lloyd", title: "Bookkeeper / Receivables", location: "Dallas", photo: null },
    // Houston
    { name: "Stephen Trawnik", title: "CA Manager", location: "Houston", photo: null },
    { name: "Nick Caldwell", title: "Project Manager", location: "Houston", photo: null },
    { name: "Duane Mikkelson", title: "Project Manager", location: "Houston", photo: null },
    { name: "Linda Roe", title: "Project Manager", location: "Houston", photo: null },
    { name: "Vernon Sanford", title: "Project Manager", location: "Houston", photo: null },
    { name: "Kevin Sprague", title: "Project Manager", location: "Houston", photo: null },
    { name: "Joel Castaneda", title: "Project Manager", location: "Houston", photo: null },
    { name: "Jeff Pinkham", title: "Engineer", location: "Houston", photo: null },
    { name: "Aaron Zappas", title: "Engineer", location: "Houston", photo: null },
    { name: "Korey Krause", title: "Engineer", location: "Houston", photo: null },
    { name: "Graeme Morrison", title: "Engineer", location: "Houston", photo: null },
    { name: "Mercedes Dishaw", title: "Executive Assistant / APM", location: "Houston", photo: null },
    { name: "Susan Little", title: "Accounting / HR Manager", location: "Houston", photo: null },
    { name: "Karrie Dossey", title: "Health Dept. Processor", location: "Houston", photo: null },
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
    "Diverse market experience, nationally and internationally, since 1967.",
  ],
  snapshot: [
    { label: "Business Name", value: "Foodservice Design Professionals LLC" },
    { label: "Legacy since", value: "1967" },
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
