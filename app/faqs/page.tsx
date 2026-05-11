import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { faqSchema } from "@/lib/schema";
import JsonLd from "@/components/ui/JsonLd";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import MidPageCTA from "@/components/layout/MidPageCTA";
import { FAQ_GROUPS } from "@/data/faqs";
import { BUSINESS } from "@/data/business";

export const metadata: Metadata = buildMetadata({
  title: "Frequently Asked Questions",
  description: `Answers about removals, waste collection, recycling, insurance and booking with ${BUSINESS.name}.`,
  path: "/faqs",
});

export default function FAQsPage() {
  return (
    <>
      <JsonLd data={faqSchema(FAQ_GROUPS)} />
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "FAQs", path: "/faqs" },
        ]}
      />

      <section className="max-w-3xl mx-auto px-4 pt-8 pb-12">
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-[#1e3a5f] mb-4">
          Frequently Asked Questions
        </h1>
        <p className="text-lg text-[#1e3a5f]/80 mb-10">
          Common questions about how we work. If your question isn't here, message us on WhatsApp.
        </p>

        <div className="space-y-12">
          {FAQ_GROUPS.map((group) => (
            <div key={group.topic}>
              <h2 className="font-serif text-2xl font-bold text-[#1e3a5f] mb-4">
                {group.topic}
              </h2>
              <div className="space-y-3">
                {group.items.map((item) => (
                  <details
                    key={item.q}
                    className="group bg-white border border-gray-200 rounded-lg p-5 [&_summary::-webkit-details-marker]:hidden"
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
            </div>
          ))}
        </div>
      </section>

      <MidPageCTA heading="Still have a question?" />
    </>
  );
}
