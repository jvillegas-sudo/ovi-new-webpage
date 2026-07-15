"use client";

/**
 * Feature: OVI Solution Lab Workspace
 *
 * Digital Operations Center — Immersive Engineering Simulator.
 *
 * Interaction model:
 *   Step 0 → Select operational sector
 *   Step 1 → Select asset within that sector environment
 *   Step 2 → Select area of the asset
 *   Step 3 → Select contamination type
 *   Step 4 → DEMO engineering recommendation panel
 *
 * No AI backend. No database. No ecommerce.
 * Every recommendation is clearly marked DEMO.
 *
 * Features:
 *   - Immersive sector navigation with ambient lighting
 *   - Cinematic step transitions (Framer Motion)
 *   - Premium glass panels
 *   - Full accessibility (ARIA, keyboard, reduced-motion)
 *   - Responsive: mobile / tablet / desktop
 */

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Bot,
  CheckCircle2,
  ChevronRight,
  Clock,
  Cpu,
  Droplets,
  FlaskConical,
  Leaf,
  RotateCcw,
  ShoppingCart,
  Truck,
  Building2,
  Factory,
  Zap,
  Wrench,
  AlertTriangle,
  Layers,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@utils/cn";
import { Heading, Text } from "@components/ui";

// ─── Data ─────────────────────────────────────────────────────────────────────

interface Asset {
  id: string;
  label: string;
  description: string;
  icon: string;
}

interface Sector {
  id: string;
  label: string;
  subtitle: string;
  description: string;
  Icon: LucideIcon;
  color: string;
  glow: string;
  borderColor: string;
  bgAccent: string;
  assets: Asset[];
}

interface AreaOption {
  id: string;
  label: string;
}

interface ContaminationOption {
  id: string;
  label: string;
  severity: "moderate" | "high" | "critical";
}

const SECTORS: Sector[] = [
  {
    id: "transporte",
    label: "TRANSPORTE",
    subtitle: "Flota vehicular y maquinaria pesada",
    description:
      "Instalaciones de mantenimiento industrial, talleres de flota y patios de operaciones. Vehículos de servicio urbano, transporte de carga y maquinaria especializada.",
    Icon: Truck,
    color: "text-[var(--color-brand-primary)]",
    glow: "var(--shadow-glow-primary)",
    borderColor: "rgba(0,196,255,0.35)",
    bgAccent: "rgba(0,196,255,0.08)",
    assets: [
      {
        id: "bus-urbano",
        label: "Bus Urbano",
        description: "Flota de transporte público masivo",
        icon: "🚌",
      },
      {
        id: "camion-pesado",
        label: "Camión Pesado",
        description: "Tractocamiones y camiones de carga",
        icon: "🚛",
      },
      {
        id: "recolector-residuos",
        label: "Vehículo Recolector",
        description: "Camiones de recolección de residuos",
        icon: "🚚",
      },
      {
        id: "maquinaria-pesada",
        label: "Maquinaria Pesada",
        description: "Excavadoras, retroexcavadoras, cargadores",
        icon: "🚜",
      },
      {
        id: "vehiculo-especial",
        label: "Vehículo Especial",
        description: "Unidades de emergencia y servicios especiales",
        icon: "🚒",
      },
    ],
  },
  {
    id: "institucional",
    label: "INSTITUCIONAL",
    subtitle: "Infraestructura pública y privada",
    description:
      "Edificios institucionales, centros de salud, establecimientos educativos y espacios comerciales de alta demanda operativa.",
    Icon: Building2,
    color: "text-[var(--color-brand-accent)]",
    glow: "var(--shadow-glow-accent)",
    borderColor: "rgba(0,255,133,0.35)",
    bgAccent: "rgba(0,255,133,0.08)",
    assets: [
      {
        id: "hospital",
        label: "Hospital",
        description: "Centros de salud y clínicas",
        icon: "🏥",
      },
      {
        id: "centro-educativo",
        label: "Centro Educativo",
        description: "Escuelas, colegios, universidades",
        icon: "🏫",
      },
      {
        id: "centro-comercial",
        label: "Centro Comercial",
        description: "Retail y centros comerciales",
        icon: "🏬",
      },
      {
        id: "infraestructura",
        label: "Infraestructura",
        description: "Edificios públicos y oficinas",
        icon: "🏢",
      },
      {
        id: "servicio-alimentacion",
        label: "Servicio de Alimentación",
        description: "Cocinas industriales y restaurantes",
        icon: "🍽️",
      },
    ],
  },
  {
    id: "industria",
    label: "INDUSTRIA",
    subtitle: "Plantas de producción y manufactura",
    description:
      "Entornos de producción industrial con alta demanda técnica. Plantas de alimentos, farmacéutica, química y sector agrícola.",
    Icon: Factory,
    color: "text-[var(--color-brand-warning)]",
    glow: "0 0 20px rgba(255,165,0,0.3), 0 0 60px rgba(255,165,0,0.1)",
    borderColor: "rgba(255,165,0,0.35)",
    bgAccent: "rgba(255,165,0,0.08)",
    assets: [
      {
        id: "industria-alimentos",
        label: "Industria de Alimentos",
        description: "Plantas de procesamiento alimentario",
        icon: "🏭",
      },
      {
        id: "farmaceutica",
        label: "Industria Farmacéutica",
        description: "Laboratorios y plantas farmacéuticas",
        icon: "💊",
      },
      {
        id: "quimica",
        label: "Industria Química",
        description: "Plantas de producción química",
        icon: "⚗️",
      },
      {
        id: "mineria",
        label: "Minería",
        description: "Operaciones mineras y extracción",
        icon: "⛏️",
      },
      {
        id: "agricola",
        label: "Industria Agrícola",
        description: "Maquinaria y silos agrícolas",
        icon: "🌾",
      },
    ],
  },
  {
    id: "energia",
    label: "ENERGÍA",
    subtitle: "Generación, refinación y exploración",
    description:
      "Infraestructura crítica de energía. Plantas de generación eléctrica, refinerías, petroquímica, plataformas marítimas.",
    Icon: Zap,
    color: "text-[var(--color-brand-secondary)]",
    glow: "0 0 20px rgba(0,71,171,0.4), 0 0 60px rgba(0,71,171,0.15)",
    borderColor: "rgba(0,71,171,0.5)",
    bgAccent: "rgba(0,71,171,0.1)",
    assets: [
      {
        id: "generacion-electrica",
        label: "Generación Eléctrica",
        description: "Plantas termoeléctricas e hidroeléctricas",
        icon: "⚡",
      },
      {
        id: "refineria",
        label: "Refinería",
        description: "Instalaciones de refinación de petróleo",
        icon: "🛢️",
      },
      {
        id: "petroquimica",
        label: "Petroquímica",
        description: "Plantas petroquímicas y derivados",
        icon: "🔩",
      },
      {
        id: "exploracion",
        label: "Exploración",
        description: "Equipos de exploración y perforación",
        icon: "🔭",
      },
      {
        id: "maritima",
        label: "Industria Marítima",
        description: "Plataformas y embarcaciones industriales",
        icon: "🚢",
      },
    ],
  },
];

