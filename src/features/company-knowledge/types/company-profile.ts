/**
 * Company Knowledge — CompanyProfile Type
 * OKP-001 — OVI Knowledge Program — Company Knowledge
 *
 * The authoritative structured model for OVI corporate identity.
 *
 * All fields are optional. No fictional content is permitted.
 * Missing information must remain absent — never invented.
 *
 * This model is the single source of truth consumed by:
 *   - Website
 *   - OVI AI
 *   - OVI OS
 *   - CRM
 *   - Proposal Generator
 *   - Solution Finder
 *   - Product Experience Platform
 *   - Future Ecommerce
 *   - Knowledge Graph
 *
 * Governance rules:
 *   1. Only populate fields from official repository sources.
 *   2. Missing information stays absent — use undefined, not invented content.
 *   3. Internal fields (sources, verification, publication status) are never
 *      exposed in the public-facing PublicCompanyProfile.
 */

import type {
  PublicationStatus,
  VerificationStatus,
  InformationStatus,
} from "./knowledge-governance";
import type { SourceReference } from "./source-reference";

// ─── Shared Governance Block ──────────────────────────────────────────────────

export interface GovernedField {
  publicationStatus: PublicationStatus;
  verificationStatus: VerificationStatus;
  sources: SourceReference[];
}

// ─── Identity ─────────────────────────────────────────────────────────────────

export interface CompanyIdentity extends GovernedField {
  /** Official registered name */
  officialName?: string;
  /** Commercial brand name */
  brandName?: string;
  /** Brand tagline */
  tagline?: string;
  /** Short corporate description */
  description?: string;
  /** Primary website URL */
  website?: string;
  /** Contact email */
  contactEmail?: string;
  /** Contact phone */
  contactPhone?: string;
  /** Official address */
  address?: string;
  /** LinkedIn URL */
  linkedin?: string;
  /** Instagram URL */
  instagram?: string;
  /** Twitter/X URL */
  twitter?: string;
  /** YouTube URL */
  youtube?: string;
  /** SEO and search keywords */
  keywords?: string[];
}

// ─── Mission ──────────────────────────────────────────────────────────────────

export interface CompanyMission extends GovernedField {
  /** Title of the mission statement */
  title?: string;
  /** Mission statement body in Spanish */
  description?: string;
  /** Evidence supporting this mission statement */
  evidence?: string;
  /** Document version */
  version?: string;
}

// ─── Vision ───────────────────────────────────────────────────────────────────

export interface CompanyVision extends GovernedField {
  /** Title of the vision statement */
  title?: string;
  /** Vision statement body in Spanish */
  description?: string;
  /** Evidence supporting this vision statement */
  evidence?: string;
  /** Document version */
  version?: string;
}

// ─── Purpose ──────────────────────────────────────────────────────────────────

export interface CompanyPurpose extends GovernedField {
  /** Purpose statement body */
  description?: string;
  /** Working brand promise (may be draft) */
  brandPromise?: string;
}

// ─── Core Value ───────────────────────────────────────────────────────────────

export interface CompanyCoreValue extends GovernedField {
  /** Value identifier slug */
  id: string;
  /** Value name */
  name: string;
  /** Value description */
  description?: string;
  /** Evidence supporting this value */
  evidence?: string;
}

// ─── Timeline Event ───────────────────────────────────────────────────────────

export interface CompanyTimelineEvent extends GovernedField {
  /** ISO 8601 date when the event was documented or occurred */
  date?: string;
  /** Year of the event (e.g. 2015) */
  year?: number;
  /** Short event title */
  event: string;
  /** Detailed description of the event */
  description?: string;
  /** Supporting evidence or reference */
  evidence?: string;
  /** Human-readable primary source reference */
  sourceReference?: string;
}

// ─── History ─────────────────────────────────────────────────────────────────

