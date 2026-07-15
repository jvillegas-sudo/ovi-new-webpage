/**
 * OVI OPS — Data Models & Demo Data
 * Work Order 010 — Digital Operations Platform
 *
 * Typed models for all OVI OPS operational modules:
 * Clients, Projects, Contracts, Assets, Locations, Teams, Personnel,
 * Products, Protocols, Evidence, Quality Control, Work Orders, Execution.
 *
 * Architecture designed for:
 *   - Automatic transformation of diagnoses into operational projects
 *   - Multi-company, multi-country support
 *   - Mobile-first / offline-first sync with OVI Field
 *   - Integration with OVI AI, OVI Lab, OVI Store, OVI Analytics
 *   - Future: ERP & CRM integration, digital twins, IoT
 */

// ─── Shared primitives ────────────────────────────────────────────────────────

export type OpsTone = "primary" | "accent" | "warning" | "danger" | "eco" | "neutral";

export type OpsStatus =
  "Activo" | "En progreso" | "Pendiente" | "Completado" | "Cerrado" | "Suspendido" | "Borrador";

export type ProjectStatus =
  | "Diagnóstico"
  | "Aprobado"
  | "Planificación"
  | "En ejecución"
  | "Control de calidad"
  | "Entrega"
  | "Completado"
  | "Suspendido";

export type WorkOrderStatus =
  "Borrador" | "Pendiente" | "Asignada" | "En ejecución" | "En pausa" | "Completada" | "Cerrada";

export type ExecutionStatus =
  "no_iniciada" | "iniciada" | "en_pausa" | "finalizada" | "con_incidencias";

export type EvidenceType =
  "fotografia" | "video" | "documento" | "checklist" | "firma" | "geolocalizacion";

export type QualityResult = "Aprobado" | "Aprobado con observaciones" | "Rechazado" | "Pendiente";

export type ContractType =
  "Servicio único" | "Mantenimiento periódico" | "Marco anual" | "Proyecto";

export type Priority = "Alta" | "Media" | "Normal" | "Urgente";

export type Industry =
  | "Manufactura"
  | "Logística y transporte"
  | "Construcción e infraestructura"
  | "Alimentario"
  | "Farmacéutico"
  | "Hospitalario"
  | "Oficinas corporativas"
  | "Retail y comercio"
  | "Minería"
  | "Energía"
  | "Gobierno";

// ─── Clients ──────────────────────────────────────────────────────────────────

export interface OpsClient {
  id: string;
  name: string;
  legalName: string;
  industry: Industry;
  country: string;
  city: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  activeProjects: number;
  totalServices: number;
  status: OpsStatus;
  since: string;
  tone: OpsTone;
}

export const opsClients: OpsClient[] = [
  {
    id: "CLI-001",
    name: "Grupo Logístico del Norte",
    legalName: "GLN S.A. de C.V.",
    industry: "Logística y transporte",
    country: "México",
    city: "Monterrey",
    contactName: "Ing. Roberto Salinas",
    contactEmail: "rsalinas@gln.com.mx",
    contactPhone: "+52 81 4567 8901",
    activeProjects: 2,
    totalServices: 34,
    status: "Activo",
    since: "2022-03",
    tone: "primary",
  },
  {
    id: "CLI-002",
    name: "Industrias Farmacéuticas Sigma",
    legalName: "IFS S.A.B. de C.V.",
    industry: "Farmacéutico",
    country: "México",
    city: "Ciudad de México",
    contactName: "Dra. Alejandra Vega",
    contactEmail: "avega@sigma.com.mx",
    contactPhone: "+52 55 3344 5566",
    activeProjects: 1,
    totalServices: 18,
    status: "Activo",
    since: "2023-07",
    tone: "accent",
  },
  {
    id: "CLI-003",
    name: "Constructora Horizonte",
    legalName: "Horizonte Construcciones S.A.",
    industry: "Construcción e infraestructura",
    country: "México",
    city: "Guadalajara",
    contactName: "Arq. Carlos Mendez",
    contactEmail: "cmendez@horizonte.mx",
    contactPhone: "+52 33 7788 9900",
    activeProjects: 3,
    totalServices: 51,
    status: "Activo",
    since: "2021-11",
    tone: "neutral",
  },
  {
    id: "CLI-004",
    name: "Planta Procesadora La Hacienda",
    legalName: "Alimentos La Hacienda S.A.",
    industry: "Alimentario",
    country: "México",
    city: "Querétaro",
    contactName: "Lic. Martha García",
    contactEmail: "mgarcia@lahacienda.com.mx",
    contactPhone: "+52 44 2200 1100",
    activeProjects: 1,
    totalServices: 12,
    status: "Activo",
    since: "2024-01",
    tone: "eco",
  },
];

// ─── Locations ────────────────────────────────────────────────────────────────

export interface OpsLocation {
  id: string;
  clientId: string;
  name: string;
  type: "Planta industrial" | "Almacén" | "Oficinas" | "Flotilla" | "Instalación especial";
  address: string;
  city: string;
  country: string;
  area: string; // m²
  accessInstructions: string;
  coordinates?: { lat: number; lng: number };
}

