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
    slug: "metric-years-experience",
    seoTitle: "Más de 18 Años de Experiencia — OVI Ingeniería en Limpieza",
    seoDescription: "OVI lleva más de 18 años resolviendo desafíos de limpieza, mantenimiento e higiene en Colombia y la región.",
    keywords: ["experiencia", "años", "trayectoria", "limpieza industrial"],
    images: [],
    icon: "calendar",
    order: 1,
    status: "active",
    featured: true,
    locales: {
      es: { value: "+18 años", label: "Experiencia en operaciones reales" },
      en: { value: "+18 years", label: "Experience in real operations" },
    },
  },
  {
    slug: "metric-fleet-capacity",
    seoTitle: "Capacidad de Flota — OVI Ingeniería en Limpieza",
    seoDescription: "OVI tiene capacidad para atender flotas de hasta 7,000 vehículos pesados por mes.",
    keywords: ["flota", "capacidad", "vehículos pesados", "transporte"],
    images: [],
    icon: "truck",
    order: 2,
    status: "active",
    featured: true,
    locales: {
      es: { value: "+7,000 unidades/mes", label: "Capacidad en lavado de flota" },
      en: { value: "+7,000 units/month", label: "Fleet washing capacity" },
    },
  },
  {
    slug: "metric-sectors",
    seoTitle: "Sectores Atendidos — OVI Ingeniería en Limpieza",
    seoDescription: "OVI atiende 7 sectores industriales con protocolos especializados.",
    keywords: ["sectores", "industrias", "transporte", "industria", "alimentos"],
    images: [],
    icon: "layout-grid",
    order: 3,
    status: "active",
    featured: true,
    locales: {
      es: { value: "7 sectores", label: "Industrias con protocolos especializados" },
      en: { value: "7 sectors", label: "Industries with specialized protocols" },
    },
  },
  {
    slug: "metric-results",
    seoTitle: "Resultados — Impacto Medible en Operación",
    seoDescription: "Resultados medibles en consumo de agua, químicos y tiempos de ciclo en cada operación.",
    keywords: ["resultados", "impacto medible", "operación", "ahorro"],
    images: [],
    icon: "trending-up",
    order: 4,
    status: "active",
    featured: true,
    locales: {
      es: { value: "Resultados", label: "Impacto medible en cada operación" },
      en: { value: "Results", label: "Measurable impact in every operation" },
    },
  },
];
