"use client";

/**
 * OVI AI — Holographic Companion
 * Work Order 006
 *
 * Persistent holographic companion that conducts step-by-step cleaning
 * engineering diagnostics and delivers Knowledge Engine recommendations.
 *
 * NOT a chatbot. NOT a generic AI. NOT a product recommender.
 * OVI AI is a Digital Cleaning Engineer — precise, professional, consultive.
 *
 * Diagnostic flow:
 *   Industria → Activo → Zona → Material → Tipo de suciedad →
 *   Nivel → Objetivo → Restricciones → Knowledge Engine → Diagnóstico
 *
 * Visual identity (preserved from WO-004):
 *   - Energy orb: pulsing radial-gradient sphere with animated rings
 *   - Holographic panel: corner brackets, scan line, mono-font readouts
 *   - Conversational message bubbles replace the single-query input
 *
 * Future extension hooks:
 *   - Voice input: connect to extractContextFromTranscript()
 *   - Image analysis: connect to extractContextFromImageAnalysis()
 *   - Document upload: connect to extractContextFromDocument()
 *   - Multi-language: pass locale to buildMessageFromNode()
 */

import { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  X,
  RotateCcw,
  ArrowRight,
  ChevronRight,
  Send,
  FlaskConical,
  Wrench,
  Phone,
} from "lucide-react";
import { cn } from "@utils/cn";
import { useOviAiStore } from "@store/ovi-ai.store";
import {
  OVI_GREETING,
  OVI_INTEGRATION_LINKS,
  ANALYSIS_STAGES,
  buildGreetingWithFirstQuestion,
  buildNextQuestionMessage,
  hasSufficientContext,
  computeRecommendation,
  extractContextFromText,
  confidenceToComplexity,
  type OviChatMessage,
  type OviChatOption,
  type OviDecisionInput,
  type OviRecommendation,
} from "@features/ovi-ai/ovi-ai-engine";
import { getProduct, getProtocol, getService } from "@knowledge";

// ─── Energy Orb ───────────────────────────────────────────────────────────────

