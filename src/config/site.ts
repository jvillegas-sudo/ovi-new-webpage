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
  tagline: "Limpieza Industrial & Soluciones Químicas Biodegradables",
  description:
    "OVI Ventures es líder en limpieza industrial, producción de soluciones químicas biodegradables y lavado de flota, comprometidos con el medio ambiente y las buenas prácticas ambientales.",
  url: process.env.NEXT_PUBLIC_APP_URL ?? "https://oviventures.com",
  ogImage: "/og-image.jpg",
  keywords: [
    "limpieza industrial",
    "soluciones químicas biodegradables",
    "lavado de flota",
    "OVI Ventures",
    "impermeabilización",
    "post obra",
    "limpieza de infraestructura",
    "buenas prácticas ambientales",
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
      { label: "Inicio", href: "/" },
      { label: "Nosotros", href: "/about" },
      { label: "Servicios", href: "/solutions" },
      { label: "Productos", href: "/products" },
      { label: "Metodología", href: "/technology" },
      { label: "Sostenibilidad", href: "/sustainability" },
      { label: "Contacto", href: "/contact" },
    ],
    cta: {
      label: "Contáctenos",
      href: "/contact",
    },
  },

  // ─── Footer ────────────────────────────────────────────────────────────────
  footer: {
    groups: [
      {
        title: "Empresa",
        links: [
          { label: "Nosotros", href: "/about" },
          { label: "Metodología", href: "/technology" },
          { label: "Sostenibilidad", href: "/sustainability" },
        ],
      },
      {
        title: "Servicios",
        links: [
          { label: "Soluciones Químicas", href: "/solutions" },
          { label: "Limpieza Industrial", href: "/solutions" },
          { label: "Lavado de Flota", href: "/solutions" },
        ],
      },
      {
        title: "Contacto",
        links: [
          { label: "Contáctenos", href: "/contact" },
          { label: "Productos", href: "/products" },
        ],
      },
    ],
    legal: [
      { label: "Política de Privacidad", href: "/privacy" },
      { label: "Términos de Servicio", href: "/terms" },
    ],
    copyright: `© ${new Date().getFullYear()} OVI Ventures. Todos los derechos reservados.`,
  },
} as const;

export type SiteConfig = typeof siteConfig;
