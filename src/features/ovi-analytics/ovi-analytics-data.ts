/**
 * OVI Analytics — Data Models & Demo Data
 * Work Order 011
 *
 * Typed models and representative demo data for the Executive Intelligence
 * Dashboard. All values are illustrative and designed to showcase the
 * architecture and visualisation patterns.
 *
 * Architecture designed for:
 *   - Integration with OVI OS (service history)
 *   - Integration with OVI Field (execution data)
 *   - Integration with OVI Lab (protocol & product data)
 *   - Future OVI AI executive summaries and recommendations
 */

// ─── Shared primitives ────────────────────────────────────────────────────────

export type AnalyticsTone = "primary" | "accent" | "warning" | "neutral" | "eco";

export type TrendDirection = "up" | "down" | "stable";

export type ReportType = "ejecutivo" | "tecnico" | "mensual" | "proyecto" | "ambiental";

// ─── Executive KPI Card ───────────────────────────────────────────────────────

export interface ExecutiveKpi {
  id: string;
  label: string;
  value: string;
  unit?: string;
  change: string;
  trend: TrendDirection;
  tone: AnalyticsTone;
  icon: string;
  description: string;
}

export const executiveKpis: ExecutiveKpi[] = [
  {
    id: "services-executed",
    label: "Servicios ejecutados",
    value: "284",
    unit: "servicios",
    change: "+12%",
    trend: "up",
    tone: "primary",
    icon: "CheckCircle",
    description: "Acumulado en los últimos 12 meses",
  },
  {
    id: "plan-compliance",
    label: "Cumplimiento del plan",
    value: "96.4",
    unit: "%",
    change: "+2.1 pp",
    trend: "up",
    tone: "accent",
    icon: "Target",
    description: "Sobre el total de servicios programados",
  },
  {
    id: "avg-execution-time",
    label: "Tiempo prom. de ejecución",
    value: "3.2",
    unit: "hrs",
    change: "-0.4 hrs",
    trend: "down",
    tone: "primary",
    icon: "Clock",
    description: "Promedio por orden de trabajo",
  },
  {
    id: "product-consumption",
    label: "Consumo de productos",
    value: "1,840",
    unit: "kg",
    change: "-8%",
    trend: "down",
    tone: "eco",
    icon: "Package",
    description: "Reducción por optimización de protocolos",
  },
  {
    id: "water-consumption",
    label: "Consumo de agua",
    value: "6,210",
    unit: "L",
    change: "-15%",
    trend: "down",
    tone: "eco",
    icon: "Droplets",
    description: "Comparado con período anterior",
  },
  {
    id: "intervention-frequency",
    label: "Frecuencia de intervenciones",
    value: "23.7",
    unit: "servicios/mes",
    change: "+5%",
    trend: "up",
    tone: "primary",
    icon: "Calendar",
    description: "Promedio mensual en período activo",
  },
  {
    id: "assets-attended",
    label: "Activos atendidos",
    value: "148",
    unit: "activos",
    change: "+18",
    trend: "up",
    tone: "neutral",
    icon: "Layers",
    description: "Activos únicos con al menos un servicio",
  },
  {
    id: "incidents-reported",
    label: "Incidencias reportadas",
    value: "7",
    unit: "incidencias",
    change: "-3",
    trend: "down",
    tone: "warning",
    icon: "AlertTriangle",
    description: "En el último trimestre",
  },
  {
    id: "client-satisfaction",
    label: "Satisfacción del cliente",
    value: "4.8",
    unit: "/5.0",
    change: "+0.2",
    trend: "up",
    tone: "accent",
    icon: "Star",
    description: "Promedio de calificaciones recibidas",
  },
];

// ─── Operational Indicators ───────────────────────────────────────────────────

export interface ServiceRecord {
  code: string;
  client: string;
  site: string;
  service: string;
  status: "Completado" | "En proceso" | "Pendiente" | "Reprogramado";
  executionDate: string;
  duration: string;
  supervisor: string;
  complianceScore: number;
  tone: AnalyticsTone;
}

