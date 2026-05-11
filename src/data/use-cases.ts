export interface UseCase {
  title: string;
  blurb: string;
  href: string;
}

export const USE_CASES: UseCase[] = [
  {
    title: "Moving house",
    blurb: "Whole-house moves in London or long-distance. Luton van with tail lift, fully insured.",
    href: "/services/removals",
  },
  {
    title: "Clearing an office",
    blurb: "End-of-lease clearouts, confidential paperwork shredding and recycling in one run.",
    href: "/services/confidential-waste",
  },
  {
    title: "Tip run today",
    blurb: "Same-day rubbish and bulky-item collection. Waste Carrier Licence, licensed disposal.",
    href: "/services/rubbish-tips",
  },
  {
    title: "Garden clearance",
    blurb: "Garden waste, soil, branches and organic material taken away responsibly.",
    href: "/services/green-waste",
  },
];
