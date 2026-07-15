/**
 * OVI Solution Journey — Data Layer
 * Work Order 014 — OVI Solution Journey
 *
 * Step definitions, option mappings, and success case associations
 * for the "Descubre tu Solución" guided experience.
 *
 * Architecture rule: All data flows from @knowledge and @knowledge-engine.
 * This file only defines the journey UX layer (labels, icons, mappings).
 */

import type { OviClientGoal, OviEnvironmentalRestriction } from "@knowledge-engine";

// ─── Asset Options (Step 1: ¿Qué deseas limpiar o proteger?) ──────────────────

export interface AssetOption {
  id: string;
  label: string;
  description: string;
  icon: string; // lucide icon name
  /** Mapped industry/sector ID for OVI Core */
  industryId: string;
  /** Mapped asset type string for OVI Core */
  assetType: string;
  /** Optional environmental restrictions implied by this asset */
  environmentalRestrictions?: OviEnvironmentalRestriction[];
}

export const assetOptions: AssetOption[] = [
  {
    id: "flota-transporte",
    label: "Flota de transporte",
    description: "Camiones, buses, vehículos de carga y flota corporativa",
    icon: "Truck",
    industryId: "transporte",
    assetType: "vehiculo-flota",
  },
  {
    id: "planta-industrial",
    label: "Planta industrial",
    description: "Maquinaria, líneas de producción y equipos de proceso",
    icon: "Factory",
    industryId: "industria",
    assetType: "planta-industrial",
  },
  {
    id: "fachada",
    label: "Fachada",
    description: "Vidrio, alucobond, ladrillo, concreto y mármol",
    icon: "Building2",
    industryId: "institucional",
    assetType: "fachada",
  },
  {
    id: "panel-solar",
    label: "Panel solar",
    description: "Módulos fotovoltaicos y sistemas de generación energética",
    icon: "Sun",
    industryId: "energia",
    assetType: "panel-solar",
  },
  {
    id: "cocina-industrial",
    label: "Cocina industrial",
    description: "Equipos de cocción, extractores, superficies de alimentos",
    icon: "ChefHat",
    industryId: "alimentos",
    assetType: "cocina-industrial",
    environmentalRestrictions: ["zona-alimentaria"],
  },
  {
    id: "hospital",
    label: "Hospital",
    description: "Áreas críticas, quirófanos, pasillos y zonas de alto riesgo",
    icon: "HeartPulse",
    industryId: "hospitales",
    assetType: "instalacion-hospitalaria",
    environmentalRestrictions: ["zona-hospitalaria", "restriccion-sanitaria"],
  },
  {
    id: "centro-logistico",
    label: "Centro logístico",
    description: "Bodegas, andenes, pisos de alta circulación y zonas de carga",
    icon: "PackageOpen",
    industryId: "transporte",
    assetType: "centro-logistico",
  },
  {
    id: "oficina",
    label: "Oficina",
    description: "Espacios corporativos, pisos, baños y zonas comunes",
    icon: "Briefcase",
    industryId: "institucional",
    assetType: "oficina",
  },
];

// ─── Problem Options (Step 2: ¿Qué problema tienes?) ─────────────────────────

export interface ProblemOption {
  id: string;
  label: string;
  description: string;
  icon: string;
  /** Mapped contamination ID for OVI Core */
  contaminationId: string;
  /** Severity hint for this contamination type */
  severityHint: "leve" | "moderado" | "severo" | "crítico";
}

export const problemOptions: ProblemOption[] = [
  {
    id: "grasa",
    label: "Grasa",
    description: "Acumulación de grasa industrial, mineral o de proceso",
    icon: "Droplets",
    contaminationId: "grasa-pesada",
    severityHint: "severo",
  },
  {
    id: "aceite",
    label: "Aceite",
    description: "Residuos de aceites hidráulicos, minerales o de corte",
    icon: "Gauge",
    contaminationId: "aceite",
    severityHint: "moderado",
  },
  {
    id: "oxido",
    label: "Óxido",
    description: "Corrosión y oxidación en superficies metálicas",
    icon: "Layers",
    contaminationId: "oxido",
    severityHint: "crítico",
  },
  {
    id: "biofilm",
    label: "Biofilm",
    description: "Película microbiana bacteriana, limo y colonias adheridas",
    icon: "Microscope",
    contaminationId: "biofilm",
    severityHint: "crítico",
  },
  {
    id: "polvo",
    label: "Polvo",
    description: "Partículas suspendidas, polvo y material particulado",
    icon: "Wind",
    contaminationId: "polvo-particulas",
    severityHint: "leve",
  },
  {
    id: "cal",
    label: "Cal / Sarro",
    description: "Incrustaciones calcáreas, sarro mineral y depósitos duros",
    icon: "Hammer",
    contaminationId: "sarro",
    severityHint: "moderado",
  },
  {
    id: "manchas",
    label: "Manchas",
    description: "Manchas orgánicas, pigmentos y residuos difíciles",
    icon: "AlertCircle",
    contaminationId: "materia-organica",
    severityHint: "moderado",
  },
  {
    id: "contaminacion-pesada",
    label: "Contaminación pesada",
    description: "Combinación de contaminantes de alta adherencia y dificultad",
    icon: "Flame",
    contaminationId: "grasa-pesada",
    severityHint: "crítico",
  },
];

// ─── Objective Options (Step 3: ¿Qué objetivo buscas?) ───────────────────────

export interface ObjectiveOption {
  id: string;
  label: string;
  description: string;
  icon: string;
  /** Mapped client goal for OVI Core */
  clientGoal: OviClientGoal;
}

