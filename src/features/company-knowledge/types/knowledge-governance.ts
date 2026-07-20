/**
 * Company Knowledge — Governance Types
 * OKP-001 — OVI Knowledge Program — Company Knowledge
 *
 * Explicit governance statuses that distinguish between:
 *   - Missing information
 *   - Information found but not reviewed
 *   - Information supported by an official source
 *   - Information approved for publication
 *
 * These statuses are internal governance fields.
 * They must never be exposed in the public-facing output.
 */

// ─── Verification Status ──────────────────────────────────────────────────────

/**
 * Tracks the verification state of a knowledge field or section.
 *
 *   unverified              — Default state; no review has occurred.
 *   source_confirmed        — Information is traceable to an official repository source.
 *   technical_review_required — Conflicting sources or claim needs expert review.
 *   technically_verified    — Reviewed and confirmed by a qualified OVI representative.
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
 * Controls whether a section or field is visible in public-facing output.
 *
 *   draft          — Not ready for publication; internal use only.
 *   pending_review — Populated but awaiting editorial or official approval.
 *   published      — Approved for public display.
 *   archived       — No longer active; retained for historical reference.
 */
export type PublicationStatus = "draft" | "pending_review" | "published" | "archived";

// ─── Information Status ───────────────────────────────────────────────────────

/**
 * Describes the overall completeness of a knowledge section.
 *
 *   missing                  — No information has been provided yet.
 *   minimal                  — Only identity or foundational fields are populated.
 *   partial                  — Some fields are populated but the section is incomplete.
 *   complete                 — All required fields are populated and verified.
 *   technical_review_required — Section contains data that needs official validation.
 */
export type InformationStatus =
  "missing" | "minimal" | "partial" | "complete" | "technical_review_required";
