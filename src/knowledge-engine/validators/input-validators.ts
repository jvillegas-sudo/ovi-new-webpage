/**
 * OVI Knowledge Engine — Input Validators
 * FASE 2 · Foundation Order 002
 *
 * Validates OviDecisionInput values against the OVI Knowledge Base.
 * Catches unknown entity IDs before they propagate to the recommendation engine.
 *
 * Returns structured errors (blocking) and warnings (informational).
 */

import {
  products,
  services,
  protocols,
  equipment,
  contaminationTypes,
  surfaces,
  sectors,
} from "@knowledge";

import type { OviDecisionInput, OviValidationResult, OviValidationError, OviValidationWarning } from "../types";

// ─── Known Value Registries ───────────────────────────────────────────────────

const KNOWN_INDUSTRIES = new Set(sectors.map((s) => s.id));
const KNOWN_SURFACES = new Set(surfaces.map((s) => s.id));
const KNOWN_CONTAMINATION_TYPES = new Set(contaminationTypes.map((c) => c.id));
const KNOWN_PRODUCT_IDS = new Set(products.map((p) => p.id));
const KNOWN_SERVICE_IDS = new Set(services.map((s) => s.id));
const KNOWN_PROTOCOL_IDS = new Set(protocols.map((p) => p.id));
const KNOWN_EQUIPMENT_IDS = new Set(equipment.map((e) => e.id));

const KNOWN_CLIENT_GOALS = new Set([
  "reducir-consumo-agua",
  "cumplir-normativa-haccp",
  "eliminar-biofilm",
  "mantenimiento-preventivo",
  "limpieza-correctiva",
  "proteger-superficie",
  "reducir-tiempo-ciclo",
  "minimizar-carga-quimica",
  "trazabilidad-auditoria",
  "impermeabilizacion",
]);

const KNOWN_CONTAMINATION_LEVELS = new Set(["leve", "moderado", "severo", "crítico"]);

const KNOWN_ENVIRONMENTAL_RESTRICTIONS = new Set([
  "zona-alimentaria",
  "zona-hospitalaria",
  "superficie-delicada",
  "restriccion-sanitaria",
  "incompatibilidad-quimica",
  "area-protegida-ambiental",
  "riesgo-electrico",
  "sin-solventes-clorados",
  "biodegradable-requerido",
]);

// ─── Main Validator ───────────────────────────────────────────────────────────

/**
 * Validates an OviDecisionInput against the OVI Knowledge Base.
 *
 * Errors → unknown entity IDs or invalid enum values (blocking)
 * Warnings → empty input, low-confidence paths, missing recommended fields
 */
