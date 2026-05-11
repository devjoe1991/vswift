export interface FAQItem {
  q: string;
  a: string;
}

export interface FAQGroup {
  topic: string;
  items: FAQItem[];
}

export const FAQ_GROUPS: FAQGroup[] = [
  {
    topic: "General",
    items: [
      {
        q: "What areas do you cover?",
        a: "We're based in London and cover the M25 corridor and Greater London for day-to-day work, plus long-distance moves anywhere in the UK.",
      },
      {
        q: "Are you available outside of normal working hours?",
        a: "Yes. We operate 24 hours a day, 365 days a year. Emergency and out-of-hours removals or collections can be arranged with prior notice.",
      },
      {
        q: "How do I get a quote?",
        a: "The fastest way is to message us on WhatsApp with a quick description of the job, the addresses involved and any time constraints. We usually reply within minutes during the day.",
      },
    ],
  },
  {
    topic: "Removals",
    items: [
      {
        q: "What size vehicle do you use?",
        a: "We run a Luton van with a tail lift, which suits everything from a single item up to a full house move. The tail lift makes loading heavy or awkward items significantly safer.",
      },
      {
        q: "Do you help with packing and loading?",
        a: "Yes. Our team handles all loading and unloading. We can also help with disassembly and reassembly of furniture on request.",
      },
      {
        q: "Can you do a same-day or short-notice move?",
        a: "Often yes, depending on availability. Send us a WhatsApp message with the details and we'll let you know straight away.",
      },
    ],
  },
  {
    topic: "Waste & Recycling",
    items: [
      {
        q: "What types of waste can you collect?",
        a: "Household and commercial waste, cardboard, paper, plastic, green waste, confidential documents and general rubbish. We dispose of everything responsibly at licensed facilities.",
      },
      {
        q: "Do you offer confidential waste disposal?",
        a: "Yes. Sensitive documents and materials are handled with complete discretion and securely destroyed.",
      },
      {
        q: "Do you recycle materials you collect?",
        a: "Wherever possible, yes. Cardboard, paper, plastic and green waste are sent to recycling facilities rather than landfill.",
      },
    ],
  },
  {
    topic: "Insurance & Licensing",
    items: [
      {
        q: "Are you insured?",
        a: "Yes. We carry Goods In Transit cover up to £10,000 and Public Liability Insurance up to £2,000,000.",
      },
      {
        q: "Do you hold a Waste Carrier Licence?",
        a: "Yes. We are a fully licensed Waste Carrier and all collected waste is documented and disposed of in line with regulations.",
      },
      {
        q: "Is your business registered?",
        a: "Yes. VSWIFT LOGISTICS LTD is a UK-registered company, company number 14555005.",
      },
    ],
  },
  {
    topic: "Booking & Coverage",
    items: [
      {
        q: "What is the best way to book?",
        a: "WhatsApp is fastest. You can also tap the Call button in the menu or email sales@vswift.uk.",
      },
      {
        q: "Do you travel outside London?",
        a: "Yes. Long-distance moves across England, Wales and Scotland are part of what we do.",
      },
      {
        q: "Do you charge for quotes?",
        a: "No. Quotes are free. Give us the details and we'll give you a price.",
      },
    ],
  },
];
