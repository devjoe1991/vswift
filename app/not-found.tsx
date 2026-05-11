import type { Metadata } from "next";
import Link from "next/link";
import CTAButton from "@/components/ui/CTAButton";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Page Not Found",
  description: "The page you're looking for has moved or doesn't exist.",
  path: "/404",
  noIndex: true,
});

export default function NotFound() {
  return (
    <section className="min-h-[60vh] flex items-center justify-center px-4 py-16 bg-[#fafafa]">
      <div className="max-w-2xl text-center">
        <p className="text-[#87CEEB] font-semibold tracking-wide mb-4">404</p>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-[#1e3a5f] mb-4">
          Page not found
        </h1>
        <p className="text-[#1e3a5f]/80 mb-8">
          The page you're looking for has moved or doesn't exist. Try one of the links below or message us on WhatsApp.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
          <Link
            href="/"
            className="px-6 py-2.5 border-2 border-[#87CEEB] text-[#1e3a5f] hover:bg-[#87CEEB] hover:text-white transition-colors rounded-sm font-semibold"
          >
            Back to Home
          </Link>
          <Link
            href="/services"
            className="px-6 py-2.5 bg-[#87CEEB] text-white hover:bg-[#6BB6D6] transition-colors rounded-sm font-semibold"
          >
            See All Services
          </Link>
          <CTAButton intent="whatsapp" variant="primary" size="md" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
          {[
            { label: "Removals", href: "/services/removals" },
            { label: "Waste Collection", href: "/services/waste-collection" },
            { label: "Recycling", href: "/services/recycling" },
            { label: "Deliveries", href: "/services/deliveries" },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="block py-2 px-3 bg-white border border-gray-200 rounded-md text-[#1e3a5f] hover:border-[#87CEEB] transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