export const objectiveOptions: ObjectiveOption[] = [
  {
    id: "restaurar",
    label: "Restaurar",
    description: "Recuperar el estado original de superficies o activos",
    icon: "RefreshCw",
    clientGoal: "limpieza-correctiva",
  },
  {
    id: "mantener",
    label: "Mantener",
    description: "Programa de mantenimiento preventivo continuo",
    icon: "Shield",
    clientGoal: "mantenimiento-preventivo",
  },
  {
    id: "desinfectar",
    label: "Desinfectar",
    description: "Eliminar agentes microbianos y garantizar inocuidad",
    icon: "ShieldCheck",
    clientGoal: "eliminar-biofilm",
  },
  {
    id: "mejorar-imagen",
    label: "Mejorar imagen",
    description: "Presentación impecable y protección de superficies visibles",
    icon: "Sparkles",
    clientGoal: "proteger-superficie",
  },
  {
    id: "reducir-costos",
    label: "Reducir costos",
    description: "Optimizar consumo de agua, tiempo y productos",
    icon: "TrendingDown",
    clientGoal: "reducir-consumo-agua",
  },
  {
    id: "cumplimiento",
    label: "Cumplimiento normativo",
    description: "Cumplir HACCP, BPM, auditorías y trazabilidad",
    icon: "FileCheck",
    clientGoal: "cumplir-normativa-haccp",
  },
];

// ─── Complexity Map ───────────────────────────────────────────────────────────

export const complexityMap: Record<string, { label: string; color: string; description: string }> =
  {
    alta: {
      label: "Alta",
      color: "var(--color-brand-accent)",
      description: "Múltiples variables confirmadas. Diagnóstico preciso.",
    },
    media: {
      label: "Media",
      color: "var(--color-brand-primary)",
      description: "Contexto parcial. Diagnóstico orientativo.",
    },
    baja: {
      label: "Baja",
      color: "rgba(255,255,255,0.4)",
      description: "Contexto mínimo. Se recomienda diagnóstico técnico en sitio.",
    },
  };

// ─── Success Case Mappings ────────────────────────────────────────────────────

export interface SolutionSuccessCase {
  id: string;
  title: string;
  detail: string;
  result: string;
  /** Sectors this case applies to */
  sectors: string[];
  /** Contamination types this case applies to */
  contaminations: string[];
  icon: string;
}

export const solutionSuccessCases: SolutionSuccessCase[] = [
  {
    id: "caso-flota-transporte",
    title: "Flota de transporte pesado",
    detail:
      "Protocolo OVI Solwash implementado en patio con capacidad para más de 7,000 unidades por mes. Estandarización del proceso con documentación completa de cada ciclo de lavado.",
    result:
      "Reducción del tiempo de ciclo por unidad y estandarización del consumo de agua entre operadores.",
    sectors: ["transporte"],
    contaminations: ["grasa-pesada", "aceite", "carbonilla"],
    icon: "Truck",
  },
  {
    id: "caso-planta-industrial",
    title: "Planta industrial de manufactura",
    detail:
      "Implementación de protocolo de desengrase con OVI Desengrasante Industrial en maquinaria y líneas de producción. Trazabilidad completa y cumplimiento de normativa de inocuidad.",
    result:
      "Reducción de paros por acumulación de grasa y cumplimiento total de normativa HACCP documentada.",
    sectors: ["industria", "alimentos"],
    contaminations: ["grasa-pesada", "aceite", "biofilm"],
    icon: "Factory",
  },
  {
    id: "caso-instalacion-institucional",
    title: "Instalación institucional de alto tráfico",
    detail:
      "Programa de mantenimiento preventivo con OVI Ecoseal en instalación de alto tráfico. Menor consumo de insumos y extensión del ciclo de mantenimiento.",
    result:
      "Reducción de la frecuencia de limpiezas correctivas y extensión del ciclo de mantenimiento.",
    sectors: ["institucional", "retail", "hospitales"],
    contaminations: ["polvo-particulas", "materia-organica", "sarro"],
    icon: "Building2",
  },
  {
    id: "caso-cocina-industrial",
    title: "Cocina industrial certificada",
    detail:
      "Protocolo HACCP con OVI Ultradegreaser y OVI Precision Foam Kit en cocina industrial de alta producción. Documentación auditable de cada intervención.",
    result:
      "Certificación HACCP mantenida con protocolo reproducible y evidencia fotográfica de cada ciclo.",
    sectors: ["alimentos"],
    contaminations: ["grasa-pesada", "biofilm", "materia-organica"],
    icon: "ChefHat",
  },
  {
    id: "caso-energia",
    title: "Activos energéticos expuestos",
    detail:
      "Limpieza técnica de paneles solares y activos eléctricos expuestos a intemperie con protocolo seguro sin riesgo de cortocircuito.",
    result:
      "Recuperación de eficiencia de generación y protección de activos con intervención segura documentada.",
    sectors: ["energia"],
    contaminations: ["polvo-particulas", "grasa-pesada", "carbonilla"],
    icon: "Sun",
  },
];

/**
 * Returns the most relevant success case for a given sector/contamination context.
 */
export function findSuccessCase(
  sectorId: string,
  contaminationId: string,
): SolutionSuccessCase | null {
  // Look for exact sector + contamination match
  let best = solutionSuccessCases.find(
    (c) => c.sectors.includes(sectorId) && c.contaminations.includes(contaminationId),
  );
  if (best) return best;

  // Fallback: sector match only
  best = solutionSuccessCases.find((c) => c.sectors.includes(sectorId));
  if (best) return best;

  // Fallback: contamination match only
  best = solutionSuccessCases.find((c) => c.contaminations.includes(contaminationId));
  if (best) return best;

  return solutionSuccessCases[0] ?? null;
}
