"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#87CEEB] text-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center mb-4">
              <Image
                src="/mainlogo.png"
                alt="vSwift Logistics Logo"
                width={60}
                height={60}
                className="object-cover rounded-full"
              />
            </div>
            <p className="text-sm text-white/90">
              Professional, Swift and Reliable Removals
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white">Contact</h4>
            <p className="text-sm text-white/90 mb-2">
              London, United Kingdom
            </p>
            <p className="text-sm text-white/90 mb-2">
              <a href="tel:+441234567890" className="hover:text-white transition-colors">
                +44 (0) 123 456 7890
              </a>
            </p>
            <p className="text-sm text-white/90 mb-4">
              <a href="mailto:info@vswift-logistics.co.uk" className="hover:text-white transition-colors">
                info@vswift-logistics.co.uk
              </a>
            </p>
            <h4 className="font-semibold mb-2 text-white">Business Hours</h4>
            <p className="text-sm text-white/90 mb-1">24 Hours a Day</p>
            <p className="text-sm text-white/90 mb-1">365 Days a Year</p>
            <p className="text-sm text-white/90 italic">Always available for your needs</p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white">Insurance</h4>
            <p className="text-sm text-white/90 mb-2">
              Goods In Transit cover: up to £10,000
            </p>
            <p className="text-sm text-white/90 mb-4">
              Public Liability Insurance: up to £2,000,000
            </p>
            <h4 className="font-semibold mb-2 text-white">Licensing</h4>
            <p className="text-sm text-white/90">
              Fully licensed Waste Carrier Licence holder. All belongings are safely transported and fully insured.
            </p>
          </div>
        </div>

        <div className="border-t border-white/30 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-white/80">
            © {new Date().getFullYear()} vSwift Logistics. All rights reserved.
          </p>
          <motion.button
            onClick={scrollToTop}
            className="px-6 py-2 bg-white text-[#87CEEB] font-semibold rounded-sm hover:bg-white/90 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Back to Top
          </motion.button>
        </div>
      </div>
    </footer>
  );
}

