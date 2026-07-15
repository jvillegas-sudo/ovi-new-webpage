/**
 * OVI Knowledge Base — Documents Registry
 * FASE 1 · Foundation Order 001
 *
 * Technical documents (ficha técnica, MSDS, brochures, certificates)
 * linked to KB entities. Populated when official documents are provided.
 */

import type { OviDocument } from "../types";

export const documents: OviDocument[] = [
  // Documents will be added when official technical sheets, MSDS,
  // and brochures are provided by OVI. This catalog maps document IDs
  // to hosted URLs and links them to products, services, and protocols.
];

export function getDocument(id: string) {
  return documents.find((d) => d.id === id);
}

export function getDocumentsByEntity(entidad: string, entidadId: string) {
  return documents.filter((d) => d.entidad === entidad && d.entidadId === entidadId);
}

export function getDocumentsByType(tipo: string) {
  return documents.filter((d) => d.tipo === tipo);
}