export interface CompanyHistory extends GovernedField {
  /** Founding year */
  foundingYear?: number;
  /** Founding city / country */
  foundingLocation?: string;
  /** Corporate history narrative */
  narrative?: string;
  /** Ordered timeline of key events */
  timeline?: CompanyTimelineEvent[];
}

// ─── Capability ───────────────────────────────────────────────────────────────

export interface CompanyCapability extends GovernedField {
  /** Capability identifier */
  id: string;
  /** Capability category */
  category: string;
  /** Capability name */
  name: string;
  /** Capability description */
  description?: string;
  /** Evidence supporting this capability */
  evidence?: string;
}

// ─── Differentiator ───────────────────────────────────────────────────────────

export interface CompanyDifferentiator extends GovernedField {
  /** Differentiator identifier */
  id: string;
  /** Differentiator title */
  title: string;
  /** Differentiator description */
  description?: string;
  /** Evidence supporting this differentiator */
  evidence?: string;
}

// ─── Experience ────────────────────────────────────────────────────────────────

export interface CompanyExperienceProject {
  /** Project or experience identifier */
  id: string;
  /** Official project title */
  title: string;
  /** Related case study identifier */
  caseStudyId?: string;
  /** Project summary */
  description?: string;
  /** Evidence supporting the project reference */
  evidence?: string;
  /** Completeness status for the project reference */
  status: InformationStatus;
}

export interface CompanyExperience extends GovernedField {
  /** Official experience statement, preserving qualifiers like "más de" */
  years?: string;
  /** Officially documented project references */
  projects?: CompanyExperienceProject[];
  /** Industries where experience is documented */
  industries?: CompanyIndustryReference[];
  /** Capability highlights proven by sources */
  capabilities?: string[];
  /** Evidence highlights supporting the experience section */
  evidence?: string[];
  /** Overall completeness state for the experience section */
  status: InformationStatus;
}

// ─── Business Unit ────────────────────────────────────────────────────────────

export interface CompanyBusinessUnit extends GovernedField {
  /** Unit identifier */
  id: string;
  /** Unit name */
  name: string;
  /** Unit description */
  description?: string;
}

// ─── Service Reference ────────────────────────────────────────────────────────

/**
 * A reference to a service — does not duplicate Service Knowledge domain.
 * Full service definitions live in the Service Knowledge domain.
 */
export interface CompanyServiceReference {
  /** Service identifier from Service Knowledge domain */
  serviceId: string;
  /** Display label (may be localized) */
  label: string;
}

// ─── Industry Reference ───────────────────────────────────────────────────────

/**
 * A reference to an industry — does not duplicate Industry Knowledge domain.
 * Full industry definitions live in the Industry Knowledge domain.
 */
export interface CompanyIndustryReference {
  /** Industry identifier from Industry Knowledge domain */
  industryId: string;
  /** Display label (may be localized) */
  label: string;
}

// ─── Geographic Coverage ─────────────────────────────────────────────────────

export interface CompanyGeographicCoverage extends GovernedField {
  /** Countries of operation */
  countries?: string[];
  /** Cities or regions of operation */
  regions?: string[];
  /** Free-text coverage description */
  description?: string;
}

// ─── Corporate Numbers ────────────────────────────────────────────────────────

export interface CompanyCorporateNumbers extends GovernedField {
  /** Years in operation */
  yearsInOperation?: number;
  /** Number of clients served */
  clientsServed?: number;
  /** Number of team members */
  teamSize?: number;
  /** Number of products */
  productCount?: number;
  /** Number of active certifications */
  certificationCount?: number;
  /** Any other official figure (label → value) */
  otherFigures?: Record<string, string>;
}

// ─── Certification ────────────────────────────────────────────────────────────

export interface CompanyCertification extends GovernedField {
  /** Certification identifier */
  id: string;
  /** Certification name */
  name: string;
  /** Issuing organization */
  issuer?: string;
  /** Expiration date (ISO 8601) */
  expirationDate?: string;
  /** Path to the certificate document */
  documentPath?: string;
  /** Verification URL */
  verificationUrl?: string;
}