export const opsLocations: OpsLocation[] = [
  {
    id: "LOC-001",
    clientId: "CLI-001",
    name: "Centro de Distribución Norte",
    type: "Almacén",
    address: "Av. Industrial 4500, Parque Logístico Norte",
    city: "Monterrey",
    country: "México",
    area: "12,400 m²",
    accessInstructions: "Acceso por puerta principal. Solicitar permiso a seguridad.",
    coordinates: { lat: 25.6866, lng: -100.3161 },
  },
  {
    id: "LOC-002",
    clientId: "CLI-001",
    name: "Flotilla Camiones Región NE",
    type: "Flotilla",
    address: "Patio Logístico Norte, Zona Industrial",
    city: "Monterrey",
    country: "México",
    area: "8,200 m²",
    accessInstructions: "Coordinación directa con jefe de patio: Ext. 230.",
  },
  {
    id: "LOC-003",
    clientId: "CLI-002",
    name: "Planta Farmacéutica CDMX",
    type: "Planta industrial",
    address: "Blvd. Farmacéutico 220, Parque Industrial Vallejo",
    city: "Ciudad de México",
    country: "México",
    area: "6,800 m²",
    accessInstructions: "Protocolo de ingreso: EPP completo, área blanca, autorización nivel 3.",
    coordinates: { lat: 19.4762, lng: -99.1554 },
  },
  {
    id: "LOC-004",
    clientId: "CLI-003",
    name: "Obra Torres Milenio — Fase 2",
    type: "Instalación especial",
    address: "Av. Patria s/n, Zapopan",
    city: "Guadalajara",
    country: "México",
    area: "22,000 m²",
    accessInstructions: "Post-obra. Coordinación con residente de obra: Ext. 104.",
  },
];

// ─── Assets ───────────────────────────────────────────────────────────────────

export interface OpsAsset {
  id: string;
  clientId: string;
  locationId: string;
  name: string;
  type: "Vehículo" | "Maquinaria" | "Instalación" | "Superficie" | "Contenedor" | "Equipo";
  code: string;
  brand?: string;
  model?: string;
  serialNumber?: string;
  lastServiceDate: string;
  nextServiceDate: string;
  status: "Activo" | "En servicio" | "Fuera de servicio";
  contamination: string;
  priority: Priority;
  tone: OpsTone;
}

export const opsAssets: OpsAsset[] = [
  {
    id: "ACT-001",
    clientId: "CLI-001",
    locationId: "LOC-002",
    name: "Tractocamión Freightliner #GL-412",
    type: "Vehículo",
    code: "GL-412",
    brand: "Freightliner",
    model: "Cascadia 2022",
    serialNumber: "1FUJGLDR7DLBT3412",
    lastServiceDate: "2025-05-10",
    nextServiceDate: "2025-08-10",
    status: "Activo",
    contamination: "Grasa mineral, polvo vial, residuos orgánicos",
    priority: "Alta",
    tone: "primary",
  },
  {
    id: "ACT-002",
    clientId: "CLI-002",
    locationId: "LOC-003",
    name: "Área de Manufactura Estéril — Sala B",
    type: "Instalación",
    code: "IFS-SALA-B",
    lastServiceDate: "2025-06-01",
    nextServiceDate: "2025-07-01",
    status: "Activo",
    contamination: "Partículas biomédicas, aerosoles, contaminación microbiológica",
    priority: "Urgente",
    tone: "warning",
  },
  {
    id: "ACT-003",
    clientId: "CLI-003",
    locationId: "LOC-004",
    name: "Fachada Torres Milenio — Bloques A y B",
    type: "Superficie",
    code: "HTM-FAC-AB",
    lastServiceDate: "2025-04-20",
    nextServiceDate: "2025-07-20",
    status: "Activo",
    contamination: "Cemento, pintura, sellador, polvo de obra",
    priority: "Alta",
    tone: "neutral",
  },
  {
    id: "ACT-004",
    clientId: "CLI-004",
    locationId: "LOC-001",
    name: "Tanques de Almacenamiento TK-07 al TK-12",
    type: "Contenedor",
    code: "LH-TK-07-12",
    lastServiceDate: "2025-03-15",
    nextServiceDate: "2025-09-15",
    status: "Activo",
    contamination: "Depósitos orgánicos, biofilm, residuos de procesamiento",
    priority: "Media",
    tone: "eco",
  },
];

// ─── Projects ─────────────────────────────────────────────────────────────────

export interface OpsProject {
  id: string;
  clientId: string;
  locationId: string;
  assetId?: string;
  name: string;
  industry: Industry;
  diagnosticId?: string;
  objective: string;
  status: ProjectStatus;
  startDate: string;
  endDate: string;
  responsible: string;
  workOrders: number;
  completedOrders: number;
  tone: OpsTone;
  description: string;
}

