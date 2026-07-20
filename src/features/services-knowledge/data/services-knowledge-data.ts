import { services as legacyServices } from "@knowledge/services/catalog";
import type { ServiceKnowledge } from "../types/service-knowledge";

interface ServiceKnowledgeEnrichment {
  purpose: string | null;
  technicalBenefits: string[];
  differentiators: string[];
  requiredSkills: string[];
  executionSteps: string[];
  kpis: string[];
  faqs: ServiceKnowledge["faqs"];
  relatedProjects: string[];
  relatedDocuments: string[];
  operationalNotes: string | null;
}

const SERVICES_ENRICHMENT: Record<string, ServiceKnowledgeEnrichment> = {
  "lavado-flota": {
    purpose:
      "Estandarizar el lavado técnico de flota pesada con control operativo de agua, calidad por unidad y trazabilidad de intervención.",
    technicalBenefits: [
      "Protocolos de lavado técnico calibrados por tipo de flota y carga contaminante",
      "Trazabilidad fotográfica y documental por unidad atendida",
      "Control operacional de efluentes y aguas de proceso",
    ],
    differentiators: [
      "Aplicación de protocolo estandarizado en operación real de patio",
      "Integración entre lavado técnico, control hídrico y evidencia documental",
    ],
    requiredSkills: [
      "Diagnóstico de contaminantes en flota pesada",
      "Operación de protocolos de lavado vehicular",
      "Registro técnico de intervención y consumo",
    ],
    executionSteps: [
      "Diagnóstico inicial del tipo de flota, contaminante y riesgo operativo",
      "Definición del protocolo de lavado y secuencia de intervención",
      "Ejecución técnica con control de dosificación, agua y seguridad",
      "Cierre con evidencia fotográfica e informe por unidad",
    ],
    kpis: [
      "Tiempo de ciclo por unidad",
      "Consumo de agua por unidad atendida",
      "Variabilidad de resultado entre operadores",
      "Tasa de intervenciones documentadas",
    ],
    faqs: [
      {
        question: "¿Qué problema principal resuelve el servicio de lavado de flota?",
        answer:
          "Resuelve variabilidad de lavado, consumo hídrico no controlado y falta de trazabilidad en patios de flota.",
      },
    ],
    relatedProjects: ["CASE-001"],
    relatedDocuments: [
      "docs/content/OVI_CONTENT_MASTER.md#1-casos-de-exito",
      "public/ovi-dam/metadata/CASE-001-IMG-01.json",
    ],
    operationalNotes:
      "Servicio orientado a operación continua de flota con métricas de ciclo y control de consumo.",
  },
  "limpieza-industrial": {
    purpose:
      "Diseñar y ejecutar limpieza industrial trazable en plantas con mínimo impacto productivo y cumplimiento de inocuidad.",
    technicalBenefits: [
      "Diseño de protocolo por contaminante y superficie",
      "Evidencia operativa con KPIs post-intervención",
      "Compatibilidad con lineamientos HACCP y BPM",
    ],
    differentiators: [
      "Inicio obligatorio con diagnóstico técnico previo",
      "Ejecución coordinada con producción para continuidad operativa",
    ],
    requiredSkills: [
      "Diagnóstico técnico en planta",
      "Diseño de protocolo para líneas de producción",
      "Lectura de indicadores operativos y de inocuidad",
    ],
    executionSteps: [
      "Diagnóstico técnico de puntos críticos",
      "Diseño del protocolo por activo y contaminante",
      "Ejecución técnica con personal especializado",
      "Reporte post-intervención con evidencia y KPIs",
    ],
    kpis: [
      "Cumplimiento del protocolo documentado",
      "Incidencia de recontaminación post-limpieza",
      "Tiempo de intervención por área crítica",
      "Trazabilidad de intervenciones realizadas",
    ],
    faqs: [
      {
        question: "¿Qué diferencia a la limpieza industrial de OVI?",
        answer:
          "Parte de diagnóstico técnico, protocolo específico por contaminante y reporte con evidencia verificable.",
      },
    ],
    relatedProjects: ["CASE-002"],
    relatedDocuments: ["docs/content/OVI_CONTENT_MASTER.md#1-casos-de-exito"],
    operationalNotes:
      "Servicio orientado a plantas de manufactura, alimentos y energía con coordinación operativa.",
  },
  "auditoria-patio": {
    purpose:
      "Evaluar técnicamente patios de flota para identificar pérdidas de eficiencia, variabilidad de calidad y oportunidades de optimización.",
    technicalBenefits: [
      "Línea base técnica de consumo hídrico y dosificación",
      "Mapa de flujo operativo actual con cuellos de botella",
    ],
    differentiators: [
      "Levantamiento in situ con enfoque de ingeniería operativa",
      "Plan de mejora priorizado con evidencia de hallazgos",
    ],
    requiredSkills: [
      "Auditoría de procesos de lavado",
      "Análisis de consumo de agua y producto",
      "Documentación de brechas operativas",
    ],
    executionSteps: [
      "Levantamiento de proceso en campo",
      "Medición de consumo y variabilidad de resultados",
      "Análisis comparativo frente a mejores prácticas",
      "Entrega de plan de mejora priorizado",
    ],
    kpis: [
      "Consumo hídrico por ciclo",
      "Variabilidad de tiempo de ciclo",
      "Número de hallazgos críticos por patio",
    ],
    faqs: [
      {
        question: "¿Qué entrega una auditoría de patio?",
        answer:
          "Entrega informe de diagnóstico operacional, mapa de flujo actual y plan de mejora con prioridades.",
      },
    ],
    relatedProjects: [],
    relatedDocuments: ["docs/content/OVI_CONTENT_MASTER.md#3-servicios"],
    operationalNotes:
      "Servicio de diagnóstico para preparar iniciativas de optimización hídrica y protocolo.",
  },
  "optimizacion-hidrica": {
    purpose:
      "Reducir el consumo de agua por ciclo de limpieza mediante diseño de protocolo, tecnología y medición de resultados.",
    technicalBenefits: [
      "Métricas comparables antes/después por ciclo",
      "Optimización de tecnología y secuencia de lavado",
    ],
    differentiators: [
      "Diseño basado en medición operativa, no en estimaciones",
      "Integración de control de consumo con desempeño de limpieza",
    ],
    requiredSkills: [
      "Ingeniería de procesos de lavado",
      "Medición y análisis de consumo hídrico",
      "Diseño de protocolos de bajo consumo",
    ],
    executionSteps: [
      "Definición de línea base de consumo por ciclo",
      "Análisis técnico de variables de proceso",
      "Diseño e implementación del protocolo optimizado",
      "Verificación de ahorro y documentación de resultados",
    ],
    kpis: [
      "Consumo de agua por ciclo",
      "Ahorro hídrico porcentual",
      "Costo operativo asociado al consumo de agua",
    ],
    faqs: [
      {
        question: "¿Cómo se demuestra la optimización hídrica?",
        answer:
          "Con línea base documentada, protocolo optimizado y reporte de ahorro medible en operación.",
      },
    ],
    relatedProjects: ["CASE-001"],
    relatedDocuments: ["docs/content/OVI_CONTENT_MASTER.md#1-casos-de-exito"],
    operationalNotes:
      "Servicio aplicable en transporte e industria con metas explícitas de ahorro.",
  },
  "diagnostico-tecnico": {
    purpose:
      "Caracterizar contaminantes y proceso actual para definir soluciones y protocolos alineados al problema real.",
    technicalBenefits: [
      "Caracterización técnica de severidad y tipo de contaminante",
      "Base objetiva para seleccionar producto y protocolo",
    ],
    differentiators: [
      "Diagnóstico como punto de partida obligatorio antes de recomendar",
      "Evaluación de superficie, compatibilidad y condiciones de proceso",
    ],
    requiredSkills: [
      "Caracterización de suciedad industrial",
      "Evaluación de compatibilidad de superficies",
      "Diseño de recomendaciones técnicas",
    ],
    executionSteps: [
      "Visita técnica y levantamiento de condiciones operativas",
      "Caracterización de contaminantes y superficies",
      "Evaluación del proceso actual de limpieza",
      "Propuesta de solución y protocolo recomendado",
    ],
    kpis: [
      "Número de hallazgos críticos identificados",
      "Tasa de reducción de re-intervenciones tras implementación",
      "Tiempo de respuesta del diagnóstico",
    ],
    faqs: [
      {
        question: "¿Por qué OVI inicia con diagnóstico técnico?",
        answer:
          "Porque evita recomendaciones genéricas y permite diseñar soluciones por contaminante y contexto operativo.",
      },
    ],
    relatedProjects: ["CASE-002"],
    relatedDocuments: ["docs/content/OVI_CONTENT_MASTER.md#3-servicios"],
    operationalNotes: "Servicio transversal para industria, transporte, alimentos y hospitales.",
  },
  "capacitacion-personal": {
    purpose:
      "Elevar la consistencia operativa entrenando al personal en uso seguro de productos, equipos y protocolos OVI.",
    technicalBenefits: [
      "Reducción de errores de dosificación y aplicación",
      "Estandarización de ejecución entre operadores",
    ],
    differentiators: [
      "Entrenamiento in situ sobre operación real del cliente",
      "Evaluación de competencias con soporte documental",
    ],
    requiredSkills: [
      "Formación operativa en campo",
      "Manejo seguro de químicos",
      "Ejecución y registro de protocolo",
    ],
    executionSteps: [
      "Diagnóstico del nivel operativo del equipo",
      "Capacitación técnica práctica por protocolo",
      "Evaluación de competencias post-capacitación",
      "Entrega de material de referencia y certificación",
    ],
    kpis: [
      "Tasa de aprobación de competencias",
      "Disminución de errores operativos",
      "Nivel de adopción del protocolo",
    ],
    faqs: [
      {
        question: "¿Qué incluye la capacitación operativa de OVI?",
        answer:
          "Incluye manejo seguro de productos, uso de equipos, ejecución de protocolos y evaluación de competencias.",
      },
    ],
    relatedProjects: [],
    relatedDocuments: ["docs/content/OVI_CONTENT_MASTER.md#3-servicios"],
    operationalNotes: "Servicio orientado a estandarización operativa y reducción de reprocesos.",
  },
  "diseno-protocolo": {
    purpose:
      "Crear protocolos sectoriales de limpieza con secuencia, dosificación, frecuencia y verificación técnica.",
    technicalBenefits: [
      "Protocolos auditables por activo, contaminante y superficie",
      "Reducción de consumo por optimización de secuencia y dosificación",
    ],
    differentiators: [
      "Diseño de protocolo con criterios de ingeniería y trazabilidad",
      "Integración de criterios de inocuidad e higiene aplicable",
    ],
    requiredSkills: [
      "Diseño metodológico de protocolos",
      "Selección técnica de productos y equipos",
      "Definición de criterios de verificación",
    ],
    executionSteps: [
      "Definición de alcance por sector y activo",
      "Selección de producto, dosificación y secuencia",
      "Documentación del protocolo operativo",
      "Definición de registros y criterios de control",
    ],
    kpis: [
      "Cumplimiento del protocolo por ciclo",
      "Variabilidad de resultado entre operadores",
      "Consumo de producto por intervención",
    ],
    faqs: [
      {
        question: "¿Qué contiene un protocolo por sector de OVI?",
        answer:
          "Incluye selección de productos, dosificación, secuencia de pasos, frecuencia y criterios de verificación.",
      },
    ],
    relatedProjects: ["CASE-002", "CASE-003"],
    relatedDocuments: ["docs/content/OVI_CONTENT_MASTER.md#3-servicios"],
    operationalNotes: "Servicio base para estandarización, auditoría y continuidad operativa.",
  },
  "mantenimiento-preventivo": {
    purpose:
      "Extender la vida útil de superficies críticas mediante ciclos planificados de limpieza y protección.",
    technicalBenefits: [
      "Disminución de limpiezas correctivas",
      "Extensión del ciclo de mantenimiento",
      "Reducción de consumo acumulado de insumos",
    ],
    differentiators: [
      "Programa calendarizado con trazabilidad por intervención",
      "Integración de limpieza técnica con protección de superficies",
    ],
    requiredSkills: [
      "Diseño de planes preventivos por superficie",
      "Ejecución de protocolos de protección",
      "Seguimiento de estado superficial",
    ],
    executionSteps: [
      "Levantamiento de estado inicial de superficies",
      "Diseño de calendario preventivo",
      "Ejecución periódica de intervenciones",
      "Registro y ajuste del plan según resultados",
    ],
    kpis: [
      "Frecuencia de limpiezas correctivas",
      "Duración del ciclo entre intervenciones",
      "Consumo total de insumos por periodo",
    ],
    faqs: [
      {
        question: "¿Qué resultado busca el mantenimiento preventivo de OVI?",
        answer:
          "Busca reducir correcciones, extender ciclos y proteger superficies con menor consumo de insumos.",
      },
    ],
    relatedProjects: ["CASE-003"],
    relatedDocuments: ["docs/content/OVI_CONTENT_MASTER.md#1-casos-de-exito"],
    operationalNotes:
      "Servicio especialmente aplicable a institucional, retail y energía con enfoque de ciclo de vida.",
  },
  "implementacion-protocolo": {
    purpose:
      "Asegurar adopción correcta de protocolos nuevos mediante acompañamiento técnico en campo.",
    technicalBenefits: [
      "Detección temprana de desviaciones durante arranque",
      "Ajustes documentados en condiciones reales",
    ],
    differentiators: [
      "Acompañamiento in situ en fases críticas de adopción",
      "Validación inicial de desempeño con evidencia operativa",
    ],
    requiredSkills: [
      "Supervisión técnica en campo",
      "Gestión de cambio operativo",
      "Validación de cumplimiento de protocolo",
    ],
    executionSteps: [
      "Plan de arranque del nuevo protocolo",
      "Supervisión en sitio y registro de ejecución",
      "Ajustes técnicos en tiempo real",
      "Cierre con certificación de cumplimiento inicial",
    ],
    kpis: [
      "Tiempo de adopción del protocolo",
      "Desviaciones detectadas por ciclo",
      "Cumplimiento inicial del protocolo",
    ],
    faqs: [
      {
        question: "¿Cuándo se recomienda implementación supervisada?",
        answer:
          "Cuando un protocolo nuevo requiere adopción rápida y controlada en operación real.",
      },
    ],
    relatedProjects: ["CASE-002"],
    relatedDocuments: ["docs/content/OVI_CONTENT_MASTER.md#3-servicios"],
    operationalNotes: "Servicio de transición entre diseño de protocolo y operación estable.",
  },
  "levantamiento-activos": {
    purpose:
      "Construir inventario técnico de activos para priorizar intervenciones y diseñar planes de mantenimiento.",
    technicalBenefits: [
      "Caracterización técnica del parque de activos",
      "Priorización por criticidad y riesgo operativo",
    ],
    differentiators: [
      "Levantamiento in situ orientado a criticidad operativa",
      "Base técnica para presupuestación y planificación preventiva",
    ],
    requiredSkills: [
      "Inventario técnico de activos",
      "Clasificación de criticidad",
      "Diseño de propuestas de mantenimiento",
    ],
    executionSteps: [
      "Levantamiento físico y caracterización técnica",
      "Mapeo de exposición y condición superficial",
      "Clasificación de criticidad",
      "Entrega de plan de mantenimiento propuesto",
    ],
    kpis: [
      "Cobertura del inventario técnico",
      "Activos priorizados por criticidad",
      "Tiempo de actualización del levantamiento",
    ],
    faqs: [
      {
        question: "¿Qué entrega el levantamiento técnico de activos?",
        answer:
          "Entrega inventario técnico, mapa de criticidad y propuesta priorizada de mantenimiento.",
      },
    ],
    relatedProjects: [],
    relatedDocuments: ["docs/content/OVI_CONTENT_MASTER.md#3-servicios"],
    operationalNotes:
      "Servicio base para programas de mantenimiento preventivo en energía e industria.",
  },
};

