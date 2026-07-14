/**
 * OVI AI — Engine
 * Experience Order 004
 *
 * Shared types and simulated report generator.
 * No LLM connected — produces DEMO diagnostic reports via keyword matching.
 * Architecture is ready for real AI integration.
 */

// ─── Types ────────────────────────────────────────────────────────────────────

export interface SimulatedReport {
  diagnosisInitial: string;
  detectedIndustry: string;
  complexityLevel: "Bajo" | "Medio" | "Alto" | "Crítico";
  recommendedServices: string[];
  potentialProducts: string[];
  suggestedProtocols: string[];
  environmentalImpact: string;
  nextSteps: string[];
}

export interface ConversationTurn {
  id: string;
  query: string;
  report: SimulatedReport;
  timestamp: number;
}

// ─── Constants ────────────────────────────────────────────────────────────────

export const ANALYSIS_STAGES = [
  "Analizando contexto operacional...",
  "Identificando industria y variables...",
  "Evaluando nivel de complejidad...",
  "Generando diagnóstico de ingeniería...",
  "Compilando recomendaciones...",
] as const;

export type AnalysisStage = (typeof ANALYSIS_STAGES)[number];

export const EXAMPLE_QUERIES = [
  "Tengo una flota de 250 buses y quiero reducir el consumo de agua.",
  "Necesito eliminar grasa industrial en una planta de alimentos.",
  "Busco una solución para pisos de alto tráfico.",
  "Necesito mejorar los protocolos de limpieza de un hospital.",
  "Quiero reducir el consumo de productos químicos.",
] as const;

// ─── Report generator ─────────────────────────────────────────────────────────

