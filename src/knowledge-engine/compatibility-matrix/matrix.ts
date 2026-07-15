/**
 * OVI Knowledge Engine — Compatibility Matrix
 * FASE 2 · Foundation Order 002
 *
 * Relational matrix: Product × Contamination × Surface × Industry × Service × Equipment × Protocol
 *
 * This matrix is the single cross-reference table consulted by OVI AI
 * to determine which product combinations are valid for any given context.
 *
 * Compatibility scores (0–100):
 *   90–100  Primary match — product is designed for this exact use case
 *   70–89   Strong match — product is highly effective in this context
 *   50–69   Compatible — product can be used but is not the primary recommendation
 *   0–49    Not recommended — technical incompatibility or significant risk
 */

import type { OviCompatibilityEntry, OviMatrixQuery, OviMatrixResult } from "../types";

export const compatibilityMatrix: OviCompatibilityEntry[] = [
  // ── OVI BioClean Pro ─────────────────────────────────────────────────────────
  {
    productId: "ovi-bioclean-pro",
    contaminationIds: ["grasa-pesada", "aceite", "carbonilla", "residuos-organicos"],
    surfaceIds: ["acero-inoxidable", "concreto-sellado", "pintura-industrial"],
    industryIds: ["industria", "transporte", "energia", "alimentos"],
    serviceIds: ["diagnostico-tecnico", "implementacion-protocolo", "capacitacion-personal", "lavado-flota", "limpieza-industrial"],
    equipmentIds: ["ovi-flota-rinse-arch", "lanza-espuma-tecnica", "ovi-dose-control-cart"],
    protocolIds: ["protocolo-p-001", "protocolo-p-010", "protocolo-p-011"],
    compatibilityScore: 95,
  },

  // ── OVI Surface Guard X9 ─────────────────────────────────────────────────────
  {
    productId: "ovi-surface-guard-x9",
    contaminationIds: ["recontaminacion-superficial", "polvo-industrial"],
    surfaceIds: ["pisos-sellados", "concreto-sellado", "acero-inoxidable"],
    industryIds: ["institucional", "energia", "industria", "retail"],
    serviceIds: ["mantenimiento-preventivo", "diseno-protocolo"],
    equipmentIds: ["aplicador-microfibra-tecnica", "ovi-precision-foam-kit", "pulverizador-baja-presion"],
    protocolIds: ["protocolo-f-002", "protocolo-f-003", "protocolo-e-007"],
    compatibilityScore: 82,
  },

  // ── OVI Desengrasante Industrial ─────────────────────────────────────────────
  {
    productId: "ovi-desengrasante-industrial",
    contaminationIds: ["grasa-pesada", "aceite", "residuos-quimicos"],
    surfaceIds: ["acero-inoxidable", "pintura-industrial"],
    industryIds: ["industria", "energia", "transporte"],
    serviceIds: ["diagnostico-tecnico", "implementacion-protocolo"],
    equipmentIds: [],
    protocolIds: [],
    compatibilityScore: 88,
  },

  // ── OVI EcoDetox ─────────────────────────────────────────────────────────────
  {
    productId: "ovi-ecodetox",
    contaminationIds: ["residuos-quimicos", "residuos-organicos"],
    surfaceIds: ["ceramica", "acero-inoxidable", "pvc"],
    industryIds: ["institucional", "hospitales"],
    serviceIds: ["diseno-protocolo"],
    equipmentIds: [],
    protocolIds: [],
    compatibilityScore: 72,
  },

  // ── OVI ImperShield ──────────────────────────────────────────────────────────
  {
    productId: "ovi-impershield",
    contaminationIds: [],
    surfaceIds: ["concreto", "concreto-sellado"],
    industryIds: ["institucional", "energia"],
    serviceIds: ["mantenimiento-preventivo"],
    equipmentIds: [],
    protocolIds: [],
    compatibilityScore: 78,
  },

  // ── OVI FlotaClean ───────────────────────────────────────────────────────────
  {
    productId: "ovi-flotaclean",
    contaminationIds: ["grasa-pesada", "carbonilla", "lodo", "polvo-industrial"],
    surfaceIds: ["pintura-automotriz", "aluminio", "plastico-tecnico"],
    industryIds: ["transporte"],
    serviceIds: ["lavado-flota"],
    equipmentIds: ["ovi-flota-rinse-arch"],
    protocolIds: ["protocolo-p-001"],
    compatibilityScore: 91,
  },

  // ── OVI Formulación Personalizada ────────────────────────────────────────────
  {
    productId: "ovi-formulacion-personalizada",
    contaminationIds: [],
    surfaceIds: [],
    industryIds: ["industria", "transporte", "institucional", "alimentos", "energia"],
    serviceIds: ["diagnostico-tecnico"],
    equipmentIds: [],
    protocolIds: [],
    compatibilityScore: 60,
  },

  // ── OVI Flota Rinse Arch (equipo) ─────────────────────────────────────────────
  {
    productId: "ovi-flota-rinse-arch",
    contaminationIds: ["lodo", "polvo-industrial", "espuma-residual"],
    surfaceIds: ["pintura-automotriz", "pintura-industrial"],
    industryIds: ["transporte", "energia", "institucional"],
    serviceIds: ["lavado-flota", "optimizacion-hidrica", "auditoria-patio"],
    equipmentIds: ["ovi-dose-control-cart", "bomba-refuerzo"],
    protocolIds: ["protocolo-p-001", "protocolo-e-004"],
    compatibilityScore: 80,
  },

  // ── OVI Precision Foam Kit (accesorio) ───────────────────────────────────────
  {
    productId: "ovi-precision-foam-kit",
    contaminationIds: ["grasa-pesada", "biofilm", "residuos-organicos"],
    surfaceIds: ["acero-inoxidable", "ceramica", "plastico-tecnico"],
    industryIds: ["alimentos", "hospitales", "industria"],
    serviceIds: ["limpieza-industrial", "implementacion-protocolo"],
    equipmentIds: [],
    protocolIds: ["protocolo-h-001", "protocolo-f-002", "protocolo-p-010"],
    compatibilityScore: 77,
  },

  // ── OVI Dose Control Cart (accesorio) ────────────────────────────────────────
  {
    productId: "ovi-dose-control-cart",
    contaminationIds: [],
    surfaceIds: [],
    industryIds: ["industria", "transporte", "alimentos", "hospitales", "institucional"],
    serviceIds: ["lavado-flota", "limpieza-industrial", "implementacion-protocolo", "capacitacion-personal"],
    equipmentIds: [],
    protocolIds: ["protocolo-p-003", "protocolo-g-003"],
    compatibilityScore: 73,
  },
];

