/**
 * OVI Command Center — Data Models & Demo Data
 * Work Order 012
 *
 * Typed models and representative demo data for the Intelligent Control Center.
 * Unifies information from OVI OS, OVI Field, OVI AI, OVI Store, OVI Lab and
 * OVI Analytics into a single executive view.
 *
 * Architecture designed for:
 *   - Integration with OVI OS (service history, clients, projects)
 *   - Integration with OVI Field (real-time execution data)
 *   - Integration with OVI AI (recommendations, risk detection)
 *   - Integration with OVI Analytics (KPIs, trends)
 *   - Integration with OVI Lab (protocols, diagnostics)
 *   - Integration with OVI Store (product consumption, purchases)
 *   - Future: multi-site, multi-country, IoT sensors, digital twins
 */

// ─── Shared primitives ────────────────────────────────────────────────────────

export type CommandTone = "primary" | "accent" | "warning" | "danger" | "eco" | "neutral";

export type HealthStatus = "optimal" | "attention" | "critical" | "offline";

export type AlertSeverity = "critical" | "high" | "medium" | "low";

export type AlertCategory =
  "servicio" | "activo" | "producto" | "ambiental" | "incidencia" | "mantenimiento" | "ai";

export type TimelineEventType =
  | "diagnostico"
  | "servicio"
  | "compra"
  | "inspeccion"
  | "fotografia"
  | "incidencia"
  | "recomendacion";

export type RiskLevel = "alto" | "medio" | "bajo";

export type SearchCategory =
  "proyecto" | "activo" | "producto" | "protocolo" | "cliente" | "documento" | "diagnostico";

// ─── Executive Status ─────────────────────────────────────────────────────────

export interface GlobalStatus {
  health: HealthStatus;
  label: string;
  description: string;
  score: number; // 0-100
  updatedAt: string;
}

export const globalStatus: GlobalStatus = {
  health: "optimal",
  label: "Operación en Estado Óptimo",
  description:
    "Todos los sistemas activos funcionan dentro de parámetros normales. Sin alertas críticas pendientes.",
  score: 94,
  updatedAt: "Hoy, 14:32",
};

// ─── Executive KPIs ───────────────────────────────────────────────────────────

export interface CommandKpi {
  id: string;
  label: string;
  value: string;
  unit?: string;
  change: string;
  trend: "up" | "down" | "stable";
  tone: CommandTone;
  icon: string;
  description: string;
  source: string;
}

export const commandKpis: CommandKpi[] = [
  {
    id: "active-services",
    label: "Servicios activos",
    value: "12",
    unit: "en curso",
    change: "+3",
    trend: "up",
    tone: "primary",
    icon: "Activity",
    description: "Órdenes de trabajo actualmente en ejecución",
    source: "OVI Field",
  },
  {
    id: "compliance",
    label: "Cumplimiento del plan",
    value: "96.4",
    unit: "%",
    change: "+2.1 pp",
    trend: "up",
    tone: "accent",
    icon: "Target",
    description: "Sobre el total de servicios programados del período",
    source: "OVI Analytics",
  },
  {
    id: "critical-alerts",
    label: "Alertas críticas",
    value: "2",
    unit: "activas",
    change: "-1",
    trend: "down",
    tone: "warning",
    icon: "AlertTriangle",
    description: "Alertas que requieren atención inmediata",
    source: "OVI Command Center",
  },
  {
    id: "assets-monitored",
    label: "Activos monitoreados",
    value: "48",
    unit: "activos",
    change: "+4",
    trend: "up",
    tone: "primary",
    icon: "Layers",
    description: "Total de activos bajo supervisión continua",
    source: "OVI OS",
  },
  {
    id: "next-services",
    label: "Próximos servicios",
    value: "7",
    unit: "programados",
    change: "0",
    trend: "stable",
    tone: "neutral",
    icon: "Calendar",
    description: "Intervenciones programadas para los próximos 7 días",
    source: "OVI OS",
  },
  {
    id: "ai-recommendations",
    label: "Recomendaciones IA",
    value: "5",
    unit: "pendientes",
    change: "+2",
    trend: "up",
    tone: "accent",
    icon: "Sparkles",
    description: "Recomendaciones generadas por OVI AI sin resolver",
    source: "OVI AI",
  },
  {
    id: "open-diagnostics",
    label: "Diagnósticos abiertos",
    value: "3",
    unit: "en revisión",
    change: "-2",
    trend: "down",
    tone: "eco",
    icon: "FlaskConical",
    description: "Diagnósticos técnicos en proceso de validación",
    source: "OVI Lab",
  },
  {
    id: "product-consumption",
    label: "Consumo de productos",
    value: "1,840",
    unit: "kg/mes",
    change: "-8%",
    trend: "down",
    tone: "eco",
    icon: "Package",
    description: "Consumo mensual optimizado por protocolos vigentes",
    source: "OVI Store",
  },
];

// ─── Alert Center ─────────────────────────────────────────────────────────────

export interface CommandAlert {
  id: string;
  severity: AlertSeverity;
  category: AlertCategory;
  title: string;
  description: string;
  asset?: string;
  location?: string;
  detectedAt: string;
  source: string;
  resolved: boolean;
  actions: string[];
}