// ─── Technology Stack ─────────────────────────────────────────────────────────

export interface CompanyTechnologyStack extends GovernedField {
  /** Technologies used by the company or platform (name → purpose) */
  technologies?: Record<string, string>;
}

// ─── Strategic Alliance ───────────────────────────────────────────────────────

export interface CompanyStrategicAlliance extends GovernedField {
  /** Alliance identifier */
  id: string;
  /** Partner name */
  partnerName: string;
  /** Alliance description */
  description?: string;
  /** Partner URL */
  partnerUrl?: string;
}

// ─── Corporate Document ───────────────────────────────────────────────────────

export type CorporateDocumentType =
  | "brochure"
  | "corporate_presentation"
  | "certificate"
  | "policy"
  | "protocol"
  | "video"
  | "image"
  | "logo"
  | "other";

export interface CorporateDocument extends GovernedField {
  /** Document identifier */
  id: string;
  /** Document type */
  type: CorporateDocumentType;
  /** Document title */
  title: string;
  /** Path or URL to the document */
  path?: string;
  /** MIME type */
  mimeType?: string;
  /** Language (ISO 639-1) */
  language?: string;
}

// ─── Client Reference ─────────────────────────────────────────────────────────

export type ClientVisibility = "public" | "permission_required" | "confidential";

export interface CompanyClientReference extends GovernedField {
  /** Client identifier */
  id: string;
  /** Display name (may be anonymized) */
  displayName: string;
  /** Controls whether this client can be shown publicly */
  visibility: ClientVisibility;
  /** Industry sector of the client */
  industry?: string;
  /** Case study identifier (references DAM or case study domain) */
  caseStudyId?: string;
  /** Logo path */
  logoPath?: string;
}

// ─── Brand Asset ─────────────────────────────────────────────────────────────

export interface CompanyBrandAsset extends GovernedField {
  /** Asset identifier */
  id: string;
  /** Asset title */
  title: string;
  /** Path to the asset file */
  path?: string;
  /** Asset type */
  type?: string;
}

// ─── Commercial Positioning ───────────────────────────────────────────────────

export interface CompanyCommercialPositioning extends GovernedField {
  /** Primary positioning statement */
  primaryStatement?: string;
  /** Target audience description */
  targetAudience?: string;
  /** Value proposition summary */
  valueProposition?: string;
  /** Competitive advantages */
  competitiveAdvantages?: string[];
}

// ─── Project Reference ─────────────────────────────────────────────────────────

export interface CompanyProjectReference extends GovernedField {
  /** Project reference identifier */
  id: string;
  /** Public project title */
  title: string;
  /** Public project description */
  description?: string;
  /** Related case study identifier */
  caseStudyId?: string;
  /** Related public image path */
  imagePath?: string;
  /** Related public document path */
  documentPath?: string;
  /** Official testimonial, only if documented */
  testimonial?: string;
}

// ─── FAQ Entry ────────────────────────────────────────────────────────────────

export interface CompanyFAQEntry extends GovernedField {
  /** FAQ identifier */
  id: string;
  /** Question */
  question: string;
  /** Answer */
  answer?: string;
  /** Answer status */
  answerStatus: InformationStatus;
}

// ─── Corporate Governance ─────────────────────────────────────────────────────

export interface CompanyCorporateGovernance extends GovernedField {
  /** Legal entity type */
  legalEntityType?: string;
  /** Country of incorporation */
  incorporationCountry?: string;
  /** Applicable regulatory frameworks */
  regulatoryFrameworks?: string[];
}

// ─── AI Context ───────────────────────────────────────────────────────────────

/**
 * A structured summary prepared specifically for OVI AI consumption.
 * The AI never reads raw JSON — it reads through this structured context.
 * All values here must come from verified CompanyProfile fields.
 */
