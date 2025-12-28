"use client";

import { motion } from "framer-motion";
import Image from "next/image";

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

const vanImages = [
  {
    src: "/frontvan.png",
    alt: "vSwift Logistics van front view",
  },
  {
    src: "/backvan.png",
    alt: "vSwift Logistics van back view",
  },
  {
    src: "/vanback.png",
    alt: "vSwift Logistics van rear view",
  },
];

export default function AboutContent() {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-[#fafafa] to-white">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb Navigation */}
        <motion.nav
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
        >
          <ol className="flex items-center gap-2 text-sm text-gray-600">
            <li>
              <a
                href="/"
                className="text-[#87CEEB] underline hover:text-[#6BB6D6] transition-colors"
              >
                Home
              </a>
            </li>
            <li className="text-gray-400">/</li>
            <li className="text-[#1e3a5f] font-medium">About Us</li>
          </ol>
        </motion.nav>

        <motion.h1
          className="font-serif text-4xl md:text-5xl font-bold text-[#1e3a5f] text-center mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
        >
          About vSwift Logistics
        </motion.h1>
        <motion.p
          className="text-center text-gray-600 mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200, delay: 0.1 }}
        >
          Professional, swift and reliable removals and waste disposal services. We prioritise your peace of mind and ensure all belongings are safely transported.
        </motion.p>

        {/* Enquire Now Button */}
        <motion.div
          className="flex justify-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200, delay: 0.2 }}
        >
          <motion.a
            href="mailto:sales@vswift.uk"
            className="px-8 py-4 border-2 border-[#87CEEB] bg-transparent text-[#87CEEB] font-semibold text-lg rounded-sm hover:bg-[#87CEEB]/20 hover:border-[#87CEEB] transition-colors shadow-lg inline-block"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Enquire Now
          </motion.a>
        </motion.div>

        {/* Van Images Section */}
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
                {/* Logo Overlay - Bottom Right with White Background */}
                <div className="absolute bottom-4 right-4 z-10">
                  <div className="relative w-16 h-16 md:w-20 md:h-20 bg-white rounded-full shadow-lg flex items-center justify-center p-2">
                    <div className="relative w-full h-full">
                      <Image
                        src="/mainlogo.png"
                        alt="vSwift Logistics Logo"
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

        {/* Feature Cards */}
        <motion.h2
          className="font-serif text-3xl md:text-4xl font-bold text-[#1e3a5f] text-center mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
        >
          Why Choose Us
        </motion.h2>
        <motion.p
          className="text-center text-gray-600 mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", damping: 25, stiffness: 200, delay: 0.1 }}
        >
          Whether you're moving house or need waste disposal, we will do our utmost to ensure you're looked after every step of the way.
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

