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
    "OVI diseña soluciones biodegradables que combinan productividad y responsabilidad ambiental. Más de 18 años reduciendo consumo de agua e insumos en operaciones reales.",
  keywords: [
    "sostenibilidad",
    "biodegradable",
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
      heading: "Productos biodegradables con impacto ambiental medible",
      body: "El portafolio OVI está formulado bajo principios de biodegradabilidad y química responsable. Todos los productos están diseñados para minimizar el impacto ambiental del efluente, reducir el consumo de agua por ciclo y disminuir la carga química total de la operación.",
      cta: "Explorar Soluciones",
      items: [
        { value: "100% biodegradables", label: "Productos formulados sin solventes clorados ni compuestos agresivos" },
        { value: "Ahorro hídrico", label: "Protocolos diseñados para reducir consumo de agua por ciclo" },
        { value: "Menos re-intervenciones", label: "Mantenimiento preventivo que reduce procesos correctivos" },
        { value: "Trazabilidad completa", label: "Documentación de cada intervención para auditoría ambiental" },
        { value: "Menor impacto en efluentes", label: "Formulaciones biodegradables con menor carga contaminante" },
      ],
    },
    en: {
      badge: "Sustainability",
      heading: "Biodegradable products with measurable environmental impact",
      body: "The OVI portfolio is formulated under biodegradability and responsible chemistry principles. All products are designed to minimize the environmental impact of effluent, reduce water consumption per cycle, and decrease the total chemical load of the operation.",
      cta: "Explore Solutions",
      items: [
        { value: "100% biodegradable", label: "Products formulated without chlorinated solvents or aggressive compounds" },
        { value: "Water savings", label: "Protocols designed to reduce water consumption per cycle" },
        { value: "Fewer re-interventions", label: "Preventive maintenance that reduces corrective processes" },
        { value: "Full traceability", label: "Documentation of every intervention for environmental audit" },
        { value: "Lower effluent impact", label: "Biodegradable formulations with lower contaminant load" },
      ],
    },
  },
} as const;
