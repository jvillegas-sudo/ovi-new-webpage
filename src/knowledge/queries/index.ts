/**
 * OVI Knowledge Base — Relational Query Helpers
 * FASE 1 · Foundation Order 001
 *
 * Cross-entity query functions that traverse the knowledge graph.
 * These helpers implement the core relationship chain:
 *
 *   Product → Contamination → Surface → Sector → Service → Protocol
 */

import { products, getProductsByContamination, getProductsBySurface, getProductsBySector } from "../products";
import { services, getServicesBySector } from "../services";
import { protocols, getProtocolsByProduct, getProtocolsBySector } from "../protocols";
import { equipment, getEquipmentByProduct } from "../equipment";
import { sectors, getSectorsByProduct } from "../sectors";
import { contaminationTypes, getContaminationTypesBySector } from "../contamination";
import { surfaces } from "../surfaces";

// ─── Primary chain: given a contamination type, find the full solution ────────

/**
 * Given a contamination type, returns recommended products.
 */
export function getSolutionForContamination(contaminationId: string) {
  const recommendedProducts = getProductsByContamination(contaminationId);
  return recommendedProducts;
}

/**
 * Given a surface ID, returns compatible products.
 */
export function getSolutionForSurface(surfaceId: string) {
  return getProductsBySurface(surfaceId);
}

// ─── Full solution resolver ───────────────────────────────────────────────────

export interface OviSolutionResult {
  products: typeof products;
  services: typeof services;
  protocols: typeof protocols;
  equipment: typeof equipment;
}

/**
 * Resolves a full OVI solution from a contamination type + surface + sector combination.
 * Used by OVI AI and Solution Lab to recommend a complete intervention.
 */
export function resolveSolution(params: {
  contaminationId?: string;
  surfaceId?: string;
  sectorId?: string;
}): OviSolutionResult {
  const { contaminationId, surfaceId, sectorId } = params;

  let candidateProducts = [...products];

  if (contaminationId) {
    const byContamination = getProductsByContamination(contaminationId).map((p) => p.id);
    candidateProducts = candidateProducts.filter((p) => byContamination.includes(p.id));
  }

  if (surfaceId) {
    const bySurface = getProductsBySurface(surfaceId).map((p) => p.id);
    const bySurfaceSet = new Set(bySurface);
    // Union: a product only needs to match contamination OR surface if both filters active
    if (contaminationId) {
      // Re-expand: include products matching surface even if they didn't match contamination
      const extra = getProductsBySurface(surfaceId).filter(
        (p) => !candidateProducts.some((cp) => cp.id === p.id),
      );
      candidateProducts = [...candidateProducts, ...extra];
    } else {
      candidateProducts = candidateProducts.filter((p) => bySurfaceSet.has(p.id));
    }
  }

  if (sectorId) {
    const bySector = getProductsBySector(sectorId).map((p) => p.id);
    const bySectorSet = new Set(bySector);
    if (candidateProducts.length > 0) {
      // Prefer products that also match the sector
      const sectorFiltered = candidateProducts.filter((p) => bySectorSet.has(p.id));
      if (sectorFiltered.length > 0) candidateProducts = sectorFiltered;
    } else {
      candidateProducts = getProductsBySector(sectorId);
    }
  }

  // Deduplicate
  const seenIds = new Set<string>();
  const finalProducts = candidateProducts.filter((p) => {
    if (seenIds.has(p.id)) return false;
    seenIds.add(p.id);
    return true;
  });

  // Derive services and protocols from resolved products
  const productIds = finalProducts.map((p) => p.id);
  const resolvedProtocols = protocols.filter((proto) =>
    proto.productosRequeridos.some((pid) => productIds.includes(pid)) ||
    (sectorId ? proto.sectores.includes(sectorId) : false),
  );
  const protocolIds = resolvedProtocols.map((p) => p.id);

  const resolvedServices = services.filter((svc) =>
    svc.productosAsociados.some((pid) => productIds.includes(pid)) ||
    svc.protocolosAsociados.some((pid) => protocolIds.includes(pid)) ||
    (sectorId ? svc.sectores.includes(sectorId) : false),
  );

  const resolvedEquipment = equipment.filter((eq) =>
    eq.productosCompatibles.some((pid) => productIds.includes(pid)) ||
    eq.protocolosCompatibles.some((pid) => protocolIds.includes(pid)),
  );

  return {
    products: finalProducts,
    services: resolvedServices,
    protocols: resolvedProtocols,
    equipment: resolvedEquipment,
  };
}

// ─── Sector overview ──────────────────────────────────────────────────────────

/**
 * Returns a complete sector overview including products, services, protocols,
 * and contamination types associated with a given sector.
 */
export function getSectorOverview(sectorId: string) {
  const sector = sectors.find((s) => s.id === sectorId);
  if (!sector) return null;

  return {
    sector,
    products: getProductsBySector(sectorId),
    services: getServicesBySector(sectorId),
    protocols: getProtocolsBySector(sectorId),
    contamination: getContaminationTypesBySector(sectorId),
  };
}

// ─── Product full context ─────────────────────────────────────────────────────

/**
 * Returns all related entities for a given product.
 */
export function getProductContext(productId: string) {
  const product = products.find((p) => p.id === productId);
  if (!product) return null;

  return {
    product,
    relatedProducts: products.filter((p) => product.productosRelacionados.includes(p.id)),
    protocols: getProtocolsByProduct(productId),
    equipment: getEquipmentByProduct(productId),
    sectors: getSectorsByProduct(productId),
    services: services.filter((s) => s.productosAsociados.includes(productId)),
    contamination: contaminationTypes.filter((c) => product.tiposSuciedad.includes(c.id)),
    surfaces: surfaces.filter((s) => product.superficiesCompatibles.includes(s.id)),
  };
}
