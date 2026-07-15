/**
 * OVI Knowledge Home — Identity Metrics
 * Work Order 004 · Home Intelligence Integration
 *
 * Four identity stat cards displayed below the hero section.
 */

import type { HomeCmsEntity, HomeLocale } from "./types";

export interface IdentityMetricLocale {
  value: string;
  label: string;
}

export interface HomeIdentityMetric extends HomeCmsEntity {
  locales: Record<HomeLocale, IdentityMetricLocale>;
}

export const identityMetrics: HomeIdentityMetric[] = [
  {
    slug: "metric-360-integration",
    seoTitle: "Integración Operativa 360°",
    seoDescription: "OVI ofrece integración operativa 360° para limpieza industrial.",
    keywords: ["integración operativa", "360", "limpieza industrial"],
    images: [],
    icon: "refresh-cw",
    order: 1,
    status: "active",
    featured: true,
    locales: {
      es: { value: "360°", label: "Integración operativa" },
      en: { value: "360°", label: "Operational integration" },
    },
  },
  {
    slug: "metric-ai-os",
    seoTitle: "Tecnología Aplicada — OVI AI + OVI OS",
    seoDescription: "OVI AI y OVI OS como tecnología aplicada para operaciones de limpieza.",
    keywords: ["OVI AI", "OVI OS", "tecnología aplicada"],
    images: [],
    icon: "cpu",
    order: 2,
    status: "active",
    featured: true,
    locales: {
      es: { value: "IA + OVI OS", label: "Tecnología aplicada" },
      en: { value: "AI + OVI OS", label: "Applied technology" },
    },
  },
  {
    slug: "metric-protocols",
    seoTitle: "Protocolos — Ejecución Estandarizada",
    seoDescription: "Protocolos especializados para ejecución estandarizada en limpieza industrial.",
    keywords: ["protocolos", "ejecución estandarizada", "limpieza"],
    images: [],
    icon: "file-check",
    order: 3,
    status: "active",
    featured: true,
    locales: {
      es: { value: "Protocolos", label: "Ejecución estandarizada" },
      en: { value: "Protocols", label: "Standardized execution" },
    },
  },
  {
    slug: "metric-results",
    seoTitle: "Resultados — Impacto Medible",
    seoDescription: "Resultados con impacto medible en cada operación de limpieza.",
    keywords: ["resultados", "impacto medible", "operación"],
    images: [],
    icon: "trending-up",
    order: 4,
    status: "active",
    featured: true,
    locales: {
      es: { value: "Resultados", label: "Impacto medible" },
      en: { value: "Results", label: "Measurable impact" },
    },
  },
];
