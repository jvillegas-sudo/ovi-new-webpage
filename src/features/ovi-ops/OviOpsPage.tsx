"use client";

/**
 * OVI OPS — Digital Operations Platform
 * Work Order 010
 *
 * El puente entre el conocimiento y la ejecución.
 * Transforma diagnósticos en proyectos operativos ejecutados con
 * calidad, trazabilidad y evidencia.
 *
 * Tabs:
 *   dashboard     — KPIs operativos + flujo general OVI OPS
 *   clientes      — Directorio de clientes y sus proyectos
 *   proyectos     — Gestión de proyectos operativos
 *   contratos     — Contratos y acuerdos de servicio
 *   ordenes       — Órdenes de trabajo (creación, asignación, seguimiento)
 *   ejecucion     — Registro de ejecución en campo
 *   evidencias    — Repositorio de evidencias por orden
 *   calidad       — Control de calidad y aprobaciones
 *   reportes      — Generación y consulta de reportes
 *   arquitectura  — Arquitectura de módulos, integraciones y capacidades futuras
 */

import {
  BarChart3,
  Brain,
  Building2,
  CheckCircle,
  ChevronRight,
  ClipboardList,
  Clock,
  Cpu,
  Database,
  FileText,
  FolderOpen,
  Globe,
  Layers,
  MapPin,
  Monitor,
  Package,
  Radio,
  ShieldCheck,
  Smartphone,
  Star,
  TrendingDown,
  TrendingUp,
  Users,
  Wrench,
  Zap,
} from "lucide-react";
import { Card, Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui";
import { cn } from "@utils/cn";
import {
  materialsConsumed,
  opsDashboardKpis,
  opsArchPillars,
  opsClients,
  opsContracts,
  opsEvidences,
  opsFutureCapabilities,
  opsFlowSteps,
  opsPersonnel,
  opsProjects,
  opsReports,
  opsTeams,
  opsWorkOrders,
  qualityChecks,
  executionEvents,
  type OpsTone,
  type ProjectStatus,
  type WorkOrderStatus,
  type QualityResult,
} from "./ovi-ops-data";
import { useOviOpsStore } from "@store/ovi-ops.store";

// ─── Icon resolver ────────────────────────────────────────────────────────────

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  BarChart3,
  Brain,
  Building2,
  CheckCircle,
  ClipboardList,
  Clock,
  Cpu,
  Database,
  FileText,
  FolderOpen,
  Globe,
  Layers,
  MapPin,
  Monitor,
  Package,
  Radio,
  ShieldCheck,
  Smartphone,
  Star,
  Users,
  Wrench,
  Zap,
};

function DynIcon({ name, className }: { name: string; className?: string }) {
  const Icon = ICON_MAP[name] ?? Zap;
  return <Icon className={className ?? ""} />;
}

// ─── Tone helpers ─────────────────────────────────────────────────────────────

function toneClasses(tone: OpsTone) {
  switch (tone) {
    case "accent":
      return {
        border: "border-[rgba(0,255,133,0.28)]",
        badge: "bg-[rgba(0,255,133,0.14)] text-[var(--color-brand-accent)]",
        dot: "bg-[var(--color-brand-accent)]",
        text: "text-[var(--color-brand-accent)]",
        icon: "text-[var(--color-brand-accent)]",
      };
    case "warning":
      return {
        border: "border-[rgba(255,165,0,0.28)]",
        badge: "bg-[rgba(255,165,0,0.14)] text-[var(--color-brand-warning,#f90)]",
        dot: "bg-[var(--color-brand-warning,#f90)]",
        text: "text-[var(--color-brand-warning,#f90)]",
        icon: "text-[var(--color-brand-warning,#f90)]",
      };
    case "danger":
      return {
        border: "border-[rgba(255,60,60,0.28)]",
        badge: "bg-[rgba(255,60,60,0.14)] text-red-400",
        dot: "bg-red-400",
        text: "text-red-400",
        icon: "text-red-400",
      };
    case "eco":
      return {
        border: "border-[rgba(80,230,100,0.28)]",
        badge: "bg-[rgba(80,230,100,0.14)] text-green-400",
        dot: "bg-green-400",
        text: "text-green-400",
        icon: "text-green-400",
      };
    case "neutral":
      return {
        border: "border-white/10",
        badge: "bg-white/10 text-white/70",
        dot: "bg-white/40",
        text: "text-white/70",
        icon: "text-white/50",
      };
    default: // primary
      return {
        border: "border-[rgba(0,196,255,0.28)]",
        badge: "bg-[rgba(0,196,255,0.14)] text-[var(--color-brand-primary)]",
        dot: "bg-[var(--color-brand-primary)]",
        text: "text-[var(--color-brand-primary)]",
        icon: "text-[var(--color-brand-primary)]",
      };
  }
}

function statusColor(status: ProjectStatus | WorkOrderStatus | string): string {
  const map: Record<string, string> = {
    "En ejecución": "bg-[rgba(0,255,133,0.18)] text-[var(--color-brand-accent)]",
    Activo: "bg-[rgba(0,196,255,0.14)] text-[var(--color-brand-primary)]",
    Aprobado: "bg-[rgba(0,196,255,0.14)] text-[var(--color-brand-primary)]",
    Completado: "bg-white/10 text-white/60",
    Cerrado: "bg-white/8 text-white/50",
    Pendiente: "bg-[rgba(255,165,0,0.18)] text-[var(--color-brand-warning,#f90)]",
    Asignada: "bg-[rgba(0,196,255,0.14)] text-[var(--color-brand-primary)]",
    "En pausa": "bg-[rgba(255,165,0,0.18)] text-[var(--color-brand-warning,#f90)]",
    Borrador: "bg-white/8 text-white/50",
    Planificación: "bg-[rgba(0,196,255,0.14)] text-[var(--color-brand-primary)]",
    "Control de calidad": "bg-[rgba(255,165,0,0.18)] text-[var(--color-brand-warning,#f90)]",
    Diagnóstico: "bg-[rgba(0,196,255,0.14)] text-[var(--color-brand-primary)]",
    Entrega: "bg-[rgba(0,255,133,0.14)] text-[var(--color-brand-accent)]",
    Suspendido: "bg-red-900/20 text-red-400",
    Completada: "bg-white/10 text-white/60",
    Cerrada: "bg-white/8 text-white/50",
  };
  return map[status] ?? "bg-white/10 text-white/60";
}

function qualityResultColor(result: QualityResult): string {
  const map: Record<QualityResult, string> = {
    Aprobado: "bg-[rgba(0,255,133,0.18)] text-[var(--color-brand-accent)]",
    "Aprobado con observaciones":
      "bg-[rgba(255,165,0,0.18)] text-[var(--color-brand-warning,#f90)]",
    Rechazado: "bg-red-900/20 text-red-400",
    Pendiente: "bg-white/8 text-white/50",
  };
  return map[result] ?? "bg-white/10 text-white/60";
}

// ─── Section header ───────────────────────────────────────────────────────────

