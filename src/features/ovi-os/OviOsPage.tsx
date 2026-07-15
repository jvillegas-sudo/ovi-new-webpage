import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Building2,
  ClipboardList,
  FileBadge2,
  FolderKanban,
  Package,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Wrench,
} from "lucide-react";
import { Card, Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui";
import { cn } from "@utils/cn";
import {
  activityItems,
  authPillars,
  certificateRecords,
  companyProfileRecord,
  dashboardCards,
  diagnosticRecords,
  documentCategoryRecords,
  integrationRecords,
  productRecords,
  projectRecords,
  requestStatuses,
  scalePillars,
  serviceRecords,
  supportTicketRecords,
  workOrderRecords,
  type HealthTone,
} from "./ovi-os-data";

const moduleTabs = [
  {
    value: "projects",
    label: "Mis proyectos",
    badge: projectRecords.length,
    icon: FolderKanban,
    summary: "Proyectos, responsables, evidencias y documentación compartida.",
  },
  {
    value: "services",
    label: "Mis servicios",
    badge: serviceRecords.length,
    icon: Sparkles,
    summary: "Cobertura activa, cadencias y KPIs operativos del servicio.",
  },
  {
    value: "products",
    label: "Mis productos",
    badge: productRecords.length,
    icon: Package,
    summary: "Productos conectados a proyectos, consumo y reposición.",
  },
  {
    value: "workorders",
    label: "Órdenes de trabajo",
    badge: workOrderRecords.length,
    icon: ClipboardList,
    summary: "Planeación, seguimiento y responsables por sede.",
  },
  {
    value: "docs",
    label: "Documentación técnica",
    badge: documentCategoryRecords.length,
    icon: BookOpen,
    summary: "Repositorio central para fichas, MSDS, protocolos, informes y evidencias.",
  },
  {
    value: "certificates",
    label: "Certificados",
    badge: certificateRecords.length,
    icon: FileBadge2,
    summary: "Certificados vigentes y renovaciones preparadas.",
  },
  {
    value: "diagnostics",
    label: "Historial de diagnósticos",
    badge: diagnosticRecords.length,
    icon: Stethoscope,
    summary: "Hallazgos, riesgos y recomendaciones trazables.",
  },
  {
    value: "support",
    label: "Soporte técnico",
    badge: supportTicketRecords.length,
    icon: Wrench,
    summary: "Solicitudes, canales de atención y escalamiento operativo.",
  },
  {
    value: "company",
    label: "Perfil de empresa",
    badge: "1",
    icon: Building2,
    summary: "Usuarios, sedes, países y gobernanza de acceso.",
  },
] as const;

function toneClasses(tone: HealthTone) {
  if (tone === "accent") {
    return {
      border: "border-[rgba(0,255,133,0.28)]",
      badge: "bg-[rgba(0,255,133,0.14)] text-[var(--color-brand-accent)]",
      progress: "bg-[var(--color-brand-accent)]",
    };
  }

  if (tone === "warning") {
    return {
      border: "border-[rgba(255,165,0,0.28)]",
      badge: "bg-[rgba(255,165,0,0.14)] text-[var(--color-brand-warning)]",
      progress: "bg-[var(--color-brand-warning)]",
    };
  }

  return {
    border: "border-[rgba(0,196,255,0.28)]",
    badge: "bg-[rgba(0,196,255,0.14)] text-[var(--color-brand-primary)]",
    progress: "bg-[var(--color-brand-primary)]",
  };
}

function statusBadgeClasses(status: string) {
  const normalized = status.toLowerCase();

  if (
    normalized.includes("vigente") ||
    normalized.includes("operando") ||
    normalized.includes("cerrada") ||
    normalized.includes("lista")
  ) {
    return "bg-[rgba(0,255,133,0.14)] text-[var(--color-brand-accent)]";
  }

  if (
    normalized.includes("renovar") ||
    normalized.includes("planificada") ||
    normalized.includes("pendiente") ||
    normalized.includes("escalado") ||
    normalized.includes("alto")
  ) {
    return "bg-[rgba(255,165,0,0.14)] text-[var(--color-brand-warning)]";
  }

  return "bg-[rgba(0,196,255,0.14)] text-[var(--color-brand-primary)]";
}

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

function DashboardCardGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {dashboardCards.map((card) => {
        const tone = toneClasses(card.tone);
        return (
          <Card
            key={card.id}
            variant="glass"
            padding="lg"
            className={cn("border", tone.border, "min-h-[220px]")}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm text-[var(--color-text-tertiary)]">{card.label}</p>
                <p className="mt-3 text-4xl font-bold text-[var(--color-text-primary)]">
                  {card.value}
                </p>
              </div>
              <span className={cn("rounded-full px-3 py-1 text-xs font-semibold", tone.badge)}>
                {card.trend}
              </span>
            </div>
            <p className="mt-5 text-sm text-[var(--color-text-secondary)]">{card.detail}</p>
            <div className="mt-6 h-1.5 rounded-full bg-white/8">
              <div
                className={cn("h-full rounded-full", tone.progress)}
                style={{
                  width: `${Math.max(28, Math.min(96, Number.parseInt(card.value, 10) || 72))}%`,
                }}
              />
            </div>
          </Card>
        );
      })}
    </div>
  );
}

