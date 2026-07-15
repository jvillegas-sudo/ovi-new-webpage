/**
 * OVI Knowledge Home — Hero Content
 * Work Order 004 · Home Intelligence Integration
 *
 * Hero section text for the cinematic home experience.
 * Consumed by HomeCinematicJourney and page metadata.
 */

import type { HomeCmsEntity, HomeLocale } from "./types";

export interface HeroLocaleContent {
  badge: string;
  title: string;
  subtitle: string;
  story: readonly [string, string, string, string];
}

export interface HomeHeroContent extends HomeCmsEntity {
  locales: Record<HomeLocale, HeroLocaleContent>;
}

export const homeHero: HomeHeroContent = {
  // ─── CMS metadata ──────────────────────────────────────────────────────────
  slug: "home-hero",
  seoTitle: "OVI — Ingeniería en Limpieza",
  seoDescription:
    "OVI — Ingeniería en Limpieza. Diseñamos soluciones integrales para resolver desafíos de limpieza, mantenimiento e higiene mediante diagnóstico técnico, protocolos especializados, servicios y tecnología aplicada.",
  keywords: [
    "limpieza industrial",
    "ingeniería en limpieza",
    "OVI",
    "soluciones integrales",
    "protocolos de limpieza",
  ],
  images: [],
  icon: "droplets",
  order: 1,
  status: "active",
  featured: true,

  // ─── Localized content ────────────────────────────────────────────────────
  locales: {
    es: {
      badge: "OVI — Ingeniería en Limpieza",
      title: "INGENIERÍA EN LIMPIEZA",
      subtitle:
        "Diseñamos soluciones especializadas para resolver desafíos de limpieza, mantenimiento e higiene industrial mediante conocimiento, productos, servicios y tecnología.",
      story: [
        "Una microgota se suspende en silencio.",
        "El impacto activa una limpieza controlada.",
        "La superficie revela el logo oficial OVI.",
        "La transición abre la experiencia de Ingeniería en Limpieza.",
      ],
    },
    en: {
      // TODO: Activate when EN locale is officially approved from master Spanish content.
      badge: "OVI — Cleaning Engineering",
      title: "CLEANING ENGINEERING",
      subtitle:
        "We design intelligent solutions to solve cleaning, maintenance, and hygiene challenges through specialized products, services, technology, artificial intelligence, and OVI OS.",
      story: [
        "A single drop of water appears.",
        "That drop transforms into operational energy.",
        "Energy evolves into operational intelligence.",
        "Intelligence turns into real industrial solutions.",
      ],
    },
  },
} as const;
