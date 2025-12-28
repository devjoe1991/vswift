"use client";

import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { useUI } from "@/context/UIContext";

export default function GlobalBottomSheet() {
  const { isBottomSheetOpen, bottomSheetContent, closeBottomSheet } = useUI();

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.y > 100 || info.velocity.y > 500) {
      closeBottomSheet();
    }
  };

  return (
    <AnimatePresence>
      {isBottomSheetOpen && bottomSheetContent && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeBottomSheet}
          />

          {/* Bottom Sheet */}
          <motion.div
            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl z-50 max-h-[90vh] overflow-hidden"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            drag="y"
            dragConstraints={{ top: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
          >
            {/* Grab Handle */}
            <div className="flex justify-center pt-4 pb-2">
              <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
            </div>

            {/* Content - Scrollable */}
            <div className="px-6 pb-8 overflow-y-auto max-h-[calc(90vh-60px)] scrollbar-thin scrollbar-thumb-[#87CEEB] scrollbar-track-gray-100">
              <div className="text-6xl mb-4">{bottomSheetContent.icon}</div>
              <h2 className="font-serif text-3xl font-bold text-[#1e3a5f] mb-4">
                {bottomSheetContent.title}
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {bottomSheetContent.description}
              </p>
              <div className="border-t border-gray-200 pt-6">
                <h3 className="font-semibold text-[#1e3a5f] mb-3">Details</h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                  {bottomSheetContent.details}
                </p>
                
                {/* Coverage Area Information */}
                <div className="bg-[#87CEEB]/10 border border-[#87CEEB]/20 rounded-lg p-4 mb-6">
                  <h4 className="font-semibold text-[#1e3a5f] mb-2 flex items-center gap-2">
                    <span>📍</span>
                    Coverage Area
                  </h4>
                  <p className="text-gray-700 leading-relaxed text-sm">
                    We operate all around the M25 and provide long distance services throughout the UK. 
                    Whether you need a local move or a long-distance relocation, we're here to help. 
                    Our professional service covers the entire M25 area and beyond, ensuring reliable 
                    and efficient service wherever you need us.
                  </p>
                </div>

                <motion.a
                  href="mailto:sales@vswift.uk"
                  onClick={closeBottomSheet}
                  className="w-full py-4 border-2 border-[#87CEEB] bg-[#87CEEB] text-white font-semibold rounded-sm hover:bg-[#6BB6D6] hover:border-[#6BB6D6] transition-colors shadow-lg inline-block text-center"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Enquire Now
                </motion.a>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