export const serviceRecords: ServiceRecord[] = [
  {
    code: "SVC-2024-0284",
    client: "Industrias Pacífico S.A.",
    site: "Planta Principal — Bodega 3",
    service: "Lavado de Flota Industrial",
    status: "Completado",
    executionDate: "2024-07-10",
    duration: "4.5 hrs",
    supervisor: "Carlos Mendoza",
    complianceScore: 98,
    tone: "accent",
  },
  {
    code: "SVC-2024-0283",
    client: "Logística Norte Ltda.",
    site: "Centro Distribución Norte",
    service: "Limpieza Profunda Industrial",
    status: "Completado",
    executionDate: "2024-07-09",
    duration: "6.2 hrs",
    supervisor: "Ana Torres",
    complianceScore: 96,
    tone: "accent",
  },
  {
    code: "SVC-2024-0282",
    client: "AgroFood Chile",
    site: "Planta Procesadora — Sector B",
    service: "Sanitización de Superficies",
    status: "Completado",
    executionDate: "2024-07-08",
    duration: "3.1 hrs",
    supervisor: "Jorge Vásquez",
    complianceScore: 100,
    tone: "accent",
  },
  {
    code: "SVC-2024-0285",
    client: "Minera del Sur S.A.",
    site: "Campamento Faena A",
    service: "Mantenimiento Preventivo",
    status: "En proceso",
    executionDate: "2024-07-11",
    duration: "—",
    supervisor: "María Soto",
    complianceScore: 0,
    tone: "primary",
  },
  {
    code: "SVC-2024-0286",
    client: "Puerto Logístico Central",
    site: "Terminal Contenedores",
    service: "Impermeabilización",
    status: "Pendiente",
    executionDate: "2024-07-15",
    duration: "—",
    supervisor: "Luis Araya",
    complianceScore: 0,
    tone: "neutral",
  },
  {
    code: "SVC-2024-0280",
    client: "Grupo Retail Prime",
    site: "Tienda Central — Nivel B2",
    service: "Post Obra",
    status: "Reprogramado",
    executionDate: "2024-07-12",
    duration: "—",
    supervisor: "Paula Rojas",
    complianceScore: 0,
    tone: "warning",
  },
];

// ─── Asset Registry ───────────────────────────────────────────────────────────

export interface AssetRecord {
  id: string;
  name: string;
  client: string;
  type: string;
  servicesCount: number;
  lastService: string;
  nextService: string;
  status: "Al día" | "Por vencer" | "Vencido";
  resourceIndex: number;
  tone: AnalyticsTone;
}

export const assetRecords: AssetRecord[] = [
  {
    id: "ACT-001",
    name: "Flota — Camiones Línea 1 (×8)",
    client: "Logística Norte Ltda.",
    type: "Vehículos",
    servicesCount: 42,
    lastService: "2024-07-09",
    nextService: "2024-08-09",
    status: "Al día",
    resourceIndex: 12,
    tone: "accent",
  },
  {
    id: "ACT-002",
    name: "Bodega Refrigerada B3",
    client: "Industrias Pacífico S.A.",
    type: "Infraestructura",
    servicesCount: 18,
    lastService: "2024-07-10",
    nextService: "2024-08-10",
    status: "Al día",
    resourceIndex: 8,
    tone: "accent",
  },
  {
    id: "ACT-003",
    name: "Línea de Procesamiento A",
    client: "AgroFood Chile",
    type: "Equipos industriales",
    servicesCount: 31,
    lastService: "2024-07-08",
    nextService: "2024-07-22",
    status: "Por vencer",
    resourceIndex: 22,
    tone: "warning",
  },
  {
    id: "ACT-004",
    name: "Campamento — Módulos habitacionales",
    client: "Minera del Sur S.A.",
    type: "Instalaciones",
    servicesCount: 57,
    lastService: "2024-07-11",
    nextService: "2024-07-25",
    status: "Por vencer",
    resourceIndex: 31,
    tone: "warning",
  },
  {
    id: "ACT-005",
    name: "Terminal Exterior — Bahías 1-6",
    client: "Puerto Logístico Central",
    type: "Infraestructura",
    servicesCount: 9,
    lastService: "2024-06-20",
    nextService: "2024-07-05",
    status: "Vencido",
    resourceIndex: 5,
    tone: "primary",
  },
];

// ─── Environmental Indicators ─────────────────────────────────────────────────

export interface EnvironmentalKpi {
  id: string;
  label: string;
  value: string;
  unit: string;
  baseline: string;
  saving: string;
  trend: TrendDirection;
  tone: AnalyticsTone;
  description: string;
}

