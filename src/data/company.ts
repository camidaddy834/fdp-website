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
    "Foodservice Design Professionals is built on the combined experience of three respected food service consulting firms — H. G. Rice & Company, Blasdel & Associates, and Millunzi & Associates — with more than 100 years of combined expertise and roots reaching back to 1967.",
  milestones: [
    { year: "1967", title: "H. G. Rice & Company", body: "The oldest of FDP's founding firms is established, beginning a legacy of food service consulting that carries through to today." },
    { year: "1975", title: "Blasdel & Associates", body: "Blasdel & Associates, Inc. is founded, deepening the expertise that would later come together under FDP." },
    { year: "1997", title: "Millunzi & Associates", body: "Millunzi & Associates, Inc. is established — the third firm in FDP's lineage." },
    { year: "2022", title: "Foodservice Design Professionals", body: "CEO Melissa Moore, FCSI, and President Lance Brooks acquire Millunzi & Associates and rename the firm Foodservice Design Professionals, LLC — uniting 100+ years of combined food service excellence." },
    { year: "Today", title: "Dallas & Houston", body: "FDP designs food service facilities across the United States and internationally from two Texas offices, carrying that legacy forward." },
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
  group: string; // Leadership | Project Managers | Construction Administration | Engineers | Operations & Admin
  location?: string;
  bio?: string;
  photo?: string | null;
  lead?: boolean;
}

/** Display order for the title-based groupings on the Team page. */
export const TEAM_GROUPS = [
  "Leadership",
  "Project Managers",
  "Construction Administration",
  "Engineers",
  "Operations & Admin",
] as const;

export const TEAM = {
  placeholder: false,
  members: [
    // Leadership (fixed order: CEO first)
    {
      name: "Melissa Moore, FCSI",
      title: "Chief Executive Officer",
      group: "Leadership",
      location: "Houston",
      lead: true,
      photo: null,
      bio: "Melissa leads FDP with 17 years of design experience, 20+ years in the food service industry, and 30+ years of leadership. Based in South Texas, she designs, coordinates, and oversees projects for her team across the region.",
    },
    {
      name: "Lance Brooks, FCSI",
      title: "President",
      group: "Leadership",
      location: "Dallas",
      lead: true,
      photo: null,
      bio: "Lance brings 24+ years of design experience and 30+ years in the food service industry. Based in North Texas, he designs, coordinates, and oversees projects for his team across the region.",
    },
    // Project Managers
    { name: "Nick Caldwell", title: "Project Manager", group: "Project Managers", location: "Houston", photo: null },
    { name: "Joel Castaneda", title: "Project Manager", group: "Project Managers", location: "Houston", photo: null },
    { name: "John Imes", title: "Project Manager", group: "Project Managers", location: "Dallas", photo: null },
    { name: "Ray Kanjia", title: "Project Manager", group: "Project Managers", location: "Dallas", photo: null },
    { name: "Duane Mikkelson", title: "Project Manager", group: "Project Managers", location: "Houston", photo: null },
    { name: "Trey Rieper", title: "Project Manager", group: "Project Managers", location: "Dallas", photo: null },
    { name: "Linda Roe", title: "Project Manager", group: "Project Managers", location: "Houston", photo: null },
    { name: "Vernon Sanford", title: "Project Manager", group: "Project Managers", location: "Houston", photo: null },
    { name: "Kevin Sprague", title: "Project Manager", group: "Project Managers", location: "Houston", photo: null },
    { name: "Ling Weng", title: "Project Manager", group: "Project Managers", location: "Dallas", photo: null },
    // Construction Administration
    { name: "Nate Cummins", title: "APM / CA", group: "Construction Administration", location: "Dallas", photo: null },
    { name: "Christina MacMicken", title: "Construction Administrator", group: "Construction Administration", location: "Dallas", photo: null },
    { name: "Stephen Trawnik", title: "CA Manager", group: "Construction Administration", location: "Houston", photo: null },
    // Engineers
    { name: "Tyler Carniglia", title: "Engineer", group: "Engineers", location: "Dallas", photo: null },
    { name: "Korey Krause", title: "Engineer", group: "Engineers", location: "Houston", photo: null },
    { name: "Graeme Morrison", title: "Engineer", group: "Engineers", location: "Houston", photo: null },
    { name: "Alex Ortega", title: "Engineer", group: "Engineers", location: "Dallas", photo: null },
    { name: "Jeff Pinkham", title: "Engineer", group: "Engineers", location: "Houston", photo: null },
    { name: "Charles Scott", title: "Engineer", group: "Engineers", location: "Dallas", photo: null },
    { name: "Aaron Zappas", title: "Engineer", group: "Engineers", location: "Houston", photo: null },
    // Operations & Admin
    { name: "Chavon Cotton", title: "Executive Administrator", group: "Operations & Admin", location: "Dallas", photo: null },
    { name: "Mercedes Dishaw", title: "Executive Assistant / APM", group: "Operations & Admin", location: "Houston", photo: null },
    { name: "Karrie Dossey", title: "Health Dept. Processor", group: "Operations & Admin", location: "Houston", photo: null },
    { name: "Susan Little", title: "Accounting / HR Manager", group: "Operations & Admin", location: "Houston", photo: null },
  ] as TeamMember[],
};

