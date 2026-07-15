/**
 * OVI Knowledge Engine — Recommendation Engine
 * FASE 2 · Foundation Order 002
 *
 * The core reasoning function of the OVI platform.
 *
 * RULE: Never return just a product. Always return a complete solution:
 *   1. Diagnosis
 *   2. Technical justification
 *   3. Protocol
 *   4. Service
 *   5. Primary product
 *   6. Complementary products
 *   7. Recommended equipment
 *   8. Expected benefit
 *   9. Reasoning (why product, why protocol, why service, risks, benefits)
 *
 * FLOW: Always start from the operational challenge, never from a product.
 *
 * NO AI IS USED HERE. This is deterministic rule-based reasoning.
 * Future AI integration should call this engine and enrich its output.
 */

import {
  products,
  protocols,
  services,
  equipment,
  contaminationTypes,
  surfaces,
  sectors,
  getProduct,
  getProtocol,
  getService,
} from "@knowledge";

import { productRules, evaluateProductRule } from "../rules";
import { queryCompatibilityMatrix } from "../compatibility-matrix/matrix";
import { getIntersectingProducts, getUnionProducts } from "../mappings/entity-mappings";

import type {
  OviDecisionInput,
  OviRecommendation,
  OviReasoning,
} from "../types";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function resolveContaminationLabel(contaminationId?: string): string {
  if (!contaminationId) return "contaminante no especificado";
  return contaminationTypes.find((c) => c.id === contaminationId)?.nombre ?? contaminationId;
}

function resolveSurfaceLabel(surfaceId?: string): string {
  if (!surfaceId) return "superficie no especificada";
  return surfaces.find((s) => s.id === surfaceId)?.nombre ?? surfaceId;
}

function resolveIndustryLabel(industryId?: string): string {
  if (!industryId) return "industria no especificada";
  return sectors.find((s) => s.id === industryId)?.nombre ?? industryId;
}

function resolveLevelLabel(level?: string): string {
  const labels: Record<string, string> = {
    leve: "leve",
    moderado: "moderado",
    severo: "severo",
    "crítico": "crítico",
  };
  return level ? (labels[level] ?? level) : "sin especificar";
}

// ─── Product Candidate Selection ──────────────────────────────────────────────

interface ScoredProduct {
  productId: string;
  score: number;
  matchSources: string[];
}

function selectProductCandidates(input: OviDecisionInput): ScoredProduct[] {
  const scoreMap = new Map<string, ScoredProduct>();

  // Step 1: get candidate product IDs from mappings (union of all dimensions)
  const unionIds = getUnionProducts({
    contaminationId: input.contaminationId,
    surfaceId: input.surfaceId,
    industryId: input.industryId,
  });

  // Boost candidates from intersection (match more dimensions)
  const intersectIds = new Set(
    getIntersectingProducts({
      contaminationId: input.contaminationId,
      surfaceId: input.surfaceId,
      industryId: input.industryId,
    }),
  );

  for (const productId of unionIds) {
    const matchSources: string[] = [];
    let score = 0;

    if (input.contaminationId) {
      const byContamination = getUnionProducts({ contaminationId: input.contaminationId });
      if (byContamination.includes(productId)) {
        score += 40;
        matchSources.push("contaminación");
      }
    }

    if (input.surfaceId) {
      const bySurface = getUnionProducts({ surfaceId: input.surfaceId });
      if (bySurface.includes(productId)) {
        score += 30;
        matchSources.push("superficie");
      }
    }

    if (input.industryId) {
      const byIndustry = getUnionProducts({ industryId: input.industryId });
      if (byIndustry.includes(productId)) {
        score += 20;
        matchSources.push("industria");
      }
    }

    // Intersection bonus
    if (intersectIds.has(productId)) {
      score += 10;
    }

    scoreMap.set(productId, { productId, score, matchSources });
  }

  // Step 2: apply product rules — exclusions remove candidates, rule scores boost them
  for (const rule of productRules) {
    const ruleResult = evaluateProductRule(rule, input);

    if (ruleResult.excluded) {
      // Remove excluded products from candidates
      scoreMap.delete(rule.productId);
      continue;
    }

    if (scoreMap.has(rule.productId) && ruleResult.recommended) {
      const existing = scoreMap.get(rule.productId)!;
      existing.score += ruleResult.score * 0.3; // Boost by 30% of rule score
    } else if (ruleResult.recommended) {
      // Add product that wasn't in mapping but qualifies by rules
      scoreMap.set(rule.productId, {
        productId: rule.productId,
        score: ruleResult.score * 0.5,
        matchSources: ["regla"],
      });
    }
  }

  // Step 3: sort by score descending
  return Array.from(scoreMap.values()).sort((a, b) => b.score - a.score);
}