export const environmentalKpis: EnvironmentalKpi[] = [
  {
    id: "water-saving",
    label: "Ahorro de agua",
    value: "6,210",
    unit: "L",
    baseline: "7,300 L (ref.)",
    saving: "15% vs. período anterior",
    trend: "down",
    tone: "eco",
    description: "Reducción por sistemas de reciclaje y dosificación controlada",
  },
  {
    id: "chemical-reduction",
    label: "Reducción consumo químico",
    value: "148",
    unit: "kg",
    baseline: "Reducción acumulada",
    saving: "8% vs. período anterior",
    trend: "down",
    tone: "eco",
    description: "Protocolo de dilución OVI P-07 aplicado en todos los sitios",
  },
  {
    id: "biodegradable-products",
    label: "Productos biodegradables",
    value: "78",
    unit: "%",
    baseline: "del total aplicado",
    saving: "+6 pp vs. período anterior",
    trend: "up",
    tone: "eco",
    description: "Línea OVI EcoLine en 78% de los servicios ejecutados",
  },
  {
    id: "sustainability-index",
    label: "Índice de sostenibilidad",
    value: "82",
    unit: "/100",
    baseline: "Meta: 85",
    saving: "+4 puntos vs. Q anterior",
    trend: "up",
    tone: "accent",
    description: "Compuesto: agua, química, residuos, biodegradabilidad",
  },
  {
    id: "carbon-footprint",
    label: "Huella ambiental",
    value: "—",
    unit: "",
    baseline: "En preparación",
    saving: "Módulo en desarrollo",
    trend: "stable",
    tone: "neutral",
    description: "Estructura preparada para integración con OVI AI y normativa local",
  },
];

export interface ProductSustainabilityRecord {
  name: string;
  category: string;
  biodegradable: boolean;
  ecoLabel: string | null;
  usageKg: number;
  co2Equiv: string;
}

export const productSustainabilityRecords: ProductSustainabilityRecord[] = [
  {
    name: "OVI EcoWash Pro",
    category: "Desengrasante industrial",
    biodegradable: true,
    ecoLabel: "OVI EcoLine",
    usageKg: 320,
    co2Equiv: "Bajo",
  },
  {
    name: "OVI HydroShield",
    category: "Impermeabilizante",
    biodegradable: true,
    ecoLabel: "OVI EcoLine",
    usageKg: 185,
    co2Equiv: "Bajo",
  },
  {
    name: "OVI SaniSurf",
    category: "Sanitizante de superficies",
    biodegradable: true,
    ecoLabel: "OVI EcoLine",
    usageKg: 240,
    co2Equiv: "Bajo",
  },
  {
    name: "OVI FleetClean HD",
    category: "Limpiador de flota pesada",
    biodegradable: false,
    ecoLabel: null,
    usageKg: 410,
    co2Equiv: "Medio",
  },
  {
    name: "OVI CemEx",
    category: "Removedor post obra",
    biodegradable: false,
    ecoLabel: null,
    usageKg: 685,
    co2Equiv: "Medio",
  },
];

// ─── Economic Indicators ──────────────────────────────────────────────────────

export interface EconomicKpi {
  id: string;
  label: string;
  value: string;
  unit: string;
  change: string;
  trend: TrendDirection;
  tone: AnalyticsTone;
  description: string;
}

export const economicKpis: EconomicKpi[] = [
  {
    id: "services-value",
    label: "Valor servicios ejecutados",
    value: "CLP 142M",
    unit: "",
    change: "+18%",
    trend: "up",
    tone: "accent",
    description: "Acumulado en los últimos 12 meses",
  },
  {
    id: "cost-per-service",
    label: "Costo promedio por servicio",
    value: "CLP 500K",
    unit: "",
    change: "-4%",
    trend: "down",
    tone: "primary",
    description: "Reducción por optimización de rutas y protocolos",
  },
  {
    id: "product-cost",
    label: "Costo de productos",
    value: "CLP 28M",
    unit: "",
    change: "-8%",
    trend: "down",
    tone: "eco",
    description: "Ahorro por dilución controlada y biodegradables",
  },
  {
    id: "rework-cost",
    label: "Costo por reprocesos",
    value: "CLP 1.2M",
    unit: "",
    change: "-42%",
    trend: "down",
    tone: "accent",
    description: "Reducción significativa por mejoras en protocolos",
  },
  {
    id: "roi-client",
    label: "ROI estimado por cliente",
    value: "3.4×",
    unit: "",
    change: "+0.3×",
    trend: "up",
    tone: "primary",
    description: "Sobre el costo total del servicio contratado",
  },
];

