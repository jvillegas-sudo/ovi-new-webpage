"use client";

/**
 * SolutionFinderClient — Centro de Soluciones · "Encontrar mi solución"
 * Work Order 008 — OVI Store Intelligent Commerce Platform
 *
 * Interactive wizard that:
 *   1. Asks the user for Industry → Contamination → (optional) Level + Goal
 *   2. Calls the OVI Knowledge Engine (deterministic, no LLM)
 *   3. Presents a full solution: Diagnosis · Service · Product · Complementary · Protocol
 *
 * Data flows exclusively from @knowledge and @knowledge-engine — no hardcoded products.
 */

import { useState, useCallback } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Bot,
  CheckCircle2,
  ChevronRight,
  FlaskConical,
  Layers3,
  RotateCcw,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Target,
  Wrench,
} from "lucide-react";
import { AnimateIn, Badge, Card, Heading, Text } from "@components/ui";
import { cn } from "@utils/cn";
import { generateResolvedRecommendation } from "@knowledge-engine";
import type { OviDecisionInput, OviClientGoal } from "@knowledge-engine";
import type { OviSector, OviContaminationType } from "@knowledge";
import { useCartStore } from "@store/cart.store";

// ─── Local button class helpers ───────────────────────────────────────────────

const primaryBtn =
  "inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-brand-primary)] px-6 py-3 text-sm font-medium tracking-wide text-[var(--color-text-inverse)] transition-all duration-200 hover:brightness-110 hover:shadow-[var(--shadow-glow-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-primary)] active:scale-[0.98] disabled:opacity-40 disabled:pointer-events-none";

const outlineBtn =
  "inline-flex items-center justify-center gap-2 rounded-full border border-[var(--color-border-default)] bg-transparent px-6 py-3 text-sm font-medium tracking-wide text-[var(--color-text-primary)] transition-all duration-200 hover:border-[var(--color-brand-primary)] hover:text-[var(--color-brand-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-primary)] active:scale-[0.98]";

const ghostBtn =
  "inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-[var(--color-text-secondary)] transition-all duration-200 hover:text-[var(--color-brand-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-primary)]";

// ─── Step definitions ─────────────────────────────────────────────────────────

type Step = "industria" | "contaminacion" | "nivel" | "objetivo" | "resultado";

const STEP_ORDER: Step[] = ["industria", "contaminacion", "nivel", "objetivo", "resultado"];

const STEP_LABELS: Record<Step, string> = {
  industria: "Industria",
  contaminacion: "Tipo de suciedad",
  nivel: "Nivel de contaminación",
  objetivo: "Objetivo principal",
  resultado: "Solución OVI",
};

const CONTAMINATION_LEVEL_OPTIONS: Array<{
  value: OviDecisionInput["contaminationLevel"];
  label: string;
  hint: string;
}> = [
  { value: "leve", label: "Leve", hint: "Suciedad superficial, limpieza de mantenimiento regular." },
  { value: "moderado", label: "Moderado", hint: "Acumulación visible, requiere acción correctiva." },
  { value: "severo", label: "Severo", hint: "Incrustaciones o capas múltiples, limpieza profunda." },
  { value: "crítico", label: "Crítico", hint: "Contaminación grave o riesgo sanitario activo." },
];

const CLIENT_GOAL_OPTIONS: Array<{ value: OviClientGoal; label: string }> = [
  { value: "reducir-consumo-agua", label: "Reducir consumo de agua" },
  { value: "cumplir-normativa-haccp", label: "Cumplir normativa HACCP / BPM" },
  { value: "eliminar-biofilm", label: "Eliminar biofilm" },
  { value: "mantenimiento-preventivo", label: "Mantenimiento preventivo" },
  { value: "limpieza-correctiva", label: "Limpieza correctiva urgente" },
  { value: "proteger-superficie", label: "Proteger la superficie" },
  { value: "reducir-tiempo-ciclo", label: "Reducir tiempo de ciclo" },
  { value: "minimizar-carga-quimica", label: "Minimizar carga química" },
  { value: "trazabilidad-auditoria", label: "Trazabilidad y auditoría" },
];

// ─── Props ────────────────────────────────────────────────────────────────────

export interface SolutionFinderClientProps {
  sectors: OviSector[];
  contaminationTypes: OviContaminationType[];
}

// ─── Component ────────────────────────────────────────────────────────────────

