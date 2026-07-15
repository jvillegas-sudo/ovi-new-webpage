"use client";

/**
 * OVI Command Center — Intelligent Control Center
 * Work Order 012
 *
 * Unifies all OVI ecosystem data (OVI OS, OVI Field, OVI AI, OVI Store,
 * OVI Lab, OVI Analytics) into a single executive view.
 *
 * Philosophy: "¿Mi operación está funcionando correctamente?"
 * This question must be answered in less than 10 seconds.
 *
 * Tabs:
 *   ejecutivo     — Executive view: global status + KPIs + activity summary
 *   alertas       — Alert center: critical / high / medium / low
 *   timeline      — Chronological activity: services, diagnostics, purchases, incidents
 *   activos       — Critical assets monitoring
 *   diagnosticos  — Latest technical diagnostics
 *   productos     — Product consumption control
 *   ambiental     — Environmental indicators
 *   riesgos       — Risk analysis (AI-powered)
 *   recomendaciones — OVI AI recommendations
 *   buscador      — Global search across all modules
 *   arquitectura  — Module integrations + future capabilities
 */

import Link from "next/link";
import {
  Activity,
  AlertTriangle,
  BarChart3,
  Brain,
  Building2,
  Calendar,
  Camera,
  CheckCircle,
  ChevronRight,
  ClipboardList,
  Clock,
  Cpu,
  Droplets,
  Eye,
  Factory,
  FileText,
  FlaskConical,
  FolderOpen,
  Globe,
  Layers,
  Leaf,
  Monitor,
  Package,
  Radio,
  Recycle,
  RefreshCw,
  Search,
  ShoppingBag,
  ShoppingCart,
  Smartphone,
  Sparkles,
  Target,
  TrendingDown,
  TrendingUp,
  Wind,
  Wrench,
  X,
  Zap,
} from "lucide-react";
import { Card, Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui";
import { cn } from "@utils/cn";
import {
  aiRecommendations,
  commandAlerts,
  commandKpis,
  criticalAssets,
  diagnosticRecords,
  environmentalIndicators,
  futureCapabilities,
  globalStatus,
  integrationModules,
  productConsumption,
  riskItems,
  searchResultsDemo,
  timelineEvents,
  upcomingServices,
  type AlertSeverity,
  type CommandTone,
  type HealthStatus,
  type RiskLevel,
  type SearchCategory,
  type TimelineEventType,
} from "./ovi-command-center-data";
import { useOviCommandCenterStore } from "@store/ovi-command-center.store";

// ─── Icon resolver ────────────────────────────────────────────────────────────

const ICON_MAP: Record<string, React.FC<{ className?: string; style?: React.CSSProperties }>> = {
  Activity,
  AlertTriangle,
  BarChart3,
  Brain,
  Building2,
  Calendar,
  Camera,
  CheckCircle,
  ChevronRight,
  ClipboardList,
  Clock,
  Cpu,
  Droplets,
  Eye,
  Factory,
  FileText,
  FlaskConical,
  FolderOpen,
  Globe,
  Layers,
  Leaf,
  Monitor,
  Package,
  Radio,
  Recycle,
  RefreshCw,
  Search,
  ShoppingBag,
  ShoppingCart,
  Smartphone,
  Sparkles,
  Target,
  TrendingDown,
  TrendingUp,
  Wind,
  Wrench,
  Zap,
};

function DynamicIcon({
  name,
  className,
  style,
}: {
  name: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const Icon = ICON_MAP[name] ?? Zap;
  return <Icon className={className ?? ""} style={style} />;
}

// ─── Tone helpers ─────────────────────────────────────────────────────────────

function toneText(tone: CommandTone): string {
  switch (tone) {
    case "primary":
      return "text-[var(--color-brand-primary)]";
    case "accent":
      return "text-[var(--color-brand-accent)]";
    case "warning":
      return "text-amber-400";
    case "danger":
      return "text-red-400";
    case "eco":
      return "text-emerald-400";
    case "neutral":
    default:
      return "text-[var(--color-text-secondary)]";
  }
}

function toneBg(tone: CommandTone): string {
  switch (tone) {
    case "primary":
      return "bg-[var(--color-brand-primary)]/10";
    case "accent":
      return "bg-[var(--color-brand-accent)]/10";
    case "warning":
      return "bg-amber-400/10";
    case "danger":
      return "bg-red-400/10";
    case "eco":
      return "bg-emerald-400/10";
    case "neutral":
    default:
      return "bg-white/5";
  }
}

function toneBorder(tone: CommandTone): string {
  switch (tone) {
    case "primary":
      return "border-[var(--color-brand-primary)]/20";
    case "accent":
      return "border-[var(--color-brand-accent)]/20";
    case "warning":
      return "border-amber-400/20";
    case "danger":
      return "border-red-400/20";
    case "eco":
      return "border-emerald-400/20";
    case "neutral":
    default:
      return "border-white/10";
  }
}

// ─── Health Status helpers ────────────────────────────────────────────────────

function healthColor(health: HealthStatus): string {
  switch (health) {
    case "optimal":
      return "text-emerald-400";
    case "attention":
      return "text-amber-400";
    case "critical":
      return "text-red-400";
    case "offline":
      return "text-[var(--color-text-secondary)]";
  }
}

function healthBg(health: HealthStatus): string {
  switch (health) {
    case "optimal":
      return "bg-emerald-400/10";
    case "attention":
      return "bg-amber-400/10";
    case "critical":
      return "bg-red-400/10";
    case "offline":
      return "bg-white/5";
  }
}

function healthBorder(health: HealthStatus): string {
  switch (health) {
    case "optimal":
      return "border-emerald-400/30";
    case "attention":
      return "border-amber-400/30";
    case "critical":
      return "border-red-400/30";
    case "offline":
      return "border-white/10";
  }
}

function healthLabel(health: HealthStatus): string {
  switch (health) {
    case "optimal":
      return "Óptimo";
    case "attention":
      return "Atención";
    case "critical":
      return "Crítico";
    case "offline":
      return "Sin conexión";
  }
}

// ─── Alert Severity helpers ───────────────────────────────────────────────────

function severityColor(severity: AlertSeverity): string {
  switch (severity) {
    case "critical":
      return "text-red-400";
    case "high":
      return "text-amber-400";
    case "medium":
      return "text-yellow-400";
    case "low":
      return "text-[var(--color-brand-primary)]";
  }
}

function severityBg(severity: AlertSeverity): string {
  switch (severity) {
    case "critical":
      return "bg-red-400/10";
    case "high":
      return "bg-amber-400/10";
    case "medium":
      return "bg-yellow-400/10";
    case "low":
      return "bg-[var(--color-brand-primary)]/10";
  }
}

function severityBorder(severity: AlertSeverity): string {
  switch (severity) {
    case "critical":
      return "border-red-400/30";
    case "high":
      return "border-amber-400/30";
    case "medium":
      return "border-yellow-400/30";
    case "low":
      return "border-[var(--color-brand-primary)]/30";
  }
}

function severityLabel(severity: AlertSeverity): string {
  switch (severity) {
    case "critical":
      return "Crítico";
    case "high":
      return "Alto";
    case "medium":
      return "Medio";
    case "low":
      return "Bajo";
  }
}

// ─── Risk level helpers ───────────────────────────────────────────────────────

function riskColor(level: RiskLevel): string {
  switch (level) {
    case "alto":
      return "text-red-400";
    case "medio":
      return "text-amber-400";
    case "bajo":
      return "text-emerald-400";
  }
}

function riskBg(level: RiskLevel): string {
  switch (level) {
    case "alto":
      return "bg-red-400/10";
    case "medio":
      return "bg-amber-400/10";
    case "bajo":
      return "bg-emerald-400/10";
  }
}

// ─── Timeline type helpers ────────────────────────────────────────────────────

function timelineTypeLabel(type: TimelineEventType): string {
  switch (type) {
    case "diagnostico":
      return "Diagnóstico";
    case "servicio":
      return "Servicio";
    case "compra":
      return "Compra";
    case "inspeccion":
      return "Inspección";
    case "fotografia":
      return "Fotografía";
    case "incidencia":
      return "Incidencia";
    case "recomendacion":
      return "Recomendación IA";
  }
}

// ─── Search category helpers ──────────────────────────────────────────────────

function searchCategoryLabel(cat: SearchCategory): string {
  switch (cat) {
    case "proyecto":
      return "Proyecto";
    case "activo":
      return "Activo";
    case "producto":
      return "Producto";
    case "protocolo":
      return "Protocolo";
    case "cliente":
      return "Cliente";
    case "documento":
      return "Documento";
    case "diagnostico":
      return "Diagnóstico";
  }
}

// ─── Trend badge ──────────────────────────────────────────────────────────────

function TrendBadge({ trend, change }: { trend: "up" | "down" | "stable"; change: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
        trend === "up" && "bg-emerald-400/10 text-emerald-400",
        trend === "down" && "bg-[var(--color-brand-primary)]/10 text-[var(--color-brand-primary)]",
        trend === "stable" && "bg-white/5 text-[var(--color-text-secondary)]",
      )}
    >
      {trend === "up" && <TrendingUp className="h-3 w-3" />}
      {trend === "down" && <TrendingDown className="h-3 w-3" />}
      {change}
    </span>
  );
}

