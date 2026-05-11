import { BUSINESS } from "@/data/business";

interface TrustItem {
  label: string;
  value: string;
  icon: "shield" | "umbrella" | "badge" | "clock" | "doc";
}

export default function TrustStrip() {
  const items: TrustItem[] = [
    { label: "Goods In Transit", value: `up to ${BUSINESS.insurance.goodsInTransit}`, icon: "shield" },
    { label: "Public Liability", value: `up to ${BUSINESS.insurance.publicLiability}`, icon: "umbrella" },
    { label: "Licence", value: BUSINESS.licence.name, icon: "badge" },
    { label: "Availability", value: "24/7, 365 days", icon: "clock" },
    { label: "Company no.", value: BUSINESS.registrationNo, icon: "doc" },
  ];

  return (
    <section
      aria-label="Trust signals"
      className="relative bg-gradient-to-b from-white to-[#fafafa] border-y border-gray-200 overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#87CEEB] to-transparent"
      />
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-10">
        <div className="text-center mb-6 md:mb-8">
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#87CEEB] font-semibold">
            Fully credentialed
          </p>
          <h2 className="font-serif text-xl sm:text-2xl text-[#1e3a5f] mt-1">
            Insured, licensed and accountable
          </h2>
        </div>

        <ul className="grid grid-cols-2 md:grid-cols-5 gap-3 sm:gap-4">
          {items.map((item) => (
            <li key={item.label}>
              <div className="group relative h-full p-4 sm:p-5 bg-white border border-gray-200 rounded-2xl shadow-sm hover:border-[#87CEEB] hover:shadow-md transition-all flex flex-col items-center text-center">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#87CEEB]/10 text-[#1e3a5f] flex items-center justify-center mb-3 group-hover:bg-[#87CEEB]/20 transition-colors">
                  <Icon name={item.icon} />
                </div>
                <p className="text-[10px] sm:text-xs uppercase tracking-wide text-[#1e3a5f]/60 mb-1">
                  {item.label}
                </p>
                <p className="font-serif text-base sm:text-lg font-semibold text-[#1e3a5f] leading-tight">
                  {item.value}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#87CEEB] to-transparent"
      />
    </section>
  );
}

function Icon({ name }: { name: TrustItem["icon"] }) {
  const common = {
    width: 20,
    height: 20,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  switch (name) {
    case "shield":
      return (
        <svg {...common}>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      );
    case "umbrella":
      return (
        <svg {...common}>
          <path d="M12 2v2" />
          <path d="M2 12a10 10 0 0 1 20 0" />
          <path d="M12 12v7a2 2 0 0 0 4 0" />
        </svg>
      );
    case "badge":
      return (
        <svg {...common}>
          <circle cx="12" cy="8" r="6" />
          <path d="M8.5 13l-2 8 5.5-3 5.5 3-2-8" />
        </svg>
      );
    case "clock":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      );
    case "doc":
      return (
        <svg {...common}>
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="9" y1="13" x2="15" y2="13" />
          <line x1="9" y1="17" x2="13" y2="17" />
        </svg>
      );
  }
}
