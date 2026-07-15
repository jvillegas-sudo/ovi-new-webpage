"use client";

/**
 * OVI Field — Intelligent Field Operations Platform
 * Work Order 010
 *
 * Architecture module for supervisors and field operators.
 * Covers: work orders, personnel, dynamic checklists, photo registry,
 * materials, products, equipment, incidents, observations, closure and sync.
 *
 * Tabs:
 *   dashboard     — KPI overview + execution flow
 *   ordenes       — Work orders list
 *   ejecucion     — Checklist + photo registry
 *   consumos      — Materials, products, equipment
 *   incidencias   — Incidents and observations
 *   cierre        — Service closure + client signature
 *   arquitectura  — System architecture + integrations + future capabilities
 */

import {
  Activity,
  AlertTriangle,
  ArchiveRestore,
  Camera,
  CheckSquare,
  ChevronRight,
  ClipboardCheck,
  ClipboardList,
  Cpu,
  Eye,
  Layers,
  Package,
  Radio,
  RefreshCw,
  ShieldCheck,
  Signature,
  Smartphone,
  Users,
  Wifi,
  WifiOff,
  Wrench,
  Zap,
} from "lucide-react";
import { Card, Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui";
import { cn } from "@utils/cn";
import {
  archPillars,
  dynamicChecklist,
  equipmentRecords,
  executionFlow,
  fieldIntegrations,
  fieldOperators,
  futureCapabilities,
  incidentRecords,
  materialRecords,
  observationRecords,
  photoRecords,
  productConsumptions,
  serviceClosure,
  workOrders,
  type FieldTone,
} from "./ovi-field-data";

// ─── Tone helpers ─────────────────────────────────────────────────────────────

function toneClasses(tone: FieldTone) {
  if (tone === "accent") {
    return {
      border: "border-[rgba(0,255,133,0.28)]",
      badge: "bg-[rgba(0,255,133,0.14)] text-[var(--color-brand-accent)]",
      dot: "bg-[var(--color-brand-accent)]",
      text: "text-[var(--color-brand-accent)]",
    };
  }
  if (tone === "warning") {
    return {
      border: "border-[rgba(255,165,0,0.28)]",
      badge: "bg-[rgba(255,165,0,0.14)] text-[var(--color-brand-warning,#f90)]",
      dot: "bg-[var(--color-brand-warning,#f90)]",
      text: "text-[var(--color-brand-warning,#f90)]",
    };
  }
  if (tone === "neutral") {
    return {
      border: "border-white/10",
      badge: "bg-white/8 text-[var(--color-text-secondary)]",
      dot: "bg-white/30",
      text: "text-[var(--color-text-secondary)]",
    };
  }
  return {
    border: "border-[rgba(0,196,255,0.28)]",
    badge: "bg-[rgba(0,196,255,0.14)] text-[var(--color-brand-primary)]",
    dot: "bg-[var(--color-brand-primary)]",
    text: "text-[var(--color-brand-primary)]",
  };
}

function statusBadge(status: string): string {
  const s = status.toLowerCase();
  if (
    s.includes("ejecución") ||
    s.includes("synced") ||
    s.includes("óptimo") ||
    s.includes("obtenida") ||
    s.includes("vigente") ||
    s.includes("completada") ||
    s.includes("cerrada") ||
    s.includes("disponible") ||
    s.includes("resuelta")
  ) {
    return "bg-[rgba(0,255,133,0.14)] text-[var(--color-brand-accent)]";
  }
  if (
    s.includes("pendiente") ||
    s.includes("asignada") ||
    s.includes("pausa") ||
    s.includes("gestión") ||
    s.includes("escalada") ||
    s.includes("abierta") ||
    s.includes("mantenimiento") ||
    s.includes("pending") ||
    s.includes("reposición")
  ) {
    return "bg-[rgba(255,165,0,0.14)] text-[var(--color-brand-warning,#f90)]";
  }
  return "bg-[rgba(0,196,255,0.14)] text-[var(--color-brand-primary)]";
}

// ─── Shared section heading ───────────────────────────────────────────────────

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-3xl">
      <span className="inline-flex rounded-full border border-[rgba(0,196,255,0.18)] bg-[rgba(0,196,255,0.08)] px-3 py-1 text-[11px] font-semibold tracking-[0.24em] text-[var(--color-brand-primary)] uppercase">
        {eyebrow}
      </span>
      <h2 className="mt-4 text-3xl font-bold md:text-4xl">{title}</h2>
      <p className="mt-3 text-sm text-[var(--color-text-secondary)] md:text-base">{description}</p>
    </div>
  );
}

// ─── KPI Card ─────────────────────────────────────────────────────────────────

function KpiCard({
  label,
  value,
  detail,
  trend,
  tone,
}: {
  label: string;
  value: string;
  detail: string;
  trend: string;
  tone: FieldTone;
}) {
  const t = toneClasses(tone);
  return (
    <Card variant="glass" padding="lg" className={cn("min-h-[200px] border", t.border)}>
      <div className="flex items-start justify-between gap-4">
        <p className="text-sm text-[var(--color-text-tertiary)]">{label}</p>
        <span className={cn("shrink-0 rounded-full px-3 py-1 text-xs font-semibold", t.badge)}>
          {trend}
        </span>
      </div>
      <p className="mt-4 text-4xl font-bold text-[var(--color-text-primary)]">{value}</p>
      <p className="mt-4 text-sm text-[var(--color-text-secondary)]">{detail}</p>
    </Card>
  );
}

