/**
 * OVI Knowledge Home — Success Cases
 * Work Order 004 · Home Intelligence Integration
 *
 * Featured application case studies for the home page.
 */

import type { HomeCmsEntity, HomeLocale } from "./types";

export interface SuccessCaseLocale {
  title: string;
  detail: string;
}

export interface HomeSuccessCase extends HomeCmsEntity {
  locales: Record<HomeLocale, SuccessCaseLocale>;
}

export interface SuccessCasesSectionLocale {
  badge: string;
  heading: string;
}

export interface HomeSuccessCasesSection extends HomeCmsEntity {
  locales: Record<HomeLocale, SuccessCasesSectionLocale>;
}

export const successCasesSectionMeta: HomeSuccessCasesSection = {
  slug: "home-success-cases",
  seoTitle: "Casos de Éxito — OVI Ingeniería en Limpieza",
  seoDescription:
    "Resultados reales de OVI en entornos de alta exigencia operativa. Industria, transporte e infraestructura.",
  keywords: ["casos de éxito", "resultados reales", "limpieza industrial", "operación"],
  images: [],
  icon: "check-circle",
  order: 8,
  status: "active",
  featured: true,
  locales: {
    es: {
      badge: "Casos de Éxito",
      heading: "Resultados reales en entornos de alta exigencia operativa",
    },
    en: {
      badge: "Success Cases",
      heading: "Real results in high-demand operational environments",
    },
  },
} as const;

export const successCases: HomeSuccessCase[] = [
  {
    slug: "caso-operacion-industrial-multi-sitio",
    seoTitle: "Caso 01 — Operación industrial multi-sitio",
    seoDescription:
      "Estandarización de protocolos y mejora de control operativo en múltiples instalaciones.",
    keywords: ["industria", "multi-sitio", "estandarización", "protocolos"],
    images: [],
    icon: "factory",
    order: 1,
    status: "active",
    featured: true,
    locales: {
      es: {
        title: "Caso 01 — Operación industrial multi-sitio",
        detail:
          "Estandarización de protocolos y mejora de control operativo en múltiples instalaciones.",
      },
      en: {
        title: "Case 01 — Multi-site industrial operation",
        detail:
          "Protocol standardization and improved operational control across multiple facilities.",
      },
    },
  },
  {
    slug: "caso-flota-transporte-alto-uso",
    seoTitle: "Caso 02 — Flota de transporte de alto uso",
    seoDescription:
      "Reducción de tiempos de limpieza y menor consumo de agua por unidad atendida.",
    keywords: ["flota", "transporte", "consumo hídrico", "tiempo de ciclo"],
    images: [],
    icon: "truck",
    order: 2,
    status: "active",
    featured: true,
    locales: {
      es: {
        title: "Caso 02 — Flota de transporte de alto uso",
        detail: "Reducción de tiempos de limpieza y menor consumo de agua por unidad atendida.",
      },
      en: {
        title: "Case 02 — High-use transport fleet",
        detail: "Reduced cleaning times and lower water consumption per serviced unit.",
      },
    },
  },
  {
    slug: "caso-infraestructura-critica",
    seoTitle: "Caso 03 — Infraestructura crítica",
    seoDescription:
      "Implementación de limpieza técnica con trazabilidad e indicadores por proceso.",
    keywords: ["infraestructura crítica", "trazabilidad", "indicadores", "limpieza técnica"],
    images: [],
    icon: "building-2",
    order: 3,
    status: "active",
    featured: true,
    locales: {
      es: {
        title: "Caso 03 — Infraestructura crítica",
        detail: "Implementación de limpieza técnica con trazabilidad e indicadores por proceso.",
      },
      en: {
        title: "Case 03 — Critical infrastructure",
        detail: "Technical cleaning implementation with traceability and per-process indicators.",
      },
    },
  },
];
