"use client";

/**
 * OVI Analytics — Executive Intelligence Dashboard
 * Work Order 011
 *
 * Transforms operational data from OVI OS, OVI Field, OVI Lab and OVI Core
 * into high-value executive indicators that help clients make better decisions.
 *
 * Tabs:
 *   dashboard     — Executive KPIs overview
 *   operativos    — Operational indicators (services, assets, incidents)
 *   ambientales   — Environmental indicators (water, chemicals, biodegradable)
 *   economicos    — Economic indicators (value, cost, ROI)
 *   tendencias    — 12-month trend analysis
 *   comparativos  — Multi-dimensional comparative analysis
 *   reportes      — Report generation (PDF, executive, technical, project)
 *   arquitectura  — System architecture + integrations + future AI capabilities
 */

import {
  AlertTriangle,
  BarChart3,
  Building2,
  Calendar,
  CheckCircle,
  ClipboardList,
  Clock,
  Database,
  Droplets,
  Factory,
  FileText,
  FolderOpen,
  Globe,
  Layers,
  Leaf,
  MapPin,
  Package,
  Sparkles,
  Star,
  Target,
  TrendingDown,
  TrendingUp,
  Wrench,
  Zap,
} from "lucide-react";
import { Card, Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui";
import { cn } from "@utils/cn";
import {
  analyticsPillars,
  analyticsIntegrations,
  assetRecords,
  comparativeByClient,
  comparativeByService,
  comparativeDimensions,
  economicKpis,
  environmentalKpis,
  executiveKpis,
  productSustainabilityRecords,
  reportTemplates,
  serviceRecords,
  trendData,
  type AnalyticsTone,
  type TrendDirection,
} from "./ovi-analytics-data";
import { useOviAnalyticsStore } from "@store/ovi-analytics.store";

// ─── Icon resolver ────────────────────────────────────────────────────────────

const ICON_MAP: Record<string, React.ElementType> = {
  CheckCircle,
  Target,
  Clock,
  Package,
  Droplets,
  Calendar,
  Layers,
  AlertTriangle,
  Star,
  BarChart3,
  Building2,
  Factory,
  MapPin,
  Globe,
  Wrench,
  Database,
  FileText,
  FolderOpen,
  Sparkles,
  ClipboardList,
  Leaf,
  TrendingUp,
  Zap,
};

function DynamicIcon({ name, className }: { name: string; className?: string }) {
  const Icon = ICON_MAP[name] ?? Zap;
  return <Icon className={className} />;
}

// ─── Tone helpers ─────────────────────────────────────────────────────────────

function toneClasses(tone: AnalyticsTone): string {
  switch (tone) {
    case "primary":
      return "text-[var(--color-brand-primary)]";
    case "accent":
      return "text-[var(--color-brand-accent)]";
    case "warning":
      return "text-amber-400";
    case "eco":
      return "text-emerald-400";
    case "neutral":
    default:
      return "text-[var(--color-text-secondary)]";
  }
}

function toneBgClasses(tone: AnalyticsTone): string {
  switch (tone) {
    case "primary":
      return "bg-[var(--color-brand-primary)]/10";
    case "accent":
      return "bg-[var(--color-brand-accent)]/10";
    case "warning":
      return "bg-amber-400/10";
    case "eco":
      return "bg-emerald-400/10";
    case "neutral":
    default:
      return "bg-white/5";
  }
}

function toneBorderClasses(tone: AnalyticsTone): string {
  switch (tone) {
    case "primary":
      return "border-[var(--color-brand-primary)]/20";
    case "accent":
      return "border-[var(--color-brand-accent)]/20";
    case "warning":
      return "border-amber-400/20";
    case "eco":
      return "border-emerald-400/20";
    case "neutral":
    default:
      return "border-white/10";
  }
}

// ─── Trend badge ──────────────────────────────────────────────────────────────

function TrendBadge({ trend, change }: { trend: TrendDirection; change: string }) {
  const isPositive = trend === "up";
  const isNegative = trend === "down";
  const isStable = trend === "stable";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
        isPositive && "bg-emerald-400/10 text-emerald-400",
        isNegative && "bg-[var(--color-brand-primary)]/10 text-[var(--color-brand-primary)]",
        isStable && "bg-white/5 text-[var(--color-text-secondary)]",
      )}
    >
      {isPositive && <TrendingUp className="h-3 w-3" />}
      {isNegative && <TrendingDown className="h-3 w-3" />}
      {change}
    </span>
  );
}

