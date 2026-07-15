"use client";

/**
 * OVI Solution Journey — "Descubre tu Solución"
 * Work Order 014 — OVI Solution Journey
 *
 * The commercial heart of OVI. A cinematic guided journey that takes
 * the user from their problem to the OVI solution — without ever asking
 * them to choose a product.
 *
 * FLOW:
 *   Step 1 → ¿Qué deseas limpiar o proteger?
 *   Step 2 → ¿Qué problema tienes?
 *   Step 3 → ¿Qué objetivo buscas?
 *   Step 4 → OVI Core consulta (transition)
 *   Result → Full solution screen
 *
 * Architecture:
 *   - All recommendations come from OVI Core (generateResolvedRecommendation)
 *   - Journey context is persisted via useExperienceContextStore
 *   - Connects to OVI AI, OVI Lab, OVI Store, Contact
 */

import { useState, useCallback } from "react";
import Link from "next/link";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Bot,
  Briefcase,
  Building2,
  CheckCircle2,
  ChefHat,
  ChevronRight,
  Droplets,
  Factory,
  FileCheck,
  FileText,
  Flame,
  FlaskConical,
  Gauge,
  Hammer,
  HeartPulse,
  Layers,
  Leaf,
  Microscope,
  PackageOpen,
  RefreshCw,
  RotateCcw,
  Shield,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Sun,
  Target,
  TrendingDown,
  Truck,
  Wind,
  Wrench,
  Zap,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimateIn, Badge, Card, Heading, Text } from "@components/ui";
import { cn } from "@utils/cn";
import { generateResolvedRecommendation } from "@knowledge-engine";
import type { OviDecisionInput } from "@knowledge-engine";
import { useExperienceContextStore } from "@store/experience-context.store";
import {
  assetOptions,
  problemOptions,
  objectiveOptions,
  complexityMap,
  findSuccessCase,
  type AssetOption,
  type ProblemOption,
  type ObjectiveOption,
} from "./solution-journey-data";

// ─── Icon resolver ────────────────────────────────────────────────────────────

const ICON_MAP: Record<string, React.ComponentType<{ className?: string; size?: number }>> = {
  Truck,
  Factory,
  Building2,
  Sun,
  ChefHat,
  HeartPulse,
  PackageOpen,
  Briefcase,
  Droplets,
  Gauge,
  Layers,
  Microscope,
  Wind,
  Hammer,
  AlertCircle,
  Flame,
  RefreshCw,
  Shield,
  ShieldCheck,
  Sparkles,
  TrendingDown,
  FileCheck,
};

function DynIcon({
  name,
  className,
  size = 24,
}: {
  name: string;
  className?: string;
  size?: number;
}) {
  const Icon = ICON_MAP[name];
  if (!Icon) return null;
  return <Icon className={className} size={size} />;
}

// ─── Step type ────────────────────────────────────────────────────────────────

type Step = "activo" | "problema" | "objetivo" | "procesando" | "resultado";

// Kept for potential future step navigation
// const STEP_ORDER: Step[] = ["activo", "problema", "objetivo", "procesando", "resultado"];

const STEP_LABELS: Record<Exclude<Step, "procesando" | "resultado">, string> = {
  activo: "¿Qué limpiar?",
  problema: "¿Qué problema?",
  objetivo: "¿Qué objetivo?",
};

// ─── Local style helpers ──────────────────────────────────────────────────────

const primaryBtn =
  "inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-brand-primary)] px-6 py-3 text-sm font-semibold tracking-wide text-[var(--color-text-inverse)] transition-all duration-200 hover:brightness-110 hover:shadow-[0_0_24px_rgba(0,196,255,0.4)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-primary)] active:scale-[0.98] disabled:opacity-40 disabled:pointer-events-none";