export interface CompanyAIContext {
  /** Brand name for the AI to use */
  brandName: string;
  /** Tagline */
  tagline: string;
  /** One-sentence description */
  shortDescription: string;
  /** Published mission statement (null if not published) */
  mission: string | null;
  /** Published vision statement (null if not published) */
  vision: string | null;
  /** Published history narrative (null if not published) */
  history: string | null;
  /** Published core value names */
  coreValueNames: string[];
  /** Published brand pillar names */
  brandPillarNames: string[];
  /** Published capability names */
  capabilityNames: string[];
  /** Published industry labels */
  industryLabels: string[];
  /** Published service labels */
  serviceLabels: string[];
  /** Geographic coverage description (null if unpublished) */
  geographicCoverage: string | null;
  /** Published differentiator titles */
  differentiatorTitles: string[];
  /** Published certification names */
  certificationNames: string[];
  /** Published technology highlights */
  technologyHighlights: string[];
  /** Published project reference titles */
  projectReferenceTitles: string[];
  /** Published experience summary (null if unpublished) */
  experienceSummary: string | null;
  /** Search-oriented question answers for common queries */
  searchAnswers: {
    whoIsOvi: string;
    whatMakesOviDifferent: string | null;
    whereDoesOviOperate: string | null;
    whatServicesDoesOviProvide: string | null;
    whyChooseOvi: string | null;
    whatIndustriesDoesOviServe: string | null;
    whatCertificationsDoesOviHave: string | null;
    whatExperienceDoesOviHave: string | null;
  };
}

// ─── Search Index ─────────────────────────────────────────────────────────────

/**
 * A flat record prepared for full-text and keyword search indexing.
 * Enables future search to answer common corporate questions.
 */
export interface CompanySearchDocument {
  id: "company-profile";
  brandName: string;
  tagline: string;
  description: string;
  keywords: string[];
  purposeText: string | null;
  missionText: string | null;
  visionText: string | null;
  historyText: string | null;
  experienceText: string | null;
  coreValueNames: string[];
  capabilityNames: string[];
  differentiatorTitles: string[];
  industryLabels: string[];
  serviceLabels: string[];
  certificationNames: string[];
  technologyHighlights: string[];
  projectReferenceTitles: string[];
  projectReferenceDescriptions: string[];
  coverageText: string | null;
  faqQuestions: string[];
  faqAnswers: string[];
  answerSnippets: string[];
}

// ─── Public Company Profile ───────────────────────────────────────────────────

/**
 * Safe public projection of CompanyProfile.
 *
 * Internal fields are stripped:
 *   - sources
 *   - verificationStatus
 *   - publicationStatus (on individual sections)
 *   - internalNote
 *
 * Only sections with publicationStatus === "published" are included.
 */
export interface PublicCompanyProfile {
  brandName: string;
  tagline: string;
  description: string;
  website: string | null;
  contactEmail: string | null;
  linkedin: string | null;
  keywords: string[];
  mission: { title?: string; description?: string } | null;
  vision: { title?: string; description?: string } | null;
  purpose: { description?: string; brandPromise?: string } | null;
  history: {
    foundingYear?: number;
    foundingLocation?: string;
    narrative?: string;
    timeline: {
      date?: string;
      year?: number;
      event: string;
      description?: string;
      sourceReference?: string;
    }[];
  } | null;
  experience: {
    years?: string;
    projects: {
      id: string;
      title: string;
      caseStudyId?: string;
      description?: string;
      evidence?: string;
      status: InformationStatus;
    }[];
    industries: CompanyIndustryReference[];
    capabilities: string[];
    evidence: string[];
    status: InformationStatus;
  } | null;
  coreValues: { id: string; name: string; description?: string }[];
  differentiators: { id: string; title: string; description?: string }[];
  capabilities: { id: string; category: string; name: string; description?: string }[];
  businessUnits: { id: string; name: string; description?: string }[];
  serviceReferences: CompanyServiceReference[];
  industryReferences: CompanyIndustryReference[];
  geographicCoverage: { countries?: string[]; regions?: string[]; description?: string } | null;
  corporateNumbers: {
    yearsInOperation?: number;
    clientsServed?: number;
    teamSize?: number;
    productCount?: number;
    certificationCount?: number;
    otherFigures?: Record<string, string>;
  } | null;
  certifications: { id: string; name: string; issuer?: string; expirationDate?: string }[];
  technologyStack: { technologies?: Record<string, string> } | null;
  brandAssets: { id: string; title: string; path?: string; type?: string }[];
  projectReferences: {
    id: string;
    title: string;
    description?: string;
    caseStudyId?: string;
    imagePath?: string;
    documentPath?: string;
    testimonial?: string;
  }[];
  commercialPositioning: {
    primaryStatement?: string;
    targetAudience?: string;
    valueProposition?: string;
    competitiveAdvantages?: string[];
  } | null;
  faqs: { id: string; question: string; answer?: string }[];
}

