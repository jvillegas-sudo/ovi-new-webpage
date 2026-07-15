/**
 * OVI Knowledge Engine — Main Export Barrel
 * FASE 2 · Foundation Order 002
 *
 * Single entry point for the entire OVI Knowledge Engine.
 * All platform modules should import from here via:
 *
 *   import { generateRecommendation, decisionTree } from '@knowledge-engine'
 *
 * ─── Module exports ───────────────────────────────────────────────────────────
 */

// ── Types ──────────────────────────────────────────────────────────────────────
export type {
  OviDecisionInput,
  OviClientGoal,
  OviEnvironmentalRestriction,
  OviRuleCondition,
  OviProductRule,
  OviRuleEvaluationResult,
  OviDecisionNode,
  OviDecisionOption,
  OviDecisionPath,
  OviCompatibilityEntry,
  OviMatrixQuery,
  OviMatrixResult,
  OviRecommendation,
  OviReasoning,
  OviMappingRegistry,
  OviEntityToProductsMap,
  OviProductRelationMap,
  OviValidationResult,
  OviValidationError,
  OviValidationWarning,
} from "./types";

export { KE_VERSION, KE_PHASE, KE_STATUS } from "./types";

// ── Rules ──────────────────────────────────────────────────────────────────────
export {
  productRules,
  getProductRule,
  getRuleProductIds,
  evaluateCondition,
  evaluateProductRule,
} from "./rules";

// ── Decision Tree ──────────────────────────────────────────────────────────────
export {
  decisionTree,
  getEntryNode,
  getDecisionNode,
  getNextNode,
  getDecisionFlow,
} from "./decision-tree";

// ── Compatibility Matrix ────────────────────────────────────────────────────────
export {
  compatibilityMatrix,
  queryCompatibilityMatrix,
  getProductCompatibility,
  getProductsByContaminationMatrix,
  getProductsBySurfaceMatrix,
  getProductsByIndustryMatrix,
} from "./compatibility-matrix";

// ── Recommendation Engine ──────────────────────────────────────────────────────
export {
  generateRecommendation,
  generateResolvedRecommendation,
} from "./recommendation-engine";

// ── Mappings ───────────────────────────────────────────────────────────────────
export {
  mappingRegistry,
  getProductIdsByContamination,
  getProductIdsBySurface,
  getProductIdsByIndustry,
  getProductIdsByProtocol,
  getProductIdsByService,
  getProductRelations,
  getIntersectingProducts,
  getUnionProducts,
} from "./mappings";

// ── Validators ─────────────────────────────────────────────────────────────────
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
} from "./validators";
