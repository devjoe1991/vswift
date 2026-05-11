import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import QuoteBuilder from "@/components/sections/QuoteBuilder";
import MidPageCTA from "@/components/layout/MidPageCTA";
import { BUSINESS } from "@/data/business";

export const metadata: Metadata = buildMetadata({
  title: "Get a Free Quote in Minutes",
  description:
    "Send vSwift Logistics your trip details and we'll WhatsApp you a price. Removals, deliveries, waste collection and recycling across London and the M25.",
  path: "/quote",
});

export default function QuotePage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Get a Quote", path: "/quote" },
        ]}
      />

      <section className="relative bg-gradient-to-b from-[#1e3a5f] to-[#152944] text-white overflow-hidden">
        <MapHeroBackdrop />
        <div className="relative max-w-5xl mx-auto px-4 pt-12 pb-16 md:pt-16 md:pb-20 text-center">
          <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#87CEEB] font-semibold mb-3">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="6" cy="19" r="2" />
              <circle cx="18" cy="5" r="2" />
              <path d="M8 19h6a4 4 0 0 0 0-8h-4a4 4 0 0 1 0-8h6" />
            </svg>
            Route planner
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-3">
            Plan your trip, get a price
          </h1>
          <p className="text-white/80 max-w-xl mx-auto text-base sm:text-lg">
            Drop in your pickup and destination, pick a date and we'll WhatsApp
            a quote straight back. Covering {BUSINESS.coverage.summary}.
          </p>

          {/* Mini route preview */}
          <div className="mt-8 inline-flex items-center gap-3 text-sm text-white/80 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full pl-3 pr-4 py-2">
            <PinSmall colour="#87CEEB" />
            <span className="font-medium text-white">Pickup</span>
            <span
              aria-hidden="true"
              className="w-10 h-px"
              style={{
                background:
                  "repeating-linear-gradient(to right, rgba(255,255,255,0.6) 0 4px, transparent 4px 8px)",
              }}
            />
            <PinSmall colour="white" />
            <span className="font-medium text-white">Destination</span>
          </div>
        </div>
      </section>

      <QuoteBuilder
        background="map"
        heading="Where are we taking it?"
        subheading="Fill in the route and timing below."
      />

      <MidPageCTA
        heading="Prefer to message us directly?"
        subheading="Skip the form and just message us on WhatsApp. We'll ask the questions there."
      />
    </>
  );
}

function PinSmall({ colour }: { colour: string }) {
  return (
    <svg
      width="14"
      height="18"
      viewBox="0 0 24 32"
      aria-hidden="true"
    >
      <path
        d="M12 0C5.4 0 0 5.4 0 12c0 9 12 20 12 20s12-11 12-20C24 5.4 18.6 0 12 0z"
        fill={colour}
      />
      <circle cx="12" cy="12" r="4" fill="#1e3a5f" />
    </svg>
  );
}

function MapHeroBackdrop() {
  return (
    <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="quote-hero-grid"
            width="64"
            height="64"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 64 0 L 0 0 0 64"
              fill="none"
              stroke="#87CEEB"
              strokeOpacity="0.18"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#quote-hero-grid)" />
        {/* Decorative roads */}
        <path
          d="M-50 120 Q 300 90 600 200 T 1500 160"
          stroke="#87CEEB"
          strokeOpacity="0.18"
          strokeWidth="20"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M-50 320 Q 500 280 900 400 T 1700 360"
          stroke="#87CEEB"
          strokeOpacity="0.12"
          strokeWidth="14"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M300 -50 Q 380 200 460 400 T 600 900"
          stroke="#87CEEB"
          strokeOpacity="0.1"
          strokeWidth="10"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
