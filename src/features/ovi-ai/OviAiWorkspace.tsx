"use client";

/**
 * Feature: OVI AI Workspace
 *
 * Premium engineering consulting interface.
 * Simulates an intelligent cleaning engineering consultant.
 * No AI backend — UX/architecture implementation only.
 *
 * Features:
 *   - Rotating example prompts
 *   - Large multiline engineering input
 *   - Simulated DEMO diagnostic report
 *   - Smooth Framer Motion animations
 *   - Full accessibility (ARIA, keyboard, reduced-motion)
 *   - Responsive: mobile / tablet / desktop
 */

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Brain,
  CheckCircle2,
  ChevronRight,
  Cpu,
  Droplets,
  FlaskConical,
  Leaf,
  Loader2,
  RotateCcw,
  Wrench,
  Zap,
} from "lucide-react";
import { cn } from "@utils/cn";
import { Badge, Button, Card, Heading, Text } from "@components/ui";
import {
  generateSimulatedReport,
  ANALYSIS_STAGES,
  EXAMPLE_QUERIES,
  type SimulatedReport,
} from "@features/ovi-ai/ovi-ai-engine";

// Re-export for consumers that import from this module
export type { SimulatedReport };

type WorkspaceState = "idle" | "analyzing" | "report";

// ─── Sub-components ───────────────────────────────────────────────────────────

function ExamplesCarousel({
  activeIndex,
  onSelect,
}: {
  activeIndex: number;
  onSelect: (example: string) => void;
}) {
  return (
    <div className="relative overflow-hidden" role="region" aria-label="Ejemplos de consultas">
      <AnimatePresence mode="wait">
        <motion.p
          key={activeIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="cursor-pointer text-sm text-[var(--color-text-secondary)] italic transition-colors duration-200 hover:text-[var(--color-brand-primary)]"
          onClick={() => onSelect(EXAMPLE_QUERIES[activeIndex])}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onSelect(EXAMPLE_QUERIES[activeIndex]);
            }
          }}
          aria-label={`Usar ejemplo: ${EXAMPLE_QUERIES[activeIndex]}`}
        >
          &ldquo;{EXAMPLE_QUERIES[activeIndex]}&rdquo;
        </motion.p>
      </AnimatePresence>

      {/* Example dots */}
      <div className="mt-3 flex gap-1.5" role="tablist" aria-label="Ejemplos disponibles">
        {EXAMPLE_QUERIES.map((_, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={i === activeIndex}
            aria-label={`Ejemplo ${i + 1}`}
            onClick={() => onSelect(EXAMPLE_QUERIES[i])}
            className={cn(
              "h-1 rounded-full transition-all duration-300",
              i === activeIndex
                ? "w-6 bg-[var(--color-brand-primary)]"
                : "w-1.5 bg-[var(--color-border-default)] hover:bg-[var(--color-border-strong)]",
            )}
          />
        ))}
      </div>
    </div>
  );
}

function AnalyzingState({ stage }: { stage: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center gap-6 py-16"
      role="status"
      aria-live="polite"
      aria-label="Analizando su desafío"
    >
      {/* Animated ring */}
      <div className="relative flex items-center justify-center">
        <div
          className="absolute h-20 w-20 animate-ping rounded-full border-2 border-[var(--color-brand-primary)] opacity-20"
          aria-hidden="true"
        />
        <div
          className="relative flex h-16 w-16 items-center justify-center rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(0,196,255,0.15) 0%, transparent 70%)",
            border: "1px solid rgba(0,196,255,0.3)",
          }}
        >
          <Brain
            className="h-7 w-7 animate-pulse text-[var(--color-brand-primary)]"
            aria-hidden="true"
          />
        </div>
      </div>

      <div className="text-center">
        <Heading as="h3" size="lg" align="center">
          OVI AI
        </Heading>
        <AnimatePresence mode="wait">
          <motion.p
            key={stage}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3 }}
            className="mt-2 text-sm text-[var(--color-brand-primary)]"
          >
            {stage}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Progress bar */}
      <div
        className="h-0.5 w-48 overflow-hidden rounded-full bg-[var(--color-border-subtle)]"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Progreso del análisis"
      >
        <motion.div
          className="h-full bg-gradient-to-r from-[var(--color-brand-secondary)] to-[var(--color-brand-primary)]"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 2.5, ease: "linear" }}
        />
      </div>
    </motion.div>
  );
}

