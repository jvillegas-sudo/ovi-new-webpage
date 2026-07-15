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
    slug: "caso-flota-transporte-pesado",
    seoTitle: "Caso: Flota de Transporte Pesado — OVI Ingeniería en Limpieza",
    seoDescription:
      "Reducción del tiempo de ciclo de lavado y menor consumo de agua por unidad en operación de flota pesada.",
    keywords: ["flota pesada", "transporte", "lavado de vehículos", "consumo de agua"],
    images: [],
    icon: "truck",
    order: 1,
    status: "active",
    featured: true,
    locales: {
      es: {
        title: "Flota de transporte pesado",
        detail:
          "Protocolo de lavado OVI Solwash implementado en patio con capacidad para atender más de 7,000 unidades por mes. Reducción del tiempo de ciclo por unidad y estandarización del consumo de agua entre operadores.",
      },
      en: {
        title: "Heavy transport fleet",
        detail:
          "OVI Solwash washing protocol implemented in yard with capacity to serve over 7,000 units per month. Reduced cycle time per unit and standardized water consumption across operators.",
      },
    },
  },
  {
    slug: "caso-planta-industrial-manufactura",
    seoTitle: "Caso: Planta Industrial de Manufactura — OVI Ingeniería en Limpieza",
    seoDescription:
      "Limpieza técnica de planta manufacturera con OVI Biodex y protocolo HACCP para líneas de producción.",
    keywords: ["planta industrial", "manufactura", "HACCP", "limpieza industrial"],
    images: [],
    icon: "factory",
    order: 2,
    status: "active",
    featured: true,
    locales: {
      es: {
        title: "Planta industrial de manufactura",
        detail:
          "Implementación de protocolo de desengrase con OVI Biodex en maquinaria y líneas de producción. Documentación de cada intervención con trazabilidad completa y cumplimiento de normativa de inocuidad.",
      },
      en: {
        title: "Industrial manufacturing plant",
        detail:
          "OVI Biodex degreasing protocol implemented on machinery and production lines. Full traceability documentation and food safety compliance achieved.",
      },
    },
  },
  {
    slug: "caso-instalacion-institucional",
    seoTitle: "Caso: Instalación Institucional — OVI Ingeniería en Limpieza",
    seoDescription:
      "Mantenimiento preventivo de pisos y superficies en instalación institucional de alto tráfico con OVI Ecoseal.",
    keywords: ["institucional", "mantenimiento preventivo", "pisos", "alto tráfico"],
    images: [],
    icon: "building-2",
    order: 3,
    status: "active",
    featured: true,
    locales: {
      es: {
        title: "Instalación institucional de alto tráfico",
        detail:
          "Programa de mantenimiento preventivo con OVI Ecoseal en instalación de alto tráfico. Reducción de la frecuencia de limpiezas correctivas y extensión del ciclo de mantenimiento con menor consumo de insumos.",
      },
      en: {
        title: "High-traffic institutional facility",
        detail:
          "Preventive maintenance program with OVI Ecoseal at high-traffic facility. Reduced corrective cleaning frequency and extended maintenance cycle with lower product consumption.",
      },
    },
  },
];