export const commandAlerts: CommandAlert[] = [
  {
    id: "alert-001",
    severity: "critical",
    category: "activo",
    title: "Activo crítico fuera de rango",
    description:
      "Sistema de dosificación Q-7 en Planta Norte detectado fuera de parámetros operativos. Requiere inspección inmediata.",
    asset: "Dosificador Q-7",
    location: "Planta Norte — Sector B2",
    detectedAt: "Hace 23 minutos",
    source: "OVI Field",
    resolved: false,
    actions: ["Asignar técnico", "Ver historial del activo", "Escalar a supervisor"],
  },
  {
    id: "alert-002",
    severity: "critical",
    category: "servicio",
    title: "Servicio con atraso de 48 horas",
    description:
      "La Orden de Trabajo #OT-2847 para limpieza de tanques en Almacén Central lleva 48 h de retraso sobre el plan.",
    asset: "OT-2847",
    location: "Almacén Central",
    detectedAt: "Hace 2 horas",
    source: "OVI OS",
    resolved: false,
    actions: ["Ver orden de trabajo", "Reasignar equipo", "Notificar cliente"],
  },
  {
    id: "alert-003",
    severity: "high",
    category: "producto",
    title: "Alto consumo de Desengrasante Industrial X-9",
    description:
      "El consumo del Desengrasante Industrial X-9 supera en un 35% la estimación del protocolo P-012 para este período.",
    asset: "Desengrasante Industrial X-9",
    location: "Nave de Producción 3",
    detectedAt: "Ayer, 16:45",
    source: "OVI Store",
    resolved: false,
    actions: ["Revisar protocolo P-012", "Auditar consumo", "Ver recomendaciones IA"],
  },
  {
    id: "alert-004",
    severity: "high",
    category: "ambiental",
    title: "Riesgo ambiental — pH fuera de rango",
    description:
      "El sistema detecta niveles de pH por debajo de 6.0 en el efluente del proceso de limpieza de la Línea 2.",
    asset: "Línea de Producción 2",
    location: "Zona Industrial Este",
    detectedAt: "Hoy, 09:12",
    source: "OVI AI",
    resolved: false,
    actions: ["Ver protocolo ambiental", "Activar plan de contingencia", "Notificar equipo HSE"],
  },
  {
    id: "alert-005",
    severity: "medium",
    category: "incidencia",
    title: "Incidencia repetitiva detectada",
    description:
      "Se han registrado 4 incidencias del mismo tipo (acumulación de grasa) en el mismo punto de Línea 1 durante los últimos 30 días.",
    asset: "Línea 1 — Punto de control C",
    location: "Planta Sur",
    detectedAt: "Esta semana",
    source: "OVI Analytics",
    resolved: false,
    actions: ["Ver historial de incidencias", "Solicitar diagnóstico", "Revisar protocolo"],
  },
  {
    id: "alert-006",
    severity: "medium",
    category: "mantenimiento",
    title: "Recomendación de mantenimiento preventivo",
    description:
      "El Compresor Industrial CI-3 alcanzó las 2,400 horas de operación. Se recomienda mantenimiento preventivo según especificaciones.",
    asset: "Compresor Industrial CI-3",
    location: "Sala de máquinas",
    detectedAt: "Hace 3 días",
    source: "OVI AI",
    resolved: false,
    actions: ["Programar mantenimiento", "Ver historial del equipo", "Revisar garantía"],
  },
  {
    id: "alert-007",
    severity: "low",
    category: "ai",
    title: "Nueva recomendación de OVI AI disponible",
    description:
      "OVI AI identificó una oportunidad de optimización del Protocolo P-007 que podría reducir el consumo de agua en un 12%.",
    detectedAt: "Hace 6 horas",
    source: "OVI AI",
    resolved: false,
    actions: ["Ver recomendación", "Evaluar protocolo", "Aprobar cambio"],
  },
];

// ─── Upcoming Services ────────────────────────────────────────────────────────

export interface UpcomingService {
  id: string;
  orderNumber: string;
  title: string;
  client: string;
  location: string;
  scheduledDate: string;
  scheduledTime: string;
  duration: string;
  technician: string;
  priority: "alta" | "media" | "normal";
  status: "confirmado" | "pendiente" | "en_riesgo";
  protocol: string;
  tags: string[];
}

export const upcomingServices: UpcomingService[] = [
  {
    id: "svc-001",
    orderNumber: "OT-2851",
    title: "Limpieza profunda de tanques de almacenamiento",
    client: "Grupo Industrial Montaña",
    location: "Planta Norte — Sector A",
    scheduledDate: "Mañana",
    scheduledTime: "07:00",
    duration: "6 horas",
    technician: "Carlos Mendoza",
    priority: "alta",
    status: "confirmado",
    protocol: "P-018 Limpieza de Tanques",
    tags: ["tanques", "profunda", "cementación"],
  },
  {
    id: "svc-002",
    orderNumber: "OT-2852",
    title: "Inspección y lavado de flota vehicular",
    client: "Transportes del Norte SA",
    location: "Patio vehicular principal",
    scheduledDate: "Mañana",
    scheduledTime: "08:30",
    duration: "4 horas",
    technician: "Ana Torres",
    priority: "normal",
    status: "confirmado",
    protocol: "P-004 Lavado de Flota",
    tags: ["flota", "vehículos", "exterior"],
  },
  {
    id: "svc-003",
    orderNumber: "OT-2853",
    title: "Limpieza post-obra en edificio corporativo",
    client: "Constructora Vega Hermanos",
    location: "Torre Ejecutiva — Pisos 8-12",
    scheduledDate: "Pasado mañana",
    scheduledTime: "06:00",
    duration: "10 horas",
    technician: "Luis Fernández + equipo",
    priority: "alta",
    status: "en_riesgo",
    protocol: "P-022 Post Obra Corporativo",
    tags: ["post-obra", "corporativo", "multiturno"],
  },
  {
    id: "svc-004",
    orderNumber: "OT-2854",
    title: "Tratamiento de pisos industriales — Nave 2",
    client: "Fábrica Metalúrgica Cóndor",
    location: "Nave de producción 2",
    scheduledDate: "En 3 días",
    scheduledTime: "22:00",
    duration: "5 horas",
    technician: "Roberto Salinas",
    priority: "media",
    status: "confirmado",
    protocol: "P-009 Pisos Industriales",
    tags: ["pisos", "nocturno", "metalúrgica"],
  },
  {
    id: "svc-005",
    orderNumber: "OT-2855",
    title: "Desinfección de área de procesamiento de alimentos",
    client: "Alimentos del Sur Ltda.",
    location: "Planta de procesamiento — Línea 1",
    scheduledDate: "En 4 días",
    scheduledTime: "05:00",
    duration: "3 horas",
    technician: "Patricia Rojas",
    priority: "alta",
    status: "pendiente",
    protocol: "P-031 Industria Alimentaria HACCP",
    tags: ["alimentos", "HACCP", "desinfección"],
  },
  {
    id: "svc-006",
    orderNumber: "OT-2856",
    title: "Impermeabilización de terraza y cubierta",
    client: "Hotel Grand Central",
    location: "Terraza nivel 14",
    scheduledDate: "En 5 días",
    scheduledTime: "09:00",
    duration: "8 horas",
    technician: "Diego Álvarez",
    priority: "media",
    status: "confirmado",
    protocol: "P-015 Impermeabilización",
    tags: ["impermeabilización", "altura", "terraza"],
  },
  {
    id: "svc-007",
    orderNumber: "OT-2857",
    title: "Limpieza y mantenimiento de equipo industrial",
    client: "Minera Cordillera",
    location: "Campamento principal",
    scheduledDate: "En 7 días",
    scheduledTime: "08:00",
    duration: "12 horas",
    technician: "Equipo especializado 4 técnicos",
    priority: "alta",
    status: "confirmado",
    protocol: "P-028 Minería y Campamentos",
    tags: ["minería", "campamento", "equipo-pesado"],
  },
];

