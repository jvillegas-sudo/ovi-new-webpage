/**
 * OVI Knowledge Home — Contact / CTA Section
 * Work Order 004 · Home Intelligence Integration
 *
 * Final contact section heading, body, and CTA buttons.
 */

import type { HomeCmsEntity, HomeLocale } from "./types";

export interface ContactSectionLocale {
  heading: string;
  body: string;
  primaryCta: string;
  secondaryCta: string;
}

export interface HomeContactSection extends HomeCmsEntity {
  locales: Record<HomeLocale, ContactSectionLocale>;
}

export const homeContact: HomeContactSection = {
  slug: "home-contact",
  seoTitle: "Contacto — OVI Ingeniería en Limpieza",
  seoDescription:
    "Conversemos sobre su operación y diseñemos la solución adecuada para sus desafíos de limpieza.",
  keywords: ["contacto", "OVI", "solución de limpieza", "ingeniero"],
  images: [],
  icon: "mail",
  order: 10,
  status: "active",
  featured: false,
  locales: {
    es: {
      heading: "Contacto",
      body: "Conversemos sobre su operación y diseñemos la solución adecuada para sus desafíos de limpieza, mantenimiento e higiene.",
      primaryCta: "▶ Iniciar la Experiencia",
      secondaryCta: "Hablar con un Ingeniero",
    },
    en: {
      heading: "Contact",
      body: "Let's talk about your operation and design the right solution for your cleaning, maintenance, and hygiene challenges.",
      primaryCta: "▶ Start the Experience",
      secondaryCta: "Talk to an Engineer",
    },
  },
} as const;
