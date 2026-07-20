/**
 * Company Knowledge Engine — Public API
 * OKP-001 — OVI Knowledge Program — Company Knowledge
 *
 * Single entry point for the company knowledge module.
 * All platform modules should import from here, not from internal paths.
 *
 * Usage:
 *   import { resolveCompanyProfile, getCompanyProfile } from '@features/company-knowledge'
 *
 * Architecture:
 *   Data layer:     src/features/company-knowledge/data/company-knowledge-data.ts
 *   Repository:     src/features/company-knowledge/repositories/company-knowledge.repository.ts
 *   Resolver:       src/features/company-knowledge/services/company-knowledge-resolver.ts
 *   Validator:      src/features/company-knowledge/services/company-knowledge-validator.ts
 *   Public output:  PublicCompanyProfile (via resolveCompanyProfile)
 *   AI context:     CompanyAIContext (via resolveCompanyAIContext)
 *   Search index:   CompanySearchDocument (via resolveCompanySearchDocument)
 *
 * Governance:
 *   - Only official repository sources are used.
 *   - Internal fields (sources, verificationStatus) are never exposed publicly.
 *   - Missing information stays absent — never invented.
 *   - See company/CONTENT_RULES.md for full governance rules.
 */

// ─── Types ────────────────────────────────────────────────────────────────────

export type {
  VerificationStatus,
  PublicationStatus,
  InformationStatus,
} from "./types/knowledge-governance";

export type { SourceType, SourceReference } from "./types/source-reference";

export type {
  GovernedField,
  CompanyIdentity,
  CompanyMission,
  CompanyVision,
  CompanyPurpose,
  CompanyCoreValue,
  CompanyTimelineEvent,
  CompanyHistory,
  CompanyCapability,
  CompanyDifferentiator,
  CompanyBusinessUnit,
  CompanyServiceReference,
  CompanyIndustryReference,
  CompanyGeographicCoverage,
  CompanyCorporateNumbers,
  CompanyCertification,
  CompanyTechnologyStack,
  CompanyStrategicAlliance,
  CorporateDocumentType,
  CorporateDocument,
  ClientVisibility,
  CompanyClientReference,
  CompanyBrandAsset,
  CompanyCommercialPositioning,
  CompanyFAQEntry,
  CompanyCorporateGovernance,
  CompanyAIContext,
  CompanySearchDocument,
  PublicCompanyProfile,
  CompanyValidationSeverity,
  CompanyValidationIssue,
  CompanyValidationResult,
  CompanyProfile,
} from "./types/company-profile";

// ─── Repository ───────────────────────────────────────────────────────────────

export {
  getCompanyProfile,
  getBrandName,
  getTagline,
  getDescription,
  getAllCoreValues,
  getPublishedCoreValues,
  getCoreValueById,
  getAllDifferentiators,
  getPublishedDifferentiators,
  getAllBusinessUnits,
  getPublishedBusinessUnits,
  getAllClients,
  getPublicClients,
  getAllCertifications,
  getPublishedCertifications,
  getAllBrandAssets,
  getPublishedBrandAssets,
  getAllFAQs,
  getPublishedFAQs,
  getFAQsByStatus,
  getProfileInformationStatus,
} from "./repositories/company-knowledge.repository";

// ─── Resolver ─────────────────────────────────────────────────────────────────

export {
  resolveCompanyProfile,
  resolveCompanyAIContext,
  resolveCompanySearchDocument,
} from "./services/company-knowledge-resolver";

// ─── Validator ────────────────────────────────────────────────────────────────

export { validateCompanyProfile } from "./services/company-knowledge-validator";