export function validateDecisionInput(input: OviDecisionInput): OviValidationResult {
  const errors: OviValidationError[] = [];
  const warnings: OviValidationWarning[] = [];

  // ── Industry ──────────────────────────────────────────────────────────────
  if (input.industryId !== undefined) {
    if (!KNOWN_INDUSTRIES.has(input.industryId)) {
      errors.push({
        field: "industryId",
        value: input.industryId,
        message: `Industry ID "${input.industryId}" does not exist in the OVI Knowledge Base. Known IDs: ${Array.from(KNOWN_INDUSTRIES).join(", ")}`,
      });
    }
  } else {
    warnings.push({
      field: "industryId",
      value: "",
      message: "No industry specified. Recommendation confidence will be reduced.",
    });
  }

  // ── Surface ───────────────────────────────────────────────────────────────
  if (input.surfaceId !== undefined) {
    if (!KNOWN_SURFACES.has(input.surfaceId)) {
      errors.push({
        field: "surfaceId",
        value: input.surfaceId,
        message: `Surface ID "${input.surfaceId}" does not exist in the OVI Knowledge Base. Known IDs: ${Array.from(KNOWN_SURFACES).join(", ")}`,
      });
    }
  }

  // ── Contamination type ────────────────────────────────────────────────────
  if (input.contaminationId !== undefined) {
    if (!KNOWN_CONTAMINATION_TYPES.has(input.contaminationId)) {
      errors.push({
        field: "contaminationId",
        value: input.contaminationId,
        message: `Contamination type ID "${input.contaminationId}" does not exist in the OVI Knowledge Base. Known IDs: ${Array.from(KNOWN_CONTAMINATION_TYPES).join(", ")}`,
      });
    }
  } else {
    warnings.push({
      field: "contaminationId",
      value: "",
      message: "No contamination type specified. This is the most critical input for product selection.",
    });
  }

  // ── Contamination level ───────────────────────────────────────────────────
  if (input.contaminationLevel !== undefined) {
    if (!KNOWN_CONTAMINATION_LEVELS.has(input.contaminationLevel)) {
      errors.push({
        field: "contaminationLevel",
        value: input.contaminationLevel,
        message: `Invalid contamination level "${input.contaminationLevel}". Valid values: leve, moderado, severo, crítico`,
      });
    }
  }

  // ── Client goal ───────────────────────────────────────────────────────────
  if (input.clientGoal !== undefined) {
    if (!KNOWN_CLIENT_GOALS.has(input.clientGoal)) {
      errors.push({
        field: "clientGoal",
        value: input.clientGoal,
        message: `Invalid client goal "${input.clientGoal}". Valid values: ${Array.from(KNOWN_CLIENT_GOALS).join(", ")}`,
      });
    }
  }

  // ── Environmental restrictions ────────────────────────────────────────────
  if (input.environmentalRestrictions !== undefined) {
    for (const restriction of input.environmentalRestrictions) {
      if (!KNOWN_ENVIRONMENTAL_RESTRICTIONS.has(restriction)) {
        errors.push({
          field: "environmentalRestrictions",
          value: restriction,
          message: `Unknown environmental restriction "${restriction}". Valid values: ${Array.from(KNOWN_ENVIRONMENTAL_RESTRICTIONS).join(", ")}`,
        });
      }
    }
  }

  // ── Empty input warning ───────────────────────────────────────────────────
  const hasAnyInput =
    input.industryId ||
    input.surfaceId ||
    input.contaminationId ||
    input.contaminationLevel ||
    input.clientGoal ||
    (input.environmentalRestrictions && input.environmentalRestrictions.length > 0);

  if (!hasAnyInput) {
    warnings.push({
      field: "input",
      value: "",
      message:
        "Input is empty. Provide at least contaminationId, surfaceId, or industryId for a meaningful recommendation.",
    });
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

// ─── Entity ID Validators ─────────────────────────────────────────────────────

/**
 * Returns true if the given product ID exists in the knowledge base.
 */
export function isValidProductId(id: string): boolean {
  return KNOWN_PRODUCT_IDS.has(id);
}

/**
 * Returns true if the given service ID exists in the knowledge base.
 */
export function isValidServiceId(id: string): boolean {
  return KNOWN_SERVICE_IDS.has(id);
}

/**
 * Returns true if the given protocol ID exists in the knowledge base.
 */
export function isValidProtocolId(id: string): boolean {
  return KNOWN_PROTOCOL_IDS.has(id);
}

/**
 * Returns true if the given equipment ID exists in the knowledge base.
 */
export function isValidEquipmentId(id: string): boolean {
  return KNOWN_EQUIPMENT_IDS.has(id);
}

/**
 * Returns true if the given industry/sector ID exists in the knowledge base.
 */
export function isValidIndustryId(id: string): boolean {
  return KNOWN_INDUSTRIES.has(id);
}

/**
 * Returns true if the given surface ID exists in the knowledge base.
 */
export function isValidSurfaceId(id: string): boolean {
  return KNOWN_SURFACES.has(id);
}

/**
 * Returns true if the given contamination type ID exists in the knowledge base.
 */
export function isValidContaminationId(id: string): boolean {
  return KNOWN_CONTAMINATION_TYPES.has(id);
}

// ─── Bulk Validators ──────────────────────────────────────────────────────────

/**
 * Validates an array of product IDs and returns those that are unknown.
 */
export function findUnknownProductIds(ids: string[]): string[] {
  return ids.filter((id) => !KNOWN_PRODUCT_IDS.has(id));
}

/**
 * Validates an array of protocol IDs and returns those that are unknown.
 */
export function findUnknownProtocolIds(ids: string[]): string[] {
  return ids.filter((id) => !KNOWN_PROTOCOL_IDS.has(id));
}