export const opsProjects: OpsProject[] = [
  {
    id: "PRY-001",
    clientId: "CLI-001",
    locationId: "LOC-002",
    assetId: "ACT-001",
    name: "Desengrasado y tratamiento de flotilla — Q3 2025",
    industry: "Logística y transporte",
    diagnosticId: "DIAG-0045",
    objective:
      "Reducir el índice de corrosión en chasis y cabinas de la flotilla mediante protocolo de desengrasado industrial con productos biodegradables.",
    status: "En ejecución",
    startDate: "2025-07-01",
    endDate: "2025-07-31",
    responsible: "Ing. Marcelo Torres",
    workOrders: 8,
    completedOrders: 3,
    tone: "primary",
    description:
      "Servicio integral de limpieza y tratamiento anticorrosivo para flotilla de 48 unidades.",
  },
  {
    id: "PRY-002",
    clientId: "CLI-002",
    locationId: "LOC-003",
    assetId: "ACT-002",
    name: "Sanitización de área blanca — Ciclo mensual",
    industry: "Farmacéutico",
    diagnosticId: "DIAG-0052",
    objective:
      "Mantener los niveles de esterilidad en Sala B conforme a Normativa ISO 14644 y NOM-059-SSA1.",
    status: "En ejecución",
    startDate: "2025-07-01",
    endDate: "2025-07-30",
    responsible: "Q.F.B. Sandra Rivas",
    workOrders: 4,
    completedOrders: 2,
    tone: "warning",
    description: "Sanitización de alto nivel en área farmacéutica controlada. Protocolo estéril.",
  },
  {
    id: "PRY-003",
    clientId: "CLI-003",
    locationId: "LOC-004",
    assetId: "ACT-003",
    name: "Limpieza post-obra — Torres Milenio Fase 2",
    industry: "Construcción e infraestructura",
    diagnosticId: "DIAG-0038",
    objective:
      "Limpieza integral post-construcción de 22,000 m² incluyendo remoción de residuos de obra, tratamiento de fachadas y entrega de espacios aptos para ocupación.",
    status: "Planificación",
    startDate: "2025-08-01",
    endDate: "2025-10-31",
    responsible: "Ing. Héctor Morales",
    workOrders: 15,
    completedOrders: 0,
    tone: "neutral",
    description:
      "Proyecto de gran escala. Requiere coordinación con residencia de obra y cuadrilla ampliada.",
  },
  {
    id: "PRY-004",
    clientId: "CLI-004",
    locationId: "LOC-001",
    assetId: "ACT-004",
    name: "Limpieza profunda de tanques — Planta Querétaro",
    industry: "Alimentario",
    diagnosticId: "DIAG-0061",
    objective:
      "Eliminación de biofilm y depósitos orgánicos en 6 tanques de almacenamiento con producto aprobado para contacto alimentario.",
    status: "Aprobado",
    startDate: "2025-08-15",
    endDate: "2025-08-20",
    responsible: "Ing. Patricia Leal",
    workOrders: 6,
    completedOrders: 0,
    tone: "eco",
    description:
      "Limpieza CIP-compatible con producto de grado alimentario. Requiere parada de producción.",
  },
];

// ─── Contracts ────────────────────────────────────────────────────────────────

export interface OpsContract {
  id: string;
  clientId: string;
  projectId?: string;
  name: string;
  type: ContractType;
  value: string;
  currency: string;
  startDate: string;
  endDate: string;
  status: OpsStatus;
  services: string[];
  renewalAlert: boolean;
  tone: OpsTone;
}

export const opsContracts: OpsContract[] = [
  {
    id: "CON-001",
    clientId: "CLI-001",
    projectId: "PRY-001",
    name: "Contrato Marco — Mantenimiento de Flotilla 2025",
    type: "Marco anual",
    value: "480,000",
    currency: "MXN",
    startDate: "2025-01-01",
    endDate: "2025-12-31",
    status: "Activo",
    services: ["Desengrasado industrial", "Lavado de flota", "Tratamiento anticorrosivo"],
    renewalAlert: false,
    tone: "primary",
  },
  {
    id: "CON-002",
    clientId: "CLI-002",
    projectId: "PRY-002",
    name: "Servicio de Sanitización Farmacéutica Mensual",
    type: "Mantenimiento periódico",
    value: "96,000",
    currency: "MXN",
    startDate: "2025-01-01",
    endDate: "2025-12-31",
    status: "Activo",
    services: [
      "Sanitización de alto nivel",
      "Desinfección de superficies",
      "Control microbiológico",
    ],
    renewalAlert: false,
    tone: "accent",
  },
  {
    id: "CON-003",
    clientId: "CLI-003",
    projectId: "PRY-003",
    name: "Limpieza Post-obra — Torres Milenio Fase 2",
    type: "Proyecto",
    value: "1,250,000",
    currency: "MXN",
    startDate: "2025-08-01",
    endDate: "2025-10-31",
    status: "Borrador",
    services: ["Limpieza post-construcción", "Tratamiento de fachadas", "Entrega de espacios"],
    renewalAlert: false,
    tone: "neutral",
  },
  {
    id: "CON-004",
    clientId: "CLI-004",
    projectId: "PRY-004",
    name: "Limpieza de Tanques — Planta Querétaro 2025",
    type: "Servicio único",
    value: "68,000",
    currency: "MXN",
    startDate: "2025-08-15",
    endDate: "2025-08-20",
    status: "Pendiente",
    services: ["Limpieza CIP de tanques", "Desinfección grado alimentario"],
    renewalAlert: false,
    tone: "eco",
  },
];

// ─── Teams ────────────────────────────────────────────────────────────────────

