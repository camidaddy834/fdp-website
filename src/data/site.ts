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
    phone: "972-245-5300",
    phoneHref: "tel:+19722455300",
  },
  {
    city: "Houston",
    area: "The Woodlands",
    phone: "281-350-2323",
    phoneHref: "tel:+12813502323",
  },
] as const;

type Vertical = (typeof VERTICALS)[number];

export const VERTICAL_META: Record<
  Vertical,
  { label: string; blurb: string }
> = {
  "higher-education": {
    label: "Higher Education",
    blurb:
      "Dining halls, retail venues, and teaching kitchens that keep pace with campus life.",
  },
  corporate: {
    label: "Corporate",
    blurb:
      "Employee cafés and executive dining that make the workplace a destination.",
  },
  casinos: {
    label: "Casinos",
    blurb:
      "High-volume gaming-floor kitchens and signature restaurants built for throughput.",
  },
  culinary: {
    label: "Culinary",
    blurb:
      "Restaurants, central kitchens, and specialty concepts designed around the menu.",
  },
  healthcare: {
    label: "Healthcare",
    blurb:
      "Patient-first foodservice and staff dining that meet demanding clinical standards.",
  },
  "k-12": {
    label: "K-12",
    blurb:
      "Efficient serving lines and scratch kitchens that feed schools at scale.",
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
