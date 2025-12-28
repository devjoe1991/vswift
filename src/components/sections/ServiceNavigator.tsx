"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import LiquidCard from "@/components/ui/LiquidCard";
import ServiceProgressLine from "@/components/ui/ServiceProgressLine";

interface ServiceData {
  id: string;
  title: string;
  description: string;
  icon: string;
  details: string;
  price?: string;
}

interface ServiceNavigatorProps {
  services: ServiceData[];
}

export default function ServiceNavigator({ services }: ServiceNavigatorProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [maxScroll, setMaxScroll] = useState(0);
  const [canScroll, setCanScroll] = useState(false);
  const [cardWidth, setCardWidth] = useState(320);
  const [visibleCardsCount, setVisibleCardsCount] = useState(0);
  const [totalDots, setTotalDots] = useState(0);
  const [sectionHeight, setSectionHeight] = useState<number | null>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const gap = 24;
  const cardWithGap = cardWidth + gap;
  
  // Use drag position instead of scroll
  const dragX = useMotionValue(0);

  useEffect(() => {
    // Hydration fix: Wait for client-side mount before calculations
    if (typeof window === "undefined") return;
    
    // Detect touch device
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    
    // Set card width based on window size (client-side only)
    const updateCardWidth = () => {
      setCardWidth(window.innerWidth < 768 ? 280 : 320);
    };
    
    // Delay initial calculation to ensure DOM is ready (hydration fix)
    const timer = setTimeout(() => {
      updateCardWidth();
    }, 0);
    
    window.addEventListener("resize", updateCardWidth);

    const updateActiveIndex = () => {
      if (containerRef.current) {
        const container = containerRef.current;
        const containerWidth = container.clientWidth;
        const cardWithGap = cardWidth + 24;
        const cardsVisible = Math.floor(containerWidth / cardWithGap);
        const maxPosition = Math.max(0, services.length - cardsVisible);
        
        // Use drag position instead of scroll
        const currentX = dragX.get();
        const newIndex = Math.round(Math.abs(currentX) / cardWithGap);
        setActiveIndex(Math.min(Math.max(0, newIndex), maxPosition));
      }
    };

    const calculateMaxScroll = () => {
      if (containerRef.current) {
        const container = containerRef.current;
        const containerWidth = container.clientWidth;
        
        // Calculate total width of all cards including gaps and padding
        const paddingRight = 20; // Match the padding-right on the slider track
        const totalCardsWidth = services.length * cardWidth + (services.length - 1) * gap + paddingRight;
        
        // Calculate the exact position where the last card's right edge aligns with container's right edge
        // This ensures the last card is fully visible, just like the first card is at position 0
        // Position of last card's left edge: (services.length - 1) * cardWithGap
        // Position of last card's right edge: (services.length - 1) * cardWithGap + cardWidth
        // We want: lastCardRightEdge - scrollPosition = containerWidth
        // So: scrollPosition = lastCardRightEdge - containerWidth
        const lastCardRightEdge = (services.length - 1) * cardWithGap + cardWidth + paddingRight;
        const maxScrollValue = Math.max(0, lastCardRightEdge - containerWidth);
        setMaxScroll(maxScrollValue);
        
        // Only enable scroll if content overflows
        setCanScroll(maxScrollValue > 10); // 10px threshold for rounding
        
        // Calculate how many cards are visible and how many dots we need
        const cardsVisible = Math.floor(containerWidth / cardWithGap);
        setVisibleCardsCount(cardsVisible);
        
        // Calculate dots needed: number of swipe positions
        // If 8 cards and 4 visible, we have 5 positions (0-4)
        if (maxScrollValue > 10 && cardsVisible > 0) {
          const maxPosition = services.length - cardsVisible;
          const dotsNeeded = maxPosition + 1; // Positions 0 to maxPosition
          setTotalDots(dotsNeeded);
        } else {
          setTotalDots(0); // No dots needed if all cards fit
        }
      }
    };

    const container = containerRef.current;
    const section = sectionRef.current;
    
    // Calculate and lock section height to prevent collapse
    const lockSectionHeight = () => {
      if (section && container) {
        // Measure the tallest card to set minimum height
        const cards = container.querySelectorAll('[data-service-card]');
        let maxCardHeight = 0;
        
        cards.forEach((card) => {
          const cardElement = card as HTMLElement;
          const cardHeight = cardElement.offsetHeight;
          if (cardHeight > maxCardHeight) {
            maxCardHeight = cardHeight;
          }
        });
        
        // Get the full section height including padding
        const sectionHeight = section.scrollHeight;
        // Use the larger of the two to ensure nothing collapses
        const finalHeight = Math.max(sectionHeight, maxCardHeight + 100); // 100px for padding
        
        if (finalHeight > 0) {
          setSectionHeight(finalHeight);
        }
      }
    };
    
    if (container) {
      // Subscribe to drag position changes
      const unsubscribe = dragX.on("change", updateActiveIndex);
      
      // Delay calculations until after hydration
      const initTimer = setTimeout(() => {
        updateActiveIndex();
        calculateMaxScroll();
        // Lock height after content is rendered
        lockSectionHeight();
      }, 200);
      
      // Recalculate on resize
      const handleResize = () => {
        calculateMaxScroll();
        lockSectionHeight();
      };
      window.addEventListener("resize", handleResize);
      
      return () => {
        clearTimeout(timer);
        clearTimeout(initTimer);
        unsubscribe();
        window.removeEventListener("resize", updateCardWidth);
        window.removeEventListener("resize", handleResize);
      };
    }
  }, [services.length, cardWidth, dragX]);
  
  // Update progress when dragX or maxScroll changes
  useEffect(() => {
    if (maxScroll > 0) {
      const unsubscribe = dragX.on("change", (value) => {
        const progress = Math.max(0, Math.min(1, Math.abs(value) / maxScroll));
        setScrollProgress(progress);
      });
      return () => unsubscribe();
    }
  }, [dragX, maxScroll]);

  const handleDrag = (event: any, info: any) => {
    // Let Framer Motion handle the drag position automatically
    // We just update the active index based on current position
    const currentX = dragX.get();
    const containerWidth = containerRef.current?.clientWidth || 0;
    const cardWithGap = cardWidth + 24;
    const cardsVisible = Math.floor(containerWidth / cardWithGap);
    const maxPosition = Math.max(0, services.length - cardsVisible);
    
    const newIndex = Math.round(Math.abs(currentX) / cardWithGap);
    const clampedIndex = Math.max(0, Math.min(newIndex, maxPosition));
    
    if (clampedIndex !== activeIndex) {
      setActiveIndex(clampedIndex);
    }
    
    // Calculate scroll progress (0 to 1)
    if (maxScroll > 0) {
      const progress = Math.max(0, Math.min(1, Math.abs(currentX) / maxScroll));
      setScrollProgress(progress);
    }
  };

  const handleDragEnd = (event: any, info: any) => {
    if (!containerRef.current) return;
    
    const currentX = dragX.get();
    const velocity = info.velocity.x;
    const containerWidth = containerRef.current.clientWidth;
    const cardsVisible = Math.floor(containerWidth / cardWithGap);
    const maxPosition = Math.max(0, services.length - cardsVisible);

    // Calculate current index from position
    const currentIndex = Math.round(Math.abs(currentX) / cardWithGap);
    let targetIndex = currentIndex;

    // Use velocity for momentum-based scrolling
    if (Math.abs(velocity) > 300) {
      // Fast swipe - move multiple cards
      const direction = velocity < 0 ? 1 : -1;
      const cardsToMove = Math.min(Math.ceil(Math.abs(velocity) / 400), 3);
      targetIndex = currentIndex + (direction * cardsToMove);
    } else if (Math.abs(velocity) > 100) {
      // Medium swipe - move one card
      targetIndex = velocity < 0 ? currentIndex + 1 : currentIndex - 1;
    } else {
      // Slow drag - snap to nearest card
      const nearestIndex = Math.round(Math.abs(currentX) / cardWithGap);
      targetIndex = nearestIndex;
    }

    // Clamp to valid swipe positions (0 to maxPosition)
    targetIndex = Math.max(0, Math.min(targetIndex, maxPosition));
    let targetX = -targetIndex * cardWithGap;
    
    // If we're at the last position, ensure we scroll to show the last card fully
    // This matches the behavior at the start where the first card is fully visible
    if (targetIndex >= maxPosition && maxScroll > 0) {
      // Use the exact maxScroll value which positions the last card's right edge at container's right edge
      targetX = -maxScroll;
    }
    
    // Ensure we don't drag beyond the actual maximum (0 to -maxScroll)
    const finalX = Math.max(-maxScroll, Math.min(0, targetX));
    setActiveIndex(targetIndex);
    dragX.set(finalX);
    
    // Update progress after drag ends
    if (maxScroll > 0) {
      const progress = Math.max(0, Math.min(1, Math.abs(finalX) / maxScroll));
      setScrollProgress(progress);
    }
  };

  return (
    <section id="services" className="py-20 bg-white" style={{ display: "grid", gridTemplateRows: "1fr auto", minHeight: sectionHeight ? `${sectionHeight + 200}px` : "fit-content", overflowY: "visible", paddingBottom: "0px", overflowX: "hidden", width: "100%", maxWidth: "100vw" }}>
      <div className="max-w-7xl mx-auto px-4" style={{ height: "auto", minHeight: sectionHeight ? `${sectionHeight + 100}px` : "fit-content", overflowY: "visible", overflowX: "hidden", width: "100%", maxWidth: "100%" }}>
        <motion.h2
          className="font-serif text-4xl md:text-5xl font-bold text-[#1e3a5f] text-center mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
        >
          Our Services
        </motion.h2>
        <motion.p
          className="text-center text-gray-600 mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", damping: 25, stiffness: 200, delay: 0.1 }}
        >
          Professional removals and waste disposal services tailored to your needs
        </motion.p>

        <div 
          ref={sectionRef}
          className="relative" 
          style={{ 
            position: "relative", 
            isolation: "isolate", 
            overflow: "hidden", 
            width: "100%",
            maxWidth: "100%",
            height: sectionHeight ? `${sectionHeight}px` : "auto",
            minHeight: sectionHeight ? `${sectionHeight}px` : "fit-content",
            minWidth: "0",
            paddingBottom: "0px",
            paddingLeft: "0",
            paddingRight: "0",
            overflowY: "visible",
            overflowX: "hidden",
            boxSizing: "border-box",
          }}
        >
          <motion.div
            ref={containerRef}
            className={`flex gap-6 items-stretch vertical-lock ${
              canScroll ? "cursor-grab active:cursor-grabbing" : "cursor-default"
            }`}
            style={{
              width: canScroll ? `${services.length * cardWidth + (services.length - 1) * gap + 20}px` : "100%",
              minWidth: canScroll ? `${services.length * cardWidth + (services.length - 1) * gap + 20}px` : "auto",
              maxWidth: "none",
              paddingLeft: "0",
              paddingRight: "20px",
              paddingBottom: "0",
              justifyContent: "flex-start",
              position: "relative",
              touchAction: "pan-x",
              display: "flex !important" as any,
              alignItems: "stretch",
              height: "auto",
              minHeight: "0",
              overflow: "visible",
              willChange: "transform",
              boxSizing: "border-box",
              x: dragX,
            }}
            drag={canScroll ? "x" : false}
            dragConstraints={
              canScroll && maxScroll > 0
                ? {
                    left: -maxScroll, // Exact position to show last card fully
                    right: 0, // Start position
                  }
                : false
            }
            dragElastic={0.15}
            dragMomentum={true}
            dragTransition={{ 
              bounceStiffness: 300, 
              bounceDamping: 30,
              power: 0.4,
              timeConstant: 200
            }}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
          >
            {services.map((service, index) => (
              <div 
                key={service.id} 
                className="shrink-0" 
                style={{ 
                  width: `${cardWidth}px`,
                  height: "auto",
                  minWidth: `${cardWidth}px`,
                  flexShrink: 0,
                  overflow: "visible",
                  display: "flex",
                  alignSelf: "stretch",
                  boxSizing: "border-box",
                }}
              >
                <LiquidCard service={service} index={index} />
              </div>
            ))}
          </motion.div>

          <style jsx>{`
            .vertical-lock {
              align-items: stretch !important;
              overflow-y: visible !important;
              display: flex !important;
              justify-content: flex-start !important;
            }
            * {
              box-sizing: border-box;
            }
          `}</style>
          
          {/* Progress line positioned underneath cards inside the section */}
          {canScroll && totalDots > 0 && (
            <div style={{ 
              position: "relative", 
              width: "100%",
              paddingTop: "12px",
              paddingBottom: "0",
              marginTop: "0",
              marginBottom: "0",
            }}>
              <ServiceProgressLine 
                total={totalDots} 
                activeIndex={activeIndex}
                progress={scrollProgress}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

