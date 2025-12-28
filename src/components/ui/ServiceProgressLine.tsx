"use client";

import { motion } from "framer-motion";

interface ServiceProgressLineProps {
  total: number;
  activeIndex: number;
  isAbsolute?: boolean;
  progress?: number; // Progress from 0 to 1
}

export default function ServiceProgressLine({ total, activeIndex, isAbsolute = false, progress = 0 }: ServiceProgressLineProps) {
  // Calculate line width based on total positions
  const lineWidth = total > 0 ? `${100 / total}%` : "0%";
  // Calculate line position based on progress
  const linePosition = progress * (100 - (100 / total));

  return (
    <div 
      className="flex justify-center items-center" 
      style={{ 
        position: "relative", 
        height: "4px", 
        width: "100%",
        marginTop: "0",
        marginBottom: "0",
        padding: "0",
        maxWidth: "200px",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      {/* Background track */}
      <div 
        className="absolute inset-0 bg-gray-200 rounded-full"
        style={{
          height: "2px",
          top: "50%",
          transform: "translateY(-50%)",
        }}
      />
      
      {/* Moveable line indicator */}
      <motion.div
        className="absolute bg-[#87CEEB] rounded-full"
        style={{
          height: "4px",
          width: lineWidth,
          top: "50%",
          left: `${linePosition}%`,
          transform: "translateY(-50%)",
        }}
        transition={{
          type: "spring",
          damping: 25,
          stiffness: 200,
        }}
      />
    </div>
  );
}

