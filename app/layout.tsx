import type { Metadata, Viewport } from "next";
import { Geist, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import JsonLd from "@/components/ui/JsonLd";
import { movingCompanySchema, websiteSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { BUSINESS } from "@/data/business";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  ...buildMetadata({
    title: `${BUSINESS.name} | Professional Removals & Waste Disposal`,
    description: `Professional, swift and reliable removals and waste disposal services. ${BUSINESS.insurance.summary}`,
    path: "/",
  }),
  title: {
    default: `${BUSINESS.name} | Professional Removals & Waste Disposal`,
    template: `%s | ${BUSINESS.name}`,
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://vswiftlogistics.netlify.app"
  ),
  authors: [{ name: BUSINESS.name }],
  creator: BUSINESS.name,
  publisher: BUSINESS.name,
  category: "Logistics Services",
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
      { url: "/icon.png", type: "image/png", sizes: "16x16" },
    ],
    apple: [{ url: "/apple-icon.png", type: "image/png", sizes: "180x180" }],
    shortcut: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#87CEEB" },
    { media: "(prefers-color-scheme: dark)", color: "#87CEEB" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={BUSINESS.locale}>
      <body
        className={`${geistSans.variable} ${playfairDisplay.variable} antialiased bg-[#fafafa] text-[#1e3a5f]`}
        suppressHydrationWarning
      >
        <JsonLd data={[movingCompanySchema(), websiteSchema()]} />
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
