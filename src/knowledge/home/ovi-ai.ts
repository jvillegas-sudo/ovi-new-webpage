/**
 * OVI Knowledge Home — OVI AI Section
 * Work Order 004 · Home Intelligence Integration
 *
 * OVI AI section heading, body, and interactive preview copy.
 */

import type { HomeCmsEntity, HomeLocale } from "./types";

export interface OviAiSectionLocale {
  badge: string;
  heading: string;
  body: string;
  previewPlaceholder: string;
  previewNote: string;
}

export interface HomeOviAiSection extends HomeCmsEntity {
  locales: Record<HomeLocale, OviAiSectionLocale>;
}

export const homeOviAi: HomeOviAiSection = {
  slug: "home-ovi-ai",
  seoTitle: "OVI AI — Ingeniero Virtual para Limpieza Industrial",
  seoDescription:
    "OVI AI es el ingeniero virtual siempre disponible. Describa su desafío y descubra la solución recomendada.",
  keywords: ["OVI AI", "inteligencia artificial", "ingeniero virtual", "limpieza industrial"],
  images: [],
  icon: "bot",
  order: 5,
  status: "active",
  featured: true,
  locales: {
    es: {
      badge: "OVI AI",
      heading: "Pregúntele a OVI AI",
      body: "Describa su desafío y descubra la solución recomendada.",
      previewPlaceholder:
        "Ejemplo: Necesito limpiar una flota de buses con menor consumo de agua.",
      previewNote:
        "OVI AI estará disponible próximamente. Esta sección prepara la experiencia de interacción.",
    },
    en: {
      badge: "OVI AI",
      heading: "Ask OVI AI",
      body: "Describe your challenge and discover the recommended solution.",
      previewPlaceholder: "Example: I need to clean a bus fleet with lower water consumption.",
      previewNote:
        "OVI AI will be available soon. This section prepares the interaction experience.",
    },
  },
} as const;
