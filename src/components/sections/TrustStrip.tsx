import { BUSINESS } from "@/data/business";

interface TrustItem {
  label: string;
  value: string;
}

export default function TrustStrip() {
  const items: TrustItem[] = [
    { label: "Goods In Transit", value: `up to ${BUSINESS.insurance.goodsInTransit}` },
    { label: "Public Liability", value: `up to ${BUSINESS.insurance.publicLiability}` },
    { label: "Licence", value: BUSINESS.licence.name },
    { label: "Availability", value: "24/7, 365 days" },
    { label: "Company no.", value: BUSINESS.registrationNo },
  ];

  return (
    <section
      aria-label="Trust signals"
      className="bg-white border-y border-gray-200"
    >
      <div className="max-w-7xl mx-auto px-4 py-5 sm:py-6">
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-6 text-center">
          {items.map((item) => (
            <li key={item.label}>
              <p className="text-[10px] sm:text-xs uppercase tracking-wide text-[#1e3a5f]/60 mb-1">
                {item.label}
              </p>
              <p className="text-sm sm:text-base font-semibold text-[#1e3a5f]">
                {item.value}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
