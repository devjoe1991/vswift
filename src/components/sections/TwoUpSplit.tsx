import Link from "next/link";
import Image from "next/image";

interface Side {
  eyebrow: string;
  title: string;
  blurb: string;
  bullets: string[];
  href: string;
  ctaLabel: string;
  image: string;
  imageAlt: string;
}

const SIDES: Side[] = [
  {
    eyebrow: "Removals",
    title: "Moving anything, anywhere",
    blurb:
      "Whole-house moves, single items, office relocations and same-day deliveries. Our Luton van with tail lift makes heavy and awkward loads safe.",
    bullets: [
      "Whole-house and small moves",
      "Office and commercial relocations",
      "Single-item and same-day deliveries",
      "Long-distance moves across the UK",
    ],
    href: "/services/removals",
    ctaLabel: "Removals service",
    image: "/frontvan.png",
    imageAlt: "vSwift Logistics van for removals",
  },
  {
    eyebrow: "Waste & Recycling",
    title: "Cleared, sorted, recycled",
    blurb:
      "Waste Carrier Licence holder. We collect, sort and recycle responsibly, including confidential paperwork and bulky garden waste.",
    bullets: [
      "General and bulky waste collection",
      "Cardboard, paper and plastic recycling",
      "Confidential document disposal",
      "Garden and green waste clearance",
    ],
    href: "/services/waste-collection",
    ctaLabel: "Waste services",
    image: "/backvan.png",
    imageAlt: "vSwift Logistics van for waste collection",
  },
];

export default function TwoUpSplit() {
  return (
    <section className="bg-white py-12 md:py-20 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {SIDES.map((side) => (
          <article
            key={side.eyebrow}
            className="relative overflow-hidden rounded-lg border border-gray-200 bg-[#fafafa] flex flex-col"
          >
            <div className="relative aspect-[16/9] w-full">
              <Image
                src={side.image}
                alt={side.imageAlt}
                fill
                className="object-cover"
                quality={85}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1e3a5f]/30 via-transparent to-transparent" />
            </div>
            <div className="p-6 md:p-8 flex-1 flex flex-col">
              <p className="text-xs uppercase tracking-wide text-[#87CEEB] font-semibold mb-2">
                {side.eyebrow}
              </p>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1e3a5f] mb-3 leading-tight">
                {side.title}
              </h3>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4">
                {side.blurb}
              </p>
              <ul className="space-y-2 mb-6">
                {side.bullets.map((b) => (
                  <li
                    key={b}
                    className="text-sm text-[#1e3a5f]/80 flex items-start gap-2"
                  >
                    <span aria-hidden="true" className="text-[#87CEEB] mt-1">
                      ✓
                    </span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto">
                <Link
                  href={side.href}
                  className="inline-flex items-center gap-2 px-5 py-2.5 border-2 border-[#87CEEB] text-[#1e3a5f] hover:bg-[#87CEEB] hover:text-white transition-colors rounded-sm font-semibold text-sm sm:text-base"
                >
                  {side.ctaLabel} →
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
