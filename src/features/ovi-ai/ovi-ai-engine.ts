/**
 * OVI AI — Engine
 * Work Order 006
 *
 * Conversational diagnostic engine for OVI AI — Digital Cleaning Engineer.
 * All recommendations are derived from the Knowledge Engine — no hardcoded responses.
 *
 * Architecture:
 *   - Conversational types: OviChatMessage, OviChatOption
 *   - ConversationEngine: builds diagnostic flow from the decision tree
 *   - ContextExtractor: maps free text to OviDecisionInput (keyword matching)
 *   - Recommendation: fully delegated to @knowledge-engine
 *
 * Future extension hooks (add implementations here when ready):
 *   - Voice:     extractContextFromTranscript(transcript: string)
 *   - Images:    extractContextFromImageAnalysis(analysis: ImageAnalysis)
 *   - Documents: extractContextFromDocument(doc: ParsedDocument)
 *   - i18n:      locale-aware question/option labels
 */

import {
  decisionTree,
  getEntryNode,
  getDecisionNode,
  generateRecommendation,
} from "@knowledge-engine";
import type { OviDecisionInput, OviDecisionNode, OviRecommendation } from "@knowledge-engine";

// ─── Chat types ───────────────────────────────────────────────────────────────

export interface OviChatMessage {
  id: string;
  role: "assistant" | "user";
  content: string;
  /** Quick-select options for structured diagnostic questions */
  options?: OviChatOption[];
  timestamp: number;
}

export interface OviChatOption {
  label: string;
  value: string;
  /** Which OviDecisionInput field this option populates */
  field: keyof OviDecisionInput;
  hint?: string;
  /** Multi-select for array fields (environmentalRestrictions) */
  multiple?: boolean;
}

// Re-export for consumer convenience
export type { OviDecisionInput, OviRecommendation };

// ─── Constants ────────────────────────────────────────────────────────────────

export const ANALYSIS_STAGES = [
  "Analizando contexto operacional...",
  "Consultando Knowledge Engine...",
  "Evaluando compatibilidad de productos...",
  "Generando diagnóstico de ingeniería...",
  "Compilando recomendaciones técnicas...",
] as const;

export type AnalysisStage = (typeof ANALYSIS_STAGES)[number];

/**
 * OVI AI first message — Work Order 006 specification.
 */
export const OVI_GREETING =
  "Hola, soy OVI AI.\n\nEstoy aquí para ayudarte a diagnosticar un desafío de Ingeniería en Limpieza.\n\nCuéntame qué activo deseas intervenir o qué problema estás enfrentando.";

/**
 * OVI ecosystem integration paths.
 */
export const OVI_INTEGRATION_LINKS = {
  lab: "/solution-lab",
  store: "/store",
  technicalVisit: "/contact",
  engineer: "/contact",
} as const;

// ─── Conversational Engine ────────────────────────────────────────────────────

/**
 * Build an assistant chat message from a decision tree node.
 * The message contains the question as content and the node options as quick-select buttons.
 */
export function buildMessageFromNode(node: OviDecisionNode): OviChatMessage {
  const isMultiSelect = node.field === "environmentalRestrictions";
  return {
    id: `msg-${node.id}-${Date.now()}`,
    role: "assistant",
    content: node.question,
    options: node.options.map((opt) => ({
      label: opt.label,
      value: opt.value,
      field: node.field as keyof OviDecisionInput,
      hint: opt.hint,
      multiple: isMultiSelect,
    })),
    timestamp: Date.now(),
  };
}

/**
 * Returns the next unanswered decision tree node given the accumulated context.
 * Traverses nodes in step order; skips steps whose field is already populated.
 * Returns null when all steps are answered or the flow is complete.
 */
export function getNextDiagnosticNode(
  context: OviDecisionInput,
  currentStep: number,
): OviDecisionNode | null {
  const ordered = [...decisionTree].sort((a, b) => a.step - b.step);
  for (const node of ordered) {
    if (node.step <= currentStep) continue;
    const value = context[node.field as keyof OviDecisionInput];
    const answered =
      value !== undefined && value !== null && (Array.isArray(value) ? value.length > 0 : true);
    if (!answered) return node;
  }
  return null;
}

/**
 * Build the next assistant question message for the diagnostic flow.
 * Returns null when the flow is complete (no more unanswered steps).
 */
export function buildNextQuestionMessage(
  context: OviDecisionInput,
  currentStep: number,
): { step: number; message: OviChatMessage } | null {
  const nextNode = getNextDiagnosticNode(context, currentStep);
  if (!nextNode) return null;
  return {
    step: nextNode.step,
    message: buildMessageFromNode(nextNode),
  };
}

/**
 * Returns the entry node (step 1 — Industria) wrapped as a chat message.
 */
