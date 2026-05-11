import type { Metadata } from "next";
import Link from "next/link";
import Hero from "@/components/sections/Hero";
import TrustStrip from "@/components/sections/TrustStrip";
import ServicesGrid from "@/components/sections/ServicesGrid";
import UseCases from "@/components/sections/UseCases";
import HowItWorks from "@/components/sections/HowItWorks";
import About from "@/components/sections/About";
import TwoUpSplit from "@/components/sections/TwoUpSplit";
import AreasStrip from "@/components/sections/AreasStrip";
import CoverageMap from "@/components/sections/CoverageMap";
import HomeFAQ from "@/components/sections/HomeFAQ";
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
      <TrustStrip />
      <ServicesGrid
        services={featured}
        heading="What we do"
        subheading="Removals, deliveries, waste collection and recycling. One team, fully insured."
      />
      <div className="text-center pb-12 -mt-4 bg-[#fafafa]">
        <Link
          href="/services"
          className="inline-block text-[#87CEEB] hover:text-[#6BB6D6] font-semibold"
        >
          View all 11 services →
        </Link>
      </div>
      <UseCases />
      <HowItWorks />
      <TwoUpSplit />
      <About />
      <AreasStrip />
      <CoverageMap />
      <HomeFAQ />
      <MidPageCTA />
    </>
  );
}