export interface OpsTeam {
  id: string;
  name: string;
  specialty:
    | "Flotillas y transporte"
    | "Industria farmacéutica"
    | "Post-obra y construcción"
    | "Alimentario e industrial"
    | "General";
  leader: string;
  members: number;
  activeOrders: number;
  zone: string;
  availability: "Disponible" | "Asignado" | "En descanso";
  tone: OpsTone;
}

export const opsTeams: OpsTeam[] = [
  {
    id: "EQP-001",
    name: "Equipo Alpha — Flotillas NE",
    specialty: "Flotillas y transporte",
    leader: "Supervisor: T. Flores",
    members: 6,
    activeOrders: 3,
    zone: "Noreste",
    availability: "Asignado",
    tone: "primary",
  },
  {
    id: "EQP-002",
    name: "Equipo Beta — Estéril",
    specialty: "Industria farmacéutica",
    leader: "Supervisor: Q.F.B. Rivas",
    members: 4,
    activeOrders: 2,
    zone: "CDMX",
    availability: "Asignado",
    tone: "warning",
  },
  {
    id: "EQP-003",
    name: "Equipo Gamma — Post-obra",
    specialty: "Post-obra y construcción",
    leader: "Supervisor: Ing. Ortega",
    members: 10,
    activeOrders: 0,
    zone: "Occidente",
    availability: "Disponible",
    tone: "neutral",
  },
  {
    id: "EQP-004",
    name: "Equipo Delta — Alimentaria",
    specialty: "Alimentario e industrial",
    leader: "Supervisor: T. Navarro",
    members: 5,
    activeOrders: 0,
    zone: "Centro",
    availability: "Disponible",
    tone: "eco",
  },
];

// ─── Personnel ────────────────────────────────────────────────────────────────

export interface OpsPersonnel {
  id: string;
  teamId: string;
  name: string;
  role: "Supervisor" | "Técnico especialista" | "Operario" | "Inspector de calidad";
  certifications: string[];
  currentProject: string | null;
  status: "Disponible" | "En servicio" | "En descanso" | "Fuera de turno";
  tone: OpsTone;
}

export const opsPersonnel: OpsPersonnel[] = [
  {
    id: "PER-001",
    teamId: "EQP-001",
    name: "Tomás Flores",
    role: "Supervisor",
    certifications: ["Seguridad industrial", "Manejo de químicos", "Primeros auxilios"],
    currentProject: "PRY-001",
    status: "En servicio",
    tone: "primary",
  },
  {
    id: "PER-002",
    teamId: "EQP-001",
    name: "Andrés Gutiérrez",
    role: "Técnico especialista",
    certifications: ["Desengrasado industrial", "Equipo de presión"],
    currentProject: "PRY-001",
    status: "En servicio",
    tone: "primary",
  },
  {
    id: "PER-003",
    teamId: "EQP-002",
    name: "Sandra Rivas",
    role: "Supervisor",
    certifications: ["Área blanca farmacéutica", "ISO 14644", "Microbiología aplicada"],
    currentProject: "PRY-002",
    status: "En servicio",
    tone: "warning",
  },
  {
    id: "PER-004",
    teamId: "EQP-003",
    name: "Rafael Ortega",
    role: "Supervisor",
    certifications: ["Trabajo en altura", "Post-obra", "Tratamiento de fachadas"],
    currentProject: null,
    status: "Disponible",
    tone: "neutral",
  },
  {
    id: "PER-005",
    teamId: "EQP-004",
    name: "Teresa Navarro",
    role: "Supervisor",
    certifications: ["Inocuidad alimentaria", "HACCP", "Limpieza CIP"],
    currentProject: null,
    status: "Disponible",
    tone: "eco",
  },
];

// ─── Work Orders ──────────────────────────────────────────────────────────────

export interface OpsWorkOrder {
  id: string;
  projectId: string;
  service: string;
  protocol: string;
  products: string[];
  tools: string[];
  equipment: string[];
  personnel: string[];
  estimatedTime: string;
  priority: Priority;
  status: WorkOrderStatus;
  scheduledDate: string;
  observations: string;
  tone: OpsTone;
}

