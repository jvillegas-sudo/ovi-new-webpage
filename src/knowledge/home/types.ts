/**
 * OVI Knowledge Home — Shared Types
 * Work Order 004 · Home Intelligence Integration
 *
 * CMS-ready interface and i18n type definitions for all home content entities.
 */

// ─── i18n ─────────────────────────────────────────────────────────────────────

/** Active locale: 'es'. English scaffolded for future activation. */
export type HomeLocale = "es" | "en";

// ─── CMS-Ready base interface ─────────────────────────────────────────────────

/**
 * Every home content entity implements this interface.
 * Future CMS integration replaces static exports with API calls behind this same contract.
 */
export interface HomeCmsEntity {
  slug: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  images: string[];
  icon: string;
  order: number;
  status: "active" | "draft" | "archived";
  featured: boolean;
}
