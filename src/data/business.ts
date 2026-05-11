import { services } from "./services";

export const BUSINESS = {
  name: "vSwift Logistics",
  legalName: "VSWIFT LOGISTICS LTD",
  registrationNo: "14555005",
  shortDescription:
    "Removals, waste disposal and recycling across London and the UK. Fully insured.",
  longDescription:
    "vSwift Logistics offers professional, reliable and swift removals for all of our clients. We also provide comprehensive waste disposal and recycling services.",

  phoneDisplay: "+44 (0) 7487 263317",
  phoneE164: "+447487263317",
  whatsAppNumber: "447487263317",
  whatsAppUrl: "https://wa.me/447487263317",
  email: "sales@vswift.uk",

  address: {
    locality: "London",
    region: "Greater London",
    country: "GB",
    countryName: "United Kingdom",
  },
  geo: {
    latitude: 51.5074,
    longitude: -0.1278,
  },

  hours: {
    summary: "24 Hours a Day, 365 Days a Year",
    structured: "Mo-Su 00:00-23:59",
  },

  coverage: {
    summary: "M25 and across the UK",
    primary: "M25 corridor and Greater London",
    extended: "UK-wide long distance",
  },

  insurance: {
    goodsInTransit: "£10,000",
    publicLiability: "£2,000,000",
    summary:
      "Goods In Transit cover up to £10,000 and Public Liability Insurance up to £2,000,000.",
  },

  licence: {
    summary:
      "Fully licensed Waste Carrier Licence holder. All belongings are safely transported and fully insured.",
    name: "Waste Carrier Licence",
  },

  priceRange: "££",
  locale: "en-GB",
  ogLocale: "en_GB",
} as const;

export const SOCIAL_LINKS: { label: string; href: string }[] = [];

export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Services",
    href: "/services",
    children: services.map((s) => ({
      label: s.title,
      href: `/services/${s.id}`,
    })),
  },
  { label: "Get a Quote", href: "/quote" },
  { label: "Areas Served", href: "/areas-served" },
  { label: "FAQs", href: "/faqs" },
  { label: "Contact", href: "/contact" },
];

export const FOOTER_LINK_GROUPS = {
  company: [
    { label: "About", href: "/about" },
    { label: "Get a Quote", href: "/quote" },
    { label: "Areas Served", href: "/areas-served" },
    { label: "FAQs", href: "/faqs" },
    { label: "Contact", href: "/contact" },
  ],
  services: [
    { label: "All Services", href: "/services" },
    { label: "Removals", href: "/services/removals" },
    { label: "Waste Collection", href: "/services/waste-collection" },
    { label: "Recycling Services", href: "/services/recycling" },
    { label: "Deliveries", href: "/services/deliveries" },
  ],
};
