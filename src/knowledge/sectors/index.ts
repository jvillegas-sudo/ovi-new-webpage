/**
 * OVI Knowledge Base — Sectors
 */

import { sectors } from "./catalog";

export { sectors } from "./catalog";

export function getSector(id: string) {
  return sectors.find((s) => s.id === id);
}

export function getSectorsByProduct(productId: string) {
  return sectors.filter((s) => s.productosRelacionados.includes(productId));
}

export function getSectorsByService(serviceId: string) {
  return sectors.filter((s) => s.serviciosRelacionados.includes(serviceId));
}
