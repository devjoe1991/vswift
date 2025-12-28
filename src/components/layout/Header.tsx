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
          <a
            href="tel:+447487263317"
            className="flex items-center gap-2 px-4 py-1.5 bg-white/20 hover:bg-white/30 rounded-sm transition-colors font-medium"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            <span>+44 (0) 7487 263317</span>
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
          <a href="/" className="flex items-center">
            <Image
              src="/mainlogo.png"
              alt="vSwift Logistics Logo"
              width={50}
              height={50}
              className="object-cover rounded-full hover:opacity-80 transition-opacity"
            />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-8 items-center">
            <a href="#services" className="text-[#1e3a5f] hover:text-[#87CEEB] transition-colors">
              Services
            </a>
            <a href="/about" className="text-[#1e3a5f] hover:text-[#87CEEB] transition-colors">
              About
            </a>
            <a href="#contact" className="text-[#1e3a5f] hover:text-[#87CEEB] transition-colors">
              Contact
            </a>
            <a
              href="mailto:sales@vswift.uk"
              className="px-6 py-2 border-2 border-[#87CEEB] text-[#1e3a5f] hover:bg-[#87CEEB] hover:text-white transition-colors rounded-sm inline-block text-center"
            >
              Enquire Now
            </a>
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
                  href="/about"
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
                <a
                  href="mailto:sales@vswift.uk"
                  className="px-6 py-2 border-2 border-[#87CEEB] text-[#1e3a5f] hover:bg-[#87CEEB] hover:text-white transition-colors rounded-sm w-full mt-2 inline-block text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Enquire Now
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}