// ─── Module tabs config ───────────────────────────────────────────────────────

const moduleTabs = [
  {
    value: "ejecutivo",
    label: "Vista Ejecutiva",
    icon: Activity,
    summary: "Estado global de la operación, KPIs clave y últimas actividades.",
  },
  {
    value: "alertas",
    label: "Centro de Alertas",
    icon: AlertTriangle,
    summary: "Alertas activas organizadas por severidad. Requiere atención inmediata.",
  },
  {
    value: "timeline",
    label: "Timeline",
    icon: Clock,
    summary: "Línea de tiempo con diagnósticos, servicios, compras e incidencias.",
  },
  {
    value: "activos",
    label: "Activos Críticos",
    icon: Layers,
    summary: "Monitoreo de estado y métricas de activos críticos en tiempo real.",
  },
  {
    value: "diagnosticos",
    label: "Últimos Diagnósticos",
    icon: FlaskConical,
    summary: "Diagnósticos técnicos recientes, hallazgos y estado de revisión.",
  },
  {
    value: "productos",
    label: "Consumo de Productos",
    icon: Package,
    summary: "Control de consumo de productos vs. lo planificado por protocolo.",
  },
  {
    value: "ambiental",
    label: "Indicadores Ambientales",
    icon: Leaf,
    summary: "Agua, biodegradables, reducción química e índice de sostenibilidad.",
  },
  {
    value: "riesgos",
    label: "Riesgos",
    icon: Target,
    summary: "Riesgos identificados con probabilidad, impacto y plan de mitigación.",
  },
  {
    value: "recomendaciones",
    label: "Recomendaciones IA",
    icon: Sparkles,
    summary: "Acciones sugeridas por OVI AI, priorizadas y justificadas.",
  },
  {
    value: "buscador",
    label: "Búsqueda Global",
    icon: Search,
    summary: "Localiza proyectos, activos, productos, protocolos y documentos.",
  },
  {
    value: "arquitectura",
    label: "Arquitectura",
    icon: Globe,
    summary: "Integraciones activas con todos los módulos OVI y capacidades futuras.",
  },
];

// ─── Tab: Executive View ──────────────────────────────────────────────────────

