import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import CTAButton from "@/components/ui/CTAButton";
import { BUSINESS } from "@/data/business";

export const metadata: Metadata = buildMetadata({
  title: "Contact Us",
  description: `Get in touch with ${BUSINESS.name} for removals, deliveries, waste collection and recycling. WhatsApp, phone or email, 24/7.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ]}
      />

      <section className="max-w-3xl mx-auto px-4 pt-8 pb-16">
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-[#1e3a5f] mb-4">
          Contact {BUSINESS.name}
        </h1>
        <p className="text-lg text-[#1e3a5f]/80 mb-8">
          The fastest way to reach us is WhatsApp. We usually reply within minutes during the day, and we're available 24/7 for urgent jobs.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 mb-12">
          <CTAButton intent="whatsapp" variant="primary" size="lg" />
          <CTAButton intent="call" variant="outline" size="lg" label="Call Us" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <ContactBlock label="WhatsApp">
            <a
              href={BUSINESS.whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1e3a5f] hover:text-[#87CEEB] font-medium"
            >
              Open chat
            </a>
          </ContactBlock>

          <ContactBlock label="Phone">
            <a
              href={`tel:${BUSINESS.phoneE164}`}
              className="text-[#1e3a5f] hover:text-[#87CEEB] font-medium"
            >
              Tap to call
            </a>
          </ContactBlock>

          <ContactBlock label="Email">
            <a
              href={`mailto:${BUSINESS.email}`}
              className="text-[#1e3a5f] hover:text-[#87CEEB] font-medium"
            >
              {BUSINESS.email}
            </a>
          </ContactBlock>

          <ContactBlock label="Hours">
            <p className="text-[#1e3a5f]">{BUSINESS.hours.summary}</p>
          </ContactBlock>

          <ContactBlock label="Based in">
            <p className="text-[#1e3a5f]">
              {BUSINESS.address.locality}, {BUSINESS.address.countryName}
            </p>
          </ContactBlock>

          <ContactBlock label="Coverage">
            <p className="text-[#1e3a5f]">{BUSINESS.coverage.summary}</p>
          </ContactBlock>
        </div>

        <div className="mt-10 p-6 bg-white border border-gray-200 rounded-lg">
          <h2 className="font-serif text-xl font-semibold text-[#1e3a5f] mb-3">
            What to send us
          </h2>
          <ul className="list-disc pl-5 text-sm text-[#1e3a5f]/80 space-y-1">
            <li>Pickup and drop-off addresses (or postcodes)</li>
            <li>Rough idea of items or volume (e.g. 1-bed flat, full van, single sofa)</li>
            <li>Date and any time constraints</li>
            <li>Anything heavy, fragile or awkward we should know about</li>
          </ul>
        </div>
      </section>
    </>
  );
}

function ContactBlock({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="p-5 bg-white border border-gray-200 rounded-lg">
      <p className="text-xs uppercase tracking-wide text-[#1e3a5f]/60 mb-2">
        {label}
      </p>
      {children}
    </div>
  );
}