// ─── Dashboard Tab ────────────────────────────────────────────────────────────

function DashboardTab() {
  const activeOrders = workOrders.filter((o) => o.status === "En ejecución").length;
  const assignedOrders = workOrders.filter((o) => o.status === "Asignada").length;
  const completedToday = workOrders.filter((o) => o.status === "Completada").length;
  const pendingSync = workOrders.filter((o) => o.syncStatus === "pending").length;

  return (
    <div className="space-y-12">
      {/* KPIs */}
      <section>
        <SectionHeading
          eyebrow="OVI Field · Dashboard"
          title="Operaciones en campo"
          description="Estado en tiempo real de órdenes de trabajo activas, personal desplegado y sincronización con OVI OS."
        />
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <KpiCard
            label="Órdenes activas"
            value={String(activeOrders)}
            detail="Servicios en ejecución en este momento."
            trend="En tiempo"
            tone="primary"
          />
          <KpiCard
            label="Órdenes asignadas"
            value={String(assignedOrders)}
            detail="Servicios confirmados, pendientes de inicio."
            trend="Próximas 12 h"
            tone="accent"
          />
          <KpiCard
            label="Servicios cerrados hoy"
            value={String(completedToday)}
            detail="Completados y documentados correctamente."
            trend="100% evidenciados"
            tone="accent"
          />
          <KpiCard
            label="Pendiente de sync"
            value={String(pendingSync)}
            detail="Registros en cola para sincronizar con OVI OS."
            trend="Automático al reconectar"
            tone={pendingSync > 0 ? "warning" : "neutral"}
          />
        </div>
      </section>

      {/* Execution flow */}
      <section>
        <h3 className="text-xl font-semibold text-[var(--color-text-primary)]">
          Flujo de ejecución
        </h3>
        <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
          OT activa: <strong className="text-[var(--color-brand-primary)]">OF-2001</strong> ·
          Alimentos Andinos · Planta Norte
        </p>
        <div className="relative mt-6">
          {/* vertical connector */}
          <div className="absolute top-0 bottom-0 left-[19px] w-px bg-white/10" />
          <div className="space-y-3">
            {executionFlow.map((step, i) => {
              const t = toneClasses(step.tone);
              const isActive = step.status === "active";
              const isDone = step.status === "completed";
              return (
                <div key={step.phase} className="relative flex items-start gap-4 pl-12">
                  {/* dot */}
                  <div
                    className={cn(
                      "absolute top-1 left-0 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-xs font-bold",
                      isDone
                        ? "border-[rgba(0,255,133,0.4)] bg-[rgba(0,255,133,0.12)] text-[var(--color-brand-accent)]"
                        : isActive
                          ? "border-[rgba(0,196,255,0.4)] bg-[rgba(0,196,255,0.12)] text-[var(--color-brand-primary)] ring-2 ring-[rgba(0,196,255,0.25)]"
                          : "border-white/10 bg-white/4 text-[var(--color-text-tertiary)]",
                    )}
                  >
                    {isDone ? "✓" : String(i + 1).padStart(2, "0")}
                  </div>
                  {/* content */}
                  <Card
                    variant="glass"
                    padding="md"
                    className={cn(
                      "flex-1 border",
                      isDone
                        ? "border-[rgba(0,255,133,0.15)]"
                        : isActive
                          ? "border-[rgba(0,196,255,0.3)]"
                          : "border-white/8",
                    )}
                  >
                    <div className="flex flex-wrap items-center gap-3">
                      <span
                        className={cn(
                          "text-sm font-semibold",
                          isDone
                            ? "text-[var(--color-brand-accent)]"
                            : isActive
                              ? "text-[var(--color-brand-primary)]"
                              : "text-[var(--color-text-secondary)]",
                        )}
                      >
                        {step.label}
                      </span>
                      <span
                        className={cn(
                          "rounded-full px-2 py-0.5 text-[10px] font-semibold",
                          t.badge,
                        )}
                      >
                        {step.module}
                      </span>
                      {isActive && (
                        <span className="animate-pulse rounded-full bg-[rgba(0,196,255,0.14)] px-2 py-0.5 text-[10px] font-semibold text-[var(--color-brand-primary)]">
                          ACTIVO
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-xs text-[var(--color-text-tertiary)]">
                      {step.description}
                    </p>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── Work Orders Tab ──────────────────────────────────────────────────────────

function WorkOrdersTab() {
  return (
    <div className="space-y-10">
      <SectionHeading
        eyebrow="Módulo · Órdenes de trabajo"
        title="Órdenes de trabajo activas"
        description="Todas las órdenes asignadas al equipo de campo. Vinculadas a clientes, protocolos y operarios desde OVI Core."
      />
      <div className="space-y-4">
        {workOrders.map((order) => {
          const t = toneClasses(order.tone);
          return (
            <Card key={order.code} variant="glass" padding="lg" className={cn("border", t.border)}>
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs text-[var(--color-text-tertiary)]">
                      {order.code}
                    </span>
                    <span
                      className={cn(
                        "rounded-full px-2 py-0.5 text-[10px] font-semibold",
                        statusBadge(order.status),
                      )}
                    >
                      {order.status}
                    </span>
                    <span
                      className={cn(
                        "rounded-full px-2 py-0.5 text-[10px] font-semibold",
                        order.priority === "Alta"
                          ? "bg-[rgba(255,165,0,0.14)] text-[var(--color-brand-warning,#f90)]"
                          : "bg-white/8 text-[var(--color-text-secondary)]",
                      )}
                    >
                      {order.priority}
                    </span>
                    <span
                      className={cn(
                        "rounded-full px-2 py-0.5 text-[10px] font-semibold",
                        statusBadge(order.syncStatus),
                      )}
                    >
                      {order.syncStatus === "synced"
                        ? "Sincronizado"
                        : order.syncStatus === "pending"
                          ? "Pendiente sync"
                          : "Sin conexión"}
                    </span>
                  </div>
                  <h4 className="mt-2 text-base font-semibold text-[var(--color-text-primary)]">
                    {order.title}
                  </h4>
                  <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                    {order.client} · {order.site}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-[var(--color-text-tertiary)]">Programada</p>
                  <p className="mt-1 text-sm font-semibold text-[var(--color-text-primary)]">
                    {order.scheduledFor}
                  </p>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-4 border-t border-white/8 pt-4">
                <div>
                  <p className="text-[10px] tracking-wider text-[var(--color-text-tertiary)] uppercase">
                    Supervisor
                  </p>
                  <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                    {order.supervisor}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] tracking-wider text-[var(--color-text-tertiary)] uppercase">
                    Operarios
                  </p>
                  <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                    {order.operators.length > 0 ? order.operators.join(", ") : "Por asignar"}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] tracking-wider text-[var(--color-text-tertiary)] uppercase">
                    Protocolo
                  </p>
                  <p className="mt-1 font-mono text-sm text-[var(--color-brand-primary)]">
                    {order.protocol}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] tracking-wider text-[var(--color-text-tertiary)] uppercase">
                    Tipo de servicio
                  </p>
                  <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                    {order.serviceType}
                  </p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Personnel */}
      <section>
        <h3 className="text-xl font-semibold text-[var(--color-text-primary)]">
          Personal de campo
        </h3>
        <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
          Operarios y supervisores con certificaciones, estado y orden activa.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {fieldOperators.map((op) => (
            <Card
              key={op.id}
              variant="glass"
              padding="md"
              className={cn(
                "border",
                op.status === "En servicio" ? "border-[rgba(0,196,255,0.28)]" : "border-white/10",
              )}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-semibold text-[var(--color-text-primary)]">{op.name}</p>
                  <p className="text-xs text-[var(--color-text-tertiary)]">{op.role}</p>
                </div>
                <span
                  className={cn(
                    "shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold",
                    statusBadge(op.status),
                  )}
                >
                  {op.status}
                </span>
              </div>
              <div className="mt-3 flex flex-wrap gap-1">
                {op.certifications.map((c) => (
                  <span
                    key={c}
                    className="rounded-full bg-white/6 px-2 py-0.5 text-[10px] text-[var(--color-text-secondary)]"
                  >
                    {c}
                  </span>
                ))}
              </div>
              {op.activeOrder && (
                <p className="mt-3 text-xs text-[var(--color-brand-primary)]">
                  Orden activa: <strong>{op.activeOrder}</strong>
                </p>
              )}
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}

// ─── Execution Tab (Checklist + Photos) ──────────────────────────────────────

function ExecutionTab() {
  const cl = dynamicChecklist;
  const doneCount = cl.items.filter((i) => i.status === "ok").length;

  return (
    <div className="space-y-12">
      {/* Checklist */}
      <section>
        <SectionHeading
          eyebrow="Módulo · Checklists dinámicos"
          title="Checklist en ejecución"
          description={`Protocolo ${cl.protocol} — generado dinámicamente desde ${cl.generatedFrom}.`}
        />
        <div className="mt-6">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="text-[var(--color-text-secondary)]">
              {doneCount} / {cl.items.length} completados
            </span>
            <span className="font-semibold text-[var(--color-brand-primary)]">
              {cl.completionPct}%
            </span>
          </div>
          <div className="h-2 rounded-full bg-white/8">
            <div
              className="h-full rounded-full bg-[var(--color-brand-primary)] transition-all"
              style={{ width: `${cl.completionPct}%` }}
            />
          </div>
        </div>
        <div className="mt-6 space-y-2">
          {cl.items.map((item) => {
            const isDone = item.status === "ok";
            const isPending = item.status === "pendiente";
            return (
              <Card
                key={item.id}
                variant="glass"
                padding="md"
                className={cn(
                  "border",
                  isDone
                    ? "border-[rgba(0,255,133,0.18)]"
                    : isPending
                      ? "border-white/8"
                      : "border-[rgba(255,165,0,0.2)]",
                )}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={cn(
                      "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 text-[10px]",
                      isDone
                        ? "border-[var(--color-brand-accent)] bg-[rgba(0,255,133,0.15)] text-[var(--color-brand-accent)]"
                        : "border-white/20 bg-white/4",
                    )}
                  >
                    {isDone && "✓"}
                  </div>
                  <div className="flex-1">
                    <p
                      className={cn(
                        "text-sm",
                        isDone
                          ? "text-[var(--color-text-secondary)] line-through"
                          : "text-[var(--color-text-primary)]",
                      )}
                    >
                      {item.description}
                    </p>
                    <div className="mt-1 flex flex-wrap gap-2">
                      <span className="text-[10px] text-[var(--color-text-tertiary)]">
                        {item.category}
                      </span>
                      {item.required && (
                        <span className="text-[10px] text-[var(--color-brand-primary)]">
                          Obligatorio
                        </span>
                      )}
                      {item.evidence && (
                        <span className="flex items-center gap-1 text-[10px] text-[var(--color-text-tertiary)]">
                          <Camera className="h-2.5 w-2.5" /> Evidencia requerida
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Photo registry */}
      <section>
        <h3 className="text-xl font-semibold text-[var(--color-text-primary)]">
          Registro fotográfico
        </h3>
        <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
          Fotografías vinculadas a proyecto, cliente, activo, servicio, operario, fecha y hora.
        </p>

        {(["antes", "durante", "despues"] as const).map((stage) => {
          const photos = photoRecords.filter((p) => p.stage === stage);
          const stageLabel =
            stage === "antes" ? "Antes" : stage === "durante" ? "Durante" : "Después";
          const stageTone: FieldTone =
            stage === "antes" ? "accent" : stage === "durante" ? "primary" : "neutral";
          const t = toneClasses(stageTone);
          return (
            <div key={stage} className="mt-8">
              <div className="mb-4 flex items-center gap-2">
                <span className={cn("rounded-full px-3 py-1 text-xs font-semibold", t.badge)}>
                  {stageLabel}
                </span>
                <span className="text-xs text-[var(--color-text-tertiary)]">
                  {photos.length} foto{photos.length !== 1 ? "s" : ""} registrada
                  {photos.length !== 1 ? "s" : ""}
                </span>
              </div>
              {photos.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2">
                  {photos.map((photo) => (
                    <Card
                      key={photo.id}
                      variant="glass"
                      padding="md"
                      className={cn("border", t.border)}
                    >
                      {/* Photo placeholder */}
                      <div className="flex h-32 items-center justify-center rounded-lg bg-white/4 text-[var(--color-text-tertiary)]">
                        <Camera className="h-8 w-8 opacity-30" />
                      </div>
                      <p className="mt-3 text-sm font-semibold text-[var(--color-text-primary)]">
                        {photo.label}
                      </p>
                      <div className="mt-2 grid grid-cols-2 gap-1 text-[10px] text-[var(--color-text-tertiary)]">
                        <span>Operario: {photo.operator}</span>
                        <span>Activo: {photo.asset}</span>
                        <span>Fecha: {photo.date}</span>
                        <span>Hora: {photo.time}</span>
                      </div>
                      <span
                        className={cn(
                          "mt-2 inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold",
                          statusBadge(photo.syncStatus),
                        )}
                      >
                        {photo.syncStatus === "synced" ? "Sincronizada" : "Pendiente sync"}
                      </span>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card variant="glass" padding="md" className="border border-white/8">
                  <div className="flex items-center gap-3 text-[var(--color-text-tertiary)]">
                    <Camera className="h-4 w-4 opacity-40" />
                    <p className="text-sm">
                      Sin fotografías aún. Se capturarán durante la ejecución del servicio.
                    </p>
                  </div>
                </Card>
              )}
            </div>
          );
        })}
      </section>
    </div>
  );
}

// ─── Consumos Tab (Materials, Products, Equipment) ───────────────────────────

function ConsumosTab() {
  return (
    <div className="space-y-12">
      {/* Materials */}
      <section>
        <SectionHeading
          eyebrow="Módulo · Materiales"
          title="Materiales utilizados"
          description="Materiales asignados a la orden de trabajo. Trazabilidad completa por lote y turno."
        />
        <div className="mt-6 space-y-3">
          {materialRecords.map((mat) => (
            <Card key={mat.code} variant="glass" padding="md" className="border border-white/10">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-[var(--color-text-tertiary)]">
                      {mat.code}
                    </span>
                    <span
                      className={cn(
                        "rounded-full px-2 py-0.5 text-[10px] font-semibold",
                        statusBadge(mat.status),
                      )}
                    >
                      {mat.status}
                    </span>
                  </div>
                  <p className="mt-1 text-sm font-semibold text-[var(--color-text-primary)]">
                    {mat.name}
                  </p>
                  <p className="text-xs text-[var(--color-text-tertiary)]">{mat.category}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-[var(--color-brand-primary)]">
                    {mat.quantity} {mat.unit}
                  </p>
                  <p className="text-[10px] text-[var(--color-text-tertiary)]">
                    OT: {mat.workOrder}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Products */}
      <section>
        <h3 className="text-xl font-semibold text-[var(--color-text-primary)]">
          Productos consumidos
        </h3>
        <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
          Productos aplicados durante la ejecución con cantidades, diluciones y operario
          responsable.
        </p>
        <div className="mt-6 space-y-3">
          {productConsumptions.map((pc) => (
            <Card
              key={pc.code}
              variant="glass"
              padding="md"
              className="border border-[rgba(0,196,255,0.18)]"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <span className="font-mono text-xs text-[var(--color-text-tertiary)]">
                    {pc.code}
                  </span>
                  <p className="mt-1 text-sm font-semibold text-[var(--color-text-primary)]">
                    {pc.product}
                  </p>
                  <p className="text-xs text-[var(--color-text-tertiary)]">{pc.category}</p>
                </div>
                <div className="text-right">
                  <p className="text-base font-bold text-[var(--color-brand-primary)]">
                    {pc.quantity}
                  </p>
                  <p className="text-xs text-[var(--color-text-secondary)]">
                    Dilución: {pc.dilution}
                  </p>
                  <p className="text-[10px] text-[var(--color-text-tertiary)]">
                    {pc.operator} · {pc.time}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Equipment */}
      <section>
        <h3 className="text-xl font-semibold text-[var(--color-text-primary)]">
          Equipos utilizados
        </h3>
        <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
          Registro de equipos, tiempo de utilización y estado al finalizar.
        </p>
        <div className="mt-6 space-y-3">
          {equipmentRecords.map((eq) => (
            <Card
              key={eq.code}
              variant="glass"
              padding="md"
              className={cn(
                "border",
                eq.condition === "Óptimo"
                  ? "border-[rgba(0,255,133,0.18)]"
                  : "border-[rgba(255,165,0,0.2)]",
              )}
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-[var(--color-text-tertiary)]">
                      {eq.code}
                    </span>
                    <span
                      className={cn(
                        "rounded-full px-2 py-0.5 text-[10px] font-semibold",
                        statusBadge(eq.condition),
                      )}
                    >
                      {eq.condition}
                    </span>
                  </div>
                  <p className="mt-1 text-sm font-semibold text-[var(--color-text-primary)]">
                    {eq.name}
                  </p>
                  <p className="text-xs text-[var(--color-text-tertiary)]">{eq.type}</p>
                </div>
                <div className="text-right text-xs text-[var(--color-text-secondary)]">
                  <p>Inicio: {eq.startTime}</p>
                  <p>Fin: {eq.endTime}</p>
                  <p className="mt-1 font-semibold text-[var(--color-brand-primary)]">
                    Duración: {eq.duration}
                  </p>
                  <p className="text-[10px] text-[var(--color-text-tertiary)]">{eq.operator}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}

// ─── Incidents Tab ────────────────────────────────────────────────────────────

function IncidenciasTab() {
  return (
    <div className="space-y-12">
      {/* Incidents */}
      <section>
        <SectionHeading
          eyebrow="Módulo · Incidencias"
          title="Incidencias registradas"
          description="Hallazgos, fallas y eventos reportados durante la ejecución del servicio. Cada incidencia queda vinculada a la orden y trazable en OVI OS."
        />
        <div className="mt-6 space-y-4">
          {incidentRecords.map((inc) => {
            const t = toneClasses(inc.tone);
            return (
              <Card key={inc.code} variant="glass" padding="lg" className={cn("border", t.border)}>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs text-[var(--color-text-tertiary)]">
                        {inc.code}
                      </span>
                      <span
                        className={cn(
                          "rounded-full px-2 py-0.5 text-[10px] font-semibold",
                          t.badge,
                        )}
                      >
                        Severidad {inc.severity}
                      </span>
                      <span
                        className={cn(
                          "rounded-full px-2 py-0.5 text-[10px] font-semibold",
                          statusBadge(inc.status),
                        )}
                      >
                        {inc.status}
                      </span>
                    </div>
                    <p className="mt-2 text-sm font-semibold text-[var(--color-text-primary)]">
                      {inc.type}
                    </p>
                  </div>
                  <p className="text-xs text-[var(--color-text-tertiary)]">{inc.reportedAt}</p>
                </div>
                <p className="mt-3 text-sm text-[var(--color-text-secondary)]">{inc.description}</p>
                <p className="mt-2 text-xs text-[var(--color-text-tertiary)]">
                  Reportado por: {inc.reportedBy} · OT: {inc.workOrder}
                </p>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Observations */}
      <section>
        <h3 className="text-xl font-semibold text-[var(--color-text-primary)]">Observaciones</h3>
        <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
          Notas técnicas, de seguridad y del cliente registradas durante la ejecución.
        </p>
        <div className="mt-6 space-y-3">
          {observationRecords.map((obs) => {
            const catColor =
              obs.category === "Seguridad"
                ? "text-[var(--color-brand-warning,#f90)] bg-[rgba(255,165,0,0.08)]"
                : obs.category === "Cliente"
                  ? "text-[var(--color-brand-primary)] bg-[rgba(0,196,255,0.08)]"
                  : "text-[var(--color-brand-accent)] bg-[rgba(0,255,133,0.08)]";
            return (
              <Card key={obs.id} variant="glass" padding="md" className="border border-white/10">
                <div className="flex items-start justify-between gap-2">
                  <span
                    className={cn("rounded-full px-2 py-0.5 text-[10px] font-semibold", catColor)}
                  >
                    {obs.category}
                  </span>
                  <span className="text-[10px] text-[var(--color-text-tertiary)]">
                    Fase: {obs.phase} · {obs.timestamp}
                  </span>
                </div>
                <p className="mt-2 text-sm text-[var(--color-text-primary)]">{obs.text}</p>
                <p className="mt-1 text-[10px] text-[var(--color-text-tertiary)]">
                  {obs.author} · OT: {obs.workOrder}
                </p>
              </Card>
            );
          })}
        </div>
      </section>
    </div>
  );
}

// ─── Closure Tab ─────────────────────────────────────────────────────────────

function CierreTab() {
  const sc = serviceClosure;
  return (
    <div className="space-y-12">
      <SectionHeading
        eyebrow="Módulo · Cierre de servicio"
        title="Cierre y sincronización"
        description="Acta de cierre digital, firma del cliente y sincronización automática con OVI OS y OVI Core."
      />

      {/* Closure summary */}
      <Card variant="glass" padding="lg" className="border border-[rgba(0,255,133,0.28)]">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm text-[var(--color-text-tertiary)]">
                {sc.workOrder}
              </span>
              <span className="rounded-full bg-[rgba(0,255,133,0.14)] px-3 py-1 text-xs font-semibold text-[var(--color-brand-accent)]">
                Servicio cerrado
              </span>
            </div>
            <p className="mt-2 text-lg font-bold text-[var(--color-text-primary)]">
              Lavado de flota — turno mañana
            </p>
            <p className="text-sm text-[var(--color-text-secondary)]">
              Centro Logístico Sur · {sc.closedAt}
            </p>
          </div>
          <div className="text-right">
            <p className="text-4xl font-bold text-[var(--color-brand-accent)]">
              {sc.qualityScore}%
            </p>
            <p className="text-xs text-[var(--color-text-tertiary)]">Calidad del cierre</p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 border-t border-white/8 pt-6 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-[10px] tracking-wider text-[var(--color-text-tertiary)] uppercase">
              Cerrado por
            </p>
            <p className="mt-1 text-sm text-[var(--color-text-primary)]">{sc.closedBy}</p>
          </div>
          <div>
            <p className="text-[10px] tracking-wider text-[var(--color-text-tertiary)] uppercase">
              Firma del cliente
            </p>
            <p className={cn("mt-1 text-sm font-semibold", statusBadge(sc.clientSignature))}>
              {sc.clientSignature}
            </p>
          </div>
          <div>
            <p className="text-[10px] tracking-wider text-[var(--color-text-tertiary)] uppercase">
              Fotografías
            </p>
            <p className="mt-1 text-sm text-[var(--color-brand-primary)]">
              {sc.photosAttached} adjuntas
            </p>
          </div>
          <div>
            <p className="text-[10px] tracking-wider text-[var(--color-text-tertiary)] uppercase">
              Checklist
            </p>
            <p className="mt-1 text-sm text-[var(--color-brand-accent)]">
              {sc.checklistCompletion}% completado
            </p>
          </div>
        </div>

        <p className="mt-6 text-sm text-[var(--color-text-secondary)]">{sc.completionNotes}</p>

        <div className="mt-6 flex flex-wrap gap-3 border-t border-white/8 pt-4">
          <div
            className={cn(
              "flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold",
              sc.syncedToOviOs
                ? "bg-[rgba(0,255,133,0.12)] text-[var(--color-brand-accent)]"
                : "bg-white/8 text-[var(--color-text-secondary)]",
            )}
          >
            <Wifi className="h-3 w-3" />
            OVI OS {sc.syncedToOviOs ? "— Sincronizado" : "— Pendiente"}
          </div>
          <div
            className={cn(
              "flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold",
              sc.syncedToOviCore
                ? "bg-[rgba(0,255,133,0.12)] text-[var(--color-brand-accent)]"
                : "bg-white/8 text-[var(--color-text-secondary)]",
            )}
          >
            <RefreshCw className="h-3 w-3" />
            OVI Core {sc.syncedToOviCore ? "— Sincronizado" : "— Pendiente"}
          </div>
        </div>
      </Card>

      {/* Digital signature architecture */}
      <section>
        <h3 className="text-xl font-semibold text-[var(--color-text-primary)]">Firma digital</h3>
        <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
          Arquitectura preparada para captura de firma digital del cliente en tablet o dispositivo
          móvil. La firma queda vinculada al acta de cierre y se sincroniza con OVI OS.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            {
              title: "Captura en campo",
              desc: "Firma táctil en tablet o celular del responsable del cliente.",
              icon: <Signature className="h-5 w-5" />,
            },
            {
              title: "Vinculación al acta",
              desc: "La firma queda registrada con fecha, hora, geolocalización y OT.",
              icon: <ClipboardCheck className="h-5 w-5" />,
            },
            {
              title: "Sincronización",
              desc: "Acta firmada disponible en OVI OS para el cliente al cerrar el servicio.",
              icon: <RefreshCw className="h-5 w-5" />,
            },
          ].map((item) => (
            <Card key={item.title} variant="glass" padding="md" className="border border-white/10">
              <div className="flex items-center gap-2 text-[var(--color-brand-primary)]">
                {item.icon}
                <p className="text-sm font-semibold text-[var(--color-text-primary)]">
                  {item.title}
                </p>
              </div>
              <p className="mt-2 text-xs text-[var(--color-text-secondary)]">{item.desc}</p>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}

// ─── Architecture Tab ─────────────────────────────────────────────────────────

function ArquitecturaTab() {
  return (
    <div className="space-y-14">
      {/* Architecture pillars */}
      <section>
        <SectionHeading
          eyebrow="Arquitectura · OVI Field"
          title="Diseño del sistema"
          description="OVI Field sigue una arquitectura modular, offline-first, compatible con web, tablet y aplicación móvil."
        />
        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {archPillars.map((pillar) => (
            <Card
              key={pillar.title}
              variant="glass"
              padding="lg"
              className="border border-white/10"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[rgba(0,196,255,0.1)] text-2xl text-[var(--color-brand-primary)]">
                {pillar.icon}
              </div>
              <p className="text-base font-semibold text-[var(--color-text-primary)]">
                {pillar.title}
              </p>
              <ul className="mt-3 space-y-1.5">
                {pillar.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-xs text-[var(--color-text-secondary)]"
                  >
                    <ChevronRight className="mt-0.5 h-3 w-3 shrink-0 text-[var(--color-brand-primary)]" />
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </section>

      {/* Integrations */}
      <section>
        <h3 className="text-xl font-semibold text-[var(--color-text-primary)]">
          Integraciones con el ecosistema OVI
        </h3>
        <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
          OVI Field se conecta con OVI Core, OVI OS, OVI AI y OVI Lab para trazabilidad total.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {fieldIntegrations.map((int) => {
            const t = toneClasses(int.tone);
            return (
              <Card
                key={int.platform}
                variant="glass"
                padding="lg"
                className={cn("border", t.border)}
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="text-base font-semibold text-[var(--color-text-primary)]">
                    {int.platform}
                  </p>
                  <span
                    className={cn(
                      "shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold",
                      t.badge,
                    )}
                  >
                    {int.status}
                  </span>
                </div>
                <p className="mt-2 text-sm text-[var(--color-text-secondary)]">{int.description}</p>
                <p className="mt-2 text-xs text-[var(--color-text-tertiary)] italic">
                  {int.dataFlow}
                </p>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Offline mode */}
      <section>
        <h3 className="text-xl font-semibold text-[var(--color-text-primary)]">Modo offline</h3>
        <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
          OVI Field está diseñado para operar sin conexión. Al recuperar internet, sincroniza
          automáticamente con OVI OS y OVI Core.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            {
              icon: <WifiOff className="h-5 w-5" />,
              title: "Operación offline",
              desc: "Checklists, fotos, materiales e incidencias se registran localmente.",
            },
            {
              icon: <ArchiveRestore className="h-5 w-5" />,
              title: "Cola de sincronización",
              desc: "Todos los cambios se encolan y se envían al reconectar.",
            },
            {
              icon: <RefreshCw className="h-5 w-5" />,
              title: "Sync automático",
              desc: "Sin acción del usuario — la sincronización es transparente.",
            },
          ].map((item) => (
            <Card key={item.title} variant="glass" padding="md" className="border border-white/10">
              <div className="flex items-center gap-2 text-[var(--color-brand-primary)]">
                {item.icon}
                <p className="text-sm font-semibold text-[var(--color-text-primary)]">
                  {item.title}
                </p>
              </div>
              <p className="mt-2 text-xs text-[var(--color-text-secondary)]">{item.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Future capabilities */}
      <section>
        <h3 className="text-xl font-semibold text-[var(--color-text-primary)]">
          Preparación futura
        </h3>
        <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
          La arquitectura de OVI Field está diseñada para incorporar tecnologías avanzadas.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
          {futureCapabilities.map((cap) => {
            const t = toneClasses(cap.tone);
            return (
              <Card key={cap.label} variant="glass" padding="md" className={cn("border", t.border)}>
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-semibold text-[var(--color-text-primary)]">
                    {cap.label}
                  </p>
                  <span
                    className={cn(
                      "shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold",
                      t.badge,
                    )}
                  >
                    {cap.readiness}
                  </span>
                </div>
                <p className="mt-1.5 text-xs text-[var(--color-text-secondary)]">
                  {cap.description}
                </p>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Data models summary */}
      <section>
        <h3 className="text-xl font-semibold text-[var(--color-text-primary)]">Modelos de datos</h3>
        <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
          Entidades core del módulo OVI Field y sus relaciones con el ecosistema OVI.
        </p>
        <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {[
            {
              model: "WorkOrder",
              fields: ["code", "status", "protocol", "operators", "syncStatus"],
            },
            {
              model: "FieldOperator",
              fields: ["id", "role", "certifications", "activeOrder"],
            },
            {
              model: "DynamicChecklist",
              fields: ["protocol", "items[]", "completionPct", "generatedFrom"],
            },
            {
              model: "PhotoRecord",
              fields: ["stage", "workOrder", "client", "asset", "operator", "timestamp"],
            },
            {
              model: "ProductConsumption",
              fields: ["product", "quantity", "dilution", "workOrder", "operator"],
            },
            {
              model: "EquipmentRecord",
              fields: ["name", "type", "duration", "condition", "workOrder"],
            },
            {
              model: "IncidentRecord",
              fields: ["type", "severity", "description", "status", "reportedBy"],
            },
            {
              model: "ServiceClosure",
              fields: ["clientSignature", "qualityScore", "syncedToOviOs", "syncedToOviCore"],
            },
          ].map((m) => (
            <Card key={m.model} variant="glass" padding="md" className="border border-white/8">
              <p className="font-mono text-sm font-semibold text-[var(--color-brand-primary)]">
                {m.model}
              </p>
              <ul className="mt-2 space-y-0.5">
                {m.fields.map((f) => (
                  <li key={f} className="font-mono text-[10px] text-[var(--color-text-tertiary)]">
                    · {f}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}

// ─── Tab config ───────────────────────────────────────────────────────────────

const TABS = [
  {
    value: "dashboard",
    label: "Dashboard",
    icon: Activity,
    summary: "KPIs en tiempo real y flujo de ejecución activo.",
  },
  {
    value: "ordenes",
    label: "Órdenes",
    icon: ClipboardList,
    summary: "Órdenes de trabajo y asignación de personal.",
  },
  {
    value: "ejecucion",
    label: "Ejecución",
    icon: CheckSquare,
    summary: "Checklist dinámico y registro fotográfico.",
  },
  {
    value: "consumos",
    label: "Consumos",
    icon: Package,
    summary: "Materiales, productos y equipos utilizados.",
  },
  {
    value: "incidencias",
    label: "Incidencias",
    icon: AlertTriangle,
    summary: "Incidencias y observaciones del servicio.",
  },
  {
    value: "cierre",
    label: "Cierre",
    icon: Signature,
    summary: "Cierre, firma digital y sincronización.",
  },
  {
    value: "arquitectura",
    label: "Arquitectura",
    icon: Layers,
    summary: "Diseño del sistema, integraciones y capacidades futuras.",
  },
] as const;

// ─── Main component ───────────────────────────────────────────────────────────

export function OviFieldPage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg-base,#0a0a0a)]">
      {/* Header */}
      <div className="relative overflow-hidden border-b border-white/8">
        <div className="absolute inset-0 bg-gradient-to-br from-[rgba(0,196,255,0.04)] via-transparent to-[rgba(0,71,171,0.06)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 md:px-8 lg:py-24">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div>
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[rgba(0,196,255,0.3)] bg-[rgba(0,196,255,0.08)] px-3 py-1 text-[11px] font-semibold tracking-[0.2em] text-[var(--color-brand-primary)] uppercase">
                  <Radio className="h-2.5 w-2.5 animate-pulse" />
                  OVI Field · WO-010
                </span>
                <span className="rounded-full bg-[rgba(0,255,133,0.12)] px-3 py-1 text-[11px] font-semibold text-[var(--color-brand-accent)]">
                  Arquitectura lista
                </span>
              </div>
              <h1 className="mt-5 text-4xl font-black tracking-tight text-[var(--color-text-primary)] md:text-5xl lg:text-6xl">
                OVI Field
              </h1>
              <p className="mt-3 max-w-2xl text-base text-[var(--color-text-secondary)] md:text-lg">
                Plataforma inteligente de operaciones en campo para supervisores y operarios.
                Digitaliza la ejecución completa de servicios OVI con trazabilidad total.
              </p>
            </div>

            {/* Platform badges */}
            <div className="flex flex-wrap gap-2">
              {[
                { icon: <Eye className="h-3.5 w-3.5" />, label: "Web" },
                { icon: <Cpu className="h-3.5 w-3.5" />, label: "Tablet" },
                { icon: <Smartphone className="h-3.5 w-3.5" />, label: "App Móvil" },
              ].map((p) => (
                <div
                  key={p.label}
                  className="flex items-center gap-1.5 rounded-full border border-white/12 bg-white/5 px-3 py-1.5 text-xs text-[var(--color-text-secondary)]"
                >
                  {p.icon}
                  {p.label}
                </div>
              ))}
            </div>
          </div>

          {/* Philosophy strip */}
          <div className="mt-8 grid gap-3 md:grid-cols-4">
            {[
              { icon: <Zap className="h-4 w-4" />, text: "Ejecución inteligente" },
              { icon: <ShieldCheck className="h-4 w-4" />, text: "Trazabilidad total" },
              { icon: <WifiOff className="h-4 w-4" />, text: "Offline-first" },
              { icon: <Users className="h-4 w-4" />, text: "Conectado con OVI Core" },
            ].map((p) => (
              <div
                key={p.text}
                className="flex items-center gap-2 rounded-xl border border-white/8 bg-white/3 px-4 py-3 text-sm text-[var(--color-text-secondary)]"
              >
                <span className="text-[var(--color-brand-primary)]">{p.icon}</span>
                {p.text}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
        <Tabs defaultValue="dashboard" className="space-y-8">
          <TabsList className="flex h-auto flex-wrap gap-1 rounded-xl bg-white/4 p-1">
            {TABS.map(({ value, label, icon: Icon }) => (
              <TabsTrigger
                key={value}
                value={value}
                className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-[var(--color-text-secondary)] transition-all data-[state=active]:bg-[rgba(0,196,255,0.12)] data-[state=active]:text-[var(--color-brand-primary)] md:text-sm"
              >
                <Icon className="h-3.5 w-3.5" />
                {label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="dashboard">
            <DashboardTab />
          </TabsContent>
          <TabsContent value="ordenes">
            <WorkOrdersTab />
          </TabsContent>
          <TabsContent value="ejecucion">
            <ExecutionTab />
          </TabsContent>
          <TabsContent value="consumos">
            <ConsumosTab />
          </TabsContent>
          <TabsContent value="incidencias">
            <IncidenciasTab />
          </TabsContent>
          <TabsContent value="cierre">
            <CierreTab />
          </TabsContent>
          <TabsContent value="arquitectura">
            <ArquitecturaTab />
          </TabsContent>
        </Tabs>
      </div>

      {/* Footer integration note */}
      <div className="border-t border-white/8">
        <div className="mx-auto max-w-7xl px-4 py-8 md:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-[var(--color-text-tertiary)]">
            <p>OVI Field · WO-010 · Arquitectura lista para integración con OVI Core y OVI OS.</p>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 text-[var(--color-brand-accent)]">
                <Wifi className="h-3 w-3" /> OVI OS conectado
              </span>
              <span className="text-white/20">·</span>
              <span className="flex items-center gap-1 text-[var(--color-brand-primary)]">
                <RefreshCw className="h-3 w-3" /> OVI Core sincronizado
              </span>
              <span className="text-white/20">·</span>
              <span className="flex items-center gap-1">
                <Wrench className="h-3 w-3" /> OVI Field v1.0
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
