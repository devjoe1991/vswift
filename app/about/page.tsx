import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import AboutContent from "@/components/sections/AboutContent";
import MidPageCTA from "@/components/layout/MidPageCTA";
import { BUSINESS } from "@/data/business";

export const metadata: Metadata = buildMetadata({
  title: "About Us",
  description: `${BUSINESS.name} is a fully insured London-based removals and waste disposal company serving the M25 corridor and the UK.`,
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ]}
      />
      <AboutContent />
      <MidPageCTA />
    </>
  );
}