// ─── Validation ───────────────────────────────────────────────────────────────

export type CompanyValidationSeverity = "error" | "warning";

export interface CompanyValidationIssue {
  severity: CompanyValidationSeverity;
  field: string;
  message: string;
}

export interface CompanyValidationResult {
  valid: boolean;
  errors: CompanyValidationIssue[];
  warnings: CompanyValidationIssue[];
}

// ─── Company Profile ──────────────────────────────────────────────────────────

/**
 * The full internal CompanyProfile — authoritative corporate knowledge record.
 *
 * All sections are optional. Only official repository information is permitted.
 * No section should be populated with invented or assumed content.
 */
export interface CompanyProfile {
  /** Internal profile identifier */
  profileId: "ovi-company-profile";
  /** Schema version for future migrations */
  schemaVersion: string;
  /** Overall completeness status */
  informationStatus: InformationStatus;
  /** Overall publication status */
  publicationStatus: PublicationStatus;
  /** ISO 8601 timestamp of last update */
  lastUpdated: string;
  /** Corporate identity */
  identity?: CompanyIdentity;
  /** Mission statement */
  mission?: CompanyMission;
  /** Vision statement */
  vision?: CompanyVision;
  /** Corporate purpose and brand promise */
  purpose?: CompanyPurpose;
  /** Core values */
  coreValues?: CompanyCoreValue[];
  /** Corporate history and timeline */
  history?: CompanyHistory;
  /** Structured company experience */
  experience?: CompanyExperience;
  /** Operational capabilities */
  capabilities?: CompanyCapability[];
  /** Brand pillars (treated as differentiators) */
  differentiators?: CompanyDifferentiator[];
  /** Business units */
  businessUnits?: CompanyBusinessUnit[];
  /** References to services (full definitions in Service Knowledge domain) */
  serviceReferences?: CompanyServiceReference[];
  /** References to industries (full definitions in Industry Knowledge domain) */
  industryReferences?: CompanyIndustryReference[];
  /** Geographic coverage */
  geographicCoverage?: CompanyGeographicCoverage;
  /** Official corporate figures */
  corporateNumbers?: CompanyCorporateNumbers;
  /** Active and historical certifications */
  certifications?: CompanyCertification[];
  /** Technology stack */
  technologyStack?: CompanyTechnologyStack;
  /** Strategic alliances and partnerships */
  strategicAlliances?: CompanyStrategicAlliance[];
  /** Corporate documents */
  corporateDocuments?: CorporateDocument[];
  /** Brand assets */
  brandAssets?: CompanyBrandAsset[];
  /** Official project references */
  projectReferences?: CompanyProjectReference[];
  /** Commercial positioning */
  commercialPositioning?: CompanyCommercialPositioning;
  /** Client references */
  clients?: CompanyClientReference[];
  /** FAQs */
  faqs?: CompanyFAQEntry[];
  /** Corporate governance */
  governance?: CompanyCorporateGovernance;
  /** Global source references for the entire profile */
  sources?: SourceReference[];
}
