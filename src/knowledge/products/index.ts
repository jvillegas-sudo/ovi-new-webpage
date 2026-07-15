/**
 * OVI Knowledge Base — Products
 */

import { products } from "./catalog";
import type { OviProductCategory } from "../types";

export { products } from "./catalog";

export function getProduct(id: string) {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(categoria: OviProductCategory) {
  return products.filter((p) => p.categoria === categoria);
}

export function getProductsBySector(sectorId: string) {
  return products.filter((p) => p.industrias.includes(sectorId));
}

export function getProductsByContamination(contaminationId: string) {
  return products.filter((p) => p.tiposSuciedad.includes(contaminationId));
}

export function getProductsBySurface(surfaceId: string) {
  return products.filter((p) => p.superficiesCompatibles.includes(surfaceId));
}

export function getProductsByIds(ids: string[]) {
  return ids.map((id) => getProduct(id)).filter((p): p is NonNullable<typeof p> => Boolean(p));
}
