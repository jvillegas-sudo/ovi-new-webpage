/**
 * OVI Knowledge Home — Cinematic Scenes
 * Work Order 015 · OVI Cinematic DNA Replacement
 */

import type { HomeCmsEntity, HomeLocale } from "./types";

export interface CinematicSceneLocale {
  title: string;
  tagline: string;
}

export interface HomeCinematicScene extends HomeCmsEntity {
  sceneId: string;
  number: string;
  locales: Record<HomeLocale, CinematicSceneLocale>;
}

export const cinematicScenes: HomeCinematicScene[] = [
  {
    slug: "hero-oscuridad-gota",
    sceneId: "hero-drop",
    number: "01",
    seoTitle: "Oscuridad y Gota",
    seoDescription: "Una microgota suspendida activa la narrativa de limpieza de OVI.",
    keywords: ["gota", "limpieza", "OVI", "microgotas"],
    images: [],
    icon: "droplets",
    order: 1,
    status: "active",
    featured: true,
    locales: {
      es: {
        title: "Oscuridad y Gota",
        tagline: "Una gota controlada anuncia precisión, limpieza y tecnología OVI.",
      },
      en: {
        title: "Darkness and Drop",
        tagline: "A controlled drop introduces OVI precision cleaning technology.",
      },
    },
  },
  {
    slug: "hero-impacto-limpieza",
    sceneId: "hero-impact",
    number: "02",
    seoTitle: "Impacto",
    seoDescription: "La onda limpia una película de contaminación y revela superficie útil.",
    keywords: ["impacto", "onda", "limpieza industrial"],
    images: [],
    icon: "activity",
    order: 2,
    status: "active",
    featured: true,
    locales: {
      es: {
        title: "Impacto",
        tagline: "La onda de agua limpia y revela valor operativo en la superficie.",
      },
      en: {
        title: "Impact",
        tagline: "A controlled ripple cleans and reveals operational value.",
      },
    },
  },
  {
    slug: "hero-logo-ovi",
    sceneId: "hero-logo",
    number: "03",
    seoTitle: "Nacimiento del Logo OVI",
    seoDescription: "El logo oficial de OVI emerge desde agua, luz y cristal líquido.",
    keywords: ["logo OVI", "cristal líquido", "resplandor"],
    images: [],
    icon: "sparkles",
    order: 3,
    status: "active",
    featured: true,
    locales: {
      es: {
        title: "Nacimiento del Logo OVI",
        tagline: "El logo oficial aparece sobre una superficie limpia y técnica.",
      },
      en: {
        title: "OVI Logo Reveal",
        tagline: "The official OVI logo emerges over a clean technical surface.",
      },
    },
  },
  {
    slug: "escena-a-ingenieria",
    sceneId: "scene-a-engineering",
    number: "04",
    seoTitle: "Ingeniería en Limpieza",
    seoDescription: "Activos industriales con inspección de riesgo y solución OVI.",
    keywords: ["ingeniería en limpieza", "inspección", "activos industriales"],
    images: [],
    icon: "wrench",
    order: 4,
    status: "active",
    featured: true,
    locales: {
      es: {
        title: "Escena A — Ingeniería en Limpieza",
        tagline: "Inspección azul detecta riesgo y activa solución OVI sobre acero industrial.",
      },
      en: {
        title: "Scene A — Cleaning Engineering",
        tagline: "Blue inspection light detects risk and activates OVI intervention.",
      },
    },
  },
  {
    slug: "escena-b-sectores",
    sceneId: "scene-b-sectors",
    number: "05",
    seoTitle: "Sectores",
    seoDescription:
      "Portales de contenido oficial y pendiente para transporte, industria y energía.",
    keywords: ["sectores", "contenido oficial", "portales"],
    images: [],
    icon: "grid-2x2",
    order: 5,
    status: "active",
    featured: true,
    locales: {
      es: {
        title: "Escena B — Sectores",
        tagline: "Portales técnicos integran evidencia visual real y pendientes de validación.",
      },
      en: {
        title: "Scene B — Sectors",
        tagline: "Technical portals combine official evidence and pending approved assets.",
      },
    },
  },
  {
    slug: "escena-c-transformacion",
    sceneId: "scene-c-transformation",
    number: "06",
    seoTitle: "Transformación",
    seoDescription: "Secuencia completa de limpieza técnica con producto oficial OVI.",
    keywords: ["transformación", "espuma", "vapor", "producto OVI"],
    images: [],
    icon: "refresh-cw",
    order: 6,
    status: "active",
    featured: true,
    locales: {
      es: {
        title: "Escena C — Transformación",
        tagline: "Agua, espuma y vapor muestran intervención técnica con resultado verificable.",
      },
      en: {
        title: "Scene C — Transformation",
        tagline: "Water, foam, and steam depict a technical cleaning intervention.",
      },
    },
  },
  {
    slug: "entrada-universo-ovi",
    sceneId: "entry-transition",
    number: "07",
    seoTitle: "Entrada",
    seoDescription: "Transición líquida hacia el ecosistema digital OVI sin corte de página.",
    keywords: ["entrada", "transición líquida", "ecosistema OVI"],
    images: [],
    icon: "move-right",
    order: 7,
    status: "active",
    featured: true,
    locales: {
      es: {
        title: "Entrada",
        tagline: "Transición cinematográfica hacia el ecosistema OVI sin romper la inmersión.",
      },
      en: {
        title: "Entry",
        tagline: "Cinematic transition into the OVI ecosystem without page cut.",
      },
    },
  },
] as const;
