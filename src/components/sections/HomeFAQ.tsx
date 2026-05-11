import Link from "next/link";
import JsonLd from "@/components/ui/JsonLd";
import { faqSchema } from "@/lib/schema";
import { FAQ_GROUPS } from "@/data/faqs";

export default function HomeFAQ() {
  const teasers = [
    FAQ_GROUPS[0].items[2],
    FAQ_GROUPS[1].items[2],
    FAQ_GROUPS[2].items[0],
    FAQ_GROUPS[3].items[0],
  ].filter(Boolean);

  return (
    <section className="bg-white py-12 md:py-20 px-4">
      <JsonLd
        data={faqSchema([
          {
            topic: "Home",
            items: teasers,
          },
        ])}
      />
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <p className="text-xs uppercase tracking-wide text-[#87CEEB] font-semibold mb-2">
            Common questions
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1e3a5f] leading-tight">
            Quick answers
          </h2>
        </div>

        <div className="space-y-3">
          {teasers.map((item) => (
            <details
              key={item.q}
              className="group bg-[#fafafa] border border-gray-200 rounded-lg p-5 [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex justify-between items-center cursor-pointer font-medium text-[#1e3a5f]">
                <span>{item.q}</span>
                <span className="ml-4 text-[#87CEEB] transition-transform group-open:rotate-45 text-2xl leading-none">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm text-[#1e3a5f]/80 leading-relaxed">
                {item.a}
              </p>
            </details>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/faqs"
            className="inline-block text-[#87CEEB] hover:text-[#6BB6D6] font-semibold"
          >
            See all FAQs →
          </Link>
        </div>
      </div>
    </section>
  );
}
