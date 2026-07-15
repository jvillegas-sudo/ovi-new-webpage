import type { OviKnowledgeSector } from "../shared";
import { sectors } from "./catalog";

const baseSectors: OviKnowledgeSector[] = sectors.map((sector) => ({
  id: sector.id === "hospitales" ? "hospitalario" : sector.id,
  nombre: sector.id === "hospitales" ? "Hospitalario" : sector.nombre,
  descripcion: sector.descripcion,
  estado: sector.status,
}));

const infrastructureSector: OviKnowledgeSector = {
  id: "infraestructura",
  nombre: "Infraestructura",
  descripcion:
    "Operaciones de limpieza técnica en infraestructura pública y privada con foco en continuidad operacional, seguridad y control de deterioro.",
  estado: "en-revision",
};

export const officialSectors: OviKnowledgeSector[] = [
  ...baseSectors.filter((sector) => sector.id !== "hospitales"),
  infrastructureSector,
];
