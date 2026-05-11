"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from "framer-motion";
import CTAButton from "@/components/ui/CTAButton";
import { BUSINESS, NAV_ITEMS, type NavItem } from "@/data/business";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 120) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  useEffect(() => {
    if (isMenuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <>
      {/* Top Bar */}
      <div className="bg-[#87CEEB] text-white py-2 px-4 text-xs sm:text-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center gap-3">
          <span className="text-white font-medium truncate">{BUSINESS.name}</span>
          <span className="text-white/90 hidden sm:inline">{BUSINESS.coverage.summary}</span>
        </div>
      </div>

      {/* Sticky Header */}
      <motion.header
        className="sticky top-0 z-50 backdrop-blur-md bg-white/85 border-b border-gray-200/50"
        initial={{ y: -100 }}
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
      >
        <nav className="max-w-7xl mx-auto px-3 sm:px-4 py-3 sm:py-4 flex justify-between items-center gap-3">
          <Link href="/" className="flex items-center" aria-label={`${BUSINESS.name} home`}>
            <Image
              src="/mainlogo.png"
              alt={`${BUSINESS.name} Logo`}
              width={120}
              height={48}
              priority
              className="h-9 sm:h-11 w-auto object-contain hover:opacity-80 transition-opacity"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-6 items-center">
            {NAV_ITEMS.filter((n) => n.href !== "/").map((item) => (
              <DesktopNavItem
                key={item.href}
                item={item}
                openDropdown={openDropdown}
                setOpenDropdown={setOpenDropdown}
              />
            ))}
            <CTAButton intent="whatsapp" variant="outline" size="sm" label="WhatsApp" />
          </div>

          {/* Mobile CTA + Hamburger */}
          <div className="md:hidden flex items-center gap-1">
            <CTAButton intent="whatsapp" variant="outline" size="sm" iconOnly ariaLabel="Message on WhatsApp" />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex flex-col gap-1.5 p-2"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
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
          </div>
        </nav>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden border-t border-gray-200/50 bg-white/95 backdrop-blur-md max-h-[80vh] overflow-y-auto scrollbar-thin"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              <div className="px-4 py-6 flex flex-col gap-1">
                {NAV_ITEMS.map((item) => (
                  <MobileNavItem
                    key={item.href}
                    item={item}
                    onNavigate={() => setIsMenuOpen(false)}
                  />
                ))}
                <div className="mt-4 flex flex-col gap-3">
                  <CTAButton
                    intent="whatsapp"
                    variant="primary"
                    size="md"
                    fullWidth
                  />
                  <CTAButton
                    intent="call"
                    variant="outline"
                    size="md"
                    fullWidth
                    label="Call Us"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}

function DesktopNavItem({
  item,
  openDropdown,
  setOpenDropdown,
}: {
  item: NavItem;
  openDropdown: string | null;
  setOpenDropdown: (v: string | null) => void;
}) {
  const hasChildren = !!item.children && item.children.length > 0;
  const isOpen = openDropdown === item.href;

  if (!hasChildren) {
    return (
      <Link
        href={item.href}
        className="text-[#1e3a5f] hover:text-[#87CEEB] transition-colors"
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpenDropdown(item.href)}
      onMouseLeave={() => setOpenDropdown(null)}
    >
      <Link
        href={item.href}
        className="text-[#1e3a5f] hover:text-[#87CEEB] transition-colors flex items-center gap-1"
      >
        {item.label}
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </Link>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute left-0 top-full pt-2 w-64"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
          >
            <div className="bg-white rounded-md shadow-lg border border-gray-200 py-2 max-h-[60vh] overflow-y-auto scrollbar-thin">
              {item.children!.map((child) => (
                <Link
                  key={child.href}
                  href={child.href}
                  className="block px-4 py-2 text-sm text-[#1e3a5f] hover:bg-[#87CEEB]/10 hover:text-[#87CEEB] transition-colors"
                >
                  {child.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MobileNavItem({
  item,
  onNavigate,
}: {
  item: NavItem;
  onNavigate: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const hasChildren = !!item.children && item.children.length > 0;

  return (
    <div className="border-b border-gray-100 last:border-b-0">
      <div className="flex items-center justify-between">
        <Link
          href={item.href}
          onClick={onNavigate}
          className="flex-1 text-[#1e3a5f] hover:text-[#87CEEB] transition-colors py-3"
        >
          {item.label}
        </Link>
        {hasChildren && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="p-2 text-[#1e3a5f]"
            aria-label={`Toggle ${item.label} submenu`}
            aria-expanded={expanded}
          >
            <motion.svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <polyline points="6 9 12 15 18 9" />
            </motion.svg>
          </button>
        )}
      </div>
      <AnimatePresence>
        {hasChildren && expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pl-4 pb-2 flex flex-col">
              {item.children!.map((child) => (
                <Link
                  key={child.href}
                  href={child.href}
                  onClick={onNavigate}
                  className="text-sm text-[#1e3a5f]/80 hover:text-[#87CEEB] transition-colors py-2"
                >
                  {child.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