// ─── Critical Assets ──────────────────────────────────────────────────────────

export interface CriticalAsset {
  id: string;
  name: string;
  type: string;
  client: string;
  location: string;
  health: HealthStatus;
  lastService: string;
  nextService: string;
  alerts: number;
  riskLevel: RiskLevel;
  metrics: { label: string; value: string; unit: string }[];
}

export const criticalAssets: CriticalAsset[] = [
  {
    id: "asset-001",
    name: "Dosificador Q-7",
    type: "Sistema de dosificación",
    client: "Grupo Industrial Montaña",
    location: "Planta Norte — Sector B2",
    health: "critical",
    lastService: "Hace 18 días",
    nextService: "Hoy (urgente)",
    alerts: 1,
    riskLevel: "alto",
    metrics: [
      { label: "Presión", value: "8.2", unit: "bar" },
      { label: "Temperatura", value: "67", unit: "°C" },
      { label: "Caudal", value: "0.8", unit: "L/min" },
    ],
  },
  {
    id: "asset-002",
    name: "Compresor Industrial CI-3",
    type: "Compresor de aire",
    client: "Fábrica Metalúrgica Cóndor",
    location: "Sala de máquinas",
    health: "attention",
    lastService: "Hace 45 días",
    nextService: "Próxima semana",
    alerts: 1,
    riskLevel: "medio",
    metrics: [
      { label: "Horas de uso", value: "2,400", unit: "h" },
      { label: "Presión", value: "10.5", unit: "bar" },
      { label: "Temperatura", value: "52", unit: "°C" },
    ],
  },
  {
    id: "asset-003",
    name: "Sistema de recirculación SR-2",
    type: "Sistema hidráulico",
    client: "Planta Química Andina",
    location: "Nave de producción 1",
    health: "optimal",
    lastService: "Hace 7 días",
    nextService: "En 23 días",
    alerts: 0,
    riskLevel: "bajo",
    metrics: [
      { label: "Caudal", value: "12.4", unit: "L/min" },
      { label: "pH efluente", value: "7.1", unit: "pH" },
      { label: "Temperatura", value: "28", unit: "°C" },
    ],
  },
  {
    id: "asset-004",
    name: "Nebulizador NB-400",
    type: "Equipo de nebulización",
    client: "Hospital Regional Norte",
    location: "Zona de desinfección",
    health: "attention",
    lastService: "Hace 12 días",
    nextService: "En 3 días",
    alerts: 0,
    riskLevel: "medio",
    metrics: [
      { label: "Capacidad", value: "400", unit: "mL/h" },
      { label: "Cobertura", value: "320", unit: "m²" },
      { label: "Ciclos completados", value: "184", unit: "ciclos" },
    ],
  },
  {
    id: "asset-005",
    name: "Hidrolavadora HD-2500",
    type: "Equipo de alta presión",
    client: "Transportes del Norte SA",
    location: "Patio vehicular",
    health: "optimal",
    lastService: "Hace 3 días",
    nextService: "En 27 días",
    alerts: 0,
    riskLevel: "bajo",
    metrics: [
      { label: "Presión máxima", value: "2,500", unit: "PSI" },
      { label: "Caudal", value: "15", unit: "L/min" },
      { label: "Horas de uso", value: "628", unit: "h" },
    ],
  },
];

// ─── Latest Diagnostics ───────────────────────────────────────────────────────

export interface DiagnosticRecord {
  id: string;
  title: string;
  client: string;
  location: string;
  date: string;
  status: "cerrado" | "en_revision" | "pendiente";
  findings: number;
  recommendations: number;
  protocol: string;
  technician: string;
  summary: string;
}

