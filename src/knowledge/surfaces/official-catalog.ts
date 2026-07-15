import type { OviKnowledgeSurface } from "../shared";
import { surfaces } from "./catalog";

const requiredSurfaceIds = new Set([
  "acero-inoxidable",
  "aluminio",
  "vidrio",
  "concreto",
  "pvc",
  "ceramica",
  "pintura-automotriz",
  "caucho",
  "plastico-tecnico",
]);

export const officialSurfaces: OviKnowledgeSurface[] = surfaces
  .filter((surface) => requiredSurfaceIds.has(surface.id))
  .map((surface) => ({
    id: surface.id,
    nombre: surface.nombre,
    descripcion: surface.descripcion,
    estado: surface.status,
  }));
