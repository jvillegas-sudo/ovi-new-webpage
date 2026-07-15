"use client";

/**
 * JourneyContinuityPanel — Work Order 013
 *
 * Shows the user's accumulated journey context inside OVI OS.
 * Rendered when a previous Lab / AI / Store session exists in the Experience Context.
 * Provides contextual CTAs to continue the journey from where they left off.
 */

import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, FlaskConical, Sparkles, Stethoscope } from "lucide-react";
import { useExperienceContextStore } from "@store/experience-context.store";
import { cn } from "@utils/cn";

const SCENE_LABELS: Record<string, string> = {
  lab: "OVI Lab",
  "ovi-ai": "OVI AI",
  store: "OVI Store",
};

const NEXT_STEP_HREFS: Record<string, string> = {
  "ovi-ai": "/ovi-ai",
  "store/soluciones": "/store/soluciones",
  contact: "/contact",
};

const NEXT_STEP_LABELS: Record<string, string> = {
  "ovi-ai": "Continuar con OVI AI",
  "store/soluciones": "Ver soluciones",
  contact: "Solicitar Ingeniero OVI",
};

export function JourneyContinuityPanel() {
  const ctx = useExperienceContextStore();

  if (!ctx.lastUpdated) return null;

  const sceneLabel = ctx.sceneOrigin ? (SCENE_LABELS[ctx.sceneOrigin] ?? ctx.sceneOrigin) : null;
  const nextHref = ctx.nextStep ? (NEXT_STEP_HREFS[ctx.nextStep] ?? "/contact") : "/contact";
  const nextLabel = ctx.nextStep ? (NEXT_STEP_LABELS[ctx.nextStep] ?? "Continuar") : "Continuar";

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-[rgba(0,196,255,0.22)]",
        "bg-[rgba(0,196,255,0.04)] p-6",
      )}
      role="region"
      aria-label="Recorrido activo"
    >
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span
              className="h-2 w-2 animate-pulse rounded-full bg-[var(--color-brand-accent)]"
              aria-hidden="true"
            />
            <span className="text-xs font-bold tracking-[0.2em] text-[var(--color-brand-accent)] uppercase">
              Recorrido activo
            </span>
            {sceneLabel && (
              <span className="rounded-full border border-[rgba(0,196,255,0.25)] bg-[rgba(0,196,255,0.08)] px-2 py-0.5 text-[10px] font-semibold tracking-wide text-[var(--color-brand-primary)]">
                Último módulo: {sceneLabel}
              </span>
            )}
          </div>
          <h3 className="mt-3 text-xl font-semibold">
            {ctx.diagnosis ?? "Diagnóstico en progreso"}
          </h3>
          {ctx.technicalJustification && (
            <p className="mt-2 max-w-2xl text-sm text-[var(--color-text-secondary)]">
              {ctx.technicalJustification}
            </p>
          )}
        </div>

        <Link
          href={nextHref}
          className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-[var(--color-brand-primary)] px-5 py-2.5 text-sm font-semibold text-[var(--color-text-inverse)] transition-all hover:shadow-[var(--shadow-glow-primary)] hover:brightness-110"
        >
          {nextLabel}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>

      {/* Context chips */}
      <div className="mt-5 flex flex-wrap gap-2">
        {ctx.industryId && (
          <Chip icon={<Stethoscope size={11} />} label={ctx.industryId.replace(/-/g, " ")} />
        )}
        {ctx.contaminationId && (
          <Chip icon={<FlaskConical size={11} />} label={ctx.contaminationId.replace(/-/g, " ")} />
        )}
        {ctx.contaminationLevel && <Chip label={`Nivel ${ctx.contaminationLevel}`} />}
        {ctx.primaryProductName && (
          <Chip icon={<Sparkles size={11} />} label={ctx.primaryProductName} accent />
        )}
        {ctx.serviceName && <Chip label={ctx.serviceName} />}
      </div>

      {/* Next steps */}
      {(ctx.expectedBenefit || ctx.protocolName) && (
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {ctx.expectedBenefit && (
            <div className="rounded-xl border border-[rgba(0,255,133,0.18)] bg-[rgba(0,255,133,0.04)] p-3">
              <p className="text-[10px] font-bold tracking-widest text-[var(--color-brand-accent)] uppercase">
                Beneficio esperado
              </p>
              <p className="mt-1.5 text-xs text-[var(--color-text-secondary)]">
                {ctx.expectedBenefit}
              </p>
            </div>
          )}
          {ctx.protocolName && (
            <div className="rounded-xl border border-[rgba(0,196,255,0.15)] bg-[rgba(0,196,255,0.04)] p-3">
              <p className="text-[10px] font-bold tracking-widest text-[var(--color-brand-primary)] uppercase">
                Protocolo
              </p>
              <p className="mt-1.5 text-xs text-[var(--color-text-secondary)]">
                {ctx.protocolName}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Secondary CTAs */}
      <div className="mt-5 flex flex-wrap gap-2 border-t border-[rgba(255,255,255,0.06)] pt-5">
        <p className="w-full text-[10px] font-semibold tracking-widest text-[var(--color-text-tertiary)] uppercase">
          Continuar recorrido
        </p>
        <Link
          href="/solution-lab"
          className="inline-flex items-center gap-1.5 rounded-full border border-[rgba(0,196,255,0.2)] bg-transparent px-3 py-1.5 text-xs font-medium text-[var(--color-text-secondary)] transition-all hover:border-[rgba(0,196,255,0.45)] hover:text-[var(--color-brand-primary)]"
        >
          <FlaskConical size={11} aria-hidden="true" />
          OVI Lab
        </Link>
        <Link
          href="/store/soluciones"
          className="inline-flex items-center gap-1.5 rounded-full border border-[rgba(0,196,255,0.2)] bg-transparent px-3 py-1.5 text-xs font-medium text-[var(--color-text-secondary)] transition-all hover:border-[rgba(0,196,255,0.45)] hover:text-[var(--color-brand-primary)]"
        >
          <Sparkles size={11} aria-hidden="true" />
          Ver soluciones
        </Link>
        <Link
          href="/contact"
          className="inline-flex items-center gap-1.5 rounded-full border border-[rgba(0,196,255,0.2)] bg-transparent px-3 py-1.5 text-xs font-medium text-[var(--color-text-secondary)] transition-all hover:border-[rgba(0,196,255,0.45)] hover:text-[var(--color-brand-primary)]"
        >
          Solicitar visita técnica
        </Link>
      </div>
    </div>
  );
}

function Chip({ icon, label, accent }: { icon?: ReactNode; label: string; accent?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium capitalize",
        accent
          ? "border-[rgba(0,255,133,0.25)] bg-[rgba(0,255,133,0.08)] text-[var(--color-brand-accent)]"
          : "border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.04)] text-[var(--color-text-secondary)]",
      )}
    >
      {icon}
      {label}
    </span>
  );
}
