/**
 * OVI Knowledge Home — Engineering Pillars
 * Work Order 004 · Home Intelligence Integration
 *
 * Engineering section: heading, body, and bullet list of pillars.
 */

import type { HomeCmsEntity, HomeLocale } from "./types";

export interface EngineeringPillarLocale {
  text: string;
}

export interface EngineeringSectionLocale {
  badge: string;
  heading: string;
  body: string;
  pillars: EngineeringPillarLocale[];
}

export interface HomeEngineeringSection extends HomeCmsEntity {
  locales: Record<HomeLocale, EngineeringSectionLocale>;
}

export const homeEngineering: HomeEngineeringSection = {
  slug: "home-engineering",
  seoTitle: "Ingeniería en Limpieza — OVI",
  seoDescription:
    "OVI no solo limpia. Con más de 18 años de experiencia, diseñamos soluciones de ingeniería en limpieza con diagnóstico técnico, protocolos y tecnología.",
  keywords: ["ingeniería en limpieza", "diagnóstico técnico", "protocolos operativos", "18 años"],
  images: [],
  icon: "wrench",
  order: 3,
  status: "active",
  featured: true,
  locales: {
    es: {
      badge: "Ingeniería en Limpieza",
      heading: "OVI no solo limpia. OVI diseña soluciones de ingeniería en limpieza.",
      body: "Con más de 18 años de experiencia en operaciones reales, cada proyecto combina diagnóstico técnico, diseño operativo, protocolos, tecnología e implementación en campo para generar resultados consistentes y medibles.",
      pillars: [
        { text: "Más de 18 años resolviendo problemas complejos de limpieza industrial" },
        { text: "Capacidad para atender flotas de más de 7,000 vehículos pesados por mes" },
        { text: "Protocolos, productos y servicios diseñados como un solo sistema integrado" },
        { text: "Sostenibilidad con impacto medible: agua, químicos y eficiencia operativa" },
      ],
    },
    en: {
      badge: "Cleaning Engineering",
      heading: "OVI doesn't just clean. OVI designs cleaning engineering solutions.",
      body: "With over 18 years of experience in real operations, every project combines technical diagnostics, operational design, protocols, technology, and field implementation to generate consistent and measurable results.",
      pillars: [
        { text: "Over 18 years solving complex industrial cleaning problems" },
        { text: "Capacity to service fleets of over 7,000 heavy vehicles per month" },
        { text: "Protocols, products, and services designed as one integrated system" },
        { text: "Sustainability with measurable impact: water, chemicals, and operational efficiency" },
      ],
    },
  },
} as const;

export interface AboutSectionLocale {
  badge: string;
  heading: string;
  body: string;
}

export interface HomeAboutSection extends HomeCmsEntity {
  locales: Record<HomeLocale, AboutSectionLocale>;
}

export const homeAbout: HomeAboutSection = {
  slug: "home-about",
  seoTitle: "Quiénes Somos — OVI Ingeniería en Limpieza",
  seoDescription:
    "OVI lleva más de 18 años integrando ingeniería, tecnología, productos, servicios y protocolos para resolver desafíos complejos de limpieza.",
  keywords: ["OVI", "quiénes somos", "ingeniería en limpieza", "18 años"],
  images: [],
  icon: "info",
  order: 2,
  status: "active",
  featured: false,
  locales: {
    es: {
      badge: "Quiénes Somos",
      heading: "Más de 18 años transformando la operación de nuestros aliados",
      body: "OVI integra ingeniería, tecnología, productos, servicios, protocolos e inteligencia operacional para resolver desafíos complejos de limpieza, mantenimiento e higiene. Trabajamos en la industria pesada, transporte, alimentos, institucional y energía con una visión de largo plazo y compromiso de resultados.",
    },
    en: {
      badge: "Who We Are",
      heading: "Over 18 years transforming the operations of our partners",
      body: "OVI integrates engineering, technology, products, services, protocols, and operational intelligence to solve complex cleaning, maintenance, and hygiene challenges. We operate in heavy industry, transport, food, institutional, and energy sectors with a long-term vision and commitment to results.",
    },
  },
} as const;