export const diagnosticRecords: DiagnosticRecord[] = [
  {
    id: "diag-001",
    title: "Diagnóstico de superficies — Planta de Procesamiento",
    client: "Alimentos del Sur Ltda.",
    location: "Línea de producción 1 y 2",
    date: "Ayer, 14:00",
    status: "en_revision",
    findings: 4,
    recommendations: 6,
    protocol: "P-031 HACCP",
    technician: "Patricia Rojas",
    summary:
      "Se identificaron 4 puntos de acumulación de residuos orgánicos en uniones de equipos. Se recomiendan 6 ajustes al protocolo de limpieza y frecuencia de intervención.",
  },
  {
    id: "diag-002",
    title: "Inspección de sistema de dosificación",
    client: "Grupo Industrial Montaña",
    location: "Planta Norte — Sector B",
    date: "Hoy, 09:30",
    status: "pendiente",
    findings: 2,
    recommendations: 3,
    protocol: "P-018",
    technician: "Carlos Mendoza",
    summary:
      "Se detectaron desvíos de caudal en el Dosificador Q-7. Requiere calibración urgente. Se adjuntan fotografías y registros de medición.",
  },
  {
    id: "diag-003",
    title: "Evaluación de tratamiento de pisos industriales",
    client: "Fábrica Metalúrgica Cóndor",
    location: "Nave 2 — Zona de corte",
    date: "Hace 3 días",
    status: "cerrado",
    findings: 1,
    recommendations: 2,
    protocol: "P-009",
    technician: "Roberto Salinas",
    summary:
      "Estado general satisfactorio. Se identificó desgaste moderado en sector de corte. Protocolo de mantenimiento actualizado con mayor frecuencia en zona crítica.",
  },
  {
    id: "diag-004",
    title: "Diagnóstico ambiental — Efluentes industriales",
    client: "Planta Química Andina",
    location: "Zona de tratamiento de efluentes",
    date: "Hace 5 días",
    status: "cerrado",
    findings: 3,
    recommendations: 4,
    protocol: "P-ENV-003",
    technician: "Equipo ambiental",
    summary:
      "pH fuera de rango en punto de control 3. Conductividad elevada. Se implementaron medidas correctivas con resultados positivos al cierre del diagnóstico.",
  },
];

// ─── Product Consumption ──────────────────────────────────────────────────────

export interface ProductConsumption {
  id: string;
  productName: string;
  category: string;
  consumed: number;
  unit: string;
  planned: number;
  variance: number; // percentage deviation
  trend: "up" | "down" | "stable";
  tone: CommandTone;
  topClients: string[];
  lastPurchase: string;
}

export const productConsumption: ProductConsumption[] = [
  {
    id: "prod-001",
    productName: "Desengrasante Industrial X-9",
    category: "Desengrasantes",
    consumed: 324,
    unit: "kg",
    planned: 240,
    variance: 35,
    trend: "up",
    tone: "warning",
    topClients: ["Fábrica Metalúrgica Cóndor", "Minera Cordillera"],
    lastPurchase: "Hace 8 días",
  },
  {
    id: "prod-002",
    productName: "BioClean Multiuso B-3",
    category: "Multiusos biodegradables",
    consumed: 186,
    unit: "kg",
    planned: 200,
    variance: -7,
    trend: "down",
    tone: "eco",
    topClients: ["Hotel Grand Central", "Alimentos del Sur Ltda."],
    lastPurchase: "Hace 5 días",
  },
  {
    id: "prod-003",
    productName: "AquaPro Concentrado AP-100",
    category: "Productos a base de agua",
    consumed: 540,
    unit: "L",
    planned: 500,
    variance: 8,
    trend: "stable",
    tone: "primary",
    topClients: ["Transportes del Norte SA", "Hospital Regional Norte"],
    lastPurchase: "Ayer",
  },
  {
    id: "prod-004",
    productName: "QuimiShield Impermeabilizante QS-7",
    category: "Impermeabilizantes",
    consumed: 95,
    unit: "kg",
    planned: 100,
    variance: -5,
    trend: "stable",
    tone: "neutral",
    topClients: ["Hotel Grand Central", "Constructora Vega Hermanos"],
    lastPurchase: "Hace 12 días",
  },
  {
    id: "prod-005",
    productName: "Sanitizante Hospitalario SH-200",
    category: "Sanitizantes",
    consumed: 42,
    unit: "L",
    planned: 45,
    variance: -7,
    trend: "down",
    tone: "eco",
    topClients: ["Hospital Regional Norte"],
    lastPurchase: "Hace 3 días",
  },
];

// ─── Environmental Indicators ─────────────────────────────────────────────────

export interface EnvironmentalIndicator {
  id: string;
  label: string;
  value: string;
  unit: string;
  change: string;
  trend: "up" | "down" | "stable";
  tone: CommandTone;
  icon: string;
  description: string;
  target: string;
}

export const environmentalIndicators: EnvironmentalIndicator[] = [
  {
    id: "water-saved",
    label: "Agua ahorrada",
    value: "6,210",
    unit: "L",
    change: "-15%",
    trend: "down",
    tone: "eco",
    icon: "Droplets",
    description: "Reducción de consumo hídrico vs. período anterior",
    target: "Meta: -20% anual",
  },
  {
    id: "biodegradable-ratio",
    label: "Productos biodegradables",
    value: "78",
    unit: "%",
    change: "+6 pp",
    trend: "up",
    tone: "eco",
    icon: "Leaf",
    description: "Porcentaje de productos biodegradables en el mix total",
    target: "Meta: 85% al cierre del año",
  },
  {
    id: "chemical-reduction",
    label: "Reducción química",
    value: "22",
    unit: "%",
    change: "+3 pp",
    trend: "up",
    tone: "eco",
    icon: "FlaskConical",
    description: "Reducción en uso de químicos agresivos por protocolos OVI",
    target: "Meta: -25% anual",
  },
  {
    id: "sustainability-index",
    label: "Índice de sostenibilidad",
    value: "8.7",
    unit: "/10",
    change: "+0.4",
    trend: "up",
    tone: "accent",
    icon: "BarChart3",
    description: "Índice compuesto de prácticas ambientalmente responsables",
    target: "Meta: 9.0",
  },
  {
    id: "emissions-estimate",
    label: "Emisiones estimadas",
    value: "1.8",
    unit: "t CO₂e",
    change: "-12%",
    trend: "down",
    tone: "eco",
    icon: "Wind",
    description: "Emisiones equivalentes de CO₂ estimadas del proceso",
    target: "Meta: <2 t CO₂e/mes",
  },
  {
    id: "waste-generated",
    label: "Residuos generados",
    value: "124",
    unit: "kg",
    change: "-9%",
    trend: "down",
    tone: "eco",
    icon: "Recycle",
    description: "Residuos sólidos generados por los servicios del período",
    target: "Meta: <110 kg/mes",
  },
];

