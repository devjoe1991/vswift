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
  const [scrollProgress, setScrollProgress] = useState(0);

  const viewportRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const lastSnappedIndexRef = useRef(0);
  const draggedRef = useRef(false);
  const dragStartIndexRef = useRef(0);
  const boundaryHapticRef = useRef<"none" | "start" | "end">("none");

  // Mutable refs that always reflect the latest layout values, so callbacks
  // captured by framer-motion subscriptions never see stale closures.
  const maxScrollRef = useRef(0);
  const totalDotsRef = useRef(0);
  const cardWidthRef = useRef(DESKTOP_CARD_WIDTH);

  const dragX = useMotionValue(0);

  useEffect(() => {
    cardWidthRef.current = cardWidth;
  }, [cardWidth]);

  useEffect(() => {
    maxScrollRef.current = maxScroll;
  }, [maxScroll]);

  useEffect(() => {
    totalDotsRef.current = totalDots;
  }, [totalDots]);

  // Layout + subscriptions: run only once on mount. All state reads from refs.
  useEffect(() => {
    const updateCardWidth = () => {
      if (typeof window === "undefined") return;
      const isMobile = window.innerWidth < MOBILE_BREAKPOINT;
      const w = isMobile ? MOBILE_CARD_WIDTH : DESKTOP_CARD_WIDTH;
      setCardWidth(w);
      cardWidthRef.current = w;
    };

    const calculateLayout = () => {
      if (!viewportRef.current) return;
      const w = cardWidthRef.current;
      const cwg = w + GAP;
      const viewportWidth = viewportRef.current.clientWidth;
      const cardsVisible = Math.max(1, Math.floor(viewportWidth / cwg));
      const trackWidth = services.length * w + (services.length - 1) * GAP + PADDING_RIGHT;
      const ms = Math.max(0, trackWidth - viewportWidth);
      const cs = ms > 10;
      const maxPosition = Math.max(0, services.length - cardsVisible);
      setMaxScroll(ms);
      maxScrollRef.current = ms;
      setCanScroll(cs);
      const dots = cs ? maxPosition + 1 : 0;
      setTotalDots(dots);
      totalDotsRef.current = dots;
      if (!cs) {
        dragX.set(0);
        setActiveIndex(0);
        setScrollProgress(0);
      }
    };

    const updateActiveIndex = (latestX: number) => {
      const ms = maxScrollRef.current;
      const dots = totalDotsRef.current;
      const cwg = cardWidthRef.current + GAP;
      if (ms <= 0) {
        setScrollProgress(0);
        return;
      }
      const idx = Math.round(Math.abs(latestX) / cwg);
      const clamped = Math.max(0, Math.min(idx, dots - 1));
      const progress = Math.min(1, Math.max(0, Math.abs(latestX) / ms));
      setActiveIndex(clamped);
      setScrollProgress(progress);

      if (
        clamped !== lastSnappedIndexRef.current &&
        typeof navigator !== "undefined" &&
        "vibrate" in navigator
      ) {
        navigator.vibrate?.(4);
        lastSnappedIndexRef.current = clamped;
      }
    };

    updateCardWidth();

    const t1 = setTimeout(() => {
      updateCardWidth();
    }, 0);
    const t2 = setTimeout(calculateLayout, 200);
    const t3 = setTimeout(calculateLayout, 600);

    const onResize = () => {
      updateCardWidth();
      calculateLayout();
    };
    window.addEventListener("resize", onResize);

    const unsubscribe = dragX.on("change", updateActiveIndex);

    const resizeObs = new ResizeObserver(calculateLayout);
    if (viewportRef.current) resizeObs.observe(viewportRef.current);

    return () => {
      window.removeEventListener("resize", onResize);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      unsubscribe();
      resizeObs.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [services.length]);

  const handleDragStart = () => {
    draggedRef.current = false;
    boundaryHapticRef.current = "none";
    const cwg = cardWidthRef.current + GAP;
    dragStartIndexRef.current = Math.round(Math.abs(dragX.get()) / cwg);
  };

  const handleDrag = (_e: unknown, info: PanInfo) => {
    const ms = maxScrollRef.current;
    if (Math.abs(info.offset.x) > 4) draggedRef.current = true;
    if (ms <= 0) return;
    const progress = Math.min(1, Math.max(0, Math.abs(info.offset.x) / ms));
    setScrollProgress(progress);

    // Boundary bump: soft tick when the user pushes past either edge.
    const x = dragX.get();
    const hasVibrate =
      typeof navigator !== "undefined" && "vibrate" in navigator;
    if (x > 8 && boundaryHapticRef.current !== "start") {
      if (hasVibrate) navigator.vibrate?.([6, 30, 6]);
      boundaryHapticRef.current = "start";
    } else if (x < -ms - 8 && boundaryHapticRef.current !== "end") {
      if (hasVibrate) navigator.vibrate?.([6, 30, 6]);
      boundaryHapticRef.current = "end";
    } else if (x <= 0 && x >= -ms) {
      boundaryHapticRef.current = "none";
    }
  };

  const handleClickCapture: React.MouseEventHandler = (e) => {
    if (draggedRef.current) {
      e.preventDefault();
      e.stopPropagation();
      draggedRef.current = false;
    }
  };

  const handleDragEnd = (_e: unknown, info: PanInfo) => {
    const ms = maxScrollRef.current;
    const dots = totalDotsRef.current;
    const cwg = cardWidthRef.current + GAP;
    if (ms <= 0 || dots <= 0) return;
    const velocity = info.velocity.x;
    const currentX = dragX.get();
    const maxPosition = dots - 1;
    const currentIndex = Math.round(Math.abs(currentX) / cwg);

    let targetIndex: number;
    if (Math.abs(velocity) > 300) {
      const cardsToMove = Math.min(Math.ceil(Math.abs(velocity) / 400), 3);
      targetIndex =
        velocity < 0 ? currentIndex + cardsToMove : currentIndex - cardsToMove;
    } else if (Math.abs(velocity) > 100) {
      targetIndex = velocity < 0 ? currentIndex + 1 : currentIndex - 1;
    } else {
      targetIndex = currentIndex;
    }

    targetIndex = Math.max(0, Math.min(targetIndex, maxPosition));

    const snapTo =
      targetIndex === maxPosition ? -ms : -targetIndex * cwg;

    dragX.set(snapTo);
    setActiveIndex(targetIndex);
    setScrollProgress(ms > 0 ? Math.abs(snapTo) / ms : 0);

    const movedFromStart = targetIndex !== dragStartIndexRef.current;
    if (
      movedFromStart &&
      typeof navigator !== "undefined" &&
      "vibrate" in navigator
    ) {
      navigator.vibrate?.(10);
    }
    lastSnappedIndexRef.current = targetIndex;
    boundaryHapticRef.current = "none";
  };

  const bg = background === "white" ? "bg-white" : "bg-[#fafafa]";

  return (
    <section ref={sectionRef} className={`${bg} py-12 md:py-16`}>
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
        className="overflow-hidden w-full select-none"
        style={{ paddingLeft: EDGE_PADDING }}
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
            canScroll && maxScroll > 0 ? { left: -maxScroll, right: 0 } : undefined
          }
          dragElastic={0.15}
          dragMomentum
          dragTransition={{
            bounceStiffness: 300,
            bounceDamping: 30,
            power: 0.4,
            timeConstant: 200,
          }}
          onDragStart={handleDragStart}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          onClickCapture={handleClickCapture}
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
