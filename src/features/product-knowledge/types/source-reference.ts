/**
 * Source Reference Types
 * Work Order 008A — OVI Product Knowledge Engine
 *
 * Every populated knowledge field or field group must be traceable to an
 * official source. This type captures that traceability.
 *
 * Source references are for internal governance only.
 * They must NOT be exposed in the public website output.
 */

import type { VerificationStatus } from "./knowledge-governance";

// ─── Source Type ──────────────────────────────────────────────────────────────

/**
 * Describes the origin of a knowledge claim.
 *
 *   repository_document  — A file in the project repository (docs, JSON, TS).
 *   catalog_file         — An official product catalog or data source file.
 *   technical_data_sheet — An official product technical data sheet (ficha técnica).
 *   safety_data_sheet    — An official Safety Data Sheet (SDS/MSDS/HDS).
 *   knowledge_base_file  — An existing src/knowledge/ knowledge base file.
 *   other                — Any other official source; describe in internalNote.
 */
export type SourceType =
  | "repository_document"
  | "catalog_file"
  | "technical_data_sheet"
  | "safety_data_sheet"
  | "knowledge_base_file"
  | "other";

// ─── Source Reference ─────────────────────────────────────────────────────────

/**
 * A traceable reference to the official source that supports a knowledge claim.
 *
 * Internal governance structure — must not appear in public product output.
 */
export interface SourceReference {
  /** Origin type of the official source */
  sourceType: SourceType;
  /** Repository-relative path to the source file */
  sourceFile: string;
  /** Page number in a document (null when not applicable) */
  sourcePage: number | null;
  /** Section, heading, or field name within the source file */
  sourceSection: string | null;
  /** Verification state of this specific reference */
  verificationStatus: VerificationStatus;
  /** Internal note for governance editors (never exposed publicly) */
  internalNote: string | null;
}
