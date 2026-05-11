"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, type PanInfo } from "framer-motion";
import LiquidCard from "@/components/ui/LiquidCard";
import ProgressLine from "@/components/ui/ProgressLine";
import type { ServiceData } from "@/data/services";

interface ServiceCarouselProps {
  services: ServiceData[];
  heading?: string;
  subheading?: string;
  background?: "default" | "white";
}

const GAP = 24;
const PADDING_RIGHT = 20;
const MOBILE_BREAKPOINT = 768;
const MOBILE_CARD_WIDTH = 280;
const DESKTOP_CARD_WIDTH = 320;
const EDGE_PADDING = 16;

export default function ServiceCarousel({
  services,
  heading,
  subheading,
  background = "default",
}: ServiceCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const [canScroll, setCanScroll] = useState(false);
  const [cardWidth, setCardWidth] = useState(DESKTOP_CARD_WIDTH);
  const [totalDots, setTotalDots] = useState(0);
  const [sectionHeight, setSectionHeight] = useState<number | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const viewportRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const lastSnappedIndexRef = useRef(0);

  const cardWithGap = cardWidth + GAP;
  const dragX = useMotionValue(0);

  useEffect(() => {
    const updateCardWidth = () => {
      if (typeof window === "undefined") return;
      const isMobile = window.innerWidth < MOBILE_BREAKPOINT;
      setCardWidth(isMobile ? MOBILE_CARD_WIDTH : DESKTOP_CARD_WIDTH);
    };

    const calculateLayout = () => {
      if (!viewportRef.current) return;
      const width = cardWidth;
      const gap = GAP;
      const cwg = width + gap;
      const viewportWidth = viewportRef.current.clientWidth;
      const cardsVisible = Math.max(1, Math.floor(viewportWidth / cwg));
      const trackWidth =
        services.length * width + (services.length - 1) * gap + PADDING_RIGHT;
      const ms = Math.max(0, trackWidth - viewportWidth);
      const cs = ms > 10;
      const maxPosition = Math.max(0, services.length - cardsVisible);
      setMaxScroll(ms);
      setCanScroll(cs);
      setTotalDots(cs ? maxPosition + 1 : 0);
      if (!cs) {
        dragX.set(0);
        setActiveIndex(0);
        setScrollProgress(0);
      }
    };

    const lockSectionHeight = () => {
      if (!sectionRef.current) return;
      const cards = sectionRef.current.querySelectorAll<HTMLElement>(
        "[data-service-card]"
      );
      let tallest = 0;
      cards.forEach((c) => {
        if (c.offsetHeight > tallest) tallest = c.offsetHeight;
      });
      const scrollH = sectionRef.current.scrollHeight;
      setSectionHeight(Math.max(scrollH, tallest + 100));
    };

    const updateActiveIndex = (latestX: number) => {
      if (maxScroll <= 0) {
        setScrollProgress(0);
        return;
      }
      const idx = Math.round(Math.abs(latestX) / cardWithGap);
      const clamped = Math.max(0, Math.min(idx, totalDots - 1));
      const progress = Math.min(1, Math.max(0, Math.abs(latestX) / maxScroll));
      setActiveIndex(clamped);
      setScrollProgress(progress);

      if (
        clamped !== lastSnappedIndexRef.current &&
        typeof window !== "undefined" &&
        typeof navigator !== "undefined" &&
        "vibrate" in navigator
      ) {
        navigator.vibrate?.(4);
        lastSnappedIndexRef.current = clamped;
      }
    };

    updateCardWidth();
    window.addEventListener("resize", updateCardWidth);

    const t1 = setTimeout(updateCardWidth, 0);
    const t2 = setTimeout(() => {
      calculateLayout();
      lockSectionHeight();
    }, 200);

    const unsubscribe = dragX.on("change", updateActiveIndex);

    const resizeObs = new ResizeObserver(() => {
      calculateLayout();
      lockSectionHeight();
    });
    if (viewportRef.current) resizeObs.observe(viewportRef.current);

    return () => {
      window.removeEventListener("resize", updateCardWidth);
      clearTimeout(t1);
      clearTimeout(t2);
      unsubscribe();
      resizeObs.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [services.length, cardWidth, maxScroll, totalDots]);

  const handleDrag = (_e: unknown, info: PanInfo) => {
    if (maxScroll <= 0) return;
    const progress = Math.min(
      1,
      Math.max(0, Math.abs(info.offset.x) / maxScroll)
    );
    setScrollProgress(progress);
  };

  const handleDragEnd = (_e: unknown, info: PanInfo) => {
    if (!canScroll) return;
    const velocity = info.velocity.x;
    const currentX = dragX.get();
    const maxPosition = totalDots - 1;
    const currentIndex = Math.round(Math.abs(currentX) / cardWithGap);

    let targetIndex: number;
    if (Math.abs(velocity) > 300) {
      const cardsToMove = Math.min(Math.ceil(Math.abs(velocity) / 400), 3);
      targetIndex =
        velocity < 0
          ? currentIndex + cardsToMove
          : currentIndex - cardsToMove;
    } else if (Math.abs(velocity) > 100) {
      targetIndex = velocity < 0 ? currentIndex + 1 : currentIndex - 1;
    } else {
      targetIndex = currentIndex;
    }

    targetIndex = Math.max(0, Math.min(targetIndex, maxPosition));

    const snapTo =
      targetIndex === maxPosition ? -maxScroll : -targetIndex * cardWithGap;

    dragX.set(snapTo);
    setActiveIndex(targetIndex);
    setScrollProgress(maxScroll > 0 ? Math.abs(snapTo) / maxScroll : 0);

    if (
      targetIndex !== lastSnappedIndexRef.current &&
      typeof navigator !== "undefined" &&
      "vibrate" in navigator
    ) {
      navigator.vibrate?.(8);
      lastSnappedIndexRef.current = targetIndex;
    }
  };

  const bg = background === "white" ? "bg-white" : "bg-[#fafafa]";

  return (
    <section
      ref={sectionRef}
      className={`${bg} py-12 md:py-16`}
      style={sectionHeight ? { minHeight: sectionHeight } : undefined}
    >
      {(heading || subheading) && (
        <div className="max-w-7xl mx-auto px-4 text-center mb-8 md:mb-10">
          {heading && (
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1e3a5f] leading-tight mb-3">
              {heading}
            </h2>
          )}
          {subheading && (
            <p className="text-[#1e3a5f]/80 max-w-2xl mx-auto">{subheading}</p>
          )}
        </div>
      )}

      <div
        ref={viewportRef}
        className="overflow-hidden w-full"
        style={{ paddingLeft: EDGE_PADDING, paddingRight: 0 }}
      >
        <motion.div
          className={`flex items-stretch ${
            canScroll ? "cursor-grab active:cursor-grabbing" : "cursor-default"
          }`}
          style={{
            gap: `${GAP}px`,
            width: canScroll
              ? `${services.length * cardWidth + (services.length - 1) * GAP + PADDING_RIGHT}px`
              : undefined,
            maxWidth: canScroll ? undefined : "1280px",
            margin: canScroll ? undefined : "0 auto",
            paddingRight: canScroll ? `${PADDING_RIGHT}px` : `${EDGE_PADDING}px`,
            touchAction: "pan-x",
            willChange: "transform",
            x: dragX,
          }}
          drag={canScroll ? "x" : false}
          dragConstraints={
            canScroll && maxScroll > 0 ? { left: -maxScroll, right: 0 } : false
          }
          dragElastic={0.15}
          dragMomentum
          dragTransition={{
            bounceStiffness: 300,
            bounceDamping: 30,
            power: 0.4,
            timeConstant: 200,
          }}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
        >
          {services.map((service, i) => (
            <div
              key={service.id}
              className="shrink-0"
              style={{
                width: canScroll ? cardWidth : undefined,
                flex: canScroll ? "0 0 auto" : "1 1 0",
                minWidth: canScroll ? cardWidth : 0,
                alignSelf: "stretch",
              }}
            >
              <LiquidCard service={service} index={i} widthClass="w-full" />
            </div>
          ))}
        </motion.div>
      </div>

      {canScroll && totalDots > 0 && (
        <div className="max-w-7xl mx-auto px-4 mt-8">
          <ProgressLine total={totalDots} progress={scrollProgress} />
          <p className="sr-only" aria-live="polite">
            Showing card {activeIndex + 1} of {totalDots}
          </p>
        </div>
      )}
    </section>
  );
}