// ─── Trend Data ───────────────────────────────────────────────────────────────

export interface TrendPoint {
  period: string;
  services: number;
  compliance: number;
  waterUsage: number;
  chemUsage: number;
  incidents: number;
  satisfaction: number;
}

export const trendData: TrendPoint[] = [
  { period: "Ago 23", services: 18, compliance: 88, waterUsage: 9100, chemUsage: 245, incidents: 4, satisfaction: 4.3 },
  { period: "Sep 23", services: 20, compliance: 90, waterUsage: 8900, chemUsage: 238, incidents: 3, satisfaction: 4.4 },
  { period: "Oct 23", services: 21, compliance: 91, waterUsage: 8700, chemUsage: 231, incidents: 4, satisfaction: 4.4 },
  { period: "Nov 23", services: 22, compliance: 92, waterUsage: 8400, chemUsage: 224, incidents: 3, satisfaction: 4.5 },
  { period: "Dic 23", services: 19, compliance: 90, waterUsage: 8200, chemUsage: 218, incidents: 2, satisfaction: 4.5 },
  { period: "Ene 24", services: 21, compliance: 93, waterUsage: 7900, chemUsage: 210, incidents: 2, satisfaction: 4.6 },
  { period: "Feb 24", services: 23, compliance: 94, waterUsage: 7700, chemUsage: 204, incidents: 2, satisfaction: 4.6 },
  { period: "Mar 24", services: 24, compliance: 94, waterUsage: 7500, chemUsage: 198, incidents: 1, satisfaction: 4.7 },
  { period: "Abr 24", services: 25, compliance: 95, waterUsage: 7300, chemUsage: 192, incidents: 2, satisfaction: 4.7 },
  { period: "May 24", services: 24, compliance: 95, waterUsage: 7100, chemUsage: 185, incidents: 1, satisfaction: 4.7 },
  { period: "Jun 24", services: 26, compliance: 96, waterUsage: 6800, chemUsage: 178, incidents: 1, satisfaction: 4.8 },
  { period: "Jul 24", services: 23, compliance: 96, waterUsage: 6210, chemUsage: 170, incidents: 1, satisfaction: 4.8 },
];

// ─── Comparative Dimensions ───────────────────────────────────────────────────

export interface ComparativeDimension {
  id: string;
  label: string;
  description: string;
  icon: string;
}

export const comparativeDimensions: ComparativeDimension[] = [
  { id: "client", label: "Por cliente", description: "Rendimiento y KPIs por cliente activo", icon: "Building2" },
  { id: "industry", label: "Por industria", description: "Agregado por sector industrial", icon: "Factory" },
  { id: "site", label: "Por planta", description: "Indicadores por sitio o instalación", icon: "MapPin" },
  { id: "city", label: "Por ciudad", description: "Distribución geográfica de operaciones", icon: "Globe" },
  { id: "asset", label: "Por activo", description: "Recursos y frecuencia por activo", icon: "Layers" },
  { id: "service", label: "Por servicio", description: "Eficiencia y cumplimiento por tipo de servicio", icon: "Wrench" },
  { id: "product", label: "Por producto", description: "Consumo, costo y sostenibilidad por producto", icon: "Package" },
];

export interface ComparativeRecord {
  dimension: string;
  name: string;
  services: number;
  compliance: number;
  satisfaction: number;
  waterUsage: number;
  trend: TrendDirection;
  tone: AnalyticsTone;
}

