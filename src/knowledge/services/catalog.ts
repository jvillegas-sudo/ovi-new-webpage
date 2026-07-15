/**
 * OVI Knowledge Base — Services Catalog
 * FASE 1 · Foundation Order 001
 *
 * Official services registry. Data sourced from store-data.ts,
 * ProductsPage.tsx, and ovi-ai-engine.ts references.
 */

import type { OviService } from "../types";

export const services: OviService[] = [
  {
    id: "lavado-flota",
    nombre: "Servicio de Lavado de Flota",
    resumen:
      "Lavado técnico de vehículos de carga, flota pesada y transporte público con protocolos estandarizados y gestión de aguas residuales.",
    descripcion:
      "Servicio de lavado técnico con protocolos adaptados al tipo de flota y carga contaminante. Personal certificado, informe de intervención y gestión adecuada de aguas de proceso según normativa ambiental.",
    sectores: ["transporte"],
    beneficios: [
      "Reducción del tiempo de ciclo por unidad",
      "Estandarización del resultado entre operadores",
      "Registro fotográfico y trazabilidad de cada intervención",
      "Gestión de aguas residuales dentro de normativa",
    ],
    problemasQueResuelve: [
      "Variabilidad en calidad de lavado por operador",
      "Consumo de agua no controlado",
      "Ausencia de documentación de intervenciones",
      "Gestión inadecuada de efluentes",
    ],
    equiposNecesarios: ["ovi-flota-rinse-arch", "ovi-dose-control-cart"],
    productosAsociados: ["ovi-biodex"],
    protocolosAsociados: ["protocolo-p-001", "protocolo-p-003"],
    galeria: [],
    entregables: [
      "Informe de intervención por unidad",
      "Registro fotográfico antes/después",
      "Reporte de consumo de agua y producto",
    ],
    status: "activo",
  },
  {
    id: "limpieza-industrial",
    nombre: "Servicio de Limpieza Industrial",
    resumen:
      "Limpieza integral de plantas de manufactura e instalaciones industriales con diagnóstico, protocolo y ejecución trazable.",
    descripcion:
      "Servicio integral que abarca diagnóstico técnico previo, diseño de protocolo, ejecución con personal especializado y reporte post-intervención con evidencias y KPIs. Coordinación con producción para mínimo impacto operativo.",
    sectores: ["industria", "alimentos", "energia"],
    beneficios: [
      "Protocolo diseñado para el contaminante y la superficie específica",
      "Mínimo impacto en continuidad productiva",
      "Reportes post-intervención con evidencias y KPIs",
      "Compatibilidad con normativas HACCP y BPM",
    ],
    problemasQueResuelve: [
      "Limpieza reactiva sin protocolo documentado",
      "Contaminación que afecta calidad del producto",
      "Falta de trazabilidad en intervenciones de higiene",
      "Incumplimiento de normativas de inocuidad",
    ],
    equiposNecesarios: ["ovi-precision-foam-kit", "ovi-dose-control-cart"],
    productosAsociados: ["ovi-biodex", "ovi-ecoseal"],
    protocolosAsociados: ["protocolo-p-010", "protocolo-p-011", "protocolo-g-003"],
    galeria: [],
    entregables: [
      "Diagnóstico técnico de puntos críticos",
      "Protocolo documentado y auditable",
      "Reporte post-intervención con KPIs",
      "Registro fotográfico y de consumo",
    ],
    status: "activo",
  },
  {
    id: "auditoria-patio",
    nombre: "Auditoría de Patio",
    resumen:
      "Evaluación técnica de operaciones de lavado y mantenimiento en patios de flota para identificar oportunidades de eficiencia.",
    descripcion:
      "Levantamiento técnico in situ de los procesos de lavado, consumo hídrico, dosificación de productos y gestión de residuos. Entrega de informe con hallazgos y plan de mejora.",
    sectores: ["transporte"],
    beneficios: [
      "Identificación de pérdidas ocultas en agua y producto",
      "Benchmarking contra mejores prácticas del sector",
      "Base objetiva para decisiones de inversión",
    ],
    problemasQueResuelve: [
      "Desconocimiento del costo real de operación de lavado",
      "Variabilidad en calidad y tiempo de ciclo",
      "Falta de base para mejorar protocolos",
    ],
    equiposNecesarios: [],
    productosAsociados: [],
    protocolosAsociados: [],
    galeria: [],
    entregables: [
      "Informe de diagnóstico operacional",
      "Mapa de flujo de proceso actual",
      "Plan de mejora con prioridades",
    ],
    status: "activo",
  },
  {
    id: "optimizacion-hidrica",
    nombre: "Optimización Hídrica",
    resumen:
      "Diseño e implementación de medidas para reducir el consumo de agua en operaciones de lavado técnico.",
    descripcion:
      "Servicio de ingeniería enfocado en medir, analizar y reducir el consumo de agua por ciclo. Incluye selección de tecnología, diseño de protocolo y medición de resultados.",
    sectores: ["transporte", "industria"],
    beneficios: [
      "Reducción medible del consumo de agua por ciclo",
      "Menor costo operativo de suministro y tratamiento",
      "Cumplimiento de estándares ambientales",
    ],
    problemasQueResuelve: [
      "Alto consumo hídrico sin métricas de referencia",
      "Incumplimiento de compromisos ambientales corporativos",
      "Costos crecientes de agua en operaciones de lavado",
    ],
    equiposNecesarios: ["ovi-flota-rinse-arch", "ovi-dose-control-cart"],
    productosAsociados: ["ovi-biodex"],
    protocolosAsociados: ["protocolo-p-001"],
    galeria: [],
    entregables: [
      "Línea base de consumo hídrico documentada",
      "Protocolo optimizado con métricas objetivo",
      "Reporte de ahorro obtenido",
    ],
    status: "activo",
  },
  {
    id: "diagnostico-tecnico",
    nombre: "Diagnóstico Técnico de Suciedad y Proceso",
    resumen:
      "Caracterización técnica de los contaminantes presentes y evaluación del proceso de limpieza actual para diseñar soluciones a la medida.",
    descripcion:
      "Visita técnica para identificar tipo, distribución y severidad de los contaminantes. Evaluación de superficies, equipos y productos actuales. Base para el diseño de soluciones y protocolos.",
    sectores: ["industria", "transporte", "alimentos", "hospitales"],
    beneficios: [
      "Soluciones diseñadas para el contaminante real",
      "Eliminación de sobredosificación innecesaria",
      "Reducción de reclamos y re-intervenciones",
    ],
    problemasQueResuelve: [
      "Uso de productos genéricos sin caracterización del problema",
      "Persistencia de suciedad después de intervenciones",
      "Falta de base técnica para selección de insumos",
    ],
    equiposNecesarios: [],
    productosAsociados: [],
    protocolosAsociados: [],
    galeria: [],
    entregables: [
      "Informe de caracterización de contaminantes",
      "Evaluación de superficie y compatibilidad",
      "Propuesta de solución con productos y protocolo recomendado",
    ],
    status: "activo",
  },
  {
    id: "capacitacion-personal",
    nombre: "Capacitación Operativa",
    resumen:
      "Entrenamiento técnico del personal de limpieza en uso correcto de productos, equipos y protocolos OVI.",
    descripcion:
      "Programa de capacitación in situ para equipos operativos. Incluye manejo seguro de productos, uso correcto de equipos, ejecución de protocolos y registro de intervenciones.",
    sectores: ["transporte", "industria", "institucional", "hospitales", "alimentos"],
    beneficios: [
      "Reducción de errores de dosificación y aplicación",
      "Mayor consistencia en resultados",
      "Personal certificado con competencias documentadas",
    ],
    problemasQueResuelve: [
      "Variabilidad en resultados por falta de entrenamiento",
      "Riesgos de seguridad por mal manejo de químicos",
      "Alto costo de re-trabajo por aplicación incorrecta",
    ],
    equiposNecesarios: ["ovi-dose-control-cart"],
    productosAsociados: [],
    protocolosAsociados: [],
    galeria: [],
    entregables: [
      "Certificación de asistencia por participante",
      "Material de referencia operativa",
      "Evaluación de competencias post-capacitación",
    ],
    status: "activo",
  },
  {
    id: "diseno-protocolo",
    nombre: "Diseño de Protocolo por Sector",
    resumen:
      "Creación de protocolos de limpieza personalizados según sector, activo, contaminante y normativa aplicable.",
    descripcion:
      "Servicio de ingeniería para diseñar protocolos operativos completos: selección de productos, dosificaciones, secuencia de pasos, frecuencia, equipos y criterios de verificación.",
    sectores: ["industria", "institucional", "transporte", "alimentos", "hospitales"],
    beneficios: [
      "Protocolo validado para el contaminante y superficie específica",
      "Reducción de consumo de químicos por optimización",
      "Base documentada para auditoría y trazabilidad",
    ],
    problemasQueResuelve: [
      "Ausencia de procedimientos documentados",
      "Incumplimiento de normativas de higiene o inocuidad",
      "Dependencia del conocimiento tácito del operador",
    ],
    equiposNecesarios: [],
    productosAsociados: [],
    protocolosAsociados: [],
    galeria: [],
    entregables: [
      "Protocolo documentado en formato OVI",
      "Fichas de referencia operativa para personal",
      "Criterios de verificación y registro",
    ],
    status: "activo",
  },
  {
    id: "mantenimiento-preventivo",
    nombre: "Mantenimiento Preventivo de Superficies",
    resumen:
      "Programa de intervenciones planificadas para extender la vida útil y desempeño de superficies críticas.",
    descripcion:
      "Diseño e implementación de un plan de mantenimiento preventivo con ciclos de limpieza y protección calibrados para minimizar re-intervenciones correctivas.",
    sectores: ["energia", "institucional", "retail"],
    beneficios: [
      "Reducción de frecuencia de limpiezas correctivas",
      "Menor consumo acumulado de agua y productos",
      "Protección de la inversión en instalaciones",
    ],
    problemasQueResuelve: [
      "Deterioro acelerado de superficies por falta de mantenimiento",
      "Alto costo de restauraciones por negligencia preventiva",
      "Recontaminación rápida que genera reprocesos frecuentes",
    ],
    equiposNecesarios: ["aplicador-microfibra-tecnica"],
    productosAsociados: ["ovi-ecoseal"],
    protocolosAsociados: ["protocolo-f-002", "protocolo-f-003", "protocolo-e-007"],
    galeria: [],
    entregables: [
      "Plan de mantenimiento preventivo calendario",
      "Protocolo de cada intervención",
      "Registro de estado de superficies",
    ],
    status: "activo",
  },
  {
    id: "implementacion-protocolo",
    nombre: "Implementación Supervisada de Protocolo",
    resumen:
      "Acompañamiento técnico durante la implementación de nuevos protocolos para garantizar la correcta adopción.",
    descripcion:
      "Soporte in situ durante las primeras fases de implementación de un protocolo nuevo. Verificación de ejecución, ajustes en tiempo real y validación de resultados.",
    sectores: ["industria", "transporte", "alimentos"],
    beneficios: [
      "Aceleración de la curva de adopción del nuevo protocolo",
      "Detección temprana de desviaciones",
      "Validación del desempeño en condiciones reales",
    ],
    problemasQueResuelve: [
      "Protocolos diseñados pero no adoptados correctamente",
      "Retroceso a prácticas antiguas tras el primer mes",
      "Falta de validación en condiciones operativas reales",
    ],
    equiposNecesarios: [],
    productosAsociados: [],
    protocolosAsociados: [],
    galeria: [],
    entregables: [
      "Reporte de implementación y desviaciones",
      "Ajustes documentados al protocolo",
      "Certificación de cumplimiento inicial",
    ],
    status: "activo",
  },
  {
    id: "levantamiento-activos",
    nombre: "Levantamiento Técnico de Activos",
    resumen:
      "Inventario y caracterización técnica de los activos físicos a mantener para diseñar intervenciones a medida.",
    descripcion:
      "Levantamiento in situ de activos: tipo, material, estado superficial, exposición ambiental y frecuencia de intervención actual. Base para el diseño del plan de limpieza y protección.",
    sectores: ["energia", "industria", "transporte"],
    beneficios: [
      "Visibilidad completa del parque de activos a gestionar",
      "Priorización de intervenciones por criticidad",
      "Base objetiva para presupuesto de mantenimiento",
    ],
    problemasQueResuelve: [
      "Gestión reactiva de activos sin visibilidad preventiva",
      "Intervenciones no priorizadas que generan desperdicio",
      "Ausencia de historial de estado de los activos",
    ],
    equiposNecesarios: [],
    productosAsociados: [],
    protocolosAsociados: [],
    galeria: [],
    entregables: [
      "Inventario técnico de activos",
      "Mapa de criticidad y prioridad de intervención",
      "Propuesta de plan de mantenimiento",
    ],
    status: "activo",
  },
];
