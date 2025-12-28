"use client";

import { motion } from "framer-motion";
import { useUI } from "@/context/UIContext";

interface ServiceData {
  id: string;
  title: string;
  description: string;
  icon: string;
  details: string;
  price?: string;
}

interface LiquidCardProps {
  service: ServiceData;
  index: number;
}

export default function LiquidCard({ service, index }: LiquidCardProps) {
  const { openBottomSheet } = useUI();

  const handleEnquireClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    openBottomSheet(service);
  };

  return (
    <motion.div
      data-service-card
      className="flex-shrink-0 w-[280px] md:w-[320px] bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col"
      style={{ 
        height: "100%",
        display: "flex",
        flexDirection: "column",
        minWidth: "0",
        overflow: "visible",
        border: "1px solid #e5e7eb",
        outline: "1px solid transparent",
        outlineOffset: "-1px",
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", damping: 25, stiffness: 200, delay: index * 0.1 }}
      whileHover={{ 
        y: -4,
        outline: "1px solid #87CEEB",
        outlineOffset: "0px",
      }}
    >
      <div className="text-4xl mb-4">{service.icon}</div>
      <h3 className={`font-serif font-semibold text-[#1e3a5f] mb-2 ${
        service.id === "removals" || service.id === "waste-collection" || service.id === "confidential-waste" || service.id === "green-waste" || service.id === "recycling"
          ? "text-lg md:text-xl"
          : "text-base md:text-lg"
      }`}>
        {service.title}
      </h3>
      <p className="text-sm text-gray-600 leading-relaxed mb-6">{service.description}</p>
      <motion.button
        className="w-full px-6 py-3 border-2 border-[#87CEEB] bg-[#87CEEB] text-white font-semibold hover:bg-[#6BB6D6] hover:border-[#6BB6D6] transition-all duration-200 rounded-sm shadow-lg hover:shadow-xl"
        style={{ marginTop: "auto" }}
        whileHover={{ scale: 1.02, y: -1 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleEnquireClick}
      >
        More Info
      </motion.button>
    </motion.div>
  );
}