// ─── Risk Analysis ────────────────────────────────────────────────────────────

export interface RiskItem {
  id: string;
  title: string;
  category: string;
  level: RiskLevel;
  probability: number; // 0-100
  impact: number; // 0-100
  description: string;
  triggers: string[];
  mitigations: string[];
  owner: string;
  dueDate: string;
  aiGenerated: boolean;
}

export const riskItems: RiskItem[] = [
  {
    id: "risk-001",
    title: "Incumplimiento de protocolo HACCP en cliente alimentario",
    category: "Cumplimiento normativo",
    level: "alto",
    probability: 65,
    impact: 90,
    description:
      "La incidencia repetitiva detectada en Alimentos del Sur Ltda. eleva el riesgo de incumplimiento de normativas HACCP en la próxima auditoría programada.",
    triggers: [
      "4 incidencias del mismo tipo en 30 días",
      "Protocolo P-031 no actualizado",
      "Auditoría programada en 2 semanas",
    ],
    mitigations: [
      "Actualizar protocolo P-031 con nueva frecuencia",
      "Capacitación de equipo técnico",
      "Diagnóstico preventivo antes de auditoría",
    ],
    owner: "Patricia Rojas",
    dueDate: "En 5 días",
    aiGenerated: true,
  },
  {
    id: "risk-002",
    title: "Falla de activo crítico por mantenimiento diferido",
    category: "Integridad de activos",
    level: "alto",
    probability: 70,
    impact: 80,
    description:
      "El Compresor CI-3 alcanzó el límite de horas operativas sin mantenimiento preventivo. El riesgo de falla no planificada es elevado.",
    triggers: [
      "2,400 horas sin mantenimiento mayor",
      "Temperatura en ascenso",
      "Próxima OT de cliente en 7 días",
    ],
    mitigations: [
      "Programar mantenimiento preventivo inmediato",
      "Asegunar compresor de respaldo",
      "Monitoreo de temperatura cada 2 horas",
    ],
    owner: "Roberto Salinas",
    dueDate: "En 3 días",
    aiGenerated: true,
  },
  {
    id: "risk-003",
    title: "Riesgo ambiental por desviación de pH en efluentes",
    category: "Ambiental y normativo",
    level: "alto",
    probability: 80,
    impact: 75,
    description:
      "El pH fuera de rango detectado en la Planta Química Andina puede generar un incidente ambiental regulado y daño reputacional.",
    triggers: ["pH < 6.0 en efluente", "Sin acción correctiva en las últimas 4 horas"],
    mitigations: [
      "Activar plan de contingencia ambiental",
      "Ajustar dosificación de neutralizante",
      "Reportar a equipo HSE en menos de 1 hora",
    ],
    owner: "Equipo ambiental",
    dueDate: "Inmediato",
    aiGenerated: true,
  },
  {
    id: "risk-004",
    title: "Sobreconsumo de químico con impacto en costo del proyecto",
    category: "Económico y operativo",
    level: "medio",
    probability: 75,
    impact: 55,
    description:
      "El sobreconsumo del 35% en Desengrasante X-9 puede generar desviaciones presupuestarias y necesidad de reabastecimiento urgente no planificado.",
    triggers: [
      "Consumo 35% sobre lo planificado",
      "Protocolo P-012 desactualizado",
      "Sin revisión de dosificación en 45 días",
    ],
    mitigations: [
      "Auditar dosificación en campo",
      "Revisar y actualizar protocolo P-012",
      "Negociar reabastecimiento prioritario",
    ],
    owner: "Ana Torres",
    dueDate: "Esta semana",
    aiGenerated: false,
  },
  {
    id: "risk-005",
    title: "Retraso en entrega de orden de trabajo prioritaria",
    category: "Operativo y contractual",
    level: "medio",
    probability: 55,
    impact: 65,
    description:
      "La OT-2847 con 48h de atraso puede comprometer el SLA contractual con el cliente y generar penalidades.",
    triggers: [
      "48 horas de atraso acumulado",
      "Sin técnico asignado actualmente",
      "SLA con penalidad por retraso",
    ],
    mitigations: [
      "Reasignar equipo disponible de forma inmediata",
      "Negociar extensión de plazo con cliente",
      "Documentar causas del atraso",
    ],
    owner: "Carlos Mendoza",
    dueDate: "Hoy",
    aiGenerated: false,
  },
];

// ─── AI Recommendations ───────────────────────────────────────────────────────

export interface AiRecommendation {
  id: string;
  priority: "urgente" | "alta" | "media" | "baja";
  title: string;
  category: string;
  rationale: string;
  suggestedActions: string[];
  nextSteps: string[];
  bestPractices: string[];
  estimatedBenefit: string;
  confidence: number; // 0-100
  relatedModules: string[];
  generatedAt: string;
}