/** Capabilities Statement content (also feeds the downloadable PDF). */
export const CAPABILITIES = {
  placeholder: false,
  intro:
    "FDP is a professional food service facility design firm that combines multidisciplinary experience with cutting-edge technology and highly skilled professionals — serving diverse markets nationally and internationally.",
  coreCompetencies: [
    "Commercial & industrial food service",
    "New construction, renovations / expansions & temporary facilities",
    "District-wide assessments",
    "District standards",
    "Facility design guidelines",
    "Technical design guidelines",
    "Programming, schematic design, design development, construction documents & administration",
    "3D Enscape renderings & fly-throughs",
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

/**
 * Client testimonials (source: FDP_Website_Testimonials.docx, prepared by
 * Chavon Cotton). Publish ONLY entries with approved: true — quotes and
 * attributions must be used exactly as written. Logos (logo: path into
 * /public/testimonials/) can be added later; a text org label shows meanwhile.
 */
export interface Testimonial {
  quote: string;
  name: string;
  title: string;
  org: string;
  logo?: string | null;
  approved: boolean;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Allen ISD has worked with FDP for close to 20 years, and I’ve personally worked with them for the past five. It’s hard to find designers who combine years of experience, an understanding of the inner workings of school business, and customer service that exceeds expectations. Renovations can be stressful, but FDP works hard to make sure your vision comes to life and that the end product is something you’ll use and appreciate for years to come.",
    name: "Kirsten Reitzammer, MS, RD",
    title: "Director of Student Nutrition",
    org: "Allen ISD",
    logo: null,
    approved: true,
  },
  {
    quote:
      "For more than 14 years, FDP has partnered with us on six new schools, two bistros, a warehouse and multiple equipment projects. They take great pride in their work – they’re prepared before a new build or equipment project begins, and they’re there afterward to make sure everything was done right. FDP communicates and coordinates with our architects and contractors, which frees me to focus on the success of our Child Nutrition Program. If you want a no-hassle project or new build, give FDP a shot. You won’t be disappointed.",
    name: "Aaron Wylie",
    title: "Child Nutrition Director",
    org: "Eagle Mountain-Saginaw ISD",
    logo: null,
    approved: true,
  },
  {
    quote:
      "Lance and the FDP team know kitchen design inside and out, along with the equipment brands that truly meet the needs of each campus. Whatever the challenge, I can count on FDP to find a solution or create a design that works.",
    name: "Julie Telesca",
    title: "Nutrition Services Director",
    org: "GCISD",
    logo: null,
    approved: true,
  },
  {
    quote:
      "Working with Lance and the FDP team has been refreshing. Before our bond projects began, they took the time to understand our wants and needs for a successful outcome. Through challenging construction projects funded by our recent bond, having FDP in our corner made sure our voice was heard – they clearly communicated our needs to the architects on our Lakeview Centennial High School kitchen and servery project. After more than four years with Lance and the team, I look forward to many more projects together.",
    name: "James Oates",
    title: "Assistant Director of Equipment and Warehouse Operations",
    org: "Garland ISD",
    logo: null,
    approved: true,
  },
  {
    quote:
      "We’ve had the pleasure of partnering with FDP for more than a decade, and they have consistently provided excellent customer service and expert guidance. From equipment replacements and serving line upgrades to kitchen design for new school construction, FDP has been a trusted partner on projects of every size. They’re responsive, help us problem-solve equipment issues and stay current on the newest kitchen equipment and technology. We’ve been very pleased with the outcome of every project and truly value FDP’s expertise, responsiveness and commitment to our success.",
    name: "Liz Raftery",
    title: "Director",
    org: "Denton ISD",
    logo: null, // NO LOGO — per her preference; do not display a logo
    approved: true,
  },
  {
    quote:
      "I’ve worked with FDP for more than 10 years on kitchen renovations, walk-in cooler and freezer replacements, large equipment replacements and other major kitchen improvements. FDP is involved in every aspect of planning and design – from site visits and working directly with our staff on equipment needs to developing specifications and schematics for contractors. Their recommendations have helped us improve efficiency, enhance our kitchen environments, and serve our students higher-quality food. I would highly recommend FDP. Their expertise makes a real difference in the efficiency of your operation, the quality of your food and the overall function of your kitchens.",
    name: "Eric Lozano",
    title: "Director of Child Nutrition",
    org: "Coppell ISD",
    logo: null, // NO LOGO — Coppell ISD logo NOT approved; do not use
    approved: true,
  },
  {
    quote:
      "I’ve worked with Lance for more than 10 years – four and a half years in Denton and six in Sanger – designing kitchens for new schools and renovating existing ones. With his experience and our history, his first drawings usually already capture what we’re looking for, so it’s minor tweaks, not major changes. I love his creativity. He thinks outside the box to make kitchens high-end and visually appealing, and he always knows the latest equipment – things you didn’t even know existed. He’s also very intentional about kitchen flow, lining up stations with the storage they rely on, so the work is easy and convenient for our staff. Opening a new school can be stressful, but working with Lance and his team – professional, but still fun – makes that part easy. On every project, from beginning to end, they’ve exceeded expectations. I would highly recommend FDP.",
    name: "Audrey Roberts",
    title: "Director of Child Nutrition",
    org: "Sanger ISD",
    logo: null,
    approved: true,
  },
  // Frisco ISD (John Lara) WITHDRAWN 10/29 per district policy — must not be published.
  // Midland ISD (Michelle Helms) in progress — not approved yet.
];
