"use client";

import { motion } from "framer-motion";
import { WHY_CHOOSE_US } from "@/data/why-choose-us";

export default function About() {
  return (
    <section className="py-16 md:py-20 px-4 bg-gradient-to-b from-[#fafafa] to-white">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-[#1e3a5f] text-center mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
        >
          Why Choose vSwift
        </motion.h2>
        <motion.p
          className="text-center text-gray-600 mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", damping: 25, stiffness: 200, delay: 0.1 }}
        >
          Professional, swift and reliable removals and waste disposal. We prioritise your peace of mind and make sure every item is moved safely.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY_CHOOSE_US.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", damping: 25, stiffness: 200, delay: index * 0.1 }}
            >
              <h3 className="font-serif text-xl font-semibold text-[#1e3a5f] mb-3">
                {feature.title}
              </h3>
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