export const aiRecommendations: AiRecommendation[] = [
  {
    id: "ai-rec-001",
    priority: "urgente",
    title: "Intervención inmediata en Dosificador Q-7",
    category: "Activos críticos",
    rationale:
      "Los datos del sensor indican que el Dosificador Q-7 opera con 18% de caudal por debajo del mínimo operativo. La correlación con el historial de fallos sugiere una probabilidad de 82% de falla total en las próximas 72 horas.",
    suggestedActions: [
      "Asignar técnico especializado en las próximas 2 horas",
      "Realizar calibración y limpieza de válvulas",
      "Verificar presión de suministro en la red",
    ],
    nextSteps: [
      "Confirmar disponibilidad de técnico senior",
      "Preparar kit de calibración Q-serie",
      "Coordinar con cliente acceso a Sector B2",
    ],
    bestPractices: [
      "Calibración cada 90 días en ambientes corrosivos",
      "Registro fotográfico pre y post intervención",
      "Prueba de funcionamiento con protocolo P-018",
    ],
    estimatedBenefit: "Prevención de paro operativo estimado en 8-12 horas",
    confidence: 82,
    relatedModules: ["OVI Field", "OVI OS", "OVI Lab"],
    generatedAt: "Hace 23 minutos",
  },
  {
    id: "ai-rec-002",
    priority: "alta",
    title: "Optimización del Protocolo P-007 para reducción hídrica",
    category: "Sostenibilidad operativa",
    rationale:
      "El análisis comparativo de los últimos 6 meses indica que ajustar la concentración del producto en el Protocolo P-007 y modificar la secuencia de enjuague puede reducir el consumo de agua en un 12% sin afectar la eficacia del proceso.",
    suggestedActions: [
      "Modificar concentración de producto en paso 3 de P-007",
      "Implementar ciclo de enjuague optimizado (2 ciclos en lugar de 3)",
      "Pilotear cambio en 2 clientes antes de escalar",
    ],
    nextSteps: [
      "Revisar protocolo con equipo técnico de OVI Lab",
      "Identificar 2 clientes para piloto",
      "Establecer métricas de éxito del piloto",
    ],
    bestPractices: [
      "Validar modificaciones de protocolo con datos de campo antes de escalar",
      "Documentar versiones de protocolo en OVI Lab",
      "Compartir resultados en reporte mensual de sostenibilidad",
    ],
    estimatedBenefit: "Reducción estimada de 744 L de agua al mes",
    confidence: 76,
    relatedModules: ["OVI Lab", "OVI Analytics", "OVI Store"],
    generatedAt: "Hace 6 horas",
  },
  {
    id: "ai-rec-003",
    priority: "alta",
    title: "Plan de acción para mitigar riesgo ambiental en Planta Química Andina",
    category: "Riesgo ambiental",
    rationale:
      "El pH fuera de rango en el efluente indica dosificación insuficiente de neutralizante. El historial de la planta muestra un patrón recurrente en temporadas de alta producción. Es necesario un plan de acción estructurado.",
    suggestedActions: [
      "Aumentar dosificación de neutralizante en un 15% de forma inmediata",
      "Instalar monitoreo continuo de pH en punto de control 3",
      "Revisar y actualizar el protocolo ambiental P-ENV-003",
    ],
    nextSteps: [
      "Notificar al responsable ambiental del cliente",
      "Activar plan de contingencia ambiental interno",
      "Programar diagnóstico ambiental completo en 7 días",
    ],
    bestPractices: [
      "Monitoreo de pH cada 2 horas en temporadas de alta producción",
      "Mantener stock de neutralizante de emergencia en planta",
      "Registro de eventos ambientales en OVI OS con trazabilidad completa",
    ],
    estimatedBenefit: "Prevención de incidente ambiental regulado y posibles sanciones",
    confidence: 88,
    relatedModules: ["OVI OS", "OVI Analytics", "OVI Field"],
    generatedAt: "Hoy, 10:15",
  },
  {
    id: "ai-rec-004",
    priority: "media",
    title: "Rediseño de frecuencia de servicio para cliente de alta incidencia",
    category: "Optimización de planes",
    rationale:
      "El patrón de incidencias repetitivas en Alimentos del Sur Ltda. sugiere que la frecuencia de servicio actual es insuficiente para las condiciones operativas del cliente. Aumentar la frecuencia puede eliminar el riesgo de cumplimiento.",
    suggestedActions: [
      "Aumentar frecuencia de limpieza de Línea 1 de mensual a quincenal",
      "Incorporar inspección visual post-servicio como paso obligatorio",
      "Ajustar protocolo P-031 con nuevas frecuencias",
    ],
    nextSteps: [
      "Presentar propuesta al cliente con análisis de costo-beneficio",
      "Actualizar plan de servicios en OVI OS",
      "Coordinar disponibilidad del técnico asignado",
    ],
    bestPractices: [
      "Revisar frecuencias de servicio cada trimestre con datos reales de incidencias",
      "Incluir cláusulas de ajuste de frecuencia en contratos",
      "Medir reducción de incidencias como KPI del plan",
    ],
    estimatedBenefit: "Reducción estimada de 60% en incidencias del tipo detectado",
    confidence: 71,
    relatedModules: ["OVI OS", "OVI Analytics", "OVI Field"],
    generatedAt: "Hace 1 día",
  },
  {
    id: "ai-rec-005",
    priority: "baja",
    title: "Optimización del inventario de Desengrasante X-9",
    category: "Gestión de productos",
    rationale:
      "El sobreconsumo detectado, combinado con el patrón de reabastecimiento histórico, indica una oportunidad para optimizar la política de inventario y negociar condiciones de reabastecimiento preferencial.",
    suggestedActions: [
      "Establecer punto de reorder en 80 kg (actualmente 50 kg)",
      "Negociar acuerdo de suministro mensual fijo con proveedor",
      "Revisar y actualizar protocolo P-012 para reducir sobreconsumo",
    ],
    nextSteps: [
      "Auditar dosificación actual en campo",
      "Contactar a OVI Store para cotización de volumen",
      "Actualizar política de inventario en el sistema",
    ],
    bestPractices: [
      "Establecer stock de seguridad mínimo para químicos críticos",
      "Revisar consumo mensual vs. planificado en reporte de OVI Analytics",
      "Auditar dosificación en campo cada 60 días",
    ],
    estimatedBenefit: "Reducción de hasta 20% en sobreconsumo y mejora en costos logísticos",
    confidence: 68,
    relatedModules: ["OVI Store", "OVI Analytics", "OVI Lab"],
    generatedAt: "Hace 2 días",
  },
];

// ─── Timeline Events ──────────────────────────────────────────────────────────

export interface TimelineEvent {
  id: string;
  type: TimelineEventType;
  title: string;
  description: string;
  date: string;
  time: string;
  client?: string;
  location?: string;
  technician?: string;
  icon: string;
  tone: CommandTone;
  linkedItems?: { label: string; type: string }[];
}