export const comparativeByClient: ComparativeRecord[] = [
  { dimension: "client", name: "Industrias Pacífico S.A.", services: 68, compliance: 98, satisfaction: 4.9, waterUsage: 1240, trend: "up", tone: "accent" },
  { dimension: "client", name: "Logística Norte Ltda.", services: 54, compliance: 96, satisfaction: 4.8, waterUsage: 1880, trend: "up", tone: "accent" },
  { dimension: "client", name: "AgroFood Chile", services: 71, compliance: 97, satisfaction: 4.8, waterUsage: 1100, trend: "up", tone: "accent" },
  { dimension: "client", name: "Minera del Sur S.A.", services: 42, compliance: 95, satisfaction: 4.7, waterUsage: 980, trend: "stable", tone: "primary" },
  { dimension: "client", name: "Puerto Logístico Central", services: 27, compliance: 91, satisfaction: 4.5, waterUsage: 620, trend: "up", tone: "primary" },
  { dimension: "client", name: "Grupo Retail Prime", services: 22, compliance: 93, satisfaction: 4.6, waterUsage: 390, trend: "stable", tone: "neutral" },
];

export const comparativeByService: ComparativeRecord[] = [
  { dimension: "service", name: "Lavado de Flota Industrial", services: 82, compliance: 97, satisfaction: 4.9, waterUsage: 2480, trend: "up", tone: "accent" },
  { dimension: "service", name: "Limpieza Profunda Industrial", services: 61, compliance: 96, satisfaction: 4.8, waterUsage: 1870, trend: "up", tone: "accent" },
  { dimension: "service", name: "Sanitización de Superficies", services: 55, compliance: 98, satisfaction: 4.8, waterUsage: 880, trend: "up", tone: "accent" },
  { dimension: "service", name: "Post Obra", services: 34, compliance: 92, satisfaction: 4.6, waterUsage: 560, trend: "stable", tone: "primary" },
  { dimension: "service", name: "Impermeabilización", services: 29, compliance: 94, satisfaction: 4.7, waterUsage: 320, trend: "up", tone: "primary" },
  { dimension: "service", name: "Mantenimiento Preventivo", services: 23, compliance: 95, satisfaction: 4.7, waterUsage: 100, trend: "stable", tone: "neutral" },
];

// ─── Reports ──────────────────────────────────────────────────────────────────

export interface ReportTemplate {
  id: string;
  title: string;
  type: ReportType;
  description: string;
  sections: string[];
  lastGenerated: string | null;
  tone: AnalyticsTone;
  icon: string;
  available: boolean;
}

export const reportTemplates: ReportTemplate[] = [
  {
    id: "exec-monthly",
    title: "Informe Ejecutivo Mensual",
    type: "ejecutivo",
    description: "Resumen de indicadores clave, cumplimiento del plan y recomendaciones de alto nivel.",
    sections: ["KPIs ejecutivos", "Cumplimiento del plan", "Tendencia 12 meses", "Alertas y hallazgos", "Próximos servicios"],
    lastGenerated: "2024-06-30",
    tone: "primary",
    icon: "FileText",
    available: true,
  },
  {
    id: "tech-report",
    title: "Reporte Técnico de Servicios",
    type: "tecnico",
    description: "Detalle de servicios ejecutados, protocolos aplicados, consumo de materiales y observaciones técnicas.",
    sections: ["Listado de servicios", "Protocolos aplicados", "Consumo de productos", "Incidencias", "Fotos relevantes"],
    lastGenerated: "2024-06-30",
    tone: "neutral",
    icon: "ClipboardList",
    available: true,
  },
  {
    id: "environmental-report",
    title: "Informe Ambiental",
    type: "ambiental",
    description: "Indicadores de sostenibilidad: ahorro de agua, reducción química, uso de biodegradables y huella.",
    sections: ["Ahorro de agua", "Reducción química", "Productos biodegradables", "Índice de sostenibilidad", "Objetivos vs. resultados"],
    lastGenerated: null,
    tone: "eco",
    icon: "Leaf",
    available: true,
  },
  {
    id: "project-report",
    title: "Informe por Proyecto",
    type: "proyecto",
    description: "Estado y resultados de un proyecto específico: activos, servicios, consumo y satisfacción.",
    sections: ["Ficha del proyecto", "Activos atendidos", "Servicios ejecutados", "Consumo acumulado", "Satisfacción del cliente"],
    lastGenerated: "2024-07-01",
    tone: "primary",
    icon: "FolderOpen",
    available: true,
  },
  {
    id: "executive-summary",
    title: "Resumen Ejecutivo OVI AI",
    type: "ejecutivo",
    description: "Documento inteligente generado por OVI AI con hallazgos, riesgos y recomendaciones preventivas.",
    sections: ["Hallazgos relevantes", "Riesgos detectados", "Recomendaciones preventivas", "Oportunidades de mejora"],
    lastGenerated: null,
    tone: "accent",
    icon: "Sparkles",
    available: false,
  },
];

