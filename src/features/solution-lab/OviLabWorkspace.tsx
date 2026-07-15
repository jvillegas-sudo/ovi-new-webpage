"use client";

/**
 * Feature: OVI Lab Workspace
 * Work Order 005 — OVI Lab: Intelligent Engineering Experience
 *
 * A 6-step guided engineering consultation backed by the OVI Knowledge Engine.
 * The user selects: Industria → Activo → Zona → Material → Tipo de Suciedad → Objetivo
 * The Knowledge Engine generates a complete, structured recommendation.
 *
 * RULES:
 *   - No hardcoded recommendations.
 *   - No DEMO labels. Every result comes from the Knowledge Engine.
 *   - OVI Lab only consults. It does not sell.
 *   - Architecture is open for 3D, AR, before/after features in the future.
 */

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Bot,
  CheckCircle2,
  ChevronRight,
  Clock,
  Cpu,
  FlaskConical,
  Leaf,
  Layers,
  RotateCcw,
  Shield,
  Sparkles,
  Target,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@utils/cn";
import { Heading, Text } from "@components/ui";
import { decisionTree, generateResolvedRecommendation } from "@knowledge-engine";
import type { OviDecisionInput, OviDecisionNode } from "@knowledge-engine";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getNode(id: string): OviDecisionNode | undefined {
  return decisionTree.find((n) => n.id === id);
}

// ─── Step configuration ───────────────────────────────────────────────────────

const LAB_STEP_NODES = [
  "node-industria",
  "node-activo",
  "node-zona",
  "node-material",
  "node-suciedad",
  "node-objetivo",
] as const;

type LabStepId = (typeof LAB_STEP_NODES)[number] | "result";

const STEP_META: Record<
  (typeof LAB_STEP_NODES)[number],
  {
    stepNumber: string;
    label: string;
    field: keyof OviDecisionInput;
    icon: LucideIcon;
    accent: string;
    accentBg: string;
    accentBorder: string;
  }
> = {
  "node-industria": {
    stepNumber: "01",
    label: "Industria",
    field: "industryId",
    icon: Target,
    accent: "var(--color-brand-primary)",
    accentBg: "rgba(0,196,255,0.08)",
    accentBorder: "rgba(0,196,255,0.25)",
  },
  "node-activo": {
    stepNumber: "02",
    label: "Activo",
    field: "assetType",
    icon: Wrench,
    accent: "var(--color-brand-primary)",
    accentBg: "rgba(0,196,255,0.08)",
    accentBorder: "rgba(0,196,255,0.25)",
  },
  "node-zona": {
    stepNumber: "03",
    label: "Zona",
    field: "zone",
    icon: Layers,
    accent: "var(--color-brand-accent)",
    accentBg: "rgba(0,255,133,0.08)",
    accentBorder: "rgba(0,255,133,0.25)",
  },
  "node-material": {
    stepNumber: "04",
    label: "Material",
    field: "surfaceId",
    icon: Cpu,
    accent: "var(--color-brand-accent)",
    accentBg: "rgba(0,255,133,0.08)",
    accentBorder: "rgba(0,255,133,0.25)",
  },
  "node-suciedad": {
    stepNumber: "05",
    label: "Suciedad",
    field: "contaminationId",
    icon: AlertTriangle,
    accent: "var(--color-brand-warning, #ffa500)",
    accentBg: "rgba(255,165,0,0.08)",
    accentBorder: "rgba(255,165,0,0.25)",
  },
  "node-objetivo": {
    stepNumber: "06",
    label: "Objetivo",
    field: "clientGoal",
    icon: Sparkles,
    accent: "var(--color-brand-secondary)",
    accentBg: "rgba(0,71,171,0.1)",
    accentBorder: "rgba(0,71,171,0.3)",
  },
};

