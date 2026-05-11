export interface Area {
  slug: string;
  name: string;
  blurb: string;
  detail: string;
}

export const AREAS: Area[] = [
  {
    slug: "central-london",
    name: "Central London",
    blurb:
      "Same-day removals and waste collection across Zones 1 and 2, from Westminster to Shoreditch.",
    detail:
      "Our Luton van with tail lift is well suited to Central London moves: flats, mews houses and offices in Westminster, Camden, Islington, Hackney, Kensington and Chelsea. We work around congestion charge and ULEZ rules and handle parking permits on request.",
  },
  {
    slug: "greater-london",
    name: "Greater London",
    blurb:
      "Reliable removals and recycling collections across all 32 London boroughs.",
    detail:
      "From Croydon to Enfield, Hounslow to Bexley, we cover the full Greater London area for whole-house moves, single-item deliveries, waste removal and recycling. Fully insured with a Waste Carrier Licence, every collection is disposed of responsibly.",
  },
  {
    slug: "m25-corridor",
    name: "M25 Corridor",
    blurb:
      "Quick service for towns inside and just outside the M25, including Watford, Romford, Bromley and Kingston.",
    detail:
      "We operate daily inside the M25 and to surrounding towns including Watford, St Albans, Romford, Dartford, Bromley, Sutton and Kingston upon Thames. Punctual arrival, friendly team and full insurance cover on every job.",
  },
  {
    slug: "uk-long-distance",
    name: "UK Long Distance",
    blurb:
      "Whole-house moves and deliveries from London to anywhere in the United Kingdom.",
    detail:
      "Moving out of London? We handle long-distance removals across England, Wales and Scotland. Items are fully insured up to £10,000 in transit, and we plan routes to deliver on time, even on tight completion-day schedules.",
  },
];
