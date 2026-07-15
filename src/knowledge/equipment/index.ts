/**
 * OVI Knowledge Base — Equipment
 */

import { equipment } from "./catalog";

export { equipment } from "./catalog";

export function getEquipment(id: string) {
  return equipment.find((e) => e.id === id);
}

export function getEquipmentByCategory(
  categoria: "sistema-lavado" | "dosificacion" | "espuma" | "accesorio" | "herramienta" | "otro",
) {
  return equipment.filter((e) => e.categoria === categoria);
}

export function getEquipmentByProduct(productId: string) {
  return equipment.filter((e) => e.productosCompatibles.includes(productId));
}
