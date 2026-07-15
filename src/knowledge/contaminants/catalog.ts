import type { OviKnowledgeContaminant } from "../shared";
import { contaminationTypes } from "../contamination";

export const contaminants: OviKnowledgeContaminant[] = contaminationTypes.map((item) => ({
  id: item.id === "sarro" ? "cal" : item.id,
  nombre: item.id === "sarro" ? "Cal" : item.nombre,
  descripcion: item.descripcion,
  estado: item.status,
}));
