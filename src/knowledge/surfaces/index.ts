/**
 * OVI Knowledge Base — Surfaces
 */

import { surfaces } from "./catalog";

export { surfaces } from "./catalog";

export function getSurface(id: string) {
  return surfaces.find((s) => s.id === id);
}

export function getSurfacesBySensitivity(sensibilidad: "baja" | "media" | "alta") {
  return surfaces.filter((s) => s.sensibilidadQuimica === sensibilidad);
}
