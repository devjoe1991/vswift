import CTAButton from "@/components/ui/CTAButton";

interface MidPageCTAProps {
  heading?: string;
  subheading?: string;
}

export default function MidPageCTA({
  heading = "Ready to get started?",
  subheading = "Message us on WhatsApp for a fast, free quote. We usually reply within minutes.",
}: MidPageCTAProps) {
  return (
    <section className="bg-[#87CEEB] text-white py-12 md:py-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-serif text-3xl md:text-4xl font-bold mb-3">
          {heading}
        </h2>
        <p className="text-white/90 mb-6 max-w-2xl mx-auto">{subheading}</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <CTAButton intent="whatsapp" variant="primary" size="lg" />
          <CTAButton intent="call" variant="ghost" size="lg" label="Call Us" />
        </div>
        <p className="text-xs text-white/80 mt-4">
          Fully insured · Waste Carrier Licence · 24/7 service
        </p>
      </div>
    </section>
  );
}
