/**
 * OVI Field — Data Models & Demo Data
 * Work Order 010
 *
 * Typed models for all field operation modules:
 * work orders, personnel, dynamic checklists, photo registry,
 * materials, products, equipment, incidents, observations, service closure.
 *
 * Architecture designed for:
 *   - Offline-first sync with OVI OS / OVI Core
 *   - QR / NFC asset tagging
 *   - Geolocation & image recognition (future)
 *   - Voice commands & field AI (future)
 */

// ─── Shared primitives ────────────────────────────────────────────────────────

export type FieldTone = "primary" | "accent" | "warning" | "neutral";

export type WorkOrderStatus =
  "Pendiente" | "Asignada" | "En ejecución" | "En pausa" | "Completada" | "Cerrada";

export type ExecutionPhase =
  | "recepcion"
  | "asignacion"
  | "protocolo"
  | "materiales"
  | "productos"
  | "checklist"
  | "foto_antes"
  | "ejecucion"
  | "foto_despues"
  | "observaciones"
  | "firma"
  | "cierre"
  | "sincronizacion";

export type PhotoStage = "antes" | "durante" | "despues";

export type ChecklistItemStatus = "pendiente" | "ok" | "no_aplica" | "hallazgo";

export type SyncStatus = "synced" | "pending" | "offline" | "error";

// ─── Work Orders ─────────────────────────────────────────────────────────────

export interface WorkOrder {
  code: string;
  title: string;
  client: string;
  site: string;
  serviceType: string;
  status: WorkOrderStatus;
  scheduledFor: string;
  supervisor: string;
  operators: string[];
  protocol: string;
  priority: "Alta" | "Media" | "Normal";
  tone: FieldTone;
  syncStatus: SyncStatus;
}

// ─── Personnel ───────────────────────────────────────────────────────────────

export interface FieldOperator {
  id: string;
  name: string;
  role: "Supervisor" | "Operario" | "Técnico especialista";
  certifications: string[];
  activeOrder: string | null;
  status: "Disponible" | "En servicio" | "En descanso";
}

// ─── Dynamic Checklist ───────────────────────────────────────────────────────

export interface ChecklistItem {
  id: string;
  description: string;
  category: string;
  required: boolean;
  status: ChecklistItemStatus;
  evidence: boolean;
  note?: string;
}

export interface DynamicChecklist {
  id: string;
  protocol: string;
  workOrder: string;
  items: ChecklistItem[];
  generatedFrom: string;
  completionPct: number;
}

// ─── Photo Registry ──────────────────────────────────────────────────────────

export interface PhotoRecord {
  id: string;
  stage: PhotoStage;
  label: string;
  workOrder: string;
  client: string;
  site: string;
  asset: string;
  service: string;
  operator: string;
  date: string;
  time: string;
  syncStatus: SyncStatus;
}

// ─── Materials ───────────────────────────────────────────────────────────────

export interface MaterialRecord {
  code: string;
  name: string;
  category: string;
  quantity: string;
  unit: string;
  workOrder: string;
  status: "Disponible" | "Utilizado" | "Reposición requerida";
}

// ─── Product Consumption ─────────────────────────────────────────────────────

export interface ProductConsumption {
  code: string;
  product: string;
  category: string;
  quantity: string;
  dilution: string;
  workOrder: string;
  operator: string;
  time: string;
}

// ─── Equipment Usage ─────────────────────────────────────────────────────────

export interface EquipmentRecord {
  code: string;
  name: string;
  type: string;
  startTime: string;
  endTime: string;
  duration: string;
  workOrder: string;
  operator: string;
  condition: "Óptimo" | "Mantenimiento requerido" | "Fuera de servicio";
}

// ─── Incidents ───────────────────────────────────────────────────────────────

export interface IncidentRecord {
  code: string;
  type: string;
  severity: "Baja" | "Media" | "Alta" | "Crítica";
  description: string;
  workOrder: string;
  reportedBy: string;
  reportedAt: string;
  status: "Abierta" | "En gestión" | "Resuelta" | "Escalada";
  tone: FieldTone;
}

