export interface ServiceData {
  id: string;
  title: string;
  shortTitle?: string;
  description: string;
  details: string;
  price?: string;
  related?: string[];
}

export const services: ServiceData[] = [
  {
    id: "removals",
    title: "Removals",
    description:
      "Professional whole house moves and smaller removals. Fully insured with our Luton Van equipped with tail lift for easy loading.",
    details:
      "Professional removals service for whole house moves and smaller jobs. We own a fresh, fully functioning Luton Van with a tail lift which makes jobs that much easier. No job is too big or small for us. All belongings are safely transported and fully insured. We ensure punctual service, arrive early, and are always friendly and personable with our clients.",
    price: "Get a quote",
    related: ["deliveries", "waste-collection", "rubbish-tips"],
  },
  {
    id: "deliveries",
    title: "Deliveries",
    description:
      "Reliable delivery services for your items. Swift and professional delivery with full insurance coverage.",
    details:
      "Professional delivery services for items of all sizes. Our reliable Luton Van with tail lift ensures safe and efficient delivery of your goods. We prioritise your peace of mind and ensure all items are safely transported with full insurance coverage. Punctual service guaranteed.",
    price: "Get a quote",
    related: ["removals", "waste-collection", "rubbish-tips"],
  },
  {
    id: "waste-collection",
    title: "Waste Collection",
    description:
      "Comprehensive waste collection services. We hold a Waste Carrier Licence and can collect and dispose of any refuse or trash you need to get rid of.",
    details:
      "Professional waste collection service with full Waste Carrier Licence. We can collect and dispose of any refuse or trash you need to get rid of. Our service is fully insured and we ensure all waste is disposed of responsibly and in compliance with regulations.",
    price: "Get a quote",
    related: ["rubbish-tips", "recycling", "green-waste"],
  },
  {
    id: "cardboard-disposal",
    title: "Cardboard Disposal",
    description:
      "Efficient cardboard disposal service for businesses and homes. We collect and dispose of cardboard waste responsibly.",
    details:
      "Professional cardboard disposal service for businesses and residential properties. We collect cardboard waste and ensure it is disposed of responsibly. Our service is efficient, reliable, and fully compliant with waste disposal regulations.",
    price: "Get a quote",
    related: ["cardboard-recycling", "paper-recycling", "waste-collection"],
  },
  {
    id: "cardboard-recycling",
    title: "Cardboard Recycling",
    description:
      "Eco-friendly cardboard recycling service. We collect and recycle your cardboard waste, helping you reduce your environmental impact.",
    details:
      "Eco-friendly cardboard recycling service. We collect your cardboard waste and ensure it is properly recycled, helping you reduce your environmental impact while maintaining a clean and organised space. Responsible recycling for a sustainable future.",
    price: "Get a quote",
    related: ["cardboard-disposal", "paper-recycling", "plastic-recycling"],
  },
  {
    id: "paper-recycling",
    title: "Paper Recycling",
    description:
      "Professional paper recycling service for offices and homes. Secure collection and responsible recycling of paper waste.",
    details:
      "Professional paper recycling service for offices and residential properties. We provide secure collection and responsible recycling of all paper waste. Our service helps you maintain a clean environment while contributing to sustainability efforts.",
    price: "Get a quote",
    related: ["confidential-waste", "cardboard-recycling", "recycling"],
  },
  {
    id: "plastic-recycling",
    title: "Plastic Recycling",
    description:
      "Eco-conscious plastic recycling service. We collect and recycle plastic waste, supporting environmental sustainability.",
    details:
      "Eco-conscious plastic recycling service. We collect plastic waste and ensure it is properly recycled, supporting environmental sustainability. Our service helps reduce plastic waste in landfills and contributes to a cleaner environment.",
    price: "Get a quote",
    related: ["cardboard-recycling", "paper-recycling", "recycling"],
  },
  {
    id: "confidential-waste",
    title: "Confidential Waste Disposal",
    shortTitle: "Confidential Waste",
    description:
      "Secure and confidential waste disposal service. We handle sensitive documents and materials with complete discretion.",
    details:
      "Secure and confidential waste disposal service for sensitive documents and materials. We handle all confidential waste with complete discretion and ensure secure destruction and disposal. Perfect for businesses requiring secure document disposal.",
    price: "Get a quote",
    related: ["paper-recycling", "waste-collection", "cardboard-disposal"],
  },
  {
    id: "green-waste",
    title: "Green Waste Disposal",
    shortTitle: "Green Waste",
    description:
      "Eco-friendly green waste disposal service. We collect and dispose of garden waste, organic materials and green waste responsibly.",
    details:
      "Eco-friendly green waste disposal service for garden waste, organic materials, and other green waste. We collect and dispose of green waste responsibly, ensuring it is processed in an environmentally friendly manner. Perfect for garden clearances and organic waste removal.",
    price: "Get a quote",
    related: ["waste-collection", "rubbish-tips", "recycling"],
  },
  {
    id: "recycling",
    title: "Recycling Services",
    description:
      "Comprehensive recycling services for all types of materials. We help you recycle responsibly and reduce your environmental footprint.",
    details:
      "Comprehensive recycling services for cardboard, paper, plastic and other recyclable materials. We help you recycle responsibly and reduce your environmental footprint. Our service ensures all materials are properly sorted and recycled according to regulations.",
    price: "Get a quote",
    related: ["cardboard-recycling", "paper-recycling", "plastic-recycling"],
  },
  {
    id: "rubbish-tips",
    title: "Rubbish Tips",
    description:
      "Professional rubbish tip service. We collect and dispose of your rubbish at licensed waste facilities.",
    details:
      "Professional rubbish tip service. We collect your rubbish and dispose of it at licensed waste facilities. Our service is fully insured and compliant with all waste disposal regulations. We handle all types of rubbish and ensure responsible disposal.",
    price: "Get a quote",
    related: ["waste-collection", "removals", "green-waste"],
  },
];