function TabEjecutivo() {
  return (
    <div className="space-y-8">
      {/* Global Status Banner */}
      <Card
        className={cn(
          "border p-6",
          healthBg(globalStatus.health),
          healthBorder(globalStatus.health),
        )}
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4">
            <div className={cn("mt-0.5 rounded-xl p-3", healthBg(globalStatus.health))}>
              <Activity className={cn("h-6 w-6", healthColor(globalStatus.health))} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className={cn("text-lg font-bold", healthColor(globalStatus.health))}>
                  {globalStatus.label}
                </h2>
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 text-xs font-semibold",
                    healthBg(globalStatus.health),
                    healthColor(globalStatus.health),
                  )}
                >
                  {healthLabel(globalStatus.health)}
                </span>
              </div>
              <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                {globalStatus.description}
              </p>
              <p className="mt-1 text-xs text-[var(--color-text-muted)]">
                Actualizado: {globalStatus.updatedAt}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className={cn("text-4xl font-black", healthColor(globalStatus.health))}>
              {globalStatus.score}
            </span>
            <span className="text-xs text-[var(--color-text-secondary)]">Puntuación operativa</span>
          </div>
        </div>
      </Card>

      {/* KPI Grid */}
      <div>
        <h3 className="mb-4 text-sm font-semibold tracking-widest text-[var(--color-text-secondary)] uppercase">
          Indicadores Clave
        </h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {commandKpis.map((kpi) => (
            <Card key={kpi.id} className={cn("border p-4", toneBg(kpi.tone), toneBorder(kpi.tone))}>
              <div className="flex items-start justify-between gap-2">
                <div className={cn("rounded-lg p-2", toneBg(kpi.tone))}>
                  <DynamicIcon name={kpi.icon} className={cn("h-4 w-4", toneText(kpi.tone))} />
                </div>
                <TrendBadge trend={kpi.trend} change={kpi.change} />
              </div>
              <div className="mt-3">
                <p className="text-xs text-[var(--color-text-secondary)]">{kpi.label}</p>
                <div className="mt-1 flex items-baseline gap-1">
                  <span className={cn("text-2xl font-black", toneText(kpi.tone))}>{kpi.value}</span>
                  {kpi.unit && (
                    <span className="text-xs text-[var(--color-text-secondary)]">{kpi.unit}</span>
                  )}
                </div>
                <p className="mt-1 text-xs text-[var(--color-text-muted)]">{kpi.description}</p>
                <p className="mt-1 text-xs font-medium text-[var(--color-text-secondary)]">
                  Fuente: {kpi.source}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Active Alerts Summary + Upcoming Services */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Active Alerts Summary */}
        <Card className="border border-white/10 bg-white/[0.03] p-5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">
              Alertas Activas
            </h3>
            <span className="rounded-full bg-red-400/10 px-2 py-0.5 text-xs font-semibold text-red-400">
              {commandAlerts.filter((a) => !a.resolved).length} activas
            </span>
          </div>
          <div className="space-y-3">
            {commandAlerts.slice(0, 4).map((alert) => (
              <div
                key={alert.id}
                className={cn(
                  "flex items-start gap-3 rounded-lg border p-3",
                  severityBg(alert.severity),
                  severityBorder(alert.severity),
                )}
              >
                <AlertTriangle
                  className={cn("mt-0.5 h-4 w-4 shrink-0", severityColor(alert.severity))}
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        "shrink-0 rounded-full px-1.5 py-0.5 text-xs font-semibold",
                        severityBg(alert.severity),
                        severityColor(alert.severity),
                      )}
                    >
                      {severityLabel(alert.severity)}
                    </span>
                    <p className="truncate text-xs font-medium text-[var(--color-text-primary)]">
                      {alert.title}
                    </p>
                  </div>
                  {alert.location && (
                    <p className="mt-0.5 truncate text-xs text-[var(--color-text-muted)]">
                      {alert.location}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Upcoming Services */}
        <Card className="border border-white/10 bg-white/[0.03] p-5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">
              Próximas Intervenciones
            </h3>
            <span className="rounded-full bg-[var(--color-brand-primary)]/10 px-2 py-0.5 text-xs font-semibold text-[var(--color-brand-primary)]">
              {upcomingServices.length} programadas
            </span>
          </div>
          <div className="space-y-3">
            {upcomingServices.slice(0, 4).map((svc) => (
              <div
                key={svc.id}
                className={cn(
                  "flex items-start gap-3 rounded-lg border p-3",
                  svc.status === "en_riesgo"
                    ? "border-amber-400/20 bg-amber-400/5"
                    : "border-white/10 bg-white/[0.02]",
                )}
              >
                <Calendar
                  className={cn(
                    "mt-0.5 h-4 w-4 shrink-0",
                    svc.status === "en_riesgo"
                      ? "text-amber-400"
                      : "text-[var(--color-brand-primary)]",
                  )}
                />
                <div className="min-w-0">
                  <p className="truncate text-xs font-medium text-[var(--color-text-primary)]">
                    {svc.title}
                  </p>
                  <p className="mt-0.5 text-xs text-[var(--color-text-muted)]">
                    {svc.scheduledDate} — {svc.scheduledTime} · {svc.client}
                  </p>
                </div>
                {svc.status === "en_riesgo" && (
                  <span className="shrink-0 rounded-full bg-amber-400/10 px-1.5 py-0.5 text-xs font-semibold text-amber-400">
                    Riesgo
                  </span>
                )}
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Recent Timeline */}
      <Card className="border border-white/10 bg-white/[0.03] p-5">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">
            Últimas Actividades
          </h3>
          <span className="text-xs text-[var(--color-text-muted)]">Últimas 72 horas</span>
        </div>
        <div className="relative space-y-0 pl-5">
          <div className="absolute top-2 bottom-2 left-2 w-px bg-white/10" />
          {timelineEvents.slice(0, 5).map((event) => (
            <div key={event.id} className="relative pb-4">
              <div
                className={cn(
                  "absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full",
                  toneBg(event.tone),
                )}
              >
                <DynamicIcon name={event.icon} className={cn("h-3 w-3", toneText(event.tone))} />
              </div>
              <div className="ml-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-[var(--color-text-primary)]">
                    {event.title}
                  </span>
                  <span
                    className={cn(
                      "rounded-full px-1.5 py-0.5 text-xs font-medium",
                      toneBg(event.tone),
                      toneText(event.tone),
                    )}
                  >
                    {timelineTypeLabel(event.type)}
                  </span>
                </div>
                <p className="mt-0.5 text-xs text-[var(--color-text-muted)]">
                  {event.date} {event.time}
                  {event.client && ` · ${event.client}`}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// ─── Tab: Alert Center ────────────────────────────────────────────────────────

function TabAlertas() {
  const { resolvedAlerts, resolveAlert } = useOviCommandCenterStore();

  const activeAlerts = commandAlerts.filter((a) => !resolvedAlerts.has(a.id));
  const bySeverity = (sev: AlertSeverity) => activeAlerts.filter((a) => a.severity === sev);

  const SeveritySection = ({
    severity,
    alerts,
  }: {
    severity: AlertSeverity;
    alerts: typeof commandAlerts;
  }) => {
    if (alerts.length === 0) return null;
    return (
      <div>
        <div className="mb-3 flex items-center gap-2">
          <span
            className={cn(
              "rounded-full px-2.5 py-1 text-xs font-semibold",
              severityBg(severity),
              severityColor(severity),
            )}
          >
            {severityLabel(severity)} · {alerts.length}
          </span>
        </div>
        <div className="space-y-4">
          {alerts.map((alert) => (
            <Card
              key={alert.id}
              className={cn(
                "border p-5",
                severityBg(alert.severity),
                severityBorder(alert.severity),
              )}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle
                    className={cn("mt-0.5 h-5 w-5 shrink-0", severityColor(alert.severity))}
                  />
                  <div>
                    <h4 className="font-semibold text-[var(--color-text-primary)]">
                      {alert.title}
                    </h4>
                    <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                      {alert.description}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-[var(--color-text-muted)]">
                      {alert.asset && <span>Activo: {alert.asset}</span>}
                      {alert.location && <span>Ubicación: {alert.location}</span>}
                      <span>Detectado: {alert.detectedAt}</span>
                      <span>Fuente: {alert.source}</span>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {alert.actions.map((action) => (
                        <button
                          key={action}
                          className={cn(
                            "rounded-lg px-3 py-1 text-xs font-medium transition-colors",
                            "border",
                            severityBorder(alert.severity),
                            severityColor(alert.severity),
                            "hover:opacity-80",
                          )}
                        >
                          {action}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => resolveAlert(alert.id)}
                  className="flex items-center gap-1 rounded-lg border border-emerald-400/20 bg-emerald-400/5 px-3 py-1.5 text-xs font-medium text-emerald-400 transition-colors hover:bg-emerald-400/10"
                >
                  <CheckCircle className="h-3 w-3" /> Resolver
                </button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-[var(--color-text-primary)]">Centro de Alertas</h3>
          <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
            {activeAlerts.length} alertas activas · Organizado por severidad
          </p>
        </div>
      </div>
      {activeAlerts.length === 0 ? (
        <Card className="border border-emerald-400/20 bg-emerald-400/5 p-8 text-center">
          <CheckCircle className="mx-auto mb-3 h-10 w-10 text-emerald-400" />
          <p className="font-semibold text-emerald-400">Sin alertas activas</p>
          <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
            Toda la operación se encuentra dentro de parámetros normales.
          </p>
        </Card>
      ) : (
        <>
          <SeveritySection severity="critical" alerts={bySeverity("critical")} />
          <SeveritySection severity="high" alerts={bySeverity("high")} />
          <SeveritySection severity="medium" alerts={bySeverity("medium")} />
          <SeveritySection severity="low" alerts={bySeverity("low")} />
        </>
      )}
    </div>
  );
}

// ─── Tab: Timeline ────────────────────────────────────────────────────────────

function TabTimeline() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-[var(--color-text-primary)]">
          Timeline de Actividad
        </h3>
        <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
          Diagnósticos, servicios, compras, inspecciones, fotografías e incidencias en orden
          cronológico.
        </p>
      </div>
      <div className="relative pl-6">
        <div className="absolute top-2 bottom-2 left-3 w-px bg-white/10" />
        <div className="space-y-0">
          {timelineEvents.map((event, idx) => (
            <div key={event.id} className="relative pb-6">
              <div
                className={cn(
                  "absolute -left-3 flex h-7 w-7 items-center justify-center rounded-full border",
                  toneBg(event.tone),
                  toneBorder(event.tone),
                )}
              >
                <DynamicIcon
                  name={event.icon}
                  className={cn("h-3.5 w-3.5", toneText(event.tone))}
                />
              </div>
              <Card
                className={cn(
                  "ml-5 border p-4",
                  idx === 0 ? toneBg(event.tone) : "bg-white/[0.02]",
                  toneBorder(event.tone),
                )}
              >
                <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-semibold text-[var(--color-text-primary)]">
                        {event.title}
                      </span>
                      <span
                        className={cn(
                          "rounded-full px-2 py-0.5 text-xs font-medium",
                          toneBg(event.tone),
                          toneText(event.tone),
                        )}
                      >
                        {timelineTypeLabel(event.type)}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                      {event.description}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-[var(--color-text-muted)]">
                      {event.client && <span>Cliente: {event.client}</span>}
                      {event.location && <span>Lugar: {event.location}</span>}
                      {event.technician && <span>Técnico: {event.technician}</span>}
                    </div>
                    {event.linkedItems && event.linkedItems.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {event.linkedItems.map((item) => (
                          <span
                            key={item.label}
                            className="rounded border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-[var(--color-text-secondary)]"
                          >
                            {item.label}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-xs font-medium text-[var(--color-text-primary)]">
                      {event.date}
                    </p>
                    <p className="text-xs text-[var(--color-text-muted)]">{event.time}</p>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Tab: Critical Assets ─────────────────────────────────────────────────────

function TabActivos() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-[var(--color-text-primary)]">Activos Críticos</h3>
        <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
          Estado, métricas y nivel de riesgo de los activos más importantes de la operación.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {criticalAssets.map((asset) => (
          <Card
            key={asset.id}
            className={cn("border p-5", healthBg(asset.health), healthBorder(asset.health))}
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <h4 className="font-semibold text-[var(--color-text-primary)]">{asset.name}</h4>
                <p className="text-xs text-[var(--color-text-secondary)]">{asset.type}</p>
              </div>
              <span
                className={cn(
                  "shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold",
                  healthBg(asset.health),
                  healthColor(asset.health),
                )}
              >
                {healthLabel(asset.health)}
              </span>
            </div>

            <div className="mt-3 space-y-1 text-xs text-[var(--color-text-muted)]">
              <p>Cliente: {asset.client}</p>
              <p>Ubicación: {asset.location}</p>
              <p>Último servicio: {asset.lastService}</p>
              <p>
                Próximo servicio:{" "}
                <span className={cn("font-medium", asset.health === "critical" && "text-red-400")}>
                  {asset.nextService}
                </span>
              </p>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2">
              {asset.metrics.map((m) => (
                <div
                  key={m.label}
                  className="rounded-lg border border-white/10 bg-white/5 p-2 text-center"
                >
                  <p className="text-sm font-bold text-[var(--color-text-primary)]">{m.value}</p>
                  <p className="text-xs text-[var(--color-text-muted)]">{m.unit}</p>
                  <p className="mt-0.5 text-xs leading-tight text-[var(--color-text-muted)]">
                    {m.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 text-xs font-medium",
                    riskBg(asset.riskLevel),
                    riskColor(asset.riskLevel),
                  )}
                >
                  Riesgo {asset.riskLevel}
                </span>
                {asset.alerts > 0 && (
                  <span className="rounded-full bg-red-400/10 px-2 py-0.5 text-xs font-medium text-red-400">
                    {asset.alerts} alerta{asset.alerts > 1 ? "s" : ""}
                  </span>
                )}
              </div>
              <button className="flex items-center gap-1 text-xs font-medium text-[var(--color-brand-primary)] hover:underline">
                Ver detalle <ChevronRight className="h-3 w-3" />
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ─── Tab: Latest Diagnostics ──────────────────────────────────────────────────

function TabDiagnosticos() {
  const statusLabel = (s: string) => {
    switch (s) {
      case "cerrado":
        return "Cerrado";
      case "en_revision":
        return "En revisión";
      case "pendiente":
        return "Pendiente";
      default:
        return s;
    }
  };
  const statusColor = (s: string) => {
    switch (s) {
      case "cerrado":
        return "text-emerald-400";
      case "en_revision":
        return "text-amber-400";
      case "pendiente":
        return "text-[var(--color-brand-primary)]";
      default:
        return "text-[var(--color-text-secondary)]";
    }
  };
  const statusBg = (s: string) => {
    switch (s) {
      case "cerrado":
        return "bg-emerald-400/10";
      case "en_revision":
        return "bg-amber-400/10";
      case "pendiente":
        return "bg-[var(--color-brand-primary)]/10";
      default:
        return "bg-white/5";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-[var(--color-text-primary)]">Últimos Diagnósticos</h3>
        <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
          Diagnósticos técnicos recientes con hallazgos, recomendaciones y estado de revisión.
        </p>
      </div>
      <div className="space-y-4">
        {diagnosticRecords.map((diag) => (
          <Card key={diag.id} className="border border-white/10 bg-white/[0.02] p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 rounded-lg bg-[var(--color-brand-accent)]/10 p-2">
                  <FlaskConical className="h-4 w-4 text-[var(--color-brand-accent)]" />
                </div>
                <div>
                  <h4 className="font-semibold text-[var(--color-text-primary)]">{diag.title}</h4>
                  <p className="mt-0.5 text-sm text-[var(--color-text-secondary)]">
                    {diag.summary}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-[var(--color-text-muted)]">
                    <span>Cliente: {diag.client}</span>
                    <span>Ubicación: {diag.location}</span>
                    <span>Fecha: {diag.date}</span>
                    <span>Técnico: {diag.technician}</span>
                    <span>Protocolo: {diag.protocol}</span>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-3">
                    <span className="rounded-lg border border-amber-400/20 bg-amber-400/5 px-2 py-1 text-xs font-medium text-amber-400">
                      {diag.findings} hallazgo{diag.findings !== 1 ? "s" : ""}
                    </span>
                    <span className="rounded-lg border border-[var(--color-brand-accent)]/20 bg-[var(--color-brand-accent)]/5 px-2 py-1 text-xs font-medium text-[var(--color-brand-accent)]">
                      {diag.recommendations} recomendación{diag.recommendations !== 1 ? "es" : ""}
                    </span>
                  </div>
                </div>
              </div>
              <div className="shrink-0">
                <span
                  className={cn(
                    "rounded-full px-2.5 py-1 text-xs font-semibold",
                    statusBg(diag.status),
                    statusColor(diag.status),
                  )}
                >
                  {statusLabel(diag.status)}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ─── Tab: Product Consumption ─────────────────────────────────────────────────

function TabProductos() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-[var(--color-text-primary)]">Consumo de Productos</h3>
        <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
          Consumo real vs. lo planificado por protocolo. Detecta desvíos y oportunidades de
          optimización.
        </p>
      </div>
      <div className="space-y-4">
        {productConsumption.map((prod) => {
          const isOver = prod.variance > 0;
          const absVar = Math.abs(prod.variance);
          const barWidth = Math.min((prod.consumed / (prod.planned * 1.5)) * 100, 100);
          const plannedBarWidth = Math.min((prod.planned / (prod.planned * 1.5)) * 100, 100);

          return (
            <Card
              key={prod.id}
              className={cn(
                "border p-5",
                isOver && prod.variance > 20
                  ? "border-amber-400/20 bg-amber-400/5"
                  : "border-white/10 bg-white/[0.02]",
              )}
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-start gap-3">
                  <div className={cn("mt-0.5 rounded-lg p-2", toneBg(prod.tone))}>
                    <Package className={cn("h-4 w-4", toneText(prod.tone))} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-semibold text-[var(--color-text-primary)]">
                      {prod.productName}
                    </h4>
                    <p className="text-xs text-[var(--color-text-secondary)]">{prod.category}</p>
                    <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-[var(--color-text-muted)]">
                      <span>
                        Consumido:{" "}
                        <strong className="text-[var(--color-text-primary)]">
                          {prod.consumed} {prod.unit}
                        </strong>
                      </span>
                      <span>
                        Planificado: {prod.planned} {prod.unit}
                      </span>
                      <span>Última compra: {prod.lastPurchase}</span>
                    </div>
                    {/* Progress bar */}
                    <div className="mt-3 space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[var(--color-text-muted)]">Consumo real</span>
                        <span
                          className={cn(
                            "font-medium",
                            isOver && prod.variance > 20 ? "text-amber-400" : "text-emerald-400",
                          )}
                        >
                          {isOver ? "+" : ""}
                          {prod.variance}%
                        </span>
                      </div>
                      <div className="relative h-2 w-full overflow-hidden rounded-full bg-white/10">
                        {/* Planned marker */}
                        <div
                          className="absolute top-0 bottom-0 left-0 rounded-full bg-white/20"
                          style={{ width: `${plannedBarWidth}%` }}
                        />
                        {/* Actual consumption bar */}
                        <div
                          className={cn(
                            "absolute top-0 bottom-0 left-0 rounded-full transition-all",
                            isOver && prod.variance > 20
                              ? "bg-amber-400"
                              : "bg-[var(--color-brand-primary)]",
                          )}
                          style={{ width: `${barWidth}%` }}
                        />
                      </div>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {prod.topClients.map((c) => (
                        <span
                          key={c}
                          className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-xs text-[var(--color-text-muted)]"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="shrink-0 text-right">
                  <TrendBadge trend={prod.trend} change={`${isOver ? "+" : ""}${absVar}%`} />
                  {isOver && prod.variance > 20 && (
                    <p className="mt-1 text-xs text-amber-400">Revisar protocolo</p>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

// ─── Tab: Environmental Indicators ───────────────────────────────────────────

function TabAmbiental() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-[var(--color-text-primary)]">
          Indicadores Ambientales
        </h3>
        <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
          Consumo hídrico, productos biodegradables, reducción química e índice de sostenibilidad.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {environmentalIndicators.map((ind) => (
          <Card key={ind.id} className={cn("border p-5", toneBg(ind.tone), toneBorder(ind.tone))}>
            <div className="flex items-start justify-between gap-2">
              <div className={cn("rounded-lg p-2", toneBg(ind.tone))}>
                <DynamicIcon name={ind.icon} className={cn("h-5 w-5", toneText(ind.tone))} />
              </div>
              <TrendBadge trend={ind.trend} change={ind.change} />
            </div>
            <div className="mt-3">
              <p className="text-xs text-[var(--color-text-secondary)]">{ind.label}</p>
              <div className="mt-1 flex items-baseline gap-1">
                <span className={cn("text-2xl font-black", toneText(ind.tone))}>{ind.value}</span>
                <span className="text-xs text-[var(--color-text-secondary)]">{ind.unit}</span>
              </div>
              <p className="mt-1 text-xs text-[var(--color-text-muted)]">{ind.description}</p>
              <p className="mt-2 text-xs font-medium text-emerald-400">{ind.target}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ─── Tab: Risks ───────────────────────────────────────────────────────────────

function TabRiesgos() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-[var(--color-text-primary)]">Análisis de Riesgos</h3>
        <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
          Riesgos identificados con probabilidad estimada, impacto potencial y plan de mitigación.
        </p>
      </div>
      <div className="space-y-4">
        {riskItems.map((risk) => (
          <Card
            key={risk.id}
            className={cn("border p-5", riskBg(risk.level), {
              "border-red-400/20": risk.level === "alto",
              "border-amber-400/20": risk.level === "medio",
              "border-emerald-400/20": risk.level === "bajo",
            })}
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="font-semibold text-[var(--color-text-primary)]">{risk.title}</h4>
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-xs font-semibold",
                      riskBg(risk.level),
                      riskColor(risk.level),
                    )}
                  >
                    Riesgo {risk.level}
                  </span>
                  {risk.aiGenerated && (
                    <span className="flex items-center gap-1 rounded-full bg-[var(--color-brand-accent)]/10 px-2 py-0.5 text-xs font-medium text-[var(--color-brand-accent)]">
                      <Sparkles className="h-3 w-3" /> OVI AI
                    </span>
                  )}
                </div>
                <p className="mt-0.5 text-xs text-[var(--color-text-secondary)]">{risk.category}</p>
                <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
                  {risk.description}
                </p>

                <div className="mt-4 grid gap-4 sm:grid-cols-3">
                  <div>
                    <p className="text-xs font-semibold tracking-wide text-[var(--color-text-muted)] uppercase">
                      Disparadores
                    </p>
                    <ul className="mt-1 space-y-1">
                      {risk.triggers.map((t) => (
                        <li
                          key={t}
                          className="flex items-start gap-1 text-xs text-[var(--color-text-secondary)]"
                        >
                          <span
                            className={cn(
                              "mt-1 h-1.5 w-1.5 shrink-0 rounded-full",
                              riskColor(risk.level) + " bg-current",
                            )}
                          />
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-semibold tracking-wide text-[var(--color-text-muted)] uppercase">
                      Mitigaciones
                    </p>
                    <ul className="mt-1 space-y-1">
                      {risk.mitigations.map((m) => (
                        <li
                          key={m}
                          className="flex items-start gap-1 text-xs text-[var(--color-text-secondary)]"
                        >
                          <CheckCircle className="mt-0.5 h-3 w-3 shrink-0 text-emerald-400" />
                          {m}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-[var(--color-text-muted)]">Probabilidad</p>
                      <div className="mt-1 h-2 w-full rounded-full bg-white/10">
                        <div
                          className={cn("h-full rounded-full", {
                            "bg-red-400": risk.level === "alto",
                            "bg-amber-400": risk.level === "medio",
                            "bg-emerald-400": risk.level === "bajo",
                          })}
                          style={{ width: `${risk.probability}%` }}
                        />
                      </div>
                      <p className={cn("mt-0.5 text-xs font-bold", riskColor(risk.level))}>
                        {risk.probability}%
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-[var(--color-text-muted)]">Impacto</p>
                      <div className="mt-1 h-2 w-full rounded-full bg-white/10">
                        <div
                          className={cn("h-full rounded-full", {
                            "bg-red-400": risk.level === "alto",
                            "bg-amber-400": risk.level === "medio",
                            "bg-emerald-400": risk.level === "bajo",
                          })}
                          style={{ width: `${risk.impact}%` }}
                        />
                      </div>
                      <p className={cn("mt-0.5 text-xs font-bold", riskColor(risk.level))}>
                        {risk.impact}%
                      </p>
                    </div>
                    <div className="text-xs text-[var(--color-text-muted)]">
                      <span>Responsable: </span>
                      <span className="text-[var(--color-text-secondary)]">{risk.owner}</span>
                    </div>
                    <div className="text-xs text-[var(--color-text-muted)]">
                      <span>Plazo: </span>
                      <span className={cn("font-medium", riskColor(risk.level))}>
                        {risk.dueDate}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ─── Tab: AI Recommendations ──────────────────────────────────────────────────

function TabRecomendaciones() {
  const priorityLabel = (p: string) => {
    switch (p) {
      case "urgente":
        return "Urgente";
      case "alta":
        return "Alta";
      case "media":
        return "Media";
      case "baja":
        return "Baja";
      default:
        return p;
    }
  };
  const priorityColor = (p: string) => {
    switch (p) {
      case "urgente":
        return "text-red-400";
      case "alta":
        return "text-amber-400";
      case "media":
        return "text-[var(--color-brand-primary)]";
      case "baja":
        return "text-emerald-400";
      default:
        return "text-[var(--color-text-secondary)]";
    }
  };
  const priorityBg = (p: string) => {
    switch (p) {
      case "urgente":
        return "bg-red-400/10";
      case "alta":
        return "bg-amber-400/10";
      case "media":
        return "bg-[var(--color-brand-primary)]/10";
      case "baja":
        return "bg-emerald-400/10";
      default:
        return "bg-white/5";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-[var(--color-text-primary)]">
          Recomendaciones de OVI AI
        </h3>
        <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
          Riesgos detectados, acciones sugeridas, próximos pasos y buenas prácticas. Priorizadas y
          justificadas por inteligencia artificial.
        </p>
      </div>
      <div className="space-y-6">
        {aiRecommendations.map((rec) => (
          <Card
            key={rec.id}
            className={cn("border p-5", priorityBg(rec.priority), {
              "border-red-400/20": rec.priority === "urgente",
              "border-amber-400/20": rec.priority === "alta",
              "border-[var(--color-brand-primary)]/20": rec.priority === "media",
              "border-emerald-400/20": rec.priority === "baja",
            })}
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 rounded-lg bg-[var(--color-brand-accent)]/10 p-2">
                  <Sparkles className="h-4 w-4 text-[var(--color-brand-accent)]" />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="font-semibold text-[var(--color-text-primary)]">{rec.title}</h4>
                    <span
                      className={cn(
                        "rounded-full px-2 py-0.5 text-xs font-semibold",
                        priorityBg(rec.priority),
                        priorityColor(rec.priority),
                      )}
                    >
                      {priorityLabel(rec.priority)}
                    </span>
                  </div>
                  <p className="text-xs text-[var(--color-text-secondary)]">{rec.category}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-[var(--color-text-muted)]">
                <span>Confianza: </span>
                <span
                  className={cn(
                    "font-bold",
                    rec.confidence >= 80
                      ? "text-emerald-400"
                      : rec.confidence >= 60
                        ? "text-amber-400"
                        : "text-[var(--color-brand-primary)]",
                  )}
                >
                  {rec.confidence}%
                </span>
              </div>
            </div>

            <div className="mt-3">
              <p className="text-sm text-[var(--color-text-secondary)]">{rec.rationale}</p>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              <div>
                <p className="mb-2 text-xs font-semibold tracking-wide text-[var(--color-text-muted)] uppercase">
                  Acciones sugeridas
                </p>
                <ul className="space-y-1.5">
                  {rec.suggestedActions.map((action) => (
                    <li
                      key={action}
                      className="flex items-start gap-1.5 text-xs text-[var(--color-text-secondary)]"
                    >
                      <Zap className={cn("mt-0.5 h-3 w-3 shrink-0", priorityColor(rec.priority))} />
                      {action}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="mb-2 text-xs font-semibold tracking-wide text-[var(--color-text-muted)] uppercase">
                  Próximos pasos
                </p>
                <ul className="space-y-1.5">
                  {rec.nextSteps.map((step) => (
                    <li
                      key={step}
                      className="flex items-start gap-1.5 text-xs text-[var(--color-text-secondary)]"
                    >
                      <ChevronRight className="mt-0.5 h-3 w-3 shrink-0 text-[var(--color-brand-primary)]" />
                      {step}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="mb-2 text-xs font-semibold tracking-wide text-[var(--color-text-muted)] uppercase">
                  Buenas prácticas
                </p>
                <ul className="space-y-1.5">
                  {rec.bestPractices.map((bp) => (
                    <li
                      key={bp}
                      className="flex items-start gap-1.5 text-xs text-[var(--color-text-secondary)]"
                    >
                      <CheckCircle className="mt-0.5 h-3 w-3 shrink-0 text-emerald-400" />
                      {bp}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
              <div>
                <p className="text-xs text-[var(--color-text-muted)]">
                  Beneficio estimado:{" "}
                  <span className="font-medium text-emerald-400">{rec.estimatedBenefit}</span>
                </p>
                <div className="mt-1 flex flex-wrap gap-1">
                  {rec.relatedModules.map((mod) => (
                    <span
                      key={mod}
                      className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-xs text-[var(--color-text-muted)]"
                    >
                      {mod}
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-xs text-[var(--color-text-muted)]">Generado: {rec.generatedAt}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ─── Tab: Global Search ───────────────────────────────────────────────────────

function TabBuscador() {
  const { searchQuery, setSearchQuery } = useOviCommandCenterStore();

  const filtered =
    searchQuery.trim().length > 0
      ? searchResultsDemo.filter(
          (r) =>
            r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            r.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
            r.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())),
        )
      : searchResultsDemo;

  const categoryColor = (cat: SearchCategory): string => {
    switch (cat) {
      case "proyecto":
        return "text-[var(--color-brand-primary)]";
      case "activo":
        return "text-amber-400";
      case "producto":
        return "text-emerald-400";
      case "protocolo":
        return "text-[var(--color-brand-accent)]";
      case "cliente":
        return "text-[var(--color-brand-primary)]";
      case "documento":
        return "text-[var(--color-text-secondary)]";
      case "diagnostico":
        return "text-[var(--color-brand-accent)]";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-[var(--color-text-primary)]">Búsqueda Global</h3>
        <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
          Localiza proyectos, activos, productos, protocolos, clientes, documentos y diagnósticos
          desde un único punto.
        </p>
      </div>

      {/* Search input */}
      <div className="relative">
        <Search className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-[var(--color-text-muted)]" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Buscar en todo el ecosistema OVI..."
          className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-3 pr-10 pl-11 text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] transition-colors outline-none focus:border-[var(--color-brand-primary)]/50 focus:bg-white/[0.06]"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute top-1/2 right-4 -translate-y-1/2 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Category pills */}
      <div className="flex flex-wrap gap-2">
        {(
          [
            "proyecto",
            "activo",
            "producto",
            "protocolo",
            "cliente",
            "documento",
            "diagnostico",
          ] as SearchCategory[]
        ).map((cat) => (
          <button
            key={cat}
            onClick={() => setSearchQuery(cat)}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-[var(--color-text-secondary)] transition-colors hover:border-[var(--color-brand-primary)]/30 hover:text-[var(--color-brand-primary)]"
          >
            {searchCategoryLabel(cat)}
          </button>
        ))}
      </div>

      {/* Results */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <p className="py-8 text-center text-sm text-[var(--color-text-muted)]">
            No se encontraron resultados para &ldquo;{searchQuery}&rdquo;.
          </p>
        ) : (
          filtered.map((result) => (
            <Link key={result.id} href={result.href}>
              <Card className="group border border-white/10 bg-white/[0.02] p-4 transition-colors hover:border-[var(--color-brand-primary)]/30 hover:bg-white/[0.04]">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 rounded-lg bg-white/5 p-2">
                    <DynamicIcon
                      name={result.icon}
                      className={cn("h-4 w-4", categoryColor(result.category))}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-medium text-[var(--color-text-primary)] group-hover:text-[var(--color-brand-primary)]">
                        {result.title}
                      </span>
                      <span
                        className={cn(
                          "rounded-full bg-white/5 px-2 py-0.5 text-xs font-medium",
                          categoryColor(result.category),
                        )}
                      >
                        {searchCategoryLabel(result.category)}
                      </span>
                    </div>
                    <p className="mt-0.5 text-sm text-[var(--color-text-secondary)]">
                      {result.subtitle}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {result.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-xs text-[var(--color-text-muted)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-xs text-[var(--color-text-muted)]">
                      Relevancia {result.relevance}%
                    </p>
                    <ChevronRight className="mt-1 ml-auto h-4 w-4 text-[var(--color-text-muted)] group-hover:text-[var(--color-brand-primary)]" />
                  </div>
                </div>
              </Card>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

// ─── Tab: Architecture ────────────────────────────────────────────────────────

function TabArquitectura() {
  const statusLabel = (s: string) => {
    switch (s) {
      case "activo":
        return "Activo";
      case "en_desarrollo":
        return "En desarrollo";
      case "planificado":
        return "Planificado";
      default:
        return s;
    }
  };
  const statusColor = (s: string) => {
    switch (s) {
      case "activo":
        return "text-emerald-400";
      case "en_desarrollo":
        return "text-amber-400";
      case "planificado":
        return "text-[var(--color-brand-primary)]";
      default:
        return "text-[var(--color-text-secondary)]";
    }
  };
  const horizonLabel = (h: string) => {
    switch (h) {
      case "corto":
        return "Corto plazo";
      case "medio":
        return "Mediano plazo";
      case "largo":
        return "Largo plazo";
      default:
        return h;
    }
  };
  const horizonColor = (h: string) => {
    switch (h) {
      case "corto":
        return "text-emerald-400 bg-emerald-400/10";
      case "medio":
        return "text-amber-400 bg-amber-400/10";
      case "largo":
        return "text-[var(--color-brand-primary)] bg-[var(--color-brand-primary)]/10";
      default:
        return "text-[var(--color-text-secondary)] bg-white/5";
    }
  };

  return (
    <div className="space-y-10">
      {/* Integration modules */}
      <div>
        <h3 className="mb-2 text-lg font-bold text-[var(--color-text-primary)]">
          Módulos Integrados
        </h3>
        <p className="mb-6 text-sm text-[var(--color-text-secondary)]">
          OVI Command Center actúa como la capa de unificación sobre todo el ecosistema OVI. Cada
          módulo aporta datos en tiempo real para construir la vista ejecutiva integral.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {integrationModules.map((mod) => (
            <Link key={mod.id} href={mod.href}>
              <Card className="group h-full border border-white/10 bg-white/[0.02] p-5 transition-colors hover:border-[var(--color-brand-primary)]/30 hover:bg-white/[0.04]">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <DynamicIcon
                      name={mod.icon}
                      className="h-5 w-5"
                      style={{ color: mod.color } as React.CSSProperties}
                    />
                    <h4 className="font-semibold text-[var(--color-text-primary)] group-hover:text-[var(--color-brand-primary)]">
                      {mod.name}
                    </h4>
                  </div>
                  <span className={cn("text-xs font-medium", statusColor(mod.status))}>
                    {statusLabel(mod.status)}
                  </span>
                </div>
                <p className="mt-2 text-sm text-[var(--color-text-secondary)]">{mod.description}</p>
                <div className="mt-3 space-y-1">
                  {mod.dataFlows.map((flow) => (
                    <div
                      key={flow}
                      className="flex items-center gap-2 text-xs text-[var(--color-text-muted)]"
                    >
                      <span className="h-1 w-1 rounded-full bg-[var(--color-brand-primary)]" />
                      {flow}
                    </div>
                  ))}
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Future capabilities */}
      <div>
        <h3 className="mb-2 text-lg font-bold text-[var(--color-text-primary)]">
          Capacidades Futuras
        </h3>
        <p className="mb-6 text-sm text-[var(--color-text-secondary)]">
          OVI Command Center está diseñado para escalar a múltiples plantas, países y empresas, con
          monitoreo en tiempo real, IoT y gemelos digitales.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {futureCapabilities.map((cap) => (
            <Card key={cap.id} className="border border-white/10 bg-white/[0.02] p-5">
              <div className="flex items-start justify-between gap-2">
                <div className="rounded-lg bg-[var(--color-brand-primary)]/10 p-2">
                  <DynamicIcon
                    name={cap.icon}
                    className="h-4 w-4 text-[var(--color-brand-primary)]"
                  />
                </div>
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 text-xs font-medium",
                    horizonColor(cap.horizon),
                  )}
                >
                  {horizonLabel(cap.horizon)}
                </span>
              </div>
              <h4 className="mt-3 font-semibold text-[var(--color-text-primary)]">{cap.title}</h4>
              <p className="mt-1 text-sm text-[var(--color-text-secondary)]">{cap.description}</p>
              <p className="mt-2 text-xs text-[var(--color-text-muted)]">{cap.category}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* Architecture summary */}
      <Card className="border border-[var(--color-brand-primary)]/20 bg-[var(--color-brand-primary)]/5 p-6">
        <div className="flex items-start gap-4">
          <div className="rounded-xl bg-[var(--color-brand-primary)]/10 p-3">
            <Globe className="h-6 w-6 text-[var(--color-brand-primary)]" />
          </div>
          <div>
            <h4 className="font-bold text-[var(--color-text-primary)]">
              Principios de Arquitectura
            </h4>
            <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {[
                "Arquitectura modular y extensible",
                "Integración con todos los módulos OVI",
                "Información centralizada en tiempo real",
                "Rendimiento optimizado",
                "Preparado para crecimiento global",
                "Multiempresa y multipaís",
                "Compatible con sensores IoT",
                "Inteligencia artificial integrada",
                "Seguridad y trazabilidad completa",
              ].map((principle) => (
                <div
                  key={principle}
                  className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]"
                >
                  <CheckCircle className="h-4 w-4 shrink-0 text-[var(--color-brand-primary)]" />
                  {principle}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

// ─── Main Page Component ──────────────────────────────────────────────────────

export function OviCommandCenterPage() {
  const { activeTab, setActiveTab } = useOviCommandCenterStore();

  return (
    <main id="main-content" className="min-h-screen bg-[var(--color-bg-primary)] pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-[var(--color-brand-primary)]/10 p-3">
              <Activity className="h-7 w-7 text-[var(--color-brand-primary)]" />
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-tight text-[var(--color-text-primary)] md:text-4xl">
                OVI <span className="text-[var(--color-brand-primary)]">Command Center</span>
              </h1>
              <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                Centro de Control Inteligente · Work Order 012
              </p>
            </div>
          </div>
          <p className="mt-4 max-w-3xl text-[var(--color-text-secondary)]">
            Visión integral de toda la operación. Unifica OVI OS, OVI Field, OVI AI, OVI Store, OVI
            Lab y OVI Analytics en una única vista ejecutiva. Responde en menos de 10 segundos:
            <em className="ml-1 text-[var(--color-brand-primary)]">
              &ldquo;¿Mi operación está funcionando correctamente?&rdquo;
            </em>
          </p>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          {/* Tab List */}
          <div className="mb-8 overflow-x-auto">
            <TabsList className="inline-flex min-w-max gap-1 rounded-xl border border-white/10 bg-white/5 p-1">
              {moduleTabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className={cn(
                      "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all",
                      "text-[var(--color-text-secondary)]",
                      "hover:text-[var(--color-text-primary)]",
                      "data-[state=active]:bg-[var(--color-brand-primary)]/15",
                      "data-[state=active]:text-[var(--color-brand-primary)]",
                    )}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    <span className="hidden whitespace-nowrap sm:inline">{tab.label}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </div>

          {/* Tab summaries (description row) */}
          <div className="mb-8">
            {moduleTabs.map((tab) => (
              <TabsContent key={tab.value} value={tab.value} className="mt-0">
                <p className="text-sm text-[var(--color-text-muted)]">{tab.summary}</p>
              </TabsContent>
            ))}
          </div>

          {/* Tab content */}
          <TabsContent value="ejecutivo">
            <TabEjecutivo />
          </TabsContent>
          <TabsContent value="alertas">
            <TabAlertas />
          </TabsContent>
          <TabsContent value="timeline">
            <TabTimeline />
          </TabsContent>
          <TabsContent value="activos">
            <TabActivos />
          </TabsContent>
          <TabsContent value="diagnosticos">
            <TabDiagnosticos />
          </TabsContent>
          <TabsContent value="productos">
            <TabProductos />
          </TabsContent>
          <TabsContent value="ambiental">
            <TabAmbiental />
          </TabsContent>
          <TabsContent value="riesgos">
            <TabRiesgos />
          </TabsContent>
          <TabsContent value="recomendaciones">
            <TabRecomendaciones />
          </TabsContent>
          <TabsContent value="buscador">
            <TabBuscador />
          </TabsContent>
          <TabsContent value="arquitectura">
            <TabArquitectura />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
