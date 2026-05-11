import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import MidPageCTA from "@/components/layout/MidPageCTA";
import { AREAS } from "@/data/areas";
import { BUSINESS } from "@/data/business";

export const metadata: Metadata = buildMetadata({
  title: "Areas We Serve in London and the UK",
  description: `${BUSINESS.name} covers Central London, Greater London, the M25 corridor and long-distance UK removals.`,
  path: "/areas-served",
});

export default function AreasServedPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Areas Served", path: "/areas-served" },
        ]}
      />

      <section className="max-w-7xl mx-auto px-4 pt-8 pb-12">
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-[#1e3a5f] mb-4">
          Areas We Serve
        </h1>
        <p className="text-lg text-[#1e3a5f]/80 max-w-2xl mb-10">
          {BUSINESS.name} operates across {BUSINESS.coverage.summary}. Day-to-day work centres on London and the M25, with long-distance removals to anywhere in the UK on request.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {AREAS.map((area) => (
            <section
              key={area.slug}
              className="p-6 bg-white border border-gray-200 rounded-lg"
            >
              <h2 className="font-serif text-2xl font-semibold text-[#1e3a5f] mb-2">
                {area.name}
              </h2>
              <p className="text-[#87CEEB] font-medium mb-3 text-sm">
                {area.blurb}
              </p>
              <p className="text-sm text-gray-700 leading-relaxed">
                {area.detail}
              </p>
            </section>
          ))}
        </div>
      </section>

      <MidPageCTA heading="Need a quote for your area?" />
    </>
  );
}
