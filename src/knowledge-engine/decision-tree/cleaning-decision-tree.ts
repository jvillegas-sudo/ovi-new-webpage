/**
 * OVI Knowledge Engine — Cleaning Decision Tree
 * FASE 2 · Foundation Order 002
 *
 * The canonical 8-step decision flow for the OVI reasoning system.
 *
 * FLOW (never invert this order):
 *   1. Industria
 *   2. Activo
 *   3. Zona
 *   4. Material (superficie)
 *   5. Tipo de suciedad
 *   6. Nivel de contaminación
 *   7. Objetivo del cliente
 *   8. Restricciones ambientales
 *
 * The engine then resolves (steps 9–13):
 *   9.  Protocolo recomendado
 *   10. Servicio OVI
 *   11. Productos OVI
 *   12. Equipo recomendado
 *   13. Resultado esperado
 *
 * RULE: The flow always starts from an operational challenge, never from a product.
 */

import type { OviDecisionNode } from "../types";

export const decisionTree: OviDecisionNode[] = [
  // ── Step 1: Industria ──────────────────────────────────────────────────────
  {
    id: "node-industria",
    step: 1,
    question: "¿En qué industria opera el cliente?",
    field: "industryId",
    required: true,
    description:
      "La industria define el contexto normativo, las superficies típicas y los contaminantes habituales. Es el punto de partida de toda recomendación OVI.",
    options: [
      {
        value: "transporte",
        label: "Transporte y Logística",
        nextNodeId: "node-activo",
        hint: "Patios de flota, terminales, centros logísticos, transporte público y de carga.",
      },
      {
        value: "industria",
        label: "Industria y Manufactura",
        nextNodeId: "node-activo",
        hint: "Plantas de manufactura, metalmecánica, líneas de producción.",
      },
      {
        value: "alimentos",
        label: "Industria Alimentaria",
        nextNodeId: "node-activo",
        hint: "Plantas de procesamiento, cocinas industriales, producción alimentaria.",
      },
      {
        value: "hospitales",
        label: "Salud y Hospitalaria",
        nextNodeId: "node-activo",
        hint: "Hospitales, clínicas, centros de salud, áreas críticas de asepsia.",
      },
      {
        value: "energia",
        label: "Energía e Infraestructura",
        nextNodeId: "node-activo",
        hint: "Generadoras, plantas de transmisión, activos energéticos.",
      },
      {
        value: "institucional",
        label: "Institucional y Corporativo",
        nextNodeId: "node-activo",
        hint: "Universidades, edificios corporativos, centros comerciales, alto tráfico.",
      },
      {
        value: "retail",
        label: "Retail y Comercio",
        nextNodeId: "node-activo",
        hint: "Tiendas, centros comerciales, espacios de venta al público.",
      },
    ],
  },

  // ── Step 2: Activo ──────────────────────────────────────────────────────────
  {
    id: "node-activo",
    step: 2,
    question: "¿Qué tipo de activo o instalación se va a limpiar?",
    field: "assetType",
    required: true,
    description:
      "El tipo de activo determina las restricciones físicas de acceso, los equipos aplicables y el protocolo adecuado.",
    options: [
      {
        value: "camion",
        label: "Camión / Vehículo de carga",
        nextNodeId: "node-zona",
        hint: "Flota pesada, semi-remolques, camiones distribución.",
      },
      {
        value: "bus",
        label: "Bus / Transporte público",
        nextNodeId: "node-zona",
        hint: "Buses urbanos, interurbanos, flota de pasajeros.",
      },
      {
        value: "maquinaria-industrial",
        label: "Maquinaria industrial",
        nextNodeId: "node-zona",
        hint: "Prensas, tornos, centros de mecanizado, equipos de proceso.",
      },
      {
        value: "linea-produccion",
        label: "Línea de producción",
        nextNodeId: "node-zona",
        hint: "Cintas transportadoras, estaciones de trabajo, equipos de proceso continuo.",
      },
      {
        value: "piso",
        label: "Piso / Pavimento",
        nextNodeId: "node-zona",
        hint: "Pisos industriales, patios, estacionamientos, pasillos.",
      },
      {
        value: "estructura-metalica",
        label: "Estructura metálica / Fachada",
        nextNodeId: "node-zona",
        hint: "Tanques, silos, estructuras exteriores, fachadas industriales.",
      },
      {
        value: "area-proceso",
        label: "Área de proceso / Planta",
        nextNodeId: "node-zona",
        hint: "Plantas completas, salas de proceso, cámaras frigoríficas.",
      },
      {
        value: "activo-energetico",
        label: "Activo energético",
        nextNodeId: "node-zona",
        hint: "Transformadores, generadores, paneles, subestaciones.",
      },
      {
        value: "area-hospitalaria",
        label: "Área hospitalaria",
        nextNodeId: "node-zona",
        hint: "Pabellones, UCI, pasillos, servicios generales.",
      },
      {
        value: "area-publica",
        label: "Área pública / Corporativa",
        nextNodeId: "node-zona",
        hint: "Lobbies, pasillos, salas de reunión, baños públicos.",
      },
    ],
  },

  // ── Step 3: Zona ────────────────────────────────────────────────────────────
  {
    id: "node-zona",
    step: 3,
    question: "¿Qué zona específica del activo se interviene?",
    field: "zone",
    required: false,
    description:
      "La zona precisa el nivel de acceso, los riesgos de aplicación y si se requieren equipos especiales.",
    options: [
      {
        value: "exterior-carroceria",
        label: "Exterior / Carrocería",
        nextNodeId: "node-material",
        hint: "Superficies externas del activo expuestas al ambiente.",
      },
      {
        value: "motor-compartimento",
        label: "Motor / Compartimento mecánico",
        nextNodeId: "node-material",
        hint: "Zonas con riesgo eléctrico y exposición a aceites y grasas.",
      },
      {
        value: "cabina",
        label: "Cabina / Interior",
        nextNodeId: "node-material",
        hint: "Interiores habitados, superficies de contacto con personas.",
      },
      {
        value: "piso-produccion",
        label: "Piso de producción",
        nextNodeId: "node-material",
        hint: "Suelo de planta industrial, pisos húmedos o con residuos.",
      },
      {
        value: "superficie-proceso",
        label: "Superficie de proceso / Contacto con producto",
        nextNodeId: "node-material",
        hint: "Equipos en contacto con alimentos, fármacos o productos regulados.",
      },
      {
        value: "area-critica-hospitalaria",
        label: "Área crítica hospitalaria",
        nextNodeId: "node-material",
        hint: "UCI, pabellones quirúrgicos, salas de aislamiento.",
      },
      {
        value: "zona-exterior",
        label: "Zona exterior / Intemperie",
        nextNodeId: "node-material",
        hint: "Superficies expuestas a lluvia, sol y condiciones ambientales.",
      },
      {
        value: "infraestructura-civil",
        label: "Infraestructura civil / Muros",
        nextNodeId: "node-material",
        hint: "Paredes, losas, muros perimetrales, cubiertas.",
      },
    ],
  },

  // ── Step 4: Material / Superficie ──────────────────────────────────────────
  {
    id: "node-material",
    step: 4,
    question: "¿Cuál es el material o superficie que se va a tratar?",
    field: "surfaceId",
    required: true,
    description:
      "El material determina la compatibilidad química del producto. Superficies sensibles exigen restricciones de pH y concentración.",
    options: [
      {
        value: "acero-inoxidable",
        label: "Acero inoxidable",
        nextNodeId: "node-suciedad",
        hint: "Baja sensibilidad química. Evitar ácidos fuertes no diluidos.",
      },
      {
        value: "aluminio",
        label: "Aluminio",
        nextNodeId: "node-suciedad",
        hint: "Alta sensibilidad química. Validar compatibilidad antes de aplicar.",
      },
      {
        value: "pintura-automotriz",
        label: "Pintura automotriz",
        nextNodeId: "node-suciedad",
        hint: "Alta sensibilidad. Usar solo productos pH neutro validados para automotriz.",
      },
      {
        value: "pintura-industrial",
        label: "Pintura industrial",
        nextNodeId: "node-suciedad",
        hint: "Media sensibilidad. Verificar compatibilidad con agentes alcalinos.",
      },
      {
        value: "concreto",
        label: "Concreto",
        nextNodeId: "node-suciedad",
        hint: "Baja sensibilidad. Ácidos pueden dañar concreto no sellado.",
      },
      {
        value: "concreto-sellado",
        label: "Concreto sellado",
        nextNodeId: "node-suciedad",
        hint: "Baja sensibilidad. No usar abrasivos. Mayor resistencia química.",
      },
      {
        value: "pisos-sellados",
        label: "Pisos sellados (epoxi / poliuretano)",
        nextNodeId: "node-suciedad",
        hint: "Baja sensibilidad. No usar abrasivos. Preferir pH neutro para mantenimiento diario.",
      },
      {
        value: "ceramica",
        label: "Cerámica",
        nextNodeId: "node-suciedad",
        hint: "Baja sensibilidad. Juntas pueden requerir tratamiento diferenciado.",
      },
      {
        value: "pvc",
        label: "PVC",
        nextNodeId: "node-suciedad",
        hint: "Media sensibilidad. Evitar solventes orgánicos.",
      },
      {
        value: "plastico-tecnico",
        label: "Plástico técnico (ABS, policarbonato)",
        nextNodeId: "node-suciedad",
        hint: "Media sensibilidad. Evitar solventes clorados.",
      },
      {
        value: "vidrio",
        label: "Vidrio",
        nextNodeId: "node-suciedad",
        hint: "Media sensibilidad. Evitar productos con residuo visible.",
      },
      {
        value: "caucho",
        label: "Caucho / Goma",
        nextNodeId: "node-suciedad",
        hint: "Alta sensibilidad. Verificar ficha técnica antes de aplicar.",
      },
    ],
  },

  // ── Step 5: Tipo de suciedad ────────────────────────────────────────────────
  {
    id: "node-suciedad",
    step: 5,
    question: "¿Cuál es el principal tipo de suciedad o contaminante?",
    field: "contaminationId",
    required: true,
    description:
      "El tipo de contaminante es el factor técnico más determinante para la selección del producto y del protocolo.",
    options: [
      {
        value: "grasa-pesada",
        label: "Grasa pesada",
        nextNodeId: "node-nivel",
        hint: "Acumulación densa de lípidos y grasas industriales o mecánicas.",
      },
      {
        value: "aceite",
        label: "Aceite",
        nextNodeId: "node-nivel",
        hint: "Residuos de aceites minerales, hidráulicos o de corte.",
      },
      {
        value: "carbonilla",
        label: "Carbonilla / Hollín",
        nextNodeId: "node-nivel",
        hint: "Partículas de carbono de combustión. Se incrusta en superficies calientes.",
      },
      {
        value: "oxido",
        label: "Óxido / Corrosión",
        nextNodeId: "node-nivel",
        hint: "Oxidación de metales ferrosos. Requiere agentes ácidos controlados.",
      },
      {
        value: "biofilm",
        label: "Biofilm microbiano",
        nextNodeId: "node-nivel",
        hint: "Película bacteriana adherente. Riesgo sanitario en alimentos y hospitales.",
      },
      {
        value: "sarro",
        label: "Sarro / Depósitos calcáreos",
        nextNodeId: "node-nivel",
        hint: "Minerales de agua dura. Frecuente en superficies con agua o vapor.",
      },
      {
        value: "lodo",
        label: "Lodo / Tierra",
        nextNodeId: "node-nivel",
        hint: "Mezcla de tierra, agua y orgánicos. Zonas exteriores y patios.",
      },
      {
        value: "polvo-industrial",
        label: "Polvo industrial",
        nextNodeId: "node-nivel",
        hint: "Partículas finas de manufactura, minería o corte.",
      },
      {
        value: "residuos-organicos",
        label: "Residuos orgánicos",
        nextNodeId: "node-nivel",
        hint: "Materia orgánica alimentaria, biológica o vegetal.",
      },
      {
        value: "residuos-quimicos",
        label: "Residuos químicos",
        nextNodeId: "node-nivel",
        hint: "Solventes, reactivos o químicos industriales residuales.",
      },
      {
        value: "recontaminacion-superficial",
        label: "Recontaminación superficial rápida",
        nextNodeId: "node-nivel",
        hint: "Polvo, humedad o marcas de tráfico sobre superficie recién limpiada.",
      },
    ],
  },

  // ── Step 6: Nivel de contaminación ─────────────────────────────────────────
  {
    id: "node-nivel",
    step: 6,
    question: "¿Cuál es el nivel de contaminación presente?",
    field: "contaminationLevel",
    required: true,
    description:
      "El nivel de contaminación determina la dilución, el tiempo de contacto y la agresividad del protocolo requerido.",
    options: [
      {
        value: "leve",
        label: "Leve",
        nextNodeId: "node-objetivo",
        hint: "Acumulación reciente, sin adherencia significativa. Diluciones estándar.",
      },
      {
        value: "moderado",
        label: "Moderado",
        nextNodeId: "node-objetivo",
        hint: "Acumulación notable con cierta adherencia. Requiere tiempo de contacto ampliado.",
      },
      {
        value: "severo",
        label: "Severo",
        nextNodeId: "node-objetivo",
        hint: "Acumulación densa y adherida. Concentraciones altas, posible doble pasada.",
      },
      {
        value: "crítico",
        label: "Crítico",
        nextNodeId: "node-objetivo",
        hint: "Contaminación extrema o de larga data. Intervención correctiva especializada.",
      },
    ],
  },

  // ── Step 7: Objetivo del cliente ────────────────────────────────────────────
  {
    id: "node-objetivo",
    step: 7,
    question: "¿Cuál es el objetivo principal del cliente?",
    field: "clientGoal",
    required: false,
    description:
      "El objetivo orienta el protocolo, los servicios y los KPIs de la solución. Puede haber múltiples objetivos; seleccionar el más urgente.",
    options: [
      {
        value: "limpieza-correctiva",
        label: "Limpieza correctiva (eliminar contaminante existente)",
        nextNodeId: "node-restricciones",
        hint: "El problema ya existe y debe resolverse ahora.",
      },
      {
        value: "mantenimiento-preventivo",
        label: "Mantenimiento preventivo (evitar acumulación futura)",
        nextNodeId: "node-restricciones",
        hint: "El activo está limpio; el objetivo es mantenerlo así.",
      },
      {
        value: "reducir-consumo-agua",
        label: "Reducir consumo de agua",
        nextNodeId: "node-restricciones",
        hint: "Eficiencia hídrica como KPI operativo.",
      },
      {
        value: "cumplir-normativa-haccp",
        label: "Cumplir normativa HACCP / Inocuidad",
        nextNodeId: "node-restricciones",
        hint: "Cumplimiento regulatorio de industria alimentaria o farmacéutica.",
      },
      {
        value: "eliminar-biofilm",
        label: "Eliminar biofilm / Desinfección",
        nextNodeId: "node-restricciones",
        hint: "Control microbiológico y sanitización.",
      },
      {
        value: "proteger-superficie",
        label: "Proteger superficie (impermeabilizar / sellar)",
        nextNodeId: "node-restricciones",
        hint: "Tratamiento superficial para extender vida útil del activo.",
      },
      {
        value: "reducir-tiempo-ciclo",
        label: "Reducir tiempo de ciclo operativo",
        nextNodeId: "node-restricciones",
        hint: "Eficiencia operacional como KPI principal.",
      },
      {
        value: "minimizar-carga-quimica",
        label: "Minimizar carga química",
        nextNodeId: "node-restricciones",
        hint: "Reducir impacto ambiental o cumplir política de química verde.",
      },
      {
        value: "trazabilidad-auditoria",
        label: "Trazabilidad y auditoría",
        nextNodeId: "node-restricciones",
        hint: "Documentación de intervenciones para auditoría interna o externa.",
      },
      {
        value: "impermeabilizacion",
        label: "Impermeabilización de estructura",
        nextNodeId: "node-restricciones",
        hint: "Protección de concreto o mampostería contra humedad y filtración.",
      },
    ],
  },

  // ── Step 8: Restricciones ambientales ──────────────────────────────────────
  {
    id: "node-restricciones",
    step: 8,
    question: "¿Existen restricciones ambientales o regulatorias que deba respetar el protocolo?",
    field: "environmentalRestrictions",
    required: false,
    description:
      "Las restricciones eliminan productos o protocolos incompatibles y aseguran que la recomendación sea segura y legal.",
    options: [
      {
        value: "zona-alimentaria",
        label: "Zona de contacto con alimentos",
        nextNodeId: null,
        hint: "Solo productos food-grade o certificados para contacto con alimentos.",
      },
      {
        value: "zona-hospitalaria",
        label: "Zona hospitalaria / Clínica",
        nextNodeId: null,
        hint: "Protocolos de desinfección de alto nivel. Productos validados para salud.",
      },
      {
        value: "superficie-delicada",
        label: "Superficie delicada (requiere prueba previa)",
        nextNodeId: null,
        hint: "Validar compatibilidad en área de prueba antes de escalar.",
      },
      {
        value: "restriccion-sanitaria",
        label: "Restricción sanitaria normativa",
        nextNodeId: null,
        hint: "Regulaciones sanitarias locales o nacionales vigentes.",
      },
      {
        value: "sin-solventes-clorados",
        label: "Sin solventes clorados",
        nextNodeId: null,
        hint: "Política ambiental o normativa que prohíbe solventes clorados.",
      },
      {
        value: "biodegradable-requerido",
        label: "Producto biodegradable requerido",
        nextNodeId: null,
        hint: "Política de sostenibilidad corporativa o normativa ambiental.",
      },
      {
        value: "area-protegida-ambiental",
        label: "Área protegida / Zona de descarga restringida",
        nextNodeId: null,
        hint: "Restricciones de efluentes. Producto debe ser de bajo impacto.",
      },
      {
        value: "riesgo-electrico",
        label: "Riesgo eléctrico en zona de aplicación",
        nextNodeId: null,
        hint: "Protocolos de seguridad eléctrica. No usar agua a presión sin resguardos.",
      },
      {
        value: "incompatibilidad-quimica",
        label: "Incompatibilidad química conocida",
        nextNodeId: null,
        hint: "Materiales presentes incompatibles con ciertos agentes. Especificar en diagnóstico.",
      },
    ],
  },
];

/**
 * Returns the first decision node (Step 1 — Industria).
 * This is always the entry point of the OVI decision flow.
 */
export function getEntryNode(): OviDecisionNode {
  const entry = decisionTree.find((node) => node.step === 1);
  if (!entry) throw new Error("OVI Decision Tree: entry node (step 1) not found.");
  return entry;
}

/**
 * Returns a decision node by its ID.
 */
export function getDecisionNode(nodeId: string): OviDecisionNode | undefined {
  return decisionTree.find((node) => node.id === nodeId);
}

/**
 * Returns the next node given a current node ID and selected option value.
 * Returns null if the option leads to a terminal state (recommendation).
 */
export function getNextNode(
  currentNodeId: string,
  selectedValue: string,
): OviDecisionNode | null {
  const currentNode = getDecisionNode(currentNodeId);
  if (!currentNode) return null;

  const selectedOption = currentNode.options.find((opt) => opt.value === selectedValue);
  if (!selectedOption || !selectedOption.nextNodeId) return null;

  return getDecisionNode(selectedOption.nextNodeId) ?? null;
}

/**
 * Returns all nodes in order.
 */
export function getDecisionFlow(): OviDecisionNode[] {
  return [...decisionTree].sort((a, b) => a.step - b.step);
}
