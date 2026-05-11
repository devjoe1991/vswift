"use client";

import { useMemo, useState } from "react";
import CTAButton from "@/components/ui/CTAButton";
import { BUSINESS } from "@/data/business";
import { services } from "@/data/services";

interface QuoteBuilderProps {
  preselectedServiceId?: string;
  heading?: string;
  subheading?: string;
  background?: "default" | "white" | "light" | "map";
  compact?: boolean;
  id?: string;
}

const JOB_SIZES = [
  { value: "small", label: "Small (a few items)" },
  { value: "medium", label: "Medium (1-bed flat)" },
  { value: "large", label: "Large (2 to 3-bed house)" },
  { value: "luton", label: "Full Luton van" },
] as const;

const TIME_SLOTS = [
  { value: "morning", label: "Morning (8 to 12)" },
  { value: "afternoon", label: "Afternoon (12 to 5)" },
  { value: "evening", label: "Evening (5 to 9)" },
  { value: "flexible", label: "Flexible / any time" },
] as const;

function tomorrowIso(): string {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().slice(0, 10);
}

function formatDateForDisplay(iso: string): string {
  if (!iso) return "";
  const d = new Date(`${iso}T00:00:00`);
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function buildMessage(args: {
  serviceTitle: string;
  fromArea: string;
  toArea: string;
  jobSizeLabel: string;
  dateLabel: string;
  timeSlotLabel: string;
  notes: string;
}): string {
  const lines = [
    "Hi vSwift, I'd like a quote please.",
    "",
    `Service: ${args.serviceTitle || "Not specified"}`,
    `From: ${args.fromArea || "Not specified"}`,
    `To: ${args.toArea || "Not specified"}`,
  ];
  if (args.jobSizeLabel) lines.push(`Size: ${args.jobSizeLabel}`);
  if (args.dateLabel) lines.push(`Date: ${args.dateLabel}`);
  if (args.timeSlotLabel) lines.push(`Time: ${args.timeSlotLabel}`);
  if (args.notes.trim()) lines.push(`Notes: ${args.notes.trim()}`);
  return lines.join("\n");
}

export default function QuoteBuilder({
  preselectedServiceId,
  heading,
  subheading,
  background = "map",
  compact = false,
  id,
}: QuoteBuilderProps) {
  const [fromArea, setFromArea] = useState("");
  const [toArea, setToArea] = useState("");
  const [serviceId, setServiceId] = useState(preselectedServiceId ?? "");
  const [jobSize, setJobSize] = useState<string>("");
  const [date, setDate] = useState<string>(tomorrowIso());
  const [timeSlot, setTimeSlot] = useState<string>("");
  const [notes, setNotes] = useState("");

  const selectedService = useMemo(
    () => services.find((s) => s.id === serviceId),
    [serviceId]
  );
  const selectedSize = useMemo(
    () => JOB_SIZES.find((j) => j.value === jobSize),
    [jobSize]
  );
  const selectedSlot = useMemo(
    () => TIME_SLOTS.find((t) => t.value === timeSlot),
    [timeSlot]
  );

  const ready =
    fromArea.trim().length > 0 && toArea.trim().length > 0 && !!serviceId;

  // Route progress: 0 = nothing typed, 0.5 = from filled, 1 = both filled
  const routeProgress =
    (fromArea.trim() ? 0.5 : 0) + (toArea.trim() ? 0.5 : 0);

  const href = useMemo(() => {
    const message = buildMessage({
      serviceTitle: selectedService?.title ?? "",
      fromArea: fromArea.trim(),
      toArea: toArea.trim(),
      jobSizeLabel: selectedSize?.label ?? "",
      dateLabel: formatDateForDisplay(date),
      timeSlotLabel: selectedSlot?.label ?? "",
      notes,
    });
    return `${BUSINESS.whatsAppUrl}?text=${encodeURIComponent(message)}`;
  }, [selectedService, fromArea, toArea, selectedSize, date, selectedSlot, notes]);

  const sectionBg =
    background === "white"
      ? "bg-white"
      : background === "light"
        ? "bg-[#f4f8fb]"
        : background === "map"
          ? "bg-[#eef4f9]"
          : "bg-[#fafafa]";

  const inputClass =
    "w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-[#1e3a5f] placeholder:text-[#1e3a5f]/40 focus:outline-none focus:ring-2 focus:ring-[#87CEEB]/40 focus:border-[#87CEEB] transition-colors";
  const labelClass =
    "block text-xs uppercase tracking-wide text-[#1e3a5f]/60 mb-1.5 font-medium";

  const fromFilled = fromArea.trim().length > 0;
  const toFilled = toArea.trim().length > 0;

  return (
    <section
      id={id}
      className={`relative ${sectionBg} ${
        compact ? "py-8" : "py-12 md:py-20"
      } px-4 overflow-hidden`}
    >
      {background === "map" && <MapBackdrop />}

      <div className="relative max-w-5xl mx-auto">
        {!compact && (
          <div className="text-center mb-8 md:mb-10">
            <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#87CEEB] font-semibold mb-2">
              <RouteIcon />
              Plan your trip
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1e3a5f] leading-tight">
              {heading ?? "Tell us where, when and what"}
            </h2>
            <p className="text-[#1e3a5f]/70 mt-3 max-w-xl mx-auto">
              {subheading ??
                "Drop in your pickup, destination and timing. We'll WhatsApp you a price, usually within minutes."}
            </p>
          </div>
        )}

        <div className="relative bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#87CEEB] via-[#1e3a5f] to-[#87CEEB] opacity-60"
          />

          <div className="p-5 sm:p-8 pt-6 sm:pt-9">
            {compact && (
              <h3 className="font-serif text-2xl font-bold text-[#1e3a5f] mb-5 leading-tight">
                {heading ?? "Quote on WhatsApp"}
              </h3>
            )}

            {/* Route lane: pins + connecting line + From/To inputs */}
            <div className="relative">
              <div className="grid grid-cols-[40px_1fr] sm:grid-cols-[44px_1fr_44px_1fr] gap-3 sm:gap-4 items-start">
                {/* Start pin */}
                <div className="flex flex-col items-center pt-7 relative">
                  <Pin variant="start" active={fromFilled} />
                  {/* Route line: only visible on sm+ when both pins are present in same row */}
                </div>

                {/* From input */}
                <div>
                  <label htmlFor="qb-from" className={labelClass}>
                    Pickup
                  </label>
                  <input
                    id="qb-from"
                    type="text"
                    value={fromArea}
                    onChange={(e) => setFromArea(e.target.value)}
                    placeholder="e.g. Tottenham, N17"
                    autoComplete="postal-code"
                    className={inputClass}
                  />
                </div>

                {/* End pin */}
                <div className="hidden sm:flex flex-col items-center pt-7 relative">
                  <Pin variant="end" active={toFilled} />
                </div>

                {/* To input */}
                <div className="col-start-2 sm:col-start-4">
                  <label htmlFor="qb-to" className={labelClass}>
                    Destination
                  </label>
                  <input
                    id="qb-to"
                    type="text"
                    value={toArea}
                    onChange={(e) => setToArea(e.target.value)}
                    placeholder="e.g. Camden, NW1"
                    autoComplete="postal-code"
                    className={inputClass}
                  />
                </div>

                {/* End pin (mobile only — appears in second row left column) */}
                <div className="flex sm:hidden flex-col items-center pt-7 col-start-1 row-start-2">
                  <Pin variant="end" active={toFilled} />
                </div>
              </div>

              {/* Horizontal route line on sm+ */}
              <div
                aria-hidden="true"
                className="hidden sm:block absolute left-[52px] right-[52px] top-[18px] h-px"
                style={{
                  background:
                    "repeating-linear-gradient(to right, #87CEEB 0 6px, transparent 6px 12px)",
                  opacity: 0.4,
                }}
              />
              <div
                aria-hidden="true"
                className="hidden sm:block absolute left-[52px] top-[18px] h-px bg-[#87CEEB] transition-all duration-300"
                style={{
                  width: `calc((100% - 104px) * ${routeProgress})`,
                }}
              />

              {/* Vertical route line on mobile */}
              <div
                aria-hidden="true"
                className="sm:hidden absolute left-[20px] top-[60px] bottom-[60px] w-px"
                style={{
                  background:
                    "repeating-linear-gradient(to bottom, #87CEEB 0 4px, transparent 4px 8px)",
                  opacity: 0.5,
                }}
              />
            </div>

            {/* Trip details row */}
            <div className="mt-7">
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#1e3a5f]/40 font-semibold mb-3 flex items-center gap-2">
                <span className="h-px flex-1 bg-gray-200" />
                Trip details
                <span className="h-px flex-1 bg-gray-200" />
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
                <div>
                  <label htmlFor="qb-service" className={labelClass}>
                    Service
                  </label>
                  <select
                    id="qb-service"
                    value={serviceId}
                    onChange={(e) => setServiceId(e.target.value)}
                    className={inputClass}
                  >
                    <option value="">Choose a service</option>
                    {services.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.shortTitle ?? s.title}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="qb-size" className={labelClass}>
                    Size
                  </label>
                  <select
                    id="qb-size"
                    value={jobSize}
                    onChange={(e) => setJobSize(e.target.value)}
                    className={inputClass}
                  >
                    <option value="">Not sure</option>
                    {JOB_SIZES.map((j) => (
                      <option key={j.value} value={j.value}>
                        {j.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="qb-date" className={labelClass}>
                    Date
                  </label>
                  <input
                    id="qb-date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div className="sm:col-span-1">
                  <label htmlFor="qb-time" className={labelClass}>
                    Time
                  </label>
                  <select
                    id="qb-time"
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className={inputClass}
                  >
                    <option value="">Any time</option>
                    {TIME_SLOTS.map((t) => (
                      <option key={t.value} value={t.value}>
                        {t.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="qb-notes" className={labelClass}>
                    Notes (optional)
                  </label>
                  <input
                    id="qb-notes"
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Stairs, parking, fragile items..."
                    className={inputClass}
                  />
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="mt-7 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <p className="text-xs text-[#1e3a5f]/60 max-w-sm flex items-start gap-2">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mt-0.5 shrink-0 text-[#25D366]"
                  aria-hidden="true"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                Opens WhatsApp with your trip details pre-filled. Reply usually
                within minutes during the day.
              </p>
              <div className="sm:shrink-0">
                {ready ? (
                  <CTAButton
                    intent="whatsapp"
                    variant="primary"
                    size="lg"
                    href={href}
                    label="Send on WhatsApp"
                    fullWidth
                  />
                ) : (
                  <button
                    type="button"
                    disabled
                    aria-disabled="true"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 font-semibold rounded-full px-6 py-3 text-base sm:px-8 sm:py-4 sm:text-lg bg-[#25D366]/40 text-white cursor-not-allowed select-none"
                  >
                    Send on WhatsApp
                  </button>
                )}
              </div>
            </div>

            {!ready && (
              <p className="mt-3 text-xs text-[#1e3a5f]/50">
                Fill in <strong>Pickup</strong>, <strong>Destination</strong> and{" "}
                <strong>Service</strong> to send.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Pin({
  variant,
  active,
}: {
  variant: "start" | "end";
  active: boolean;
}) {
  const colour = variant === "start" ? "#87CEEB" : "#1e3a5f";
  return (
    <div className="relative">
      <svg
        width="28"
        height="36"
        viewBox="0 0 24 32"
        aria-hidden="true"
        className={`drop-shadow-sm transition-transform ${active ? "scale-110" : ""}`}
      >
        <path
          d="M12 0C5.4 0 0 5.4 0 12c0 9 12 20 12 20s12-11 12-20C24 5.4 18.6 0 12 0z"
          fill={colour}
        />
        <circle cx="12" cy="12" r="4.5" fill="white" />
      </svg>
      <div
        aria-hidden="true"
        className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-1 rounded-full bg-black/20 blur-sm transition-opacity ${active ? "opacity-60" : "opacity-30"}`}
      />
    </div>
  );
}

function RouteIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="6" cy="19" r="2" />
      <circle cx="18" cy="5" r="2" />
      <path d="M8 19h6a4 4 0 0 0 0-8h-4a4 4 0 0 1 0-8h6" />
    </svg>
  );
}

function MapBackdrop() {
  return (
    <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="qb-grid"
            width="48"
            height="48"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 48 0 L 0 0 0 48"
              fill="none"
              stroke="#87CEEB"
              strokeOpacity="0.25"
              strokeWidth="1"
            />
          </pattern>
          <pattern
            id="qb-grid-minor"
            width="12"
            height="12"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 12 0 L 0 0 0 12"
              fill="none"
              stroke="#87CEEB"
              strokeOpacity="0.1"
              strokeWidth="0.5"
            />
          </pattern>
          <radialGradient id="qb-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#87CEEB" stopOpacity="0.18" />
            <stop offset="60%" stopColor="#87CEEB" stopOpacity="0.04" />
            <stop offset="100%" stopColor="#87CEEB" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#qb-grid-minor)" />
        <rect width="100%" height="100%" fill="url(#qb-grid)" />
        <rect width="100%" height="100%" fill="url(#qb-glow)" />
        {/* A few decorative "roads" */}
        <path
          d="M-50 80 Q 300 60 600 140 T 1500 100"
          stroke="#1e3a5f"
          strokeOpacity="0.06"
          strokeWidth="14"
          fill="none"
        />
        <path
          d="M-50 300 Q 400 280 800 360 T 1600 320"
          stroke="#1e3a5f"
          strokeOpacity="0.05"
          strokeWidth="10"
          fill="none"
        />
        <path
          d="M200 -50 Q 280 200 360 400 T 500 900"
          stroke="#1e3a5f"
          strokeOpacity="0.05"
          strokeWidth="8"
          fill="none"
        />
      </svg>
    </div>
  );
}
