import type { Metadata } from "next";
import Link from "next/link";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import ServicesGrid from "@/components/sections/ServicesGrid";
import MidPageCTA from "@/components/layout/MidPageCTA";
import { services } from "@/data/services";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "London Removals, Waste Disposal & Recycling Services",
  description:
    "Fully insured London removals, deliveries, waste collection and recycling. Same-day and 24/7 service across the M25 corridor and the UK.",
  path: "/",
});

export default function Home() {
  const featured = services.filter((s) =>
    ["removals", "deliveries", "waste-collection", "recycling"].includes(s.id)
  );

  return (
    <>
      <Hero />
      <About />
      <ServicesGrid
        services={featured}
        heading="What We Do"
        subheading="Removals, deliveries, waste collection and recycling, all under one fully insured roof."
      />
      <div className="text-center pb-12 -mt-4">
        <Link
          href="/services"
          className="inline-block text-[#87CEEB] hover:text-[#6BB6D6] font-semibold"
        >
          View all 11 services →
        </Link>
      </div>
      <MidPageCTA />
    </>
  );
}
