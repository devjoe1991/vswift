import { BUSINESS, SOCIAL_LINKS } from "@/data/business";
import type { ServiceData } from "@/data/services";
import type { FAQGroup } from "@/data/faqs";
import { SITE_URL } from "./seo";

export function movingCompanySchema() {
  return {
    "@context": "https://schema.org",
    "@type": "MovingCompany",
    name: BUSINESS.name,
    legalName: BUSINESS.legalName,
    description: BUSINESS.longDescription,
    url: SITE_URL,
    logo: `${SITE_URL}/mainlogo.png`,
    image: `${SITE_URL}/mainlogo.png`,
    telephone: BUSINESS.phoneE164,
    email: BUSINESS.email,
    priceRange: BUSINESS.priceRange,
    address: {
      "@type": "PostalAddress",
      addressLocality: BUSINESS.address.locality,
      addressRegion: BUSINESS.address.region,
      addressCountry: BUSINESS.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: BUSINESS.geo.latitude,
      longitude: BUSINESS.geo.longitude,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "00:00",
        closes: "23:59",
      },
    ],
    areaServed: [
      { "@type": "City", name: "London" },
      { "@type": "Country", name: "United Kingdom" },
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: BUSINESS.phoneE164,
      email: BUSINESS.email,
      contactType: "Customer Service",
      areaServed: BUSINESS.address.country,
      availableLanguage: ["English"],
    },
    sameAs: SOCIAL_LINKS.map((s) => s.href),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: BUSINESS.name,
    url: SITE_URL,
    inLanguage: BUSINESS.ogLocale,
    publisher: {
      "@type": "Organization",
      name: BUSINESS.name,
      logo: `${SITE_URL}/mainlogo.png`,
    },
  };
}

export interface Crumb {
  name: string;
  path: string;
}

export function breadcrumbSchema(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${SITE_URL}${c.path === "/" ? "" : c.path}`,
    })),
  };
}

export function serviceSchema(service: ServiceData) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    serviceType: service.title,
    description: service.details,
    url: `${SITE_URL}/services/${service.id}`,
    provider: {
      "@type": "MovingCompany",
      name: BUSINESS.name,
      url: SITE_URL,
      telephone: BUSINESS.phoneE164,
      address: {
        "@type": "PostalAddress",
        addressLocality: BUSINESS.address.locality,
        addressRegion: BUSINESS.address.region,
        addressCountry: BUSINESS.address.country,
      },
    },
    areaServed: [
      { "@type": "City", name: "London" },
      { "@type": "Country", name: "United Kingdom" },
    ],
  };
}

export function faqSchema(groups: FAQGroup[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: groups.flatMap((g) =>
      g.items.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.a,
        },
      }))
    ),
  };
}