const ASSET_AREAS: Record<string, AreaOption[]> = {
  "bus-urbano": [
    { id: "motor", label: "Motor" },
    { id: "interior", label: "Interior / Cabina" },
    { id: "exterior", label: "Carrocería Exterior" },
    { id: "piso", label: "Piso Interior" },
    { id: "neumaticos", label: "Ruedas y Neumáticos" },
    { id: "sistema-suspension", label: "Sistema de Suspensión" },
  ],
  "camion-pesado": [
    { id: "motor", label: "Motor" },
    { id: "chasis", label: "Chasis y Bastidor" },
    { id: "cabina", label: "Cabina" },
    { id: "caja-carga", label: "Caja de Carga" },
    { id: "neumaticos", label: "Ruedas y Neumáticos" },
    { id: "sistema-hidraulico", label: "Sistema Hidráulico" },
  ],
  "recolector-residuos": [
    { id: "motor", label: "Motor" },
    { id: "compactador", label: "Compactador" },
    { id: "sistema-hidraulico", label: "Sistema Hidráulico" },
    { id: "cabina", label: "Cabina" },
    { id: "carroceria-exterior", label: "Carrocería Exterior" },
    { id: "chasis", label: "Chasis y Ruedas" },
  ],
  "maquinaria-pesada": [
    { id: "motor", label: "Motor" },
    { id: "sistema-hidraulico", label: "Sistema Hidráulico" },
    { id: "tren-rodaje", label: "Tren de Rodaje" },
    { id: "cabina-operador", label: "Cabina del Operador" },
    { id: "cucharon-brazo", label: "Cucharon / Brazo" },
    { id: "chasis-bastidor", label: "Chasis y Bastidor" },
  ],
  "vehiculo-especial": [
    { id: "motor", label: "Motor" },
    { id: "equipo-especializado", label: "Equipo Especializado" },
    { id: "cabina", label: "Cabina" },
    { id: "carroceria", label: "Carrocería" },
    { id: "neumaticos", label: "Ruedas y Neumáticos" },
    { id: "sistemas-electronicos", label: "Sistemas Electrónicos" },
  ],
  hospital: [
    { id: "quirofano", label: "Quirófano / Sala Quirúrgica" },
    { id: "uci", label: "UCI / Área Crítica" },
    { id: "pasillos", label: "Pasillos y Circulación" },
    { id: "sanitarios", label: "Sanitarios y Vestidores" },
    { id: "laboratorio", label: "Laboratorio" },
    { id: "cocina-hospitalaria", label: "Cocina Hospitalaria" },
  ],
  "centro-educativo": [
    { id: "aulas", label: "Aulas y Salones" },
    { id: "banos", label: "Baños y Servicios" },
    { id: "cafeteria", label: "Cafetería" },
    { id: "laboratorios", label: "Laboratorios" },
    { id: "areas-deportivas", label: "Áreas Deportivas" },
    { id: "pasillos-circulacion", label: "Pasillos y Circulación" },
  ],
  "centro-comercial": [
    { id: "pisos-circulacion", label: "Pisos de Circulación" },
    { id: "banos-publicos", label: "Baños Públicos" },
    { id: "food-court", label: "Patio de Comidas" },
    { id: "estacionamiento", label: "Estacionamiento" },
    { id: "areas-comunes", label: "Áreas Comunes" },
    { id: "fachada", label: "Fachada Exterior" },
  ],
  infraestructura: [
    { id: "pisos", label: "Pisos y Superficies" },
    { id: "fachada-vidrios", label: "Fachada y Vidrios" },
    { id: "sanitarios", label: "Sanitarios" },
    { id: "estacionamiento", label: "Estacionamiento" },
    { id: "cubierta", label: "Cubierta y Techo" },
    { id: "areas-verdes", label: "Áreas Comunes" },
  ],
  "servicio-alimentacion": [
    { id: "cocina-industrial", label: "Cocina Industrial" },
    { id: "campanas-ductos", label: "Campanas y Ductos" },
    { id: "pisos-antideslizantes", label: "Pisos Antideslizantes" },
    { id: "equipos-coccion", label: "Equipos de Cocción" },
    { id: "camaras-frio", label: "Cámaras de Frío" },
    { id: "area-lavado", label: "Área de Lavado" },
  ],
  "industria-alimentos": [
    { id: "linea-produccion", label: "Línea de Producción" },
    { id: "camaras-frio", label: "Cámaras Frigoríficas" },
    { id: "tanques-almacenamiento", label: "Tanques de Almacenamiento" },
    { id: "bandas-transportadoras", label: "Bandas Transportadoras" },
    { id: "pisos-drenajes", label: "Pisos y Drenajes" },
    { id: "equipos-procesamiento", label: "Equipos de Procesamiento" },
  ],
  farmaceutica: [
    { id: "sala-limpia", label: "Sala Limpia" },
    { id: "equipos-produccion", label: "Equipos de Producción" },
    { id: "laboratorio", label: "Laboratorio" },
    { id: "area-almacenamiento", label: "Área de Almacenamiento" },
    { id: "vestuarios", label: "Vestuarios y Esclusas" },
    { id: "ductos-ventilacion", label: "Ductos de Ventilación" },
  ],
  quimica: [
    { id: "reactores", label: "Reactores y Tanques" },
    { id: "tuberias", label: "Tuberías y Válvulas" },
    { id: "pisos-quimicos", label: "Pisos Resistentes a Químicos" },
    { id: "contencion-derrames", label: "Contención de Derrames" },
    { id: "equipos-proceso", label: "Equipos de Proceso" },
    { id: "area-almacenamiento", label: "Área de Almacenamiento" },
  ],
  mineria: [
    { id: "maquinaria-extraccion", label: "Maquinaria de Extracción" },
    { id: "cintas-transportadoras", label: "Cintas Transportadoras" },
    { id: "vehiculos-mineros", label: "Vehículos Mineros" },
    { id: "planta-procesamiento", label: "Planta de Procesamiento" },
    { id: "taller-mantenimiento", label: "Taller de Mantenimiento" },
    { id: "estructura-soporte", label: "Estructuras de Soporte" },
  ],
  agricola: [
    { id: "maquinaria-agricola", label: "Maquinaria Agrícola" },
    { id: "silos-almacenamiento", label: "Silos y Almacenamiento" },
    { id: "equipos-riego", label: "Equipos de Riego" },
    { id: "instalaciones-ganaderas", label: "Instalaciones Ganaderas" },
    { id: "bodegas-producto", label: "Bodegas de Producto" },
    { id: "vehiculos-campo", label: "Vehículos de Campo" },
  ],
  "generacion-electrica": [
    { id: "turbinas", label: "Turbinas y Generadores" },
    { id: "transformadores", label: "Transformadores" },
    { id: "sala-control", label: "Sala de Control" },
    { id: "tanques-combustible", label: "Tanques de Combustible" },
    { id: "estructura-civil", label: "Estructura Civil" },
    { id: "sistemas-refrigeracion", label: "Sistemas de Refrigeración" },
  ],
  refineria: [
    { id: "torres-destilacion", label: "Torres de Destilación" },
    { id: "tuberias-proceso", label: "Tuberías de Proceso" },
    { id: "tanques-almacenamiento", label: "Tanques de Almacenamiento" },
    { id: "intercambiadores-calor", label: "Intercambiadores de Calor" },
    { id: "area-mantenimiento", label: "Área de Mantenimiento" },
    { id: "sistema-contención", label: "Sistema de Contención" },
  ],
  petroquimica: [
    { id: "unidades-proceso", label: "Unidades de Proceso" },
    { id: "tuberias", label: "Tuberías y Manifolds" },
    { id: "tanques", label: "Tanques y Esferas" },
    { id: "flaring", label: "Sistemas de Flaring" },
    { id: "estructuras", label: "Estructuras Metálicas" },
    { id: "instrumentacion", label: "Instrumentación y Control" },
  ],
  exploracion: [
    { id: "equipos-perforacion", label: "Equipos de Perforación" },
    { id: "maquinaria-campo", label: "Maquinaria de Campo" },
    { id: "campamentos", label: "Campamentos y Módulos" },
    { id: "vehiculos-todo-terreno", label: "Vehículos Todo Terreno" },
    { id: "equipo-apoyo", label: "Equipos de Apoyo" },
    { id: "contenedores-proceso", label: "Contenedores de Proceso" },
  ],
  maritima: [
    { id: "cubierta", label: "Cubierta y Superestructura" },
    { id: "sala-maquinas", label: "Sala de Máquinas" },
    { id: "casco-obra-viva", label: "Casco / Obra Viva" },
    { id: "gruas-equipos-izaje", label: "Grúas y Equipos de Izaje" },
    { id: "sistemas-contraincendio", label: "Sistemas Contraincendio" },
    { id: "habitabilidad", label: "Zonas de Habitabilidad" },
  ],
};