// ─── Observations ────────────────────────────────────────────────────────────

export interface ObservationRecord {
  id: string;
  workOrder: string;
  phase: string;
  text: string;
  author: string;
  timestamp: string;
  category: "Técnica" | "Seguridad" | "Calidad" | "Cliente" | "Logística";
}

// ─── Service Closure ─────────────────────────────────────────────────────────

export interface ServiceClosure {
  workOrder: string;
  closedBy: string;
  closedAt: string;
  clientSignature: "Obtenida" | "Pendiente" | "No requerida";
  clientContact: string;
  completionNotes: string;
  qualityScore: number;
  syncedToOviOs: boolean;
  syncedToOviCore: boolean;
  photosAttached: number;
  checklistCompletion: number;
}

// ─── Execution Flow Steps ────────────────────────────────────────────────────

export interface ExecutionFlowStep {
  phase: ExecutionPhase;
  label: string;
  description: string;
  module: string;
  status: "completed" | "active" | "pending";
  tone: FieldTone;
}

// ─── Integration records ─────────────────────────────────────────────────────

export interface FieldIntegration {
  platform: string;
  status: string;
  description: string;
  dataFlow: string;
  tone: FieldTone;
}

// ─── Architecture pillars ─────────────────────────────────────────────────────

export interface ArchPillar {
  title: string;
  icon: string;
  items: string[];
}

// ─── Future capabilities ─────────────────────────────────────────────────────

export interface FutureCapability {
  label: string;
  description: string;
  readiness: "Arquitectura lista" | "Interfaz preparada" | "Planificado";
  tone: FieldTone;
}

// ═══════════════════════════════════════════════════════════════════════════════
// DEMO DATA
// ═══════════════════════════════════════════════════════════════════════════════

export const workOrders: WorkOrder[] = [
  {
    code: "OF-2001",
    title: "Limpieza técnica nocturna — Línea 2",
    client: "Alimentos Andinos S.A.",
    site: "Planta Norte · Línea 2",
    serviceType: "Limpieza industrial CIP",
    status: "En ejecución",
    scheduledFor: "15 Jul 2026 · 22:00",
    supervisor: "Laura Medina",
    operators: ["Carlos Pinzón", "Diana Torres"],
    protocol: "PROT-CIP-042",
    priority: "Alta",
    tone: "primary",
    syncStatus: "synced",
  },
  {
    code: "OF-1998",
    title: "Sanitización quirófano central",
    client: "Clínica Horizonte",
    site: "Hospital Central · Quirófano 3",
    serviceType: "Desinfección de alto nivel",
    status: "Asignada",
    scheduledFor: "16 Jul 2026 · 06:00",
    supervisor: "Javier Rojas",
    operators: ["Sofía Ríos"],
    protocol: "PROT-HAN-018",
    priority: "Alta",
    tone: "warning",
    syncStatus: "pending",
  },
  {
    code: "OF-1987",
    title: "Lavado de flota — turno mañana",
    client: "Centro Logístico Sur",
    site: "Bodega Sur · Bahía 4",
    serviceType: "Lavado vehicular especializado",
    status: "Completada",
    scheduledFor: "15 Jul 2026 · 07:00",
    supervisor: "Miguel Vargas",
    operators: ["Andrés Cano", "Paula Nieto", "Rodrigo Soto"],
    protocol: "PROT-LVE-031",
    priority: "Normal",
    tone: "accent",
    syncStatus: "synced",
  },
  {
    code: "OF-1975",
    title: "Auditoría de protocolo GMP",
    client: "Farmacéutica Andina",
    site: "Planta Farma · Sala B",
    serviceType: "Auditoría sanitaria",
    status: "Pendiente",
    scheduledFor: "17 Jul 2026 · 10:00",
    supervisor: "Laura Medina",
    operators: [],
    protocol: "PROT-AUD-009",
    priority: "Media",
    tone: "neutral",
    syncStatus: "offline",
  },
];