export function buildGreetingWithFirstQuestion(): OviChatMessage {
  const entry = getEntryNode();
  return buildMessageFromNode(entry);
}

/**
 * Determine whether the context is sufficient for a confident recommendation.
 * Minimum: industryId + contaminationId (two dimensions).
 */
export function hasSufficientContext(context: OviDecisionInput): boolean {
  return !!(context.industryId && context.contaminationId);
}

// ─── Context Extractor ────────────────────────────────────────────────────────

/**
 * Extract OviDecisionInput fields from a free-text description.
 * Uses keyword matching — no LLM required.
 *
 * EXTENSION POINT: Replace or augment with LLM extraction when available.
 */
export function extractContextFromText(text: string): Partial<OviDecisionInput> {
  const t = text.toLowerCase();
  const ctx: Partial<OviDecisionInput> = {};

  // ── Industry ────────────────────────────────────────────────────────────────
  if (
    has(t, [
      "transporte",
      "bus",
      "flota",
      "camión",
      "camion",
      "logístic",
      "logistic",
      "vehículo",
      "vehiculo",
    ])
  ) {
    ctx.industryId = "transporte";
  } else if (
    has(t, ["hospital", "clínica", "clinica", "salud", "médico", "medico", "quiróf", "asepsia"])
  ) {
    ctx.industryId = "hospitales";
  } else if (
    has(t, [
      "aliment",
      "comida",
      "food",
      "haccp",
      "cocina industrial",
      "planta de alimentos",
      "inocuidad",
    ])
  ) {
    ctx.industryId = "alimentos";
  } else if (
    has(t, [
      "industria",
      "manufactura",
      "manufactu",
      "fábrica",
      "fabrica",
      "producción",
      "produccion",
      "planta industrial",
    ])
  ) {
    ctx.industryId = "industria";
  } else if (
    has(t, ["energía", "energia", "generadora", "transmisión", "eléctric", "subestación", "subest"])
  ) {
    ctx.industryId = "energia";
  } else if (
    has(t, [
      "universidad",
      "colegio",
      "corporativo",
      "edificio",
      "oficina",
      "centro comercial",
      "aeropuerto",
    ])
  ) {
    ctx.industryId = "institucional";
  } else if (has(t, ["retail", "tienda", "comercio", "supermercado", "minimarket"])) {
    ctx.industryId = "retail";
  }

  // ── Contamination ───────────────────────────────────────────────────────────
  if (has(t, ["grasa", "grease", "hidrocarburo"])) {
    ctx.contaminationId = "grasa-pesada";
  } else if (has(t, ["aceite", "oil"])) {
    ctx.contaminationId = "aceite";
  } else if (has(t, ["biofilm", "bacteria", "microbi", "biopelícula", "biopelicula"])) {
    ctx.contaminationId = "biofilm";
  } else if (has(t, ["óxido", "oxido", "herrumb", "corrosión", "corrosion", "rust"])) {
    ctx.contaminationId = "oxido";
  } else if (has(t, ["carbonilla", "hollín", "hollin", "soot", "hollín"])) {
    ctx.contaminationId = "carbonilla";
  } else if (has(t, ["sarro", "calcár", "calcio", "limescale", "incrustac"])) {
    ctx.contaminationId = "sarro";
  } else if (has(t, ["lodo", "barro", "sedimento", "mud", "sludge"])) {
    ctx.contaminationId = "lodo";
  } else if (has(t, ["polvo industrial", "partícula", "particula", "dust"])) {
    ctx.contaminationId = "polvo-industrial";
  } else if (has(t, ["orgánico", "organico", "residuo orgánico", "proteína", "proteina"])) {
    ctx.contaminationId = "residuos-organicos";
  } else if (has(t, ["químico", "quimico", "solvente", "residuo químico", "contaminante quim"])) {
    ctx.contaminationId = "residuos-quimicos";
  }

  // ── Surface ─────────────────────────────────────────────────────────────────
  if (has(t, ["acero inox", "stainless", "inoxidable"])) {
    ctx.surfaceId = "acero-inoxidable";
  } else if (has(t, ["aluminio", "aluminum", "alumini"])) {
    ctx.surfaceId = "aluminio";
  } else if (has(t, ["vidrio", "glass", "cristal"])) {
    ctx.surfaceId = "vidrio";
  } else if (has(t, ["concreto", "cemento", "hormigón", "hormigon", "concrete"])) {
    ctx.surfaceId = "concreto";
  } else if (has(t, ["pintura automotriz", "carrocería", "carroceria"])) {
    ctx.surfaceId = "pintura-automotriz";
  } else if (has(t, ["caucho", "goma", "rubber"])) {
    ctx.surfaceId = "caucho";
  } else if (has(t, ["plástico", "plastico", "pvc", "polimer"])) {
    ctx.surfaceId = "pvc";
  } else if (has(t, ["cerámica", "ceramica", "ceramic"])) {
    ctx.surfaceId = "ceramica";
  }

  // ── Contamination level ──────────────────────────────────────────────────────
  if (has(t, ["crítico", "critico", "extremo", "muy alto", "emergencia"])) {
    ctx.contaminationLevel = "crítico";
  } else if (has(t, ["severo", "severo", "intenso", "alta contaminación", "mucho"])) {
    ctx.contaminationLevel = "severo";
  } else if (has(t, ["moderado", "medio", "regular", "notable"])) {
    ctx.contaminationLevel = "moderado";
  } else if (has(t, ["leve", "poco", "mínimo", "minimo", "bajo"])) {
    ctx.contaminationLevel = "leve";
  }

  // ── Client goal ──────────────────────────────────────────────────────────────
  if (has(t, ["reducir agua", "consumo de agua", "ahorro de agua", "menos agua"])) {
    ctx.clientGoal = "reducir-consumo-agua";
  } else if (has(t, ["haccp", "inocuidad", "normativa", "cumplimiento"])) {
    ctx.clientGoal = "cumplir-normativa-haccp";
  } else if (has(t, ["biofilm", "desinfect", "sanitiz"])) {
    ctx.clientGoal = "eliminar-biofilm";
  } else if (has(t, ["preventivo", "mantenimiento preventivo", "prevención"])) {
    ctx.clientGoal = "mantenimiento-preventivo";
  } else if (has(t, ["impermeabiliz", "sellar sello impermeabl"])) {
    ctx.clientGoal = "impermeabilizacion";
  } else if (has(t, ["auditoría", "auditoria", "trazabilidad"])) {
    ctx.clientGoal = "trazabilidad-auditoria";
  } else if (has(t, ["tiempo de ciclo", "reducir tiempo", "más rápido", "mas rapido"])) {
    ctx.clientGoal = "reducir-tiempo-ciclo";
  } else if (has(t, ["proteger superficie", "protección superfici"])) {
    ctx.clientGoal = "proteger-superficie";
  } else if (has(t, ["minimizar químico", "menos químico", "carga química"])) {
    ctx.clientGoal = "minimizar-carga-quimica";
  }

  // ── Environmental restrictions ───────────────────────────────────────────────
  const restrictions: NonNullable<OviDecisionInput["environmentalRestrictions"]> = [];
  if (has(t, ["contacto con alimento", "food-grade", "food grade", "zona de alimento"])) {
    restrictions.push("zona-alimentaria");
  }
  if (has(t, ["zona hospitalaria", "área hospitalaria", "area hospitalaria"])) {
    restrictions.push("zona-hospitalaria");
  }
  if (has(t, ["biodegradable", "verde", "ecológico", "sostenible", "sustentable"])) {
    restrictions.push("biodegradable-requerido");
  }
  if (has(t, ["eléctrico", "electrico", "voltaje", "riesgo eléctrico", "electr"])) {
    restrictions.push("riesgo-electrico");
  }
  if (has(t, ["sin solvente clorado", "sin cloro", "no cloro"])) {
    restrictions.push("sin-solventes-clorados");
  }
  if (restrictions.length > 0) {
    ctx.environmentalRestrictions = restrictions;
  }

  return ctx;
}

