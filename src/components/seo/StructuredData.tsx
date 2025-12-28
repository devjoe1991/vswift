import { services } from "@/data/services";

export default function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "MovingCompany",
    name: "vSwift Logistics",
    description: "Professional, swift and reliable removals and waste disposal services. Fully insured with Goods In Transit cover up to £10,000 and Public Liability Insurance up to £2,000,000.",
    url: "https://vswift-logistics.netlify.app",
    logo: "https://vswift-logistics.netlify.app/mainlogo.png",
    address: {
      "@type": "PostalAddress",
      addressLocality: "London",
      addressCountry: "GB",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+44-123-456-7890",
      contactType: "Customer Service",
      email: "info@vswift-logistics.co.uk",
      areaServed: "GB",
      availableLanguage: "en",
    },
    priceRange: "££",
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
    sameAs: [
      // Add social media links when available
    ],
  };

  const serviceSchemas = services.map((service) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.title,
    description: service.description,
    provider: {
      "@type": "MovingCompany",
      name: "vSwift Logistics",
    },
    areaServed: {
      "@type": "Country",
      name: "United Kingdom",
    },
  }));

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "vSwift Logistics",
    url: "https://vswift-logistics.netlify.app",
    description: "Professional Removals & Waste Disposal Services",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://vswift-logistics.netlify.app/?s={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      {serviceSchemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}

