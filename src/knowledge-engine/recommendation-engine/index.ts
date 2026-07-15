/**
 * OVI Knowledge Engine — Recommendation Engine Module
 * FASE 2 · Foundation Order 002
 *
 * Exports the core OVI recommendation engine.
 * Returns complete solution packages — never just a product.
 */

export {
  generateRecommendation,
  generateResolvedRecommendation,
} from "./recommender";

export type {
  OviRecommendation,
  OviReasoning,
  OviDecisionInput,
} from "../types";