export const fieldOperators: FieldOperator[] = [
  {
    id: "OP-101",
    name: "Carlos Pinzón",
    role: "Operario",
    certifications: ["Manejo de químicos", "Trabajo en espacios confinados", "PESV"],
    activeOrder: "OF-2001",
    status: "En servicio",
  },
  {
    id: "OP-102",
    name: "Diana Torres",
    role: "Operario",
    certifications: ["Desinfección industrial", "Alturas"],
    activeOrder: "OF-2001",
    status: "En servicio",
  },
  {
    id: "OP-103",
    name: "Sofía Ríos",
    role: "Técnico especialista",
    certifications: ["Desinfección de alto nivel", "Manejo de residuos hospitalarios", "BPM"],
    activeOrder: "OF-1998",
    status: "En servicio",
  },
  {
    id: "OP-104",
    name: "Andrés Cano",
    role: "Operario",
    certifications: ["Lavado de flota", "PESV"],
    activeOrder: null,
    status: "Disponible",
  },
];

export const dynamicChecklist: DynamicChecklist = {
  id: "CL-2001",
  protocol: "PROT-CIP-042",
  workOrder: "OF-2001",
  generatedFrom: "OVI Core · Protocolo de Limpieza CIP",
  completionPct: 72,
  items: [
    {
      id: "CI-001",
      description: "Verificar EPP completo del operario",
      category: "Seguridad",
      required: true,
      status: "ok",
      evidence: false,
    },
    {
      id: "CI-002",
      description: "Confirmar isolamiento eléctrico de la línea",
      category: "Seguridad",
      required: true,
      status: "ok",
      evidence: true,
    },
    {
      id: "CI-003",
      description: "Pre-enjuague con agua a 40°C por 5 min",
      category: "Ejecución",
      required: true,
      status: "ok",
      evidence: false,
    },
    {
      id: "CI-004",
      description: "Aplicación de detergente alcalino (2% v/v)",
      category: "Ejecución",
      required: true,
      status: "ok",
      evidence: false,
    },
    {
      id: "CI-005",
      description: "Circulación CIP · mínimo 15 min",
      category: "Ejecución",
      required: true,
      status: "ok",
      evidence: true,
    },
    {
      id: "CI-006",
      description: "Enjuague intermedio verificado",
      category: "Ejecución",
      required: true,
      status: "pendiente",
      evidence: false,
    },
    {
      id: "CI-007",
      description: "Aplicación desinfectante (concentración validada)",
      category: "Ejecución",
      required: true,
      status: "pendiente",
      evidence: false,
    },
    {
      id: "CI-008",
      description: "Enjuague final con agua potable certificada",
      category: "Ejecución",
      required: true,
      status: "pendiente",
      evidence: true,
    },
    {
      id: "CI-009",
      description: "Test ATP en zonas críticas",
      category: "Validación",
      required: true,
      status: "pendiente",
      evidence: true,
    },
    {
      id: "CI-010",
      description: "Inspección visual de residuos",
      category: "Validación",
      required: true,
      status: "pendiente",
      evidence: false,
    },
    {
      id: "CI-011",
      description: "Liberación de zona y restablecimiento eléctrico",
      category: "Cierre",
      required: true,
      status: "pendiente",
      evidence: false,
    },
  ],
};

export const photoRecords: PhotoRecord[] = [
  {
    id: "FT-001",
    stage: "antes",
    label: "Estado inicial Línea 2 · zona de llenado",
    workOrder: "OF-2001",
    client: "Alimentos Andinos S.A.",
    site: "Planta Norte",
    asset: "Línea 2 · Zona llenado",
    service: "Limpieza industrial CIP",
    operator: "Carlos Pinzón",
    date: "15 Jul 2026",
    time: "22:08",
    syncStatus: "synced",
  },
  {
    id: "FT-002",
    stage: "antes",
    label: "Estado inicial Línea 2 · zona de sellado",
    workOrder: "OF-2001",
    client: "Alimentos Andinos S.A.",
    site: "Planta Norte",
    asset: "Línea 2 · Zona sellado",
    service: "Limpieza industrial CIP",
    operator: "Diana Torres",
    date: "15 Jul 2026",
    time: "22:10",
    syncStatus: "synced",
  },
  {
    id: "FT-003",
    stage: "durante",
    label: "Circulación CIP en progreso",
    workOrder: "OF-2001",
    client: "Alimentos Andinos S.A.",
    site: "Planta Norte",
    asset: "Línea 2 · Sistema CIP",
    service: "Limpieza industrial CIP",
    operator: "Carlos Pinzón",
    date: "15 Jul 2026",
    time: "22:45",
    syncStatus: "pending",
  },
];

