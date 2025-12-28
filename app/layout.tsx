import type { Metadata, Viewport } from "next";
import { Geist, Playfair_Display } from "next/font/google";
import "./globals.css";
import { UIProvider } from "@/context/UIContext";

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
  title: {
    default: "vSwift Logistics | Professional Removals & Waste Disposal Services",
    template: "%s | vSwift Logistics",
  },
  description: "Professional, swift and reliable removals and waste disposal services. Fully insured with Goods In Transit cover up to £10,000 and Public Liability Insurance up to £2,000,000. Whole house moves, deliveries, recycling, and waste collection.",
  keywords: [
    "removals",
    "house removals",
    "home removals",
    "office removals",
    "waste disposal",
    "waste collection",
    "recycling services",
    "cardboard recycling",
    "paper recycling",
    "plastic recycling",
    "confidential waste disposal",
    "green waste disposal",
    "deliveries",
    "Luton van removals",
    "tail lift van",
    "waste carrier licence",
    "removals London",
    "UK removals",
    "24 hour removals",
    "emergency removals",
    "man and van",
    "furniture removals",
    "rubbish removal",
    "waste management",
    "commercial waste",
    "residential waste",
    "fully insured removals",
    "professional removals",
    "swift removals",
    "reliable removals",
  ],
  authors: [{ name: "vSwift Logistics" }],
  creator: "vSwift Logistics",
  publisher: "vSwift Logistics",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://vswift-logistics.netlify.app"
  ),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://vswift-logistics.netlify.app",
    siteName: "vSwift Logistics",
    title: "vSwift Logistics | Professional Removals & Waste Disposal Services",
    description: "Professional, swift and reliable removals and waste disposal services. Fully insured with Goods In Transit cover up to £10,000 and Public Liability Insurance up to £2,000,000.",
    images: [
      {
        url: "/mainlogo.png",
        width: 1200,
        height: 1200,
        alt: "vSwift Logistics Logo",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "vSwift Logistics | Professional Removals & Waste Disposal",
    description: "Professional, swift and reliable removals and waste disposal services. Fully insured and punctual service.",
    images: [
      {
        url: "/mainlogo.png",
        width: 1200,
        height: 1200,
        alt: "vSwift Logistics Logo",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add Google Search Console verification code when available
    // google: "your-verification-code",
  },
  category: "Logistics Services",
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
      { url: "/icon.png", type: "image/png", sizes: "16x16" },
    ],
    apple: [
      { url: "/apple-icon.png", type: "image/png", sizes: "180x180" },
    ],
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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${playfairDisplay.variable} antialiased`}
        suppressHydrationWarning
      >
        <UIProvider>
          {children}
        </UIProvider>
      </body>
    </html>
  );
}
