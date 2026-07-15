/**
 * OVI Knowledge Base — Contamination Types
 */

import { contaminationTypes } from "./catalog";

export { contaminationTypes } from "./catalog";

export function getContaminationType(id: string) {
  return contaminationTypes.find((c) => c.id === id);
}

export function getContaminationTypesByDifficulty(
  dificultad: "baja" | "media" | "alta" | "crítica",
) {
  return contaminationTypes.filter((c) => c.dificultadRemocion === dificultad);
}

export function getContaminationTypesBySector(sectorId: string) {
  return contaminationTypes.filter((c) => c.sectoresHabituales.includes(sectorId));
}
