/**
 * OVI Knowledge Engine — Compatibility Matrix Module
 * FASE 2 · Foundation Order 002
 *
 * Exports the relational compatibility matrix and query functions.
 * Matrix dimensions: Product × Contamination × Surface × Industry × Service × Equipment × Protocol
 */

export {
  compatibilityMatrix,
  queryCompatibilityMatrix,
  getProductCompatibility,
  getProductsByContaminationMatrix,
  getProductsBySurfaceMatrix,
  getProductsByIndustryMatrix,
} from "./matrix";

export type { OviCompatibilityEntry, OviMatrixQuery, OviMatrixResult } from "../types";
