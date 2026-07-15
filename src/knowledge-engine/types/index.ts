/**
 * OVI Knowledge Engine — Type Definitions
 * FASE 2 · Foundation Order 002
 *
 * Engine-specific interfaces for the OVI reasoning layer.
 * These types power the decision tree, rule engine, compatibility matrix,
 * and recommendation engine consumed by OVI AI, OVI Lab, OVI OS, Store,
 * and all intelligent agents.
 *
 * IMPORTANT: This module contains LOGIC TYPES only.
 * Data entity types live in @knowledge/types.
 */

// ─── Decision Input ───────────────────────────────────────────────────────────

/**
 * Input context provided by the user or agent to drive the decision engine.
 * Every field is optional — the engine resolves with whatever context is available.
 *
 * Flow:
 *   industryId → assetType → zone → surfaceId →
 *   contaminationId → contaminationLevel → clientGoal → environmentalRestrictions
 */
export interface OviDecisionInput {
  /** Sector / industry ID from knowledge base (e.g. "transporte", "alimentos") */
  industryId?: string;
  /** Type of operational asset being cleaned (e.g. "camion", "linea-produccion", "piso") */
  assetType?: string;
  /** Specific zone within an asset or facility (e.g. "motor", "cabina", "area-proceso") */
  zone?: string;
  /** Surface material ID from knowledge base (e.g. "acero-inoxidable", "aluminio") */
  surfaceId?: string;
  /** Contamination type ID from knowledge base (e.g. "grasa-pesada", "biofilm") */
  contaminationId?: string;
  /** Severity level of contamination */
  contaminationLevel?: "leve" | "moderado" | "severo" | "crítico";
  /** Primary client operational objective */
  clientGoal?: OviClientGoal;
  /** Environmental or regulatory restrictions that must be respected */
  environmentalRestrictions?: OviEnvironmentalRestriction[];
}

/** Primary operational goals a client may express. */
export type OviClientGoal =
  | "reducir-consumo-agua"
  | "cumplir-normativa-haccp"
  | "eliminar-biofilm"
  | "mantenimiento-preventivo"
  | "limpieza-correctiva"
  | "proteger-superficie"
  | "reducir-tiempo-ciclo"
  | "minimizar-carga-quimica"
  | "trazabilidad-auditoria"
  | "impermeabilizacion";

/** Restrictions that limit product or protocol selection. */
export type OviEnvironmentalRestriction =
  | "zona-alimentaria"
  | "zona-hospitalaria"
  | "superficie-delicada"
  | "restriccion-sanitaria"
  | "incompatibilidad-quimica"
  | "area-protegida-ambiental"
  | "riesgo-electrico"
  | "sin-solventes-clorados"
  | "biodegradable-requerido";

// ─── Rule Engine ──────────────────────────────────────────────────────────────

/** A single parametric rule condition evaluated against an OviDecisionInput. */
export interface OviRuleCondition {
  /** The field of OviDecisionInput this condition evaluates */
  field: keyof OviDecisionInput;
  /** Comparison operator */
  operator: "equals" | "includes" | "notEquals" | "notIncludes" | "exists" | "notExists";
  /** Value to compare against (omit for exists/notExists operators) */
  value?: string | string[];
  /** Human-readable reason why this condition matters */
  reason: string;
}

/**
 * Parametric rule set for a product.
 * Encodes when to recommend and when NOT to recommend a product.
 *
 * SE RECOMIENDA SI → recommendIf conditions
 * NO SE RECOMIENDA SI → doNotRecommendIf conditions
 */
export interface OviProductRule {
  /** Product ID this rule set applies to */
  productId: string;
  /**
   * SE RECOMIENDA SI:
   * Conditions where this product is a good candidate.
   * Product is recommended if ANY condition in this array matches.
   */
  recommendIf: OviRuleCondition[];
  /**
   * NO SE RECOMIENDA SI:
   * Conditions that disqualify this product regardless of positive signals.
   * Product is excluded if ANY condition in this array matches.
   */
  doNotRecommendIf: OviRuleCondition[];
  /**
   * Priority score (0–100) applied when multiple products qualify.
   * Higher = recommended first.
   */
  priority: number;
}

/** Result of evaluating a product rule against an input context. */
export interface OviRuleEvaluationResult {
  productId: string;
  recommended: boolean;
  excluded: boolean;
  matchedRecommendConditions: OviRuleCondition[];
  matchedExclusionConditions: OviRuleCondition[];
  score: number;
}

// ─── Decision Tree ────────────────────────────────────────────────────────────

/**
 * A single node in the OVI decision tree.
 * Each node poses one question and branches based on the answer.
 */
export interface OviDecisionNode {
  /** Unique node identifier */
  id: string;
  /** Step number in the decision flow (1–8 for inputs, 9–13 for outputs) */
  step: number;
  /** Question displayed to the user or agent */
  question: string;
  /** Field of OviDecisionInput this node populates */
  field: keyof OviDecisionInput;
  /** Available answer options */
  options: OviDecisionOption[];
  /** Whether this node is required to produce a recommendation */
  required: boolean;
  /** Human-readable description of why this question matters */
  description: string;
}

/** A single answer option within a decision node. */
export interface OviDecisionOption {
  /** The value assigned to the corresponding OviDecisionInput field */
  value: string;
  /** Display label */
  label: string;
  /** ID of the next decision node, or null if this is terminal */
  nextNodeId: string | null;
  /** Additional context or guidance for this option */
  hint?: string;
}