export function generateSimulatedReport(input: string): SimulatedReport {
  const lowerInput = input.toLowerCase();

  const isFleet =
    lowerInput.includes("flota") ||
    lowerInput.includes("bus") ||
    lowerInput.includes("transporte") ||
    lowerInput.includes("vehículo");

  const isFood =
    lowerInput.includes("alimentos") ||
    lowerInput.includes("grasa") ||
    lowerInput.includes("planta") ||
    lowerInput.includes("cocina");

  const isHospital =
    lowerInput.includes("hospital") ||
    lowerInput.includes("clínica") ||
    lowerInput.includes("salud") ||
    lowerInput.includes("médico");

  const isFloor =
    lowerInput.includes("piso") || lowerInput.includes("suelo") || lowerInput.includes("tráfico");

  if (isFleet) {
    return {
      diagnosisInitial:
        "[DEMO] Operación de flota vehicular con requerimientos de limpieza técnica. Se identifica necesidad de optimización de consumo hídrico, tiempo de ciclo y estandarización de protocolos por unidad.",
      detectedIndustry: "Transporte y Logística — Flota Vehicular",
      complexityLevel: "Alto",
      recommendedServices: [
        "Diagnóstico técnico de consumo hídrico por unidad",
        "Diseño de protocolo de lavado estandarizado",
        "Implementación de sistema de lavado de bajo consumo",
        "Capacitación operativa al equipo de limpieza",
      ],
      potentialProducts: [
        "Detergente biodegradable de alta dilución para flota",
        "Desengrasante alcalino concentrado para chasis",
        "Cera protectora de efecto prolongado",
      ],
      suggestedProtocols: [
        "Protocolo P-001: Lavado exterior de bajo consumo (≤ 40L/unidad)",
        "Protocolo P-002: Limpieza de interior y desinfección",
        "Protocolo P-003: Control de calidad por ciclo",
      ],
      environmentalImpact:
        "[DEMO] Reducción estimada del 40–60% en consumo hídrico con implementación de protocolo estándar. Menor carga química en aguas residuales con formulaciones biodegradables.",
      nextSteps: [
        "Auditoría de consumo actual de agua y productos",
        "Visita técnica a instalaciones de lavado",
        "Propuesta de protocolo personalizado",
        "Piloto con 10 unidades para validación",
      ],
    };
  }

  if (isFood) {
    return {
      diagnosisInitial:
        "[DEMO] Entorno de industria alimentaria con presencia de grasas y residuos orgánicos de alta adherencia. Requiere soluciones con validación alimentaria (food-grade) y protocolos HACCP compatibles.",
      detectedIndustry: "Industria Alimentaria — Procesamiento",
      complexityLevel: "Crítico",
      recommendedServices: [
        "Diagnóstico de puntos críticos de contaminación",
        "Diseño de plan de limpieza y desinfección HACCP",
        "Implementación con personal técnico certificado",
        "Auditorías periódicas de cumplimiento",
      ],
      potentialProducts: [
        "Desengrasante alcalino food-grade de alta eficacia",
        "Desinfectante de superficies en contacto con alimentos",
        "Limpiador de pisos industriales con inhibidor de biofilm",
      ],
      suggestedProtocols: [
        "Protocolo P-010: Limpieza CIP de superficies de contacto",
        "Protocolo P-011: Desengrase de campanas y ductos",
        "Protocolo P-012: Desinfección y validación microbiológica",
      ],
      environmentalImpact:
        "[DEMO] Formulaciones biodegradables reducen carga orgánica en efluentes industriales. Compatible con sistemas de tratamiento de aguas residuales alimentarias.",
      nextSteps: [
        "Evaluación de superficies y equipos involucrados",
        "Análisis de carga de grasa por zona",
        "Selección de agentes de limpieza certificados",
        "Implementación con protocolo documentado",
      ],
    };
  }

  if (isHospital) {
    return {
      diagnosisInitial:
        "[DEMO] Infraestructura hospitalaria con requerimientos de desinfección de alto nivel. Áreas críticas con riesgo biológico requieren protocolos diferenciados por zona y nivel de asepsia.",
      detectedIndustry: "Salud — Infraestructura Hospitalaria",
      complexityLevel: "Crítico",
      recommendedServices: [
        "Diagnóstico de zonas críticas y clasificación de áreas",
        "Diseño de protocolos diferenciados por nivel de asepsia",
        "Capacitación de personal en manejo de productos biocidas",
        "Sistema de trazabilidad y registro de limpiezas",
      ],
      potentialProducts: [
        "Desinfectante de superficie de amplio espectro",
        "Limpiador enzimático para áreas de procedimientos",
        "Producto de limpieza con acción bactericida certificada",
      ],
      suggestedProtocols: [
        "Protocolo H-001: Limpieza y desinfección de área crítica",
        "Protocolo H-002: Manejo de residuos hospitalarios",
        "Protocolo H-003: Control de infecciones asociadas al entorno",
      ],
      environmentalImpact:
        "[DEMO] Uso técnico de biocidas reduce sobreuso y resistencia. Gestión adecuada minimiza impacto de efluentes hospitalarios.",
      nextSteps: [
        "Mapeo de áreas y clasificación por riesgo",
        "Evaluación de productos actualmente en uso",
        "Propuesta de sustitución y protocolo integrado",
        "Implementación con seguimiento técnico",
      ],
    };
  }

  if (isFloor) {
    return {
      diagnosisInitial:
        "[DEMO] Superficie de alto tráfico con acumulación de suciedad incrustada y desgaste acelerado de acabado. Requiere plan de mantenimiento preventivo y soluciones de restauración.",
      detectedIndustry: "Infraestructura — Pisos de Alto Tráfico",
      complexityLevel: "Medio",
      recommendedServices: [
        "Evaluación del tipo de piso y nivel de deterioro",
        "Limpieza profunda y restauración de acabado",
        "Diseño de protocolo de mantenimiento preventivo",
        "Aplicación de protector de superficie de larga duración",
      ],
      potentialProducts: [
        "Limpiador alcalino para pisos industriales",
        "Sellador polimérico para pisos de concreto",
        "Producto de mantenimiento diario de bajo impacto",
      ],
      suggestedProtocols: [
        "Protocolo F-001: Limpieza profunda trimestral",
        "Protocolo F-002: Mantenimiento preventivo diario",
        "Protocolo F-003: Restauración y protección anual",
      ],
      environmentalImpact:
        "[DEMO] Productos de bajo VOC reducen contaminación del aire interior. Menor frecuencia de intervención con mantenimiento preventivo correcto.",
      nextSteps: [
        "Inspección técnica de pisos y medición de deterioro",
        "Prueba de productos en área representativa",
        "Propuesta de plan de mantenimiento anual",
        "Implementación por fases",
      ],
    };
  }

  // Generic fallback
  return {
    diagnosisInitial:
      "[DEMO] Desafío operacional de limpieza identificado. Se requiere análisis de condiciones específicas del entorno para diseñar una solución de ingeniería precisa y eficiente.",
    detectedIndustry: "Operación Industrial — Análisis en Progreso",
    complexityLevel: "Medio",
    recommendedServices: [
      "Diagnóstico técnico inicial del entorno operativo",
      "Diseño de protocolo de limpieza personalizado",
      "Selección de productos especializados por aplicación",
      "Implementación supervisada con control de resultados",
    ],
    potentialProducts: [
      "Línea de limpieza industrial de alto desempeño",
      "Desinfectantes y biocidas de amplio espectro",
      "Productos de mantenimiento preventivo",
    ],
    suggestedProtocols: [
      "Protocolo G-001: Diagnóstico y evaluación inicial",
      "Protocolo G-002: Limpieza técnica estándar",
      "Protocolo G-003: Control de calidad y verificación",
    ],
    environmentalImpact:
      "[DEMO] Formulaciones biodegradables y uso técnico de insumos reducen impacto ambiental. Optimización de recursos hídricos y químicos por ciclo de operación.",
    nextSteps: [
      "Reunión técnica para análisis de condiciones",
      "Propuesta de solución personalizada",
      "Piloto controlado de implementación",
      "Evaluación de resultados y ajuste",
    ],
  };
}