// ─── Module tabs config ───────────────────────────────────────────────────────

const moduleTabs = [
  {
    value: "dashboard",
    label: "Dashboard Ejecutivo",
    icon: BarChart3,
    summary: "Indicadores clave, cumplimiento del plan y visión general de la operación.",
  },
  {
    value: "operativos",
    label: "Indicadores Operativos",
    icon: CheckCircle,
    summary: "Servicios ejecutados, activos atendidos e incidencias reportadas.",
  },
  {
    value: "ambientales",
    label: "Indicadores Ambientales",
    icon: Leaf,
    summary: "Ahorro de agua, reducción química, biodegradables e índice de sostenibilidad.",
  },
  {
    value: "economicos",
    label: "Indicadores Económicos",
    icon: TrendingUp,
    summary: "Valor de servicios, costos operativos y ROI por cliente.",
  },
  {
    value: "tendencias",
    label: "Tendencias",
    icon: BarChart3,
    summary: "Evolución de indicadores clave en los últimos 12 meses.",
  },
  {
    value: "comparativos",
    label: "Comparativos",
    icon: Layers,
    summary: "Análisis multidimensional: cliente, industria, planta, activo, servicio y producto.",
  },
  {
    value: "reportes",
    label: "Reportes",
    icon: FileText,
    summary: "Generación de reportes PDF ejecutivos, técnicos, ambientales y por proyecto.",
  },
  {
    value: "arquitectura",
    label: "Arquitectura",
    icon: Database,
    summary: "Integraciones con el ecosistema OVI y capacidades futuras de OVI AI.",
  },
];

// ─── Subcomponents ────────────────────────────────────────────────────────────

function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold text-white">{title}</h2>
      {subtitle && <p className="mt-1 text-sm text-[var(--color-text-secondary)]">{subtitle}</p>}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    Completado: "bg-emerald-400/10 text-emerald-400 border-emerald-400/20",
    "En proceso": "bg-[var(--color-brand-primary)]/10 text-[var(--color-brand-primary)] border-[var(--color-brand-primary)]/20",
    Pendiente: "bg-white/5 text-[var(--color-text-secondary)] border-white/10",
    Reprogramado: "bg-amber-400/10 text-amber-400 border-amber-400/20",
    "Al día": "bg-emerald-400/10 text-emerald-400 border-emerald-400/20",
    "Por vencer": "bg-amber-400/10 text-amber-400 border-amber-400/20",
    Vencido: "bg-red-400/10 text-red-400 border-red-400/20",
    connected: "bg-emerald-400/10 text-emerald-400",
    planned: "bg-[var(--color-brand-accent)]/10 text-[var(--color-brand-accent)]",
    active: "bg-emerald-400/10 text-emerald-400",
  };
  return (
    <span className={cn("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium", map[status] ?? "bg-white/5 text-white/50 border-white/10")}>
      {status === "connected" ? "Conectado" : status === "planned" ? "Planificado" : status === "active" ? "Activo" : status}
    </span>
  );
}

// ─── Tab: Dashboard Ejecutivo ─────────────────────────────────────────────────

