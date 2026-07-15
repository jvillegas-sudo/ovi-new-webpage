/**
 * OVI Knowledge Engine — Validators Module
 * FASE 2 · Foundation Order 002
 *
 * Exports input validation functions against the OVI Knowledge Base.
 */

export {
  validateDecisionInput,
  isValidProductId,
  isValidServiceId,
  isValidProtocolId,
  isValidEquipmentId,
  isValidIndustryId,
  isValidSurfaceId,
  isValidContaminationId,
  findUnknownProductIds,
  findUnknownProtocolIds,
} from "./input-validators";

export type {
  OviValidationResult,
  OviValidationError,
  OviValidationWarning,
} from "../types";
