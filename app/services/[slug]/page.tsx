import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { serviceSchema } from "@/lib/schema";
import JsonLd from "@/components/ui/JsonLd";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import MidPageCTA from "@/components/layout/MidPageCTA";
import CTAButton from "@/components/ui/CTAButton";
import ServiceCarousel from "@/components/sections/ServiceCarousel";
import { services } from "@/data/services";
import { BUSINESS } from "@/data/business";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.id }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.id === slug);
  if (!service) return {};
  return buildMetadata({
    title: `${service.title} in London and across the UK`,
    description: service.description,
    path: `/services/${service.id}`,
  });
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = services.find((s) => s.id === slug);
  if (!service) return notFound();

  const curatedIds = service.related ?? [];
  const curated = curatedIds
    .map((id) => services.find((s) => s.id === id))
    .filter(Boolean) as typeof services;
  const rest = services.filter(
    (s) => s.id !== service.id && !curatedIds.includes(s.id)
  );
  const related = [...curated, ...rest];

  return (
    <>
      <JsonLd data={serviceSchema(service)} />
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: service.shortTitle ?? service.title, path: `/services/${service.id}` },
        ]}
      />

      <article className="max-w-3xl mx-auto px-4 pt-8 pb-12">
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-[#1e3a5f] mb-4">
          {service.title}
        </h1>
        <p className="text-lg text-[#1e3a5f]/80 mb-8 leading-relaxed">
          {service.description}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 mb-12">
          <CTAButton intent="whatsapp" variant="primary" size="lg" />
          <CTAButton intent="call" variant="outline" size="lg" label="Call Us" />
        </div>

        <div className="prose max-w-none">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#1e3a5f] mb-4">
            What's included
          </h2>
          <p className="text-gray-700 leading-relaxed">{service.details}</p>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 p-6 bg-white border border-gray-200 rounded-lg">
          <div>
            <p className="text-xs uppercase tracking-wide text-[#1e3a5f]/60 mb-1">
              Insurance
            </p>
            <p className="text-sm text-[#1e3a5f]">
              Goods In Transit up to {BUSINESS.insurance.goodsInTransit}
            </p>
            <p className="text-sm text-[#1e3a5f]">
              Public Liability up to {BUSINESS.insurance.publicLiability}
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-[#1e3a5f]/60 mb-1">
              Licensing
            </p>
            <p className="text-sm text-[#1e3a5f]">
              {BUSINESS.licence.name} holder
            </p>
            <p className="text-sm text-[#1e3a5f]">
              Company no. {BUSINESS.registrationNo}
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-[#1e3a5f]/60 mb-1">
              Coverage
            </p>
            <p className="text-sm text-[#1e3a5f]">{BUSINESS.coverage.primary}</p>
            <p className="text-sm text-[#1e3a5f]">{BUSINESS.coverage.extended}</p>
          </div>
        </div>
      </article>

      <MidPageCTA
        heading={`Need ${service.title.toLowerCase()}?`}
        subheading="Send us the details on WhatsApp for a fast, free quote."
      />

      <ServiceCarousel
        services={related}
        heading="More services"
        subheading="Swipe through the rest of what we offer."
      />
      <div className="text-center pb-12 -mt-4 bg-[#fafafa]">
        <Link
          href="/services"
          className="inline-block text-[#87CEEB] hover:text-[#6BB6D6] font-semibold"
        >
          View all services →
        </Link>
      </div>
    </>
  );
}
