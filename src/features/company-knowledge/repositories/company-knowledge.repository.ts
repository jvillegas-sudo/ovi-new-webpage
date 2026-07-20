/**
 * Company Knowledge Repository
 * OKP-001 — OVI Knowledge Program — Company Knowledge
 *
 * Stable abstraction layer for accessing the OVI company profile.
 * All platform modules must import from here, not from the data file directly.
 *
 * Usage:
 *   import { getCompanyProfile } from '@features/company-knowledge/repositories/...'
 *   // or via public API:
 *   import { getCompanyProfile } from '@features/company-knowledge'
 */

import type {
  CompanyProfile,
  CompanyCoreValue,
  CompanyDifferentiator,
  CompanyBusinessUnit,
  CompanyClientReference,
  CompanyFAQEntry,
  CompanyBrandAsset,
  CompanyCertification,
} from "../types/company-profile";
import type { PublicationStatus } from "../types/knowledge-governance";
import { OVI_COMPANY_PROFILE } from "../data/company-knowledge-data";

// ─── Core Accessor ────────────────────────────────────────────────────────────

/**
 * Return the full internal CompanyProfile.
 * Internal use only — includes governance fields, sources and unpublished data.
 * For public output use resolveCompanyProfile() from the resolver.
 */
export function getCompanyProfile(): CompanyProfile {
  return OVI_COMPANY_PROFILE;
}

// ─── Identity ─────────────────────────────────────────────────────────────────

/**
 * Return the official brand name.
 */
export function getBrandName(): string {
  return OVI_COMPANY_PROFILE.identity?.brandName ?? "OVI";
}

/**
 * Return the official tagline.
 */
export function getTagline(): string {
  return OVI_COMPANY_PROFILE.identity?.tagline ?? "Ingeniería en Limpieza";
}

/**
 * Return the corporate description.
 */
export function getDescription(): string | null {
  return OVI_COMPANY_PROFILE.identity?.description ?? null;
}

// ─── Core Values ──────────────────────────────────────────────────────────────

/**
 * Return all core values regardless of publication status.
 */
export function getAllCoreValues(): CompanyCoreValue[] {
  return OVI_COMPANY_PROFILE.coreValues ?? [];
}

/**
 * Return only published core values.
 */
export function getPublishedCoreValues(): CompanyCoreValue[] {
  return getAllCoreValues().filter((v) => v.publicationStatus === "published");
}

/**
 * Return a core value by its identifier.
 */
export function getCoreValueById(id: string): CompanyCoreValue | undefined {
  return getAllCoreValues().find((v) => v.id === id);
}

// ─── Differentiators ─────────────────────────────────────────────────────────

/**
 * Return all differentiators regardless of publication status.
 */
export function getAllDifferentiators(): CompanyDifferentiator[] {
  return OVI_COMPANY_PROFILE.differentiators ?? [];
}

/**
 * Return only published differentiators.
 */
export function getPublishedDifferentiators(): CompanyDifferentiator[] {
  return getAllDifferentiators().filter((d) => d.publicationStatus === "published");
}

// ─── Business Units ───────────────────────────────────────────────────────────

/**
 * Return all business units regardless of publication status.
 */
export function getAllBusinessUnits(): CompanyBusinessUnit[] {
  return OVI_COMPANY_PROFILE.businessUnits ?? [];
}

/**
 * Return only published business units.
 */
export function getPublishedBusinessUnits(): CompanyBusinessUnit[] {
  return getAllBusinessUnits().filter((u) => u.publicationStatus === "published");
}

// ─── Clients ─────────────────────────────────────────────────────────────────

/**
 * Return all client references regardless of visibility or publication status.
 * Internal use only — use getPublicClients() for external output.
 */
export function getAllClients(): CompanyClientReference[] {
  return OVI_COMPANY_PROFILE.clients ?? [];
}

/**
 * Return only clients that are public and published.
 * Confidential and permission-required clients are excluded.
 */
export function getPublicClients(): CompanyClientReference[] {
  return getAllClients().filter(
    (c) => c.visibility === "public" && c.publicationStatus === "published",
  );
}

// ─── Certifications ───────────────────────────────────────────────────────────

/**
 * Return all certifications regardless of publication status.
 */
export function getAllCertifications(): CompanyCertification[] {
  return OVI_COMPANY_PROFILE.certifications ?? [];
}

/**
 * Return only published certifications.
 */
export function getPublishedCertifications(): CompanyCertification[] {
  return getAllCertifications().filter((c) => c.publicationStatus === "published");
}

// ─── Brand Assets ─────────────────────────────────────────────────────────────

/**
 * Return all brand assets regardless of publication status.
 */
export function getAllBrandAssets(): CompanyBrandAsset[] {
  return OVI_COMPANY_PROFILE.brandAssets ?? [];
}

/**
 * Return only published brand assets.
 */
export function getPublishedBrandAssets(): CompanyBrandAsset[] {
  return getAllBrandAssets().filter((a) => a.publicationStatus === "published");
}

// ─── FAQs ─────────────────────────────────────────────────────────────────────

/**
 * Return all FAQ entries regardless of publication status.
 */
export function getAllFAQs(): CompanyFAQEntry[] {
  return OVI_COMPANY_PROFILE.faqs ?? [];
}

/**
 * Return only published FAQ entries.
 */
export function getPublishedFAQs(): CompanyFAQEntry[] {
  return getAllFAQs().filter((f) => f.publicationStatus === "published");
}

/**
 * Return FAQ entries by publication status.
 */
export function getFAQsByStatus(status: PublicationStatus): CompanyFAQEntry[] {
  return getAllFAQs().filter((f) => f.publicationStatus === status);
}

// ─── Profile Status ───────────────────────────────────────────────────────────

/**
 * Return the overall information status of the company profile.
 */
export function getProfileInformationStatus(): CompanyProfile["informationStatus"] {
  return OVI_COMPANY_PROFILE.informationStatus;
}
