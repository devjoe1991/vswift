import Link from "next/link";
import { USE_CASES } from "@/data/use-cases";

export default function UseCases() {
  return (
    <section className="bg-[#fafafa] py-12 md:py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <p className="text-xs uppercase tracking-wide text-[#87CEEB] font-semibold mb-2">
            What can we help with?
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1e3a5f] leading-tight max-w-2xl">
            Whatever you need moved, cleared or recycled
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {USE_CASES.map((u) => (
            <Link
              key={u.href}
              href={u.href}
              className="group block p-5 bg-white border border-gray-200 rounded-lg hover:border-[#87CEEB] hover:shadow-md transition-all"
            >
              <h3 className="font-serif text-lg font-semibold text-[#1e3a5f] mb-2">
                {u.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-3">
                {u.blurb}
              </p>
              <span className="text-sm text-[#87CEEB] group-hover:text-[#6BB6D6] font-medium">
                See details →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