const outlineBtn =
  "inline-flex items-center justify-center gap-2 rounded-full border border-[var(--color-border-default)] bg-transparent px-6 py-3 text-sm font-medium tracking-wide text-[var(--color-text-primary)] transition-all duration-200 hover:border-[var(--color-brand-primary)] hover:text-[var(--color-brand-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-primary)] active:scale-[0.98]";

const ghostBtn =
  "inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-[var(--color-text-secondary)] transition-all duration-200 hover:text-[var(--color-brand-primary)]";

// ─── Selectable card ──────────────────────────────────────────────────────────

function SelectCard({
  icon,
  label,
  description,
  selected,
  onClick,
}: {
  icon: string;
  label: string;
  description: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "group relative flex flex-col items-start gap-3 rounded-2xl border p-5 text-left transition-all duration-200",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-primary)]",
        selected
          ? "border-[var(--color-brand-primary)] bg-[rgba(0,196,255,0.08)] shadow-[0_0_20px_rgba(0,196,255,0.15)]"
          : "border-[var(--color-border-subtle)] bg-[var(--glass-bg)] hover:border-[var(--color-border-default)] hover:bg-[rgba(255,255,255,0.04)]",
      )}
    >
      <div
        className={cn(
          "flex h-11 w-11 items-center justify-center rounded-xl transition-colors duration-200",
          selected
            ? "bg-[rgba(0,196,255,0.2)] text-[var(--color-brand-primary)]"
            : "bg-[rgba(255,255,255,0.06)] text-[var(--color-text-secondary)] group-hover:text-[var(--color-brand-primary)]",
        )}
      >
        <DynIcon name={icon} size={20} />
      </div>
      <div>
        <p
          className={cn(
            "text-sm font-semibold tracking-wide",
            selected ? "text-[var(--color-brand-primary)]" : "text-[var(--color-text-primary)]",
          )}
        >
          {label}
        </p>
        <p className="mt-0.5 text-xs leading-relaxed text-[var(--color-text-secondary)]">
          {description}
        </p>
      </div>
      {selected && (
        <CheckCircle2
          size={16}
          className="absolute top-4 right-4 text-[var(--color-brand-primary)]"
        />
      )}
    </button>
  );
}

// ─── Progress bar ─────────────────────────────────────────────────────────────

function JourneyProgress({ current, total = 3 }: { current: number; total?: number }) {
  return (
    <div className="flex items-center gap-3">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "h-1 flex-1 rounded-full transition-all duration-500",
            i < current
              ? "bg-[var(--color-brand-primary)]"
              : i === current
                ? "bg-[rgba(0,196,255,0.4)]"
                : "bg-[var(--color-border-subtle)]",
          )}
        />
      ))}
    </div>
  );
}

// ─── Processing screen ────────────────────────────────────────────────────────

function ProcessingScreen() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-8 text-center">
      <div className="relative">
        <div className="h-24 w-24 rounded-full border-2 border-[var(--color-brand-primary)] opacity-20" />
        <div className="absolute inset-0 h-24 w-24 animate-spin rounded-full border-2 border-transparent border-t-[var(--color-brand-primary)]" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Zap size={28} className="text-[var(--color-brand-primary)]" />
        </div>
      </div>
      <div>
        <p className="text-sm font-semibold tracking-widest text-[var(--color-brand-primary)] uppercase">
          OVI Core
        </p>
        <Heading as="h2" size="2xl" className="mt-2">
          Consultando el motor de soluciones
        </Heading>
        <Text size="base" className="mt-3 max-w-md text-[var(--color-text-secondary)]">
          Analizando desafío operativo, seleccionando protocolo y producto óptimo…
        </Text>
      </div>
      <div className="flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="h-2 w-2 animate-pulse rounded-full bg-[var(--color-brand-primary)]"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Result screen ────────────────────────────────────────────────────────────

