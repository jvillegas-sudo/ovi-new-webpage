/**
 * OVI Knowledge Home — Cinematic Scenes
 * Work Order 004 · Home Intelligence Integration
 *
 * Scene metadata for the Five-act cinematic hero experience.
 * Moved from HomeCinematicJourney.tsx — Three.js code is NOT affected.
 */

import type { HomeCmsEntity, HomeLocale } from "./types";

export interface CinematicSceneLocale {
  title: string;
  tagline: string;
}

export interface HomeCinematicScene extends HomeCmsEntity {
  /** Scene identifier used by the Three.js scene router */
  sceneId: string;
  /** Display number (e.g. "01") */
  number: string;
  locales: Record<HomeLocale, CinematicSceneLocale>;
}

export const cinematicScenes: HomeCinematicScene[] = [
  {
    slug: "scene-nacimiento-ovi",
    sceneId: "scene-water",
    number: "01",
    seoTitle: "Nacimiento OVI",
    seoDescription: "Una gota cae. La onda genera energía. Las partículas forman el universo.",
    keywords: ["nacimiento", "agua", "energía"],
    images: [],
    icon: "droplets",
    order: 1,
    status: "active",
    featured: true,
    locales: {
      es: {
        title: "Nacimiento OVI",
        tagline: "Una gota cae. La onda genera energía. Las partículas forman el universo.",
      },
      en: {
        title: "OVI Birth",
        tagline: "A drop falls. The wave generates energy. The particles form the universe.",
      },
    },
  },
  {
    slug: "scene-logo",
    sceneId: "scene-logo",
    number: "02",
    seoTitle: "El Logo OVI",
    seoDescription: "La energía se organiza. OVI nace desde el agua y la luz.",
    keywords: ["logo", "energía", "agua", "luz"],
    images: [],
    icon: "zap",
    order: 2,
    status: "active",
    featured: true,
    locales: {
      es: {
        title: "El Logo",
        tagline: "La energía se organiza. OVI nace desde el agua y la luz.",
      },
      en: {
        title: "The Logo",
        tagline: "Energy organizes itself. OVI is born from water and light.",
      },
    },
  },
  {
    slug: "scene-ingenieria",
    sceneId: "scene-industrial",
    number: "03",
    seoTitle: "Ingeniería en Limpieza",
    seoDescription: "Activos industriales. Vapor. Acero inoxidable. Superficies impecables.",
    keywords: ["ingeniería", "limpieza industrial", "acero inoxidable", "vapor"],
    images: [],
    icon: "wrench",
    order: 3,
    status: "active",
    featured: true,
    locales: {
      es: {
        title: "Ingeniería en Limpieza",
        tagline: "Activos industriales. Vapor. Acero inoxidable. Superficies impecables.",
      },
      en: {
        title: "Cleaning Engineering",
        tagline: "Industrial assets. Steam. Stainless steel. Impeccable surfaces.",
      },
    },
  },
  {
    slug: "scene-ovi-ai",
    sceneId: "scene-ai",
    number: "04",
    seoTitle: "OVI AI — Ingeniero Virtual",
    seoDescription: "Un ingeniero virtual. Siempre disponible. Presente en todo el universo.",
    keywords: ["OVI AI", "ingeniero virtual", "inteligencia artificial"],
    images: [],
    icon: "bot",
    order: 4,
    status: "active",
    featured: true,
    locales: {
      es: {
        title: "OVI AI",
        tagline: "Un ingeniero virtual. Siempre disponible. Presente en todo el universo.",
      },
      en: {
        title: "OVI AI",
        tagline: "A virtual engineer. Always available. Present throughout the universe.",
      },
    },
  },
  {
    slug: "scene-ecosistema",
    sceneId: "scene-ecosystem",
    number: "05",
    seoTitle: "Ecosistema OVI",
    seoDescription: "OVI AI · OVI OS · OVI Laboratorio · OVI Catálogo. Un solo universo integrado.",
    keywords: ["ecosistema OVI", "OVI AI", "OVI OS", "OVI Laboratorio", "OVI Catálogo"],
    images: [],
    icon: "layers",
    order: 5,
    status: "active",
    featured: true,
    locales: {
      es: {
        title: "Ecosistema OVI",
        tagline:
          "OVI AI · OVI OS · OVI Laboratorio · OVI Catálogo. Un solo universo integrado.",
      },
      en: {
        title: "OVI Ecosystem",
        tagline:
          "OVI AI · OVI OS · OVI Laboratory · OVI Catalogue. One single integrated universe.",
      },
    },
  },
] as const;
