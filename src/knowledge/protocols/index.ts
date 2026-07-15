/**
 * OVI Knowledge Base — Protocols
 */

import { protocols } from "./catalog";
import { officialProtocols } from "./official-catalog";

export { protocols } from "./catalog";
export { officialProtocols } from "./official-catalog";

export function getProtocol(id: string) {
  return protocols.find((p) => p.id === id);
}

export function getProtocolByCode(codigo: string) {
  return protocols.find((p) => p.codigo === codigo);
}

export function getProtocolsBySector(sectorId: string) {
  return protocols.filter((p) => p.sectores.includes(sectorId));
}

export function getProtocolsByProduct(productId: string) {
  return protocols.filter((p) => p.productosRequeridos.includes(productId));
}

export function getOfficialProtocol(id: string) {
  return officialProtocols.find((p) => p.id === id);
}