function ResultScreen({
  recommendation,
  selectedAsset,
  selectedProblem,
  selectedObjective,
  onReset,
}: {
  recommendation: ReturnType<typeof generateResolvedRecommendation>;
  selectedAsset: AssetOption;
  selectedProblem: ProblemOption;
  selectedObjective: ObjectiveOption;
  onReset: () => void;
}) {
  const successCase = findSuccessCase(selectedAsset.industryId, selectedProblem.contaminationId);
  const complexity = complexityMap[recommendation.confidence] ?? complexityMap["media"]!;

  const envBenefits = recommendation.primaryProduct?.impactoAmbiental ?? [];
  const benefits = [...(recommendation.reasoning?.benefitsGenerated ?? [])];

  const timeEstimate =
    recommendation.protocol?.tiempoEstimado ??
    recommendation.service?.beneficios?.[0] ??
    "A definir según diagnóstico técnico en sitio";

  return (
    <AnimateIn animation="slideUp">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <Badge variant="brand" className="mb-3">
              Solución OVI
            </Badge>
            <Heading as="h2" size="3xl">
              Tu diagnóstico está listo
            </Heading>
            <Text size="base" className="mt-2 text-[var(--color-text-secondary)]">
              {selectedAsset.label} · {selectedProblem.label} · {selectedObjective.label}
            </Text>
          </div>
          <button onClick={onReset} className={ghostBtn}>
            <RotateCcw size={16} />
            Nuevo recorrido
          </button>
        </div>

        {/* Grid: Diagnosis + Complexity */}
        <div className="grid gap-4 sm:grid-cols-2">
          {/* Diagnosis */}
          <Card className="border-[var(--color-border-subtle)] bg-[var(--glass-bg)] p-5">
            <div className="mb-3 flex items-center gap-2">
              <Target size={16} className="text-[var(--color-brand-primary)]" />
              <span className="text-xs font-semibold tracking-widest text-[var(--color-text-secondary)] uppercase">
                Diagnóstico
              </span>
            </div>
            <p className="text-sm leading-relaxed text-[var(--color-text-primary)]">
              {recommendation.diagnosis}
            </p>
          </Card>

          {/* Complexity */}
          <Card className="border-[var(--color-border-subtle)] bg-[var(--glass-bg)] p-5">
            <div className="mb-3 flex items-center gap-2">
              <Zap size={16} className="text-[var(--color-brand-primary)]" />
              <span className="text-xs font-semibold tracking-widest text-[var(--color-text-secondary)] uppercase">
                Nivel de complejidad
              </span>
            </div>
            <p className="text-2xl font-bold" style={{ color: complexity.color }}>
              {complexity.label}
            </p>
            <p className="mt-1 text-xs text-[var(--color-text-secondary)]">
              {complexity.description}
            </p>
          </Card>
        </div>

        {/* Primary product + Service */}
        <div className="grid gap-4 md:grid-cols-2">
          {/* Primary solution */}
          <Card className="border-[var(--color-brand-primary)] bg-[rgba(0,196,255,0.05)] p-6">
            <div className="mb-4 flex items-center gap-2">
              <FlaskConical size={18} className="text-[var(--color-brand-primary)]" />
              <span className="text-xs font-semibold tracking-widest text-[var(--color-brand-primary)] uppercase">
                Solución OVI principal
              </span>
            </div>
            {recommendation.primaryProduct ? (
              <div>
                <p className="text-xl font-bold text-[var(--color-text-primary)]">
                  {recommendation.primaryProduct.nombre}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                  {recommendation.primaryProduct.resumen}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {recommendation.primaryProduct.beneficios.slice(0, 3).map((b) => (
                    <span
                      key={b}
                      className="rounded-full bg-[rgba(0,196,255,0.1)] px-2.5 py-0.5 text-xs text-[var(--color-brand-primary)]"
                    >
                      {b}
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-sm text-[var(--color-text-secondary)]">
                Diagnóstico técnico requerido. Un ingeniero OVI definirá la solución óptima para tu
                contexto específico.
              </p>
            )}
          </Card>

          {/* Recommended service */}
          <Card className="border-[var(--color-border-subtle)] bg-[var(--glass-bg)] p-6">
            <div className="mb-4 flex items-center gap-2">
              <Wrench size={18} className="text-[var(--color-brand-primary)]" />
              <span className="text-xs font-semibold tracking-widest text-[var(--color-text-secondary)] uppercase">
                Servicio recomendado
              </span>
            </div>
            {recommendation.service ? (
              <div>
                <p className="text-lg font-bold text-[var(--color-text-primary)]">
                  {recommendation.service.nombre}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                  {recommendation.service.resumen}
                </p>
                <div className="mt-3 space-y-1">
                  {recommendation.service.entregables.slice(0, 3).map((e) => (
                    <div key={e} className="flex items-center gap-1.5">
                      <CheckCircle2
                        size={12}
                        className="shrink-0 text-[var(--color-brand-accent)]"
                      />
                      <span className="text-xs text-[var(--color-text-secondary)]">{e}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-sm text-[var(--color-text-secondary)]">
                El equipo técnico OVI diseñará el servicio adecuado tras el diagnóstico inicial.
              </p>
            )}
          </Card>
        </div>

        {/* Complementary products */}
        {recommendation.complementaryProducts.length > 0 && (
          <div>
            <p className="mb-3 text-xs font-semibold tracking-widest text-[var(--color-text-secondary)] uppercase">
              Productos complementarios
            </p>
            <div className="flex flex-wrap gap-2">
              {recommendation.complementaryProducts.map((p) => (
                <Link
                  key={p.id}
                  href={`/store/${p.id}`}
                  className="group flex items-center gap-2 rounded-full border border-[var(--color-border-subtle)] bg-[var(--glass-bg)] px-4 py-2 text-sm transition-all hover:border-[var(--color-brand-primary)] hover:text-[var(--color-brand-primary)]"
                >
                  {p.nombre}
                  <ChevronRight size={14} className="opacity-40 group-hover:opacity-100" />
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Benefits + Time + Environmental */}
        <div className="grid gap-4 sm:grid-cols-3">
          {/* Benefits */}
          <Card className="border-[var(--color-border-subtle)] bg-[var(--glass-bg)] p-5">
            <div className="mb-3 flex items-center gap-2">
              <CheckCircle2 size={16} className="text-[var(--color-brand-accent)]" />
              <span className="text-xs font-semibold tracking-widest text-[var(--color-text-secondary)] uppercase">
                Beneficios
              </span>
            </div>
            <ul className="space-y-2">
              {benefits.slice(0, 3).map((b, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2
                    size={12}
                    className="mt-0.5 shrink-0 text-[var(--color-brand-accent)]"
                  />
                  <span className="text-xs leading-relaxed text-[var(--color-text-secondary)]">
                    {b}
                  </span>
                </li>
              ))}
              {benefits.length === 0 && (
                <li className="text-xs text-[var(--color-text-secondary)]">
                  Eficiencia operacional mejorada con protocolo y producto correctamente
                  seleccionados.
                </li>
              )}
            </ul>
          </Card>

          {/* Estimated time */}
          <Card className="border-[var(--color-border-subtle)] bg-[var(--glass-bg)] p-5">
            <div className="mb-3 flex items-center gap-2">
              <Target size={16} className="text-[var(--color-brand-primary)]" />
              <span className="text-xs font-semibold tracking-widest text-[var(--color-text-secondary)] uppercase">
                Tiempo estimado
              </span>
            </div>
            <p className="text-sm leading-relaxed text-[var(--color-text-primary)]">
              {timeEstimate}
            </p>
          </Card>

          {/* Environmental impact */}
          <Card className="border-[var(--color-border-subtle)] bg-[var(--glass-bg)] p-5">
            <div className="mb-3 flex items-center gap-2">
              <Leaf size={16} className="text-[var(--color-brand-accent)]" />
              <span className="text-xs font-semibold tracking-widest text-[var(--color-text-secondary)] uppercase">
                Impacto ambiental
              </span>
            </div>
            <ul className="space-y-2">
              {envBenefits.slice(0, 2).map((b, i) => (
                <li key={i} className="flex items-start gap-2">
                  <Leaf size={11} className="mt-0.5 shrink-0 text-[var(--color-brand-accent)]" />
                  <span className="text-xs leading-relaxed text-[var(--color-text-secondary)]">
                    {b}
                  </span>
                </li>
              ))}
              {envBenefits.length === 0 && (
                <li className="text-xs text-[var(--color-text-secondary)]">
                  Formulaciones biodegradables y de bajo impacto ambiental validadas por OVI.
                </li>
              )}
            </ul>
          </Card>
        </div>

        {/* Success case */}
        {successCase && (
          <Card className="border-[rgba(0,255,133,0.2)] bg-[rgba(0,255,133,0.03)] p-6">
            <div className="mb-4 flex items-center gap-2">
              <CheckCircle2 size={18} className="text-[var(--color-brand-accent)]" />
              <span className="text-xs font-semibold tracking-widest text-[var(--color-brand-accent)] uppercase">
                Caso de éxito similar
              </span>
            </div>
            <p className="mb-2 text-xs font-semibold tracking-wide text-[var(--color-text-secondary)] uppercase">
              OVI implementó esta solución en:
            </p>
            <p className="mb-3 text-lg font-bold text-[var(--color-text-primary)]">
              {successCase.title}
            </p>
            <p className="mb-4 text-sm leading-relaxed text-[var(--color-text-secondary)]">
              {successCase.detail}
            </p>
            <div className="rounded-xl border border-[rgba(0,255,133,0.15)] bg-[rgba(0,255,133,0.05)] p-3">
              <p className="mb-1 text-xs font-semibold tracking-wide text-[var(--color-brand-accent)] uppercase">
                Resultado
              </p>
              <p className="text-sm text-[var(--color-text-primary)]">{successCase.result}</p>
            </div>
          </Card>
        )}

        {/* Technical justification */}
        {recommendation.technicalJustification && (
          <Card className="border-[var(--color-border-subtle)] bg-[var(--glass-bg)] p-5">
            <div className="mb-3 flex items-center gap-2">
              <FlaskConical size={16} className="text-[var(--color-brand-primary)]" />
              <span className="text-xs font-semibold tracking-widest text-[var(--color-text-secondary)] uppercase">
                Justificación técnica
              </span>
            </div>
            <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">
              {recommendation.technicalJustification}
            </p>
          </Card>
        )}

        {/* Action connections */}
        <div>
          <p className="mb-4 text-xs font-semibold tracking-widest text-[var(--color-text-secondary)] uppercase">
            Continuar desde aquí
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Link
              href="/ovi-ai"
              className="group flex items-center gap-3 rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--glass-bg)] p-4 transition-all hover:border-[var(--color-brand-primary)] hover:bg-[rgba(0,196,255,0.05)]"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[rgba(0,196,255,0.1)] text-[var(--color-brand-primary)]">
                <Bot size={18} />
              </div>
              <div>
                <p className="text-sm font-semibold text-[var(--color-text-primary)] group-hover:text-[var(--color-brand-primary)]">
                  Hablar con OVI AI
                </p>
                <p className="text-xs text-[var(--color-text-secondary)]">
                  Asistente de ingeniería
                </p>
              </div>
            </Link>

            <Link
              href="/solution-lab"
              className="group flex items-center gap-3 rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--glass-bg)] p-4 transition-all hover:border-[var(--color-brand-primary)] hover:bg-[rgba(0,196,255,0.05)]"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[rgba(0,196,255,0.1)] text-[var(--color-brand-primary)]">
                <FlaskConical size={18} />
              </div>
              <div>
                <p className="text-sm font-semibold text-[var(--color-text-primary)] group-hover:text-[var(--color-brand-primary)]">
                  Abrir OVI Lab
                </p>
                <p className="text-xs text-[var(--color-text-secondary)]">Exploración profunda</p>
              </div>
            </Link>

            <Link
              href={
                recommendation.primaryProduct
                  ? `/store/${recommendation.primaryProduct.id}`
                  : "/store"
              }
              className="group flex items-center gap-3 rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--glass-bg)] p-4 transition-all hover:border-[var(--color-brand-primary)] hover:bg-[rgba(0,196,255,0.05)]"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[rgba(0,196,255,0.1)] text-[var(--color-brand-primary)]">
                <ShoppingBag size={18} />
              </div>
              <div>
                <p className="text-sm font-semibold text-[var(--color-text-primary)] group-hover:text-[var(--color-brand-primary)]">
                  Comprar en OVI Store
                </p>
                <p className="text-xs text-[var(--color-text-secondary)]">Catálogo de productos</p>
              </div>
            </Link>

            <Link
              href="/contact"
              className="group flex items-center gap-3 rounded-2xl border border-[var(--color-brand-accent)] bg-[rgba(0,255,133,0.03)] p-4 transition-all hover:bg-[rgba(0,255,133,0.08)]"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[rgba(0,255,133,0.15)] text-[var(--color-brand-accent)]">
                <Target size={18} />
              </div>
              <div>
                <p className="text-sm font-semibold text-[var(--color-brand-accent)]">
                  Visita técnica
                </p>
                <p className="text-xs text-[var(--color-text-secondary)]">Diagnóstico en sitio</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Document downloads */}
        {(recommendation.primaryProduct?.fichaTecnica ||
          recommendation.primaryProduct?.brochure) && (
          <div className="flex flex-wrap gap-3">
            {recommendation.primaryProduct?.fichaTecnica && (
              <a
                href={recommendation.primaryProduct.fichaTecnica}
                target="_blank"
                rel="noopener noreferrer"
                className={outlineBtn}
              >
                <FileText size={16} />
                Ficha técnica
              </a>
            )}
            {recommendation.primaryProduct?.brochure && (
              <a
                href={recommendation.primaryProduct.brochure}
                target="_blank"
                rel="noopener noreferrer"
                className={outlineBtn}
              >
                <FileText size={16} />
                Brochure
              </a>
            )}
          </div>
        )}
      </div>
    </AnimateIn>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function SolutionJourneyPage() {
  const experienceCtx = useExperienceContextStore();

  const [currentStep, setCurrentStep] = useState<Step>("activo");
  const [selectedAsset, setSelectedAsset] = useState<AssetOption | null>(null);
  const [selectedProblem, setSelectedProblem] = useState<ProblemOption | null>(null);
  const [selectedObjective, setSelectedObjective] = useState<ObjectiveOption | null>(null);
  const [recommendation, setRecommendation] = useState<ReturnType<
    typeof generateResolvedRecommendation
  > | null>(null);

  // Unused: kept for potential step navigation extension
  // const currentStepIndex = STEP_ORDER.indexOf(currentStep);

  // ── Handlers ──────────────────────────────────────────────────────────────

  const handleSelectAsset = useCallback((asset: AssetOption) => {
    setSelectedAsset(asset);
    setSelectedProblem(null);
  }, []);

  const handleSelectProblem = useCallback((problem: ProblemOption) => {
    setSelectedProblem(problem);
  }, []);

  const handleSelectObjective = useCallback(
    (objective: ObjectiveOption) => {
      if (!selectedAsset || !selectedProblem) return;
      setSelectedObjective(objective);
      setCurrentStep("procesando");

      // Build decision input
      const input: OviDecisionInput = {
        industryId: selectedAsset.industryId,
        assetType: selectedAsset.assetType,
        contaminationId: selectedProblem.contaminationId,
        contaminationLevel: selectedProblem.severityHint,
        clientGoal: objective.clientGoal,
        environmentalRestrictions: selectedAsset.environmentalRestrictions,
      };

      // Simulate brief processing delay for UX
      setTimeout(() => {
        const rec = generateResolvedRecommendation(input);
        setRecommendation(rec);

        // Write to Experience Context
        experienceCtx.updateInput({
          industryId: selectedAsset.industryId,
          assetType: selectedAsset.assetType,
          contaminationId: selectedProblem.contaminationId,
          contaminationLevel: selectedProblem.severityHint,
          clientGoal: objective.clientGoal,
        });
        experienceCtx.setDiagnosis(
          {
            diagnosis: rec.diagnosis ?? null,
            technicalJustification: rec.technicalJustification ?? null,
            primaryProductId: rec.primaryProduct?.id ?? null,
            primaryProductName: rec.primaryProduct?.nombre ?? null,
            protocolId: rec.protocol?.codigo ?? null,
            protocolName: rec.protocol?.nombre ?? null,
            serviceId: rec.service?.id ?? null,
            serviceName: rec.service?.nombre ?? null,
            expectedBenefit: rec.expectedBenefit ?? null,
          },
          "store",
          "contact",
        );

        setCurrentStep("resultado");
      }, 1800);
    },
    [selectedAsset, selectedProblem, experienceCtx],
  );

  const handleGoBack = useCallback(() => {
    if (currentStep === "problema") setCurrentStep("activo");
    else if (currentStep === "objetivo") setCurrentStep("problema");
    else if (currentStep === "resultado") setCurrentStep("objetivo");
  }, [currentStep]);

  const handleReset = useCallback(() => {
    setCurrentStep("activo");
    setSelectedAsset(null);
    setSelectedProblem(null);
    setSelectedObjective(null);
    setRecommendation(null);
  }, []);

  const canAdvanceActivo = selectedAsset !== null;
  const canAdvanceProblema = selectedProblem !== null;

  const inputStepCount = 3;
  const currentInputStep =
    currentStep === "activo"
      ? 0
      : currentStep === "problema"
        ? 1
        : currentStep === "objetivo"
          ? 2
          : 3;

  return (
    <section className="min-h-screen pt-24 pb-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Journey header — only shown for input steps */}
        {currentStep !== "procesando" && currentStep !== "resultado" && (
          <AnimateIn animation="slideUp">
            <div className="mb-10">
              <Badge variant="brand" className="mb-4">
                WO·014 — Descubre tu Solución
              </Badge>
              <Heading as="h1" size="4xl" className="max-w-2xl">
                Tengo este problema…
              </Heading>
              <Text size="lg" className="mt-3 max-w-xl text-[var(--color-text-secondary)]">
                OVI responderá:{" "}
                <span className="font-medium text-[var(--color-brand-primary)]">
                  Esta es la solución.
                </span>
              </Text>

              {/* Step progress */}
              <div className="mt-8 space-y-3">
                <JourneyProgress current={currentInputStep} total={inputStepCount} />
                <div className="flex items-center gap-2">
                  {(Object.keys(STEP_LABELS) as Array<keyof typeof STEP_LABELS>).map((s, i) => (
                    <div key={s} className="flex items-center gap-2">
                      <span
                        className={cn(
                          "text-xs font-medium transition-colors duration-300",
                          i === currentInputStep
                            ? "text-[var(--color-brand-primary)]"
                            : i < currentInputStep
                              ? "text-[var(--color-brand-accent)]"
                              : "text-[var(--color-text-disabled,rgba(255,255,255,0.3))]",
                        )}
                      >
                        {i < currentInputStep && <CheckCircle2 size={12} className="mr-1 inline" />}
                        {STEP_LABELS[s]}
                      </span>
                      {i < inputStepCount - 1 && (
                        <ChevronRight size={12} className="text-[var(--color-border-default)]" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AnimateIn>
        )}

        {/* ── STEP 1: Activo ─────────────────────────────────────────────── */}
        <AnimatePresence mode="wait">
          {currentStep === "activo" && (
            <motion.div
              key="activo"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              <Heading as="h2" size="2xl" className="mb-2">
                ¿Qué deseas limpiar o proteger?
              </Heading>
              <Text size="base" className="mb-6 text-[var(--color-text-secondary)]">
                Selecciona el activo o espacio que representa tu desafío operativo.
              </Text>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {assetOptions.map((asset) => (
                  <SelectCard
                    key={asset.id}
                    icon={asset.icon}
                    label={asset.label}
                    description={asset.description}
                    selected={selectedAsset?.id === asset.id}
                    onClick={() => handleSelectAsset(asset)}
                  />
                ))}
              </div>
              <div className="mt-8 flex justify-end">
                <button
                  className={primaryBtn}
                  disabled={!canAdvanceActivo}
                  onClick={() => setCurrentStep("problema")}
                >
                  Continuar
                  <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>
          )}

          {/* ── STEP 2: Problema ─────────────────────────────────────────── */}
          {currentStep === "problema" && (
            <motion.div
              key="problema"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              <Heading as="h2" size="2xl" className="mb-2">
                ¿Qué problema tienes?
              </Heading>
              <Text size="base" className="mb-6 text-[var(--color-text-secondary)]">
                Identifica el tipo de suciedad o contaminación que estás enfrentando.
              </Text>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {problemOptions.map((problem) => (
                  <SelectCard
                    key={problem.id}
                    icon={problem.icon}
                    label={problem.label}
                    description={problem.description}
                    selected={selectedProblem?.id === problem.id}
                    onClick={() => handleSelectProblem(problem)}
                  />
                ))}
              </div>
              <div className="mt-8 flex items-center justify-between">
                <button className={ghostBtn} onClick={handleGoBack}>
                  <ArrowLeft size={16} />
                  Atrás
                </button>
                <button
                  className={primaryBtn}
                  disabled={!canAdvanceProblema}
                  onClick={() => setCurrentStep("objetivo")}
                >
                  Continuar
                  <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>
          )}

          {/* ── STEP 3: Objetivo ──────────────────────────────────────────── */}
          {currentStep === "objetivo" && (
            <motion.div
              key="objetivo"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              <Heading as="h2" size="2xl" className="mb-2">
                ¿Qué objetivo buscas?
              </Heading>
              <Text size="base" className="mb-6 text-[var(--color-text-secondary)]">
                Dinos qué resultado quieres alcanzar. OVI alineará la solución a tu propósito.
              </Text>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {objectiveOptions.map((obj) => (
                  <SelectCard
                    key={obj.id}
                    icon={obj.icon}
                    label={obj.label}
                    description={obj.description}
                    selected={selectedObjective?.id === obj.id}
                    onClick={() => handleSelectObjective(obj)}
                  />
                ))}
              </div>
              <div className="mt-8 flex items-center justify-between">
                <button className={ghostBtn} onClick={handleGoBack}>
                  <ArrowLeft size={16} />
                  Atrás
                </button>
                <p className="text-xs text-[var(--color-text-secondary)]">
                  Selecciona un objetivo para continuar
                </p>
              </div>
            </motion.div>
          )}

          {/* ── STEP 4: Processing ───────────────────────────────────────── */}
          {currentStep === "procesando" && (
            <motion.div
              key="procesando"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <ProcessingScreen />
            </motion.div>
          )}

          {/* ── Result ───────────────────────────────────────────────────── */}
          {currentStep === "resultado" &&
            recommendation &&
            selectedAsset &&
            selectedProblem &&
            selectedObjective && (
              <motion.div
                key="resultado"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <ResultScreen
                  recommendation={recommendation}
                  selectedAsset={selectedAsset}
                  selectedProblem={selectedProblem}
                  selectedObjective={selectedObjective}
                  onReset={handleReset}
                />
              </motion.div>
            )}
        </AnimatePresence>
      </div>
    </section>
  );
}
