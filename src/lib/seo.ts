import type { Metadata } from "next";
import { BUSINESS } from "@/data/business";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://vswiftlogistics.netlify.app";

export const DEFAULT_OG_IMAGE = {
  url: `${SITE_URL}/mainlogo.png`,
  width: 1184,
  height: 864,
  alt: `${BUSINESS.name} Logo`,
  type: "image/png" as const,
};

export interface BuildMetadataOptions {
  title: string;
  description: string;
  path: string;
  image?: {
    url: string;
    width: number;
    height: number;
    alt: string;
    type?: string;
  };
  noIndex?: boolean;
}

export function buildMetadata({
  title,
  description,
  path,
  image,
  noIndex,
}: BuildMetadataOptions): Metadata {
  const url = `${SITE_URL}${path === "/" ? "" : path}`;
  const og = image ?? DEFAULT_OG_IMAGE;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: BUSINESS.ogLocale,
      url,
      siteName: BUSINESS.name,
      title,
      description,
      images: [og],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [{ url: og.url, width: og.width, height: og.height, alt: og.alt }],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
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
  };
}