export const timelineEvents: TimelineEvent[] = [
  {
    id: "tl-001",
    type: "diagnostico",
    title: "Diagnóstico técnico completado",
    description:
      "Diagnóstico de superficies HACCP en planta de Alimentos del Sur Ltda. con 4 hallazgos.",
    date: "Hoy",
    time: "14:00",
    client: "Alimentos del Sur Ltda.",
    location: "Línea 1 y 2",
    technician: "Patricia Rojas",
    icon: "FlaskConical",
    tone: "accent",
    linkedItems: [{ label: "Diagnóstico #DIAG-001", type: "diagnostico" }],
  },
  {
    id: "tl-002",
    type: "servicio",
    title: "Servicio de limpieza ejecutado",
    description:
      "Limpieza y tratamiento de pisos en Nave 2 de la Metalúrgica Cóndor. Servicio completado sin incidencias.",
    date: "Hoy",
    time: "11:30",
    client: "Fábrica Metalúrgica Cóndor",
    location: "Nave 2",
    technician: "Roberto Salinas",
    icon: "CheckCircle",
    tone: "primary",
    linkedItems: [{ label: "OT-2849", type: "orden" }],
  },
  {
    id: "tl-003",
    type: "incidencia",
    title: "Incidencia registrada — pH fuera de rango",
    description:
      "Detección de pH < 6.0 en efluente de Planta Química Andina. Alerta ambiental activada.",
    date: "Hoy",
    time: "09:12",
    client: "Planta Química Andina",
    location: "Zona de efluentes",
    icon: "AlertTriangle",
    tone: "warning",
    linkedItems: [{ label: "Alerta #ALERT-004", type: "alerta" }],
  },
  {
    id: "tl-004",
    type: "compra",
    title: "Compra de productos procesada",
    description:
      "Reabastecimiento de AquaPro Concentrado AP-100 (500 L) y BioClean Multiuso B-3 (200 kg) para operaciones del mes.",
    date: "Ayer",
    time: "16:00",
    icon: "ShoppingCart",
    tone: "neutral",
    linkedItems: [
      { label: "AquaPro AP-100", type: "producto" },
      { label: "BioClean B-3", type: "producto" },
    ],
  },
  {
    id: "tl-005",
    type: "inspeccion",
    title: "Inspección preventiva de activos",
    description:
      "Inspección del Nebulizador NB-400 en Hospital Regional Norte. Resultados normales, se programa próximo servicio.",
    date: "Ayer",
    time: "10:00",
    client: "Hospital Regional Norte",
    location: "Zona de desinfección",
    technician: "Ana Torres",
    icon: "Eye",
    tone: "primary",
    linkedItems: [{ label: "Activo NB-400", type: "activo" }],
  },
  {
    id: "tl-006",
    type: "fotografia",
    title: "Registro fotográfico — Post servicio",
    description:
      "12 fotografías registradas del estado post-limpieza en la Torre Ejecutiva (Constructora Vega Hermanos).",
    date: "Hace 2 días",
    time: "18:30",
    client: "Constructora Vega Hermanos",
    location: "Torre Ejecutiva — Pisos 8-12",
    technician: "Luis Fernández",
    icon: "Camera",
    tone: "neutral",
    linkedItems: [{ label: "OT-2846", type: "orden" }],
  },
  {
    id: "tl-007",
    type: "recomendacion",
    title: "Nueva recomendación de OVI AI",
    description:
      "OVI AI generó recomendación de optimización del Protocolo P-007 para reducción de consumo hídrico del 12%.",
    date: "Hace 2 días",
    time: "08:00",
    icon: "Sparkles",
    tone: "accent",
    linkedItems: [{ label: "Recomendación #AI-REC-002", type: "recomendacion" }],
  },
  {
    id: "tl-008",
    type: "servicio",
    title: "Lavado de flota completado",
    description:
      "Lavado completo de 18 vehículos de flota en patio de Transportes del Norte SA. Certificado de cumplimiento emitido.",
    date: "Hace 3 días",
    time: "13:00",
    client: "Transportes del Norte SA",
    location: "Patio vehicular",
    technician: "Ana Torres",
    icon: "CheckCircle",
    tone: "primary",
    linkedItems: [{ label: "OT-2845", type: "orden" }],
  },
];

// ─── Global Search — Demo Results ─────────────────────────────────────────────

export interface SearchResult {
  id: string;
  category: SearchCategory;
  title: string;
  subtitle: string;
  relevance: number; // 0-100
  icon: string;
  tags: string[];
  href: string;
}

export const searchResultsDemo: SearchResult[] = [
  {
    id: "sr-001",
    category: "proyecto",
    title: "Proyecto Alimentos del Sur — Q3 2025",
    subtitle: "Plan de servicios anual con 24 intervenciones programadas",
    relevance: 98,
    icon: "FolderOpen",
    tags: ["activo", "HACCP", "alimentaria"],
    href: "/ovi-os",
  },
  {
    id: "sr-002",
    category: "activo",
    title: "Dosificador Q-7",
    subtitle: "Grupo Industrial Montaña — Planta Norte, Sector B2",
    relevance: 95,
    icon: "Layers",
    tags: ["crítico", "alerta activa", "calibración pendiente"],
    href: "/ovi-os",
  },
  {
    id: "sr-003",
    category: "producto",
    title: "Desengrasante Industrial X-9",
    subtitle: "Categoría: Desengrasantes — Ficha técnica disponible",
    relevance: 88,
    icon: "Package",
    tags: ["sobreconsumo", "revisar protocolo"],
    href: "/store",
  },
  {
    id: "sr-004",
    category: "protocolo",
    title: "Protocolo P-007 — Limpieza de superficies con sistema hídrico",
    subtitle: "OVI Lab — Versión 3.2 — En revisión para optimización",
    relevance: 85,
    icon: "ClipboardList",
    tags: ["hídrico", "revisión IA", "ahorro agua"],
    href: "/ovi-ai",
  },
  {
    id: "sr-005",
    category: "cliente",
    title: "Alimentos del Sur Ltda.",
    subtitle: "Industria alimentaria — 3 proyectos activos",
    relevance: 82,
    icon: "Building2",
    tags: ["HACCP", "incidencias recientes", "auditoría próxima"],
    href: "/ovi-os",
  },
  {
    id: "sr-006",
    category: "diagnostico",
    title: "Diagnóstico DIAG-001 — Superficies HACCP",
    subtitle: "Alimentos del Sur Ltda. — Hoy, 14:00 — En revisión",
    relevance: 79,
    icon: "FlaskConical",
    tags: ["en_revision", "4 hallazgos", "HACCP"],
    href: "/ovi-os",
  },
  {
    id: "sr-007",
    category: "documento",
    title: "Acta de cierre OT-2845 — Lavado de flota",
    subtitle: "Transportes del Norte SA — Firmada digitalmente — Hace 3 días",
    relevance: 72,
    icon: "FileText",
    tags: ["cerrado", "firmado", "flota"],
    href: "/ovi-field",
  },
];

