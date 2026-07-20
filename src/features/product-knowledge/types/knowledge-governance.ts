/**
 * Knowledge Governance Types
 * Work Order 008A — OVI Product Knowledge Engine
 *
 * Explicit governance statuses that distinguish between:
 *   - Missing information
 *   - Information found but not reviewed
 *   - Information supported by an official source
 *   - Information approved for publication
 *
 * These statuses are internal governance fields.
 * They must never be exposed in the public website output.
 */

// ─── Verification Status ──────────────────────────────────────────────────────

/**
 * Tracks the verification state of a knowledge record or individual field.
 *
 *   unverified              — Default state; no review has occurred.
 *   source_confirmed        — Information is traceable to an official repository source.
 *   technical_review_required — Conflicting sources found or claim needs expert review.
 *   technically_verified    — Reviewed and confirmed by a qualified OVI technician.
 *   rejected                — Claim was evaluated and deemed unsupported or incorrect.
 */
export type VerificationStatus =
  | "unverified"
  | "source_confirmed"
  | "technical_review_required"
  | "technically_verified"
  | "rejected";

// ─── Publication Status ───────────────────────────────────────────────────────

/**
 * Controls whether a record is visible in public-facing output.
 *
 *   draft          — Not ready for publication; internal use only.
 *   pending_review — Populated but awaiting editorial or technical approval.
 *   published      — Approved for public display.
 *   archived       — No longer active; retained for historical reference.
 */
export type PublicationStatus = "draft" | "pending_review" | "published" | "archived";

// ─── Information Status ───────────────────────────────────────────────────────

/**
 * Describes the overall completeness of a product knowledge record.
 *
 *   minimal                  — Only identity fields (name, sector) are populated.
 *   partial                  — Some optional fields are populated but record is incomplete.
 *   complete                 — All required fields are populated and verified.
 *   technical_review_required — Record contains data that needs technical validation.
 */
export type InformationStatus = "minimal" | "partial" | "complete" | "technical_review_required";