function EnergyOrb({
  isOpen,
  isAnalyzing,
  hasMessages,
  onClick,
}: {
  isOpen: boolean;
  isAnalyzing: boolean;
  hasMessages: boolean;
  onClick: () => void;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <button
      onClick={onClick}
      aria-label={isOpen ? "Cerrar OVI AI" : "Abrir OVI AI — Ingeniero Digital"}
      aria-expanded={isOpen}
      className="relative flex h-[52px] w-[52px] items-center justify-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-primary)]"
    >
      {/* Outer pulse rings */}
      {!isOpen && !prefersReducedMotion && (
        <>
          <motion.span
            className="pointer-events-none absolute h-full w-full rounded-full"
            style={{ border: "1px solid rgba(0,196,255,0.25)" }}
            animate={{
              scale: isAnalyzing ? [1, 1.8, 1] : [1, 1.4, 1],
              opacity: [0.6, 0, 0.6],
            }}
            transition={{
              duration: isAnalyzing ? 0.9 : 2.8,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
          <motion.span
            className="pointer-events-none absolute h-full w-full rounded-full"
            style={{ border: "1px solid rgba(0,255,133,0.18)" }}
            animate={{
              scale: isAnalyzing ? [1, 2.4, 1] : [1, 1.85, 1],
              opacity: [0.4, 0, 0.4],
            }}
            transition={{
              duration: isAnalyzing ? 0.9 : 2.8,
              delay: isAnalyzing ? 0.3 : 1.4,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
        </>
      )}

      {/* Core sphere */}
      <motion.span
        className="relative flex h-full w-full items-center justify-center rounded-full"
        style={{
          background: isAnalyzing
            ? "radial-gradient(circle at 40% 40%, rgba(0,255,133,0.55) 0%, rgba(0,196,255,0.45) 40%, rgba(0,71,171,0.5) 75%, rgba(2,4,8,0.9) 100%)"
            : "radial-gradient(circle at 40% 40%, rgba(0,196,255,0.55) 0%, rgba(0,71,171,0.5) 50%, rgba(2,4,8,0.9) 100%)",
          border: isAnalyzing ? "1px solid rgba(0,255,133,0.45)" : "1px solid rgba(0,196,255,0.38)",
          boxShadow: isAnalyzing
            ? "0 0 18px rgba(0,255,133,0.35), 0 0 6px rgba(0,196,255,0.2)"
            : "0 0 14px rgba(0,196,255,0.3), 0 0 4px rgba(0,196,255,0.15)",
        }}
        animate={
          prefersReducedMotion
            ? {}
            : {
                boxShadow: isAnalyzing
                  ? [
                      "0 0 18px rgba(0,255,133,0.35), 0 0 6px rgba(0,196,255,0.2)",
                      "0 0 28px rgba(0,255,133,0.55), 0 0 10px rgba(0,196,255,0.35)",
                      "0 0 18px rgba(0,255,133,0.35), 0 0 6px rgba(0,196,255,0.2)",
                    ]
                  : [
                      "0 0 14px rgba(0,196,255,0.3), 0 0 4px rgba(0,196,255,0.15)",
                      "0 0 22px rgba(0,196,255,0.45), 0 0 7px rgba(0,196,255,0.25)",
                      "0 0 14px rgba(0,196,255,0.3), 0 0 4px rgba(0,196,255,0.15)",
                    ],
              }
        }
        transition={{
          duration: isAnalyzing ? 0.9 : 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* OVI wave glyph */}
        <svg
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
          aria-hidden="true"
          className={cn("transition-opacity duration-300", isOpen ? "opacity-0" : "opacity-100")}
        >
          <path
            d="M3 11 C5 7, 7 15, 9 11 C11 7, 13 15, 15 11 C17 7, 19 15, 21 11"
            stroke="rgba(255,255,255,0.9)"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
          />
        </svg>

        {/* Close glyph */}
        <X
          size={16}
          className={cn(
            "absolute text-white transition-opacity duration-300",
            isOpen ? "opacity-90" : "opacity-0",
          )}
          aria-hidden="true"
        />
      </motion.span>

      {/* Session active dot */}
      {hasMessages && !isOpen && (
        <span
          className="absolute top-0.5 right-0.5 h-2.5 w-2.5 rounded-full"
          style={{
            background: "var(--color-brand-accent)",
            boxShadow: "0 0 6px rgba(0,255,133,0.7)",
          }}
          aria-hidden="true"
        />
      )}
    </button>
  );
}

// ─── Scan line ────────────────────────────────────────────────────────────────

function ScanLine({ active }: { active: boolean }) {
  const prefersReducedMotion = useReducedMotion();
  if (prefersReducedMotion || !active) return null;
  return (
    <motion.div
      className="pointer-events-none absolute inset-x-0 h-px"
      style={{
        background: "linear-gradient(to right, transparent, rgba(0,196,255,0.55), transparent)",
      }}
      animate={{ top: ["0%", "100%", "0%"] }}
      transition={{ duration: 4.5, repeat: Infinity, ease: "linear" }}
      aria-hidden="true"
    />
  );
}

// ─── Analyzing view ───────────────────────────────────────────────────────────

function AnalyzingView({ stage }: { stage: string }) {
  const prefersReducedMotion = useReducedMotion();
  const RINGS = [0, 1, 2, 3];

  return (
    <div className="flex flex-col items-center gap-5 py-6" role="status" aria-live="polite">
      <div className="relative flex h-20 w-20 items-center justify-center" aria-hidden="true">
        {RINGS.map((i) => (
          <motion.span
            key={i}
            className="absolute rounded-full"
            style={{
              border: `1px solid ${i % 2 === 0 ? "rgba(0,196,255,0.5)" : "rgba(0,255,133,0.4)"}`,
            }}
            animate={
              prefersReducedMotion
                ? {}
                : {
                    width: ["20%", "100%"],
                    height: ["20%", "100%"],
                    opacity: [0.8, 0],
                  }
            }
            transition={{
              duration: 1.6,
              delay: i * 0.4,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
        ))}
        <motion.span
          className="h-3 w-3 rounded-full"
          style={{ background: "var(--color-brand-primary)" }}
          animate={prefersReducedMotion ? {} : { scale: [1, 1.35, 1] }}
          transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="text-center">
        <p className="font-mono text-[9px] tracking-[0.22em] text-[var(--color-brand-accent)] uppercase">
          OVI AI · CONSULTANDO KNOWLEDGE ENGINE
        </p>
        <AnimatePresence mode="wait">
          <motion.p
            key={stage}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.3 }}
            className="mt-1.5 font-mono text-xs text-[var(--color-brand-primary)]"
          >
            {stage}
          </motion.p>
        </AnimatePresence>
      </div>

      <div
        className="h-0.5 w-40 overflow-hidden rounded-full bg-[var(--color-border-subtle)]"
        role="progressbar"
        aria-label="Progreso del análisis"
      >
        <motion.div
          className="h-full bg-gradient-to-r from-[var(--color-brand-secondary)] to-[var(--color-brand-primary)]"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 2.8, ease: "linear" }}
        />
      </div>
    </div>
  );
}

// ─── Message bubble ───────────────────────────────────────────────────────────

function MessageBubble({
  message,
  onSelectOption,
  isLatest,
}: {
  message: OviChatMessage;
  onSelectOption?: (option: OviChatOption) => void;
  isLatest: boolean;
}) {
  const isAssistant = message.role === "assistant";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className={cn("flex", isAssistant ? "justify-start" : "justify-end")}
    >
      <div className={cn("max-w-[88%]", isAssistant ? "" : "")}>
        {/* Bubble */}
        <div
          className={cn(
            "rounded-xl px-3 py-2.5 text-xs leading-relaxed",
            isAssistant
              ? "rounded-tl-sm border border-[rgba(0,196,255,0.14)] bg-[rgba(0,196,255,0.07)] text-[var(--color-text-primary)]"
              : "rounded-tr-sm border border-[rgba(0,71,171,0.4)] bg-[rgba(0,71,171,0.35)] text-[var(--color-text-primary)]",
          )}
        >
          {message.content.split("\n").map((line, i) => (
            <span key={i}>
              {line}
              {i < message.content.split("\n").length - 1 && <br />}
            </span>
          ))}
        </div>

        {/* Quick-select options — only on latest assistant message */}
        {isAssistant && message.options && isLatest && onSelectOption && (
          <div
            className="mt-2 flex flex-wrap gap-1.5"
            role="group"
            aria-label="Opciones de respuesta"
          >
            {message.options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => onSelectOption(opt)}
                title={opt.hint}
                className={cn(
                  "rounded-full border px-2.5 py-1",
                  "font-mono text-[10px] tracking-[0.06em] text-[var(--color-text-secondary)]",
                  "border-[rgba(0,196,255,0.2)] bg-[rgba(0,196,255,0.04)]",
                  "transition-all duration-200",
                  "hover:border-[rgba(0,196,255,0.45)] hover:bg-[rgba(0,196,255,0.1)] hover:text-[var(--color-text-primary)]",
                  "focus-visible:outline-2 focus-visible:outline-[var(--color-brand-primary)]",
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ─── Recommendation readout ───────────────────────────────────────────────────

function RecommendationReadout({
  recommendation,
  onReset,
}: {
  recommendation: OviRecommendation;
  onReset: () => void;
}) {
  const product = recommendation.primaryProductId
    ? getProduct(recommendation.primaryProductId)
    : null;
  const protocol = recommendation.protocolId ? getProtocol(recommendation.protocolId) : null;
  const service = recommendation.serviceId ? getService(recommendation.serviceId) : null;

  const complementaryProducts = recommendation.complementaryProductIds
    .slice(0, 2)
    .map((id) => getProduct(id))
    .filter(Boolean);

  const complexity = confidenceToComplexity(
    recommendation.confidence,
    recommendation.input.contaminationLevel,
  );

  const COMPLEXITY_COLOR: Record<typeof complexity, string> = {
    Bajo: "rgba(0,255,133,0.8)",
    Medio: "rgba(0,196,255,0.8)",
    Alto: "rgba(255,165,0,0.85)",
    Crítico: "rgba(255,59,59,0.85)",
  };

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="font-mono text-[9px] tracking-[0.22em] text-[var(--color-brand-primary)] uppercase">
          DIAGNÓSTICO · OVI AI
        </span>
        <button
          onClick={onReset}
          className={cn(
            "flex items-center gap-1 rounded px-2 py-1",
            "font-mono text-[9px] tracking-[0.12em] text-[var(--color-text-tertiary)] uppercase",
            "transition-colors hover:text-[var(--color-text-primary)]",
            "focus-visible:outline-2 focus-visible:outline-[var(--color-brand-primary)]",
          )}
          aria-label="Nuevo diagnóstico"
        >
          <RotateCcw size={10} aria-hidden="true" />
          Nuevo diagnóstico
        </button>
      </div>

      {/* Complexity badge */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="rounded-md border border-[rgba(0,196,255,0.15)] bg-[rgba(0,196,255,0.04)] px-3 py-2.5"
      >
        <div className="flex items-center justify-between">
          <p className="font-mono text-[8px] tracking-[0.18em] text-[var(--color-text-tertiary)] uppercase">
            Nivel de complejidad
          </p>
          <span
            className="font-mono text-[10px] font-semibold"
            style={{ color: COMPLEXITY_COLOR[complexity] }}
          >
            {complexity}
          </span>
        </div>
        {recommendation.input.industryId && (
          <p className="mt-1 text-[10px] font-medium text-[var(--color-text-primary)] capitalize">
            {recommendation.input.industryId.replace(/-/g, " ")}
          </p>
        )}
      </motion.div>

      {/* Diagnosis */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <p className="mb-1 font-mono text-[8px] tracking-[0.18em] text-[var(--color-text-tertiary)] uppercase">
          Diagnóstico
        </p>
        <p className="text-[11px] leading-relaxed text-[var(--color-text-secondary)]">
          {recommendation.diagnosis}
        </p>
      </motion.div>

      {/* Technical justification */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.14 }}
      >
        <p className="mb-1 font-mono text-[8px] tracking-[0.18em] text-[var(--color-text-tertiary)] uppercase">
          Justificación técnica
        </p>
        <p className="text-[11px] leading-relaxed text-[var(--color-text-secondary)]">
          {recommendation.technicalJustification}
        </p>
      </motion.div>

      {/* Protocol */}
      {protocol && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18 }}
        >
          <p className="mb-1 font-mono text-[8px] tracking-[0.18em] text-[var(--color-text-tertiary)] uppercase">
            Protocolo recomendado
          </p>
          <div className="flex items-start gap-2 rounded-md border border-[rgba(0,196,255,0.15)] bg-[rgba(0,196,255,0.04)] px-3 py-2">
            <ChevronRight
              size={10}
              className="mt-0.5 shrink-0 text-[var(--color-brand-primary)]"
              aria-hidden="true"
            />
            <span className="font-mono text-[10px] leading-relaxed text-[var(--color-text-primary)]">
              {protocol.codigo} — {protocol.nombre}
            </span>
          </div>
        </motion.div>
      )}

      {/* Service */}
      {service && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22 }}
        >
          <p className="mb-1 font-mono text-[8px] tracking-[0.18em] text-[var(--color-text-tertiary)] uppercase">
            Servicio recomendado
          </p>
          <p className="text-[11px] leading-relaxed text-[var(--color-text-secondary)]">
            {service.nombre}
          </p>
        </motion.div>
      )}

      {/* Primary product */}
      {product && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.26 }}
        >
          <p className="mb-1 font-mono text-[8px] tracking-[0.18em] text-[var(--color-text-tertiary)] uppercase">
            Producto principal
          </p>
          <div className="rounded-md border border-[rgba(0,255,133,0.2)] bg-[rgba(0,255,133,0.04)] px-3 py-2">
            <p className="text-[11px] font-medium text-[var(--color-text-primary)]">
              {product.nombre}
            </p>
            <p className="mt-0.5 text-[10px] text-[var(--color-text-tertiary)]">
              {product.resumen}
            </p>
          </div>
        </motion.div>
      )}

      {/* Complementary products */}
      {complementaryProducts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <p className="mb-1.5 font-mono text-[8px] tracking-[0.18em] text-[var(--color-text-tertiary)] uppercase">
            Productos complementarios
          </p>
          <ul className="space-y-1">
            {complementaryProducts.map(
              (p) =>
                p && (
                  <li key={p.id} className="flex items-start gap-2">
                    <ChevronRight
                      size={10}
                      className="mt-0.5 shrink-0 text-[var(--color-brand-accent)]"
                      aria-hidden="true"
                    />
                    <span className="text-[10px] text-[var(--color-text-secondary)]">
                      {p.nombre}
                    </span>
                  </li>
                ),
            )}
          </ul>
        </motion.div>
      )}

      {/* Expected benefit */}
      {recommendation.expectedBenefit && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.34 }}
        >
          <p className="mb-1 font-mono text-[8px] tracking-[0.18em] text-[var(--color-text-tertiary)] uppercase">
            Beneficio esperado
          </p>
          <div className="flex items-start gap-2 rounded-md border border-[rgba(0,255,133,0.2)] bg-[rgba(0,255,133,0.04)] px-3 py-2">
            <ArrowRight
              size={10}
              className="mt-0.5 shrink-0 text-[var(--color-brand-accent)]"
              aria-hidden="true"
            />
            <span className="text-[11px] leading-relaxed text-[var(--color-text-primary)]">
              {recommendation.expectedBenefit}
            </span>
          </div>
        </motion.div>
      )}

      {/* Risks avoided (warnings) */}
      {recommendation.reasoning.risksAvoided.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.38 }}
        >
          <p className="mb-1.5 font-mono text-[8px] tracking-[0.18em] text-[var(--color-text-tertiary)] uppercase">
            Advertencias
          </p>
          <ul className="space-y-1">
            {recommendation.reasoning.risksAvoided.map((risk) => (
              <li key={risk} className="flex items-start gap-1.5">
                <span
                  className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ background: "rgba(255,165,0,0.8)" }}
                  aria-hidden="true"
                />
                <span className="text-[10px] leading-relaxed text-[var(--color-text-secondary)]">
                  {risk}
                </span>
              </li>
            ))}
          </ul>
        </motion.div>
      )}

      {/* Integration CTAs */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.45 }}
        className="border-t border-[rgba(255,255,255,0.06)] pt-3"
      >
        <p className="mb-2 font-mono text-[8px] tracking-[0.18em] text-[var(--color-text-tertiary)] uppercase">
          Continuar con OVI
        </p>
        <div className="flex flex-wrap gap-1.5">
          <Link href={OVI_INTEGRATION_LINKS.technicalVisit}>
            <button
              className={cn(
                "flex items-center gap-1.5 rounded-full border px-2.5 py-1",
                "font-mono text-[9px] tracking-[0.06em] text-[var(--color-brand-primary)]",
                "border-[rgba(0,196,255,0.3)] bg-[rgba(0,196,255,0.06)]",
                "transition-all hover:border-[rgba(0,196,255,0.5)] hover:bg-[rgba(0,196,255,0.1)]",
                "focus-visible:outline-2 focus-visible:outline-[var(--color-brand-primary)]",
              )}
            >
              <Wrench size={9} aria-hidden="true" />
              Visita técnica
            </button>
          </Link>
          <Link href={OVI_INTEGRATION_LINKS.lab}>
            <button
              className={cn(
                "flex items-center gap-1.5 rounded-full border px-2.5 py-1",
                "font-mono text-[9px] tracking-[0.06em] text-[var(--color-text-secondary)]",
                "border-[rgba(255,255,255,0.1)] bg-transparent",
                "transition-all hover:border-[rgba(255,255,255,0.2)] hover:text-[var(--color-text-primary)]",
                "focus-visible:outline-2 focus-visible:outline-[var(--color-brand-primary)]",
              )}
            >
              <FlaskConical size={9} aria-hidden="true" />
              OVI Lab
            </button>
          </Link>
          <Link href={OVI_INTEGRATION_LINKS.store}>
            <button
              className={cn(
                "flex items-center gap-1.5 rounded-full border px-2.5 py-1",
                "font-mono text-[9px] tracking-[0.06em] text-[var(--color-text-secondary)]",
                "border-[rgba(255,255,255,0.1)] bg-transparent",
                "transition-all hover:border-[rgba(255,255,255,0.2)] hover:text-[var(--color-text-primary)]",
                "focus-visible:outline-2 focus-visible:outline-[var(--color-brand-primary)]",
              )}
            >
              OVI Catálogo
            </button>
          </Link>
          <Link href={OVI_INTEGRATION_LINKS.engineer}>
            <button
              className={cn(
                "flex items-center gap-1.5 rounded-full border px-2.5 py-1",
                "font-mono text-[9px] tracking-[0.06em] text-[var(--color-text-secondary)]",
                "border-[rgba(255,255,255,0.1)] bg-transparent",
                "transition-all hover:border-[rgba(255,255,255,0.2)] hover:text-[var(--color-text-primary)]",
                "focus-visible:outline-2 focus-visible:outline-[var(--color-brand-primary)]",
              )}
            >
              <Phone size={9} aria-hidden="true" />
              Ingeniero OVI
            </button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Holographic panel ────────────────────────────────────────────────────────

