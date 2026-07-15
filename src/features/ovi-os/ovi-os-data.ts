export type HealthTone = "primary" | "accent" | "warning";

export interface DashboardCard {
  id: string;
  label: string;
  value: string;
  detail: string;
  trend: string;
  tone: HealthTone;
}

export interface ActivityItem {
  title: string;
  description: string;
  time: string;
}

export interface RequestStatusItem {
  label: string;
  value: number;
  tone: HealthTone;
}

export interface ProjectRecord {
  id: string;
  name: string;
  client: string;
  status: string;
  startDate: string;
  estimatedDate: string;
  owner: string;
  services: string[];
  evidence: string;
  documentation: string[];
}

export interface ServiceRecord {
  name: string;
  scope: string;
  cadence: string;
  status: string;
  kpi: string;
}

export interface ProductRecord {
  name: string;
  category: string;
  availability: string;
  linkedProject: string;
  traceability: string;
}

export interface WorkOrderRecord {
  code: string;
  site: string;
  type: string;
  status: string;
  scheduledFor: string;
  owner: string;
}

export interface DocumentCategoryRecord {
  title: string;
  items: string[];
  source: string;
}

export interface CertificateRecord {
  title: string;
  scope: string;
  expiresAt: string;
  status: string;
}

export interface DiagnosticRecord {
  title: string;
  facility: string;
  date: string;
  risk: string;
  summary: string;
}

export interface SupportTicketRecord {
  code: string;
  topic: string;
  priority: string;
  status: string;
  channel: string;
}

export interface CompanyProfileRecord {
  company: string;
  headquarters: string;
  countries: string[];
  activeUsers: string;
  activeSites: string;
  serviceModel: string;
}

export interface IntegrationRecord {
  platform: string;
  status: string;
  description: string;
  flow: string;
}

export interface ArchitecturePillar {
  title: string;
  items: string[];
}

export const dashboardCards: DashboardCard[] = [
  {
    id: "active-services",
    label: "Servicios activos",
    value: "12",
    detail: "Rutinas, cobertura técnica y mantenimientos en curso.",
    trend: "+2 este mes",
    tone: "primary",
  },
  {
    id: "projects",
    label: "Proyectos en ejecución",
    value: "4",
    detail: "Implementaciones industriales con hitos y entregables compartidos.",
    trend: "2 en fase final",
    tone: "accent",
  },
  {
    id: "diagnostics",
    label: "Últimos diagnósticos",
    value: "8",
    detail: "Evaluaciones recientes sincronizadas desde OVI Lab y OVI AI.",
    trend: "3 críticos",
    tone: "warning",
  },
  {
    id: "orders",
    label: "Pedidos recientes",
    value: "19",
    detail: "Solicitudes de reposición y compra conectadas con OVI Catálogo Técnico.",
    trend: "94% a tiempo",
    tone: "primary",
  },
  {
    id: "requests",
    label: "Estado de solicitudes",
    value: "7",
    detail: "Tickets, aprobaciones y seguimientos operativos abiertos.",
    trend: "4 esperando validación",
    tone: "warning",
  },
  {
    id: "indicators",
    label: "Indicadores básicos",
    value: "96%",
    detail: "Cumplimiento operativo consolidado del ciclo de servicio.",
    trend: "+5 pts",
    tone: "accent",
  },
];

export const activityItems: ActivityItem[] = [
  {
    title: "Sincronización OVI Core",
    description: "Clientes, proyectos y servicios activos actualizados.",
    time: "Hace 2 min",
  },
  {
    title: "Diagnóstico publicado",
    description: "OVI Lab liberó el informe microbiológico de Planta Norte.",
    time: "Hace 1 h",
  },
  {
    title: "Orden de trabajo asignada",
    description: "OT-1482 quedó programada para limpieza técnica nocturna.",
    time: "Hoy · 21:00",
  },
];

export const requestStatuses: RequestStatusItem[] = [
  { label: "Abiertas", value: 4, tone: "warning" },
  { label: "En proceso", value: 2, tone: "primary" },
  { label: "Listas para cierre", value: 1, tone: "accent" },
];

