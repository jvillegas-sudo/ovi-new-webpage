/**
 * Product Knowledge Types
 * Work Order 008A — OVI Product Knowledge Engine
 *
 * Strongly typed model for the OVI Product Knowledge layer.
 *
 * This layer is keyed by the immutable product ID from chemical-lines-data.ts.
 * It extends the canonical product identity with structured knowledge fields.
 *
 * Architecture: Option B — Related knowledge layer.
 *   productIdentity  (chemical-lines-data.ts)
 *   +
 *   productKnowledge (this module)
 *   = resolvedProduct (via product-knowledge-resolver.ts)
 *
 * CRITICAL: Do not populate any field without an official source.
 * Unpopulated optional fields must be null, empty array, or explicit status.
 */

import type {
  VerificationStatus,
  PublicationStatus,
  InformationStatus,
} from "./knowledge-governance";
import type { SourceReference } from "./source-reference";

// ─── Presentation ─────────────────────────────────────────────────────────────

/** Availability state of a specific product presentation (size/format). */
export type PresentationAvailabilityStatus =
  "available" | "on_request" | "discontinued" | "unknown";

/** A specific packaging format of a product. */
export interface ProductPresentation {
  presentationId: string;
  label: string;
  amount: number | null;
  unit: string | null;
  packagingType: string | null;
  sku: string | null;
  availabilityStatus: PresentationAvailabilityStatus;
}

// ─── Document ─────────────────────────────────────────────────────────────────

/** Type of an official product document. */
export type DocumentType =
  | "technical_data_sheet"
  | "safety_data_sheet"
  | "certificate"
  | "manual"
  | "protocol"
  | "regulatory";

/** A reference to an official product document. */
export interface ProductDocument {
  documentType: DocumentType;
  title: string;
  language: "es" | "en" | null;
  /** Repository-relative or public path. Null when document does not exist. */
  filePath: string | null;
  verificationStatus: VerificationStatus;
}

// ─── Media ────────────────────────────────────────────────────────────────────

/** Type of a product media asset. */
export type MediaType = "image" | "diagram" | "video";

/** A single media asset for a product. */
export interface ProductMedia {
  mediaType: MediaType;
  /** Public URL or path. Must reference a real, existing file. */
  url: string;
  altText: string | null;
  isPrimary: boolean;
  verificationStatus: VerificationStatus;
}

// ─── Product Knowledge ────────────────────────────────────────────────────────

/**
 * Full product knowledge record.
 *
 * Every optional field must be genuinely optional — never populated with
 * invented, inferred, or fabricated information.
 *
 * Use null for unavailable scalar fields.
 * Use empty arrays for unavailable collection fields.
 * Preserve the appropriate informationStatus.
 */
export interface ProductKnowledge {
  // ── IDENTITY (mirrors chemical-lines-data.ts; must remain synchronized) ───

  /** Immutable product ID from chemical-lines-data.ts (e.g. "industrial-handsol") */
  productId: string;
  /** URL slug from chemical-lines-data.ts */
  slug: string;
  /** Official product name from chemical-lines-data.ts (uppercase, e.g. "HANDSOL") */
  officialName: string;
  /** Sector slug from chemical-lines-data.ts (e.g. "industrial") */
  sectorSlug: string;

  // ── GOVERNANCE ────────────────────────────────────────────────────────────

  informationStatus: InformationStatus;
  verificationStatus: VerificationStatus;
  publicationStatus: PublicationStatus;
  /** Monotonically increasing revision counter; starts at 1 */
  revision: number;
  /** ISO 8601 date of last update */
  updatedAt: string;
  /** Internal governance note — never exposed publicly */
  internalNotes: string | null;

  // ── SOURCE REFERENCES ─────────────────────────────────────────────────────

  /** All official sources that support knowledge in this record */
  sourceReferences: SourceReference[];

  // ── DISCOVERY ─────────────────────────────────────────────────────────────

  /**
   * Concise public description in Spanish.
   * null when an official source does not provide sufficient information.
   * Must never be invented or inferred from the product name alone.
   */
  shortDescription: string | null;
  /** Alternative official product names or abbreviations */
  aliases: string[];
  /** Controlled search keywords derived from official sources */
  keywords: string[];
  /** Customer-language terms that map to this product (Spanish, plain language) */
  customerLanguageTerms: string[];

  // ── PROBLEMS AND NEEDS ────────────────────────────────────────────────────

  /** Cleaning problems or needs this product officially addresses */
  problems: string[];
  /** Soil or contamination types this product treats (taxonomy IDs) */
  soils: string[];
  /** Specific residue types (taxonomy IDs) */
  residues: string[];
  /** Contamination type IDs (from existing knowledge base) */
  contaminationTypes: string[];

  // ── APPLICATION CONTEXT ───────────────────────────────────────────────────

  /** Industry IDs where this product is officially applicable */
  industries: string[];
  /** Application IDs (specific use contexts) */
  applications: string[];
  /** Compatible surface IDs (taxonomy IDs) */
  surfaces: string[];
  /** Compatible or recommended equipment IDs */
  equipment: string[];
  /** Areas within a facility (e.g. "cocina", "camara-fria") */
  areas: string[];
  /** Process types where this product is used */
  processes: string[];
  /** Environmental conditions or environments */
  environments: string[];