// ─── Architecture / Intelligence ──────────────────────────────────────────────

export interface ArchPillar {
  id: string;
  title: string;
  description: string;
  capabilities: string[];
  tone: AnalyticsTone;
  icon: string;
  status: "active" | "planned";
}

export const analyticsPillars: ArchPillar[] = [
  {
    id: "data-collection",
    title: "Captura de Datos",
    description: "OVI Analytics agrega datos desde todos los módulos del ecosistema OVI en tiempo real.",
    capabilities: [
      "Órdenes de trabajo desde OVI Field",
      "Historial de servicios desde OVI OS",
      "Consumo de productos desde OVI Core",
      "Resultados de diagnóstico desde OVI Lab",
    ],
    tone: "primary",
    icon: "Database",
    status: "active",
  },
  {
    id: "indicators",
    title: "Indicadores Ejecutivos",
    description: "Transformación de datos operativos en KPIs estratégicos de alto valor.",
    capabilities: [
      "Cumplimiento del plan operativo",
      "Eficiencia por activo, cliente e industria",
      "Indicadores ambientales y de sostenibilidad",
      "Índices económicos y de ROI",
    ],
    tone: "accent",
    icon: "BarChart3",
    status: "active",
  },
  {
    id: "trends",
    title: "Análisis de Tendencias",
    description: "Evolución histórica y proyecciones para la toma de decisiones estratégicas.",
    capabilities: [
      "Series temporales por indicador",
      "Comparativos multidimensionales",
      "Detección temprana de desviaciones",
      "Benchmarking entre sitios e industrias",
    ],
    tone: "primary",
    icon: "TrendingUp",
    status: "active",
  },
  {
    id: "reports",
    title: "Generación de Reportes",
    description: "Informes estructurados para distintos perfiles: ejecutivo, técnico, ambiental y por proyecto.",
    capabilities: [
      "Reportes PDF ejecutivos y técnicos",
      "Informes mensuales automáticos",
      "Reportes por proyecto y cliente",
      "Exportación a formatos OVI",
    ],
    tone: "neutral",
    icon: "FileText",
    status: "active",
  },
  {
    id: "ai-intelligence",
    title: "Inteligencia OVI AI",
    description: "En futuras versiones, OVI AI generará resúmenes ejecutivos y recomendaciones preventivas.",
    capabilities: [
      "Resúmenes ejecutivos automáticos",
      "Hallazgos y alertas inteligentes",
      "Detección de riesgos operativos",
      "Recomendaciones preventivas",
    ],
    tone: "accent",
    icon: "Sparkles",
    status: "planned",
  },
];

export interface IntegrationPoint {
  system: string;
  description: string;
  dataFlow: string;
  status: "connected" | "planned";
  tone: AnalyticsTone;
}

export const analyticsIntegrations: IntegrationPoint[] = [
  {
    system: "OVI OS",
    description: "Portal del cliente — historial de servicios, proyectos y documentación",
    dataFlow: "Servicios ejecutados, activos, satisfacción del cliente",
    status: "connected",
    tone: "primary",
  },
  {
    system: "OVI Field",
    description: "Plataforma de operaciones en campo — órdenes, checklists, fotos",
    dataFlow: "Tiempo de ejecución, cumplimiento, incidencias, consumo",
    status: "connected",
    tone: "primary",
  },
  {
    system: "OVI Lab",
    description: "Laboratorio de soluciones — diagnóstico y protocolos",
    dataFlow: "Resultados de diagnóstico, protocolos aplicados, eficacia",
    status: "connected",
    tone: "primary",
  },
  {
    system: "OVI Core",
    description: "Motor de conocimiento central — productos, servicios, sectores",
    dataFlow: "Catálogo de productos, consumo de materiales, especificaciones",
    status: "connected",
    tone: "primary",
  },
  {
    system: "OVI AI",
    description: "Inteligencia artificial — resúmenes, hallazgos, recomendaciones",
    dataFlow: "Análisis ejecutivo, detección de riesgos, sugerencias preventivas",
    status: "planned",
    tone: "accent",
  },
];
