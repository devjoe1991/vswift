import LiquidCard from "@/components/ui/LiquidCard";
import type { ServiceData } from "@/data/services";

interface ServicesGridProps {
  services: ServiceData[];
  heading?: string;
  subheading?: string;
  id?: string;
}

export default function ServicesGrid({
  services,
  heading,
  subheading,
  id,
}: ServicesGridProps) {
  return (
    <section id={id} className="py-12 md:py-16 px-4 bg-[#fafafa]">
      <div className="max-w-7xl mx-auto">
        {(heading || subheading) && (
          <div className="text-center mb-10">
            {heading && (
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1e3a5f] mb-3">
                {heading}
              </h2>
            )}
            {subheading && (
              <p className="text-[#1e3a5f]/80 max-w-2xl mx-auto">{subheading}</p>
            )}
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {services.map((service, i) => (
            <LiquidCard
              key={service.id}
              service={service}
              index={i}
              widthClass="w-full"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