export const projectRecords: ProjectRecord[] = [
  {
    id: "PR-204",
    name: "Reingeniería sanitaria Planta Norte",
    client: "Alimentos Andinos",
    status: "En ejecución",
    startDate: "08 Jul 2026",
    estimatedDate: "22 Ago 2026",
    owner: "Laura Medina · Ingeniería OVI",
    services: ["Limpieza industrial", "Protocolos", "Capacitación"],
    evidence: "Estructura lista para fotografías antes/durante/después por frente de trabajo.",
    documentation: ["Acta de inicio", "Plan maestro", "Checklist GMP"],
  },
  {
    id: "PR-198",
    name: "Optimización de lavandería hospitalaria",
    client: "Clínica Horizonte",
    status: "Validación técnica",
    startDate: "15 Jun 2026",
    estimatedDate: "30 Jul 2026",
    owner: "Javier Rojas · OVI Core",
    services: ["Diagnóstico", "Productos", "Acompañamiento técnico"],
    evidence: "Repositorio preparado para evidencias fotográficas por zona crítica.",
    documentation: ["Informe base", "MSDS", "Cronograma de despliegue"],
  },
];

export const serviceRecords: ServiceRecord[] = [
  {
    name: "Limpieza técnica de producción",
    scope: "3 líneas activas · Planta Norte",
    cadence: "Semanal",
    status: "Operando",
    kpi: "Cumplimiento 98%",
  },
  {
    name: "Mantenimiento higiénico de flota",
    scope: "24 vehículos · Centro Logístico",
    cadence: "Quincenal",
    status: "Programado",
    kpi: "Tiempo promedio 3.1 h",
  },
  {
    name: "Aseguramiento de protocolos",
    scope: "2 sedes · auditoría cruzada",
    cadence: "Mensual",
    status: "En revisión",
    kpi: "Hallazgos cerrados 82%",
  },
];

export const productRecords: ProductRecord[] = [
  {
    name: "OVI Foam CIP-420",
    category: "Químico especializado",
    availability: "Stock alto",
    linkedProject: "PR-204",
    traceability: "Consumo por lote y turno",
  },
  {
    name: "OVI BioSan Surface",
    category: "Desinfección",
    availability: "Reposición en tránsito",
    linkedProject: "PR-198",
    traceability: "Asignado por protocolo",
  },
  {
    name: "Kit de monitoreo ATP",
    category: "Equipo técnico",
    availability: "Reservado",
    linkedProject: "OT-1482",
    traceability: "Control por responsable OVI",
  },
];

export const workOrderRecords: WorkOrderRecord[] = [
  {
    code: "OT-1482",
    site: "Planta Norte · Línea 2",
    type: "Correctiva",
    status: "Planificada",
    scheduledFor: "16 Jul 2026 · 21:00",
    owner: "Equipo nocturno OVI",
  },
  {
    code: "OT-1473",
    site: "Hospital Central · Lavandería",
    type: "Preventiva",
    status: "En curso",
    scheduledFor: "15 Jul 2026 · 14:00",
    owner: "Supervisor de servicio",
  },
  {
    code: "OT-1461",
    site: "Centro Logístico Sur",
    type: "Auditoría",
    status: "Cerrada",
    scheduledFor: "12 Jul 2026 · 08:30",
    owner: "Coordinación técnica OVI",
  },
];

export const documentCategoryRecords: DocumentCategoryRecord[] = [
  {
    title: "Documentación técnica",
    items: ["Fichas técnicas", "MSDS", "Protocolos", "Informes"],
    source: "OVI Core + OVI Lab",
  },
  {
    title: "Evidencias y cierre",
    items: ["Actas", "Fotografías", "Videos", "Entregables de proyecto"],
    source: "Portal de proyectos",
  },
  {
    title: "Cumplimiento",
    items: ["Certificados", "Versionado", "Aprobaciones", "Trazabilidad de cambios"],
    source: "Repositorio central OVI OS",
  },
];