const WIZARD_STEPS: { id: LabStepId; label: string }[] = [
  { id: "node-industria", label: "Industria" },
  { id: "node-activo", label: "Activo" },
  { id: "node-zona", label: "Zona" },
  { id: "node-material", label: "Material" },
  { id: "node-suciedad", label: "Suciedad" },
  { id: "node-objetivo", label: "Objetivo" },
  { id: "result", label: "Diagnóstico" },
];

// ─── State ────────────────────────────────────────────────────────────────────

interface LabState {
  industryId: string | null;
  assetType: string | null;
  zone: string | null;
  surfaceId: string | null;
  contaminationId: string | null;
  clientGoal: string | null;
}

// ─── Animation variants ───────────────────────────────────────────────────────

const panelVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.99 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, y: -12, scale: 0.99, transition: { duration: 0.2, ease: [0.4, 0, 1, 1] } },
};

const reducedPanelVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.1 } },
};

// ─── Step Indicator ───────────────────────────────────────────────────────────

function StepIndicator({
  currentStep,
  completedSteps,
}: {
  currentStep: LabStepId;
  completedSteps: Set<LabStepId>;
}) {
  const currentIndex = WIZARD_STEPS.findIndex((s) => s.id === currentStep);

  return (
    <nav aria-label="Progreso de OVI Lab" className="mb-8">
      <ol className="flex items-center justify-center gap-0 overflow-x-auto pb-1">
        {WIZARD_STEPS.map((step, index) => {
          const isCompleted = completedSteps.has(step.id);
          const isCurrent = step.id === currentStep;
          const isPast = index < currentIndex;

          return (
            <li key={step.id} className="flex shrink-0 items-center">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-bold transition-all duration-300",
                    isCurrent
                      ? "bg-[var(--color-brand-primary)] text-[var(--color-text-inverse)] shadow-[0_0_12px_rgba(0,196,255,0.5)]"
                      : isCompleted || isPast
                        ? "bg-[var(--color-brand-primary)] text-[var(--color-text-inverse)] opacity-55"
                        : "border border-[var(--color-border-default)] bg-transparent text-[var(--color-text-tertiary)]",
                  )}
                  aria-current={isCurrent ? "step" : undefined}
                >
                  {isCompleted || isPast ? <CheckCircle2 size={12} /> : index + 1}
                </div>
                <span
                  className={cn(
                    "mt-1 hidden text-[9px] font-medium sm:block",
                    isCurrent
                      ? "text-[var(--color-brand-primary)]"
                      : "text-[var(--color-text-tertiary)]",
                  )}
                >
                  {step.label}
                </span>
              </div>
              {index < WIZARD_STEPS.length - 1 && (
                <div
                  className={cn(
                    "mx-1 h-px w-6 transition-all duration-300 sm:w-8",
                    isPast || isCompleted
                      ? "bg-[var(--color-brand-primary)] opacity-35"
                      : "bg-[var(--color-border-subtle)]",
                  )}
                  aria-hidden="true"
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

// ─── Breadcrumb trail ─────────────────────────────────────────────────────────

function LabBreadcrumb({ state }: { state: LabState }) {
  const crumbs = [
    { label: state.industryId, nodeId: "node-industria" as const },
    { label: state.assetType, nodeId: "node-activo" as const },
    { label: state.zone, nodeId: "node-zona" as const },
    { label: state.surfaceId, nodeId: "node-material" as const },
    { label: state.contaminationId, nodeId: "node-suciedad" as const },
    { label: state.clientGoal, nodeId: "node-objetivo" as const },
  ].filter((c) => c.label !== null);

  if (crumbs.length === 0) return null;

  return (
    <div className="mb-5 flex flex-wrap items-center gap-1.5" aria-label="Contexto seleccionado">
      {crumbs.map((crumb, i) => {
        const node = getNode(crumb.nodeId);
        const option = node?.options.find((o) => o.value === crumb.label);
        const label = option?.label ?? crumb.label ?? "";
        const meta = STEP_META[crumb.nodeId];
        return (
          <React.Fragment key={crumb.nodeId}>
            <span
              className="rounded-full px-2.5 py-0.5 text-[10px] font-semibold tracking-wide"
              style={{
                background: meta.accentBg,
                border: `1px solid ${meta.accentBorder}`,
                color: meta.accent,
              }}
            >
              {label}
            </span>
            {i < crumbs.length - 1 && (
              <ChevronRight
                size={10}
                className="text-[var(--color-text-tertiary)]"
                aria-hidden="true"
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

// ─── Option Selection Panel ───────────────────────────────────────────────────

function OptionSelectionStep({
  nodeId,
  state,
  onSelect,
  onBack,
}: {
  nodeId: (typeof LAB_STEP_NODES)[number];
  state: LabState;
  onSelect: (value: string) => void;
  onBack: () => void;
}) {
  const node = getNode(nodeId);
  const meta = STEP_META[nodeId];

  if (!node) return null;

  const Icon = meta.icon;

  return (
    <div>
      {/* Step header */}
      <div className="mb-7 text-center">
        <p
          className="mb-2 text-xs font-semibold tracking-widest text-[var(--color-text-tertiary)] uppercase"
          aria-hidden="true"
        >
          — Paso {meta.stepNumber} de 06 —
        </p>
        <div className="mb-3 flex justify-center">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-xl"
            style={{ background: meta.accentBg, border: `1px solid ${meta.accentBorder}` }}
            aria-hidden="true"
          >
            <Icon size={18} style={{ color: meta.accent }} />
          </div>
        </div>
        <Heading as="h2" size="2xl" align="center">
          {node.question}
        </Heading>
        <Text align="center" className="mx-auto mt-3 max-w-xl">
          {node.description}
        </Text>
      </div>

      {/* Breadcrumb */}
      <div className="mb-5 flex justify-center">
        <LabBreadcrumb state={state} />
      </div>

      {/* Options grid */}
      <div
        className={cn(
          "grid gap-3",
          node.options.length <= 4
            ? "sm:grid-cols-2"
            : node.options.length <= 6
              ? "sm:grid-cols-2 lg:grid-cols-3"
              : "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
        )}
        role="list"
        aria-label={`Opciones para ${meta.label}`}
      >
        {node.options.map((option) => (
          <motion.div
            key={option.value}
            role="listitem"
            whileHover={{ y: -2, transition: { duration: 0.18 } }}
            whileTap={{ scale: 0.97 }}
          >
            <button
              className={cn(
                "glass glass-hover group relative w-full overflow-hidden rounded-xl p-4 text-left",
                "border border-[rgba(255,255,255,0.07)] transition-all duration-250",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-primary)]",
              )}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = meta.accentBorder;
                (e.currentTarget as HTMLElement).style.background = meta.accentBg;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)";
                (e.currentTarget as HTMLElement).style.background = "";
              }}
              onClick={() => onSelect(option.value)}
              aria-label={`Seleccionar: ${option.label}${option.hint ? ` — ${option.hint}` : ""}`}
            >
              <p className="text-sm font-semibold text-[var(--color-text-primary)]">
                {option.label}
              </p>
              {option.hint && (
                <p className="mt-1.5 text-xs leading-relaxed text-[var(--color-text-tertiary)]">
                  {option.hint}
                </p>
              )}
              <ArrowRight
                size={12}
                className="mt-2 opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100"
                style={{ color: meta.accent }}
                aria-hidden="true"
              />
            </button>
          </motion.div>
        ))}
      </div>

      {/* Back */}
      {onBack && (
        <div className="mt-6 flex justify-start">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-brand-primary)] focus-visible:outline-2 focus-visible:outline-[var(--color-brand-primary)]"
          >
            <ArrowLeft size={13} aria-hidden="true" />
            Paso anterior
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Result Field ─────────────────────────────────────────────────────────────

function ResultField({
  icon: Icon,
  label,
  value,
  accent = "var(--color-brand-primary)",
  subItems,
}: {
  icon: LucideIcon;
  label: string;
  value: string | null | undefined;
  accent?: string;
  subItems?: string[];
}) {
  if (!value && (!subItems || subItems.length === 0)) return null;

  return (
    <div className="rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)] p-4">
      <div className="mb-2.5 flex items-center gap-2">
        <Icon size={13} style={{ color: accent }} aria-hidden="true" />
        <span className="text-[10px] font-bold tracking-widest text-[var(--color-text-tertiary)] uppercase">
          {label}
        </span>
      </div>
      {value && (
        <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">{value}</p>
      )}
      {subItems && subItems.length > 0 && (
        <ul className={cn("space-y-1.5", value && "mt-2")}>
          {subItems.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-sm text-[var(--color-text-secondary)]"
            >
              <span
                className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ background: accent }}
                aria-hidden="true"
              />
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// ─── Confidence Badge ─────────────────────────────────────────────────────────

function ConfidenceBadge({ confidence }: { confidence: "alta" | "media" | "baja" }) {
  const config = {
    alta: {
      label: "Complejidad resuelta — Confianza Alta",
      bg: "rgba(0,255,133,0.12)",
      border: "rgba(0,255,133,0.3)",
      color: "var(--color-brand-accent)",
    },
    media: {
      label: "Complejidad media — Confianza Moderada",
      bg: "rgba(255,165,0,0.12)",
      border: "rgba(255,165,0,0.3)",
      color: "var(--color-brand-warning, #ffa500)",
    },
    baja: {
      label: "Contexto parcial — Diagnóstico preliminar",
      bg: "rgba(0,71,171,0.12)",
      border: "rgba(0,71,171,0.3)",
      color: "var(--color-brand-secondary)",
    },
  }[confidence];

  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold"
      style={{ background: config.bg, border: `1px solid ${config.border}`, color: config.color }}
    >
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{ background: config.color }}
        aria-hidden="true"
      />
      {config.label}
    </span>
  );
}

// ─── Reasoning Panel ──────────────────────────────────────────────────────────

function ReasoningPanel({
  whyProduct,
  whyProtocol,
  whyService,
  risksAvoided,
  benefitsGenerated,
}: {
  whyProduct: string;
  whyProtocol: string;
  whyService: string;
  risksAvoided: string[];
  benefitsGenerated: string[];
}) {
  const items = [
    {
      icon: FlaskConical,
      question: "¿Por qué este producto?",
      answer: whyProduct,
      accent: "var(--color-brand-primary)",
    },
    {
      icon: Cpu,
      question: "¿Por qué este protocolo?",
      answer: whyProtocol,
      accent: "var(--color-brand-primary)",
    },
    {
      icon: Wrench,
      question: "¿Por qué este servicio?",
      answer: whyService,
      accent: "var(--color-brand-accent)",
    },
  ];

  return (
    <div
      className="mt-4 overflow-hidden rounded-2xl border border-[rgba(0,196,255,0.15)] bg-[rgba(0,196,255,0.03)]"
      role="region"
      aria-label="Justificación técnica de la recomendación"
    >
      <div
        className="flex items-center gap-2 border-b border-[rgba(0,196,255,0.12)] px-6 py-3"
        style={{ background: "rgba(0,196,255,0.05)" }}
      >
        <Bot size={14} className="text-[var(--color-brand-primary)]" aria-hidden="true" />
        <span className="text-xs font-bold tracking-widest text-[var(--color-brand-primary)] uppercase">
          Explicación del Knowledge Engine
        </span>
      </div>

      <div className="grid gap-4 p-5 md:grid-cols-3">
        {items.map(({ icon: Icon, question, answer, accent }) => (
          <div key={question}>
            <div className="mb-2 flex items-center gap-1.5">
              <Icon size={12} style={{ color: accent }} aria-hidden="true" />
              <span className="text-[10px] font-bold tracking-wider text-[var(--color-text-tertiary)] uppercase">
                {question}
              </span>
            </div>
            <p className="text-xs leading-relaxed text-[var(--color-text-secondary)]">{answer}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 border-t border-[rgba(0,196,255,0.1)] px-5 py-4 md:grid-cols-2">
        <div>
          <div className="mb-2 flex items-center gap-1.5">
            <Shield
              size={12}
              className="text-[var(--color-brand-danger, #ff3b3b)]"
              aria-hidden="true"
            />
            <span className="text-[10px] font-bold tracking-wider text-[var(--color-text-tertiary)] uppercase">
              Riesgos que evita
            </span>
          </div>
          <ul className="space-y-1">
            {risksAvoided.map((risk, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-xs text-[var(--color-text-secondary)]"
              >
                <span
                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-brand-danger,#ff3b3b)]"
                  aria-hidden="true"
                />
                {risk}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="mb-2 flex items-center gap-1.5">
            <Leaf size={12} className="text-[var(--color-brand-accent)]" aria-hidden="true" />
            <span className="text-[10px] font-bold tracking-wider text-[var(--color-text-tertiary)] uppercase">
              Beneficios que genera
            </span>
          </div>
          <ul className="space-y-1">
            {benefitsGenerated.map((benefit, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-xs text-[var(--color-text-secondary)]"
              >
                <span
                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-brand-accent)]"
                  aria-hidden="true"
                />
                {benefit}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

// ─── Engineering Result Panel ─────────────────────────────────────────────────

function LabResultPanel({
  input,
  state,
  onReset,
}: {
  input: OviDecisionInput;
  state: LabState;
  onReset: () => void;
}) {
  const result = React.useMemo(() => generateResolvedRecommendation(input), [input]);

  const { primaryProduct, complementaryProducts, protocol, service, equipment } = result;

  const equipmentNames = equipment.map((eq) => eq.nombre);
  const complementaryNames = complementaryProducts.map((p) => p.nombre);

  // Derive time estimate: prefer protocol → product
  const timeEstimate =
    protocol?.tiempoEstimado ??
    primaryProduct?.tiempoAccion ??
    "A determinar según diagnóstico en sitio.";

  // Environmental impact from primary product
  const envImpact =
    primaryProduct && primaryProduct.impactoAmbiental.length > 0
      ? primaryProduct.impactoAmbiental
      : [
          "Formulaciones de bajo impacto ambiental. El ingeniero OVI definirá las métricas exactas en sitio.",
        ];

  // Warnings / safety
  const warnings =
    primaryProduct && primaryProduct.informacionSeguridad.length > 0
      ? primaryProduct.informacionSeguridad
      : null;

  return (
    <div>
      {/* Header */}
      <div className="mb-7 text-center">
        <p
          className="mb-3 text-xs font-semibold tracking-widest text-[var(--color-text-tertiary)] uppercase"
          aria-hidden="true"
        >
          — Diagnóstico de Ingeniería OVI —
        </p>
        <div className="mb-3 flex justify-center">
          <ConfidenceBadge confidence={result.confidence} />
        </div>
        <Heading as="h2" size="2xl" align="center">
          Solución Recomendada
        </Heading>
        <Text align="center" className="mx-auto mt-3 max-w-xl">
          El Knowledge Engine procesó su contexto operativo y construyó la solución técnica a
          continuación.
        </Text>
        <div className="mt-4 flex justify-center">
          <LabBreadcrumb state={state} />
        </div>
      </div>

      {/* Main result panel */}
      <div
        className="glass overflow-hidden rounded-2xl"
        style={{
          border: "1px solid rgba(0,196,255,0.2)",
          boxShadow: "0 0 40px rgba(0,196,255,0.06)",
        }}
        role="region"
        aria-label="Panel de diagnóstico técnico OVI"
      >
        {/* Panel top bar */}
        <div
          className="flex items-center justify-between border-b border-[var(--color-border-subtle)] px-6 py-4"
          style={{ background: "rgba(0,196,255,0.04)" }}
        >
          <div className="flex items-center gap-3">
            <Cpu size={15} className="text-[var(--color-brand-primary)]" aria-hidden="true" />
            <span className="text-xs font-bold tracking-widest text-[var(--color-text-primary)] uppercase">
              OVI Lab — Knowledge Engine
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span
              className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--color-brand-accent)]"
              aria-hidden="true"
            />
            <span className="text-[9px] font-bold tracking-widest text-[var(--color-brand-primary)] uppercase">
              Activo
            </span>
          </div>
        </div>

        {/* Main fields */}
        <div className="grid gap-4 p-5 md:grid-cols-2">
          <ResultField
            icon={AlertTriangle}
            label="Diagnóstico Técnico"
            value={result.diagnosis}
            accent="var(--color-brand-danger, #ff3b3b)"
          />
          <ResultField
            icon={Cpu}
            label="Justificación Técnica"
            value={result.technicalJustification}
            accent="var(--color-brand-primary)"
          />
          <ResultField
            icon={Wrench}
            label="Servicio Recomendado"
            value={service?.nombre ?? null}
            accent="var(--color-brand-accent)"
            subItems={service ? service.beneficios.slice(0, 3) : undefined}
          />
          <ResultField
            icon={Layers}
            label="Protocolo Recomendado"
            value={protocol ? `[${protocol.codigo}] ${protocol.nombre}` : null}
            accent="var(--color-brand-primary)"
            subItems={protocol?.pasos.slice(0, 3)}
          />
          <ResultField
            icon={FlaskConical}
            label="Producto Principal"
            value={primaryProduct?.nombre ?? null}
            accent="var(--color-brand-accent)"
            subItems={
              primaryProduct
                ? [
                    primaryProduct.resumen,
                    primaryProduct.dilucion ? `Dilución: ${primaryProduct.dilucion}` : null,
                  ].filter((s): s is string => s !== null && s !== "")
                : undefined
            }
          />
          {complementaryNames.length > 0 && (
            <ResultField
              icon={Sparkles}
              label="Productos Complementarios"
              value={null}
              accent="var(--color-brand-primary)"
              subItems={complementaryNames}
            />
          )}
          {equipmentNames.length > 0 && (
            <ResultField
              icon={Wrench}
              label="Equipos Recomendados"
              value={null}
              accent="var(--color-brand-secondary)"
              subItems={equipmentNames}
            />
          )}
          <ResultField
            icon={Clock}
            label="Tiempo Estimado"
            value={timeEstimate}
            accent="var(--color-brand-warning, #ffa500)"
          />
          <ResultField
            icon={Leaf}
            label="Impacto Ambiental"
            value={null}
            accent="var(--color-brand-accent)"
            subItems={envImpact}
          />
          {warnings && (
            <ResultField
              icon={Shield}
              label="Advertencias de Seguridad"
              value={null}
              accent="var(--color-brand-danger, #ff3b3b)"
              subItems={warnings}
            />
          )}
          <ResultField
            icon={Target}
            label="Beneficio Esperado"
            value={result.expectedBenefit}
            accent="var(--color-brand-accent)"
          />
        </div>
      </div>

      {/* Knowledge Engine Reasoning */}
      <ReasoningPanel {...result.reasoning} />

      {/* CTA strip */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <button
          onClick={onReset}
          className="flex items-center gap-2 rounded-lg border border-[var(--color-border-default)] bg-transparent px-5 py-2.5 text-sm font-medium text-[var(--color-text-secondary)] transition-all duration-200 hover:border-[var(--color-brand-primary)] hover:text-[var(--color-brand-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-primary)]"
          aria-label="Nueva consulta OVI Lab"
        >
          <RotateCcw size={13} aria-hidden="true" />
          Nueva consulta
        </button>
        <Link href="/contact">
          <span className="inline-flex h-10 items-center gap-2 rounded-lg bg-[var(--color-brand-primary)] px-6 text-sm font-medium text-[var(--color-text-inverse)] transition-all duration-200 hover:shadow-[var(--shadow-glow-primary)] hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-primary)] active:scale-[0.98]">
            Hablar con un Ingeniero OVI
            <ArrowRight size={13} aria-hidden="true" />
          </span>
        </Link>
      </div>
    </div>
  );
}

// ─── Main Workspace ───────────────────────────────────────────────────────────

export function OviLabWorkspace() {
  const prefersReducedMotion = useReducedMotion();
  const variants = prefersReducedMotion ? reducedPanelVariants : panelVariants;

  const [currentStepIndex, setCurrentStepIndex] = React.useState(0);
  const [state, setState] = React.useState<LabState>({
    industryId: null,
    assetType: null,
    zone: null,
    surfaceId: null,
    contaminationId: null,
    clientGoal: null,
  });
  const [completedSteps, setCompletedSteps] = React.useState<Set<LabStepId>>(new Set());

  const currentNodeId = LAB_STEP_NODES[currentStepIndex];
  const isResult = currentStepIndex >= LAB_STEP_NODES.length;
  const currentStepId: LabStepId = isResult ? "result" : currentNodeId;

  const handleSelect = (value: string) => {
    const nodeId = LAB_STEP_NODES[currentStepIndex];
    const meta = STEP_META[nodeId];

    setState((prev) => ({
      ...prev,
      [meta.field]: value,
    }));

    setCompletedSteps((prev) => new Set([...prev, nodeId]));
    setCurrentStepIndex((prev) => prev + 1);
  };

  const handleBack = () => {
    if (currentStepIndex === 0) return;
    setCurrentStepIndex((prev) => prev - 1);
  };

  const handleReset = () => {
    setState({
      industryId: null,
      assetType: null,
      zone: null,
      surfaceId: null,
      contaminationId: null,
      clientGoal: null,
    });
    setCompletedSteps(new Set());
    setCurrentStepIndex(0);
  };

  const decisionInput: OviDecisionInput = {
    industryId: state.industryId ?? undefined,
    assetType: state.assetType ?? undefined,
    zone: state.zone ?? undefined,
    surfaceId: state.surfaceId ?? undefined,
    contaminationId: state.contaminationId ?? undefined,
    clientGoal: state.clientGoal as OviDecisionInput["clientGoal"],
  };

  return (
    <div
      className="overflow-hidden rounded-3xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-surface)]"
      role="main"
      aria-label="OVI Lab — Centro de Ingeniería Digital"
    >
      {/* Top bar */}
      <div className="flex items-center justify-between border-b border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)] px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5" aria-hidden="true">
            <div className="h-3 w-3 rounded-full bg-[rgba(255,255,255,0.08)]" />
            <div className="h-3 w-3 rounded-full bg-[rgba(255,255,255,0.08)]" />
            <div className="h-3 w-3 rounded-full bg-[rgba(255,255,255,0.08)]" />
          </div>
          <span className="text-xs font-semibold tracking-widest text-[var(--color-text-tertiary)] uppercase">
            OVI Lab — Centro de Ingeniería Digital
          </span>
        </div>
        <div
          className="flex items-center gap-1.5 rounded-full bg-[rgba(0,196,255,0.08)] px-3 py-1"
          aria-label="Knowledge Engine: activo"
        >
          <span
            className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--color-brand-accent)]"
            aria-hidden="true"
          />
          <span className="text-[10px] font-semibold tracking-widest text-[var(--color-brand-primary)] uppercase">
            Knowledge Engine
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 md:p-8">
        <StepIndicator currentStep={currentStepId} completedSteps={completedSteps} />

        <AnimatePresence mode="wait">
          {!isResult &&
            LAB_STEP_NODES.map((nodeId, index) => {
              if (index !== currentStepIndex) return null;
              return (
                <motion.div
                  key={nodeId}
                  variants={variants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <OptionSelectionStep
                    nodeId={nodeId}
                    state={state}
                    onSelect={handleSelect}
                    onBack={currentStepIndex > 0 ? handleBack : () => {}}
                  />
                </motion.div>
              );
            })}

          {isResult && (
            <motion.div
              key="result"
              variants={variants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <LabResultPanel input={decisionInput} state={state} onReset={handleReset} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
