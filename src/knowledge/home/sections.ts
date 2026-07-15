/**
 * OVI Knowledge Home — Sectors Section metadata
 * Work Order 004 · Home Intelligence Integration
 *
 * Section-level heading content for the sectors grid.
 */

import type { HomeCmsEntity, HomeLocale } from "./types";

export interface SectorsSectionLocale {
  badge: string;
  heading: string;
}

export interface HomeSectorsSection extends HomeCmsEntity {
  locales: Record<HomeLocale, SectorsSectionLocale>;
}

export const homeSectorsSection: HomeSectorsSection = {
  slug: "home-sectors",
  seoTitle: "Sectores — OVI Ingeniería en Limpieza",
  seoDescription:
    "OVI diseña soluciones para distintos entornos operativos: transporte, industria, salud, retail, alimentos y más.",
  keywords: ["sectores", "limpieza industrial", "transporte", "industria", "salud"],
  images: [],
  icon: "layout-grid",
  order: 4,
  status: "active",
  featured: true,
  locales: {
    es: {
      badge: "Sectores",
      heading: "Soluciones diseñadas para distintos entornos operativos",
    },
    en: {
      badge: "Sectors",
      heading: "Solutions designed for different operational environments",
    },
  },
} as const;

export interface ServicesSectionLocale {
  badge: string;
  heading: string;
  bullets: string[];
}

export interface HomeServicesSection extends HomeCmsEntity {
  locales: Record<HomeLocale, ServicesSectionLocale>;
}

export const homeServicesSection: HomeServicesSection = {
  slug: "home-services",
  seoTitle: "Servicios — OVI Ingeniería en Limpieza",
  seoDescription:
    "Diseño, ejecución y mejora continua de su operación de limpieza industrial con OVI.",
  keywords: ["servicios de limpieza", "diagnóstico técnico", "implementación", "OVI"],
  images: [],
  icon: "wrench",
  order: 5,
  status: "active",
  featured: true,
  locales: {
    es: {
      badge: "Servicios",
      heading: "Diseño, ejecución y mejora continua de su operación",
      bullets: [
        "Diagnóstico técnico de limpieza, mantenimiento e higiene",
        "Diseño de protocolos operativos por tipo de instalación",
        "Implementación en campo con control de desempeño",
        "Capacitación y acompañamiento técnico continuo",
      ],
    },
    en: {
      badge: "Services",
      heading: "Design, execution, and continuous improvement of your operation",
      bullets: [
        "Technical diagnosis of cleaning, maintenance, and hygiene",
        "Design of operational protocols by type of facility",
        "Field implementation with performance control",
        "Training and continuous technical support",
      ],
    },
  },
} as const;

export interface ProductsSectionLocale {
  badge: string;
  heading: string;
  cta: string;
  bullets: string[];
}

export interface HomeProductsSection extends HomeCmsEntity {
  locales: Record<HomeLocale, ProductsSectionLocale>;
}

export const homeProductsSection: HomeProductsSection = {
  slug: "home-products",
  seoTitle: "Productos — OVI Catálogo Técnico",
  seoDescription:
    "El producto correcto aparece después del diagnóstico correcto. OVI Catálogo Técnico.",
  keywords: ["productos", "catálogo técnico", "OVI", "insumos industriales"],
  images: [],
  icon: "package",
  order: 6,
  status: "active",
  featured: true,
  locales: {
    es: {
      badge: "Productos",
      heading: "El producto correcto aparece después del diagnóstico correcto",
      cta: "Ir al catálogo técnico",
      bullets: [
        "Productos especializados definidos como resultado del diagnóstico técnico",
        "Equipamiento y herramientas seleccionados según protocolo y nivel de riesgo",
        "Soluciones adaptadas por tipo de superficie, proceso, sector y objetivo operativo",
        "Integración de producto + método + control de resultados para continuidad operativa",
      ],
    },
    en: {
      badge: "Products",
      heading: "The right product comes after the right diagnosis",
      cta: "Go to technical catalogue",
      bullets: [
        "Specialized products defined as a result of the technical diagnosis",
        "Equipment and tools selected according to protocol and risk level",
        "Solutions adapted by surface type, process, sector, and operational objective",
        "Product + method + results control integration for operational continuity",
      ],
    },
  },
} as const;