export function SolutionFinderClient({
  sectors,
  contaminationTypes,
}: SolutionFinderClientProps) {
  const [currentStep, setCurrentStep] = useState<Step>("industria");
  const [input, setInput] = useState<OviDecisionInput>({});
  const [recommendation, setRecommendation] = useState<ReturnType<
    typeof generateResolvedRecommendation
  > | null>(null);

  const addItem = useCartStore((s) => s.addItem);
  const setMeta = useCartStore((s) => s.setMeta);

  // Contamination types filtered to selected sector
  const filteredContamination =
    input.industryId
      ? contaminationTypes.filter(
          (c) =>
            c.sectoresHabituales.includes(input.industryId!) && c.status !== "inactivo",
        )
      : contaminationTypes.filter((c) => c.status !== "inactivo");

  const currentStepIndex = STEP_ORDER.indexOf(currentStep);
  const totalInputSteps = STEP_ORDER.length - 1; // exclude "resultado"

  // ── Navigation helpers ────────────────────────────────────────────────────

  const goBack = useCallback(() => {
    if (currentStepIndex > 0) {
      setCurrentStep(STEP_ORDER[currentStepIndex - 1]);
    }
  }, [currentStepIndex]);

  const goToStep = useCallback((step: Step) => {
    setCurrentStep(step);
  }, []);

  // ── Selection handlers ────────────────────────────────────────────────────

  const selectIndustry = useCallback(
    (sectorId: string) => {
      setInput((prev) => ({ ...prev, industryId: sectorId, contaminationId: undefined }));
      setCurrentStep("contaminacion");
    },
    [],
  );

  const selectContamination = useCallback((contaminationId: string) => {
    setInput((prev) => ({ ...prev, contaminationId }));
    setCurrentStep("nivel");
  }, []);

  const selectLevel = useCallback(
    (level: OviDecisionInput["contaminationLevel"]) => {
      setInput((prev) => ({ ...prev, contaminationLevel: level }));
      setCurrentStep("objetivo");
    },
    [],
  );

  const selectGoal = useCallback(
    (goal: OviClientGoal | null) => {
      const newInput: OviDecisionInput = { ...input };
      if (goal) newInput.clientGoal = goal;
      else delete newInput.clientGoal;
      setInput(newInput);
      // Generate recommendation
      const rec = generateResolvedRecommendation(newInput);
      setRecommendation(rec);
      setCurrentStep("resultado");
    },
    [input],
  );

  const reset = useCallback(() => {
    setInput({});
    setRecommendation(null);
    setCurrentStep("industria");
  }, []);

  const addPrimaryToCart = useCallback(() => {
    if (!recommendation?.primaryProduct) return;
    const p = recommendation.primaryProduct;
    addItem({
      productId: p.id,
      nombre: p.nombre,
      categoria: p.categoria,
      resumen: p.resumen,
      cantidad: 1,
      sectorOrigen: input.industryId,
      fuenteRecomendacion: "catalogo",
    });
    setMeta({ sectorContexto: input.industryId });
  }, [recommendation, input.industryId, addItem, setMeta]);

  // ── Breadcrumb ────────────────────────────────────────────────────────────

  const completedSteps = STEP_ORDER.slice(0, currentStepIndex).filter((s) => s !== "resultado");

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="mx-auto max-w-4xl">
      {/* Progress indicator */}
      {currentStep !== "resultado" && (
        <div className="mb-10">
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {STEP_ORDER.filter((s) => s !== "resultado").map((step, idx) => {
              const isActive = step === currentStep;
              const isPast = idx < currentStepIndex;
              return (
                <div key={step} className="flex shrink-0 items-center gap-2">
                  <button
                    onClick={() => isPast && goToStep(step)}
                    disabled={!isPast}
                    className={cn(
                      "flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium transition-all",
                      isActive
                        ? "bg-[rgba(0,196,255,0.15)] text-[var(--color-brand-primary)]"
                        : isPast
                          ? "cursor-pointer text-[var(--color-text-secondary)] hover:text-[var(--color-brand-primary)]"
                          : "text-[var(--color-text-disabled,rgba(255,255,255,0.3))]",
                    )}
                  >
                    {isPast ? (
                      <CheckCircle2 className="h-4 w-4 text-[var(--color-brand-accent)]" />
                    ) : (
                      <span
                        className={cn(
                          "flex h-5 w-5 items-center justify-center rounded-full border text-xs",
                          isActive
                            ? "border-[var(--color-brand-primary)] text-[var(--color-brand-primary)]"
                            : "border-[var(--color-border-default)]",
                        )}
                      >
                        {idx + 1}
                      </span>
                    )}
                    {STEP_LABELS[step]}
                  </button>
                  {idx < totalInputSteps - 1 && (
                    <ChevronRight className="h-4 w-4 shrink-0 text-[var(--color-border-default)]" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Step: Industria ─────────────────────────────────────────────── */}
      {currentStep === "industria" && (
        <AnimateIn animation="slideUp">
          <Badge variant="brand">Paso 1 de 4</Badge>
          <Heading as="h2" size="3xl" className="mt-4">
            ¿En qué industria opera?
          </Heading>
          <Text size="lg" className="mt-3 max-w-2xl">
            El contexto operacional determina los estándares, restricciones y protocolos
            aplicables. Seleccione la industria que mejor describe su operación.
          </Text>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sectors.map((sector) => (
              <button
                key={sector.id}
                onClick={() => selectIndustry(sector.id)}
                className={cn(
                  "group relative overflow-hidden rounded-2xl border border-[var(--color-border-default)] bg-[rgba(255,255,255,0.03)] p-6 text-left transition-all duration-200",
                  "hover:border-[var(--color-brand-primary)] hover:bg-[rgba(0,196,255,0.06)]",
                  input.industryId === sector.id &&
                    "border-[var(--color-brand-primary)] bg-[rgba(0,196,255,0.08)]",
                )}
              >
                <Heading as="h3" size="md" className="flex items-center gap-2">
                  {sector.nombre}
                  <ArrowRight
                    className="ml-auto h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100"
                    aria-hidden="true"
                  />
                </Heading>
                <Text size="sm" className="mt-2 line-clamp-2">
                  {sector.descripcion}
                </Text>
                {sector.desafios.length > 0 && (
                  <Text
                    size="sm"
                    textColor="tertiary"
                    className="mt-3 line-clamp-1 border-t border-[var(--color-border-subtle)] pt-3"
                  >
                    {sector.desafios[0]}
                  </Text>
                )}
              </button>
            ))}
          </div>
        </AnimateIn>
      )}

      {/* ── Step: Contaminación ──────────────────────────────────────────── */}
      {currentStep === "contaminacion" && (
        <AnimateIn animation="slideUp">
          <button onClick={goBack} className={ghostBtn}>
            <ArrowLeft className="h-4 w-4" />
            Volver
          </button>
          <Badge variant="brand" className="mt-4">
            Paso 2 de 4
          </Badge>
          <Heading as="h2" size="3xl" className="mt-4">
            ¿Qué tipo de suciedad necesita eliminar?
          </Heading>
          <Text size="lg" className="mt-3 max-w-2xl">
            El tipo de contaminante define la familia de productos y el protocolo recomendado. Cada
            agente de limpieza está diseñado para actuar sobre perfiles específicos.
          </Text>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {filteredContamination.map((contamination) => (
              <button
                key={contamination.id}
                onClick={() => selectContamination(contamination.id)}
                className={cn(
                  "group rounded-2xl border border-[var(--color-border-default)] bg-[rgba(255,255,255,0.03)] p-5 text-left transition-all duration-200",
                  "hover:border-[var(--color-brand-primary)] hover:bg-[rgba(0,196,255,0.06)]",
                  input.contaminationId === contamination.id &&
                    "border-[var(--color-brand-primary)] bg-[rgba(0,196,255,0.08)]",
                )}
              >
                <Heading as="h3" size="md">
                  {contamination.nombre}
                </Heading>
                <Text size="sm" className="mt-2 line-clamp-2">
                  {contamination.descripcion}
                </Text>
                <div className="mt-3 flex items-center gap-2">
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-xs font-medium",
                      contamination.dificultadRemocion === "crítica" ||
                        contamination.dificultadRemocion === "alta"
                        ? "bg-[rgba(255,80,80,0.12)] text-[var(--color-status-error,#ff5050)]"
                        : contamination.dificultadRemocion === "media"
                          ? "bg-[rgba(255,165,0,0.12)] text-[var(--color-brand-warning,orange)]"
                          : "bg-[rgba(0,255,133,0.12)] text-[var(--color-brand-accent)]",
                    )}
                  >
                    Dificultad {contamination.dificultadRemocion}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </AnimateIn>
      )}

      {/* ── Step: Nivel ──────────────────────────────────────────────────── */}
      {currentStep === "nivel" && (
        <AnimateIn animation="slideUp">
          <button onClick={goBack} className={ghostBtn}>
            <ArrowLeft className="h-4 w-4" />
            Volver
          </button>
          <Badge variant="brand" className="mt-4">
            Paso 3 de 4
          </Badge>
          <Heading as="h2" size="3xl" className="mt-4">
            ¿Cuál es el nivel de contaminación?
          </Heading>
          <Text size="lg" className="mt-3 max-w-2xl">
            El nivel de contaminación influye en la dilución, tiempo de contacto y equipos
            recomendados por el protocolo.
          </Text>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {CONTAMINATION_LEVEL_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => selectLevel(opt.value)}
                className={cn(
                  "group rounded-2xl border border-[var(--color-border-default)] bg-[rgba(255,255,255,0.03)] p-6 text-left transition-all duration-200",
                  "hover:border-[var(--color-brand-primary)] hover:bg-[rgba(0,196,255,0.06)]",
                  input.contaminationLevel === opt.value &&
                    "border-[var(--color-brand-primary)] bg-[rgba(0,196,255,0.08)]",
                )}
              >
                <Heading as="h3" size="lg">
                  {opt.label}
                </Heading>
                <Text size="sm" className="mt-2">
                  {opt.hint}
                </Text>
              </button>
            ))}
          </div>
        </AnimateIn>
      )}

      {/* ── Step: Objetivo ───────────────────────────────────────────────── */}
      {currentStep === "objetivo" && (
        <AnimateIn animation="slideUp">
          <button onClick={goBack} className={ghostBtn}>
            <ArrowLeft className="h-4 w-4" />
            Volver
          </button>
          <Badge variant="brand" className="mt-4">
            Paso 4 de 4
          </Badge>
          <Heading as="h2" size="3xl" className="mt-4">
            ¿Cuál es su objetivo principal?
          </Heading>
          <Text size="lg" className="mt-3 max-w-2xl">
            El objetivo orienta la selección hacia el protocolo que maximiza el resultado para su
            operación específica.
          </Text>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {CLIENT_GOAL_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => selectGoal(opt.value)}
                className={cn(
                  "group rounded-2xl border border-[var(--color-border-default)] bg-[rgba(255,255,255,0.03)] p-5 text-left transition-all duration-200",
                  "hover:border-[var(--color-brand-primary)] hover:bg-[rgba(0,196,255,0.06)]",
                  input.clientGoal === opt.value &&
                    "border-[var(--color-brand-primary)] bg-[rgba(0,196,255,0.08)]",
                )}
              >
                <Text weight="semibold">{opt.label}</Text>
              </button>
            ))}
            <button
              onClick={() => selectGoal(null)}
              className={cn(
                "rounded-2xl border border-dashed border-[var(--color-border-default)] p-5 text-left text-sm text-[var(--color-text-secondary)] transition-all duration-200 hover:border-[var(--color-brand-primary)] hover:text-[var(--color-brand-primary)]",
              )}
            >
              Continuar sin especificar objetivo
            </button>
          </div>
        </AnimateIn>
      )}

      {/* ── Step: Resultado ──────────────────────────────────────────────── */}
      {currentStep === "resultado" && recommendation && (
        <AnimateIn animation="slideUp">
          {/* Context summary */}
          <div className="mb-8 flex flex-wrap items-center gap-3">
            <Badge variant="accent">
              {completedSteps.length}/{totalInputSteps} parámetros definidos
            </Badge>
            <Badge
              variant={
                recommendation.confidence === "alta"
                  ? "brand"
                  : recommendation.confidence === "media"
                    ? "default"
                    : "default"
              }
            >
              Confianza {recommendation.confidence}
            </Badge>
            <button onClick={reset} className={ghostBtn}>
              <RotateCcw className="h-4 w-4" />
              Nueva búsqueda
            </button>
          </div>

          {/* Diagnosis card */}
          <Card
            variant="glass"
            padding="lg"
            className="border border-[var(--color-border-brand)] mb-8"
          >
            <div className="flex items-start gap-4">
              <div className="rounded-2xl bg-[rgba(0,196,255,0.1)] p-3 shrink-0">
                <Target className="h-6 w-6 text-[var(--color-brand-primary)]" />
              </div>
              <div>
                <Text size="sm" tracking="widest" textColor="brand" className="uppercase">
                  Diagnóstico OVI
                </Text>
                <Heading as="h2" size="xl" className="mt-2">
                  {recommendation.diagnosis}
                </Heading>
                {recommendation.technicalJustification && (
                  <Text className="mt-3 max-w-3xl">{recommendation.technicalJustification}</Text>
                )}
              </div>
            </div>
          </Card>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Primary product */}
            {recommendation.primaryProduct ? (
              <Card variant="solid" padding="lg" className="flex flex-col">
                <div className="flex items-center gap-3">
                  <FlaskConical className="h-5 w-5 text-[var(--color-brand-primary)]" />
                  <Text size="sm" tracking="widest" textColor="tertiary" className="uppercase">
                    Producto principal
                  </Text>
                </div>
                <Heading as="h3" size="xl" className="mt-4">
                  {recommendation.primaryProduct.nombre}
                </Heading>
                <Text className="mt-3 flex-1">{recommendation.primaryProduct.resumen}</Text>

                {recommendation.reasoning.whyProduct && (
                  <div className="mt-5 rounded-xl bg-[rgba(0,196,255,0.06)] p-4">
                    <Text size="sm" textColor="secondary">
                      {recommendation.reasoning.whyProduct}
                    </Text>
                  </div>
                )}

                <div className="mt-6 flex flex-wrap gap-3">
                  <button onClick={addPrimaryToCart} className={primaryBtn}>
                    <ShoppingBag className="h-4 w-4" />
                    Agregar al carrito
                  </button>
                  <Link
                    href={`/store/${recommendation.primaryProduct.id}`}
                    className={outlineBtn}
                  >
                    Ver ficha técnica
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </Card>
            ) : (
              <Card variant="glass" padding="lg" className="flex flex-col">
                <Text size="sm" tracking="widest" textColor="tertiary" className="uppercase">
                  Producto principal
                </Text>
                <Heading as="h3" size="xl" className="mt-4">
                  Diagnóstico técnico requerido
                </Heading>
                <Text className="mt-3 flex-1">
                  El contexto proporcionado no permite seleccionar un producto con suficiente
                  confianza. Un ingeniero OVI realizará el diagnóstico en sitio.
                </Text>
                <Link href="/store/checkout" className={cn(primaryBtn, "mt-6")}>
                  Solicitar diagnóstico
                </Link>
              </Card>
            )}

            {/* Protocol */}
            {recommendation.protocol ? (
              <Card variant="glass" padding="lg" className="flex flex-col">
                <div className="flex items-center gap-3">
                  <Layers3 className="h-5 w-5 text-[var(--color-brand-accent)]" />
                  <Text size="sm" tracking="widest" textColor="tertiary" className="uppercase">
                    Protocolo recomendado
                  </Text>
                </div>
                <Heading as="h3" size="xl" className="mt-4">
                  {recommendation.protocol.codigo} · {recommendation.protocol.nombre}
                </Heading>
                <Text className="mt-3 flex-1">{recommendation.protocol.descripcion}</Text>
                {recommendation.reasoning.whyProtocol && (
                  <Text size="sm" textColor="secondary" className="mt-4">
                    {recommendation.reasoning.whyProtocol}
                  </Text>
                )}
                <div className="mt-5 flex flex-wrap gap-2">
                  {recommendation.protocol.pasos.slice(0, 3).map((paso, i) => (
                    <span
                      key={i}
                      className="rounded-full border border-[var(--color-border-default)] px-3 py-1 text-xs text-[var(--color-text-secondary)]"
                    >
                      {i + 1}. {paso.length > 50 ? paso.slice(0, 50) + "…" : paso}
                    </span>
                  ))}
                </div>
              </Card>
            ) : (
              <Card variant="glass" padding="lg">
                <div className="flex items-center gap-3">
                  <Layers3 className="h-5 w-5 text-[var(--color-border-default)]" />
                  <Text size="sm" tracking="widest" textColor="tertiary" className="uppercase">
                    Protocolo recomendado
                  </Text>
                </div>
                <Text className="mt-4">
                  No se encontró un protocolo específico para este contexto. OVI diseñará el
                  protocolo personalizado tras diagnóstico técnico.
                </Text>
              </Card>
            )}

            {/* Service */}
            {recommendation.service && (
              <Card variant="glass" padding="lg" className="flex flex-col">
                <div className="flex items-center gap-3">
                  <Wrench className="h-5 w-5 text-[var(--color-brand-primary)]" />
                  <Text size="sm" tracking="widest" textColor="tertiary" className="uppercase">
                    Servicio recomendado
                  </Text>
                </div>
                <Heading as="h3" size="xl" className="mt-4">
                  {recommendation.service.nombre}
                </Heading>
                <Text className="mt-3 flex-1">{recommendation.service.descripcion}</Text>
                {recommendation.service.entregables.length > 0 && (
                  <div className="mt-4">
                    <Text size="sm" textColor="tertiary" className="uppercase tracking-widest">
                      Entregables
                    </Text>
                    <ul className="mt-2 space-y-1">
                      {recommendation.service.entregables.slice(0, 3).map((e, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-brand-accent)]" />
                          <span className="text-[var(--color-text-secondary)]">{e}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <Link href="/store/servicios" className={cn(outlineBtn, "mt-6")}>
                  Ver todos los servicios
                </Link>
              </Card>
            )}

            {/* Complementary products */}
            {recommendation.complementaryProducts.length > 0 && (
              <Card variant="glass" padding="lg">
                <div className="flex items-center gap-3">
                  <Sparkles className="h-5 w-5 text-[var(--color-brand-accent)]" />
                  <Text size="sm" tracking="widest" textColor="tertiary" className="uppercase">
                    Productos complementarios
                  </Text>
                </div>
                <div className="mt-5 space-y-4">
                  {recommendation.complementaryProducts.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-start gap-3 rounded-xl border border-[var(--color-border-default)] p-4"
                    >
                      <div className="flex-1">
                        <Heading as="h4" size="md">
                          {product.nombre}
                        </Heading>
                        <Text size="sm" className="mt-1">
                          {product.resumen}
                        </Text>
                      </div>
                      <Link
                        href={`/store/${product.id}`}
                        className="shrink-0 rounded-full border border-[var(--color-border-default)] px-3 py-1 text-xs text-[var(--color-text-secondary)] transition-all hover:border-[var(--color-brand-primary)] hover:text-[var(--color-brand-primary)]"
                      >
                        Ver
                      </Link>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>

          {/* Reasoning footer */}
          {(recommendation.reasoning.risksAvoided.length > 0 ||
            recommendation.reasoning.benefitsGenerated.length > 0) && (
            <Card variant="glass" padding="lg" className="mt-6">
              <Heading as="h3" size="lg">
                ¿Por qué esta solución?
              </Heading>
              <div className="mt-6 grid gap-8 md:grid-cols-2">
                {recommendation.reasoning.risksAvoided.length > 0 && (
                  <div>
                    <Text size="sm" tracking="widest" textColor="tertiary" className="uppercase">
                      Riesgos que evita
                    </Text>
                    <ul className="mt-3 space-y-2">
                      {recommendation.reasoning.risksAvoided.map((risk, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-brand-accent)]" />
                          <span className="text-[var(--color-text-secondary)]">{risk}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {recommendation.reasoning.benefitsGenerated.length > 0 && (
                  <div>
                    <Text size="sm" tracking="widest" textColor="tertiary" className="uppercase">
                      Beneficios esperados
                    </Text>
                    <ul className="mt-3 space-y-2">
                      {recommendation.reasoning.benefitsGenerated.map((benefit, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-brand-primary)]" />
                          <span className="text-[var(--color-text-secondary)]">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              {recommendation.expectedBenefit && (
                <div className="mt-6 rounded-xl bg-[rgba(0,196,255,0.06)] p-4">
                  <Text weight="semibold">{recommendation.expectedBenefit}</Text>
                </div>
              )}
            </Card>
          )}

          {/* CTA Footer */}
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/store/carrito" className={primaryBtn}>
              <ShoppingBag className="h-4 w-4" />
              Ver carrito
            </Link>
            <Link href="/store/checkout" className={outlineBtn}>
              Solicitar asesoría de ingeniería
            </Link>
            <Link href="/ovi-ai" className={outlineBtn}>
              <Bot className="h-4 w-4" />
              Profundizar con OVI AI
            </Link>
            <button onClick={reset} className={ghostBtn}>
              <RotateCcw className="h-4 w-4" />
              Nueva búsqueda
            </button>
          </div>
        </AnimateIn>
      )}
    </div>
  );
}
