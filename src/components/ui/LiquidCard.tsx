"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { ServiceData } from "@/data/services";

interface LiquidCardProps {
  service: ServiceData;
  index: number;
  widthClass?: string;
}

export default function LiquidCard({
  service,
  index,
  widthClass = "flex-shrink-0 w-[280px] md:w-[320px]",
}: LiquidCardProps) {
  return (
    <motion.div
      data-service-card
      className={`${widthClass} bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col`}
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        minWidth: "0",
        overflow: "visible",
        outline: "1px solid transparent",
        outlineOffset: "-1px",
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", damping: 25, stiffness: 200, delay: index * 0.05 }}
      whileHover={{
        y: -4,
        outline: "1px solid #87CEEB",
        outlineOffset: "0px",
      }}
    >
      <h3 className="font-serif font-semibold text-[#1e3a5f] mb-2 text-xl">
        {service.title}
      </h3>
      <p className="text-sm text-gray-600 leading-relaxed mb-6">
        {service.description}
      </p>
      <Link
        href={`/services/${service.id}`}
        style={{ marginTop: "auto" }}
        className="w-full px-6 py-3 border-2 border-[#87CEEB] bg-[#87CEEB] text-white font-semibold hover:bg-[#6BB6D6] hover:border-[#6BB6D6] transition-all duration-200 rounded-sm shadow-lg hover:shadow-xl text-center"
      >
        Learn More
      </Link>
    </motion.div>
  );
}