// ─── Architecture / Integration Modules ──────────────────────────────────────

export interface IntegrationModule {
  id: string;
  name: string;
  description: string;
  status: "activo" | "en_desarrollo" | "planificado";
  dataFlows: string[];
  icon: string;
  color: string;
  href: string;
}

export const integrationModules: IntegrationModule[] = [
  {
    id: "ovi-os",
    name: "OVI OS",
    description: "Portal del cliente. Proyectos, contratos, historial de servicios y activos.",
    status: "activo",
    dataFlows: [
      "Servicios programados",
      "Historial de activos",
      "Datos de cliente",
      "Actas de cierre",
    ],
    icon: "Monitor",
    color: "var(--color-brand-primary)",
    href: "/ovi-os",
  },
  {
    id: "ovi-field",
    name: "OVI Field",
    description:
      "Plataforma de operaciones en campo. Ejecución, checklists y registro fotográfico.",
    status: "activo",
    dataFlows: [
      "Estado de órdenes",
      "Consumo de materiales",
      "Registro fotográfico",
      "Incidencias",
    ],
    icon: "Smartphone",
    color: "var(--color-brand-accent)",
    href: "/ovi-field",
  },
  {
    id: "ovi-ai",
    name: "OVI AI",
    description:
      "Motor de inteligencia artificial. Diagnóstico, recomendaciones y detección de riesgos.",
    status: "activo",
    dataFlows: [
      "Recomendaciones",
      "Detección de riesgos",
      "Diagnóstico asistido",
      "Análisis predictivo",
    ],
    icon: "Sparkles",
    color: "var(--color-brand-accent)",
    href: "/ovi-ai",
  },
  {
    id: "ovi-analytics",
    name: "OVI Analytics",
    description: "Dashboard ejecutivo. KPIs, tendencias y análisis comparativo.",
    status: "activo",
    dataFlows: ["KPIs operativos", "Indicadores ambientales", "Tendencias", "Reportes ejecutivos"],
    icon: "BarChart3",
    color: "var(--color-brand-primary)",
    href: "/ovi-analytics",
  },
  {
    id: "ovi-lab",
    name: "OVI Lab",
    description: "Laboratorio técnico. Protocolos, diagnósticos y formulaciones.",
    status: "activo",
    dataFlows: [
      "Protocolos activos",
      "Diagnósticos técnicos",
      "Formulaciones",
      "Resultados de laboratorio",
    ],
    icon: "FlaskConical",
    color: "var(--color-brand-accent)",
    href: "/solution-lab",
  },
  {
    id: "ovi-store",
    name: "OVI Store",
    description: "Catálogo técnico. Productos, consumo, reabastecimiento.",
    status: "activo",
    dataFlows: [
      "Catálogo de productos",
      "Historial de compras",
      "Control de consumo",
      "Reabastecimiento",
    ],
    icon: "ShoppingBag",
    color: "var(--color-brand-primary)",
    href: "/store",
  },
];

export interface FutureCapability {
  id: string;
  title: string;
  description: string;
  category: string;
  horizon: "corto" | "medio" | "largo";
  icon: string;
}

export const futureCapabilities: FutureCapability[] = [
  {
    id: "future-001",
    title: "Monitoreo multi-planta en tiempo real",
    description:
      "Visualización simultánea del estado de operaciones en múltiples plantas o instalaciones.",
    category: "Escalabilidad",
    horizon: "corto",
    icon: "Factory",
  },
  {
    id: "future-002",
    title: "Integración con sensores IoT",
    description:
      "Recepción de datos de sensores de temperatura, pH, caudal y presión directamente desde el campo.",
    category: "IoT y conectividad",
    horizon: "corto",
    icon: "Radio",
  },
  {
    id: "future-003",
    title: "Gemelos digitales de activos",
    description:
      "Representación virtual de activos críticos con simulación de estados y predicción de fallos.",
    category: "Tecnología avanzada",
    horizon: "medio",
    icon: "Cpu",
  },
  {
    id: "future-004",
    title: "Operación multiempresa y multipaís",
    description:
      "Soporte para grupos empresariales con múltiples empresas, países y normativas locales.",
    category: "Escalabilidad global",
    horizon: "medio",
    icon: "Globe",
  },
  {
    id: "future-005",
    title: "Dashboard de sostenibilidad ESG",
    description:
      "Indicadores de reporting ESG automáticos para cumplimiento de normativas de sostenibilidad.",
    category: "Sostenibilidad",
    horizon: "medio",
    icon: "Leaf",
  },
  {
    id: "future-006",
    title: "Predicción de demanda con IA generativa",
    description:
      "Proyección de necesidades de servicio, consumo de productos y dotación de personal con IA.",
    category: "IA avanzada",
    horizon: "largo",
    icon: "Brain",
  },
];
