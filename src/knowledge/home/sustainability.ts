/**
 * OVI Knowledge Home — Sustainability Section
 * Work Order 004 · Home Intelligence Integration
 *
 * Sustainability impact cards and section heading.
 */

import type { HomeCmsEntity, HomeLocale } from "./types";

export interface SustainabilityItemLocale {
  value: string;
  label: string;
}

export interface SustainabilitySectionLocale {
  badge: string;
  heading: string;
  body: string;
  cta: string;
  items: SustainabilityItemLocale[];
}

export interface HomeSustainabilitySection extends HomeCmsEntity {
  locales: Record<HomeLocale, SustainabilitySectionLocale>;
}

export const homeSustainability: HomeSustainabilitySection = {
  slug: "home-sustainability",
  seoTitle: "Sostenibilidad — OVI Ingeniería en Limpieza",
  seoDescription:
    "Diseñamos soluciones que combinan productividad y responsabilidad ambiental con resultados verificables.",
  keywords: [
    "sostenibilidad",
    "ahorro de agua",
    "reducción química",
    "impacto ambiental",
    "eficiencia operativa",
  ],
  images: [],
  icon: "leaf",
  order: 7,
  status: "active",
  featured: true,
  locales: {
    es: {
      badge: "Sostenibilidad",
      heading: "Impacto medible para su operación y el entorno",
      body: "Diseñamos soluciones que combinan productividad y responsabilidad ambiental con resultados verificables en consumo de agua, uso químico, eficiencia operativa e impacto ambiental.",
      cta: "Explorar Soluciones",
      items: [
        { value: "Ahorro de agua", label: "Reducción de consumo hídrico por operación" },
        { value: "Optimización de procesos", label: "Menos reprocesos y mayor eficiencia" },
        { value: "Reducción del consumo químico", label: "Uso técnico y controlado de insumos" },
        { value: "Mayor productividad", label: "Más rendimiento operativo con menos recursos" },
        { value: "Menor impacto ambiental", label: "Operación más limpia y responsable" },
      ],
    },
    en: {
      badge: "Sustainability",
      heading: "Measurable impact for your operation and the environment",
      body: "We design solutions that combine productivity and environmental responsibility with verifiable results in water consumption, chemical use, operational efficiency, and environmental impact.",
      cta: "Explore Solutions",
      items: [
        { value: "Water savings", label: "Reduction in water consumption per operation" },
        { value: "Process optimization", label: "Fewer reworks and greater efficiency" },
        { value: "Reduced chemical use", label: "Technical and controlled use of inputs" },
        { value: "Higher productivity", label: "More operational output with fewer resources" },
        { value: "Lower environmental impact", label: "Cleaner and more responsible operations" },
      ],
    },
  },
} as const;