const CONTAMINATION_TYPES: ContaminationOption[] = [
  { id: "grasa-pesada", label: "Grasa Pesada", severity: "high" },
  { id: "aceite-hidraulico", label: "Aceite / Fluido Hidráulico", severity: "high" },
  { id: "barro-lodo", label: "Barro y Lodo", severity: "moderate" },
  { id: "polvo-frenos", label: "Polvo de Frenos", severity: "moderate" },
  { id: "residuo-organico", label: "Residuo Orgánico", severity: "high" },
  { id: "suciedad-industrial", label: "Suciedad Industrial General", severity: "moderate" },
  { id: "oxidacion", label: "Oxidación y Corrosión", severity: "critical" },
  { id: "contaminacion-biologica", label: "Contaminación Biológica", severity: "critical" },
];

// ─── Types ────────────────────────────────────────────────────────────────────

type SimStep = "sector" | "asset" | "area" | "contamination" | "result";

interface SimState {
  sector: Sector | null;
  asset: Asset | null;
  area: AreaOption | null;
  contamination: ContaminationOption | null;
}

interface EngineeringResult {
  challenge: string;
  protocol: string;
  products: string[];
  equipment: string[];
  dilution: string;
  executionTime: string;
  environmentalImpact: string;
  recommendedService: string;
}

// ─── Engineering result generator ────────────────────────────────────────────