export const materialRecords: MaterialRecord[] = [
  {
    code: "MAT-041",
    name: "Detergente alcalino OVI CIP-420",
    category: "Químico limpieza",
    quantity: "15",
    unit: "L",
    workOrder: "OF-2001",
    status: "Utilizado",
  },
  {
    code: "MAT-042",
    name: "Desinfectante OVI BioSan Surface",
    category: "Desinfectante",
    quantity: "8",
    unit: "L",
    workOrder: "OF-2001",
    status: "Disponible",
  },
  {
    code: "MAT-043",
    name: "Paños microfibra grado alimentario",
    category: "Material absorbente",
    quantity: "24",
    unit: "und",
    workOrder: "OF-2001",
    status: "Utilizado",
  },
  {
    code: "MAT-044",
    name: "Kit tiras ATP",
    category: "Insumo de validación",
    quantity: "10",
    unit: "und",
    workOrder: "OF-2001",
    status: "Reposición requerida",
  },
];

export const productConsumptions: ProductConsumption[] = [
  {
    code: "PC-101",
    product: "OVI CIP-420 Alcalino",
    category: "Detergente CIP",
    quantity: "15 L",
    dilution: "2% v/v",
    workOrder: "OF-2001",
    operator: "Carlos Pinzón",
    time: "22:35",
  },
  {
    code: "PC-102",
    product: "OVI BioSan Surface",
    category: "Desinfectante",
    quantity: "8 L",
    dilution: "0.5% v/v",
    workOrder: "OF-2001",
    operator: "Diana Torres",
    time: "23:15",
  },
];

export const equipmentRecords: EquipmentRecord[] = [
  {
    code: "EQ-301",
    name: "Unidad CIP móvil OVI-M2",
    type: "Sistema CIP",
    startTime: "22:20",
    endTime: "23:30",
    duration: "1h 10min",
    workOrder: "OF-2001",
    operator: "Carlos Pinzón",
    condition: "Óptimo",
  },
  {
    code: "EQ-302",
    name: "Bomba de alta presión HP-400",
    type: "Equipo de presión",
    startTime: "22:15",
    endTime: "22:50",
    duration: "35 min",
    workOrder: "OF-2001",
    operator: "Diana Torres",
    condition: "Óptimo",
  },
  {
    code: "EQ-303",
    name: "Luminómetro ATP LM-7000",
    type: "Equipo de validación",
    startTime: "—",
    endTime: "—",
    duration: "—",
    workOrder: "OF-2001",
    operator: "Carlos Pinzón",
    condition: "Mantenimiento requerido",
  },
];

export const incidentRecords: IncidentRecord[] = [
  {
    code: "INC-201",
    type: "Condición de superficie",
    severity: "Media",
    description:
      "Se detectó deterioro en el recubrimiento del tanque T-02. Se registró evidencia fotográfica y se notificó al supervisor.",
    workOrder: "OF-2001",
    reportedBy: "Carlos Pinzón",
    reportedAt: "15 Jul 2026 · 22:55",
    status: "En gestión",
    tone: "warning",
  },
  {
    code: "INC-198",
    type: "Equipo",
    severity: "Baja",
    description:
      "Luminómetro ATP presentó falla de calibración. Se requiere mantenimiento preventivo.",
    workOrder: "OF-2001",
    reportedBy: "Diana Torres",
    reportedAt: "15 Jul 2026 · 23:10",
    status: "Abierta",
    tone: "warning",
  },
];

