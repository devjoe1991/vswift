"use client";

import Link from "next/link";
import Image from "next/image";
import CTAButton from "@/components/ui/CTAButton";
import { BUSINESS, FOOTER_LINK_GROUPS, SOCIAL_LINKS } from "@/data/business";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#87CEEB] text-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* Column 1: Brand + CTA */}
          <div className="md:col-span-1">
            <Link href="/" className="inline-flex items-center mb-4">
              <Image
                src="/mainlogo.png"
                alt={`${BUSINESS.name} Logo`}
                width={60}
                height={60}
                className="object-cover rounded-full"
              />
            </Link>
            <p className="text-sm text-white/90 mb-4">
              {BUSINESS.longDescription}
            </p>
            <CTAButton intent="whatsapp" variant="primary" size="md" label="WhatsApp Us" />
          </div>

          {/* Column 2: Company */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Company</h3>
            <ul className="flex flex-col gap-2">
              {FOOTER_LINK_GROUPS.company.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-white/90 hover:text-white transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Services</h3>
            <ul className="flex flex-col gap-2">
              {FOOTER_LINK_GROUPS.services.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-white/90 hover:text-white transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Contact</h3>
            <p className="text-sm text-white/90 mb-2">
              {BUSINESS.address.locality}, {BUSINESS.address.countryName}
            </p>
            <p className="text-sm text-white/90 mb-2">
              <a
                href={`tel:${BUSINESS.phoneE164}`}
                className="hover:text-white transition-colors underline-offset-4 hover:underline"
              >
                Tap to call
              </a>
            </p>
            <p className="text-sm text-white/90 mb-4">
              <a
                href={`mailto:${BUSINESS.email}`}
                className="hover:text-white transition-colors"
              >
                {BUSINESS.email}
              </a>
            </p>
            <p className="text-xs text-white/80 mb-1 font-semibold uppercase tracking-wide">Hours</p>
            <p className="text-sm text-white/90 mb-1">
              {BUSINESS.hours.summary}
            </p>
            {SOCIAL_LINKS.length > 0 && (
              <div className="flex gap-3 mt-4">
                {SOCIAL_LINKS.map((s) => (
                  <a
                    key={s.href}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/90 hover:text-white"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Trust strip */}
        <div className="border-t border-white/30 pt-6 mb-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-white/90">
          <p>Goods In Transit: up to {BUSINESS.insurance.goodsInTransit}</p>
          <p>Public Liability: up to {BUSINESS.insurance.publicLiability}</p>
          <p>{BUSINESS.licence.name} holder</p>
        </div>

        {/* Legal strip */}
        <div className="border-t border-white/30 pt-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
          <div className="flex flex-col gap-1">
            <p className="text-sm text-white/80">
              © {year} {BUSINESS.name}. All rights reserved.
            </p>
            <p className="text-xs text-white/70">
              {BUSINESS.legalName} | Company number {BUSINESS.registrationNo}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