function SectionHeader({
  icon,
  title,
  subtitle,
  badge,
  tone = "primary",
}: {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  badge?: string;
  tone?: OpsTone;
}) {
  const t = toneClasses(tone);
  return (
    <div className="mb-6 flex items-start gap-4">
      <div
        className={cn(
          "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border",
          t.border,
          "bg-white/5",
        )}
      >
        <span className={t.icon}>{icon}</span>
      </div>
      <div className="flex-1">
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="text-xl font-bold text-white">{title}</h2>
          {badge && (
            <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-semibold", t.badge)}>
              {badge}
            </span>
          )}
        </div>
        {subtitle && <p className="mt-0.5 text-sm text-white/55">{subtitle}</p>}
      </div>
    </div>
  );
}

// ─── KPI Card ─────────────────────────────────────────────────────────────────

function KpiCard({
  label,
  value,
  unit,
  change,
  trend,
  tone,
  icon,
  description,
}: {
  label: string;
  value: string;
  unit?: string;
  change: string;
  trend: "up" | "down" | "stable";
  tone: OpsTone;
  icon: string;
  description: string;
}) {
  const t = toneClasses(tone);
  return (
    <Card className={cn("glass border p-5 transition-all duration-200 hover:bg-white/8", t.border)}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 space-y-2">
          <p className="text-xs font-medium tracking-wider text-white/50 uppercase">{label}</p>
          <div className="flex items-baseline gap-1.5">
            <span className={cn("text-3xl font-bold", t.text)}>{value}</span>
            {unit && <span className="text-xs text-white/40">{unit}</span>}
          </div>
          <div className="flex items-center gap-1.5">
            {trend === "up" && (
              <TrendingUp className="h-3.5 w-3.5 text-[var(--color-brand-accent)]" />
            )}
            {trend === "down" && (
              <TrendingDown className="h-3.5 w-3.5 text-[var(--color-brand-primary)]" />
            )}
            <span className="text-xs text-white/40">{change}</span>
          </div>
        </div>
        <div
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border",
            t.border,
            "bg-white/5",
          )}
        >
          <DynIcon name={icon} className={cn("h-5 w-5", t.icon)} />
        </div>
      </div>
      <p className="mt-3 text-xs text-white/35">{description}</p>
    </Card>
  );
}

// ─── Tab: Dashboard ───────────────────────────────────────────────────────────

