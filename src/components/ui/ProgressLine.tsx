"use client";

import { motion } from "framer-motion";

interface ProgressLineProps {
  total: number;
  progress?: number;
}

export default function ProgressLine({ total, progress = 0 }: ProgressLineProps) {
  if (total <= 0) return null;

  const lineWidth = `${100 / total}%`;
  const linePosition = progress * (100 - 100 / total);

  return (
    <div className="relative h-1 w-full max-w-xs mx-auto bg-gray-200 rounded-full overflow-hidden">
      <motion.div
        className="absolute top-0 left-0 h-full bg-[#87CEEB] rounded-full"
        style={{ width: lineWidth }}
        animate={{ x: `${linePosition}%` }}
        transition={{ type: "spring", damping: 30, stiffness: 200 }}
      />
    </div>
  );
}
