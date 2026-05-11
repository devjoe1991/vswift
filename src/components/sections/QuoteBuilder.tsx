"use client";

import { useMemo, useState } from "react";
import CTAButton from "@/components/ui/CTAButton";
import { BUSINESS } from "@/data/business";
import { services } from "@/data/services";

interface QuoteBuilderProps {
  preselectedServiceId?: string;
  heading?: string;
  subheading?: string;
  background?: "default" | "white" | "light";
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
  background = "default",
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

  const ready = fromArea.trim().length > 0 && toArea.trim().length > 0 && !!serviceId;

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
  }, [
    selectedService,
    fromArea,
    toArea,
    selectedSize,
    date,
    selectedSlot,
    notes,
  ]);

  const sectionBg =
    background === "white"
      ? "bg-white"
      : background === "light"
        ? "bg-[#f4f8fb]"
        : "bg-[#fafafa]";

  const inputClass =
    "w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-[#1e3a5f] placeholder:text-[#1e3a5f]/40 focus:outline-none focus:ring-2 focus:ring-[#87CEEB]/40 focus:border-[#87CEEB] transition-colors";
  const labelClass =
    "block text-xs uppercase tracking-wide text-[#1e3a5f]/60 mb-1.5 font-medium";

  return (
    <section
      id={id}
      className={`${sectionBg} ${compact ? "py-8" : "py-12 md:py-16"} px-4`}
    >
      <div className="max-w-4xl mx-auto">
        {!compact && (
          <div className="text-center mb-8 md:mb-10">
            <p className="text-xs uppercase tracking-[0.2em] text-[#87CEEB] font-semibold mb-2">
              Get a quote
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1e3a5f] leading-tight">
              {heading ?? "Tell us about your job"}
            </h2>
            <p className="text-[#1e3a5f]/70 mt-3 max-w-xl mx-auto">
              {subheading ??
                "Fill in the details and we'll WhatsApp you back with a price. Usually within minutes."}
            </p>
          </div>
        )}

        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5 sm:p-8">
          {compact && (
            <h3 className="font-serif text-2xl font-bold text-[#1e3a5f] mb-5 leading-tight">
              {heading ?? "Get a quote on WhatsApp"}
            </h3>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            <div>
              <label htmlFor="qb-from" className={labelClass}>
                From
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
            <div>
              <label htmlFor="qb-to" className={labelClass}>
                To
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
            <div>
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
              <textarea
                id="qb-notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Stairs, parking, fragile items, anything else we should know."
                rows={3}
                className={`${inputClass} resize-y`}
              />
            </div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <p className="text-xs text-[#1e3a5f]/60 max-w-sm">
              Opens WhatsApp with your details pre-filled. Reply usually within
              minutes during the day.
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
              Fill in <strong>From</strong>, <strong>To</strong> and{" "}
              <strong>Service</strong> to send.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