function DashboardAside() {
  return (
    <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
      <Card variant="glass" padding="lg" className="border border-[var(--color-border-default)]">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h3 className="text-xl font-semibold">Última actividad conectada</h3>
            <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
              El portal consolida eventos del ciclo de vida del servicio en una sola vista.
            </p>
          </div>
          <span className="rounded-full bg-[rgba(0,255,133,0.12)] px-3 py-1 text-xs font-semibold text-[var(--color-brand-accent)]">
            OVI Core activo
          </span>
        </div>
        <div className="mt-6 space-y-4">
          {activityItems.map((item, index) => (
            <div
              key={item.title}
              className={cn(
                "grid gap-3 rounded-2xl border border-white/8 bg-black/10 p-4 md:grid-cols-[auto_1fr_auto]",
                index === activityItems.length - 1 && "mb-0",
              )}
            >
              <div className="mt-1 h-2.5 w-2.5 rounded-full bg-[var(--color-brand-primary)]" />
              <div>
                <p className="font-medium text-[var(--color-text-primary)]">{item.title}</p>
                <p className="text-sm text-[var(--color-text-secondary)]">{item.description}</p>
              </div>
              <span className="text-xs text-[var(--color-text-tertiary)]">{item.time}</span>
            </div>
          ))}
        </div>
      </Card>

      <Card variant="glass" padding="lg" className="border border-[var(--color-border-default)]">
        <h3 className="text-xl font-semibold">Estado de solicitudes</h3>
        <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
          Soporte, aprobaciones y solicitudes operativas con seguimiento centralizado.
        </p>
        <div className="mt-6 space-y-4">
          {requestStatuses.map((status) => {
            const tone = toneClasses(status.tone);
            return (
              <div key={status.label} className="rounded-2xl border border-white/8 bg-black/10 p-4">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm text-[var(--color-text-secondary)]">{status.label}</span>
                  <span
                    className={cn("rounded-full px-2.5 py-1 text-xs font-semibold", tone.badge)}
                  >
                    {status.value}
                  </span>
                </div>
                <div className="mt-3 h-2 rounded-full bg-white/8">
                  <div
                    className={cn("h-full rounded-full", tone.progress)}
                    style={{ width: `${Math.min(100, status.value * 18 + 18)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-6 rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] p-4">
          <p className="text-sm text-[var(--color-text-secondary)]">
            La autenticación definitiva aún no se implementa, pero la arquitectura ya separa
            empresa, usuario, rol y permisos por módulo.
          </p>
        </div>
      </Card>
    </div>
  );
}

function ProjectsTab() {
  return (
    <div className="grid gap-4 xl:grid-cols-2">
      {projectRecords.map((project) => (
        <Card
          key={project.id}
          variant="glass"
          padding="lg"
          className="border border-[var(--color-border-default)]"
        >
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-xs tracking-[0.18em] text-[var(--color-text-tertiary)] uppercase">
                {project.id}
              </p>
              <h3 className="mt-2 text-2xl font-semibold">{project.name}</h3>
              <p className="mt-2 text-sm text-[var(--color-text-secondary)]">{project.client}</p>
            </div>
            <span
              className={cn(
                "rounded-full px-3 py-1 text-xs font-semibold",
                statusBadgeClasses(project.status),
              )}
            >
              {project.status}
            </span>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <InfoItem label="Fecha de inicio" value={project.startDate} />
            <InfoItem label="Fecha estimada" value={project.estimatedDate} />
            <InfoItem label="Responsable OVI" value={project.owner} />
            <InfoItem label="Servicios asociados" value={project.services.join(" · ")} />
          </div>

          <div className="mt-6 rounded-2xl border border-dashed border-[rgba(0,196,255,0.24)] bg-[rgba(0,196,255,0.05)] p-4">
            <p className="text-sm font-medium text-[var(--color-text-primary)]">
              Evidencias fotográficas
            </p>
            <p className="mt-1 text-sm text-[var(--color-text-secondary)]">{project.evidence}</p>
          </div>

          <div className="mt-6">
            <p className="text-sm font-medium text-[var(--color-text-primary)]">
              Documentación vinculada
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.documentation.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-[var(--color-text-secondary)]"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

function ServicesTab() {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {serviceRecords.map((service) => (
        <Card
          key={service.name}
          variant="glass"
          padding="lg"
          className="border border-[var(--color-border-default)]"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-xl font-semibold">{service.name}</h3>
              <p className="mt-2 text-sm text-[var(--color-text-secondary)]">{service.scope}</p>
            </div>
            <span
              className={cn(
                "rounded-full px-3 py-1 text-xs font-semibold",
                statusBadgeClasses(service.status),
              )}
            >
              {service.status}
            </span>
          </div>
          <div className="mt-6 space-y-3">
            <InfoItem label="Cadencia" value={service.cadence} />
            <InfoItem label="Indicador" value={service.kpi} />
          </div>
        </Card>
      ))}
    </div>
  );
}

function ProductsTab() {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {productRecords.map((product) => (
        <Card
          key={product.name}
          variant="glass"
          padding="lg"
          className="border border-[var(--color-border-default)]"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-xl font-semibold">{product.name}</h3>
              <p className="mt-2 text-sm text-[var(--color-text-secondary)]">{product.category}</p>
            </div>
            <span
              className={cn(
                "rounded-full px-3 py-1 text-xs font-semibold",
                statusBadgeClasses(product.availability),
              )}
            >
              {product.availability}
            </span>
          </div>
          <div className="mt-6 space-y-3">
            <InfoItem label="Proyecto vinculado" value={product.linkedProject} />
            <InfoItem label="Trazabilidad" value={product.traceability} />
          </div>
        </Card>
      ))}
    </div>
  );
}

function WorkOrdersTab() {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {workOrderRecords.map((order) => (
        <Card
          key={order.code}
          variant="glass"
          padding="lg"
          className="border border-[var(--color-border-default)]"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs tracking-[0.18em] text-[var(--color-text-tertiary)] uppercase">
                {order.code}
              </p>
              <h3 className="mt-2 text-xl font-semibold">{order.type}</h3>
              <p className="mt-2 text-sm text-[var(--color-text-secondary)]">{order.site}</p>
            </div>
            <span
              className={cn(
                "rounded-full px-3 py-1 text-xs font-semibold",
                statusBadgeClasses(order.status),
              )}
            >
              {order.status}
            </span>
          </div>
          <div className="mt-6 space-y-3">
            <InfoItem label="Programación" value={order.scheduledFor} />
            <InfoItem label="Responsable" value={order.owner} />
          </div>
        </Card>
      ))}
    </div>
  );
}

function DocumentationTab() {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {documentCategoryRecords.map((category) => (
        <Card
          key={category.title}
          variant="glass"
          padding="lg"
          className="border border-[var(--color-border-default)]"
        >
          <h3 className="text-xl font-semibold">{category.title}</h3>
          <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
            Origen: {category.source}
          </p>
          <ul className="mt-5 space-y-3">
            {category.items.map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 text-sm text-[var(--color-text-secondary)]"
              >
                <span className="h-2 w-2 rounded-full bg-[var(--color-brand-primary)]" />
                {item}
              </li>
            ))}
          </ul>
        </Card>
      ))}
    </div>
  );
}

function CertificatesTab() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {certificateRecords.map((certificate) => (
        <Card
          key={certificate.title}
          variant="glass"
          padding="lg"
          className="border border-[var(--color-border-default)]"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-xl font-semibold">{certificate.title}</h3>
              <p className="mt-2 text-sm text-[var(--color-text-secondary)]">{certificate.scope}</p>
            </div>
            <span
              className={cn(
                "rounded-full px-3 py-1 text-xs font-semibold",
                statusBadgeClasses(certificate.status),
              )}
            >
              {certificate.status}
            </span>
          </div>
          <div className="mt-6">
            <InfoItem label="Vigencia" value={certificate.expiresAt} />
          </div>
        </Card>
      ))}
    </div>
  );
}

function DiagnosticsTab() {
  return (
    <div className="space-y-4">
      {diagnosticRecords.map((diagnostic) => (
        <Card
          key={diagnostic.title}
          variant="glass"
          padding="lg"
          className="border border-[var(--color-border-default)]"
        >
          <div className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr_auto] xl:items-start">
            <div>
              <h3 className="text-xl font-semibold">{diagnostic.title}</h3>
              <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
                {diagnostic.facility}
              </p>
            </div>
            <p className="text-sm text-[var(--color-text-secondary)]">{diagnostic.summary}</p>
            <div className="flex flex-col gap-2 xl:items-end">
              <span className="text-xs text-[var(--color-text-tertiary)]">{diagnostic.date}</span>
              <span
                className={cn(
                  "rounded-full px-3 py-1 text-xs font-semibold",
                  statusBadgeClasses(diagnostic.risk),
                )}
              >
                Riesgo {diagnostic.risk}
              </span>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

function SupportTab() {
  return (
    <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
      <div className="space-y-4">
        {supportTicketRecords.map((ticket) => (
          <Card
            key={ticket.code}
            variant="glass"
            padding="lg"
            className="border border-[var(--color-border-default)]"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xs tracking-[0.18em] text-[var(--color-text-tertiary)] uppercase">
                  {ticket.code}
                </p>
                <h3 className="mt-2 text-xl font-semibold">{ticket.topic}</h3>
              </div>
              <span
                className={cn(
                  "rounded-full px-3 py-1 text-xs font-semibold",
                  statusBadgeClasses(ticket.status),
                )}
              >
                {ticket.status}
              </span>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <InfoItem label="Prioridad" value={ticket.priority} />
              <InfoItem label="Canal" value={ticket.channel} />
            </div>
          </Card>
        ))}
      </div>

      <Card variant="glass" padding="lg" className="border border-[var(--color-border-default)]">
        <h3 className="text-xl font-semibold">Modelo de soporte técnico</h3>
        <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
          OVI OS se prepara para centralizar soporte técnico, solicitudes operativas y seguimiento
          post-servicio sin sentirse como un software administrativo.
        </p>
        <ul className="mt-6 space-y-3">
          {[
            "Mesa de ayuda por empresa y por sede",
            "Escalamiento hacia operaciones, laboratorio o compras",
            "Contexto completo del cliente dentro del mismo portal",
          ].map((item) => (
            <li
              key={item}
              className="flex items-center gap-3 text-sm text-[var(--color-text-secondary)]"
            >
              <span className="h-2 w-2 rounded-full bg-[var(--color-brand-accent)]" />
              {item}
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}

function CompanyTab() {
  return (
    <div className="grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
      <Card variant="glass" padding="lg" className="border border-[var(--color-border-default)]">
        <h3 className="text-2xl font-semibold">{companyProfileRecord.company}</h3>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <InfoItem label="Casa matriz" value={companyProfileRecord.headquarters} />
          <InfoItem label="Usuarios activos" value={companyProfileRecord.activeUsers} />
          <InfoItem label="Sedes activas" value={companyProfileRecord.activeSites} />
          <InfoItem label="Modelo operativo" value={companyProfileRecord.serviceModel} />
        </div>
        <div className="mt-6">
          <p className="text-sm font-medium text-[var(--color-text-primary)]">
            Cobertura geográfica
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {companyProfileRecord.countries.map((country) => (
              <span
                key={country}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-[var(--color-text-secondary)]"
              >
                {country}
              </span>
            ))}
          </div>
        </div>
      </Card>

      <Card variant="glass" padding="lg" className="border border-[var(--color-border-default)]">
        <h3 className="text-xl font-semibold">Arquitectura de acceso preparada</h3>
        <div className="mt-6 space-y-4">
          {authPillars.map((pillar) => (
            <div key={pillar.title} className="rounded-2xl border border-white/8 bg-black/10 p-4">
              <p className="font-medium text-[var(--color-text-primary)]">{pillar.title}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {pillar.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full bg-[rgba(0,196,255,0.1)] px-3 py-1 text-xs text-[var(--color-brand-primary)]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function ArchitectureSection() {
  return (
    <section className="py-[var(--section-padding-y)]">
      <div className="mx-auto max-w-[var(--content-width)] px-[var(--page-padding-x)]">
        <SectionHeading
          eyebrow="Arquitectura preparada"
          title="Integración, autenticación y escalabilidad desde la primera versión"
          description="La estructura de OVI OS queda lista para crecer por módulos, empresas, sedes y países, manteniendo una sola fuente de verdad conectada con el ecosistema OVI."
        />

        <div className="mt-10 grid gap-4 xl:grid-cols-4">
          {integrationRecords.map((integration) => (
            <Card
              key={integration.platform}
              variant="glass"
              padding="lg"
              className="border border-[var(--color-border-default)]"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-lg font-semibold">{integration.platform}</h3>
                <span
                  className={cn(
                    "rounded-full px-3 py-1 text-xs font-semibold",
                    statusBadgeClasses(integration.status),
                  )}
                >
                  {integration.status}
                </span>
              </div>
              <p className="mt-4 text-sm text-[var(--color-text-secondary)]">
                {integration.description}
              </p>
              <p className="mt-4 text-sm text-[var(--color-text-tertiary)]">{integration.flow}</p>
            </Card>
          ))}
        </div>

        <div className="mt-10 grid gap-4 xl:grid-cols-2">
          <ArchitectureCard
            title="Gobierno de acceso"
            description="Arquitectura lista para login, roles, empresas, usuarios y permisos sin implementar todavía la autenticación definitiva."
            pillars={authPillars}
          />
          <ArchitectureCard
            title="Preparado para crecimiento"
            description="Diseño modular para soportar más empresas, más sedes, más usuarios y despliegues multi-país / multi-idioma."
            pillars={scalePillars}
          />
        </div>
      </div>
    </section>
  );
}

function ArchitectureCard({
  title,
  description,
  pillars,
}: {
  title: string;
  description: string;
  pillars: typeof authPillars;
}) {
  return (
    <Card variant="glass" padding="lg" className="border border-[var(--color-border-default)]">
      <h3 className="text-2xl font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-[var(--color-text-secondary)]">{description}</p>
      <div className="mt-6 space-y-4">
        {pillars.map((pillar) => (
          <div key={pillar.title} className="rounded-2xl border border-white/8 bg-black/10 p-4">
            <p className="font-medium text-[var(--color-text-primary)]">{pillar.title}</p>
            <ul className="mt-3 space-y-2">
              {pillar.items.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 text-sm text-[var(--color-text-secondary)]"
                >
                  <span className="h-2 w-2 rounded-full bg-[var(--color-brand-primary)]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Card>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs tracking-[0.18em] text-[var(--color-text-tertiary)] uppercase">
        {label}
      </p>
      <p className="mt-2 text-sm text-[var(--color-text-secondary)]">{value}</p>
    </div>
  );
}

export function OviOsPage() {
  return (
    <div className="relative overflow-hidden bg-[radial-gradient(circle_at_top,rgba(0,196,255,0.18),transparent_32%),linear-gradient(180deg,#050508_0%,#0a0a0f_45%,#050508_100%)]">
      <div className="pointer-events-none absolute inset-0 [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:56px_56px] opacity-40" />

      <section className="relative pt-28 pb-16 md:pt-36">
        <div className="mx-auto max-w-[var(--content-width)] px-[var(--page-padding-x)]">
          <div className="grid items-start gap-10 xl:grid-cols-[1.05fr_0.95fr]">
            <div>
              <span className="inline-flex rounded-full border border-[rgba(0,255,133,0.2)] bg-[rgba(0,255,133,0.08)] px-3 py-1 text-[11px] font-semibold tracking-[0.24em] text-[var(--color-brand-accent)] uppercase">
                Portal privado · versión funcional inicial
              </span>
              <h1 className="mt-6 max-w-4xl text-5xl font-black tracking-tight md:text-7xl">
                OVI OS
              </h1>
              <p className="mt-5 max-w-3xl text-lg text-[var(--color-text-secondary)] md:text-xl">
                El espacio digital donde el cliente consulta servicios, proyectos, diagnósticos,
                compras, documentación y soporte durante todo el ciclo de vida con OVI.
              </p>
              <p className="mt-4 max-w-2xl text-sm text-[var(--color-text-tertiary)] md:text-base">
                No es CRM. No es ERP. Es la extensión digital del servicio de Ingeniería en Limpieza
                que conecta OVI Core, OVI AI, OVI Lab y OVI Catálogo Técnico.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-xl bg-[var(--color-brand-primary)] px-5 py-3 text-sm font-semibold text-[var(--color-text-inverse)] transition hover:brightness-110"
                >
                  Solicitar activación
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/ovi-ai"
                  className="inline-flex items-center gap-2 rounded-xl border border-[var(--color-border-default)] px-5 py-3 text-sm font-semibold text-[var(--color-text-primary)] transition hover:border-[var(--color-brand-primary)] hover:text-[var(--color-brand-primary)]"
                >
                  Explorar OVI AI
                </Link>
              </div>
            </div>

            <Card
              variant="glass"
              padding="lg"
              className="border border-[var(--color-border-default)]"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs tracking-[0.18em] text-[var(--color-text-tertiary)] uppercase">
                    Empresa activa
                  </p>
                  <h2 className="mt-3 text-2xl font-semibold">{companyProfileRecord.company}</h2>
                </div>
                <span className="rounded-full bg-[rgba(0,255,133,0.12)] px-3 py-1 text-xs font-semibold text-[var(--color-brand-accent)]">
                  Espacio listo
                </span>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <InfoItem label="Casa matriz" value={companyProfileRecord.headquarters} />
                <InfoItem label="Modelo" value={companyProfileRecord.serviceModel} />
                <InfoItem label="Usuarios" value={companyProfileRecord.activeUsers} />
                <InfoItem label="Sedes" value={companyProfileRecord.activeSites} />
              </div>

              <div className="mt-6 rounded-2xl border border-[rgba(0,196,255,0.18)] bg-[rgba(0,196,255,0.06)] p-4">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="mt-0.5 h-5 w-5 text-[var(--color-brand-primary)]" />
                  <div>
                    <p className="font-medium text-[var(--color-text-primary)]">
                      Autenticación preparada
                    </p>
                    <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                      La experiencia queda lista para login, roles, empresas, usuarios y permisos,
                      esperando aprobación antes de la implementación definitiva.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="relative py-[var(--section-padding-y)]">
        <div className="mx-auto max-w-[var(--content-width)] px-[var(--page-padding-x)]">
          <SectionHeading
            eyebrow="Dashboard principal"
            title="Vista unificada del ciclo de vida del servicio"
            description="Tarjetas dinámicas para que el cliente vea de inmediato servicios activos, proyectos en ejecución, diagnósticos, pedidos, solicitudes e indicadores básicos."
          />
          <div className="mt-10">
            <DashboardCardGrid />
          </div>
          <div className="mt-4">
            <DashboardAside />
          </div>
        </div>
      </section>

      <section className="relative py-[var(--section-padding-y)]">
        <div className="mx-auto max-w-[var(--content-width)] px-[var(--page-padding-x)]">
          <SectionHeading
            eyebrow="Módulos iniciales"
            title="Estructura privada para clientes, operaciones y trazabilidad"
            description="Cada módulo queda preparado para integrarse sin duplicar información y mantener el ADN visual de OVI."
          />

          <Tabs defaultValue="projects" variant="boxed" className="mt-10">
            <TabsList className="flex-wrap">
              {moduleTabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <TabsTrigger key={tab.value} value={tab.value} badge={tab.badge}>
                    <Icon className="h-4 w-4" />
                    {tab.label}
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {moduleTabs.map((tab) => (
              <TabsContent key={tab.value} value={tab.value}>
                <Card
                  variant="glass"
                  padding="lg"
                  className="mb-4 border border-[var(--color-border-default)]"
                >
                  <p className="text-sm text-[var(--color-text-secondary)]">{tab.summary}</p>
                </Card>
              </TabsContent>
            ))}

            <TabsContent value="projects">
              <ProjectsTab />
            </TabsContent>
            <TabsContent value="services">
              <ServicesTab />
            </TabsContent>
            <TabsContent value="products">
              <ProductsTab />
            </TabsContent>
            <TabsContent value="workorders">
              <WorkOrdersTab />
            </TabsContent>
            <TabsContent value="docs">
              <DocumentationTab />
            </TabsContent>
            <TabsContent value="certificates">
              <CertificatesTab />
            </TabsContent>
            <TabsContent value="diagnostics">
              <DiagnosticsTab />
            </TabsContent>
            <TabsContent value="support">
              <SupportTab />
            </TabsContent>
            <TabsContent value="company">
              <CompanyTab />
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <ArchitectureSection />
    </div>
  );
}