  // ── COMMERCIAL KNOWLEDGE ──────────────────────────────────────────────────

  /** Official benefits supported by the source (no unsupported superlatives) */
  officialBenefits: string[];
  /** Officially documented product differentiators */
  differentiators: string[];
  /** Product IDs of related products (same sector/use) */
  relatedProducts: string[];
  /** Product IDs of complementary products (used together) */
  complementaryProducts: string[];
  /** Product IDs of alternative products (can substitute) */
  alternativeProducts: string[];
  /** Service IDs of related OVI services */
  relatedServices: string[];

  // ── TECHNICAL KNOWLEDGE ───────────────────────────────────────────────────

  /** High-level composition summary (no detailed formula unless officially published) */
  compositionSummary: string | null;
  physicalState: string | null;
  color: string | null;
  fragrance: string | null;
  /** pH value or range (string to allow "6.5–7.5" etc.) */
  pH: string | null;
  /** Official dilution recommendation */
  dilution: string | null;
  /** Step-by-step usage instructions */
  usageInstructions: string | null;
  /** Safety precautions and hazard notes */
  precautions: string[];
  /** Compatible materials, surfaces, or conditions */
  compatibility: string[];
  /** Incompatible materials, chemicals, or conditions */
  incompatibilities: string[];
  /** Performance or coverage data */
  performance: string | null;
  /** Biodegradability claim (only when officially documented) */
  biodegradability: string | null;

  // ── PRESENTATIONS ─────────────────────────────────────────────────────────

  presentations: ProductPresentation[];

  // ── DOCUMENTS ─────────────────────────────────────────────────────────────

  documents: ProductDocument[];

  // ── MEDIA ─────────────────────────────────────────────────────────────────

  /** Primary product image URL. null when no official image exists. */
  primaryImage: string | null;
  gallery: ProductMedia[];

  // ── VERIFICATION (for future administration) ──────────────────────────────

  /** Name or identifier of the person who last verified this record */
  verifiedBy: string | null;
  /** ISO 8601 timestamp of last verification */
  verifiedAt: string | null;
}

// ─── Public Product View ──────────────────────────────────────────────────────

/**
 * Resolved public product — safe to expose in the UI.
 *
 * All internal governance fields, source references, and internal notes
 * are stripped. Only verified or source-confirmed information is included.
 * Draft fields are excluded.
 *
 * The Product Experience Platform and Product Search must consume this type,
 * not the raw ProductKnowledge record.
 */
export interface PublicProductView {
  // Identity
  productId: string;
  slug: string;
  officialName: string;
  sectorSlug: string;

  // Completeness signal for UI fallback
  informationStatus: InformationStatus;

  // Discovery
  shortDescription: string | null;
  aliases: string[];
  keywords: string[];
  customerLanguageTerms: string[];

  // Problems
  problems: string[];
  soils: string[];
  residues: string[];
  contaminationTypes: string[];

  // Application Context
  industries: string[];
  applications: string[];
  surfaces: string[];
  equipment: string[];
  areas: string[];
  processes: string[];
  environments: string[];

  // Commercial
  officialBenefits: string[];
  differentiators: string[];
  relatedProducts: string[];
  complementaryProducts: string[];
  alternativeProducts: string[];
  relatedServices: string[];

  // Technical (only published, verified fields)
  compositionSummary: string | null;
  physicalState: string | null;
  color: string | null;
  fragrance: string | null;
  pH: string | null;
  dilution: string | null;
  usageInstructions: string | null;
  precautions: string[];
  compatibility: string[];
  incompatibilities: string[];
  performance: string | null;
  biodegradability: string | null;

  // Presentations
  presentations: ProductPresentation[];

  // Documents (only with verified paths)
  documents: ProductDocument[];

  // Media
  primaryImage: string | null;
  gallery: ProductMedia[];
}

// ─── Validation ───────────────────────────────────────────────────────────────

/** A single validation error from the knowledge validator. */
export interface KnowledgeValidationError {
  /** Affected product ID */
  productId: string;
  /** Error category */
  code:
    | "DUPLICATE_ID"
    | "DUPLICATE_SLUG"
    | "MISSING_OFFICIAL_NAME"
    | "INVALID_SECTOR_REFERENCE"
    | "INVALID_TAXONOMY_REFERENCE"
    | "BROKEN_RELATED_PRODUCT"
    | "SELF_RELATION"
    | "INVALID_DOCUMENT_PATH"
    | "INVALID_MEDIA_PATH"
    | "PUBLICATION_WITHOUT_MINIMUM_FIELDS"
    | "PUBLISHED_CLAIM_WITHOUT_SOURCE"
    | "CONFLICTING_STATUS"
    | "DUPLICATE_ALIAS"
    | "ORPHAN_KNOWLEDGE_RECORD"
    | "MISSING_KNOWLEDGE_RECORD";
  /** Human-readable description of the issue */
  message: string;
}

/** Aggregate result from the product knowledge validator. */
export interface KnowledgeValidationResult {
  isValid: boolean;
  errors: KnowledgeValidationError[];
  warnings: string[];
}
