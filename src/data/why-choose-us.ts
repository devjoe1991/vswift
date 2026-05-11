import { BUSINESS } from "./business";

export interface Feature {
  title: string;
  detail: string;
}

export const WHY_CHOOSE_US: Feature[] = [
  {
    title: "Fully Insured",
    detail: `Goods In Transit cover up to ${BUSINESS.insurance.goodsInTransit} and Public Liability Insurance up to ${BUSINESS.insurance.publicLiability}. Every job is covered.`,
  },
  {
    title: "Right Equipment",
    detail:
      "A fresh, fully functioning Luton Van with tail lift. Heavy and awkward items loaded safely, every time.",
  },
  {
    title: "Any Size Job",
    detail:
      "From a single item to whole house moves. We also hold a Waste Carrier Licence so we can clear refuse and recycling alongside removals.",
  },
  {
    title: "On Time",
    detail:
      "We arrive early, work efficiently and keep you informed. Punctuality is part of the service, not an extra.",
  },
];