export const opsWorkOrders: OpsWorkOrder[] = [
  {
    id: "OT-2025-0081",
    projectId: "PRY-001",
    service: "Desengrasado profundo de chasis — Lote A (12 unidades)",
    protocol: "PROT-DES-001 — Desengrasado Industrial con Agente Biodegradable",
    products: ["OVI DegreMax Pro", "OVI NeutroBase", "OVI ProtectShield"],
    tools: ["Pistola de alta presión", "Cepillos industriales", "Equipo de atomización"],
    equipment: ["Hidrolavadora 3000 PSI", "Compresor 200L", "Bidones de mezcla 50L"],
    personnel: ["PER-001", "PER-002", "PER-006"],
    estimatedTime: "6 horas",
    priority: "Alta",
    status: "En ejecución",
    scheduledDate: "2025-07-15",
    observations: "Tener precaución con sensores de estabilidad en cabinas.",
    tone: "primary",
  },
  {
    id: "OT-2025-0082",
    projectId: "PRY-002",
    service: "Sanitización Sala B — Ciclo mensual Julio",
    protocol: "PROT-SAN-007 — Sanitización de Área Blanca ISO Clase 7",
    products: ["OVI SterileClean Plus", "OVI IsoGuard", "OVI FinalRinse"],
    tools: ["Mopas estériles", "Cubetas codificadas por color", "Atomizador HEPA"],
    equipment: ["Nebulizador ultrasónico", "Medidor de partículas"],
    personnel: ["PER-003", "PER-007"],
    estimatedTime: "4 horas",
    priority: "Urgente",
    status: "Asignada",
    scheduledDate: "2025-07-16",
    observations:
      "Requiere zona de exclusión durante nebulización. Tiempo de contacto mínimo 30 min.",
    tone: "warning",
  },
  {
    id: "OT-2025-0083",
    projectId: "PRY-001",
    service: "Lavado exterior de cabinas — Lote A",
    protocol: "PROT-LAV-002 — Lavado de Flota con Shampú Biodegradable",
    products: ["OVI FleetWash", "OVI BrightFinish"],
    tools: ["Esponjas de microfibra", "Aspiradora industrial"],
    equipment: ["Hidrolavadora 1500 PSI"],
    personnel: ["PER-002", "PER-008"],
    estimatedTime: "3 horas",
    priority: "Normal",
    status: "Pendiente",
    scheduledDate: "2025-07-17",
    observations: "",
    tone: "primary",
  },
  {
    id: "OT-2025-0084",
    projectId: "PRY-004",
    service: "Limpieza CIP — Tanques TK-07 al TK-09",
    protocol: "PROT-CIP-003 — Clean-In-Place para Tanques Alimentarios",
    products: ["OVI FoodSafe CIP", "OVI SaniRinse"],
    tools: ["Cabezal rotativo CIP", "Sondas de temperatura"],
    equipment: ["Bomba de recirculación", "Calentador de proceso"],
    personnel: ["PER-005", "PER-009"],
    estimatedTime: "8 horas",
    priority: "Alta",
    status: "Borrador",
    scheduledDate: "2025-08-15",
    observations: "Parada de producción requerida. Coordinar con planta 48 h antes.",
    tone: "eco",
  },
];

// ─── Protocols ────────────────────────────────────────────────────────────────

export interface OpsProtocol {
  id: string;
  name: string;
  industry: Industry;
  category: string;
  steps: number;
  duration: string;
  certifications: string[];
  status: "Vigente" | "En revisión" | "Obsoleto";
  tone: OpsTone;
}

export const opsProtocols: OpsProtocol[] = [
  {
    id: "PROT-DES-001",
    name: "Desengrasado Industrial con Agente Biodegradable",
    industry: "Logística y transporte",
    category: "Desengrasado",
    steps: 8,
    duration: "4–8 horas",
    certifications: ["NOM-052-SEMARNAT", "ISO 14001"],
    status: "Vigente",
    tone: "primary",
  },
  {
    id: "PROT-SAN-007",
    name: "Sanitización de Área Blanca ISO Clase 7",
    industry: "Farmacéutico",
    category: "Sanitización estéril",
    steps: 12,
    duration: "3–5 horas",
    certifications: ["ISO 14644-1", "NOM-059-SSA1", "GMP"],
    status: "Vigente",
    tone: "warning",
  },
  {
    id: "PROT-LAV-002",
    name: "Lavado de Flota con Shampú Biodegradable",
    industry: "Logística y transporte",
    category: "Lavado de flota",
    steps: 6,
    duration: "2–4 horas",
    certifications: ["NOM-052-SEMARNAT"],
    status: "Vigente",
    tone: "primary",
  },
  {
    id: "PROT-CIP-003",
    name: "Clean-In-Place para Tanques Alimentarios",
    industry: "Alimentario",
    category: "Limpieza CIP",
    steps: 10,
    duration: "6–10 horas",
    certifications: ["HACCP", "NOM-251-SSA1", "ISO 22000"],
    status: "Vigente",
    tone: "eco",
  },
  {
    id: "PROT-POB-005",
    name: "Limpieza Post-obra — Superficies y Fachadas",
    industry: "Construcción e infraestructura",
    category: "Post-obra",
    steps: 9,
    duration: "Variable por m²",
    certifications: ["NMX-C-414"],
    status: "Vigente",
    tone: "neutral",
  },
];

// ─── Execution ────────────────────────────────────────────────────────────────

export interface ExecutionEvent {
  id: string;
  workOrderId: string;
  type: "inicio" | "pausa" | "reanudacion" | "fin" | "incidencia" | "observacion";
  timestamp: string;
  description: string;
  registeredBy: string;
  tone: OpsTone;
}

export interface MaterialConsumed {
  id: string;
  workOrderId: string;
  product: string;
  quantity: string;
  unit: string;
  wasteDisposal: string;
}