function generateEngineeringResult(
  sector: Sector,
  asset: Asset,
  area: AreaOption,
  contamination: ContaminationOption,
): EngineeringResult {
  const isMotor = area.id === "motor" || area.id === "turbinas" || area.id === "sala-maquinas";
  const isHydraulic =
    area.id === "sistema-hidraulico" || area.id === "tuberias" || area.id === "tuberias-proceso";
  const isFloor =
    area.id === "pisos" ||
    area.id === "pisos-drenajes" ||
    area.id === "pisos-antideslizantes" ||
    area.id === "piso";
  const isCriticalHealth =
    sector.id === "institucional" &&
    (asset.id === "hospital" || area.id === "quirofano" || area.id === "uci");
  const isFood = sector.id === "industria" && asset.id === "industria-alimentos";

  const severityLabel =
    contamination.severity === "critical"
      ? "Nivel Crítico"
      : contamination.severity === "high"
        ? "Nivel Alto"
        : "Nivel Moderado";

  if (isCriticalHealth) {
    return {
      challenge: `[DEMO] ${contamination.label} detectada en ${area.label} — ${asset.label}. Entorno hospitalario crítico con alto riesgo biológico. Protocolo de nivel H3 requerido.`,
      protocol:
        "[DEMO] Protocolo H-03 — Limpieza y Desinfección de Alto Nivel (DALY). Aplicación en 3 ciclos: pre-limpieza alcalina, desinfección biocida de amplio espectro y validación ATP.",
      products: [
        "[DEMO] Desinfectante hospitalario de amplio espectro (Ref. OVI-H-200)",
        "[DEMO] Limpiador enzimático para superficies clínicas (Ref. OVI-H-110)",
        "[DEMO] Desinfectante de superficie de contacto certificado (Ref. OVI-H-150)",
      ],
      equipment: [
        "[DEMO] Equipo de nebulización ULV electrostática",
        "[DEMO] Pulidora de baja velocidad con accesorio de microfibra",
        "[DEMO] Kit de validación ATP con luminómetro",
      ],
      dilution: "[DEMO] 1:50 — 1:100 según superficie. Aplicación pura para área crítica.",
      executionTime: "[DEMO] 3–4 horas por área. Pre-limpieza 30 min + desinfección 2 ciclos.",
      environmentalImpact:
        "[DEMO] Formulación sin cloro activo libre. Biodegradable en 72 horas. Compatible con tratamiento de efluentes hospitalarios.",
      recommendedService:
        "[DEMO] Servicio de Desinfección Hospitalaria Nivel H3 — OVI Ingeniería en Limpieza. Incluye auditoría de protocolo, aplicación técnica certificada y validación microbiológica.",
    };
  }

  if (isFood) {
    return {
      challenge: `[DEMO] ${contamination.label} en ${area.label} — Planta de procesamiento alimentario. ${severityLabel}. Requiere productos food-grade y protocolo HACCP.`,
      protocol:
        "[DEMO] Protocolo P-010 — Limpieza y Desinfección CIP/SIP. Ciclo: enjuague previo → aplicación alcalina caliente → enjuague intermedio → desinfección ácida/biocida → enjuague final.",
      products: [
        "[DEMO] Desengrasante alcalino food-grade de alta eficacia (Ref. OVI-F-300)",
        "[DEMO] Desinfectante de superficies en contacto con alimentos (Ref. OVI-F-350)",
        "[DEMO] Limpiador ácido para depósitos minerales (Ref. OVI-F-320)",
      ],
      equipment: [
        "[DEMO] Hidrolavadora de agua caliente a presión (80–90°C)",
        "[DEMO] Espumadora de alta adherencia para aplicación controlada",
        "[DEMO] Medidor de pH y conductividad para validación",
      ],
      dilution: "[DEMO] Alcalino 2–5% p/v. Ácido 0.5–1.5% p/v. Temperatura 60–80°C.",
      executionTime: "[DEMO] 1.5–2.5 horas por línea. Ciclo completo con validación.",
      environmentalImpact:
        "[DEMO] Formulación libre de fosfatos. DQO reducida en efluentes. Biodegradable al 90% en 28 días (OCDE 301B).",
      recommendedService:
        "[DEMO] Servicio de Limpieza Industrial Alimentaria — OVI Ingeniería en Limpieza. Diseño de Plan HACCP de limpieza, implementación y auditorías periódicas.",
    };
  }

  if (isMotor) {
    return {
      challenge: `[DEMO] ${contamination.label} en ${area.label} — ${asset.label}. ${severityLabel}. Acumulación de residuos carbonizados, lubricantes y partículas metálicas en zona de alta temperatura.`,
      protocol:
        "[DEMO] Protocolo M-001 — Desengrase técnico de motor. Aplicación en frío con tiempo de contacto 10–15 min. Agitación mecánica. Enjuague a presión controlada.",
      products: [
        "[DEMO] Desengrasante alcalino concentrado para motores (Ref. OVI-M-100)",
        "[DEMO] Limpiador de alta penetración para zonas carbonizadas (Ref. OVI-M-120)",
        "[DEMO] Inhibidor de corrosión post-limpieza (Ref. OVI-M-130)",
      ],
      equipment: [
        "[DEMO] Hidrolavadora industrial de alta presión (80–120 bar)",
        "[DEMO] Espumadora de aplicación controlada",
        "[DEMO] Cepillo de cerda metálica para zonas incrustadas",
      ],
      dilution:
        "[DEMO] Concentrado puro para incrustación severa. Dilución 1:5 para mantenimiento.",
      executionTime: "[DEMO] 45–90 minutos por unidad según nivel de acumulación.",
      environmentalImpact:
        "[DEMO] Formulación biodegradable de baja espuma. No contiene solventes halogenados. Efluentes compatibles con trampa de grasas.",
      recommendedService:
        "[DEMO] Servicio de Mantenimiento Técnico de Flota — OVI Ingeniería en Limpieza. Diagnóstico, protocolo personalizado e implementación supervisada.",
    };
  }

  if (isHydraulic) {
    return {
      challenge: `[DEMO] ${contamination.label} en ${area.label} — ${asset.label}. ${severityLabel}. Presencia de fluidos hidráulicos, lubricantes y selladores en zonas de difícil acceso.`,
      protocol:
        "[DEMO] Protocolo H-002 — Limpieza de sistemas hidráulicos. Desengrase técnico + aplicación de agente de remoción de films grasos. Enjuague con agua a presión moderada.",
      products: [
        "[DEMO] Desengrasante para sistemas hidráulicos (Ref. OVI-H-200)",
        "[DEMO] Removedor de films aceitosos (Ref. OVI-H-210)",
        "[DEMO] Protector de superficies metálicas post-limpieza (Ref. OVI-H-220)",
      ],
      equipment: [
        "[DEMO] Hidrolavadora de presión media (40–60 bar)",
        "[DEMO] Compresor de aire para zonas de difícil acceso",
        "[DEMO] Aplicador de espuma de baja expansión",
      ],
      dilution:
        "[DEMO] 1:3 en agua tibia para desengrasante. Aplicación directa para remoción de films.",
      executionTime: "[DEMO] 30–60 minutos por sistema.",
      environmentalImpact:
        "[DEMO] Sin solventes aromáticos. Biodegradable. Compatible con separadores de hidrocarburos.",
      recommendedService:
        "[DEMO] Servicio de Limpieza de Sistemas Industriales — OVI Ingeniería en Limpieza.",
    };
  }

  if (isFloor) {
    return {
      challenge: `[DEMO] ${contamination.label} en ${area.label} — ${asset.label}. ${severityLabel}. Superficie con acumulación de suciedad incrustada y posible deterioro de acabado.`,
      protocol:
        "[DEMO] Protocolo F-001 — Limpieza profunda de pisos industriales. Pre-barrido → aplicación alcalina diluida → tiempo de contacto 5–8 min → fregado mecánico → enjuague → neutralización.",
      products: [
        "[DEMO] Limpiador alcalino industrial para pisos (Ref. OVI-F-400)",
        "[DEMO] Neutralizador y sellador de pisos (Ref. OVI-F-420)",
        "[DEMO] Producto de mantenimiento diario (Ref. OVI-F-410)",
      ],
      equipment: [
        "[DEMO] Fregadora industrial con cepillo de nylon",
        "[DEMO] Aspiradora-escurridora industrial",
        "[DEMO] Aplicador de sellador por rodillo",
      ],
      dilution: "[DEMO] Limpieza profunda: 1:20. Mantenimiento diario: 1:50 en agua fría.",
      executionTime: "[DEMO] 30 min por 100 m² en limpieza profunda. 15 min en mantenimiento.",
      environmentalImpact:
        "[DEMO] pH neutro post-enjuague. Formulación de bajo impacto en efluentes municipales.",
      recommendedService:
        "[DEMO] Servicio de Mantenimiento de Pisos Industriales — OVI Ingeniería en Limpieza.",
    };
  }

  // Generic fallback
  return {
    challenge: `[DEMO] ${contamination.label} identificada en ${area.label} — ${asset.label} / ${sector.label}. ${severityLabel}. Requiere análisis de condiciones específicas para protocolo óptimo.`,
    protocol:
      "[DEMO] Protocolo G-001 — Diagnóstico y limpieza técnica estándar. Evaluación de superficie → selección de agente → aplicación controlada → enjuague técnico → verificación.",
    products: [
      "[DEMO] Agente de limpieza de alto desempeño para sector industrial (Ref. OVI-G-001)",
      "[DEMO] Desinfectante de amplio espectro (Ref. OVI-G-010)",
      "[DEMO] Producto de mantenimiento preventivo (Ref. OVI-G-020)",
    ],
    equipment: [
      "[DEMO] Hidrolavadora industrial polivalente",
      "[DEMO] Kit de aplicación controlada (espumadora + dosificador)",
      "[DEMO] Equipo de protección personal para operario",
    ],
    dilution: "[DEMO] Concentrado 1:10 para limpieza inicial. 1:30–1:50 para mantenimiento.",
    executionTime: "[DEMO] 45–120 minutos según superficie y nivel de contaminación.",
    environmentalImpact:
      "[DEMO] Formulaciones biodegradables certificadas. Reducción de carga química en efluentes con dosificación técnica precisa.",
    recommendedService: `[DEMO] Servicio de Ingeniería en Limpieza para ${sector.label} — OVI Ingeniería en Limpieza. Diagnóstico técnico, protocolo especializado e implementación supervisada.`,
  };
}