function HolographicPanel({
  session,
  analysisState,
  analysisStage,
  onClose,
  onReset,
  onSelectOption,
  onSubmitText,
  onGenerateDiagnostic,
}: {
  session: ReturnType<typeof useOviAiStore>["session"];
  analysisState: "idle" | "analyzing" | "done";
  analysisStage: string;
  onClose: () => void;
  onReset: () => void;
  onSelectOption: (option: OviChatOption) => void;
  onSubmitText: (text: string) => void;
  onGenerateDiagnostic: () => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [inputValue, setInputValue] = useState("");

  const isAnalyzing = analysisState === "analyzing";
  const isDone = session.diagnosticPhase === "done";
  const isDiagnosing = session.diagnosticPhase === "diagnosing";
  const canGenerate = hasSufficientContext(session.diagnosticContext) && !isDone && !isAnalyzing;

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [session.messages]);

  // Focus input when returning to diagnosing
  useEffect(() => {
    if (isAnalyzing || !isDiagnosing) return;
    const id = window.setTimeout(() => inputRef.current?.focus(), 120);
    return () => window.clearTimeout(id);
  }, [isAnalyzing, isDiagnosing]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = inputValue.trim();
    if (!trimmed || isAnalyzing) return;
    onSubmitText(trimmed);
    setInputValue("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "relative overflow-hidden rounded-xl",
        "border border-[rgba(0,196,255,0.22)]",
        "bg-[rgba(3,6,14,0.96)] backdrop-blur-xl",
      )}
      style={{
        boxShadow:
          "0 0 0 1px rgba(0,196,255,0.08), 0 8px 40px rgba(0,0,0,0.65), 0 0 60px rgba(0,196,255,0.06)",
      }}
      role="dialog"
      aria-label="OVI AI — Ingeniero Digital"
      aria-modal="false"
    >
      {/* Corner brackets */}
      <div
        className="pointer-events-none absolute top-0 left-0 h-4 w-4 border-t-2 border-l-2 border-[var(--color-brand-primary)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-0 right-0 h-4 w-4 border-t-2 border-r-2 border-[var(--color-brand-primary)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 h-4 w-4 border-b-2 border-l-2 border-[rgba(0,196,255,0.4)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute right-0 bottom-0 h-4 w-4 border-r-2 border-b-2 border-[rgba(0,196,255,0.4)]"
        aria-hidden="true"
      />

      {/* Animated scan line */}
      <ScanLine active={!isAnalyzing} />

      {/* Panel header */}
      <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.06)] px-4 py-3">
        <div className="flex items-center gap-2">
          <motion.span
            className="h-1.5 w-1.5 rounded-full"
            style={{
              background: isAnalyzing ? "var(--color-brand-accent)" : "var(--color-brand-primary)",
            }}
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden="true"
          />
          <span className="font-mono text-[9px] tracking-[0.22em] text-[var(--color-brand-primary)] uppercase">
            OVI AI · INGENIERO DIGITAL
          </span>
        </div>
        <button
          onClick={onClose}
          className={cn(
            "rounded p-1 text-[var(--color-text-tertiary)]",
            "transition-colors hover:text-[var(--color-text-primary)]",
            "focus-visible:outline-2 focus-visible:outline-[var(--color-brand-primary)]",
          )}
          aria-label="Cerrar OVI AI"
        >
          <X size={13} aria-hidden="true" />
        </button>
      </div>

      {/* Session context strip */}
      {session.industry && (
        <div className="flex items-center gap-2 border-b border-[rgba(255,255,255,0.04)] bg-[rgba(0,196,255,0.04)] px-4 py-2">
          <span className="font-mono text-[8px] tracking-[0.14em] text-[var(--color-text-tertiary)] uppercase">
            Sesión:
          </span>
          <span className="rounded-full border border-[rgba(0,196,255,0.25)] px-2 py-0.5">
            <span className="font-mono text-[9px] tracking-[0.1em] text-[var(--color-brand-primary)] capitalize">
              {session.industry.replace(/-/g, " ")}
            </span>
          </span>
          {session.diagnosticContext.contaminationId && (
            <span className="rounded-full border border-[rgba(0,196,255,0.15)] px-2 py-0.5">
              <span className="font-mono text-[9px] tracking-[0.08em] text-[var(--color-text-secondary)] capitalize">
                {session.diagnosticContext.contaminationId.replace(/-/g, " ")}
              </span>
            </span>
          )}
        </div>
      )}

      {/* Scrollable content */}
      <div className="max-h-[360px] overflow-y-auto overscroll-contain px-4 py-4">
        <AnimatePresence mode="wait">
          {isAnalyzing ? (
            <motion.div
              key="analyzing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <AnalyzingView stage={analysisStage} />
            </motion.div>
          ) : isDone && session.recommendation ? (
            <motion.div
              key="recommendation"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <RecommendationReadout recommendation={session.recommendation} onReset={onReset} />
            </motion.div>
          ) : (
            <motion.div
              key="conversation"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="space-y-3"
              aria-live="polite"
              aria-label="Conversación con OVI AI"
            >
              {(session.messages as OviChatMessage[]).map((msg: OviChatMessage, idx: number) => (
                <MessageBubble
                  key={msg.id}
                  message={msg}
                  onSelectOption={onSelectOption}
                  isLatest={idx === session.messages.length - 1}
                />
              ))}
              <div ref={messagesEndRef} />

              {/* Generate diagnostic button — appears when sufficient context */}
              {canGenerate && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="pt-1"
                >
                  <button
                    onClick={onGenerateDiagnostic}
                    className={cn(
                      "flex w-full items-center justify-center gap-2 rounded-lg py-2.5",
                      "font-mono text-[10px] tracking-[0.14em] uppercase",
                      "border border-[rgba(0,196,255,0.3)] bg-[rgba(0,196,255,0.12)]",
                      "text-[var(--color-brand-primary)]",
                      "transition-all hover:border-[rgba(0,196,255,0.5)] hover:bg-[rgba(0,196,255,0.2)]",
                      "focus-visible:outline-2 focus-visible:outline-[var(--color-brand-primary)]",
                    )}
                  >
                    <ArrowRight size={12} aria-hidden="true" />
                    Generar diagnóstico de ingeniería
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Text input — hidden during analysis and done states */}
      {!isAnalyzing && !isDone && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.25 }}
            className="border-t border-[rgba(255,255,255,0.06)] px-4 py-3"
          >
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <span
                className="font-mono text-xs text-[var(--color-brand-primary)]"
                aria-hidden="true"
              >
                &gt;
              </span>
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Describa el desafío o seleccione una opción..."
                className={cn(
                  "min-w-0 flex-1 bg-transparent font-mono text-xs",
                  "text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)]",
                  "outline-none focus:placeholder:opacity-0",
                )}
                aria-label="Mensaje para OVI AI"
              />
              {inputValue.trim() && (
                <button
                  type="submit"
                  className="flex items-center justify-center rounded p-1 text-[var(--color-brand-primary)] transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-[var(--color-brand-primary)]"
                  aria-label="Enviar"
                >
                  <Send size={12} aria-hidden="true" />
                </button>
              )}
            </form>
          </motion.div>
        </AnimatePresence>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-[rgba(255,255,255,0.04)] px-4 py-2">
        <span className="font-mono text-[8px] tracking-[0.14em] text-[var(--color-text-tertiary)] uppercase">
          Knowledge Engine
        </span>
        <span className="font-mono text-[8px] tracking-[0.1em] text-[rgba(0,196,255,0.4)]">
          OVI — INGENIERÍA EN LIMPIEZA
        </span>
      </div>
    </motion.div>
  );
}