export const executionEvents: ExecutionEvent[] = [
  {
    id: "EVT-001",
    workOrderId: "OT-2025-0081",
    type: "inicio",
    timestamp: "2025-07-15 07:45",
    description: "Inicio de servicio. Personal completo. EPP verificado. Área delimitada.",
    registeredBy: "T. Flores",
    tone: "accent",
  },
  {
    id: "EVT-002",
    workOrderId: "OT-2025-0081",
    type: "incidencia",
    timestamp: "2025-07-15 09:20",
    description:
      "Unidad GL-408 presenta costra de aceite endurecida en bastidor posterior. Se requiere tiempo de contacto adicional (30 min).",
    registeredBy: "A. Gutiérrez",
    tone: "warning",
  },
  {
    id: "EVT-003",
    workOrderId: "OT-2025-0081",
    type: "observacion",
    timestamp: "2025-07-15 11:00",
    description:
      "70% del lote A completado satisfactoriamente. Aplicación de protector en proceso.",
    registeredBy: "T. Flores",
    tone: "primary",
  },
];

export const materialsConsumed: MaterialConsumed[] = [
  {
    id: "MC-001",
    workOrderId: "OT-2025-0081",
    product: "OVI DegreMax Pro",
    quantity: "45",
    unit: "litros",
    wasteDisposal: "Neutralizado y drenaje industrial",
  },
  {
    id: "MC-002",
    workOrderId: "OT-2025-0081",
    product: "OVI NeutroBase",
    quantity: "12",
    unit: "litros",
    wasteDisposal: "Neutralizado y drenaje industrial",
  },
  {
    id: "MC-003",
    workOrderId: "OT-2025-0081",
    product: "OVI ProtectShield",
    quantity: "8",
    unit: "litros",
    wasteDisposal: "Envase devuelto a proveedor",
  },
];

// ─── Evidence ─────────────────────────────────────────────────────────────────

export interface OpsEvidence {
  id: string;
  workOrderId: string;
  type: EvidenceType;
  label: string;
  stage: "antes" | "durante" | "despues";
  description: string;
  capturedBy: string;
  timestamp: string;
  geoTag?: string;
  tone: OpsTone;
}

export const opsEvidences: OpsEvidence[] = [
  {
    id: "EVI-001",
    workOrderId: "OT-2025-0081",
    type: "fotografia",
    label: "Estado inicial — Chasis GL-412",
    stage: "antes",
    description: "Depósito severo de grasa mineral en bastidor lateral derecho.",
    capturedBy: "T. Flores",
    timestamp: "2025-07-15 07:48",
    geoTag: "25.6866,-100.3161",
    tone: "warning",
  },
  {
    id: "EVI-002",
    workOrderId: "OT-2025-0081",
    type: "fotografia",
    label: "Aplicación de desengrasante — GL-412",
    stage: "durante",
    description: "Aplicación uniforme de OVI DegreMax Pro en bastidor.",
    capturedBy: "A. Gutiérrez",
    timestamp: "2025-07-15 08:15",
    geoTag: "25.6866,-100.3161",
    tone: "primary",
  },
  {
    id: "EVI-003",
    workOrderId: "OT-2025-0081",
    type: "checklist",
    label: "Checklist protocolo PROT-DES-001",
    stage: "durante",
    description: "Lista de verificación de 8 pasos del protocolo de desengrasado.",
    capturedBy: "T. Flores",
    timestamp: "2025-07-15 09:05",
    tone: "accent",
  },
  {
    id: "EVI-004",
    workOrderId: "OT-2025-0081",
    type: "firma",
    label: "Firma de inicio — Cliente",
    stage: "antes",
    description: "Firma de acta de inicio por representante del cliente.",
    capturedBy: "T. Flores",
    timestamp: "2025-07-15 07:50",
    tone: "neutral",
  },
];

// ─── Quality Control ──────────────────────────────────────────────────────────

export interface QualityCheck {
  id: string;
  workOrderId: string;
  verificationList: QualityVerificationItem[];
  protocolCompliance: number; // 0–100%
  result: QualityResult;
  observations: string;
  approvedBy: string | null;
  approvedAt: string | null;
  tone: OpsTone;
}

export interface QualityVerificationItem {
  id: string;
  description: string;
  required: boolean;
  status: "ok" | "no_aplica" | "hallazgo" | "pendiente";
  finding?: string;
}

export const qualityChecks: QualityCheck[] = [
  {
    id: "QC-001",
    workOrderId: "OT-2025-0081",
    verificationList: [
      {
        id: "qc-001-1",
        description: "Remoción completa de grasa visible en chasis",
        required: true,
        status: "ok",
      },
      {
        id: "qc-001-2",
        description: "Sin residuos de producto en superficies críticas",
        required: true,
        status: "ok",
      },
      {
        id: "qc-001-3",
        description: "Aplicación de capa de protección anticorrosiva",
        required: true,
        status: "pendiente",
      },
      {
        id: "qc-001-4",
        description: "Documentación fotográfica completa (antes / durante / después)",
        required: true,
        status: "ok",
      },
      {
        id: "qc-001-5",
        description: "Disposición correcta de residuos conforme a protocolo ambiental",
        required: true,
        status: "ok",
      },
      {
        id: "qc-001-6",
        description: "Checklist de protocolo firmado por supervisor",
        required: true,
        status: "hallazgo",
        finding: "Firma pendiente — supervisor fuera del sitio durante inspección.",
      },
    ],
    protocolCompliance: 83,
    result: "Pendiente",
    observations:
      "Servicio al 83% de ejecución. Pendiente capa final de protección y firma de supervisor.",
    approvedBy: null,
    approvedAt: null,
    tone: "warning",
  },
];