function TabDashboard() {
  return (
    <div className="space-y-8">
      <SectionHeader
        title="Dashboard Ejecutivo"
        subtitle="Indicadores de alto valor que responden: ¿Qué resultados hemos obtenido? ¿Qué áreas requieren mayor atención?"
      />

      {/* KPI Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {executiveKpis.map((kpi) => (
          <Card key={kpi.id} className={cn("glass border p-5", toneBorderClasses(kpi.tone))}>
            <div className="flex items-start justify-between gap-3">
              <div className={cn("flex h-10 w-10 items-center justify-center rounded-lg", toneBgClasses(kpi.tone))}>
                <DynamicIcon name={kpi.icon} className={cn("h-5 w-5", toneClasses(kpi.tone))} />
              </div>
              <TrendBadge trend={kpi.trend} change={kpi.change} />
            </div>
            <div className="mt-4">
              <div className="flex items-baseline gap-1.5">
                <span className={cn("text-3xl font-black", toneClasses(kpi.tone))}>{kpi.value}</span>
                {kpi.unit && <span className="text-sm text-[var(--color-text-secondary)]">{kpi.unit}</span>}
              </div>
              <p className="mt-1 text-sm font-medium text-white">{kpi.label}</p>
              <p className="mt-1 text-xs text-[var(--color-text-secondary)]">{kpi.description}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Quick summary bar */}
      <Card className="glass border border-white/10 p-5">
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-emerald-400" />
            <span className="text-sm text-[var(--color-text-secondary)]">
              Datos actualizados al <span className="text-white">11 Jul 2024</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-[var(--color-brand-primary)]" />
            <span className="text-sm text-[var(--color-text-secondary)]">
              Período activo: <span className="text-white">Jul 2023 – Jul 2024</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-[var(--color-brand-accent)]" />
            <span className="text-sm text-[var(--color-text-secondary)]">
              OVI AI listo para generar resúmenes ejecutivos en próxima versión
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
}

// ─── Tab: Indicadores Operativos ──────────────────────────────────────────────

function TabOperativos() {
  return (
    <div className="space-y-8">
      <SectionHeader
        title="Indicadores Operativos"
        subtitle="Servicios ejecutados, activos atendidos, frecuencia de intervención e incidencias."
      />

      {/* Services table */}
      <div>
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-[var(--color-text-secondary)]">
          Servicios recientes
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                {["Código", "Cliente", "Servicio", "Estado", "Fecha", "Duración", "Cumplimiento"].map((h) => (
                  <th key={h} className="pb-3 pr-4 text-left text-xs font-medium text-[var(--color-text-secondary)]">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {serviceRecords.map((rec) => (
                <tr key={rec.code} className="group transition-colors hover:bg-white/3">
                  <td className="py-3 pr-4 font-mono text-xs text-[var(--color-brand-primary)]">{rec.code}</td>
                  <td className="py-3 pr-4 text-white">{rec.client}</td>
                  <td className="py-3 pr-4 text-[var(--color-text-secondary)]">{rec.service}</td>
                  <td className="py-3 pr-4">
                    <StatusBadge status={rec.status} />
                  </td>
                  <td className="py-3 pr-4 text-[var(--color-text-secondary)]">{rec.executionDate}</td>
                  <td className="py-3 pr-4 text-[var(--color-text-secondary)]">{rec.duration}</td>
                  <td className="py-3 pr-4">
                    {rec.complianceScore > 0 ? (
                      <span className={cn("font-bold", rec.complianceScore >= 95 ? "text-emerald-400" : "text-amber-400")}>
                        {rec.complianceScore}%
                      </span>
                    ) : (
                      <span className="text-[var(--color-text-secondary)]">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Asset registry */}
      <div>
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-[var(--color-text-secondary)]">
          Activos atendidos
        </h3>
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          {assetRecords.map((asset) => (
            <Card key={asset.id} className={cn("glass border p-4", toneBorderClasses(asset.tone))}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-medium text-white">{asset.name}</p>
                  <p className="mt-0.5 text-xs text-[var(--color-text-secondary)]">{asset.client} · {asset.type}</p>
                </div>
                <StatusBadge status={asset.status} />
              </div>
              <div className="mt-3 flex flex-wrap gap-4 text-xs text-[var(--color-text-secondary)]">
                <span>{asset.servicesCount} servicios</span>
                <span>Último: {asset.lastService}</span>
                <span>Próximo: {asset.nextService}</span>
                <span>Índice de recursos: <span className={cn("font-bold", toneClasses(asset.tone))}>{asset.resourceIndex}</span></span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Tab: Indicadores Ambientales ─────────────────────────────────────────────

function TabAmbientales() {
  return (
    <div className="space-y-8">
      <SectionHeader
        title="Indicadores Ambientales"
        subtitle="Medición del impacto ambiental de las operaciones OVI: agua, química, biodegradabilidad y sostenibilidad."
      />

      {/* Environmental KPIs */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {environmentalKpis.map((kpi) => (
          <Card key={kpi.id} className={cn("glass border p-5", toneBorderClasses(kpi.tone))}>
            <div className="flex items-center gap-3">
              <div className={cn("flex h-10 w-10 items-center justify-center rounded-lg", toneBgClasses(kpi.tone))}>
                <Leaf className={cn("h-5 w-5", toneClasses(kpi.tone))} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-[var(--color-text-secondary)]">{kpi.label}</p>
                <div className="flex items-baseline gap-1">
                  <span className={cn("text-2xl font-black", toneClasses(kpi.tone))}>{kpi.value}</span>
                  {kpi.unit && <span className="text-xs text-[var(--color-text-secondary)]">{kpi.unit}</span>}
                </div>
              </div>
            </div>
            <div className="mt-3 space-y-1">
              <p className="text-xs text-[var(--color-text-secondary)]">{kpi.baseline}</p>
              <TrendBadge trend={kpi.trend} change={kpi.saving} />
              <p className="text-xs text-[var(--color-text-secondary)]">{kpi.description}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Product sustainability table */}
      <div>
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-[var(--color-text-secondary)]">
          Perfil de sostenibilidad por producto
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                {["Producto", "Categoría", "Biodegradable", "Etiqueta Eco", "Uso (kg)", "CO₂ equiv."].map((h) => (
                  <th key={h} className="pb-3 pr-4 text-left text-xs font-medium text-[var(--color-text-secondary)]">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {productSustainabilityRecords.map((p) => (
                <tr key={p.name} className="hover:bg-white/3 transition-colors">
                  <td className="py-3 pr-4 font-medium text-white">{p.name}</td>
                  <td className="py-3 pr-4 text-[var(--color-text-secondary)]">{p.category}</td>
                  <td className="py-3 pr-4">
                    <span className={cn("font-medium", p.biodegradable ? "text-emerald-400" : "text-[var(--color-text-secondary)]")}>
                      {p.biodegradable ? "Sí" : "No"}
                    </span>
                  </td>
                  <td className="py-3 pr-4">
                    {p.ecoLabel ? (
                      <span className="rounded-full bg-emerald-400/10 px-2 py-0.5 text-xs text-emerald-400">{p.ecoLabel}</span>
                    ) : (
                      <span className="text-[var(--color-text-secondary)]">—</span>
                    )}
                  </td>
                  <td className="py-3 pr-4 text-[var(--color-text-secondary)]">{p.usageKg}</td>
                  <td className="py-3 pr-4">
                    <span className={cn("font-medium", p.co2Equiv === "Bajo" ? "text-emerald-400" : "text-amber-400")}>
                      {p.co2Equiv}
                    </span>
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

// ─── Tab: Indicadores Económicos ──────────────────────────────────────────────

function TabEconomicos() {
  return (
    <div className="space-y-8">
      <SectionHeader
        title="Indicadores Económicos"
        subtitle="Valor generado, costos operativos y retorno sobre la inversión por cliente."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {economicKpis.map((kpi) => (
          <Card key={kpi.id} className={cn("glass border p-5", toneBorderClasses(kpi.tone))}>
            <div className="flex items-start justify-between gap-3">
              <div className={cn("flex h-10 w-10 items-center justify-center rounded-lg", toneBgClasses(kpi.tone))}>
                <TrendingUp className={cn("h-5 w-5", toneClasses(kpi.tone))} />
              </div>
              <TrendBadge trend={kpi.trend} change={kpi.change} />
            </div>
            <div className="mt-4">
              <span className={cn("text-3xl font-black", toneClasses(kpi.tone))}>{kpi.value}</span>
              <p className="mt-1 text-sm font-medium text-white">{kpi.label}</p>
              <p className="mt-1 text-xs text-[var(--color-text-secondary)]">{kpi.description}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* ROI note */}
      <Card className="glass border border-[var(--color-brand-accent)]/20 p-5">
        <div className="flex items-start gap-3">
          <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-brand-accent)]" />
          <div>
            <p className="font-medium text-white">Preparado para OVI AI</p>
            <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
              En próximas versiones, OVI AI generará análisis económicos detallados por cliente e industria,
              identificando oportunidades de ahorro y optimización de costos operativos.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

// ─── Tab: Tendencias ──────────────────────────────────────────────────────────

function TrendBar({ value, max, color }: { value: number; max: number; color: string }) {
  const pct = Math.round((value / max) * 100);
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-white/5">
      <div className={cn("h-full rounded-full transition-all duration-500", color)} style={{ width: `${pct}%` }} />
    </div>
  );
}

function TabTendencias() {
  return (
    <div className="space-y-8">
      <SectionHeader
        title="Tendencias"
        subtitle="Evolución de indicadores clave durante los últimos 12 meses."
      />

      {/* Services + compliance trend */}
      <div>
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-[var(--color-text-secondary)]">
          Servicios ejecutados y cumplimiento del plan
        </h3>
        <div className="space-y-3">
          {trendData.map((pt) => (
            <div key={pt.period} className="grid grid-cols-[5rem_1fr_4rem_1fr_4rem] items-center gap-3">
              <span className="text-xs text-[var(--color-text-secondary)]">{pt.period}</span>
              <TrendBar value={pt.services} max={30} color="bg-[var(--color-brand-primary)]" />
              <span className="text-right text-xs font-medium text-[var(--color-brand-primary)]">{pt.services}</span>
              <TrendBar value={pt.compliance} max={100} color="bg-[var(--color-brand-accent)]" />
              <span className="text-right text-xs font-medium text-[var(--color-brand-accent)]">{pt.compliance}%</span>
            </div>
          ))}
        </div>
        <div className="mt-3 flex gap-6 text-xs text-[var(--color-text-secondary)]">
          <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[var(--color-brand-primary)]" /> Servicios</span>
          <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[var(--color-brand-accent)]" /> Cumplimiento (%)</span>
        </div>
      </div>

      {/* Water + chemical trend */}
      <div>
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-[var(--color-text-secondary)]">
          Consumo de agua y productos químicos
        </h3>
        <div className="space-y-3">
          {trendData.map((pt) => (
            <div key={pt.period} className="grid grid-cols-[5rem_1fr_5rem_1fr_4rem] items-center gap-3">
              <span className="text-xs text-[var(--color-text-secondary)]">{pt.period}</span>
              <TrendBar value={pt.waterUsage} max={9500} color="bg-[var(--color-brand-primary)]/60" />
              <span className="text-right text-xs text-[var(--color-text-secondary)]">{pt.waterUsage.toLocaleString()} L</span>
              <TrendBar value={pt.chemUsage} max={260} color="bg-emerald-400/60" />
              <span className="text-right text-xs text-emerald-400">{pt.chemUsage} kg</span>
            </div>
          ))}
        </div>
        <div className="mt-3 flex gap-6 text-xs text-[var(--color-text-secondary)]">
          <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[var(--color-brand-primary)]/60" /> Agua (L)</span>
          <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-emerald-400/60" /> Productos (kg)</span>
        </div>
      </div>

      {/* Satisfaction trend */}
      <div>
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-[var(--color-text-secondary)]">
          Satisfacción del cliente
        </h3>
        <div className="space-y-3">
          {trendData.map((pt) => (
            <div key={pt.period} className="grid grid-cols-[5rem_1fr_4rem] items-center gap-3">
              <span className="text-xs text-[var(--color-text-secondary)]">{pt.period}</span>
              <TrendBar value={pt.satisfaction} max={5} color="bg-amber-400/70" />
              <span className="text-right text-xs font-medium text-amber-400">{pt.satisfaction.toFixed(1)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Tab: Comparativos ────────────────────────────────────────────────────────

function TabComparativos() {
  const { activeDimension, setActiveDimension } = useOviAnalyticsStore();
  const records = activeDimension === "service" ? comparativeByService : comparativeByClient;

  return (
    <div className="space-y-8">
      <SectionHeader
        title="Comparativos"
        subtitle="Análisis multidimensional para identificar las áreas de mayor y menor rendimiento."
      />

      {/* Dimension selector */}
      <div className="flex flex-wrap gap-2">
        {comparativeDimensions.map((dim) => (
          <button
            key={dim.id}
            onClick={() => setActiveDimension(dim.id)}
            className={cn(
              "flex items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-all duration-200",
              activeDimension === dim.id
                ? "border-[var(--color-brand-primary)]/50 bg-[var(--color-brand-primary)]/10 text-[var(--color-brand-primary)]"
                : "border-white/10 bg-white/3 text-[var(--color-text-secondary)] hover:border-white/20 hover:text-white",
            )}
          >
            <DynamicIcon name={dim.icon} className="h-4 w-4" />
            {dim.label}
          </button>
        ))}
      </div>

      {/* Comparative table */}
      <div>
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-[var(--color-text-secondary)]">
          {comparativeDimensions.find((d) => d.id === activeDimension)?.description ?? "Resultados comparativos"}
        </h3>
        {(activeDimension === "client" || activeDimension === "service") ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  {["Nombre", "Servicios", "Cumplimiento", "Satisfacción", "Agua (L)", "Tendencia"].map((h) => (
                    <th key={h} className="pb-3 pr-4 text-left text-xs font-medium text-[var(--color-text-secondary)]">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {records.map((rec) => (
                  <tr key={rec.name} className="hover:bg-white/3 transition-colors">
                    <td className="py-3 pr-4 font-medium text-white">{rec.name}</td>
                    <td className="py-3 pr-4 text-[var(--color-brand-primary)]">{rec.services}</td>
                    <td className="py-3 pr-4">
                      <span className={cn("font-medium", rec.compliance >= 95 ? "text-emerald-400" : "text-amber-400")}>
                        {rec.compliance}%
                      </span>
                    </td>
                    <td className="py-3 pr-4 text-amber-400">{rec.satisfaction.toFixed(1)}</td>
                    <td className="py-3 pr-4 text-[var(--color-text-secondary)]">{rec.waterUsage.toLocaleString()}</td>
                    <td className="py-3 pr-4">
                      <TrendBadge trend={rec.trend} change={rec.trend === "up" ? "↑" : rec.trend === "down" ? "↓" : "→"} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <Card className="glass border border-white/10 p-8 text-center">
            <p className="text-[var(--color-text-secondary)]">
              Dimensión <span className="text-white font-medium">{comparativeDimensions.find((d) => d.id === activeDimension)?.label}</span> — datos disponibles en próxima versión con integración completa a OVI OS y OVI Field.
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}

// ─── Tab: Reportes ────────────────────────────────────────────────────────────

function TabReportes() {
  const { activeReport, setActiveReport } = useOviAnalyticsStore();

  return (
    <div className="space-y-8">
      <SectionHeader
        title="Reportes"
        subtitle="Selecciona una plantilla para visualizar su estructura. La generación automática de PDF estará disponible en próxima versión."
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {reportTemplates.map((tmpl) => (
          <button
            key={tmpl.id}
            onClick={() => setActiveReport(activeReport === tmpl.id ? null : tmpl.id)}
            className={cn(
              "glass border rounded-xl p-5 text-left transition-all duration-200",
              activeReport === tmpl.id ? toneBorderClasses(tmpl.tone) : "border-white/10",
              !tmpl.available && "opacity-60",
            )}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className={cn("flex h-10 w-10 items-center justify-center rounded-lg", toneBgClasses(tmpl.tone))}>
                  <DynamicIcon name={tmpl.icon} className={cn("h-5 w-5", toneClasses(tmpl.tone))} />
                </div>
                <div>
                  <p className="font-medium text-white">{tmpl.title}</p>
                  <p className="text-xs text-[var(--color-text-secondary)]">
                    {tmpl.available ? (tmpl.lastGenerated ? `Última generación: ${tmpl.lastGenerated}` : "Listo para generar") : "Próximamente con OVI AI"}
                  </p>
                </div>
              </div>
              <span className={cn("rounded-full px-2 py-0.5 text-xs font-medium", toneBgClasses(tmpl.tone), toneClasses(tmpl.tone))}>
                {tmpl.type}
              </span>
            </div>
            <p className="mt-3 text-sm text-[var(--color-text-secondary)]">{tmpl.description}</p>

            {activeReport === tmpl.id && (
              <div className="mt-4 border-t border-white/10 pt-4">
                <p className="mb-2 text-xs font-medium text-[var(--color-text-secondary)]">Secciones incluidas:</p>
                <ul className="space-y-1">
                  {tmpl.sections.map((sec) => (
                    <li key={sec} className="flex items-center gap-2 text-sm text-white">
                      <CheckCircle className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
                      {sec}
                    </li>
                  ))}
                </ul>
                {tmpl.available && (
                  <div className="mt-4 rounded-lg border border-white/10 bg-white/3 px-4 py-3 text-sm text-[var(--color-text-secondary)]">
                    <span className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-[var(--color-brand-primary)]" />
                      Generación de PDF disponible en próxima versión
                    </span>
                  </div>
                )}
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Tab: Arquitectura ────────────────────────────────────────────────────────

function TabArquitectura() {
  return (
    <div className="space-y-10">
      <SectionHeader
        title="Arquitectura de OVI Analytics"
        subtitle="Ecosistema de inteligencia operativa: captura de datos, indicadores, tendencias, reportes e inteligencia OVI AI."
      />

      {/* Pillars */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {analyticsPillars.map((pillar) => (
          <Card key={pillar.id} className={cn("glass border p-5", toneBorderClasses(pillar.tone))}>
            <div className="flex items-start justify-between gap-3">
              <div className={cn("flex h-10 w-10 items-center justify-center rounded-lg", toneBgClasses(pillar.tone))}>
                <DynamicIcon name={pillar.icon} className={cn("h-5 w-5", toneClasses(pillar.tone))} />
              </div>
              <StatusBadge status={pillar.status} />
            </div>
            <div className="mt-4">
              <h3 className="font-bold text-white">{pillar.title}</h3>
              <p className="mt-1 text-sm text-[var(--color-text-secondary)]">{pillar.description}</p>
              <ul className="mt-3 space-y-1">
                {pillar.capabilities.map((cap) => (
                  <li key={cap} className="flex items-start gap-2 text-xs text-[var(--color-text-secondary)]">
                    <span className={cn("mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full", toneClasses(pillar.tone).replace("text-", "bg-"))} />
                    {cap}
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        ))}
      </div>

      {/* Integrations */}
      <div>
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-[var(--color-text-secondary)]">
          Integraciones del ecosistema OVI
        </h3>
        <div className="space-y-3">
          {analyticsIntegrations.map((integ) => (
            <Card key={integ.system} className="glass border border-white/10 p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-brand-primary)]/10">
                    <Database className="h-5 w-5 text-[var(--color-brand-primary)]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-white">{integ.system}</p>
                      <StatusBadge status={integ.status} />
                    </div>
                    <p className="mt-0.5 text-sm text-[var(--color-text-secondary)]">{integ.description}</p>
                    <p className="mt-1 text-xs text-[var(--color-text-secondary)]">
                      Datos: <span className="text-white">{integ.dataFlow}</span>
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* AI future */}
      <Card className="glass border border-[var(--color-brand-accent)]/30 p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-brand-accent)]/10">
            <Sparkles className="h-6 w-6 text-[var(--color-brand-accent)]" />
          </div>
          <div>
            <h3 className="font-bold text-white">OVI AI — Inteligencia Ejecutiva</h3>
            <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
              La arquitectura de OVI Analytics está preparada para que OVI AI genere, en próximas versiones:
            </p>
            <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {["Resúmenes ejecutivos automáticos", "Hallazgos y alertas relevantes", "Detección de riesgos operativos", "Recomendaciones preventivas"].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
                  <Sparkles className="h-3.5 w-3.5 shrink-0 text-[var(--color-brand-accent)]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export function OviAnalyticsPage() {
  const { activeTab, setActiveTab } = useOviAnalyticsStore();

  return (
    <main id="main-content" className="min-h-screen bg-[var(--color-bg-primary)]">
      {/* Header */}
      <div className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-brand-primary)]/10">
                  <BarChart3 className="h-6 w-6 text-[var(--color-brand-primary)]" />
                </div>
                <div>
                  <h1 className="text-2xl font-black tracking-tight text-white">
                    OVI <span className="text-[var(--color-brand-primary)]">Analytics</span>
                  </h1>
                  <p className="text-sm text-[var(--color-text-secondary)]">Executive Intelligence Dashboard</p>
                </div>
              </div>
              <p className="mt-4 max-w-2xl text-[var(--color-text-secondary)]">
                Transforma los datos operativos de OVI OS, OVI Field, OVI Lab y OVI Core en indicadores ejecutivos
                de alto valor para la toma de mejores decisiones.
              </p>
            </div>
            <div className="flex flex-col gap-2 text-sm text-[var(--color-text-secondary)]">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-emerald-400" />
                <span>Sistema activo</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-[var(--color-brand-primary)]" />
                <span>4 fuentes conectadas</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="h-3.5 w-3.5 text-[var(--color-brand-accent)]" />
                <span>OVI AI preparado</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Module navigation summary */}
      <div className="border-b border-white/10 bg-white/2">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3">
            {moduleTabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.value}
                  onClick={() => setActiveTab(tab.value)}
                  className={cn(
                    "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm transition-all duration-200",
                    activeTab === tab.value
                      ? "bg-[var(--color-brand-primary)]/10 text-[var(--color-brand-primary)]"
                      : "text-[var(--color-text-secondary)] hover:text-white",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-8 hidden">
            {moduleTabs.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="dashboard">
            <TabDashboard />
          </TabsContent>
          <TabsContent value="operativos">
            <TabOperativos />
          </TabsContent>
          <TabsContent value="ambientales">
            <TabAmbientales />
          </TabsContent>
          <TabsContent value="economicos">
            <TabEconomicos />
          </TabsContent>
          <TabsContent value="tendencias">
            <TabTendencias />
          </TabsContent>
          <TabsContent value="comparativos">
            <TabComparativos />
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
