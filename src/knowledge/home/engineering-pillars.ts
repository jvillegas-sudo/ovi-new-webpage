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
    "OVI no solo limpia. Diseñamos soluciones de ingeniería en limpieza con diagnóstico técnico, protocolos y tecnología.",
  keywords: ["ingeniería en limpieza", "diagnóstico técnico", "protocolos operativos"],
  images: [],
  icon: "wrench",
  order: 3,
  status: "active",
  featured: true,
  locales: {
    es: {
      badge: "Ingeniería en Limpieza",
      heading: "OVI no solo limpia. OVI diseña soluciones de ingeniería en limpieza.",
      body: "Cada proyecto combina diagnóstico técnico, diseño operativo, protocolos, tecnología e implementación en campo para generar resultados consistentes y medibles.",
      pillars: [
        { text: "Ingeniería aplicada para resolver problemas complejos de limpieza" },
        { text: "Tecnología y datos para decisiones operativas inteligentes" },
        { text: "Protocolos, productos y servicios diseñados como un solo sistema" },
        { text: "Sostenibilidad con impacto medible en operación real" },
      ],
    },
    en: {
      badge: "Cleaning Engineering",
      heading: "OVI doesn't just clean. OVI designs cleaning engineering solutions.",
      body: "Every project combines technical diagnostics, operational design, protocols, technology, and field implementation to generate consistent and measurable results.",
      pillars: [
        { text: "Applied engineering to solve complex cleaning problems" },
        { text: "Technology and data for intelligent operational decisions" },
        { text: "Protocols, products, and services designed as one system" },
        { text: "Sustainability with measurable impact on real operations" },
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
    "OVI integra ingeniería, tecnología, productos, servicios y protocolos para resolver desafíos complejos de limpieza.",
  keywords: ["OVI", "quiénes somos", "ingeniería en limpieza"],
  images: [],
  icon: "info",
  order: 2,
  status: "active",
  featured: false,
  locales: {
    es: {
      badge: "Quiénes Somos",
      heading: "Integramos ingeniería, tecnología y operación para transformar la limpieza",
      body: "OVI integra ingeniería, tecnología, productos, servicios, protocolos, inteligencia operacional y sostenibilidad para resolver desafíos complejos de limpieza, mantenimiento e higiene con una visión integral y de largo plazo.",
    },
    en: {
      badge: "Who We Are",
      heading: "We integrate engineering, technology, and operations to transform cleaning",
      body: "OVI integrates engineering, technology, products, services, protocols, operational intelligence, and sustainability to solve complex cleaning, maintenance, and hygiene challenges with a comprehensive, long-term vision.",
    },
  },
} as const;
