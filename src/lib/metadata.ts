/**
 * Lib: Metadata Builder
 *
 * Generates consistent Next.js metadata for all pages.
 * Ensures SEO best practices: OG tags, Twitter cards, canonical URLs.
 *
 * Usage:
 *   export const metadata = buildMetadata({
 *     title: 'About OVI',
 *     description: '...',
 *   })
 */

import type { Metadata } from "next";
import { siteConfig } from "@config/site";

interface MetadataOptions {
  title?: string;
  description?: string;
  image?: string;
  canonical?: string;
  noIndex?: boolean;
  keywords?: string[];
}

export function buildMetadata(options: MetadataOptions = {}): Metadata {
  const {
    title,
    description = siteConfig.description,
    image = siteConfig.ogImage,
    canonical,
    noIndex = false,
    keywords = [...siteConfig.keywords],
  } = options;

  const fullTitle = title
    ? `${title} — ${siteConfig.name}`
    : `${siteConfig.name} — ${siteConfig.tagline}`;

  const url = canonical ? `${siteConfig.url}${canonical}` : siteConfig.url;
  const imageUrl = image.startsWith("http") ? image : `${siteConfig.url}${image}`;

  return {
    title: fullTitle,
    description,
    keywords: keywords.join(", "),
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: siteConfig.name,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [imageUrl],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true } },
  };
}
