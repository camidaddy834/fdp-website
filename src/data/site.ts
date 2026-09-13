import type { VERTICALS } from "../content.config";

export const SITE = {
  name: "Foodservice Design Professionals",
  short: "FDP",
  tagline: "Foodservice facility design & consulting",
  proposalEmail: "proposal@fdp.org",
};

/** Two offices — Dallas & Houston (San Antonio/Austin retired in the redesign). */
export const OFFICES = [
  {
    city: "Dallas",
    area: "Southlake",
    address: "584 N. Kimball Ave, Southlake, TX 76092",
    phone: "972-245-5300",
    phoneHref: "tel:+19722455300",
  },
  {
    city: "Houston",
    area: "The Woodlands",
    address: "594 Sawdust Rd, Suite 139, The Woodlands, TX 77380",
    phone: "281-350-2323",
    phoneHref: "tel:+12813502323",
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
      "Foodservice for public agencies and civic facilities — built to code, budget, and public accountability.",
  },
  corporate: {
    label: "Corporate",
    blurb:
      "Employee cafés and executive dining that make the workplace a destination.",
  },
  "health-care": {
    label: "Health Care",
    blurb:
      "Patient-first foodservice and staff dining that meet demanding clinical standards.",
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
    label: "Universities",
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
      "Grocery, market, and grab-and-go foodservice designed for throughput and freshness.",
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

export const NAV = [
  { label: "Who We Are", href: "/about" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Capabilities", href: "/capabilities" },
  { label: "Team", href: "/team" },
  { label: "News", href: "/news" },
  { label: "Contact", href: "/contact" },
];