export const observationRecords: ObservationRecord[] = [
  {
    id: "OBS-401",
    workOrder: "OF-2001",
    phase: "Ejecución",
    text: "La temperatura del agua en el pre-enjuague llegó a 42°C. Dentro del rango del protocolo.",
    author: "Carlos Pinzón",
    timestamp: "22:40",
    category: "Técnica",
  },
  {
    id: "OBS-402",
    workOrder: "OF-2001",
    phase: "Ejecución",
    text: "El cliente solicitó ampliar la zona de limpieza al área de empaque adyacente. Se notificó al supervisor para aprobación.",
    author: "Diana Torres",
    timestamp: "23:05",
    category: "Cliente",
  },
  {
    id: "OBS-403",
    workOrder: "OF-2001",
    phase: "Seguridad",
    text: "Piso húmedo señalizado correctamente durante toda la ejecución.",
    author: "Laura Medina",
    timestamp: "22:30",
    category: "Seguridad",
  },
];

export const serviceClosure: ServiceClosure = {
  workOrder: "OF-1987",
  closedBy: "Miguel Vargas",
  closedAt: "15 Jul 2026 · 10:45",
  clientSignature: "Obtenida",
  clientContact: "Gerente de operaciones · Centro Logístico Sur",
  completionNotes:
    "Servicio completado en tiempo y forma. 12 vehículos lavados. Sin incidencias críticas. El cliente validó el protocolo y firmó el acta de cierre.",
  qualityScore: 96,
  syncedToOviOs: true,
  syncedToOviCore: true,
  photosAttached: 8,
  checklistCompletion: 100,
};

// ─── Execution flow ───────────────────────────────────────────────────────────

export const executionFlow: ExecutionFlowStep[] = [
  {
    phase: "recepcion",
    label: "Recepción de orden",
    description: "El operario recibe la orden de trabajo asignada desde OVI Core.",
    module: "Órdenes de trabajo",
    status: "completed",
    tone: "accent",
  },
  {
    phase: "asignacion",
    label: "Asignación de personal",
    description: "El supervisor asigna operarios y confirma disponibilidad y certificaciones.",
    module: "Personal de campo",
    status: "completed",
    tone: "accent",
  },
  {
    phase: "protocolo",
    label: "Visualización del protocolo",
    description: "El operario consulta el protocolo técnico generado por OVI Core.",
    module: "Protocolos dinámicos",
    status: "completed",
    tone: "accent",
  },
  {
    phase: "materiales",
    label: "Lista de materiales",
    description: "Verificación de materiales disponibles según el protocolo.",
    module: "Materiales",
    status: "completed",
    tone: "accent",
  },
  {
    phase: "productos",
    label: "Lista de productos",
    description: "Confirmación de productos, concentraciones y diluciones.",
    module: "Productos consumidos",
    status: "completed",
    tone: "accent",
  },
  {
    phase: "checklist",
    label: "Checklist",
    description: "Ejecución del checklist dinámico generado desde OVI Core.",
    module: "Checklists dinámicos",
    status: "active",
    tone: "primary",
  },
  {
    phase: "foto_antes",
    label: "Fotografía antes",
    description: "Registro fotográfico del estado previo al servicio.",
    module: "Registro fotográfico",
    status: "completed",
    tone: "accent",
  },
  {
    phase: "ejecucion",
    label: "Ejecución",
    description: "Desarrollo del servicio según protocolo técnico.",
    module: "Ejecución en campo",
    status: "active",
    tone: "primary",
  },
  {
    phase: "foto_despues",
    label: "Fotografía después",
    description: "Registro fotográfico del resultado final del servicio.",
    module: "Registro fotográfico",
    status: "pending",
    tone: "neutral",
  },
  {
    phase: "observaciones",
    label: "Observaciones",
    description: "Registro de novedades, hallazgos y observaciones del servicio.",
    module: "Observaciones",
    status: "pending",
    tone: "neutral",
  },
  {
    phase: "firma",
    label: "Firma del cliente",
    description: "Obtención de firma digital del responsable del cliente.",
    module: "Firmas digitales",
    status: "pending",
    tone: "neutral",
  },
  {
    phase: "cierre",
    label: "Cierre",
    description: "Generación del acta de cierre y validación del servicio.",
    module: "Cierre de servicio",
    status: "pending",
    tone: "neutral",
  },
  {
    phase: "sincronizacion",
    label: "Sincronización con OVI OS",
    description: "Envío de toda la evidencia a OVI OS, OVI Core y el cliente.",
    module: "Sincronización",
    status: "pending",
    tone: "neutral",
  },
];

