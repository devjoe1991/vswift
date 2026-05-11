"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BUSINESS } from "@/data/business";

type Intent = "whatsapp" | "call" | "email" | "internal";
type Variant = "primary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

interface CTAButtonProps {
  intent?: Intent;
  variant?: Variant;
  size?: Size;
  href?: string;
  label?: string;
  className?: string;
  ariaLabel?: string;
  fullWidth?: boolean;
  iconOnly?: boolean;
  children?: React.ReactNode;
}

const SIZES: Record<Size, string> = {
  sm: "px-3.5 py-1.5 text-xs sm:text-sm",
  md: "px-5 py-2 text-sm sm:text-base",
  lg: "px-6 py-3 text-base sm:px-8 sm:py-4 sm:text-lg",
};

const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-[#1e3a5f] text-white border-2 border-[#1e3a5f] hover:bg-[#0f1f3a] hover:border-[#0f1f3a]",
  outline:
    "border-2 border-[#87CEEB] text-[#1e3a5f] bg-transparent hover:bg-[#87CEEB] hover:text-white",
  ghost:
    "border-2 border-white text-white bg-transparent hover:bg-white/20",
};

const WHATSAPP_VARIANTS: Record<Variant, string> = {
  primary:
    "bg-[#25D366] text-white border-2 border-[#25D366] hover:bg-[#1FB955] hover:border-[#1FB955]",
  outline:
    "border-2 border-[#25D366] text-[#25D366] bg-white hover:bg-[#25D366] hover:text-white",
  ghost:
    "bg-[#25D366] text-white border-2 border-white/30 hover:bg-[#1FB955]",
};

function resolveHref(intent: Intent, href?: string): string {
  if (href) return href;
  switch (intent) {
    case "whatsapp":
      return BUSINESS.whatsAppUrl;
    case "call":
      return `tel:${BUSINESS.phoneE164}`;
    case "email":
      return `mailto:${BUSINESS.email}`;
    default:
      return "/contact";
  }
}

function defaultLabel(intent: Intent): string {
  switch (intent) {
    case "whatsapp":
      return "Message on WhatsApp";
    case "call":
      return "Call Us";
    case "email":
      return "Email Us";
    default:
      return "Get in Touch";
  }
}

function isExternal(href: string): boolean {
  return (
    href.startsWith("http") ||
    href.startsWith("tel:") ||
    href.startsWith("mailto:") ||
    href.startsWith("wa.me")
  );
}

export default function CTAButton({
  intent = "whatsapp",
  variant = "primary",
  size = "md",
  href,
  label,
  className = "",
  ariaLabel,
  fullWidth,
  iconOnly,
  children,
}: CTAButtonProps) {
  const resolvedHref = resolveHref(intent, href);
  const resolvedLabel = label ?? defaultLabel(intent);
  const external = isExternal(resolvedHref);

  const variantClasses =
    intent === "whatsapp" ? WHATSAPP_VARIANTS[variant] : VARIANTS[variant];

  const classes = [
    "inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-colors shadow-sm",
    SIZES[size],
    variantClasses,
    fullWidth ? "w-full" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      {intent === "whatsapp" && <WhatsAppIcon />}
      {intent === "call" && <PhoneIcon />}
      {intent === "email" && <MailIcon />}
      {!iconOnly && <span>{children ?? resolvedLabel}</span>}
    </>
  );

  const motionProps = {
    whileHover: { scale: 1.03 },
    whileTap: { scale: 0.97 },
  };

  if (external) {
    return (
      <motion.a
        href={resolvedHref}
        className={classes}
        aria-label={ariaLabel ?? resolvedLabel}
        target={resolvedHref.startsWith("http") ? "_blank" : undefined}
        rel={resolvedHref.startsWith("http") ? "noopener noreferrer" : undefined}
        {...motionProps}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.span className="inline-block" {...motionProps}>
      <Link
        href={resolvedHref}
        className={classes}
        aria-label={ariaLabel ?? resolvedLabel}
      >
        {content}
      </Link>
    </motion.span>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12.04 21.785h-.004c-1.778 0-3.523-.477-5.045-1.382l-.36-.214-3.747.982 1-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.002-5.45 4.436-9.884 9.892-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.872 9.884zm8.413-18.297A11.815 11.815 0 0012.04 0C5.495 0 .166 5.335.164 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.545 0 11.875-5.335 11.877-11.893a11.821 11.821 0 00-3.474-8.413z" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}
