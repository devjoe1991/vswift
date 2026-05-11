import { BUSINESS } from "@/data/business";

export default function CoverageMap() {
  const bbox = "-0.5103,51.2868,0.3340,51.6918";
  const marker = `${BUSINESS.geo.latitude},${BUSINESS.geo.longitude}`;
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${marker}`;

  return (
    <section className="bg-[#fafafa] py-12 md:py-16 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-10 items-center">
        <div className="md:col-span-2">
          <p className="text-xs uppercase tracking-wide text-[#87CEEB] font-semibold mb-2">
            Our patch
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1e3a5f] leading-tight mb-3">
            Based in London, serving the M25 and beyond
          </h2>
          <p className="text-[#1e3a5f]/80 mb-4 leading-relaxed">
            Day-to-day we work across {BUSINESS.address.locality} and the M25 corridor. For long-distance moves we travel anywhere in the UK.
          </p>
          <ul className="space-y-1 text-sm text-[#1e3a5f]/80">
            <li>· North London base</li>
            <li>· Same-day inside the M25</li>
            <li>· UK-wide long distance on request</li>
          </ul>
        </div>
        <div className="md:col-span-3 rounded-lg overflow-hidden border border-gray-200 shadow-sm">
          <iframe
            src={src}
            title={`${BUSINESS.name} coverage map`}
            className="w-full h-64 sm:h-80 md:h-96"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