// ─── Animation variants ───────────────────────────────────────────────────────

const panelVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, y: -16, scale: 0.98, transition: { duration: 0.25, ease: [0.4, 0, 1, 1] } },
};

const reducedPanelVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

// ─── Step indicator ───────────────────────────────────────────────────────────

const STEPS: { id: SimStep; label: string }[] = [
  { id: "sector", label: "Sector" },
  { id: "asset", label: "Entorno" },
  { id: "area", label: "Área" },
  { id: "contamination", label: "Contaminación" },
  { id: "result", label: "Diagnóstico" },
];

function StepIndicator({
  currentStep,
  completedSteps,
}: {
  currentStep: SimStep;
  completedSteps: Set<SimStep>;
}) {
  const currentIndex = STEPS.findIndex((s) => s.id === currentStep);

  return (
    <nav aria-label="Progreso del simulador" className="mb-8">
      <ol className="flex items-center justify-center gap-0">
        {STEPS.map((step, index) => {
          const isCompleted = completedSteps.has(step.id);
          const isCurrent = step.id === currentStep;
          const isPast = index < currentIndex;

          return (
            <li key={step.id} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all duration-300",
                    isCurrent
                      ? "bg-[var(--color-brand-primary)] text-[var(--color-text-inverse)] shadow-[var(--shadow-glow-primary)]"
                      : isCompleted || isPast
                        ? "bg-[var(--color-brand-primary)] text-[var(--color-text-inverse)] opacity-60"
                        : "border border-[var(--color-border-default)] bg-transparent text-[var(--color-text-tertiary)]",
                  )}
                  aria-current={isCurrent ? "step" : undefined}
                >
                  {isCompleted || isPast ? <CheckCircle2 size={14} /> : index + 1}
                </div>
                <span
                  className={cn(
                    "mt-1 hidden text-[10px] font-medium sm:block",
                    isCurrent
                      ? "text-[var(--color-brand-primary)]"
                      : "text-[var(--color-text-tertiary)]",
                  )}
                >
                  {step.label}
                </span>
              </div>
              {index < STEPS.length - 1 && (
                <div
                  className={cn(
                    "mx-1 h-px w-8 transition-all duration-300 sm:w-12",
                    isPast || isCompleted
                      ? "bg-[var(--color-brand-primary)] opacity-40"
                      : "bg-[var(--color-border-subtle)]",
                  )}
                  aria-hidden="true"
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

// ─── Sector Selection ─────────────────────────────────────────────────────────

function SectorSelection({ onSelect }: { onSelect: (sector: Sector) => void }) {
  return (
    <div>
      <div className="mb-8 text-center">
        <p
          className="mb-2 text-xs font-semibold tracking-widest text-[var(--color-text-tertiary)] uppercase"
          aria-hidden="true"
        >
          — Paso 01 —
        </p>
        <Heading as="h2" size="2xl" align="center">
          Seleccione un Sector Operativo
        </Heading>
        <Text align="center" className="mx-auto mt-3 max-w-lg">
          Cada sector representa un entorno operativo real con sus propios desafíos de ingeniería en
          limpieza.
        </Text>
      </div>

      <div
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        role="list"
        aria-label="Sectores operativos disponibles"
      >
        {SECTORS.map((sector) => {
          const Icon = sector.Icon;
          return (
            <motion.div
              key={sector.id}
              role="listitem"
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.97 }}
            >
              <button
                className={cn(
                  "glass glass-hover group relative w-full overflow-hidden rounded-2xl p-6 text-left",
                  "border transition-all duration-300",
                  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-primary)]",
                  "hover:shadow-lg",
                )}
                style={{
                  borderColor: "rgba(255,255,255,0.08)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = sector.borderColor;
                  (e.currentTarget as HTMLElement).style.boxShadow = sector.glow;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "";
                }}
                onClick={() => onSelect(sector)}
                aria-label={`Explorar sector ${sector.label}: ${sector.subtitle}`}
              >
                {/* Ambient glow spot */}
                <div
                  className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(circle at 50% 0%, ${sector.bgAccent} 0%, transparent 70%)`,
                  }}
                  aria-hidden="true"
                />

                <div
                  className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl"
                  style={{ background: sector.bgAccent, border: `1px solid ${sector.borderColor}` }}
                  aria-hidden="true"
                >
                  <Icon className={cn("h-6 w-6", sector.color)} />
                </div>

                <p className={cn("mb-1 text-sm font-black tracking-widest", sector.color)}>
                  {sector.label}
                </p>
                <p className="text-xs font-medium text-[var(--color-text-secondary)]">
                  {sector.subtitle}
                </p>

                <div className="mt-4 flex items-center gap-1">
                  <span className="text-xs text-[var(--color-text-tertiary)]">
                    {sector.assets.length} entornos
                  </span>
                  <ChevronRight
                    size={12}
                    className={cn(
                      "transition-transform duration-200 group-hover:translate-x-1",
                      sector.color,
                    )}
                    aria-hidden="true"
                  />
                </div>
              </button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Asset Selection ──────────────────────────────────────────────────────────

function AssetSelection({
  sector,
  onSelect,
  onBack,
}: {
  sector: Sector;
  onSelect: (asset: Asset) => void;
  onBack: () => void;
}) {
  return (
    <div>
      <div className="mb-8 text-center">
        <p
          className="mb-2 text-xs font-semibold tracking-widest text-[var(--color-text-tertiary)] uppercase"
          aria-hidden="true"
        >
          — Paso 02 —
        </p>
        <div className="mb-3 flex items-center justify-center gap-2">
          <span
            className="rounded-full px-3 py-1 text-xs font-bold tracking-wider"
            style={{
              background: sector.bgAccent,
              border: `1px solid ${sector.borderColor}`,
              color: sector.color.replace("text-[", "").replace("]", ""),
            }}
            aria-label={`Sector seleccionado: ${sector.label}`}
          >
            {sector.label}
          </span>
        </div>
        <Heading as="h2" size="2xl" align="center">
          Seleccione el Activo
        </Heading>
        <Text align="center" className="mx-auto mt-3 max-w-lg">
          {sector.description}
        </Text>
      </div>

      <div
        className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        role="list"
        aria-label={`Activos disponibles en ${sector.label}`}
      >
        {sector.assets.map((asset) => (
          <motion.div
            key={asset.id}
            role="listitem"
            whileHover={{ y: -2, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.98 }}
          >
            <button
              className={cn(
                "glass glass-hover group relative w-full overflow-hidden rounded-xl p-5 text-left",
                "border border-[rgba(255,255,255,0.08)] transition-all duration-300",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-primary)]",
              )}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = sector.borderColor;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
              }}
              onClick={() => onSelect(asset)}
              aria-label={`Seleccionar ${asset.label}: ${asset.description}`}
            >
              <span className="mb-3 block text-3xl" aria-hidden="true">
                {asset.icon}
              </span>
              <p className="text-sm font-bold text-[var(--color-text-primary)]">{asset.label}</p>
              <p className="mt-1 text-xs text-[var(--color-text-tertiary)]">{asset.description}</p>
              <ArrowRight
                size={14}
                className={cn(
                  "mt-3 opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100",
                  sector.color,
                )}
                aria-hidden="true"
              />
            </button>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 flex justify-start">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-brand-primary)] focus-visible:outline-2 focus-visible:outline-[var(--color-brand-primary)]"
          aria-label="Volver a selección de sector"
        >
          <ArrowLeft size={14} aria-hidden="true" />
          Cambiar sector
        </button>
      </div>
    </div>
  );
}

// ─── Area Selection ───────────────────────────────────────────────────────────

function AreaSelection({
  sector,
  asset,
  onSelect,
  onBack,
}: {
  sector: Sector;
  asset: Asset;
  onSelect: (area: AreaOption) => void;
  onBack: () => void;
}) {
  const areas = ASSET_AREAS[asset.id] ?? [
    { id: "general", label: "Área General" },
    { id: "interior", label: "Interior" },
    { id: "exterior", label: "Exterior" },
  ];

  return (
    <div>
      <div className="mb-8 text-center">
        <p
          className="mb-2 text-xs font-semibold tracking-widest text-[var(--color-text-tertiary)] uppercase"
          aria-hidden="true"
        >
          — Paso 03 —
        </p>
        <div className="mb-3 flex flex-wrap items-center justify-center gap-2">
          <span
            className="rounded-full px-3 py-1 text-xs font-bold tracking-wider"
            style={{
              background: sector.bgAccent,
              border: `1px solid ${sector.borderColor}`,
            }}
            aria-label={`Sector: ${sector.label}`}
          >
            <span className={sector.color}>{sector.label}</span>
          </span>
          <ChevronRight
            size={12}
            className="text-[var(--color-text-tertiary)]"
            aria-hidden="true"
          />
          <span className="rounded-full border border-[var(--color-border-default)] bg-[var(--color-bg-elevated)] px-3 py-1 text-xs font-medium text-[var(--color-text-secondary)]">
            {asset.icon} {asset.label}
          </span>
        </div>
        <Heading as="h2" size="2xl" align="center">
          Seleccione el Área
        </Heading>
        <Text align="center" className="mx-auto mt-3 max-w-lg">
          Identifique la zona específica del activo donde se presenta el desafío de limpieza.
        </Text>
      </div>

      <div
        className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        role="list"
        aria-label={`Áreas disponibles en ${asset.label}`}
      >
        {areas.map((area) => (
          <motion.div
            key={area.id}
            role="listitem"
            whileHover={{ y: -2, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.98 }}
          >
            <button
              className={cn(
                "glass glass-hover group relative w-full overflow-hidden rounded-xl p-4 text-left",
                "border border-[rgba(255,255,255,0.08)] transition-all duration-300",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-primary)]",
              )}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = sector.borderColor;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
              }}
              onClick={() => onSelect(area)}
              aria-label={`Seleccionar área: ${area.label}`}
            >
              <div className="flex items-center gap-3">
                <div
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                  style={{ background: sector.bgAccent }}
                  aria-hidden="true"
                >
                  <Layers size={14} className={sector.color} />
                </div>
                <span className="text-sm font-medium text-[var(--color-text-primary)]">
                  {area.label}
                </span>
              </div>
            </button>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 flex justify-start">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-brand-primary)] focus-visible:outline-2 focus-visible:outline-[var(--color-brand-primary)]"
          aria-label="Volver a selección de activo"
        >
          <ArrowLeft size={14} aria-hidden="true" />
          Cambiar activo
        </button>
      </div>
    </div>
  );
}

// ─── Contamination Selection ──────────────────────────────────────────────────

const SEVERITY_CONFIG: Record<
  ContaminationOption["severity"],
  { label: string; color: string; bg: string }
> = {
  moderate: {
    label: "Moderado",
    color: "text-[var(--color-brand-accent)]",
    bg: "rgba(0,255,133,0.1)",
  },
  high: {
    label: "Alto",
    color: "text-[var(--color-brand-warning)]",
    bg: "rgba(255,165,0,0.1)",
  },
  critical: {
    label: "Crítico",
    color: "text-[var(--color-brand-danger)]",
    bg: "rgba(255,59,59,0.1)",
  },
};

function ContaminationSelection({
  sector,
  asset,
  area,
  onSelect,
  onBack,
}: {
  sector: Sector;
  asset: Asset;
  area: AreaOption;
  onSelect: (contamination: ContaminationOption) => void;
  onBack: () => void;
}) {
  return (
    <div>
      <div className="mb-8 text-center">
        <p
          className="mb-2 text-xs font-semibold tracking-widest text-[var(--color-text-tertiary)] uppercase"
          aria-hidden="true"
        >
          — Paso 04 —
        </p>
        <div className="mb-3 flex flex-wrap items-center justify-center gap-2">
          <span
            className="rounded-full px-3 py-1 text-xs font-bold tracking-wider"
            style={{ background: sector.bgAccent, border: `1px solid ${sector.borderColor}` }}
          >
            <span className={sector.color}>{sector.label}</span>
          </span>
          <ChevronRight
            size={12}
            className="text-[var(--color-text-tertiary)]"
            aria-hidden="true"
          />
          <span className="rounded-full border border-[var(--color-border-default)] bg-[var(--color-bg-elevated)] px-3 py-1 text-xs text-[var(--color-text-secondary)]">
            {asset.label}
          </span>
          <ChevronRight
            size={12}
            className="text-[var(--color-text-tertiary)]"
            aria-hidden="true"
          />
          <span className="rounded-full border border-[var(--color-border-default)] bg-[var(--color-bg-elevated)] px-3 py-1 text-xs text-[var(--color-text-secondary)]">
            {area.label}
          </span>
        </div>
        <Heading as="h2" size="2xl" align="center">
          Tipo de Contaminación
        </Heading>
        <Text align="center" className="mx-auto mt-3 max-w-lg">
          Identifique el tipo de contaminante presente. Esta información determinará el protocolo de
          ingeniería recomendado.
        </Text>
      </div>

      <div
        className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
        role="list"
        aria-label="Tipos de contaminación disponibles"
      >
        {CONTAMINATION_TYPES.map((contam) => {
          const sev = SEVERITY_CONFIG[contam.severity];
          return (
            <motion.div
              key={contam.id}
              role="listitem"
              whileHover={{ y: -2, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.98 }}
            >
              <button
                className={cn(
                  "glass glass-hover group relative w-full overflow-hidden rounded-xl p-4 text-left",
                  "border border-[rgba(255,255,255,0.08)] transition-all duration-300",
                  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-primary)]",
                )}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = sector.borderColor;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
                }}
                onClick={() => onSelect(contam)}
                aria-label={`Contaminación: ${contam.label} — Nivel ${sev.label}`}
              >
                <div className="mb-2 flex items-start justify-between gap-2">
                  <AlertTriangle
                    size={14}
                    className={cn(sev.color, "mt-0.5 shrink-0")}
                    aria-hidden="true"
                  />
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-[10px] font-bold tracking-wide uppercase",
                      sev.color,
                    )}
                    style={{ background: sev.bg }}
                  >
                    {sev.label}
                  </span>
                </div>
                <p className="text-sm font-medium text-[var(--color-text-primary)]">
                  {contam.label}
                </p>
              </button>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-6 flex justify-start">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-brand-primary)] focus-visible:outline-2 focus-visible:outline-[var(--color-brand-primary)]"
          aria-label="Volver a selección de área"
        >
          <ArrowLeft size={14} aria-hidden="true" />
          Cambiar área
        </button>
      </div>
    </div>
  );
}

// ─── Engineering Result Panel ─────────────────────────────────────────────────

interface ResultFieldProps {
  icon: LucideIcon;
  label: string;
  value: string | string[];
  accent?: string;
}

function ResultField({
  icon: Icon,
  label,
  value,
  accent = "var(--color-brand-primary)",
}: ResultFieldProps) {
  return (
    <div className="rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)] p-4">
      <div className="mb-2 flex items-center gap-2">
        <Icon size={14} style={{ color: accent }} aria-hidden="true" />
        <span className="text-xs font-semibold tracking-widest text-[var(--color-text-tertiary)] uppercase">
          {label}
        </span>
        <span className="ml-auto rounded-full bg-[rgba(255,165,0,0.15)] px-2 py-0.5 text-[9px] font-bold tracking-widest text-[var(--color-brand-warning)] uppercase">
          DEMO
        </span>
      </div>
      {Array.isArray(value) ? (
        <ul className="space-y-1">
          {value.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-sm text-[var(--color-text-secondary)]"
            >
              <span
                className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ background: accent }}
                aria-hidden="true"
              />
              {item}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-[var(--color-text-secondary)]">{value}</p>
      )}
    </div>
  );
}

function EngineeringResultPanel({
  sector,
  asset,
  area,
  contamination,
  onReset,
}: {
  sector: Sector;
  asset: Asset;
  area: AreaOption;
  contamination: ContaminationOption;
  onReset: () => void;
}) {
  const result = generateEngineeringResult(sector, asset, area, contamination);
  const sev = SEVERITY_CONFIG[contamination.severity];

  return (
    <div>
      {/* Header */}
      <div className="mb-8 text-center">
        <p
          className="mb-2 text-xs font-semibold tracking-widest text-[var(--color-text-tertiary)] uppercase"
          aria-hidden="true"
        >
          — Diagnóstico de Ingeniería —
        </p>
        <div className="mb-3 flex flex-wrap items-center justify-center gap-2">
          <span
            className="rounded-full px-3 py-1 text-xs font-bold tracking-wider"
            style={{ background: sector.bgAccent, border: `1px solid ${sector.borderColor}` }}
          >
            <span className={sector.color}>{sector.label}</span>
          </span>
          <ChevronRight
            size={12}
            className="text-[var(--color-text-tertiary)]"
            aria-hidden="true"
          />
          <span className="text-xs text-[var(--color-text-tertiary)]">{asset.label}</span>
          <ChevronRight
            size={12}
            className="text-[var(--color-text-tertiary)]"
            aria-hidden="true"
          />
          <span className="text-xs text-[var(--color-text-tertiary)]">{area.label}</span>
          <ChevronRight
            size={12}
            className="text-[var(--color-text-tertiary)]"
            aria-hidden="true"
          />
          <span className={cn("text-xs font-medium", sev.color)}>{contamination.label}</span>
        </div>
        <Heading as="h2" size="2xl" align="center">
          Protocolo de Ingeniería
        </Heading>
        <Text align="center" className="mx-auto mt-3 max-w-lg">
          Panel de diagnóstico preliminar generado por OVI Laboratorio de Soluciones. Todas las
          recomendaciones son de carácter demostrativo.
        </Text>
      </div>

      {/* Main result card */}
      <div
        className="glass overflow-hidden rounded-2xl"
        style={{ border: `1px solid ${sector.borderColor}`, boxShadow: sector.glow }}
        role="region"
        aria-label="Panel de diagnóstico de ingeniería"
      >
        {/* Panel header bar */}
        <div
          className="flex items-center justify-between border-b border-[var(--color-border-subtle)] px-6 py-4"
          style={{ background: sector.bgAccent }}
        >
          <div className="flex items-center gap-3">
            <Wrench size={16} className={sector.color} aria-hidden="true" />
            <span className="text-sm font-bold text-[var(--color-text-primary)]">
              OVI LABORATORIO DE SOLUCIONES — Diagnóstico Preliminar
            </span>
          </div>
          <span className="rounded-full bg-[rgba(255,165,0,0.2)] px-3 py-1 text-xs font-bold tracking-widest text-[var(--color-brand-warning)] uppercase">
            DEMO
          </span>
        </div>

        <div className="grid gap-4 p-6 lg:grid-cols-2">
          <ResultField
            icon={AlertTriangle}
            label="Desafío Detectado"
            value={result.challenge}
            accent="var(--color-brand-danger)"
          />
          <ResultField
            icon={Cpu}
            label="Protocolo Recomendado"
            value={result.protocol}
            accent="var(--color-brand-primary)"
          />
          <ResultField
            icon={FlaskConical}
            label="Productos Sugeridos"
            value={result.products}
            accent="var(--color-brand-accent)"
          />
          <ResultField
            icon={Wrench}
            label="Equipamiento Sugerido"
            value={result.equipment}
            accent="var(--color-brand-secondary)"
          />
          <ResultField
            icon={Droplets}
            label="Dilución Estimada"
            value={result.dilution}
            accent="var(--color-brand-primary)"
          />
          <ResultField
            icon={Clock}
            label="Tiempo de Ejecución"
            value={result.executionTime}
            accent="var(--color-brand-warning)"
          />
          <ResultField
            icon={Leaf}
            label="Impacto Ambiental Estimado"
            value={result.environmentalImpact}
            accent="var(--color-brand-accent)"
          />
          <ResultField
            icon={CheckCircle2}
            label="Servicio Recomendado"
            value={result.recommendedService}
            accent="var(--color-brand-primary)"
          />
        </div>
      </div>

      {/* OVI AI Teaser */}
      <div className="mt-6 overflow-hidden rounded-2xl border border-[rgba(0,196,255,0.2)] bg-[rgba(0,196,255,0.05)]">
        <div className="flex items-start gap-4 p-5">
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
            style={{ background: "rgba(0,196,255,0.12)", border: "1px solid rgba(0,196,255,0.25)" }}
            aria-hidden="true"
          >
            <Bot size={18} className="text-[var(--color-brand-primary)]" />
          </div>
          <div className="flex-1">
            <p className="mb-1 text-sm font-bold text-[var(--color-brand-primary)]">OVI AI</p>
            <p className="text-sm text-[var(--color-text-secondary)]">
              OVI AI analizará el desafío operacional en profundidad y recomendará la mejor
              estrategia de ingeniería para su operación específica. Disponible próximamente con
              análisis contextual avanzado y optimización continua de protocolos.
            </p>
            <Link
              href="/ovi-ai"
              className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-[var(--color-brand-primary)] hover:underline focus-visible:outline-2 focus-visible:outline-[var(--color-brand-primary)]"
            >
              Conocer OVI AI
              <ArrowRight size={12} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>

      {/* OVI Store Conceptual */}
      <div className="mt-4 overflow-hidden rounded-2xl border border-[rgba(0,255,133,0.2)] bg-[rgba(0,255,133,0.04)]">
        <div className="flex items-start gap-4 p-5">
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
            style={{ background: "rgba(0,255,133,0.1)", border: "1px solid rgba(0,255,133,0.25)" }}
            aria-hidden="true"
          >
            <ShoppingCart size={18} className="text-[var(--color-brand-accent)]" />
          </div>
          <div className="flex-1">
            <p className="mb-1 text-sm font-bold text-[var(--color-brand-accent)]">
              OVI Catálogo Técnico
            </p>
            <p className="text-sm text-[var(--color-text-secondary)]">
              Los productos y equipos recomendados en este diagnóstico estarán disponibles en OVI
              Catálogo Técnico para consulta técnica. Integración futura — sin implementación de
              comercio electrónico en esta versión.
            </p>
            <p className="mt-2 inline-block rounded-full border border-[rgba(0,255,133,0.3)] px-3 py-0.5 text-[10px] font-semibold tracking-widest text-[var(--color-brand-accent)] uppercase">
              Próximamente
            </p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <button
          onClick={onReset}
          className="flex items-center gap-2 rounded-lg border border-[var(--color-border-default)] bg-transparent px-5 py-2.5 text-sm font-medium text-[var(--color-text-secondary)] transition-all duration-200 hover:border-[var(--color-brand-primary)] hover:text-[var(--color-brand-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-primary)]"
          aria-label="Iniciar nueva simulación"
        >
          <RotateCcw size={14} aria-hidden="true" />
          Nueva simulación
        </button>
        <Link href="/contact">
          <span className="inline-flex h-10 items-center gap-2 rounded-lg bg-[var(--color-brand-primary)] px-6 text-sm font-medium text-[var(--color-text-inverse)] transition-all duration-200 hover:shadow-[var(--shadow-glow-primary)] hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-primary)] active:scale-[0.98]">
            Contactar a OVI
            <ArrowRight size={14} aria-hidden="true" />
          </span>
        </Link>
      </div>
    </div>
  );
}

// ─── Main Workspace ───────────────────────────────────────────────────────────

export function SolutionLabWorkspace() {
  const prefersReducedMotion = useReducedMotion();
  const variants = prefersReducedMotion ? reducedPanelVariants : panelVariants;

  const [step, setStep] = React.useState<SimStep>("sector");
  const [state, setState] = React.useState<SimState>({
    sector: null,
    asset: null,
    area: null,
    contamination: null,
  });
  const [completedSteps, setCompletedSteps] = React.useState<Set<SimStep>>(new Set());

  const markCompleted = (s: SimStep) => setCompletedSteps((prev) => new Set([...prev, s]));

  const handleSectorSelect = (sector: Sector) => {
    setState((s) => ({ ...s, sector, asset: null, area: null, contamination: null }));
    markCompleted("sector");
    setStep("asset");
  };

  const handleAssetSelect = (asset: Asset) => {
    setState((s) => ({ ...s, asset, area: null, contamination: null }));
    markCompleted("asset");
    setStep("area");
  };

  const handleAreaSelect = (area: AreaOption) => {
    setState((s) => ({ ...s, area, contamination: null }));
    markCompleted("area");
    setStep("contamination");
  };

  const handleContaminationSelect = (contamination: ContaminationOption) => {
    setState((s) => ({ ...s, contamination }));
    markCompleted("contamination");
    setStep("result");
  };

  const handleReset = () => {
    setState({ sector: null, asset: null, area: null, contamination: null });
    setCompletedSteps(new Set());
    setStep("sector");
  };

  return (
    <div
      className="overflow-hidden rounded-3xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-surface)]"
      role="main"
      aria-label="OVI Laboratorio de Soluciones — Simulador de Ingeniería en Limpieza"
    >
      {/* Top bar */}
      <div className="flex items-center justify-between border-b border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)] px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5" aria-hidden="true">
            <div className="h-3 w-3 rounded-full bg-[rgba(255,255,255,0.1)]" />
            <div className="h-3 w-3 rounded-full bg-[rgba(255,255,255,0.1)]" />
            <div className="h-3 w-3 rounded-full bg-[rgba(255,255,255,0.1)]" />
          </div>
          <span className="text-xs font-semibold tracking-widest text-[var(--color-text-tertiary)] uppercase">
            OVI LABORATORIO DE SOLUCIONES — Centro digital de operaciones
          </span>
        </div>
        <div
          className="flex items-center gap-1.5 rounded-full bg-[rgba(0,196,255,0.08)] px-3 py-1"
          aria-label="Estado: Simulador activo"
        >
          <span
            className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--color-brand-accent)]"
            aria-hidden="true"
          />
          <span className="text-[10px] font-semibold tracking-widest text-[var(--color-brand-primary)] uppercase">
            LIVE
          </span>
        </div>
      </div>

      {/* Workspace body */}
      <div className="p-6 md:p-8">
        <StepIndicator currentStep={step} completedSteps={completedSteps} />

        <AnimatePresence mode="wait">
          {step === "sector" && (
            <motion.div
              key="sector"
              variants={variants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <SectorSelection onSelect={handleSectorSelect} />
            </motion.div>
          )}

          {step === "asset" && state.sector && (
            <motion.div
              key="asset"
              variants={variants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <AssetSelection
                sector={state.sector}
                onSelect={handleAssetSelect}
                onBack={() => setStep("sector")}
              />
            </motion.div>
          )}

          {step === "area" && state.sector && state.asset && (
            <motion.div
              key="area"
              variants={variants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <AreaSelection
                sector={state.sector}
                asset={state.asset}
                onSelect={handleAreaSelect}
                onBack={() => setStep("asset")}
              />
            </motion.div>
          )}

          {step === "contamination" && state.sector && state.asset && state.area && (
            <motion.div
              key="contamination"
              variants={variants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <ContaminationSelection
                sector={state.sector}
                asset={state.asset}
                area={state.area}
                onSelect={handleContaminationSelect}
                onBack={() => setStep("area")}
              />
            </motion.div>
          )}

          {step === "result" &&
            state.sector &&
            state.asset &&
            state.area &&
            state.contamination && (
              <motion.div
                key="result"
                variants={variants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <EngineeringResultPanel
                  sector={state.sector}
                  asset={state.asset}
                  area={state.area}
                  contamination={state.contamination}
                  onReset={handleReset}
                />
              </motion.div>
            )}
        </AnimatePresence>
      </div>
    </div>
  );
}