function createServiceKnowledgeRecord(service: (typeof legacyServices)[number]): ServiceKnowledge {
  const enrichment = SERVICES_ENRICHMENT[service.id];

  return {
    serviceId: service.id,
    officialName: service.nombre,
    shortDescription: service.resumen ?? null,
    businessDescription: service.descripcion ?? null,
    purpose: enrichment?.purpose ?? null,
    customerProblems: [...service.problemasQueResuelve],
    industries: [...service.sectores],
    products: [...service.productosAsociados],
    engineeringProtocols: [...service.protocolosAsociados],
    equipment: [...service.equiposNecesarios],
    deliverables: [...service.entregables],
    relatedProjects: enrichment?.relatedProjects ?? [],
    relatedDocuments: enrichment?.relatedDocuments ?? [],
    relatedCustomers: [],
    images: [],
    videos: [],
    faqs: enrichment?.faqs ?? [],
    operationalNotes: enrichment?.operationalNotes ?? null,
    commercialBenefits: [...service.beneficios],
    technicalBenefits: enrichment?.technicalBenefits ?? [],
    differentiators: enrichment?.differentiators ?? [],
    requiredSkills: enrichment?.requiredSkills ?? [],
    executionSteps: enrichment?.executionSteps ?? [],
    kpis: enrichment?.kpis ?? [],
    publicationStatus: "published",
    verificationStatus: "source_confirmed",
    informationStatus: enrichment ? "partial" : "minimal",
    sourceReferences: [
      {
        sourceType: "knowledge_base_file",
        sourceFile: "src/knowledge/services/catalog.ts",
        sourcePage: null,
        sourceSection: service.id,
        verificationStatus: "source_confirmed",
        internalNote:
          "Service baseline imported from approved knowledge catalog and enriched with official OVI service language.",
      },
      {
        sourceType: "repository_document",
        sourceFile: "docs/content/OVI_CONTENT_MASTER.md",
        sourcePage: null,
        sourceSection: "3. SERVICIOS",
        verificationStatus: "source_confirmed",
        internalNote:
          "Cross-checked service positioning and case/service relationships from official content inventory.",
      },
    ],
    revision: 2,
    version: "1.1.0",
    relationships: {
      productIds: [...service.productosAsociados],
      industryIds: [...service.sectores],
      projectIds: enrichment?.relatedProjects ?? [],
      customerIds: [],
      documentIds: [],
      engineeringProtocolIds: [...service.protocolosAsociados],
      engineeringEquipmentIds: [...service.equiposNecesarios],
      futureTrainingIds: [],
      futureRegulatoryIds: [],
    },
  };
}

export const SERVICE_KNOWLEDGE_REGISTRY: ServiceKnowledge[] = legacyServices.map((service) =>
  createServiceKnowledgeRecord(service),
);

export const SERVICE_KNOWLEDGE_MAP = new Map(
  SERVICE_KNOWLEDGE_REGISTRY.map((service) => [service.serviceId, service]),
);

export const TOTAL_KNOWLEDGE_SERVICES = SERVICE_KNOWLEDGE_REGISTRY.length;