export const certificateRecords: CertificateRecord[] = [
  {
    title: "Certificado de sanitización trimestral",
    scope: "Planta Norte",
    expiresAt: "30 Sep 2026",
    status: "Vigente",
  },
  {
    title: "Cumplimiento de protocolo GMP",
    scope: "Línea de empaque",
    expiresAt: "18 Ago 2026",
    status: "Por renovar",
  },
];

export const diagnosticRecords: DiagnosticRecord[] = [
  {
    title: "Diagnóstico microbiológico",
    facility: "Planta Norte",
    date: "14 Jul 2026",
    risk: "Alto",
    summary: "OVI Lab detectó foco en zona húmeda y recomendó ajuste de protocolo.",
  },
  {
    title: "Inspección de lavado de flota",
    facility: "Centro Logístico Sur",
    date: "11 Jul 2026",
    risk: "Medio",
    summary: "OVI AI sugirió secuencia de detergencia diferenciada por tipo de carga.",
  },
  {
    title: "Auditoría sanitaria",
    facility: "Clínica Horizonte",
    date: "09 Jul 2026",
    risk: "Bajo",
    summary: "Se consolidó historial y se preparó plan de mejora por sede.",
  },
];

export const supportTicketRecords: SupportTicketRecord[] = [
  {
    code: "ST-302",
    topic: "Ajuste de frecuencia en ruta sanitaria",
    priority: "Alta",
    status: "Escalado a operaciones",
    channel: "Portal + correo",
  },
  {
    code: "ST-295",
    topic: "Solicitud de capacitación por sede",
    priority: "Media",
    status: "Pendiente de agenda",
    channel: "OVI OS",
  },
];

export const companyProfileRecord: CompanyProfileRecord = {
  company: "Alimentos Andinos S.A.",
  headquarters: "Bogotá, Colombia",
  countries: ["Colombia", "Perú", "Costa Rica"],
  activeUsers: "18 usuarios",
  activeSites: "6 sedes",
  serviceModel: "Multi-sede · multi-país · operación 24/7",
};

export const integrationRecords: IntegrationRecord[] = [
  {
    platform: "OVI Core",
    status: "Fuente principal",
    description: "Clientes, servicios, proyectos, órdenes y perfil empresarial.",
    flow: "Sincronización bidireccional preparada.",
  },
  {
    platform: "OVI AI",
    status: "Conectado",
    description: "Insights operativos, recomendaciones y priorización de acciones.",
    flow: "Contexto diagnóstico hacia dashboard y soporte.",
  },
  {
    platform: "OVI Lab",
    status: "Conectado",
    description: "Diagnósticos, certificados y resultados técnicos de laboratorio.",
    flow: "Entrega estructurada a historial y documentación.",
  },
  {
    platform: "OVI Catálogo Técnico",
    status: "Preparado",
    description: "Productos, compras, reposiciones y trazabilidad de consumo.",
    flow: "Relación directa entre servicios, proyectos y pedidos.",
  },
];

export const authPillars: ArchitecturePillar[] = [
  {
    title: "Autenticación preparada",
    items: ["Inicio de sesión desacoplado", "Sesiones por empresa", "Ingreso por usuario"],
  },
  {
    title: "Gobierno de acceso",
    items: ["Roles por área", "Permisos por módulo", "Visibilidad por sede y proyecto"],
  },
  {
    title: "Modelo empresarial",
    items: ["Empresas", "Usuarios múltiples", "Jerarquía de responsables"],
  },
];

export const scalePillars: ArchitecturePillar[] = [
  {
    title: "Escalabilidad operacional",
    items: ["Multi-empresa", "Multi-sede", "Multi-país"],
  },
  {
    title: "Escalabilidad funcional",
    items: ["Módulos independientes", "Sin duplicar información", "Preparado para crecimiento"],
  },
  {
    title: "Escalabilidad de experiencia",
    items: ["Idiomas configurables", "Indicadores por contexto", "Trazabilidad histórica"],
  },
];
