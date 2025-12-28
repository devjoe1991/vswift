"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-[40vh] flex items-center justify-center px-4 py-12 bg-[#87CEEB] overflow-hidden">
      {/* Background Image with Blue Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/frontvan.png"
          alt="vSwift Logistics van"
          fill
          className="object-cover"
          priority
          quality={90}
        />
      </div>
      
      {/* Additional blue overlay to maintain light blue background */}
      <div className="absolute inset-0 z-10 bg-[#87CEEB]/60" />
      
      {/* Content */}
      <div className="relative z-20 max-w-4xl mx-auto text-center">
        <motion.h1
          className="font-serif text-5xl md:text-7xl font-bold text-white mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 100, delay: 0.2 }}
        >
          vSwift Logistics
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 100, delay: 0.4 }}
        >
          Professional, Swift and Reliable Removals
        </motion.p>
        <motion.a
          href="mailto:sales@vswift.uk"
          className="px-8 py-4 border-2 border-white bg-transparent text-white font-semibold text-lg hover:bg-white/20 hover:border-white transition-colors rounded-sm shadow-lg inline-block"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 100, delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Enquire Now
        </motion.a>
      </div>
      
      {/* Shadow effect and separator at bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-10 h-8 bg-linear-to-b from-transparent via-black/10 to-black/20" />
      <div className="absolute bottom-0 left-0 right-0 z-20 h-px bg-linear-to-r from-transparent via-white/30 to-transparent" />
    </section>
  );
}

