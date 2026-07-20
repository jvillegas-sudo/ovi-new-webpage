/**
 * Utility: validate-source-reference
 * Work Order 008A — OVI Product Knowledge Engine
 *
 * Validate that a SourceReference is structurally sound.
 * Does not guarantee that the referenced file exists at runtime —
 * path existence is checked by the knowledge validator.
 */

import type { SourceReference } from "../types/source-reference";

/** Valid source type values for runtime validation. */
const VALID_SOURCE_TYPES = new Set([
  "repository_document",
  "catalog_file",
  "technical_data_sheet",
  "safety_data_sheet",
  "knowledge_base_file",
  "other",
]);

/** Valid verification status values for runtime validation. */
const VALID_VERIFICATION_STATUSES = new Set([
  "unverified",
  "source_confirmed",
  "technical_review_required",
  "technically_verified",
  "rejected",
]);

/** Validation error for a source reference. */
export interface SourceReferenceValidationError {
  field: string;
  message: string;
}

/**
 * Validate a SourceReference record.
 * Returns an array of errors (empty when valid).
 */
export function validateSourceReference(ref: SourceReference): SourceReferenceValidationError[] {
  const errors: SourceReferenceValidationError[] = [];

  if (!VALID_SOURCE_TYPES.has(ref.sourceType)) {
    errors.push({
      field: "sourceType",
      message: `Invalid sourceType: "${ref.sourceType}". Must be one of: ${Array.from(VALID_SOURCE_TYPES).join(", ")}.`,
    });
  }

  if (!ref.sourceFile || ref.sourceFile.trim() === "") {
    errors.push({
      field: "sourceFile",
      message: "sourceFile must not be empty.",
    });
  }

  if (!VALID_VERIFICATION_STATUSES.has(ref.verificationStatus)) {
    errors.push({
      field: "verificationStatus",
      message: `Invalid verificationStatus: "${ref.verificationStatus}".`,
    });
  }

  return errors;
}

/**
 * Check whether a SourceReference is considered confirmed for publication.
 * Returns true when verificationStatus is source_confirmed or technically_verified.
 */
export function isSourceConfirmed(ref: SourceReference): boolean {
  return (
    ref.verificationStatus === "source_confirmed" ||
    ref.verificationStatus === "technically_verified"
  );
}
