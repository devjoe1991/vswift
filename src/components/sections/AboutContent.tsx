"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import CTAButton from "@/components/ui/CTAButton";
import { BUSINESS } from "@/data/business";
import { WHY_CHOOSE_US } from "@/data/why-choose-us";

const vanImages = [
  { src: "/frontvan.png", alt: `${BUSINESS.name} van front view` },
  { src: "/backvan.png", alt: `${BUSINESS.name} van back view` },
  { src: "/vanback.png", alt: `${BUSINESS.name} van rear view` },
];

export default function AboutContent() {
  return (
    <section className="py-12 md:py-20 px-4 bg-gradient-to-b from-[#fafafa] to-white">
      <div className="max-w-7xl mx-auto">
        <motion.h1
          className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-[#1e3a5f] text-center mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
        >
          About {BUSINESS.name}
        </motion.h1>
        <motion.p
          className="text-center text-gray-600 mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200, delay: 0.1 }}
        >
          Professional, swift and reliable removals and waste disposal services. We prioritise your peace of mind and make sure every item is moved safely.
        </motion.p>

        <motion.div
          className="flex justify-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200, delay: 0.2 }}
        >
          <CTAButton intent="whatsapp" variant="primary" size="lg" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {vanImages.map((image, index) => (
            <motion.div
              key={image.src}
              className="relative rounded-lg overflow-hidden shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200, delay: 0.2 + index * 0.1 }}
            >
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  quality={90}
                />
                <div className="absolute bottom-4 right-4 z-10">
                  <div className="relative w-16 h-16 md:w-20 md:h-20 bg-white rounded-full shadow-lg flex items-center justify-center p-2">
                    <div className="relative w-full h-full">
                      <Image
                        src="/mainlogo.png"
                        alt={`${BUSINESS.name} logo`}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.h2
          className="font-serif text-3xl md:text-4xl font-bold text-[#1e3a5f] text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
        >
          Why Choose vSwift
        </motion.h2>

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
