/**
 * OVI Knowledge Base — Protocols Catalog
 * FASE 1 · Foundation Order 001
 *
 * Official protocol registry. Protocol codes are sourced from existing
 * platform data (store-data.ts, ovi-ai-engine.ts, SolutionLabWorkspace.tsx).
 * Full execution steps pending official documentation from OVI.
 */

import type { OviProtocol } from "../types";

export const protocols: OviProtocol[] = [
  // ── Transport Protocols ────────────────────────────────────────────────────
  {
    id: "protocolo-p-001",
    codigo: "P-001",
    nombre: "Lavado exterior de bajo consumo",
    descripcion:
      "Protocolo estándar para lavado exterior de flota vehicular con optimización del consumo hídrico. Diseñado para patios y terminales con operación continua.",
    sectores: ["transporte"],
    productosRequeridos: ["ovi-bioclean-pro"],
    equiposRequeridos: ["ovi-flota-rinse-arch", "ovi-dose-control-cart"],
    tiposSuciedad: ["lodo", "polvo-industrial", "grasa-pesada"],
    superficiesCompatibles: ["pintura-automotriz", "vidrio", "plastico-tecnico"],
    pasos: [],
    tiempoEstimado: "Pendiente documentación oficial",
    frecuenciaRecomendada: "Según programa operativo de patio",
    status: "en-revision",
  },
  {
    id: "protocolo-p-003",
    codigo: "P-003",
    nombre: "Control de calidad por ciclo",
    descripcion:
      "Protocolo de verificación de calidad al término de cada ciclo de lavado. Incluye criterios visuales, registro fotográfico y control de dosificación.",
    sectores: ["transporte"],
    productosRequeridos: [],
    equiposRequeridos: ["ovi-dose-control-cart"],
    tiposSuciedad: [],
    superficiesCompatibles: [],
    pasos: [],
    tiempoEstimado: "Pendiente documentación oficial",
    frecuenciaRecomendada: "Por ciclo operativo",
    status: "en-revision",
  },
  // ── Industrial Protocols ───────────────────────────────────────────────────
  {
    id: "protocolo-p-010",
    codigo: "P-010",
    nombre: "Limpieza CIP de superficies de contacto",
    descripcion:
      "Protocolo de limpieza in-situ para superficies de contacto directo con alimentos o productos. Compatible con normativas HACCP.",
    sectores: ["industria", "alimentos"],
    productosRequeridos: ["ovi-bioclean-pro"],
    equiposRequeridos: ["ovi-precision-foam-kit", "ovi-dose-control-cart"],
    tiposSuciedad: ["residuos-organicos", "biofilm", "grasa-pesada"],
    superficiesCompatibles: ["acero-inoxidable", "plastico-tecnico"],
    pasos: [],
    tiempoEstimado: "Pendiente documentación oficial",
    frecuenciaRecomendada: "Según plan HACCP",
    status: "en-revision",
  },
  {
    id: "protocolo-p-011",
    codigo: "P-011",
    nombre: "Desengrase de campanas y ductos",
    descripcion:
      "Protocolo para remoción de grasa acumulada en sistemas de extracción de aire, campanas industriales y ductos de cocinas.",
    sectores: ["industria", "alimentos", "institucional"],
    productosRequeridos: ["ovi-bioclean-pro"],
    equiposRequeridos: ["ovi-precision-foam-kit"],
    tiposSuciedad: ["grasa-pesada", "residuos-organicos", "carbonilla"],
    superficiesCompatibles: ["acero-inoxidable", "pintura-industrial"],
    pasos: [],
    tiempoEstimado: "Pendiente documentación oficial",
    frecuenciaRecomendada: "Trimestral o según carga operativa",
    status: "en-revision",
  },
  // ── Hospital / Healthcare Protocols ───────────────────────────────────────
  {
    id: "protocolo-h-001",
    codigo: "H-001",
    nombre: "Limpieza y desinfección de área crítica",
    descripcion:
      "Protocolo diferenciado para áreas de alto riesgo biológico en hospitales y centros de salud. Incluye clasificación de zonas y agentes biocidas.",
    sectores: ["hospitales", "institucional"],
    productosRequeridos: ["ovi-surface-guard-x9"],
    equiposRequeridos: ["ovi-precision-foam-kit", "ovi-dose-control-cart"],
    tiposSuciedad: ["biofilm", "residuos-organicos", "residuos-quimicos"],
    superficiesCompatibles: ["acero-inoxidable", "ceramica", "pvc"],
    pasos: [],
    tiempoEstimado: "Pendiente documentación oficial",
    frecuenciaRecomendada: "Diaria y post-procedimiento",
    status: "en-revision",
  },
  {
    id: "protocolo-h-002",
    codigo: "H-002",
    nombre: "Manejo de residuos hospitalarios",
    descripcion:
      "Protocolo de segregación, contención y disposición de residuos de acuerdo a normativa sanitaria.",
    sectores: ["hospitales"],
    productosRequeridos: [],
    equiposRequeridos: [],
    tiposSuciedad: ["residuos-organicos", "residuos-quimicos"],
    superficiesCompatibles: [],
    pasos: [],
    tiempoEstimado: "Pendiente documentación oficial",
    frecuenciaRecomendada: "Continua",
    status: "en-revision",
  },
  {
    id: "protocolo-h-003",
    codigo: "H-003",
    nombre: "Control de infecciones asociadas al entorno",
    descripcion:
      "Protocolo de vigilancia y reducción de IAAEs mediante limpieza y desinfección estandarizada.",
    sectores: ["hospitales"],
    productosRequeridos: [],
    equiposRequeridos: [],
    tiposSuciedad: ["biofilm"],
    superficiesCompatibles: [],
    pasos: [],
    tiempoEstimado: "Pendiente documentación oficial",
    frecuenciaRecomendada: "Según programa epidemiológico",
    status: "en-revision",
  },
  // ── Floor Protocols ────────────────────────────────────────────────────────
  {
    id: "protocolo-f-001",
    codigo: "F-001",
    nombre: "Limpieza profunda trimestral",
    descripcion:
      "Intervención de limpieza profunda para pisos de alto tráfico. Restauración de acabado y remoción de suciedad incrustada.",
    sectores: ["institucional", "retail", "industria"],
    productosRequeridos: ["ovi-bioclean-pro"],
    equiposRequeridos: [],
    tiposSuciedad: ["polvo-industrial", "recontaminacion-superficial", "residuos-organicos"],
    superficiesCompatibles: ["concreto-sellado", "ceramica", "pisos-sellados"],
    pasos: [],
    tiempoEstimado: "Pendiente documentación oficial",
    frecuenciaRecomendada: "Trimestral",
    status: "en-revision",
  },
  {
    id: "protocolo-f-002",
    codigo: "F-002",
    nombre: "Mantenimiento preventivo diario",
    descripcion:
      "Protocolo de limpieza de bajo impacto para mantenimiento diario de pisos y superficies en instalaciones de alto tráfico.",
    sectores: ["institucional", "retail", "hospitales"],
    productosRequeridos: ["ovi-surface-guard-x9"],
    equiposRequeridos: [],
    tiposSuciedad: ["polvo-industrial", "recontaminacion-superficial"],
    superficiesCompatibles: ["ceramica", "concreto-sellado", "pisos-sellados"],
    pasos: [],
    tiempoEstimado: "Pendiente documentación oficial",
    frecuenciaRecomendada: "Diaria",
    status: "en-revision",
  },
  {
    id: "protocolo-f-003",
    codigo: "F-003",
    nombre: "Restauración y protección anual",
    descripcion:
      "Ciclo anual de restauración completa de pisos con aplicación de protector de larga duración.",
    sectores: ["institucional", "retail"],
    productosRequeridos: ["ovi-surface-guard-x9"],
    equiposRequeridos: [],
    tiposSuciedad: ["recontaminacion-superficial"],
    superficiesCompatibles: ["pisos-sellados", "concreto-sellado", "ceramica"],
    pasos: [],
    tiempoEstimado: "Pendiente documentación oficial",
    frecuenciaRecomendada: "Anual",
    status: "en-revision",
  },
  // ── Energy Protocols ───────────────────────────────────────────────────────
  {
    id: "protocolo-e-004",
    codigo: "E-004",
    nombre: "Limpieza de activos energéticos en operación controlada",
    descripcion:
      "Protocolo para limpieza de equipos eléctricos y mecánicos en plantas de energía con operación parcial o controlada.",
    sectores: ["energia"],
    productosRequeridos: ["ovi-bioclean-pro"],
    equiposRequeridos: ["ovi-flota-rinse-arch"],
    tiposSuciedad: ["aceite", "polvo-industrial", "carbonilla"],
    superficiesCompatibles: ["acero-inoxidable", "pintura-industrial", "aluminio"],
    pasos: [],
    tiempoEstimado: "Pendiente documentación oficial",
    frecuenciaRecomendada: "Según programa de mantenimiento preventivo",
    status: "en-revision",
  },
  {
    id: "protocolo-e-007",
    codigo: "E-007",
    nombre: "Protección y mantenimiento preventivo de superficies críticas",
    descripcion:
      "Protocolo de aplicación de protectores en superficies expuestas a intemperie, corrosión y contaminantes industriales.",
    sectores: ["energia"],
    productosRequeridos: ["ovi-surface-guard-x9"],
    equiposRequeridos: [],
    tiposSuciedad: ["oxido", "polvo-industrial", "recontaminacion-superficial"],
    superficiesCompatibles: ["acero-inoxidable", "pintura-industrial", "aluminio"],
    pasos: [],
    tiempoEstimado: "Pendiente documentación oficial",
    frecuenciaRecomendada: "Semestral o según plan de mantenimiento",
    status: "en-revision",
  },
  // ── General / Control Protocols ───────────────────────────────────────────
  {
    id: "protocolo-g-003",
    codigo: "G-003",
    nombre: "Control de calidad y verificación",
    descripcion:
      "Protocolo general de verificación de calidad aplicable a cualquier operación de limpieza. Define criterios de aceptación y registro de evidencias.",
    sectores: ["transporte", "industria", "institucional", "alimentos"],
    productosRequeridos: [],
    equiposRequeridos: ["ovi-dose-control-cart"],
    tiposSuciedad: [],
    superficiesCompatibles: [],
    pasos: [],
    tiempoEstimado: "Pendiente documentación oficial",
    frecuenciaRecomendada: "Por ciclo o según plan de calidad",
    status: "en-revision",
  },
];
