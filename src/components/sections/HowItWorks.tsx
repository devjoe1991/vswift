import CTAButton from "@/components/ui/CTAButton";
import { HOW_IT_WORKS } from "@/data/how-it-works";

export default function HowItWorks() {
  return (
    <section className="bg-white py-12 md:py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 md:mb-12">
          <p className="text-xs uppercase tracking-wide text-[#87CEEB] font-semibold mb-2">
            How it works
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1e3a5f] leading-tight">
            Booked in three steps
          </h2>
          <p className="text-[#1e3a5f]/70 mt-3 max-w-xl mx-auto">
            No call centres, no chasing for quotes. Message us and we get back to you with a price.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {HOW_IT_WORKS.map((step) => (
            <div
              key={step.number}
              className="relative bg-[#fafafa] border border-gray-200 rounded-lg p-6"
            >
              <div className="font-serif text-5xl font-bold text-[#87CEEB]/40 mb-3 leading-none">
                {step.number}
              </div>
              <h3 className="font-serif text-xl font-semibold text-[#1e3a5f] mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {step.detail}
              </p>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <CTAButton intent="whatsapp" variant="primary" size="lg" />
        </div>
      </div>
    </section>
  );
}
