/**
 * Site Configuration
 *
 * Central configuration for all site-wide settings.
 * This is the single source of truth for metadata, navigation,
 * contact details, and other site-wide constants.
 *
 * Source: www.oviventures.com
 */

export const siteConfig = {
  name: "OVI Ventures",
  tagline: "Industrial Biotechnology & Cleaning Technology",
  description:
    "OVI Ventures is a leader in industrial biotechnology and cleaning technology, delivering science-driven solutions for a cleaner, more sustainable world.",
  url: process.env.NEXT_PUBLIC_APP_URL ?? "https://oviventures.com",
  ogImage: "/og-image.jpg",
  keywords: [
    "industrial biotechnology",
    "cleaning technology",
    "sustainable solutions",
    "OVI Ventures",
    "bioclean",
    "industrial cleaning",
    "green chemistry",
    "microbiological solutions",
  ],

  // ─── Contact ───────────────────────────────────────────────────────────────
  contact: {
    email: "info@oviventures.com",
    phone: "",
    address: "",
  },

  // ─── Social ────────────────────────────────────────────────────────────────
  social: {
    linkedin: "https://www.linkedin.com/company/oviventures",
    instagram: "",
    twitter: "",
    youtube: "",
  },

  // ─── Navigation ────────────────────────────────────────────────────────────
  nav: {
    main: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Solutions", href: "/solutions" },
      { label: "Products", href: "/products" },
      { label: "Technology", href: "/technology" },
      { label: "Sustainability", href: "/sustainability" },
      { label: "Contact", href: "/contact" },
    ],
    cta: {
      label: "Get in Touch",
      href: "/contact",
    },
  },

  // ─── Footer ────────────────────────────────────────────────────────────────
  footer: {
    groups: [
      {
        title: "Company",
        links: [
          { label: "About OVI", href: "/about" },
          { label: "Technology", href: "/technology" },
          { label: "Sustainability", href: "/sustainability" },
          { label: "Careers", href: "/careers" },
        ],
      },
      {
        title: "Solutions",
        links: [
          { label: "Industrial Cleaning", href: "/solutions/industrial-cleaning" },
          { label: "Biotechnology", href: "/solutions/biotechnology" },
          { label: "Custom Formulations", href: "/solutions/custom" },
        ],
      },
      {
        title: "Contact",
        links: [
          { label: "Get in Touch", href: "/contact" },
          { label: "Support", href: "/support" },
          { label: "Partners", href: "/partners" },
        ],
      },
    ],
    legal: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
    copyright: `© ${new Date().getFullYear()} OVI Ventures. All rights reserved.`,
  },
} as const;

export type SiteConfig = typeof siteConfig;
