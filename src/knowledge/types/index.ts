/**
 * OVI Knowledge Base — Type Definitions
 * FASE 1 · Foundation Order 001
 *
 * Canonical TypeScript interfaces for every entity in the OVI domain.
 * All platform modules must consume data through these types.
 */

// ─── Status ───────────────────────────────────────────────────────────────────

/** Lifecycle status for any knowledge-base entity. */
export type KbStatus = "activo" | "en-revision" | "pendiente" | "inactivo";

// ─── Contamination Types ──────────────────────────────────────────────────────

export interface OviContaminationType {
  /** Unique kebab-case identifier */
  id: string;
  /** Display name (Spanish) */
  nombre: string;
  /** Short description */
  descripcion: string;
  /** Difficulty of removal: low | medium | high | critical */
  dificultadRemocion: "baja" | "media" | "alta" | "crítica";
  /** Typical sectors where this contamination appears */
  sectoresHabituales: string[];
  status: KbStatus;
}

// ─── Surfaces ─────────────────────────────────────────────────────────────────

export interface OviSurface {
  id: string;
  nombre: string;
  descripcion: string;
  /** Chemical sensitivity level */
  sensibilidadQuimica: "baja" | "media" | "alta";
  /** Notes for cleaning engineers */
  notas?: string;
  status: KbStatus;
}

// ─── Sectors ──────────────────────────────────────────────────────────────────

export interface OviSector {
  id: string;
  nombre: string;
  descripcion: string;
  /** Main operational challenges this sector faces */
  desafios: string[];
  /** IDs of products typically used in this sector */
  productosRelacionados: string[];
  /** IDs of services typically deployed in this sector */
  serviciosRelacionados: string[];
  /** IDs of protocols relevant to this sector */
  protocolosRelacionados: string[];
  status: KbStatus;
}

// ─── Protocols ────────────────────────────────────────────────────────────────

export interface OviProtocol {
  id: string;
  /** Official protocol code, e.g. "P-001" */
  codigo: string;
  nombre: string;
  descripcion: string;
  /** Target sector IDs */
  sectores: string[];
  /** Required product IDs */
  productosRequeridos: string[];
  /** Required equipment IDs */
  equiposRequeridos: string[];
  /** Step-by-step execution instructions */
  pasos: string[];
  /** Applicable contamination type IDs */
  tiposSuciedad: string[];
  /** Compatible surface IDs */
  superficiesCompatibles: string[];
  /** Estimated time per application cycle */
  tiempoEstimado?: string;
  /** Frequency recommendation */
  frecuenciaRecomendada?: string;
  status: KbStatus;
}

// ─── Equipment ────────────────────────────────────────────────────────────────

export interface OviEquipment {
  id: string;
  nombre: string;
  categoria: "sistema-lavado" | "dosificacion" | "espuma" | "accesorio" | "herramienta" | "otro";
  descripcion: string;
  /** Compatible product IDs */
  productosCompatibles: string[];
  /** Compatible protocol IDs */
  protocolosCompatibles: string[];
  /** Key technical specifications */
  especificaciones: string[];
  status: KbStatus;
}

// ─── Media ────────────────────────────────────────────────────────────────────

export interface OviMedia {
  id: string;
  tipo: "imagen" | "video" | "documento" | "icono";
  url: string;
  /** Alt text / caption */
  descripcion: string;
  /** Linked entity type */
  entidad?: "producto" | "servicio" | "sector" | "protocolo" | "equipo";
  /** Linked entity ID */
  entidadId?: string;
  status: KbStatus;
}

// ─── Documents ────────────────────────────────────────────────────────────────

export type OviDocumentType =
  | "ficha-tecnica"
  | "msds"
  | "brochure"
  | "protocolo-pdf"
  | "certificado"
  | "otro";

export interface OviDocument {
  id: string;
  tipo: OviDocumentType;
  nombre: string;
  url: string;
  /** Linked entity ID (product, service, etc.) */
  entidadId: string;
  /** Linked entity type */
  entidad: "producto" | "servicio" | "protocolo" | "equipo";
  idioma: "es" | "en";
  status: KbStatus;
}

// ─── Services ─────────────────────────────────────────────────────────────────

export interface OviService {
  id: string;
  nombre: string;
  descripcion: string;
  /** Summary pitch line */
  resumen: string;
  /** Target sector IDs */
  sectores: string[];
  /** Key client benefits */
  beneficios: string[];
  /** Problems this service solves */
  problemasQueResuelve: string[];
  /** Required equipment IDs */
  equiposNecesarios: string[];
  /** Associated product IDs */
  productosAsociados: string[];
  /** Associated protocol IDs */
  protocolosAsociados: string[];
  /** Gallery media IDs */
  galeria: string[];
  /** Deliverables included */
  entregables: string[];
  status: KbStatus;
}

// ─── Products ─────────────────────────────────────────────────────────────────

export type OviProductCategory = "quimicos" | "equipos" | "accesorios" | "herramientas";

export interface OviProduct {
  /** Unique kebab-case slug, used as URL and reference key */
  id: string;
  nombre: string;
  categoria: OviProductCategory;
  /** Short one-line description */
  resumen: string;
  /** Extended description for detail pages */
  descripcion: string;
  /** Key selling points */
  beneficios: string[];
  /** Use-case applications */
  aplicaciones: string[];
  /** Contamination type IDs this product targets */
  tiposSuciedad: string[];
  /** Compatible surface IDs */
  superficiesCompatibles: string[];
  /** Target sector IDs */
  industrias: string[];
  /** Recommended dilution ranges or notes */
  dilucion: string;
  /** Step-by-step usage instructions */
  modoUso: string;
  /** Contact time before rinse */
  tiempoAccion?: string;
  /** Compatible equipment IDs */
  equipoRecomendado: string[];
  /** Related service IDs */
  serviciosRelacionados: string[];
  /** Environmental impact & benefits */
  impactoAmbiental: string[];
  /** Safety notes */
  informacionSeguridad: string[];
  /** Gallery media IDs */
  imagenes: string[];
  /** Document IDs: brochure, ficha tecnica, msds */
  brochure?: string;
  fichaTecnica?: string;
  msds?: string;
  /** AI recommendation text */
  recomendacionAI?: string;
  /** Challenge statement for Solution Lab */
  desafio?: string;
  /** Solution Lab scene description */
  escenaLab?: string;
  /** Related product IDs */
  productosRelacionados: string[];
  status: KbStatus;
}

// ─── Knowledge Base Root ──────────────────────────────────────────────────────

export interface OviKnowledgeBase {
  version: string;
  updatedAt: string;
  products: OviProduct[];
  services: OviService[];
  sectors: OviSector[];
  contamination: OviContaminationType[];
  surfaces: OviSurface[];
  protocols: OviProtocol[];
  equipment: OviEquipment[];
  media: OviMedia[];
  documents: OviDocument[];
}
