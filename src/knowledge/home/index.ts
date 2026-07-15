/**
 * OVI Knowledge Home — Main Export Barrel
 * Work Order 004 · Home Intelligence Integration
 *
 * Single entry point for all home page content entities.
 * Import via: import { homeHero, getHomeSectors } from '@knowledge/home'
 */

// ─── Types ────────────────────────────────────────────────────────────────────
export type { HomeLocale, HomeCmsEntity } from "./types";

// ─── Hero ─────────────────────────────────────────────────────────────────────
export type { HeroLocaleContent, HomeHeroContent } from "./hero";
export { homeHero } from "./hero";

// ─── Identity Metrics ─────────────────────────────────────────────────────────
export type { IdentityMetricLocale, HomeIdentityMetric } from "./identity-metrics";
export { identityMetrics } from "./identity-metrics";

// ─── Engineering Pillars + About ──────────────────────────────────────────────
export type {
  EngineeringPillarLocale,
  EngineeringSectionLocale,
  HomeEngineeringSection,
  AboutSectionLocale,
  HomeAboutSection,
} from "./engineering-pillars";
export { homeEngineering, homeAbout } from "./engineering-pillars";

// ─── Sustainability ───────────────────────────────────────────────────────────
export type {
  SustainabilityItemLocale,
  SustainabilitySectionLocale,
  HomeSustainabilitySection,
} from "./sustainability";
export { homeSustainability } from "./sustainability";

// ─── Success Cases ────────────────────────────────────────────────────────────
export type {
  SuccessCaseLocale,
  HomeSuccessCase,
  SuccessCasesSectionLocale,
  HomeSuccessCasesSection,
} from "./success-cases";
export { successCases, successCasesSectionMeta } from "./success-cases";

// ─── OVI OS ───────────────────────────────────────────────────────────────────
export type {
  OviOsFeatureLocale,
  OviOsSectionLocale,
  HomeOviOsSection,
} from "./ovi-os";
export { homeOviOs } from "./ovi-os";

// ─── OVI AI ───────────────────────────────────────────────────────────────────
export type { OviAiSectionLocale, HomeOviAiSection } from "./ovi-ai";
export { homeOviAi } from "./ovi-ai";

// ─── Contact / CTA ────────────────────────────────────────────────────────────
export type { ContactSectionLocale, HomeContactSection } from "./contact";
export { homeContact } from "./contact";

// ─── Cinematic Scenes ─────────────────────────────────────────────────────────
export type { CinematicSceneLocale, HomeCinematicScene } from "./cinematic-scenes";
export { cinematicScenes } from "./cinematic-scenes";

// ─── Sector Display ───────────────────────────────────────────────────────────
export type { SectorDisplayConfig } from "./sector-display";
export { sectorDisplayConfigs, getSectorDisplayConfig } from "./sector-display";

// ─── Queries ─────────────────────────────────────────────────────────────────
export type { HomeDisplaySector, HomeDisplayService, HomeDisplayProduct } from "./queries";
export { getHomeSectors, getHomeServices, getHomeProducts } from "./queries";

// ─── Section metadata ─────────────────────────────────────────────────────────
export type {
  SectorsSectionLocale,
  HomeSectorsSection,
  ServicesSectionLocale,
  HomeServicesSection,
  ProductsSectionLocale,
  HomeProductsSection,
} from "./sections";
export { homeSectorsSection, homeServicesSection, homeProductsSection } from "./sections";

// ─── Module metadata ──────────────────────────────────────────────────────────
export const HOME_KB_VERSION = "1.0.0";
export const HOME_KB_PHASE = "FASE 1 — Work Order 004";
export const HOME_KB_STATUS = "ACTIVE";