// ─── Reports ──────────────────────────────────────────────────────────────────

export interface OpsReport {
  id: string;
  projectId: string;
  type: "Reporte de servicio" | "Reporte de proyecto" | "Reporte ejecutivo" | "Reporte de calidad";
  title: string;
  generatedAt: string;
  generatedBy: string;
  status: "Generado" | "Enviado al cliente" | "Archivado" | "Borrador";
  pages: number;
  tone: OpsTone;
}

export const opsReports: OpsReport[] = [
  {
    id: "RPT-001",
    projectId: "PRY-001",
    type: "Reporte de servicio",
    title: "OT-2025-0079 — Desengrasado Flotilla Lote Especial (Junio)",
    generatedAt: "2025-06-28 16:30",
    generatedBy: "T. Flores",
    status: "Enviado al cliente",
    pages: 12,
    tone: "primary",
  },
  {
    id: "RPT-002",
    projectId: "PRY-002",
    type: "Reporte de calidad",
    title: "Sanitización Sala B — Ciclo Junio 2025",
    generatedAt: "2025-06-30 11:15",
    generatedBy: "S. Rivas",
    status: "Archivado",
    pages: 8,
    tone: "warning",
  },
];

// ─── Dashboard KPIs ───────────────────────────────────────────────────────────

export interface OpsDashboardKpi {
  id: string;
  label: string;
  value: string;
  unit?: string;
  change: string;
  trend: "up" | "down" | "stable";
  tone: OpsTone;
  icon: string;
  description: string;
}

export const opsDashboardKpis: OpsDashboardKpi[] = [
  {
    id: "active-orders",
    label: "Órdenes activas",
    value: "2",
    unit: "en curso",
    change: "+1 vs ayer",
    trend: "up",
    tone: "primary",
    icon: "ClipboardList",
    description: "Órdenes de trabajo actualmente en ejecución",
  },
  {
    id: "active-projects",
    label: "Proyectos activos",
    value: "4",
    unit: "proyectos",
    change: "+1 este mes",
    trend: "up",
    tone: "accent",
    icon: "FolderOpen",
    description: "Proyectos con ejecución en curso o aprobados",
  },
  {
    id: "compliance",
    label: "Cumplimiento",
    value: "96",
    unit: "%",
    change: "+2 pp vs mes anterior",
    trend: "up",
    tone: "eco",
    icon: "ShieldCheck",
    description: "Porcentaje de órdenes completadas sin hallazgos críticos",
  },
  {
    id: "avg-time",
    label: "Tiempo promedio",
    value: "5.2",
    unit: "hrs/OT",
    change: "-0.4 hrs",
    trend: "down",
    tone: "neutral",
    icon: "Clock",
    description: "Tiempo promedio de ejecución por orden de trabajo",
  },
  {
    id: "active-clients",
    label: "Clientes activos",
    value: "4",
    unit: "clientes",
    change: "Estable",
    trend: "stable",
    tone: "primary",
    icon: "Building2",
    description: "Clientes con proyectos o contratos vigentes",
  },
  {
    id: "satisfaction",
    label: "Satisfacción",
    value: "4.8",
    unit: "/ 5.0",
    change: "+0.1",
    trend: "up",
    tone: "accent",
    icon: "Star",
    description: "Calificación promedio de satisfacción del cliente",
  },
];

// ─── Operational Flow ─────────────────────────────────────────────────────────

export interface OpsFlowStep {
  step: number;
  id: string;
  label: string;
  description: string;
  module: string;
  icon: string;
  tone: OpsTone;
}

export const opsFlowSteps: OpsFlowStep[] = [
  {
    step: 1,
    id: "diagnostico",
    label: "Diagnóstico",
    description: "OVI AI genera diagnóstico técnico basado en datos del cliente y activo.",
    module: "OVI AI",
    icon: "Brain",
    tone: "primary",
  },
  {
    step: 2,
    id: "aprobacion",
    label: "Aprobación del cliente",
    description: "Cliente revisa y aprueba la solución recomendada desde el Portal OVI.",
    module: "Portal Cliente",
    icon: "CheckCircle",
    tone: "accent",
  },
  {
    step: 3,
    id: "proyecto",
    label: "Generación de Proyecto",
    description: "El diagnóstico aprobado se convierte automáticamente en un Proyecto OVI OPS.",
    module: "OVI OPS — Proyectos",
    icon: "FolderOpen",
    tone: "primary",
  },
  {
    step: 4,
    id: "orden",
    label: "Orden de Trabajo",
    description:
      "Se generan las órdenes de trabajo con protocolo, productos, personal y equipos asignados.",
    module: "OVI OPS — Órdenes",
    icon: "ClipboardList",
    tone: "primary",
  },
  {
    step: 5,
    id: "asignacion",
    label: "Asignación de recursos",
    description: "El supervisor asigna equipos y personal disponible a cada orden.",
    module: "OVI OPS — Personal",
    icon: "Users",
    tone: "neutral",
  },
  {
    step: 6,
    id: "ejecucion",
    label: "Ejecución",
    description: "El equipo de campo ejecuta el servicio registrando el avance en tiempo real.",
    module: "OVI Field",
    icon: "Zap",
    tone: "accent",
  },
  {
    step: 7,
    id: "calidad",
    label: "Control de calidad",
    description: "Inspector verifica el cumplimiento del protocolo y emite resultado.",
    module: "OVI OPS — Calidad",
    icon: "ShieldCheck",
    tone: "warning",
  },
  {
    step: 8,
    id: "entrega",
    label: "Entrega",
    description: "Se entrega el acta de servicio con evidencias fotográficas y firma del cliente.",
    module: "OVI OPS — Evidencias",
    icon: "FileCheck",
    tone: "eco",
  },
  {
    step: 9,
    id: "reporte",
    label: "Reporte final",
    description: "Se genera el reporte ejecutivo con KPIs, análisis y recomendaciones de OVI AI.",
    module: "OVI Analytics",
    icon: "BarChart3",
    tone: "primary",
  },
];

