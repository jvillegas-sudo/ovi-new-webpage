/**
 * Site Configuration
 *
 * Central configuration for all site-wide settings.
 * This is the single source of truth for metadata, navigation,
 * contact details, and other site-wide constants.
 *
 * Source: www.ovi.com
 */

export const siteConfig = {
  name: "OVI",
  tagline: "Ingeniería en Limpieza",
  description:
    "OVI — Ingeniería en Limpieza. Diseñamos soluciones integrales para resolver desafíos de limpieza, mantenimiento e higiene industrial mediante diagnóstico técnico, protocolos especializados, servicios y tecnología aplicada.",
  url: process.env.NEXT_PUBLIC_APP_URL ?? "https://ovi.com",
  ogImage: "/og-image.jpg",
  keywords: [
    "limpieza industrial",
    "soluciones químicas biodegradables",
    "lavado de flota",
    "OVI",
    "ingeniería en limpieza",
    "impermeabilización",
    "post obra",
    "limpieza de infraestructura",
    "buenas prácticas ambientales",
  ],

  // ─── Contact ───────────────────────────────────────────────────────────────
  contact: {
    email: "info@ovi.com",
    phone: "",
    address: "",
  },

  // ─── Social ────────────────────────────────────────────────────────────────
  social: {
    linkedin: "https://www.linkedin.com/company/ovi",
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
      { label: "OVI Catálogo", href: "/store" },
      { label: "Ingeniería", href: "/engineering" },
      { label: "Metodología", href: "/technology" },
      { label: "Sostenibilidad", href: "/sustainability" },
      { label: "OVI Misiones", href: "/missions" },
      { label: "OVI Laboratorio", href: "/solution-lab" },
      { label: "OVI AI", href: "/ovi-ai" },
      { label: "OVI OS", href: "/ovi-os" },
      { label: "OVI Field", href: "/ovi-field" },
      { label: "OVI OPS", href: "/ovi-ops" },
      { label: "OVI Analytics", href: "/ovi-analytics" },
      { label: "OVI Command Center", href: "/ovi-command-center" },
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
          { label: "Ingeniería", href: "/engineering" },
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
        title: "Experiencias",
        links: [
          { label: "OVI Misiones", href: "/missions" },
          { label: "OVI Laboratorio", href: "/solution-lab" },
          { label: "OVI AI", href: "/ovi-ai" },
          { label: "OVI OS", href: "/ovi-os" },
          { label: "OVI Field", href: "/ovi-field" },
          { label: "OVI OPS", href: "/ovi-ops" },
          { label: "OVI Analytics", href: "/ovi-analytics" },
          { label: "OVI Command Center", href: "/ovi-command-center" },
        ],
      },
      {
        title: "Contacto",
        links: [
          { label: "Contáctenos", href: "/contact" },
          { label: "OVI Catálogo", href: "/store" },
        ],
      },
    ],
    legal: [
      { label: "Política de Privacidad", href: "/privacy" },
      { label: "Términos de Servicio", href: "/terms" },
    ],
    copyright: `© ${new Date().getFullYear()} OVI — Ingeniería en Limpieza. Todos los derechos reservados.`,
  },
} as const;

export type SiteConfig = typeof siteConfig;
