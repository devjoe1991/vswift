import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import ServicesGrid from "@/components/sections/ServicesGrid";
import MidPageCTA from "@/components/layout/MidPageCTA";
import { services } from "@/data/services";
import { BUSINESS } from "@/data/business";

export const metadata: Metadata = buildMetadata({
  title: "Removals, Waste Disposal & Recycling Services",
  description: `Full list of ${BUSINESS.name} services: removals, deliveries, waste collection, confidential waste, and recycling across London and the UK. Fully insured.`,
  path: "/services",
});

export default function ServicesIndexPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ]}
      />
      <section className="max-w-7xl mx-auto px-4 pt-8 pb-4">
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-[#1e3a5f] mb-3">
          Our Services
        </h1>
        <p className="text-[#1e3a5f]/80 max-w-2xl">
          Professional removals and waste disposal across {BUSINESS.coverage.summary}. {BUSINESS.insurance.summary}
        </p>
      </section>
      <ServicesGrid services={services} />
      <MidPageCTA />
    </>
  );
}