// ─── Architecture Pillars ─────────────────────────────────────────────────────

export interface OpsArchPillar {
  id: string;
  title: string;
  description: string;
  icon: string;
  tone: OpsTone;
  items: string[];
}

export const opsArchPillars: OpsArchPillar[] = [
  {
    id: "modular",
    title: "Arquitectura modular",
    description:
      "Cada módulo opera de forma independiente y puede desplegarse sin afectar al resto del sistema.",
    icon: "Layers",
    tone: "primary",
    items: [
      "Clientes, Proyectos y Contratos",
      "Activos y Ubicaciones",
      "Equipos y Personal",
      "Órdenes de trabajo",
      "Ejecución y Evidencias",
      "Control de calidad",
      "Reportes",
    ],
  },
  {
    id: "mobile",
    title: "Mobile-first & offline",
    description:
      "Diseñado para operar en campo sin conexión, sincronizando datos al recuperar señal.",
    icon: "Smartphone",
    tone: "accent",
    items: [
      "Sync queue para operación offline",
      "Progressive Web App (PWA)",
      "Captura de foto y firma en campo",
      "Geolocalización automática",
      "Notificaciones push",
    ],
  },
  {
    id: "multicompany",
    title: "Multi-empresa y multi-país",
    description:
      "Soporte nativo para múltiples empresas clientes con aislamiento de datos y monedas locales.",
    icon: "Globe",
    tone: "eco",
    items: [
      "Tenant isolation por empresa",
      "Soporte multi-divisa (MXN, USD, EUR)",
      "Localización (ES, EN, PT)",
      "Zonas horarias múltiples",
      "Normativas locales por país",
    ],
  },
  {
    id: "integrations",
    title: "Integraciones preparadas",
    description:
      "APIs y conectores preparados para integrarse con el ecosistema OVI y sistemas externos.",
    icon: "Cpu",
    tone: "neutral",
    items: [
      "OVI AI — recomendaciones automáticas",
      "OVI Field — ejecución en campo",
      "OVI Analytics — inteligencia de negocio",
      "OVI Store — consumo de productos",
      "OVI Lab — protocolos técnicos",
      "ERP / CRM externos (futuro)",
    ],
  },
];

// ─── Future Capabilities ──────────────────────────────────────────────────────

export interface OpsFutureCapability {
  id: string;
  title: string;
  description: string;
  horizon: "Corto plazo" | "Mediano plazo" | "Largo plazo";
  icon: string;
  tone: OpsTone;
}

export const opsFutureCapabilities: OpsFutureCapability[] = [
  {
    id: "auto-project",
    title: "Generación automática de proyectos desde diagnóstico",
    description:
      "Al aprobar un diagnóstico OVI AI, el sistema crea automáticamente el proyecto, las órdenes y asigna recursos disponibles.",
    horizon: "Corto plazo",
    icon: "Zap",
    tone: "primary",
  },
  {
    id: "mobile-app",
    title: "Aplicación móvil nativa para campo",
    description:
      "App iOS / Android para supervisores y operarios con checklist dinámico, registro fotográfico y firma digital.",
    horizon: "Corto plazo",
    icon: "Smartphone",
    tone: "accent",
  },
  {
    id: "ai-quality",
    title: "Control de calidad asistido por OVI AI",
    description:
      "OVI AI analiza las fotografías de evidencia para verificar automáticamente el cumplimiento del protocolo.",
    horizon: "Mediano plazo",
    icon: "Brain",
    tone: "primary",
  },
  {
    id: "client-portal",
    title: "Portal del cliente en tiempo real",
    description:
      "Los clientes podrán seguir el avance de sus proyectos, aprobar servicios y descargar reportes desde su portal OVI.",
    horizon: "Mediano plazo",
    icon: "Monitor",
    tone: "eco",
  },
  {
    id: "erp-crm",
    title: "Integración ERP / CRM",
    description:
      "Sincronización bidireccional con sistemas SAP, Salesforce, HubSpot u otros ERP/CRM del cliente.",
    horizon: "Largo plazo",
    icon: "Database",
    tone: "neutral",
  },
  {
    id: "iot",
    title: "Sensores IoT y activos digitales",
    description:
      "Conectar activos físicos mediante sensores IoT para monitoreo predictivo y alertas automáticas de mantenimiento.",
    horizon: "Largo plazo",
    icon: "Radio",
    tone: "primary",
  },
];
