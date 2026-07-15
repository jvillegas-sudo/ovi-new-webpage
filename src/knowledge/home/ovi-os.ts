/**
 * OVI Knowledge Home — OVI OS Section
 * Work Order 004 · Home Intelligence Integration
 *
 * OVI OS section heading, body, feature bullets, and CTA.
 */

import type { HomeCmsEntity, HomeLocale } from "./types";

export interface OviOsFeatureLocale {
  text: string;
  icon: string;
}

export interface OviOsSectionLocale {
  badge: string;
  heading: string;
  body: string;
  cta: string;
  features: OviOsFeatureLocale[];
}

export interface HomeOviOsSection extends HomeCmsEntity {
  locales: Record<HomeLocale, OviOsSectionLocale>;
}

export const homeOviOs: HomeOviOsSection = {
  slug: "home-ovi-os",
  seoTitle: "OVI OS — Centro Operativo Inteligente",
  seoDescription:
    "OVI OS centraliza información, indicadores operativos y recomendaciones inteligentes para elevar el control y la trazabilidad.",
  keywords: ["OVI OS", "centro operativo", "indicadores", "trazabilidad", "inteligencia operativa"],
  images: [],
  icon: "monitor-smartphone",
  order: 6,
  status: "active",
  featured: true,
  locales: {
    es: {
      badge: "OVI OS",
      heading: "Centro operativo inteligente para su gestión de limpieza",
      body: "OVI OS centraliza información, indicadores operativos y recomendaciones inteligentes para elevar el control, la trazabilidad y la toma de decisiones.",
      cta: "Conocer OVI OS",
      features: [
        { text: "Indicadores operativos en una sola vista", icon: "trending-up" },
        { text: "Recomendaciones inteligentes basadas en operación real", icon: "sparkles" },
        {
          text: "Integración entre protocolos, servicios, productos y ejecución",
          icon: "cpu",
        },
      ],
    },
    en: {
      badge: "OVI OS",
      heading: "Intelligent operations center for your cleaning management",
      body: "OVI OS centralizes information, operational indicators, and intelligent recommendations to enhance control, traceability, and decision-making.",
      cta: "Discover OVI OS",
      features: [
        { text: "Operational indicators in a single view", icon: "trending-up" },
        { text: "Intelligent recommendations based on real operations", icon: "sparkles" },
        {
          text: "Integration between protocols, services, products, and execution",
          icon: "cpu",
        },
      ],
    },
  },
} as const;
