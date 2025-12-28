"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Top Bar */}
      <div className="bg-[#87CEEB] text-white py-2 px-4 text-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <span className="text-white font-medium">vSwift Logistics</span>
          <a href="tel:+441234567890" className="hover:text-white/80 transition-colors">
            +44 (0) 123 456 7890
          </a>
        </div>
      </div>

      {/* Sticky Header */}
      <motion.header
        className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-gray-200/50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
      >
        <nav className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Image
              src="/mainlogo.png"
              alt="vSwift Logistics Logo"
              width={50}
              height={50}
              className="object-cover rounded-full"
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-8 items-center">
            <a href="#services" className="text-[#1e3a5f] hover:text-[#87CEEB] transition-colors">
              Services
            </a>
            <a href="#about" className="text-[#1e3a5f] hover:text-[#87CEEB] transition-colors">
              About
            </a>
            <a href="#contact" className="text-[#1e3a5f] hover:text-[#87CEEB] transition-colors">
              Contact
            </a>
            <button className="px-6 py-2 border-2 border-[#87CEEB] text-[#1e3a5f] hover:bg-[#87CEEB] hover:text-white transition-colors rounded-sm">
              Enquire Now
            </button>
          </div>

          {/* Mobile Hamburger Menu */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label="Toggle menu"
          >
            <motion.span
              className="w-6 h-0.5 bg-[#87CEEB]"
              animate={isMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
            />
            <motion.span
              className="w-6 h-0.5 bg-[#87CEEB]"
              animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
            />
            <motion.span
              className="w-6 h-0.5 bg-[#87CEEB]"
              animate={isMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
            />
          </button>
        </nav>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden border-t border-gray-200/50 bg-white/95 backdrop-blur-md"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              <div className="px-4 py-6 flex flex-col gap-4">
                <a
                  href="#services"
                  className="text-[#1e3a5f] hover:text-[#87CEEB] transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Services
                </a>
                <a
                  href="#about"
                  className="text-[#1e3a5f] hover:text-[#87CEEB] transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </a>
                <a
                  href="#contact"
                  className="text-[#1e3a5f] hover:text-[#87CEEB] transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </a>
                <button className="px-6 py-2 border-2 border-[#87CEEB] text-[#1e3a5f] hover:bg-[#87CEEB] hover:text-white transition-colors rounded-sm w-full mt-2">
                  Enquire Now
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}

