"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import CTAButton from "@/components/ui/CTAButton";
import { BUSINESS } from "@/data/business";

interface HeroProps {
  title?: string;
  subtitle?: string;
  showCTA?: boolean;
}

export default function Hero({
  title = BUSINESS.name,
  subtitle = BUSINESS.shortDescription,
  showCTA = true,
}: HeroProps) {
  return (
    <section className="relative min-h-[40vh] sm:min-h-[44vh] md:min-h-[55vh] flex items-center justify-center px-4 py-10 md:py-16 bg-[#87CEEB] overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/frontvan.png"
          alt={`${BUSINESS.name} van`}
          fill
          className="object-cover object-center"
          priority
          quality={90}
        />
      </div>
      <div className="absolute inset-0 z-10 bg-[#87CEEB]/60" />

      <div className="relative z-20 max-w-4xl mx-auto text-center">
        <motion.h1
          className="font-serif text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-3 sm:mb-4 leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 100, delay: 0.2 }}
        >
          {title}
        </motion.h1>
        <motion.p
          className="text-base sm:text-lg md:text-2xl text-white/95 mb-6 sm:mb-8 max-w-2xl mx-auto px-2"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 100, delay: 0.4 }}
        >
          {subtitle}
        </motion.p>
        {showCTA && (
          <motion.div
            className="flex flex-col sm:flex-row gap-3 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 100, delay: 0.6 }}
          >
            <CTAButton intent="whatsapp" variant="primary" size="lg" />
            <CTAButton intent="call" variant="ghost" size="lg" label="Call Us" />
          </motion.div>
        )}
        <motion.p
          className="text-xs text-white/90 mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Fully insured · Waste Carrier Licence · 24/7 service across the M25 and UK
        </motion.p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-10 h-8 bg-linear-to-b from-transparent via-black/10 to-black/20" />
      <div className="absolute bottom-0 left-0 right-0 z-20 h-px bg-linear-to-r from-transparent via-white/30 to-transparent" />
    </section>
  );
}
