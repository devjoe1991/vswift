import Link from "next/link";
import { AREAS } from "@/data/areas";

export default function AreasStrip() {
  return (
    <section className="bg-[#fafafa] py-12 md:py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-8">
          <div>
            <p className="text-xs uppercase tracking-wide text-[#87CEEB] font-semibold mb-2">
              Where we work
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1e3a5f] leading-tight">
              London and beyond the M25
            </h2>
          </div>
          <Link
            href="/areas-served"
            className="text-[#87CEEB] hover:text-[#6BB6D6] font-medium text-sm sm:text-base"
          >
            See full coverage →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {AREAS.map((area) => (
            <Link
              key={area.slug}
              href="/areas-served"
              className="group block p-5 bg-white border border-gray-200 rounded-lg hover:border-[#87CEEB] hover:shadow-md transition-all"
            >
              <h3 className="font-serif text-lg font-semibold text-[#1e3a5f] mb-2 group-hover:text-[#6BB6D6] transition-colors">
                {area.name}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {area.blurb}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
