"use client";

import { motion } from "framer-motion";

const features = [
  {
    title: "Professional",
    description: "Fully insured for your peace of mind",
    detail: "We have Goods In Transit cover of up to £10,000 and Public Liability Insurance which covers up to £2,000,000 (2 Million) in damages. All belongings are safely transported and fully insured.",
  },
  {
    title: "Reliable",
    description: "Fresh Luton Van with tail lift for easy loading",
    detail: "We own a fresh, fully functioning Luton Van with a tail lift which makes jobs that much easier. Every job we receive we ensure we are punctual and arrive early.",
  },
  {
    title: "Comprehensive",
    description: "No job too big or small",
    detail: "We specialise in whole house moves as well as smaller jobs. We also own a Waste Carrier Licence so can collect and dump any refuse or trash you need to get rid of!",
  },
  {
    title: "Customer-Focused",
    description: "Friendly and personable service",
    detail: "We are always friendly and personable with our clients. We prioritise your peace of mind and ensure all belongings are safely transported. You will not regret booking with vSwift Logistics.",
  },
];

export default function About() {
  return (
    <section id="about" className="py-20 px-4 bg-gradient-to-b from-[#fafafa] to-white">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="font-serif text-4xl md:text-5xl font-bold text-[#1e3a5f] text-center mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
        >
          Why Choose Us
        </motion.h2>
        <motion.p
          className="text-center text-gray-600 mb-16 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", damping: 25, stiffness: 200, delay: 0.1 }}
        >
          Professional, swift and reliable removals and waste disposal services. We prioritise your peace of mind and ensure all belongings are safely transported.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", damping: 25, stiffness: 200, delay: index * 0.1 }}
            >
              <h3 className="font-serif text-xl font-semibold text-[#1e3a5f] mb-2">
                {feature.title}
              </h3>
              <p className="text-[#87CEEB] font-medium mb-3 text-sm">
                {feature.description}
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                {feature.detail}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