// ─── Main Companion ───────────────────────────────────────────────────────────

export function OviAiCompanion() {
  const {
    isOpen,
    open,
    close,
    toggle,
    analysisState,
    setAnalysisState,
    session,
    addMessage,
    updateDiagnosticContext,
    setCurrentStep,
    setDiagnosticPhase,
    setRecommendation,
    resetSession,
  } = useOviAiStore();

  const [analysisStage, setAnalysisStage] = useState<string>(ANALYSIS_STAGES[0]);
  const panelRef = useRef<HTMLDivElement>(null);
  const hasInit = useRef(false);

  // Handle close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, close]);

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        close();
      }
    };
    const id = window.setTimeout(() => document.addEventListener("mousedown", handler), 50);
    return () => {
      window.clearTimeout(id);
      document.removeEventListener("mousedown", handler);
    };
  }, [isOpen, close]);

  // Initialize conversation on first open
  useEffect(() => {
    if (!isOpen || hasInit.current || session.messages.length > 0) return;
    hasInit.current = true;

    // Greeting message
    addMessage({
      id: `msg-greeting-${Date.now()}`,
      role: "assistant",
      content: OVI_GREETING,
      timestamp: Date.now(),
    });

    // First diagnostic question (Industria) — delayed for UX
    window.setTimeout(() => {
      const firstQuestion = buildGreetingWithFirstQuestion();
      addMessage({ ...firstQuestion, id: `msg-q1-${Date.now()}` });
      setCurrentStep(1);
      setDiagnosticPhase("diagnosing");
    }, 600);
  }, [isOpen, session.messages.length, addMessage, setCurrentStep, setDiagnosticPhase]);

  // Run recommendation generation
  const runGeneration = useCallback(
    (context: OviDecisionInput) => {
      setAnalysisState("analyzing");
      setDiagnosticPhase("generating");

      let stageIndex = 0;
      const stageInterval = window.setInterval(() => {
        stageIndex += 1;
        if (stageIndex < ANALYSIS_STAGES.length) {
          setAnalysisStage(ANALYSIS_STAGES[stageIndex]);
        }
      }, 540);

      const timeout = window.setTimeout(() => {
        window.clearInterval(stageInterval);
        const recommendation = computeRecommendation(context);
        setRecommendation(recommendation);
        setAnalysisStage(ANALYSIS_STAGES[0]);
      }, 2800);

      return () => {
        window.clearInterval(stageInterval);
        window.clearTimeout(timeout);
      };
    },
    [setAnalysisState, setDiagnosticPhase, setRecommendation],
  );

  // Handle quick-select option button click
  const handleSelectOption = useCallback(
    (option: OviChatOption) => {
      // Add user message
      const userMsg: OviChatMessage = {
        id: `msg-user-${Date.now()}`,
        role: "user",
        content: option.label,
        timestamp: Date.now(),
      };
      addMessage(userMsg);

      // Update context
      const update: Partial<OviDecisionInput> = {};
      if (option.field === "environmentalRestrictions") {
        const existing = session.diagnosticContext.environmentalRestrictions ?? [];
        update.environmentalRestrictions = [
          ...new Set([...existing, option.value]),
        ] as OviDecisionInput["environmentalRestrictions"];
      } else {
        (update as Record<string, unknown>)[option.field] = option.value;
      }
      updateDiagnosticContext(update);

      const newContext = { ...session.diagnosticContext, ...update };
      const newStep = session.currentStep;

      // Ask next question or stay on restrictions (allow multiple)
      const next = buildNextQuestionMessage(newContext, newStep);
      if (next) {
        window.setTimeout(() => {
          addMessage({ ...next.message, id: `msg-q${next.step}-${Date.now()}` });
          setCurrentStep(next.step);
        }, 300);
      }
    },
    [
      addMessage,
      updateDiagnosticContext,
      session.diagnosticContext,
      session.currentStep,
      setCurrentStep,
    ],
  );

  // Handle free-text submission
  const handleSubmitText = useCallback(
    (text: string) => {
      // Add user message
      addMessage({
        id: `msg-user-${Date.now()}`,
        role: "user",
        content: text,
        timestamp: Date.now(),
      });

      // Extract context from text
      const extracted = extractContextFromText(text);
      if (Object.keys(extracted).length > 0) {
        updateDiagnosticContext(extracted);
        const newContext = { ...session.diagnosticContext, ...extracted };

        // Ask the next unanswered question
        const next = buildNextQuestionMessage(newContext, session.currentStep);
        if (next) {
          window.setTimeout(() => {
            addMessage({ ...next.message, id: `msg-q${next.step}-${Date.now()}` });
            setCurrentStep(next.step);
          }, 300);
        }
      } else {
        // Acknowledge the message and keep asking the current question
        window.setTimeout(() => {
          addMessage({
            id: `msg-ack-${Date.now()}`,
            role: "assistant",
            content:
              "Entendido. Para continuar con el diagnóstico, por favor responde las preguntas de los botones de opción o proporciona detalles sobre la industria y el tipo de contaminación.",
            timestamp: Date.now(),
          });
        }, 300);
      }
    },
    [
      addMessage,
      updateDiagnosticContext,
      session.diagnosticContext,
      session.currentStep,
      setCurrentStep,
    ],
  );

  // Handle "generate diagnostic" button
  const handleGenerateDiagnostic = useCallback(() => {
    runGeneration(session.diagnosticContext);
  }, [runGeneration, session.diagnosticContext]);

  const handleReset = useCallback(() => {
    resetSession();
    hasInit.current = false;
    setAnalysisStage(ANALYSIS_STAGES[0]);
  }, [resetSession]);

  return (
    <div
      ref={panelRef}
      className="fixed right-5 bottom-5 z-[800] flex flex-col items-end gap-3"
      aria-label="OVI AI — Ingeniero Digital"
    >
      {/* Holographic panel */}
      <AnimatePresence>
        {isOpen && (
          <div className="w-[360px] max-w-[calc(100vw-2.5rem)]">
            <HolographicPanel
              session={session}
              analysisState={analysisState}
              analysisStage={analysisStage}
              onClose={close}
              onReset={handleReset}
              onSelectOption={handleSelectOption}
              onSubmitText={handleSubmitText}
              onGenerateDiagnostic={handleGenerateDiagnostic}
            />
          </div>
        )}
      </AnimatePresence>

      {/* Energy orb */}
      <EnergyOrb
        isOpen={isOpen}
        isAnalyzing={analysisState === "analyzing"}
        hasMessages={session.messages.length > 0}
        onClick={toggle}
      />
    </div>
  );
}

// ─── Trigger hook ─────────────────────────────────────────────────────────────

/**
 * useOviAi — programmatic access to the OVI AI companion.
 * Call from any page or feature to open the companion.
 *
 * @example
 *   const { openWithContext } = useOviAi()
 *   openWithContext({ industryId: 'transporte' })
 */
export function useOviAi() {
  const { open, close, toggle, isOpen } = useOviAiStore();
  return { open, close, toggle, isOpen };
}
