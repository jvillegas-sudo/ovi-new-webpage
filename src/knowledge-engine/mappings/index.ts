/**
 * OVI Knowledge Engine — Mappings Module
 * FASE 2 · Foundation Order 002
 *
 * Exports pre-computed entity relationship maps for O(1) lookups.
 */

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
} from "./entity-mappings";

export type {
  OviMappingRegistry,
  OviEntityToProductsMap,
  OviProductRelationMap,
} from "../types";
