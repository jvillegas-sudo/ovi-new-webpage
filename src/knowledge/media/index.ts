/**
 * OVI Knowledge Base — Media Registry
 * FASE 1 · Foundation Order 001
 *
 * Media assets (images, videos, documents) linked to KB entities.
 * Populated when official media is provided by OVI.
 */

import type { OviMedia } from "../types";

export const media: OviMedia[] = [
  // Media assets will be added when official photography and branding
  // materials are provided by OVI. This catalog maps media IDs to URLs
  // and links them to products, services, sectors, protocols, and equipment.
];

export function getMedia(id: string) {
  return media.find((m) => m.id === id);
}

export function getMediaByEntity(entidad: string, entidadId: string) {
  return media.filter((m) => m.entidad === entidad && m.entidadId === entidadId);
}
