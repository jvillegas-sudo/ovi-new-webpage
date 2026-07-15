/**
 * OVI Knowledge Base — Services
 */

import { services } from "./catalog";
import { officialServices } from "./official-catalog";

export { services } from "./catalog";
export { officialServices } from "./official-catalog";

export function getService(id: string) {
  return services.find((s) => s.id === id);
}

export function getServicesBySector(sectorId: string) {
  return services.filter((s) => s.sectores.includes(sectorId));
}

export function getServicesByProduct(productId: string) {
  return services.filter((s) => s.productosAsociados.includes(productId));
}

export function getServicesByProtocol(protocolId: string) {
  return services.filter((s) => s.protocolosAsociados.includes(protocolId));
}

export function getOfficialService(id: string) {
  return officialServices.find((s) => s.id === id);
}