function TabDashboard() {
  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl border border-[rgba(0,196,255,0.2)] bg-[rgba(0,196,255,0.04)] p-8">
        <div className="absolute inset-0 bg-gradient-to-br from-[rgba(0,196,255,0.06)] via-transparent to-transparent" />
        <div className="relative">
          <div className="mb-2 flex items-center gap-2">
            <span className="rounded-full border border-[rgba(0,196,255,0.3)] bg-[rgba(0,196,255,0.1)] px-3 py-0.5 text-xs font-semibold text-[var(--color-brand-primary)]">
              OVI OPS — WO-010
            </span>
            <span className="rounded-full border border-[rgba(0,255,133,0.3)] bg-[rgba(0,255,133,0.1)] px-3 py-0.5 text-xs font-semibold text-[var(--color-brand-accent)]">
              Plataforma activa
            </span>
          </div>
          <h1 className="mb-2 text-3xl font-black tracking-tight text-white">OVI OPS</h1>
          <p className="max-w-2xl text-sm leading-relaxed text-white/60">
            Plataforma de Operaciones Digitales — El puente entre el diagnóstico y la ejecución.
            Transforma soluciones aprobadas en proyectos operativos ejecutados con calidad,
            trazabilidad y evidencia.
          </p>
        </div>
      </div>

      {/* KPIs */}
      <div>
        <h3 className="mb-4 text-xs font-semibold tracking-widest text-white/40 uppercase">
          Indicadores operativos
        </h3>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {opsDashboardKpis.map((kpi) => (
            <KpiCard key={kpi.id} {...kpi} />
          ))}
        </div>
      </div>

      {/* Operational flow */}
      <div>
        <h3 className="mb-4 text-xs font-semibold tracking-widest text-white/40 uppercase">
          Flujo operativo OVI OPS
        </h3>
        <div className="relative grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-9">
          {opsFlowSteps.map((step, idx) => {
            const t = toneClasses(step.tone);
            return (
              <div key={step.id} className="relative flex flex-col items-center gap-2 text-center">
                <div
                  className={cn(
                    "flex h-11 w-11 items-center justify-center rounded-full border text-xs font-black",
                    t.border,
                    t.badge,
                  )}
                >
                  {step.step}
                </div>
                <p className="text-xs font-semibold text-white/80">{step.label}</p>
                <p className="hidden text-[10px] leading-relaxed text-white/40 lg:block">
                  {step.module}
                </p>
                {idx < opsFlowSteps.length - 1 && (
                  <ChevronRight className="absolute top-3 -right-1.5 hidden h-4 w-4 text-white/20 lg:block" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick summary cards */}
      <div className="grid gap-4 lg:grid-cols-3">
        {/* Active projects */}
        <Card className="glass border border-[rgba(0,196,255,0.2)] p-5">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-xs font-semibold tracking-wider text-white/50 uppercase">
              Proyectos activos
            </p>
            <FolderOpen className="h-4 w-4 text-[var(--color-brand-primary)]" />
          </div>
          <div className="space-y-2">
            {opsProjects.slice(0, 3).map((p) => (
              <div key={p.id} className="flex items-center justify-between gap-2">
                <p className="truncate text-xs text-white/70">{p.name.slice(0, 38)}…</p>
                <span
                  className={cn(
                    "shrink-0 rounded px-2 py-0.5 text-[10px] font-semibold",
                    statusColor(p.status),
                  )}
                >
                  {p.status}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Active work orders */}
        <Card className="glass border border-[rgba(0,255,133,0.2)] p-5">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-xs font-semibold tracking-wider text-white/50 uppercase">
              Órdenes recientes
            </p>
            <ClipboardList className="h-4 w-4 text-[var(--color-brand-accent)]" />
          </div>
          <div className="space-y-2">
            {opsWorkOrders.map((wo) => (
              <div key={wo.id} className="flex items-center justify-between gap-2">
                <p className="truncate text-xs text-white/70">{wo.id}</p>
                <span
                  className={cn(
                    "shrink-0 rounded px-2 py-0.5 text-[10px] font-semibold",
                    statusColor(wo.status),
                  )}
                >
                  {wo.status}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Teams availability */}
        <Card className="glass border border-white/10 p-5">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-xs font-semibold tracking-wider text-white/50 uppercase">
              Equipos de campo
            </p>
            <Users className="h-4 w-4 text-white/40" />
          </div>
          <div className="space-y-2">
            {opsTeams.map((team) => {
              const availColor =
                team.availability === "Disponible"
                  ? "text-[var(--color-brand-accent)]"
                  : team.availability === "Asignado"
                    ? "text-[var(--color-brand-primary)]"
                    : "text-white/40";
              return (
                <div key={team.id} className="flex items-center justify-between gap-2">
                  <p className="truncate text-xs text-white/70">{team.name}</p>
                  <span className={cn("shrink-0 text-[10px] font-semibold", availColor)}>
                    {team.availability}
                  </span>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}

// ─── Tab: Clients ─────────────────────────────────────────────────────────────

function TabClientes() {
  return (
    <div className="space-y-6">
      <SectionHeader
        icon={<Building2 className="h-5 w-5" />}
        title="Clientes"
        subtitle="Directorio de clientes con proyectos y contratos activos"
        badge={`${opsClients.length} clientes`}
        tone="primary"
      />
      <div className="grid gap-4 md:grid-cols-2">
        {opsClients.map((client) => {
          const t = toneClasses(client.tone);
          return (
            <Card
              key={client.id}
              className={cn("glass border p-5 transition-all hover:bg-white/8", t.border)}
            >
              <div className="mb-3 flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={cn("font-mono text-[10px] font-semibold", t.text)}>
                      {client.id}
                    </span>
                    <span
                      className={cn(
                        "rounded px-2 py-0.5 text-[10px] font-semibold",
                        statusColor(client.status),
                      )}
                    >
                      {client.status}
                    </span>
                  </div>
                  <p className="mt-1 text-sm font-bold text-white">{client.name}</p>
                  <p className="text-xs text-white/50">{client.legalName}</p>
                </div>
                <div
                  className={cn(
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border",
                    t.border,
                    "bg-white/5",
                  )}
                >
                  <Building2 className={cn("h-5 w-5", t.icon)} />
                </div>
              </div>

              <div className="mb-3 grid grid-cols-2 gap-2 text-xs">
                <div>
                  <p className="text-white/40">Industria</p>
                  <p className="font-medium text-white/80">{client.industry}</p>
                </div>
                <div>
                  <p className="text-white/40">Ubicación</p>
                  <p className="font-medium text-white/80">
                    {client.city}, {client.country}
                  </p>
                </div>
                <div>
                  <p className="text-white/40">Proyectos activos</p>
                  <p className={cn("font-bold", t.text)}>{client.activeProjects}</p>
                </div>
                <div>
                  <p className="text-white/40">Servicios totales</p>
                  <p className="font-medium text-white/80">{client.totalServices}</p>
                </div>
              </div>

              <div className={cn("rounded-lg border p-2.5", t.border, "bg-white/3")}>
                <p className="text-[10px] text-white/40">Contacto principal</p>
                <p className="text-xs font-semibold text-white/80">{client.contactName}</p>
                <p className="text-[10px] text-white/50">{client.contactEmail}</p>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

// ─── Tab: Projects ────────────────────────────────────────────────────────────

function TabProyectos() {
  return (
    <div className="space-y-6">
      <SectionHeader
        icon={<FolderOpen className="h-5 w-5" />}
        title="Proyectos"
        subtitle="Proyectos operativos generados desde diagnósticos aprobados"
        badge={`${opsProjects.length} proyectos`}
        tone="primary"
      />
      <div className="space-y-4">
        {opsProjects.map((project) => {
          const t = toneClasses(project.tone);
          const client = opsClients.find((c) => c.id === project.clientId);
          const pct =
            project.workOrders > 0
              ? Math.round((project.completedOrders / project.workOrders) * 100)
              : 0;
          return (
            <Card
              key={project.id}
              className={cn("glass border p-5 transition-all hover:bg-white/8", t.border)}
            >
              <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="mb-1.5 flex flex-wrap items-center gap-2">
                    <span className={cn("font-mono text-[10px] font-semibold", t.text)}>
                      {project.id}
                    </span>
                    {project.diagnosticId && (
                      <span className="rounded bg-white/8 px-2 py-0.5 font-mono text-[10px] text-white/50">
                        ← {project.diagnosticId}
                      </span>
                    )}
                    <span
                      className={cn(
                        "rounded px-2 py-0.5 text-[10px] font-semibold",
                        statusColor(project.status),
                      )}
                    >
                      {project.status}
                    </span>
                  </div>
                  <p className="text-sm font-bold text-white">{project.name}</p>
                  {client && (
                    <p className="text-xs text-white/50">
                      {client.name} · {client.city}
                    </p>
                  )}
                </div>
              </div>

              <div className="mb-4 grid grid-cols-2 gap-3 text-xs md:grid-cols-4">
                <div>
                  <p className="text-white/40">Industria</p>
                  <p className="font-medium text-white/80">{project.industry}</p>
                </div>
                <div>
                  <p className="text-white/40">Responsable</p>
                  <p className="font-medium text-white/80">{project.responsible}</p>
                </div>
                <div>
                  <p className="text-white/40">Inicio</p>
                  <p className="font-medium text-white/80">{project.startDate}</p>
                </div>
                <div>
                  <p className="text-white/40">Fin</p>
                  <p className="font-medium text-white/80">{project.endDate}</p>
                </div>
              </div>

              <p className="mb-4 text-xs leading-relaxed text-white/55">{project.objective}</p>

              <div className="flex items-center justify-between gap-3">
                <div className="flex-1">
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-[10px] text-white/40">
                      Órdenes completadas: {project.completedOrders}/{project.workOrders}
                    </span>
                    <span className={cn("text-xs font-bold", t.text)}>{pct}%</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                    <div
                      className={cn("h-full rounded-full transition-all", t.dot)}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

// ─── Tab: Contracts ───────────────────────────────────────────────────────────

function TabContratos() {
  return (
    <div className="space-y-6">
      <SectionHeader
        icon={<FileText className="h-5 w-5" />}
        title="Contratos"
        subtitle="Acuerdos de servicio por cliente y tipo de contrato"
        badge={`${opsContracts.length} contratos`}
        tone="primary"
      />
      <div className="grid gap-4 md:grid-cols-2">
        {opsContracts.map((contract) => {
          const t = toneClasses(contract.tone);
          const client = opsClients.find((c) => c.id === contract.clientId);
          return (
            <Card
              key={contract.id}
              className={cn("glass border p-5 transition-all hover:bg-white/8", t.border)}
            >
              <div className="mb-3 flex items-start justify-between gap-2">
                <div className="flex-1">
                  <div className="mb-1 flex flex-wrap items-center gap-2">
                    <span className={cn("font-mono text-[10px] font-semibold", t.text)}>
                      {contract.id}
                    </span>
                    <span
                      className={cn(
                        "rounded px-2 py-0.5 text-[10px] font-semibold",
                        statusColor(contract.status),
                      )}
                    >
                      {contract.status}
                    </span>
                  </div>
                  <p className="text-sm font-bold text-white">{contract.name}</p>
                  {client && <p className="text-xs text-white/50">{client.name}</p>}
                </div>
              </div>

              <div className="mb-3 grid grid-cols-2 gap-2 text-xs">
                <div>
                  <p className="text-white/40">Tipo</p>
                  <p className="font-medium text-white/80">{contract.type}</p>
                </div>
                <div>
                  <p className="text-white/40">Valor</p>
                  <p className={cn("font-bold", t.text)}>
                    {contract.currency} ${contract.value}
                  </p>
                </div>
                <div>
                  <p className="text-white/40">Vigencia</p>
                  <p className="font-medium text-white/80">
                    {contract.startDate} – {contract.endDate}
                  </p>
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-[10px] text-white/40">Servicios incluidos</p>
                {contract.services.map((s) => (
                  <div key={s} className="flex items-center gap-1.5">
                    <div className={cn("h-1 w-1 shrink-0 rounded-full", t.dot)} />
                    <p className="text-xs text-white/65">{s}</p>
                  </div>
                ))}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

// ─── Tab: Work Orders ─────────────────────────────────────────────────────────

function TabOrdenes() {
  return (
    <div className="space-y-6">
      <SectionHeader
        icon={<ClipboardList className="h-5 w-5" />}
        title="Órdenes de Trabajo"
        subtitle="Creación, asignación y seguimiento de órdenes operativas"
        badge={`${opsWorkOrders.length} órdenes`}
        tone="primary"
      />
      <div className="space-y-4">
        {opsWorkOrders.map((wo) => {
          const t = toneClasses(wo.tone);
          const project = opsProjects.find((p) => p.id === wo.projectId);
          return (
            <Card
              key={wo.id}
              className={cn("glass border p-5 transition-all hover:bg-white/8", t.border)}
            >
              <div className="mb-4 flex flex-wrap items-start justify-between gap-2">
                <div className="flex-1">
                  <div className="mb-1 flex flex-wrap items-center gap-2">
                    <span className={cn("font-mono text-xs font-bold", t.text)}>{wo.id}</span>
                    <span
                      className={cn(
                        "rounded px-2 py-0.5 text-[10px] font-semibold",
                        statusColor(wo.status),
                      )}
                    >
                      {wo.status}
                    </span>
                    <span
                      className={cn(
                        "rounded px-2 py-0.5 text-[10px] font-semibold",
                        wo.priority === "Urgente"
                          ? "bg-red-900/20 text-red-400"
                          : wo.priority === "Alta"
                            ? "bg-[rgba(255,165,0,0.14)] text-[var(--color-brand-warning,#f90)]"
                            : "bg-white/8 text-white/50",
                      )}
                    >
                      {wo.priority}
                    </span>
                  </div>
                  <p className="text-sm font-bold text-white">{wo.service}</p>
                  {project && (
                    <p className="text-xs text-white/50">Proyecto: {project.name.slice(0, 45)}…</p>
                  )}
                </div>
              </div>

              <div className="mb-3 grid grid-cols-2 gap-3 text-xs md:grid-cols-4">
                <div>
                  <p className="text-white/40">Protocolo</p>
                  <p className="font-mono text-[10px] text-white/70">
                    {wo.protocol.split(" — ")[0]}
                  </p>
                </div>
                <div>
                  <p className="text-white/40">Tiempo estimado</p>
                  <p className="font-medium text-white/80">{wo.estimatedTime}</p>
                </div>
                <div>
                  <p className="text-white/40">Fecha programada</p>
                  <p className="font-medium text-white/80">{wo.scheduledDate}</p>
                </div>
                <div>
                  <p className="text-white/40">Personal asignado</p>
                  <p className="font-medium text-white/80">{wo.personnel.length} personas</p>
                </div>
              </div>

              <div className="grid gap-3 md:grid-cols-3">
                <div>
                  <p className="mb-1 text-[10px] text-white/40">Productos</p>
                  {wo.products.map((p) => (
                    <div key={p} className="flex items-center gap-1.5">
                      <div className={cn("h-1 w-1 shrink-0 rounded-full", t.dot)} />
                      <span className="text-[10px] text-white/60">{p}</span>
                    </div>
                  ))}
                </div>
                <div>
                  <p className="mb-1 text-[10px] text-white/40">Herramientas</p>
                  {wo.tools.map((tool) => (
                    <div key={tool} className="flex items-center gap-1.5">
                      <div className="h-1 w-1 shrink-0 rounded-full bg-white/30" />
                      <span className="text-[10px] text-white/60">{tool}</span>
                    </div>
                  ))}
                </div>
                <div>
                  <p className="mb-1 text-[10px] text-white/40">Equipos</p>
                  {wo.equipment.map((eq) => (
                    <div key={eq} className="flex items-center gap-1.5">
                      <div className="h-1 w-1 shrink-0 rounded-full bg-white/30" />
                      <span className="text-[10px] text-white/60">{eq}</span>
                    </div>
                  ))}
                </div>
              </div>

              {wo.observations && (
                <div
                  className={cn(
                    "mt-3 rounded-lg border p-2.5 text-xs text-white/60",
                    t.border,
                    "bg-white/3",
                  )}
                >
                  <span className="text-[10px] text-white/40">Observaciones: </span>
                  {wo.observations}
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}

// ─── Tab: Execution ───────────────────────────────────────────────────────────

function TabEjecucion() {
  return (
    <div className="space-y-6">
      <SectionHeader
        icon={<Zap className="h-5 w-5" />}
        title="Ejecución en campo"
        subtitle="Registro de inicio, pausas, incidencias y material consumido"
        tone="accent"
      />

      {/* Active execution */}
      <Card className="glass border border-[rgba(0,255,133,0.3)] p-5">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-xs font-semibold tracking-wider text-[var(--color-brand-accent)] uppercase">
            Orden en ejecución
          </p>
          <span className="animate-pulse rounded-full bg-[rgba(0,255,133,0.2)] px-3 py-0.5 text-[10px] font-semibold text-[var(--color-brand-accent)]">
            ● ACTIVA
          </span>
        </div>
        <p className="text-sm font-bold text-white">OT-2025-0081</p>
        <p className="text-xs text-white/55">
          Desengrasado profundo de chasis — Lote A (12 unidades)
        </p>
        <div className="mt-3 grid grid-cols-3 gap-3 text-xs">
          <div className="rounded-lg bg-white/5 p-2.5 text-center">
            <p className="text-[10px] text-white/40">Inicio</p>
            <p className="font-bold text-white">07:45</p>
          </div>
          <div className="rounded-lg bg-white/5 p-2.5 text-center">
            <p className="text-[10px] text-white/40">Transcurrido</p>
            <p className="font-bold text-[var(--color-brand-accent)]">3h 15m</p>
          </div>
          <div className="rounded-lg bg-white/5 p-2.5 text-center">
            <p className="text-[10px] text-white/40">Estimado</p>
            <p className="font-bold text-white">6 hrs</p>
          </div>
        </div>
        <div className="mt-3 flex gap-2">
          <button className="flex-1 rounded-lg bg-[rgba(0,255,133,0.15)] py-2 text-xs font-semibold text-[var(--color-brand-accent)] transition hover:bg-[rgba(0,255,133,0.25)]">
            Registrar avance
          </button>
          <button className="flex-1 rounded-lg bg-[rgba(255,165,0,0.12)] py-2 text-xs font-semibold text-[var(--color-brand-warning,#f90)] transition hover:bg-[rgba(255,165,0,0.22)]">
            Registrar pausa
          </button>
        </div>
      </Card>

      {/* Execution timeline */}
      <div>
        <h3 className="mb-3 text-xs font-semibold tracking-widest text-white/40 uppercase">
          Línea de tiempo — OT-2025-0081
        </h3>
        <div className="space-y-3">
          {executionEvents.map((ev) => {
            const t = toneClasses(ev.tone);
            const typeLabel: Record<typeof ev.type, string> = {
              inicio: "Inicio",
              pausa: "Pausa",
              reanudacion: "Reanudación",
              fin: "Finalización",
              incidencia: "Incidencia",
              observacion: "Observación",
            };
            return (
              <Card key={ev.id} className={cn("glass border p-4", t.border)}>
                <div className="flex items-start gap-3">
                  <div className={cn("mt-0.5 h-2 w-2 shrink-0 rounded-full", t.dot)} />
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={cn("text-[10px] font-semibold uppercase", t.text)}>
                        {typeLabel[ev.type]}
                      </span>
                      <span className="text-[10px] text-white/40">{ev.timestamp}</span>
                      <span className="text-[10px] text-white/40">· {ev.registeredBy}</span>
                    </div>
                    <p className="mt-1 text-xs leading-relaxed text-white/70">{ev.description}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Material consumption */}
      <div>
        <h3 className="mb-3 text-xs font-semibold tracking-widest text-white/40 uppercase">
          Material consumido
        </h3>
        <div className="overflow-hidden rounded-xl border border-white/10">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                <th className="px-4 py-2.5 text-left font-semibold text-white/50">Producto</th>
                <th className="px-4 py-2.5 text-right font-semibold text-white/50">Cantidad</th>
                <th className="px-4 py-2.5 text-left font-semibold text-white/50">Unidad</th>
                <th className="hidden px-4 py-2.5 text-left font-semibold text-white/50 md:table-cell">
                  Disposición
                </th>
              </tr>
            </thead>
            <tbody>
              {materialsConsumed.map((m, i) => (
                <tr
                  key={m.id}
                  className={cn(
                    "border-b border-white/5",
                    i % 2 === 0 ? "bg-white/2" : "bg-transparent",
                  )}
                >
                  <td className="px-4 py-2.5 text-white/80">{m.product}</td>
                  <td className="px-4 py-2.5 text-right font-bold text-[var(--color-brand-primary)]">
                    {m.quantity}
                  </td>
                  <td className="px-4 py-2.5 text-white/50">{m.unit}</td>
                  <td className="hidden px-4 py-2.5 text-white/45 md:table-cell">
                    {m.wasteDisposal}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── Tab: Evidence ────────────────────────────────────────────────────────────

function TabEvidencias() {
  const typeIcon: Record<string, React.ReactNode> = {
    fotografia: <span className="text-[10px]">📷</span>,
    video: <span className="text-[10px]">🎥</span>,
    documento: <span className="text-[10px]">📄</span>,
    checklist: <span className="text-[10px]">✅</span>,
    firma: <span className="text-[10px]">✍️</span>,
    geolocalizacion: <span className="text-[10px]">📍</span>,
  };

  return (
    <div className="space-y-6">
      <SectionHeader
        icon={<FileText className="h-5 w-5" />}
        title="Evidencias"
        subtitle="Repositorio de fotografías, checklists, firmas y documentos por orden"
        badge={`${opsEvidences.length} evidencias`}
        tone="primary"
      />

      {/* Evidence types overview */}
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
        {[
          { type: "fotografia", label: "Fotografías" },
          { type: "video", label: "Videos" },
          { type: "documento", label: "Documentos" },
          { type: "checklist", label: "Checklists" },
          { type: "firma", label: "Firmas" },
          { type: "geolocalizacion", label: "Geoloc." },
        ].map(({ type, label }) => {
          const count = opsEvidences.filter((e) => e.type === type).length;
          return (
            <div
              key={type}
              className="flex flex-col items-center gap-1 rounded-xl border border-white/10 bg-white/3 p-3 text-center"
            >
              <span className="text-xl">{typeIcon[type]}</span>
              <p className="text-lg font-bold text-white">{count}</p>
              <p className="text-[10px] text-white/45">{label}</p>
            </div>
          );
        })}
      </div>

      {/* Evidence cards */}
      <div className="grid gap-3 md:grid-cols-2">
        {opsEvidences.map((ev) => {
          const t = toneClasses(ev.tone);
          return (
            <Card key={ev.id} className={cn("glass border p-4", t.border)}>
              <div className="mb-2 flex items-start gap-3">
                <div
                  className={cn(
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border",
                    t.border,
                    "bg-white/5",
                  )}
                >
                  {typeIcon[ev.type]}
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={cn("text-[10px] font-semibold uppercase", t.text)}>
                      {ev.type}
                    </span>
                    <span className="rounded bg-white/8 px-2 py-0.5 text-[10px] font-medium text-white/50">
                      {ev.stage}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-white/85">{ev.label}</p>
                </div>
              </div>
              <p className="mb-2 text-xs text-white/55">{ev.description}</p>
              <div className="flex items-center justify-between text-[10px] text-white/35">
                <span>
                  {ev.capturedBy} · {ev.timestamp}
                </span>
                {ev.geoTag && <span>📍 {ev.geoTag}</span>}
              </div>
            </Card>
          );
        })}
      </div>

      {/* Evidence types architecture */}
      <Card className="glass border border-white/10 p-5">
        <p className="mb-3 text-xs font-semibold tracking-wider text-white/40 uppercase">
          Tipos de evidencia soportados
        </p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
          {[
            { icon: "📷", label: "Fotografías", desc: "Antes / durante / después" },
            { icon: "🎥", label: "Videos", desc: "Registro de ejecución" },
            { icon: "📄", label: "Documentos", desc: "Actas, certificados" },
            { icon: "✅", label: "Checklists", desc: "Protocolo paso a paso" },
            { icon: "✍️", label: "Firmas", desc: "Cliente y supervisor" },
            { icon: "📍", label: "Geolocalización", desc: "Coordenadas GPS" },
          ].map((item) => (
            <div
              key={item.label}
              className="flex flex-col gap-1.5 rounded-xl border border-white/8 bg-white/3 p-3"
            >
              <span className="text-2xl">{item.icon}</span>
              <p className="text-xs font-semibold text-white/80">{item.label}</p>
              <p className="text-[10px] text-white/40">{item.desc}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// ─── Tab: Quality ─────────────────────────────────────────────────────────────

function TabCalidad() {
  return (
    <div className="space-y-6">
      <SectionHeader
        icon={<ShieldCheck className="h-5 w-5" />}
        title="Control de Calidad"
        subtitle="Lista de verificación, cumplimiento de protocolo y aprobación"
        tone="warning"
      />
      {qualityChecks.map((qc) => {
        const t = toneClasses(qc.tone);
        const okCount = qc.verificationList.filter((i) => i.status === "ok").length;
        const totalRequired = qc.verificationList.filter((i) => i.required).length;
        return (
          <Card key={qc.id} className={cn("glass border p-5", t.border)}>
            <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="mb-1 flex items-center gap-2">
                  <span className={cn("font-mono text-xs font-semibold", t.text)}>{qc.id}</span>
                  <span
                    className={cn(
                      "rounded px-2 py-0.5 text-[10px] font-semibold",
                      qualityResultColor(qc.result),
                    )}
                  >
                    {qc.result}
                  </span>
                </div>
                <p className="text-xs text-white/55">Orden: {qc.workOrderId}</p>
              </div>
              <div className="text-right">
                <p className={cn("text-2xl font-black", t.text)}>{qc.protocolCompliance}%</p>
                <p className="text-[10px] text-white/40">Cumplimiento del protocolo</p>
              </div>
            </div>

            {/* Progress bar */}
            <div className="mb-4">
              <div className="h-2 overflow-hidden rounded-full bg-white/10">
                <div
                  className={cn("h-full rounded-full transition-all", t.dot)}
                  style={{ width: `${qc.protocolCompliance}%` }}
                />
              </div>
              <p className="mt-1 text-[10px] text-white/35">
                {okCount} / {totalRequired} ítems requeridos verificados
              </p>
            </div>

            {/* Verification list */}
            <div className="mb-4 space-y-2">
              <p className="text-[10px] font-semibold tracking-wider text-white/40 uppercase">
                Lista de verificación
              </p>
              {qc.verificationList.map((item) => {
                const statusMap: Record<typeof item.status, { color: string; icon: string }> = {
                  ok: { color: "text-[var(--color-brand-accent)]", icon: "✓" },
                  no_aplica: { color: "text-white/40", icon: "–" },
                  hallazgo: { color: "text-[var(--color-brand-warning,#f90)]", icon: "!" },
                  pendiente: { color: "text-white/50", icon: "○" },
                };
                const s = statusMap[item.status];
                return (
                  <div key={item.id} className="flex items-start gap-2">
                    <span className={cn("mt-0.5 shrink-0 text-xs font-bold", s.color)}>
                      {s.icon}
                    </span>
                    <div>
                      <p className="text-xs text-white/70">{item.description}</p>
                      {item.finding && (
                        <p className="text-[10px] text-[var(--color-brand-warning,#f90)]">
                          ↳ {item.finding}
                        </p>
                      )}
                    </div>
                    {item.required && (
                      <span className="ml-auto shrink-0 text-[10px] text-white/30">Req.</span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Observations */}
            {qc.observations && (
              <div className={cn("rounded-lg border p-3", t.border, "bg-white/3")}>
                <p className="text-[10px] text-white/40">Observaciones</p>
                <p className="mt-0.5 text-xs text-white/65">{qc.observations}</p>
              </div>
            )}

            {/* Approval */}
            <div className="mt-3 flex gap-2">
              <button className="flex-1 rounded-lg bg-[rgba(0,255,133,0.12)] py-2 text-xs font-semibold text-[var(--color-brand-accent)] transition hover:bg-[rgba(0,255,133,0.22)]">
                Aprobar
              </button>
              <button className="flex-1 rounded-lg bg-[rgba(255,165,0,0.10)] py-2 text-xs font-semibold text-[var(--color-brand-warning,#f90)] transition hover:bg-[rgba(255,165,0,0.20)]">
                Aprobar con observaciones
              </button>
              <button className="flex-1 rounded-lg bg-red-900/15 py-2 text-xs font-semibold text-red-400 transition hover:bg-red-900/25">
                Rechazar
              </button>
            </div>
          </Card>
        );
      })}
    </div>
  );
}

// ─── Tab: Reports ─────────────────────────────────────────────────────────────

function TabReportes() {
  return (
    <div className="space-y-6">
      <SectionHeader
        icon={<BarChart3 className="h-5 w-5" />}
        title="Reportes"
        subtitle="Generación y consulta de reportes de servicio, proyecto, calidad y ejecutivos"
        badge={`${opsReports.length} disponibles`}
        tone="primary"
      />

      {/* Report templates */}
      <div>
        <p className="mb-3 text-xs font-semibold tracking-wider text-white/40 uppercase">
          Tipos de reporte disponibles
        </p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              type: "Reporte de servicio",
              desc: "Resumen de ejecución con evidencias, materiales y firma de entrega.",
              icon: "ClipboardList",
              tone: "primary" as OpsTone,
            },
            {
              type: "Reporte de proyecto",
              desc: "Avance general del proyecto con todas las órdenes y KPIs.",
              icon: "FolderOpen",
              tone: "accent" as OpsTone,
            },
            {
              type: "Reporte ejecutivo",
              desc: "Indicadores de alto nivel para la dirección del cliente.",
              icon: "BarChart3",
              tone: "eco" as OpsTone,
            },
            {
              type: "Reporte de calidad",
              desc: "Resultados de inspección, hallazgos y cumplimiento de protocolos.",
              icon: "ShieldCheck",
              tone: "warning" as OpsTone,
            },
          ].map((tpl) => {
            const t = toneClasses(tpl.tone);
            return (
              <Card
                key={tpl.type}
                className={cn("glass border p-4 transition-all hover:bg-white/8", t.border)}
              >
                <div
                  className={cn(
                    "mb-3 flex h-9 w-9 items-center justify-center rounded-xl border",
                    t.border,
                    "bg-white/5",
                  )}
                >
                  <DynIcon name={tpl.icon} className={cn("h-4.5 w-4.5", t.icon)} />
                </div>
                <p className="mb-1 text-xs font-bold text-white">{tpl.type}</p>
                <p className="text-[10px] leading-relaxed text-white/50">{tpl.desc}</p>
                <button
                  className={cn(
                    "mt-3 w-full rounded-lg py-1.5 text-[10px] font-semibold transition",
                    t.badge,
                    "hover:opacity-80",
                  )}
                >
                  Generar →
                </button>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Existing reports */}
      <div>
        <p className="mb-3 text-xs font-semibold tracking-wider text-white/40 uppercase">
          Reportes generados
        </p>
        <div className="space-y-3">
          {opsReports.map((rpt) => {
            const t = toneClasses(rpt.tone);
            const project = opsProjects.find((p) => p.id === rpt.projectId);
            return (
              <Card key={rpt.id} className={cn("glass border p-4", t.border)}>
                <div className="flex items-start gap-3">
                  <div
                    className={cn(
                      "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border",
                      t.border,
                      "bg-white/5",
                    )}
                  >
                    <FileText className={cn("h-4 w-4", t.icon)} />
                  </div>
                  <div className="flex-1">
                    <div className="mb-1 flex flex-wrap items-center gap-2">
                      <span className={cn("font-mono text-[10px] font-semibold", t.text)}>
                        {rpt.id}
                      </span>
                      <span
                        className={cn(
                          "rounded px-2 py-0.5 text-[10px] font-semibold",
                          statusColor(rpt.status),
                        )}
                      >
                        {rpt.status}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-white/85">{rpt.title}</p>
                    {project && (
                      <p className="text-[10px] text-white/40">
                        Proyecto: {project.name.slice(0, 40)}…
                      </p>
                    )}
                    <div className="mt-1.5 flex gap-3 text-[10px] text-white/35">
                      <span>{rpt.type}</span>
                      <span>·</span>
                      <span>{rpt.pages} páginas</span>
                      <span>·</span>
                      <span>{rpt.generatedAt}</span>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Tab: Personnel ───────────────────────────────────────────────────────────

function TabPersonal() {
  return (
    <div className="space-y-6">
      <SectionHeader
        icon={<Users className="h-5 w-5" />}
        title="Equipos y Personal"
        subtitle="Gestión de equipos de campo y asignación de personal"
        tone="neutral"
      />

      {/* Teams */}
      <div>
        <p className="mb-3 text-xs font-semibold tracking-wider text-white/40 uppercase">
          Equipos de campo
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          {opsTeams.map((team) => {
            const t = toneClasses(team.tone);
            const availColor =
              team.availability === "Disponible"
                ? "text-[var(--color-brand-accent)]"
                : team.availability === "Asignado"
                  ? "text-[var(--color-brand-primary)]"
                  : "text-white/40";
            return (
              <Card key={team.id} className={cn("glass border p-4", t.border)}>
                <div className="mb-2 flex items-start justify-between gap-2">
                  <div>
                    <span className={cn("font-mono text-[10px] font-semibold", t.text)}>
                      {team.id}
                    </span>
                    <p className="text-sm font-bold text-white">{team.name}</p>
                    <p className="text-xs text-white/50">{team.specialty}</p>
                  </div>
                  <span className={cn("text-xs font-semibold", availColor)}>
                    {team.availability}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div>
                    <p className="text-[10px] text-white/40">Líder</p>
                    <p className="text-white/70">{team.leader}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-white/40">Miembros</p>
                    <p className={cn("font-bold", t.text)}>{team.members}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-white/40">Zona</p>
                    <p className="text-white/70">{team.zone}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Personnel */}
      <div>
        <p className="mb-3 text-xs font-semibold tracking-wider text-white/40 uppercase">
          Personal de campo
        </p>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {opsPersonnel.map((person) => {
            const t = toneClasses(person.tone);
            return (
              <Card key={person.id} className={cn("glass border p-4", t.border)}>
                <div className="mb-2 flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-bold text-white">{person.name}</p>
                    <p className="text-xs text-white/50">{person.role}</p>
                  </div>
                  <span
                    className={cn(
                      "shrink-0 rounded px-2 py-0.5 text-[10px] font-semibold",
                      person.status === "En servicio"
                        ? "bg-[rgba(0,255,133,0.14)] text-[var(--color-brand-accent)]"
                        : person.status === "Disponible"
                          ? "bg-[rgba(0,196,255,0.14)] text-[var(--color-brand-primary)]"
                          : "bg-white/8 text-white/50",
                    )}
                  >
                    {person.status}
                  </span>
                </div>
                {person.currentProject && (
                  <p className="mb-2 text-[10px] text-white/45">
                    Proyecto: {person.currentProject}
                  </p>
                )}
                <div className="flex flex-wrap gap-1">
                  {person.certifications.map((cert) => (
                    <span
                      key={cert}
                      className="rounded bg-white/8 px-1.5 py-0.5 text-[9px] text-white/55"
                    >
                      {cert}
                    </span>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Tab: Architecture ────────────────────────────────────────────────────────

function TabArquitectura() {
  return (
    <div className="space-y-8">
      <SectionHeader
        icon={<Layers className="h-5 w-5" />}
        title="Arquitectura OVI OPS"
        subtitle="Módulos, integraciones, capacidades futuras y filosofía del sistema"
        tone="primary"
      />

      {/* Pillars */}
      <div>
        <p className="mb-4 text-xs font-semibold tracking-widest text-white/40 uppercase">
          Pilares de arquitectura
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          {opsArchPillars.map((pillar) => {
            const t = toneClasses(pillar.tone);
            return (
              <Card key={pillar.id} className={cn("glass border p-5", t.border)}>
                <div className="mb-3 flex items-start gap-3">
                  <div
                    className={cn(
                      "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border",
                      t.border,
                      "bg-white/5",
                    )}
                  >
                    <DynIcon name={pillar.icon} className={cn("h-5 w-5", t.icon)} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{pillar.title}</p>
                    <p className="mt-0.5 text-xs text-white/50">{pillar.description}</p>
                  </div>
                </div>
                <div className="space-y-1">
                  {pillar.items.map((item) => (
                    <div key={item} className="flex items-center gap-1.5">
                      <div className={cn("h-1 w-1 shrink-0 rounded-full", t.dot)} />
                      <span className="text-xs text-white/65">{item}</span>
                    </div>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Modules grid */}
      <div>
        <p className="mb-4 text-xs font-semibold tracking-widest text-white/40 uppercase">
          Módulos del sistema
        </p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {[
            { label: "Clientes", icon: "Building2", desc: "Directorio y segmentación" },
            { label: "Proyectos", icon: "FolderOpen", desc: "Gestión operativa" },
            { label: "Contratos", icon: "FileText", desc: "Acuerdos de servicio" },
            { label: "Activos", icon: "Wrench", desc: "Inventario de activos" },
            { label: "Ubicaciones", icon: "MapPin", desc: "Sitios y plantas" },
            { label: "Equipos", icon: "Users", desc: "Equipos de campo" },
            { label: "Personal", icon: "Users", desc: "Operarios y técnicos" },
            { label: "Productos", icon: "Package", desc: "Catálogo OVI" },
            { label: "Protocolos", icon: "ShieldCheck", desc: "Procedimientos técnicos" },
            { label: "Evidencias", icon: "FileText", desc: "Registro multimedia" },
            { label: "Calidad", icon: "ShieldCheck", desc: "Inspección y aprobación" },
            { label: "Reportes", icon: "BarChart3", desc: "Inteligencia de negocio" },
          ].map((mod) => (
            <div
              key={mod.label}
              className="flex flex-col gap-1.5 rounded-xl border border-[rgba(0,196,255,0.15)] bg-[rgba(0,196,255,0.04)] p-3"
            >
              <DynIcon name={mod.icon} className="h-5 w-5 text-[var(--color-brand-primary)]" />
              <p className="text-xs font-bold text-white">{mod.label}</p>
              <p className="text-[10px] text-white/40">{mod.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Integrations */}
      <div>
        <p className="mb-4 text-xs font-semibold tracking-widest text-white/40 uppercase">
          Integraciones preparadas
        </p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              name: "OVI AI",
              desc: "Diagnósticos y recomendaciones automáticas",
              status: "Integración activa",
              tone: "primary" as OpsTone,
            },
            {
              name: "OVI Field",
              desc: "Ejecución en campo y registro offline",
              status: "Integración activa",
              tone: "accent" as OpsTone,
            },
            {
              name: "OVI Analytics",
              desc: "KPIs, tendencias y reportes ejecutivos",
              status: "Integración activa",
              tone: "eco" as OpsTone,
            },
            {
              name: "OVI Store",
              desc: "Catálogo de productos y control de consumo",
              status: "Integración activa",
              tone: "primary" as OpsTone,
            },
            {
              name: "OVI Lab",
              desc: "Protocolos técnicos y análisis de laboratorio",
              status: "Integración activa",
              tone: "warning" as OpsTone,
            },
            {
              name: "Portal del Cliente",
              desc: "Aprobaciones, seguimiento y reportes para el cliente",
              status: "Próximamente",
              tone: "neutral" as OpsTone,
            },
            {
              name: "ERP",
              desc: "Facturación, inventario y contabilidad",
              status: "Roadmap",
              tone: "neutral" as OpsTone,
            },
            {
              name: "CRM",
              desc: "Gestión de relaciones con clientes",
              status: "Roadmap",
              tone: "neutral" as OpsTone,
            },
          ].map((intg) => {
            const t = toneClasses(intg.tone);
            return (
              <Card key={intg.name} className={cn("glass border p-4", t.border)}>
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-xs font-bold text-white">{intg.name}</p>
                  <span
                    className={cn(
                      "rounded px-2 py-0.5 text-[10px] font-semibold",
                      intg.status === "Integración activa"
                        ? "bg-[rgba(0,255,133,0.14)] text-[var(--color-brand-accent)]"
                        : intg.status === "Próximamente"
                          ? "bg-[rgba(0,196,255,0.12)] text-[var(--color-brand-primary)]"
                          : "bg-white/8 text-white/45",
                    )}
                  >
                    {intg.status}
                  </span>
                </div>
                <p className="text-[10px] text-white/50">{intg.desc}</p>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Future capabilities */}
      <div>
        <p className="mb-4 text-xs font-semibold tracking-widest text-white/40 uppercase">
          Capacidades futuras
        </p>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {opsFutureCapabilities.map((cap) => {
            const t = toneClasses(cap.tone);
            const horizonColor =
              cap.horizon === "Corto plazo"
                ? "bg-[rgba(0,255,133,0.14)] text-[var(--color-brand-accent)]"
                : cap.horizon === "Mediano plazo"
                  ? "bg-[rgba(0,196,255,0.14)] text-[var(--color-brand-primary)]"
                  : "bg-white/8 text-white/50";
            return (
              <Card key={cap.id} className={cn("glass border p-4", t.border)}>
                <div className="mb-2 flex items-start gap-3">
                  <div
                    className={cn(
                      "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border",
                      t.border,
                      "bg-white/5",
                    )}
                  >
                    <DynIcon name={cap.icon} className={cn("h-4 w-4", t.icon)} />
                  </div>
                  <div className="flex-1">
                    <div className="mb-1 flex flex-wrap items-center gap-1.5">
                      <span
                        className={cn(
                          "rounded px-2 py-0.5 text-[10px] font-semibold",
                          horizonColor,
                        )}
                      >
                        {cap.horizon}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-white/85">{cap.title}</p>
                  </div>
                </div>
                <p className="text-[10px] leading-relaxed text-white/50">{cap.description}</p>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Director's note */}
      <Card className="glass border border-[rgba(0,196,255,0.2)] p-6">
        <div className="mb-3 flex items-center gap-2">
          <Brain className="h-5 w-5 text-[var(--color-brand-primary)]" />
          <p className="text-xs font-semibold tracking-wider text-[var(--color-brand-primary)] uppercase">
            Nota del Director del Proyecto
          </p>
        </div>
        <blockquote className="border-l-2 border-[rgba(0,196,255,0.4)] pl-4 text-sm leading-relaxed text-white/70 italic">
          &ldquo;OVI OPS será el puente entre el conocimiento y la ejecución. La plataforma no
          termina cuando recomienda una solución. Comienza cuando esa solución se convierte en una
          operación ejecutada con calidad, trazabilidad y evidencia.&rdquo;
        </blockquote>
      </Card>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export function OviOpsPage() {
  const { activeTab, setActiveTab } = useOviOpsStore();

  return (
    <main className="min-h-screen bg-[#020813] text-white">
      {/* Header */}
      <div className="border-b border-white/8 bg-[rgba(0,0,0,0.4)] px-4 py-4 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-[rgba(0,196,255,0.3)] bg-[rgba(0,196,255,0.1)]">
              <Cpu className="h-5 w-5 text-[var(--color-brand-primary)]" />
            </div>
            <div>
              <p className="text-[10px] font-semibold tracking-widest text-white/40 uppercase">
                OVI — Ingeniería en Limpieza
              </p>
              <h1 className="text-sm font-black tracking-tight text-white">OVI OPS</h1>
            </div>
            <span className="ml-auto rounded-full border border-[rgba(0,196,255,0.3)] bg-[rgba(0,196,255,0.1)] px-3 py-0.5 text-[10px] font-semibold text-[var(--color-brand-primary)]">
              Plataforma Digital de Operaciones
            </span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mx-auto max-w-7xl px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6 flex h-auto flex-wrap gap-1 bg-transparent p-0">
            {[
              { value: "dashboard", label: "Dashboard" },
              { value: "clientes", label: "Clientes" },
              { value: "proyectos", label: "Proyectos" },
              { value: "contratos", label: "Contratos" },
              { value: "ordenes", label: "Órdenes" },
              { value: "personal", label: "Personal" },
              { value: "ejecucion", label: "Ejecución" },
              { value: "evidencias", label: "Evidencias" },
              { value: "calidad", label: "Calidad" },
              { value: "reportes", label: "Reportes" },
              { value: "arquitectura", label: "Arquitectura" },
            ].map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className={cn(
                  "rounded-lg border border-white/8 bg-white/4 px-3 py-1.5 text-xs font-medium text-white/55 transition-all",
                  "data-[state=active]:border-[rgba(0,196,255,0.4)] data-[state=active]:bg-[rgba(0,196,255,0.12)] data-[state=active]:text-[var(--color-brand-primary)]",
                )}
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="dashboard">
            <TabDashboard />
          </TabsContent>
          <TabsContent value="clientes">
            <TabClientes />
          </TabsContent>
          <TabsContent value="proyectos">
            <TabProyectos />
          </TabsContent>
          <TabsContent value="contratos">
            <TabContratos />
          </TabsContent>
          <TabsContent value="ordenes">
            <TabOrdenes />
          </TabsContent>
          <TabsContent value="personal">
            <TabPersonal />
          </TabsContent>
          <TabsContent value="ejecucion">
            <TabEjecucion />
          </TabsContent>
          <TabsContent value="evidencias">
            <TabEvidencias />
          </TabsContent>
          <TabsContent value="calidad">
            <TabCalidad />
          </TabsContent>
          <TabsContent value="reportes">
            <TabReportes />
          </TabsContent>
          <TabsContent value="arquitectura">
            <TabArquitectura />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