// ─── Protocol Selection ───────────────────────────────────────────────────────

function selectBestProtocol(
  primaryProductId: string | null,
  input: OviDecisionInput,
): string | null {
  if (!primaryProductId) return null;

  // Find protocols that require this product
  const matchingProtocols = protocols.filter(
    (proto) =>
      proto.productosRequeridos.includes(primaryProductId) ||
      (input.industryId && proto.sectores.includes(input.industryId)) ||
      (input.contaminationId && proto.tiposSuciedad.includes(input.contaminationId)) ||
      (input.surfaceId && proto.superficiesCompatibles.includes(input.surfaceId)),
  );

  if (matchingProtocols.length === 0) return null;

  // Score protocols by how many dimensions match
  const scored = matchingProtocols.map((proto) => {
    let score = 0;
    if (proto.productosRequeridos.includes(primaryProductId)) score += 40;
    if (input.industryId && proto.sectores.includes(input.industryId)) score += 25;
    if (input.contaminationId && proto.tiposSuciedad.includes(input.contaminationId)) score += 25;
    if (input.surfaceId && proto.superficiesCompatibles.includes(input.surfaceId)) score += 10;
    return { id: proto.id, score };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored[0]?.id ?? null;
}

// ─── Service Selection ────────────────────────────────────────────────────────

function selectBestService(
  primaryProductId: string | null,
  protocolId: string | null,
  input: OviDecisionInput,
): string | null {
  const matchingServices = services.filter(
    (svc) =>
      (primaryProductId && svc.productosAsociados.includes(primaryProductId)) ||
      (protocolId && svc.protocolosAsociados.includes(protocolId)) ||
      (input.industryId && svc.sectores.includes(input.industryId)),
  );

  if (matchingServices.length === 0) return null;

  const scored = matchingServices.map((svc) => {
    let score = 0;
    if (primaryProductId && svc.productosAsociados.includes(primaryProductId)) score += 40;
    if (protocolId && svc.protocolosAsociados.includes(protocolId)) score += 30;
    if (input.industryId && svc.sectores.includes(input.industryId)) score += 20;

    // Align with client goal
    if (input.clientGoal === "trazabilidad-auditoria" && svc.entregables.length > 0) score += 10;
    if (input.clientGoal === "mantenimiento-preventivo" && svc.id.includes("mantenimiento")) score += 10;
    if (input.clientGoal === "cumplir-normativa-haccp" && svc.id.includes("implementacion")) score += 10;

    return { id: svc.id, score };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored[0]?.id ?? null;
}

// ─── Equipment Selection ──────────────────────────────────────────────────────

function selectEquipment(
  primaryProductId: string | null,
  protocolId: string | null,
): string[] {
  if (!primaryProductId && !protocolId) return [];

  const equipmentIds = new Set<string>();

  for (const eq of equipment) {
    if (primaryProductId && eq.productosCompatibles.includes(primaryProductId)) {
      equipmentIds.add(eq.id);
    }
    if (protocolId && eq.protocolosCompatibles.includes(protocolId)) {
      equipmentIds.add(eq.id);
    }
  }

  return Array.from(equipmentIds);
}

// ─── Reasoning Builder ────────────────────────────────────────────────────────

function buildReasoning(
  input: OviDecisionInput,
  primaryProductId: string | null,
  protocolId: string | null,
  serviceId: string | null,
): OviReasoning {
  const contaminationLabel = resolveContaminationLabel(input.contaminationId);
  const surfaceLabel = resolveSurfaceLabel(input.surfaceId);
  const industryLabel = resolveIndustryLabel(input.industryId);
  const product = primaryProductId ? getProduct(primaryProductId) : null;
  const protocol = protocolId ? getProtocol(protocolId) : null;
  const service = serviceId ? getService(serviceId) : null;

  const whyProduct = product
    ? `${product.nombre} es recomendado porque actúa directamente sobre ${contaminationLabel} en ${surfaceLabel}. ${product.resumen}`
    : `No se identificó un producto principal con suficiente confianza para este contexto. Se recomienda diagnóstico técnico.`;

  const whyProtocol = protocol
    ? `El protocolo ${protocol.codigo} — "${protocol.nombre}" está diseñado para la industria ${industryLabel} y cubre el tipo de suciedad ${contaminationLabel} en superficies compatibles.`
    : `No se identificó un protocolo específico. El equipo técnico de OVI diseñará el protocolo adecuado tras diagnóstico.`;

  const whyService = service
    ? `El servicio "${service.nombre}" aporta diagnóstico, ejecución y documentación para garantizar que el resultado sea reproducible y auditable.`
    : `Se recomienda solicitar diagnóstico técnico para diseñar el servicio adecuado.`;

  const risksAvoided: string[] = [];
  const benefitsGenerated: string[] = [];

  if (input.contaminationId === "biofilm") {
    risksAvoided.push("Proliferación bacteriana y riesgo sanitario por biofilm no tratado.");
  }
  if (input.contaminationId === "grasa-pesada" || input.contaminationId === "aceite") {
    risksAvoided.push("Acumulación de grasa que puede causar incendio, desgaste prematuro o incumplimiento normativo.");
  }
  if (input.environmentalRestrictions?.includes("zona-alimentaria")) {
    risksAvoided.push("Contaminación cruzada en zona de alimentos por uso de producto no certificado.");
  }
  if (input.environmentalRestrictions?.includes("riesgo-electrico")) {
    risksAvoided.push("Riesgo de cortocircuito o daño a equipos eléctricos por aplicación incorrecta.");
  }
  if (input.surfaceId === "aluminio") {
    risksAvoided.push("Daño irreversible al aluminio por incompatibilidad química con agente mal seleccionado.");
  }

  if (product?.impactoAmbiental && product.impactoAmbiental.length > 0) {
    benefitsGenerated.push(...product.impactoAmbiental.slice(0, 2));
  }
  if (input.clientGoal === "reducir-consumo-agua") {
    benefitsGenerated.push("Reducción del consumo hídrico por ciclo mediante dosificación controlada.");
  }
  if (input.clientGoal === "trazabilidad-auditoria") {
    benefitsGenerated.push("Documentación completa de cada intervención para auditoría interna y externa.");
  }
  if (input.clientGoal === "cumplir-normativa-haccp") {
    benefitsGenerated.push("Cumplimiento demostrable de HACCP y BPM con protocolo documentado.");
  }

  if (risksAvoided.length === 0) {
    risksAvoided.push("Recontaminación prematura por uso de protocolo inadecuado para este contexto.");
  }
  if (benefitsGenerated.length === 0) {
    benefitsGenerated.push("Eficiencia operacional mejorada con protocolo y producto correctamente seleccionados.");
  }

  return { whyProduct, whyProtocol, whyService, risksAvoided, benefitsGenerated };
}

// ─── Diagnosis Builder ────────────────────────────────────────────────────────

function buildDiagnosis(input: OviDecisionInput): string {
  const parts: string[] = [];

  if (input.industryId) parts.push(`industria de ${resolveIndustryLabel(input.industryId)}`);
  if (input.assetType) parts.push(`activo tipo "${input.assetType}"`);
  if (input.zone) parts.push(`zona "${input.zone}"`);
  if (input.surfaceId) parts.push(`superficie de ${resolveSurfaceLabel(input.surfaceId)}`);
  if (input.contaminationId) parts.push(`contaminación por ${resolveContaminationLabel(input.contaminationId)}`);
  if (input.contaminationLevel) parts.push(`nivel ${resolveLevelLabel(input.contaminationLevel)}`);

  if (parts.length === 0) {
    return "Contexto operativo no especificado. Se requiere diagnóstico técnico en sitio para definir la solución.";
  }

  return `Desafío operativo identificado: ${parts.join(", ")}. ${
    input.clientGoal
      ? `Objetivo principal del cliente: ${input.clientGoal.replace(/-/g, " ")}.`
      : ""
  }${
    input.environmentalRestrictions && input.environmentalRestrictions.length > 0
      ? ` Restricciones activas: ${input.environmentalRestrictions.join(", ")}.`
      : ""
  }`.trim();
}

// ─── Expected Benefit Builder ─────────────────────────────────────────────────

function buildExpectedBenefit(
  input: OviDecisionInput,
  primaryProductId: string | null,
  serviceId: string | null,
): string {
  const product = primaryProductId ? getProduct(primaryProductId) : null;
  const service = serviceId ? getService(serviceId) : null;

  const benefitParts: string[] = [];

  if (product?.recomendacionAI) {
    benefitParts.push(product.recomendacionAI);
  }

  if (service && service.beneficios.length > 0) {
    benefitParts.push(service.beneficios[0]);
  }

  if (input.clientGoal === "reducir-consumo-agua") {
    benefitParts.push("Reducción medible del consumo de agua por ciclo con dosificación estandarizada.");
  }
  if (input.clientGoal === "cumplir-normativa-haccp") {
    benefitParts.push("Cumplimiento demostrable con documentación técnica y protocolo auditable.");
  }
  if (input.clientGoal === "reducir-tiempo-ciclo") {
    benefitParts.push("Ciclos de limpieza más rápidos con menor variabilidad entre operadores.");
  }

  if (benefitParts.length === 0) {
    return "Resultado limpio, documentado y reproducible alineado al desafío operativo del cliente.";
  }

  return benefitParts.slice(0, 2).join(" ");
}

// ─── Confidence Calculator ────────────────────────────────────────────────────

function calculateConfidence(input: OviDecisionInput, candidateCount: number): "alta" | "media" | "baja" {
  let dimensionCount = 0;
  if (input.industryId) dimensionCount++;
  if (input.surfaceId) dimensionCount++;
  if (input.contaminationId) dimensionCount++;
  if (input.contaminationLevel) dimensionCount++;
  if (input.clientGoal) dimensionCount++;

  if (dimensionCount >= 3 && candidateCount > 0) return "alta";
  if (dimensionCount >= 1 && candidateCount > 0) return "media";
  return "baja";
}

// ─── Main Recommendation Function ────────────────────────────────────────────

/**
 * Generates a complete OVI recommendation from a decision input.
 *
 * RULE: Never invert the flow. Start from the challenge, end at the solution.
 * RULE: Never return only a product. Always return the full solution package.
 */
export function generateRecommendation(input: OviDecisionInput): OviRecommendation {
  // 1. Select product candidates
  const candidates = selectProductCandidates(input);
  const primaryCandidate = candidates[0] ?? null;
  const primaryProductId = primaryCandidate?.productId ?? null;

  // 2. Select complementary products (next best candidates, excluding primary)
  const complementaryProductIds = candidates
    .slice(1, 4)
    .filter((c) => {
      // Only include complementary products that are actually in the KB
      const product = getProduct(c.productId);
      return product !== undefined;
    })
    .map((c) => c.productId);

  // 3. Select best protocol
  const protocolId = selectBestProtocol(primaryProductId, input);

  // 4. Select best service
  const serviceId = selectBestService(primaryProductId, protocolId, input);

  // 5. Select recommended equipment
  const equipmentIds = selectEquipment(primaryProductId, protocolId);

  // 6. Build diagnosis
  const diagnosis = buildDiagnosis(input);

  // 7. Build technical justification
  const contaminationData = input.contaminationId
    ? contaminationTypes.find((c) => c.id === input.contaminationId)
    : null;

  const technicalJustification = contaminationData
    ? `${contaminationData.descripcion} Dificultad de remoción: ${contaminationData.dificultadRemocion}. La selección de producto y protocolo está optimizada para este perfil de contaminante.`
    : "La selección se basa en el contexto operativo disponible. Para máxima precisión, especificar el tipo de contaminante y la superficie.";

  // 8. Build reasoning
  const reasoning = buildReasoning(input, primaryProductId, protocolId, serviceId);

  // 9. Build expected benefit
  const expectedBenefit = buildExpectedBenefit(input, primaryProductId, serviceId);

  // 10. Calculate confidence
  const confidence = calculateConfidence(input, candidates.length);

  return {
    diagnosis,
    technicalJustification,
    protocolId,
    serviceId,
    primaryProductId,
    complementaryProductIds,
    equipmentIds,
    expectedBenefit,
    reasoning,
    confidence,
    input,
    generatedAt: new Date().toISOString(),
  };
}

/**
 * Generates a recommendation and resolves all entity IDs to full objects.
 * Returns the same structure as generateRecommendation but with resolved entities.
 * Useful for rendering or passing to an AI agent.
 */
export function generateResolvedRecommendation(input: OviDecisionInput) {
  const rec = generateRecommendation(input);

  return {
    ...rec,
    primaryProduct: rec.primaryProductId ? getProduct(rec.primaryProductId) ?? null : null,
    complementaryProducts: rec.complementaryProductIds
      .map((id) => getProduct(id))
      .filter((p): p is NonNullable<typeof p> => p !== undefined),
    protocol: rec.protocolId ? getProtocol(rec.protocolId) ?? null : null,
    service: rec.serviceId ? getService(rec.serviceId) ?? null : null,
    equipment: rec.equipmentIds
      .map((id) => equipment.find((e) => e.id === id))
      .filter((e): e is NonNullable<typeof e> => e !== undefined),
  };
}
