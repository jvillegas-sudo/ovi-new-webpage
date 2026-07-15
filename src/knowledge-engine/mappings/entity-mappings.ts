/**
 * OVI Knowledge Engine — Entity Mappings
 * FASE 2 · Foundation Order 002
 *
 * Pre-computed bidirectional relationship maps built from the compatibility matrix.
 * Used by the recommendation engine for O(1) lookups instead of linear scans.
 *
 * Maps are derived from the single source of truth: the compatibility matrix.
 * Never define relationships here that aren't in the matrix.
 */

import { compatibilityMatrix } from "../compatibility-matrix/matrix";
import type { OviMappingRegistry, OviEntityToProductsMap, OviProductRelationMap } from "../types";

// ─── Build Registry from Matrix ───────────────────────────────────────────────

function buildMappingRegistry(): OviMappingRegistry {
  const contaminationToProducts: OviEntityToProductsMap = {};
  const surfaceToProducts: OviEntityToProductsMap = {};
  const industryToProducts: OviEntityToProductsMap = {};
  const protocolToProducts: OviEntityToProductsMap = {};
  const serviceToProducts: OviEntityToProductsMap = {};
  const productRelations: Record<string, OviProductRelationMap> = {};

  for (const entry of compatibilityMatrix) {
    const { productId, contaminationIds, surfaceIds, industryIds, protocolIds, serviceIds, equipmentIds } = entry;

    // Build product → relations map
    productRelations[productId] = {
      contaminationIds,
      surfaceIds,
      industryIds,
      serviceIds,
      equipmentIds,
      protocolIds,
    };

    // Build contamination → products map
    for (const cId of contaminationIds) {
      contaminationToProducts[cId] ??= [];
      if (!contaminationToProducts[cId].includes(productId)) {
        contaminationToProducts[cId].push(productId);
      }
    }

    // Build surface → products map
    for (const sId of surfaceIds) {
      surfaceToProducts[sId] ??= [];
      if (!surfaceToProducts[sId].includes(productId)) {
        surfaceToProducts[sId].push(productId);
      }
    }

    // Build industry → products map
    for (const iId of industryIds) {
      industryToProducts[iId] ??= [];
      if (!industryToProducts[iId].includes(productId)) {
        industryToProducts[iId].push(productId);
      }
    }

    // Build protocol → products map
    for (const pId of protocolIds) {
      protocolToProducts[pId] ??= [];
      if (!protocolToProducts[pId].includes(productId)) {
        protocolToProducts[pId].push(productId);
      }
    }

    // Build service → products map
    for (const svId of serviceIds) {
      serviceToProducts[svId] ??= [];
      if (!serviceToProducts[svId].includes(productId)) {
        serviceToProducts[svId].push(productId);
      }
    }
  }

  return {
    contaminationToProducts,
    surfaceToProducts,
    industryToProducts,
    productRelations,
    protocolToProducts,
    serviceToProducts,
  };
}

/**
 * Pre-computed mapping registry.
 * Built once at module load from the compatibility matrix.
 */
export const mappingRegistry: OviMappingRegistry = buildMappingRegistry();

// ─── Lookup Helpers ──────────────────────────────────────────────────────────

/**
 * Returns all product IDs compatible with the given contamination type.
 */
export function getProductIdsByContamination(contaminationId: string): string[] {
  return mappingRegistry.contaminationToProducts[contaminationId] ?? [];
}

/**
 * Returns all product IDs compatible with the given surface.
 */
export function getProductIdsBySurface(surfaceId: string): string[] {
  return mappingRegistry.surfaceToProducts[surfaceId] ?? [];
}

/**
 * Returns all product IDs for the given industry/sector.
 */
export function getProductIdsByIndustry(industryId: string): string[] {
  return mappingRegistry.industryToProducts[industryId] ?? [];
}

/**
 * Returns all product IDs associated with the given protocol.
 */
export function getProductIdsByProtocol(protocolId: string): string[] {
  return mappingRegistry.protocolToProducts[protocolId] ?? [];
}

/**
 * Returns all product IDs associated with the given service.
 */
export function getProductIdsByService(serviceId: string): string[] {
  return mappingRegistry.serviceToProducts[serviceId] ?? [];
}

/**
 * Returns the full relation map for a product.
 */
export function getProductRelations(productId: string): OviProductRelationMap | undefined {
  return mappingRegistry.productRelations[productId];
}

/**
 * Returns all product IDs that appear in the intersection of multiple entity lookups.
 * Used to find products that match ALL given filters simultaneously.
 */
export function getIntersectingProducts(params: {
  contaminationId?: string;
  surfaceId?: string;
  industryId?: string;
}): string[] {
  const { contaminationId, surfaceId, industryId } = params;

  const sets: string[][] = [];

  if (contaminationId) sets.push(getProductIdsByContamination(contaminationId));
  if (surfaceId) sets.push(getProductIdsBySurface(surfaceId));
  if (industryId) sets.push(getProductIdsByIndustry(industryId));

  if (sets.length === 0) return [];
  if (sets.length === 1) return sets[0];

  // Intersection: products must appear in ALL sets
  return sets.reduce((acc, set) => acc.filter((id) => set.includes(id)));
}

/**
 * Returns all product IDs that appear in the UNION of multiple entity lookups.
 * Used when a partial match is acceptable (at least one dimension matches).
 */
export function getUnionProducts(params: {
  contaminationId?: string;
  surfaceId?: string;
  industryId?: string;
}): string[] {
  const { contaminationId, surfaceId, industryId } = params;
  const seen = new Set<string>();

  if (contaminationId) getProductIdsByContamination(contaminationId).forEach((id) => seen.add(id));
  if (surfaceId) getProductIdsBySurface(surfaceId).forEach((id) => seen.add(id));
  if (industryId) getProductIdsByIndustry(industryId).forEach((id) => seen.add(id));

  return Array.from(seen);
}
