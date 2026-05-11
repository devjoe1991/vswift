import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import QuoteBuilder from "@/components/sections/QuoteBuilder";
import MidPageCTA from "@/components/layout/MidPageCTA";

export const metadata: Metadata = buildMetadata({
  title: "Get a Free Quote in Minutes",
  description:
    "Send vSwift Logistics your job details and we'll WhatsApp you a price. Removals, deliveries, waste collection and recycling across London and the M25.",
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
      <QuoteBuilder
        heading="Get a free quote in minutes"
        subheading="Send the job details on WhatsApp and we'll reply with a price. No call backs, no spam."
      />
      <MidPageCTA
        heading="Prefer to message us directly?"
        subheading="You can also skip the form and just message us on WhatsApp."
      />
    </>
  );
}