/** Utility: returns true if the text contains at least one of the given terms. */
function has(text: string, terms: string[]): boolean {
  return terms.some((term) => text.includes(term));
}

// ─── Recommendation ───────────────────────────────────────────────────────────

/**
 * Compute a full OVI recommendation from the diagnostic context.
 * Delegates entirely to the Knowledge Engine — no hardcoded responses.
 *
 * @param context - Accumulated OviDecisionInput from the diagnostic conversation.
 * @returns OviRecommendation with diagnosis, protocol, service, products, reasoning.
 */
export function computeRecommendation(context: OviDecisionInput): OviRecommendation {
  return generateRecommendation(context);
}

// ─── Complexity mapping ───────────────────────────────────────────────────────

/**
 * Map recommendation confidence to a display complexity label.
 * Used for visual badges in the report view.
 */
export function confidenceToComplexity(
  confidence: OviRecommendation["confidence"],
  contaminationLevel?: OviDecisionInput["contaminationLevel"],
): "Bajo" | "Medio" | "Alto" | "Crítico" {
  if (contaminationLevel === "crítico") return "Crítico";
  if (contaminationLevel === "severo") return "Alto";
  if (confidence === "alta") return "Alto";
  if (confidence === "media") return "Medio";
  return "Bajo";
}

// ─── Node accessor ────────────────────────────────────────────────────────────

export { getDecisionNode };
