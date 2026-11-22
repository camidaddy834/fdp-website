import type { VERTICALS } from "../content.config";

export const SITE = {
  name: "Foodservice Design Professionals",
  short: "FDP",
  tagline: "Food service facility design & consulting",
  proposalEmail: "proposal@fdp.org",
  // Cloudflare Web Analytics beacon token. Paste the token from your
  // Cloudflare Web Analytics site here; the beacon renders only when set.
  cfBeaconToken: "deab28742e984c95b0fa61fff4565abc",
  // Google Tag Manager container ID (format "GTM-XXXXXXX"). GA4 and the
  // conversion tags are configured inside the GTM UI; the site just loads the
  // container and pushes events (form_start, generate_lead) to the dataLayer.
  // Leave empty to keep GTM from loading.
  gtmId: "GTM-TMHTCZNM",
};

/** Social profiles, shown in the footer. */
export const SOCIAL = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/foodservice-design-professionals/",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/foodservicedesignprofessionals",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/foodservicedesignprofessionals/",
  },
] as const;

/** Two offices — Dallas & Houston (San Antonio/Austin retired in the redesign).
 *  The structured street/locality/region/postal fields feed the LocalBusiness
 *  JSON-LD in BaseLayout; `address` is the human-readable line used in the footer. */
export const OFFICES = [
  {
    city: "Dallas",
    area: "Southlake",
    address: "584 N. Kimball Ave, Southlake, TX 76092",
    street: "584 N. Kimball Ave",
    locality: "Southlake",
    region: "TX",
    postal: "76092",
    // Geocoded via OpenStreetMap/Nominatim (rooftop match on 584 N Kimball Ave).
    lat: 32.94913,
    lng: -97.11677,
    phone: "972-245-5300",
    phoneHref: "tel:+19722455300",
    phoneE164: "+1-972-245-5300",
  },
  {
    city: "Houston",
    area: "The Woodlands",
    address: "594 Sawdust Rd, Suite 139, The Woodlands, TX 77380",
    street: "594 Sawdust Rd, Suite 139",
    locality: "The Woodlands",
    region: "TX",
    postal: "77380",
    // Geocoded via OpenStreetMap/Nominatim (street-level match on Sawdust Rd, 77380).
    lat: 30.12687,
    lng: -95.46100,
    phone: "281-350-2323",
    phoneHref: "tel:+12813502323",
    phoneE164: "+1-281-350-2323",
  },
] as const;

type Vertical = (typeof VERTICALS)[number];

export const VERTICAL_META: Record<
  Vertical,
  { label: string; blurb: string }
> = {
  government: {
    label: "Government",
    blurb:
      "Food service for public agencies and civic facilities — built to code, budget, and public accountability.",
  },
  corporate: {
    label: "Business and Industry",
    blurb:
      "Employee cafés and executive dining that make the workplace a destination.",
  },
  "health-care": {
    label: "Health Care",
    blurb:
      "Patient-first food service and staff dining that meet demanding clinical standards.",
  },
  hospitality: {
    label: "Hospitality",
    blurb:
      "Hotels, resorts, casinos, and signature restaurants engineered for high-volume service.",
  },
  sports: {
    label: "Sports",
    blurb:
      "Concessions, clubs, and premium dining for stadiums, arenas, and event venues.",
  },
  universities: {
    label: "Higher Education",
    blurb:
      "Dining halls, retail venues, and teaching kitchens that keep pace with campus life.",
  },
  "k-12": {
    label: "K-12",
    blurb:
      "Efficient serving lines and scratch kitchens that feed schools at scale.",
  },
  retail: {
    label: "Retail",
    blurb:
      "Grocery, market, and grab-and-go food service designed for throughput and freshness.",
  },
  correctional: {
    label: "Correctional",
    blurb:
      "Secure, high-capacity kitchens engineered for safety, durability, and volume.",
  },
  "production-centers": {
    label: "Production Centers",
    blurb:
      "Central kitchens and commissaries built to produce and distribute at scale.",
  },
};

export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

export const NAV: NavItem[] = [
  { label: "Who We Are", href: "/about" },
  { label: "History", href: "/history" },
  { label: "Team", href: "/team" },
  {
    label: "Portfolio",
    href: "/portfolio",
    children: [
      { label: "Overview", href: "/portfolio" },
      { label: "Testimonials", href: "/testimonials" },
    ],
  },
  { label: "News", href: "/news" },
  { label: "Contact", href: "/contact" },
  { label: "Capabilities", href: "/capabilities" },
];