// ─── Matrix Query Functions ───────────────────────────────────────────────────

/**
 * Queries the compatibility matrix and returns products ranked by compatibility score.
 * Accepts any combination of filter dimensions.
 */
export function queryCompatibilityMatrix(query: OviMatrixQuery): OviMatrixResult {
  const { contaminationId, surfaceId, industryId, serviceId, equipmentId, protocolId } = query;

  const filtered = compatibilityMatrix.filter((entry) => {
    if (contaminationId && !entry.contaminationIds.includes(contaminationId)) return false;
    if (surfaceId && !entry.surfaceIds.includes(surfaceId)) return false;
    if (industryId && !entry.industryIds.includes(industryId)) return false;
    if (serviceId && !entry.serviceIds.includes(serviceId)) return false;
    if (equipmentId && !entry.equipmentIds.includes(equipmentId)) return false;
    if (protocolId && !entry.protocolIds.includes(protocolId)) return false;
    return true;
  });

  const sorted = [...filtered].sort((a, b) => b.compatibilityScore - a.compatibilityScore);

  return { entries: sorted, query };
}

/**
 * Returns the compatibility entry for a specific product.
 */
export function getProductCompatibility(productId: string): OviCompatibilityEntry | undefined {
  return compatibilityMatrix.find((entry) => entry.productId === productId);
}

/**
 * Returns all products compatible with a given contamination type, ranked by score.
 */
export function getProductsByContaminationMatrix(contaminationId: string): OviCompatibilityEntry[] {
  return compatibilityMatrix
    .filter((entry) => entry.contaminationIds.includes(contaminationId))
    .sort((a, b) => b.compatibilityScore - a.compatibilityScore);
}

/**
 * Returns all products compatible with a given surface, ranked by score.
 */
export function getProductsBySurfaceMatrix(surfaceId: string): OviCompatibilityEntry[] {
  return compatibilityMatrix
    .filter((entry) => entry.surfaceIds.includes(surfaceId))
    .sort((a, b) => b.compatibilityScore - a.compatibilityScore);
}

/**
 * Returns all products compatible with a given industry, ranked by score.
 */
export function getProductsByIndustryMatrix(industryId: string): OviCompatibilityEntry[] {
  return compatibilityMatrix
    .filter((entry) => entry.industryIds.includes(industryId))
    .sort((a, b) => b.compatibilityScore - a.compatibilityScore);
}
