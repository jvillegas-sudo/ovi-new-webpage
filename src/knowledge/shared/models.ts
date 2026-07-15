export type OviKnowledgeStatus = "activo" | "en-revision" | "pendiente" | "inactivo";

export interface OviKnowledgeProduct {
  id: string;
  nombre: string;
  categoria: string;
  descripcion: string;
  beneficios: string[];
  aplicaciones: string[];
  sectores: string[];
  tipo_de_suciedad: string[];
  superficies: string[];
  modo_de_uso: string;
  dilucion: string;
  tiempo_de_accion: string;
  equipos_recomendados: string[];
  servicios_relacionados: string[];
  protocolos_relacionados: string[];
  impacto_ambiental: string[];
  compatibilidades: string[];
  incompatibilidades: string[];
  ficha_tecnica: string | null;
  msds: string | null;
  imagenes: string[];
  estado: OviKnowledgeStatus;
}

export interface OviKnowledgeService {
  id: string;
  nombre: string;
  descripcion: string;
  problema_que_resuelve: string[];
  sectores: string[];
  productos_relacionados: string[];
  equipos: string[];
  protocolos: string[];
  beneficios: string[];
  galeria: string[];
  estado: OviKnowledgeStatus;
}

export interface OviKnowledgeProtocol {
  id: string;
  nombre: string;
  objetivo: string;
  preparacion: string[];
  equipos: string[];
  productos: string[];
  diluciones: string[];
  frecuencia: string;
  tiempo: string;
  normas_de_seguridad: string[];
  buenas_practicas: string[];
  sectores: string[];
  tipo_de_suciedad: string[];
  superficies: string[];
  estado: OviKnowledgeStatus;
}

export interface OviKnowledgeContaminant {
  id: string;
  nombre: string;
  descripcion: string;
  estado: OviKnowledgeStatus;
}

export interface OviKnowledgeSurface {
  id: string;
  nombre: string;
  descripcion: string;
  estado: OviKnowledgeStatus;
}

export interface OviKnowledgeSector {
  id: string;
  nombre: string;
  descripcion: string;
  estado: OviKnowledgeStatus;
}
