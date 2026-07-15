/**
 * OVI Knowledge Base — Surfaces
 */

import { surfaces } from "./catalog";
import { officialSurfaces } from "./official-catalog";

export { surfaces } from "./catalog";
export { officialSurfaces } from "./official-catalog";

export function getSurface(id: string) {
  return surfaces.find((s) => s.id === id);
}

export function getSurfacesBySensitivity(sensibilidad: "baja" | "media" | "alta") {
  return surfaces.filter((s) => s.sensibilidadQuimica === sensibilidad);
}

export function getOfficialSurface(id: string) {
  return officialSurfaces.find((surface) => surface.id === id);
}
