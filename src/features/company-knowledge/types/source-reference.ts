/**
 * Company Knowledge — Source Reference Types
 * OKP-001 — OVI Knowledge Program — Company Knowledge
 *
 * Every knowledge claim must be traceable to an official repository source.
 * Source references are internal governance structures — never exposed publicly.
 */

import type { VerificationStatus } from "./knowledge-governance";

// ─── Source Type ──────────────────────────────────────────────────────────────

/**
 * Describes the origin of a corporate knowledge claim.
 *
 *   repository_document  — A file in the project repository (company/, docs/, src/config/).
 *   work_order           — An official Work Order document.
 *   site_config          — src/config/site.ts or equivalent canonical config file.
 *   brand_document       — A file within company/brand/.
 *   official_statement   — A direct statement approved by an OVI representative.
 *   other                — Any other official source; describe in internalNote.
 */
export type SourceType =
  | "repository_document"
  | "work_order"
  | "site_config"
  | "brand_document"
  | "official_statement"
  | "other";

// ─── Source Reference ─────────────────────────────────────────────────────────

/**
 * A traceable reference to the official source that supports a knowledge claim.
 *
 * Internal governance structure — must not appear in public company output.
 */
export interface SourceReference {
  /** Origin type of the official source */
  sourceType: SourceType;
  /** Repository-relative path to the source file */
  sourceFile: string;
  /** Section, heading, or field name within the source file */
  sourceSection: string | null;
  /** Verification state of this specific reference */
  verificationStatus: VerificationStatus;
  /** Internal note for governance editors (never exposed publicly) */
  internalNote: string | null;
}