/**
 * A resolved decision path: the sequence of answers that led to the
 * recommendation, plus the accumulated input context.
 */
export interface OviDecisionPath {
  /** Ordered list of (nodeId, selectedValue) pairs */
  steps: Array<{ nodeId: string; value: string }>;
  /** Accumulated input built from the path */
  resolvedInput: OviDecisionInput;
}

// ─── Compatibility Matrix ─────────────────────────────────────────────────────

/**
 * A single row in the compatibility matrix.
 * Encodes which entity combinations are valid for a given product.
 *
 * Matrix dimensions:
 *   Product × Contamination × Surface × Industry × Service × Equipment × Protocol
 */
export interface OviCompatibilityEntry {
  /** Product this entry describes */
  productId: string;
  /** Compatible contamination type IDs */
  contaminationIds: string[];
  /** Compatible surface IDs */
  surfaceIds: string[];
  /** Applicable industry / sector IDs */
  industryIds: string[];
  /** Compatible service IDs */
  serviceIds: string[];
  /** Recommended equipment IDs */
  equipmentIds: string[];
  /** Associated protocol IDs */
  protocolIds: string[];
  /**
   * Computed compatibility score (0–100) across all dimensions.
   * Used to rank products when multiple match the same context.
   */
  compatibilityScore: number;
}

/** Query parameters for matrix lookup. */
export interface OviMatrixQuery {
  contaminationId?: string;
  surfaceId?: string;
  industryId?: string;
  serviceId?: string;
  equipmentId?: string;
  protocolId?: string;
}

/** Result from a matrix query: products ranked by compatibility score. */
export interface OviMatrixResult {
  entries: OviCompatibilityEntry[];
  query: OviMatrixQuery;
}

// ─── Recommendation Engine ────────────────────────────────────────────────────

/**
 * Full OVI recommendation output.
 * The engine NEVER returns just a product.
 * It always returns a complete solution package.
 */
export interface OviRecommendation {
  /** Diagnostic summary: what problem is being solved */
  diagnosis: string;
  /** Technical justification for the recommendation */
  technicalJustification: string;
  /** Recommended protocol ID (from knowledge base) */
  protocolId: string | null;
  /** Recommended service ID (from knowledge base) */
  serviceId: string | null;
  /** Primary product ID */
  primaryProductId: string | null;
  /** Complementary product IDs to complete the solution */
  complementaryProductIds: string[];
  /** Recommended equipment IDs */
  equipmentIds: string[];
  /** Expected operational benefit */
  expectedBenefit: string;
  /** Reasoning: answers to "why?" for each recommendation dimension */
  reasoning: OviReasoning;
  /**
   * Confidence level of the recommendation.
   * alta = high-confidence match (3+ dimensions resolved)
   * media = partial match (1–2 dimensions resolved)
   * baja = default fallback recommendation
   */
  confidence: "alta" | "media" | "baja";
  /** The input context that generated this recommendation */
  input: OviDecisionInput;
  /** ISO timestamp when this recommendation was generated */
  generatedAt: string;
}

/**
 * Structured reasoning: answers to the fundamental "why?" questions
 * that must accompany every OVI recommendation.
 */
export interface OviReasoning {
  /** ¿Por qué ese producto? */
  whyProduct: string;
  /** ¿Por qué ese protocolo? */
  whyProtocol: string;
  /** ¿Por qué ese servicio? */
  whyService: string;
  /** ¿Qué riesgo evita? */
  risksAvoided: string[];
  /** ¿Qué beneficio genera? */
  benefitsGenerated: string[];
}

// ─── Mappings ─────────────────────────────────────────────────────────────────

/** Pre-computed index: maps an entity ID to all related product IDs. */
export type OviEntityToProductsMap = Record<string, string[]>;

/** Pre-computed index: maps a product ID to all related entity IDs by type. */
export interface OviProductRelationMap {
  contaminationIds: string[];
  surfaceIds: string[];
  industryIds: string[];
  serviceIds: string[];
  equipmentIds: string[];
  protocolIds: string[];
}

/** Full mapping registry consumed by the recommendation engine. */
export interface OviMappingRegistry {
  /** contamination ID → product IDs */
  contaminationToProducts: OviEntityToProductsMap;
  /** surface ID → product IDs */
  surfaceToProducts: OviEntityToProductsMap;
  /** industry ID → product IDs */
  industryToProducts: OviEntityToProductsMap;
  /** product ID → full relation map */
  productRelations: Record<string, OviProductRelationMap>;
  /** protocol ID → product IDs */
  protocolToProducts: OviEntityToProductsMap;
  /** service ID → product IDs */
  serviceToProducts: OviEntityToProductsMap;
}

// ─── Validators ───────────────────────────────────────────────────────────────

/** Result of a validation check. */
export interface OviValidationResult {
  valid: boolean;
  errors: OviValidationError[];
  warnings: OviValidationWarning[];
}

export interface OviValidationError {
  field: string;
  value: string;
  message: string;
}

export interface OviValidationWarning {
  field: string;
  value: string;
  message: string;
}

// ─── Engine Metadata ──────────────────────────────────────────────────────────

export const KE_VERSION = "1.0.0";
export const KE_PHASE = "FASE 2 — Foundation Order 002";
export const KE_STATUS = "ACTIVE";