function ComplexityBadge({ level }: { level: SimulatedReport["complexityLevel"] }) {
  const styles: Record<SimulatedReport["complexityLevel"], string> = {
    Bajo: "bg-[rgba(0,255,133,0.1)] text-[var(--color-brand-accent)] border border-[rgba(0,255,133,0.3)]",
    Medio:
      "bg-[rgba(0,196,255,0.1)] text-[var(--color-brand-primary)] border border-[var(--color-border-brand)]",
    Alto: "bg-[rgba(255,165,0,0.1)] text-[var(--color-brand-warning)] border border-[rgba(255,165,0,0.3)]",
    Crítico:
      "bg-[rgba(255,59,59,0.1)] text-[var(--color-brand-danger)] border border-[rgba(255,59,59,0.3)]",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-lg px-3 py-1 text-sm font-medium",
        styles[level],
      )}
    >
      {level}
    </span>
  );
}

function ReportSection({
  icon,
  title,
  children,
  delay = 0,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <Card variant="glass" padding="lg" className="h-full">
        <div className="flex items-start gap-3">
          <div
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
            style={{ background: "rgba(0,196,255,0.1)", border: "1px solid rgba(0,196,255,0.2)" }}
            aria-hidden="true"
          >
            {icon}
          </div>
          <div className="min-w-0 flex-1">
            <Text
              as="p"
              size="sm"
              weight="semibold"
              textColor="secondary"
              className="tracking-wider uppercase"
            >
              {title}
            </Text>
            <div className="mt-2">{children}</div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

function EngineeringReport({ report, onReset }: { report: SimulatedReport; onReset: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      aria-label="Informe de ingeniería OVI AI"
    >
      {/* Report header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6 flex flex-wrap items-center justify-between gap-4"
      >
        <div className="flex items-center gap-3">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-lg"
            style={{
              background: "radial-gradient(circle, rgba(0,196,255,0.2) 0%, transparent 70%)",
              border: "1px solid rgba(0,196,255,0.3)",
            }}
          >
            <Brain className="h-5 w-5 text-[var(--color-brand-primary)]" aria-hidden="true" />
          </div>
          <div>
            <Text as="p" size="sm" weight="semibold" textColor="primary">
              Informe de Ingeniería OVI AI
            </Text>
            <Text as="p" size="sm" textColor="secondary">
              Diagnóstico preliminar —{" "}
              <span className="font-medium text-[var(--color-brand-warning)]">DEMO</span>
            </Text>
          </div>
        </div>
        <button
          onClick={onReset}
          className={cn(
            "inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm",
            "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]",
            "transition-all duration-200 hover:bg-[var(--glass-bg)]",
            "focus-visible:outline-2 focus-visible:outline-[var(--color-brand-primary)]",
          )}
          aria-label="Nueva consulta"
        >
          <RotateCcw size={14} aria-hidden="true" />
          Nueva consulta
        </button>
      </motion.div>

      {/* Report grid */}
      <div className="grid gap-4 sm:grid-cols-2">
        {/* Diagnóstico Inicial */}
        <ReportSection
          icon={<Brain className="h-4 w-4 text-[var(--color-brand-primary)]" />}
          title="Diagnóstico Inicial"
          delay={0.05}
        >
          <Text size="sm">{report.diagnosisInitial}</Text>
        </ReportSection>

        {/* Industria Detectada */}
        <ReportSection
          icon={<Cpu className="h-4 w-4 text-[var(--color-brand-primary)]" />}
          title="Industria Detectada"
          delay={0.1}
        >
          <Text size="sm" weight="semibold" textColor="primary">
            {report.detectedIndustry}
          </Text>
        </ReportSection>

        {/* Nivel de Complejidad */}
        <ReportSection
          icon={<Zap className="h-4 w-4 text-[var(--color-brand-primary)]" />}
          title="Nivel de Complejidad"
          delay={0.15}
        >
          <ComplexityBadge level={report.complexityLevel} />
        </ReportSection>

        {/* Impacto Ambiental */}
        <ReportSection
          icon={<Leaf className="h-4 w-4 text-[var(--color-brand-primary)]" />}
          title="Impacto Ambiental"
          delay={0.2}
        >
          <Text size="sm">{report.environmentalImpact}</Text>
        </ReportSection>

        {/* Servicios Recomendados */}
        <ReportSection
          icon={<Wrench className="h-4 w-4 text-[var(--color-brand-primary)]" />}
          title="Servicios Recomendados"
          delay={0.25}
        >
          <ul className="space-y-2">
            {report.recommendedServices.map((service) => (
              <li key={service} className="flex items-start gap-2">
                <CheckCircle2
                  className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-brand-accent)]"
                  aria-hidden="true"
                />
                <Text size="sm">{service}</Text>
              </li>
            ))}
          </ul>
        </ReportSection>

        {/* Productos Potenciales */}
        <ReportSection
          icon={<FlaskConical className="h-4 w-4 text-[var(--color-brand-primary)]" />}
          title="Productos Potenciales"
          delay={0.3}
        >
          <ul className="space-y-2">
            {report.potentialProducts.map((product) => (
              <li key={product} className="flex items-start gap-2">
                <Droplets
                  className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-brand-primary)]"
                  aria-hidden="true"
                />
                <Text size="sm">{product}</Text>
              </li>
            ))}
          </ul>
        </ReportSection>

        {/* Protocolos Sugeridos */}
        <ReportSection
          icon={<CheckCircle2 className="h-4 w-4 text-[var(--color-brand-primary)]" />}
          title="Protocolos Sugeridos"
          delay={0.35}
        >
          <ul className="space-y-2">
            {report.suggestedProtocols.map((protocol) => (
              <li key={protocol} className="flex items-start gap-2">
                <ChevronRight
                  className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-brand-accent)]"
                  aria-hidden="true"
                />
                <Text size="sm" className="font-mono text-[var(--color-text-secondary)]">
                  {protocol}
                </Text>
              </li>
            ))}
          </ul>
        </ReportSection>

        {/* Próximos Pasos */}
        <ReportSection
          icon={<ArrowRight className="h-4 w-4 text-[var(--color-brand-primary)]" />}
          title="Próximos Pasos"
          delay={0.4}
        >
          <ol className="space-y-2">
            {report.nextSteps.map((step, i) => (
              <li key={step} className="flex items-start gap-2">
                <span
                  className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-[var(--color-text-inverse)]"
                  style={{ background: "var(--color-brand-primary)" }}
                  aria-hidden="true"
                >
                  {i + 1}
                </span>
                <Text size="sm">{step}</Text>
              </li>
            ))}
          </ol>
        </ReportSection>
      </div>

      {/* CTAs after report */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="mt-8"
      >
        <Card
          variant="glow"
          padding="lg"
          className="border border-[rgba(0,196,255,0.2)]"
          aria-label="Próximos pasos con OVI"
        >
          <Text
            as="p"
            size="sm"
            weight="semibold"
            className="tracking-wider text-[var(--color-brand-primary)] uppercase"
          >
            ¿Listo para la solución real?
          </Text>
          <Heading as="h3" size="lg" className="mt-2">
            Continúe con un experto OVI
          </Heading>
          <Text className="mt-2 max-w-xl">
            Este diagnóstico es una aproximación preliminar. Un ingeniero OVI validará las
            condiciones reales y diseñará el protocolo definitivo para su operación.
          </Text>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/contact">
              <Button
                variant="primary"
                size="md"
                rounded="default"
                leftIcon={<CheckCircle2 size={16} aria-hidden="true" />}
              >
                Solicitar Diagnóstico Profesional
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                variant="outline"
                size="md"
                rounded="default"
                leftIcon={<Wrench size={16} aria-hidden="true" />}
              >
                Hablar con un Ingeniero OVI
              </Button>
            </Link>
            <Link href="/technology">
              <Button
                variant="ghost"
                size="md"
                rounded="default"
                leftIcon={<Cpu size={16} aria-hidden="true" />}
              >
                Conocer OVI OS
              </Button>
            </Link>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function OviAiWorkspace() {
  const prefersReducedMotion = useReducedMotion();

  const [workspaceState, setWorkspaceState] = React.useState<WorkspaceState>("idle");
  const [inputValue, setInputValue] = React.useState("");
  const [activeExampleIndex, setActiveExampleIndex] = React.useState(0);
  const [analysisStage, setAnalysisStage] = React.useState<string>(ANALYSIS_STAGES[0]);
  const [report, setReport] = React.useState<SimulatedReport | null>(null);
  const [showExamples, setShowExamples] = React.useState(false);

  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const reportRef = React.useRef<HTMLDivElement>(null);

  // Rotate examples every 4 seconds when idle
  React.useEffect(() => {
    if (workspaceState !== "idle") return;
    const interval = setInterval(() => {
      setActiveExampleIndex((prev) => (prev + 1) % EXAMPLE_QUERIES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [workspaceState]);

  // Auto-resize textarea
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const handleAnalyze = () => {
    const trimmed = inputValue.trim();
    if (!trimmed || workspaceState !== "idle") return;

    setWorkspaceState("analyzing");

    // Cycle through analysis stages
    let stageIndex = 0;
    const stageInterval = setInterval(() => {
      stageIndex += 1;
      if (stageIndex < ANALYSIS_STAGES.length) {
        setAnalysisStage(ANALYSIS_STAGES[stageIndex]);
      }
    }, 500);

    // After analysis completes, show report
    setTimeout(() => {
      clearInterval(stageInterval);
      const generatedReport = generateSimulatedReport(trimmed);
      setReport(generatedReport);
      setWorkspaceState("report");

      // Scroll to report
      if (!prefersReducedMotion) {
        setTimeout(() => {
          reportRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    }, 2800);
  };

  const handleReset = () => {
    setWorkspaceState("idle");
    setInputValue("");
    setReport(null);
    setAnalysisStage(ANALYSIS_STAGES[0]);
    setShowExamples(false);
    setTimeout(() => textareaRef.current?.focus(), 100);
  };

  const handleSelectExample = (example: string) => {
    setInputValue(example);
    setShowExamples(false);
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      }
      textareaRef.current?.focus();
    }, 50);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Ctrl/Cmd + Enter submits
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      handleAnalyze();
    }
  };

  const isInputEmpty = inputValue.trim().length === 0;

  return (
    <div className="w-full">
      {/* Engineering approach indicator */}
      <div
        className="mb-10 flex items-center justify-center"
        aria-label="Metodología de ingeniería OVI"
      >
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-[var(--color-text-tertiary)]">
          {[
            "Problema",
            "Análisis",
            "Ingeniería",
            "Protocolo",
            "Productos",
            "Servicios",
            "Implementación",
          ].map((step, i, arr) => (
            <React.Fragment key={step}>
              <span className="hidden sm:inline">{step}</span>
              {i < arr.length - 1 && (
                <ChevronRight
                  size={12}
                  className="hidden text-[var(--color-border-default)] sm:inline"
                  aria-hidden="true"
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Main workspace card */}
      <Card
        variant="glass"
        padding="none"
        className="overflow-visible border border-[var(--color-border-brand)] shadow-[var(--shadow-glow-primary)]"
      >
        <div className="p-6 sm:p-8 lg:p-10">
          {/* Input section */}
          <AnimatePresence mode="wait">
            {workspaceState === "idle" && (
              <motion.div
                key="input"
                initial={{ opacity: prefersReducedMotion ? 1 : 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: prefersReducedMotion ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Input label */}
                <label
                  htmlFor="ovi-ai-input"
                  className="mb-3 block text-sm font-medium text-[var(--color-text-secondary)]"
                >
                  Describa su desafío operacional
                </label>

                {/* Textarea */}
                <div className="relative">
                  <textarea
                    ref={textareaRef}
                    id="ovi-ai-input"
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Describa aquí el desafío de limpieza que desea resolver..."
                    rows={5}
                    className={cn(
                      "w-full resize-none rounded-xl",
                      "bg-[rgba(255,255,255,0.03)] text-[var(--color-text-primary)]",
                      "border border-[var(--color-border-default)]",
                      "px-5 py-4 text-base leading-relaxed",
                      "placeholder:text-[var(--color-text-tertiary)]",
                      "transition-all duration-300",
                      "focus:border-[var(--color-brand-primary)] focus:outline-none",
                      "focus:ring-1 focus:ring-[var(--color-brand-primary)]",
                      "focus:shadow-[0_0_0_4px_rgba(0,196,255,0.08)]",
                      "min-h-[160px]",
                    )}
                    aria-label="Describe tu desafío de limpieza"
                    aria-describedby="ovi-ai-hint"
                  />
                  {/* Character hint */}
                  {inputValue.length > 0 && (
                    <span className="absolute right-4 bottom-3 text-xs text-[var(--color-text-tertiary)]">
                      {inputValue.length} caracteres
                    </span>
                  )}
                </div>

                {/* Hint */}
                <p id="ovi-ai-hint" className="mt-2 text-xs text-[var(--color-text-tertiary)]">
                  Presione Ctrl+Enter para analizar rápidamente.
                </p>

                {/* Actions row */}
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <Button
                    variant="primary"
                    size="lg"
                    rounded="default"
                    leftIcon={
                      workspaceState === "idle" ? (
                        <Brain size={18} aria-hidden="true" />
                      ) : (
                        <Loader2 size={18} className="animate-spin" aria-hidden="true" />
                      )
                    }
                    disabled={isInputEmpty}
                    onClick={handleAnalyze}
                    className={cn(
                      "relative overflow-hidden",
                      !isInputEmpty &&
                        "shadow-[0_0_20px_rgba(0,196,255,0.3)] hover:shadow-[0_0_30px_rgba(0,196,255,0.5)]",
                    )}
                    aria-label="Analizar desafío de limpieza"
                  >
                    Analizar desafío
                  </Button>

                  <Button
                    variant="ghost"
                    size="lg"
                    rounded="default"
                    onClick={() => setShowExamples(!showExamples)}
                    aria-expanded={showExamples}
                    aria-controls="examples-panel"
                    aria-label={showExamples ? "Ocultar ejemplos" : "Ver ejemplos"}
                  >
                    {showExamples ? "Ocultar ejemplos" : "Ver ejemplos"}
                  </Button>
                </div>

                {/* Rotating example / examples panel */}
                <div className="mt-6 border-t border-[var(--color-border-subtle)] pt-5">
                  <AnimatePresence mode="wait">
                    {!showExamples ? (
                      <motion.div
                        key="rotating"
                        initial={{ opacity: prefersReducedMotion ? 1 : 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: prefersReducedMotion ? 1 : 0 }}
                      >
                        <Text
                          as="p"
                          size="xs"
                          textColor="secondary"
                          className="mb-2 tracking-wider uppercase"
                        >
                          Ejemplo de consulta
                        </Text>
                        <ExamplesCarousel
                          activeIndex={activeExampleIndex}
                          onSelect={handleSelectExample}
                        />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="all-examples"
                        id="examples-panel"
                        initial={{
                          opacity: prefersReducedMotion ? 1 : 0,
                          y: prefersReducedMotion ? 0 : 8,
                        }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{
                          opacity: prefersReducedMotion ? 1 : 0,
                          y: prefersReducedMotion ? 0 : -8,
                        }}
                        transition={{ duration: 0.3 }}
                        aria-label="Lista de ejemplos de consultas"
                      >
                        <Text
                          as="p"
                          size="xs"
                          textColor="secondary"
                          className="mb-3 tracking-wider uppercase"
                        >
                          Seleccione un ejemplo
                        </Text>
                        <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                          {EXAMPLE_QUERIES.map((example, i) => (
                            <li key={i}>
                              <button
                                onClick={() => handleSelectExample(example)}
                                className={cn(
                                  "w-full rounded-lg border border-[var(--color-border-subtle)] p-3 text-left text-sm",
                                  "text-[var(--color-text-secondary)] italic",
                                  "hover:border-[var(--color-border-brand)] hover:text-[var(--color-text-primary)]",
                                  "hover:bg-[rgba(0,196,255,0.05)]",
                                  "transition-all duration-200",
                                  "focus-visible:outline-2 focus-visible:outline-[var(--color-brand-primary)]",
                                )}
                                aria-label={`Usar ejemplo: ${example}`}
                              >
                                &ldquo;{example}&rdquo;
                              </button>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}

            {/* Analyzing state */}
            {workspaceState === "analyzing" && (
              <motion.div
                key="analyzing"
                initial={{ opacity: prefersReducedMotion ? 1 : 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: prefersReducedMotion ? 1 : 0 }}
              >
                <AnalyzingState stage={analysisStage} />
              </motion.div>
            )}

            {/* Report state */}
            {workspaceState === "report" && report && (
              <motion.div
                key="report"
                ref={reportRef}
                initial={{ opacity: prefersReducedMotion ? 1 : 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: prefersReducedMotion ? 1 : 0 }}
              >
                <EngineeringReport report={report} onReset={handleReset} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Card>

      {/* Demo disclaimer */}
      <motion.div
        initial={{ opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-4 flex items-center justify-center gap-2"
        role="note"
        aria-label="Nota sobre modo demostración"
      >
        <Badge variant="default" size="sm">
          DEMO
        </Badge>
        <Text size="xs" textColor="secondary">
          Esta es una simulación. OVI AI real utilizará inteligencia artificial conectada.
        </Text>
      </motion.div>
    </div>
  );
}