// ─── Integrations ─────────────────────────────────────────────────────────────

export const fieldIntegrations: FieldIntegration[] = [
  {
    platform: "OVI Core",
    status: "Fuente de datos",
    description:
      "Origen de órdenes de trabajo, protocolos dinámicos, checklists, personal y clientes.",
    dataFlow: "Bidireccional — recibe órdenes y envía evidencias, cierres y consumos.",
    tone: "primary",
  },
  {
    platform: "OVI OS",
    status: "Destino de evidencias",
    description:
      "Plataforma del cliente donde se sincronizan fotografías, actas, checklists y firmas.",
    dataFlow: "OVI Field → OVI OS en cierre o al recuperar conectividad (modo offline).",
    tone: "accent",
  },
  {
    platform: "OVI AI",
    status: "Preparado",
    description:
      "Reconocimiento de imágenes en campo, recomendaciones en tiempo real e IA operativa.",
    dataFlow: "Módulo de cámara OVI Field → OVI AI → sugerencias al operario.",
    tone: "neutral",
  },
  {
    platform: "OVI Lab",
    status: "Preparado",
    description: "Recepción de resultados de validación microbiológica y de ATP en campo.",
    dataFlow: "OVI Lab → OVI Field (resultados test) → OVI OS (trazabilidad).",
    tone: "neutral",
  },
];

// ─── Architecture pillars ─────────────────────────────────────────────────────

export const archPillars: ArchPillar[] = [
  {
    title: "Modularidad",
    icon: "⬡",
    items: [
      "Cada módulo es independiente",
      "Crecimiento incremental",
      "Compatible con OVI OS y OVI Core",
    ],
  },
  {
    title: "Modo offline",
    icon: "⟳",
    items: [
      "Operación sin conexión completa",
      "Cola de sincronización automática",
      "Resolución de conflictos al reconectar",
    ],
  },
  {
    title: "Compatibilidad móvil",
    icon: "▣",
    items: [
      "Diseño responsive Web / Tablet / App",
      "Captura de cámara nativa",
      "Notificaciones push preparadas",
    ],
  },
  {
    title: "Trazabilidad total",
    icon: "◈",
    items: [
      "Cada acción queda registrada",
      "Vinculada a proyecto, cliente y activo",
      "Auditable y exportable",
    ],
  },
];

// ─── Future capabilities ──────────────────────────────────────────────────────

export const futureCapabilities: FutureCapability[] = [
  {
    label: "QR en activos",
    description: "Identificación de equipos, zonas y activos mediante códigos QR.",
    readiness: "Arquitectura lista",
    tone: "accent",
  },
  {
    label: "NFC",
    description: "Lectores NFC para registro automático de herramientas y materiales.",
    readiness: "Arquitectura lista",
    tone: "accent",
  },
  {
    label: "Geolocalización",
    description: "Registro de ubicación GPS en cada evento de campo.",
    readiness: "Interfaz preparada",
    tone: "primary",
  },
  {
    label: "Reconocimiento de imágenes",
    description: "OVI AI analiza fotografías de campo para detectar hallazgos automáticamente.",
    readiness: "Planificado",
    tone: "neutral",
  },
  {
    label: "Comandos por voz",
    description: "Registro de observaciones y avance de checklist mediante voz.",
    readiness: "Planificado",
    tone: "neutral",
  },
  {
    label: "IA en campo",
    description: "Asistente inteligente contextual para el operario durante la ejecución.",
    readiness: "Planificado",
    tone: "neutral",
  },
  {
    label: "Notificaciones en tiempo real",
    description: "Alertas push a supervisores ante incidencias, retrasos o hallazgos críticos.",
    readiness: "Interfaz preparada",
    tone: "primary",
  },
];
