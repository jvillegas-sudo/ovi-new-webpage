/**
 * OVI Knowledge Engine — Product Rules
 * FASE 2 · Foundation Order 002
 *
 * Parametric rule sets for every product in the OVI catalog.
 * Each product defines:
 *   SE RECOMIENDA SI  → recommendIf  (conditions that qualify the product)
 *   NO SE RECOMIENDA SI → doNotRecommendIf (conditions that exclude the product)
 *
 * These rules are evaluated against an OviDecisionInput by the recommendation engine.
 * Rules are parametric and independent of any AI model.
 */

import type { OviProductRule } from "../types";

export const productRules: OviProductRule[] = [
  // ── OVI BioClean Pro ────────────────────────────────────────────────────────
  {
    productId: "ovi-bioclean-pro",
    priority: 95,
    recommendIf: [
      {
        field: "contaminationId",
        operator: "equals",
        value: "grasa-pesada",
        reason: "Formulado específicamente para remoción de grasa pesada en activos críticos.",
      },
      {
        field: "contaminationId",
        operator: "equals",
        value: "aceite",
        reason: "Alta eficacia comprobada sobre aceites minerales e hidráulicos.",
      },
      {
        field: "contaminationId",
        operator: "equals",
        value: "carbonilla",
        reason: "Actúa sobre partículas de carbono incrustadas en superficies metálicas.",
      },
      {
        field: "contaminationId",
        operator: "equals",
        value: "residuos-organicos",
        reason: "Eficaz contra residuos orgánicos de origen industrial y de proceso.",
      },
      {
        field: "surfaceId",
        operator: "equals",
        value: "acero-inoxidable",
        reason: "Compatible y validado para acero inoxidable con enjuague adecuado.",
      },
      {
        field: "surfaceId",
        operator: "equals",
        value: "concreto-sellado",
        reason: "Apto para pisos y estructuras de concreto sellado en zonas industriales.",
      },
      {
        field: "industryId",
        operator: "equals",
        value: "industria",
        reason: "Diseñado para operaciones industriales con alta carga contaminante.",
      },
      {
        field: "industryId",
        operator: "equals",
        value: "transporte",
        reason: "Validado para lavado de flota pesada y activos de transporte.",
      },
      {
        field: "industryId",
        operator: "equals",
        value: "energia",
        reason: "Apto para activos energéticos con residuos de aceite y grasa.",
      },
      {
        field: "contaminationLevel",
        operator: "equals",
        value: "severo",
        reason: "Alta concentración disponible para contaminación severa.",
      },
      {
        field: "contaminationLevel",
        operator: "equals",
        value: "crítico",
        reason: "Formulación concentrada para intervención correctiva en contaminación crítica.",
      },
    ],
    doNotRecommendIf: [
      {
        field: "surfaceId",
        operator: "equals",
        value: "aluminio",
        reason:
          "El aluminio es sensible a álcalis. Requiere prueba de compatibilidad previa y diluciones controladas.",
      },
      {
        field: "surfaceId",
        operator: "equals",
        value: "pintura-automotriz",
        reason:
          "La pintura automotriz requiere productos con pH neutro validados para automotriz.",
      },
      {
        field: "environmentalRestrictions",
        operator: "includes",
        value: "superficie-delicada",
        reason: "No apto para superficies sensibles sin validación técnica previa.",
      },
      {
        field: "environmentalRestrictions",
        operator: "includes",
        value: "restriccion-sanitaria",
        reason:
          "Requiere evaluación de normativa sanitaria antes de aplicar en zonas críticas.",
      },
    ],
  },

  // ── OVI Surface Guard X9 ────────────────────────────────────────────────────
  {
    productId: "ovi-surface-guard-x9",
    priority: 80,
    recommendIf: [
      {
        field: "clientGoal",
        operator: "equals",
        value: "mantenimiento-preventivo",
        reason:
          "Diseñado para extender ciclos de limpieza mediante protección de superficie post-limpieza.",
      },
      {
        field: "clientGoal",
        operator: "equals",
        value: "proteger-superficie",
        reason:
          "Capa funcional que reduce velocidad de recontaminación sobre superficies tratadas.",
      },
      {
        field: "contaminationId",
        operator: "equals",
        value: "recontaminacion-superficial",
        reason: "Formulado para control de recontaminación superficial en superficies de alto tráfico.",
      },
      {
        field: "contaminationId",
        operator: "equals",
        value: "polvo-industrial",
        reason: "Reduce adherencia del polvo industrial a superficies tratadas.",
      },
      {
        field: "surfaceId",
        operator: "equals",
        value: "pisos-sellados",
        reason: "Compatible con pisos sellados de polyuretano y epoxi.",
      },
      {
        field: "surfaceId",
        operator: "equals",
        value: "concreto-sellado",
        reason: "Tratamiento de mantenimiento preventivo para concreto sellado.",
      },
      {
        field: "surfaceId",
        operator: "equals",
        value: "acero-inoxidable",
        reason: "Capa protectora válida para acero inoxidable en zonas de proceso.",
      },
      {
        field: "industryId",
        operator: "equals",
        value: "institucional",
        reason: "Ideal para pisos y superficies de alto tráfico peatonal.",
      },
      {
        field: "industryId",
        operator: "equals",
        value: "energia",
        reason: "Protección de activos expuestos a intemperie y condiciones agresivas.",
      },
    ],
    doNotRecommendIf: [
      {
        field: "clientGoal",
        operator: "equals",
        value: "limpieza-correctiva",
        reason:
          "Surface Guard X9 es un protector, no un agente de limpieza correctiva. Use BioClean Pro o Desengrasante Industrial primero.",
      },
      {
        field: "contaminationId",
        operator: "equals",
        value: "grasa-pesada",
        reason:
          "No tiene acción desengrasante profunda. Aplicar solo después de remoción de grasa.",
      },
      {
        field: "contaminationId",
        operator: "equals",
        value: "aceite",
        reason:
          "No apto como primer agente sobre aceite. La capa protectora requiere superficie limpia y seca.",
      },
      {
        field: "contaminationId",
        operator: "equals",
        value: "biofilm",
        reason:
          "No tiene propiedades antimicrobianas para biofilm activo. Requiere desinfección previa.",
      },
    ],
  },

  // ── OVI Desengrasante Industrial ────────────────────────────────────────────
  {
    productId: "ovi-desengrasante-industrial",
    priority: 85,
    recommendIf: [
      {
        field: "contaminationId",
        operator: "equals",
        value: "grasa-pesada",
        reason: "Alto rendimiento sobre grasas minerales e industriales con 3–5 min de contacto.",
      },
      {
        field: "contaminationId",
        operator: "equals",
        value: "aceite",
        reason: "Actúa sobre aceites de corte y residuos de maquinaria.",
      },
      {
        field: "contaminationId",
        operator: "equals",
        value: "residuos-quimicos",
        reason: "Eficaz en remoción de residuos de proceso químico.",
      },
      {
        field: "industryId",
        operator: "equals",
        value: "industria",
        reason: "Diseñado para maquinaria, equipos y líneas de producción industrial.",
      },
      {
        field: "industryId",
        operator: "equals",
        value: "energia",
        reason: "Apto para activos energéticos con acumulación de aceite y grasa.",
      },
      {
        field: "environmentalRestrictions",
        operator: "includes",
        value: "sin-solventes-clorados",
        reason: "Fórmula libre de solventes clorados, cumpliendo restricciones ambientales.",
      },
    ],
    doNotRecommendIf: [
      {
        field: "surfaceId",
        operator: "equals",
        value: "aluminio",
        reason:
          "El aluminio requiere validación de compatibilidad. Verificar ficha técnica antes de aplicar.",
      },
      {
        field: "environmentalRestrictions",
        operator: "includes",
        value: "zona-alimentaria",
        reason:
          "Requiere validación food-grade. Preferir productos certificados para contacto con alimentos.",
      },
    ],
  },

  // ── OVI EcoDetox ────────────────────────────────────────────────────────────
  {
    productId: "ovi-ecodetox",
    priority: 70,
    recommendIf: [
      {
        field: "contaminationId",
        operator: "equals",
        value: "residuos-quimicos",
        reason: "Formulado para neutralización de contaminantes químicos en superficies.",
      },
      {
        field: "contaminationId",
        operator: "equals",
        value: "residuos-organicos",
        reason: "Biodegradable, apto para residuos orgánicos en zonas sensibles.",
      },
      {
        field: "industryId",
        operator: "equals",
        value: "institucional",
        reason: "Compatible con programas de sostenibilidad corporativa.",
      },
      {
        field: "industryId",
        operator: "equals",
        value: "hospitales",
        reason: "Formulación bajo principios de química verde para entornos hospitalarios.",
      },
      {
        field: "environmentalRestrictions",
        operator: "includes",
        value: "biodegradable-requerido",
        reason: "Certificable para programas de sostenibilidad. Formulado bajo química verde.",
      },
      {
        field: "environmentalRestrictions",
        operator: "includes",
        value: "area-protegida-ambiental",
        reason: "Apto para zonas protegidas y ambientes con restricciones de descarga.",
      },
      {
        field: "environmentalRestrictions",
        operator: "includes",
        value: "zona-hospitalaria",
        reason: "Formulado para entornos hospitalarios con restricciones sanitarias.",
      },
    ],
    doNotRecommendIf: [
      {
        field: "contaminationId",
        operator: "equals",
        value: "grasa-pesada",
        reason:
          "No tiene acción desengrasante profunda. Usar BioClean Pro o Desengrasante Industrial.",
      },
      {
        field: "contaminationLevel",
        operator: "equals",
        value: "crítico",
        reason:
          "Para contaminación crítica, se requieren agentes de mayor agresividad técnica.",
      },
    ],
  },

  // ── OVI ImperShield ─────────────────────────────────────────────────────────
  {
    productId: "ovi-impershield",
    priority: 65,
    recommendIf: [
      {
        field: "clientGoal",
        operator: "equals",
        value: "impermeabilizacion",
        reason: "Tratamiento de penetración profunda para impermeabilización de concreto y mampostería.",
      },
      {
        field: "surfaceId",
        operator: "equals",
        value: "concreto",
        reason: "Penetración hasta 8 mm en concreto estándar sin alterar estética.",
      },
      {
        field: "surfaceId",
        operator: "equals",
        value: "concreto-sellado",
        reason: "Tratamiento complementario para concreto con sellado previo.",
      },
      {
        field: "industryId",
        operator: "equals",
        value: "institucional",
        reason: "Protección de infraestructura institucional contra humedad y filtración.",
      },
      {
        field: "industryId",
        operator: "equals",
        value: "energia",
        reason: "Protección de infraestructura energética contra intemperie.",
      },
    ],
    doNotRecommendIf: [
      {
        field: "clientGoal",
        operator: "equals",
        value: "limpieza-correctiva",
        reason:
          "ImperShield es un tratamiento impermeabilizante, no un agente de limpieza.",
      },
      {
        field: "contaminationId",
        operator: "equals",
        value: "grasa-pesada",
        reason:
          "No actúa sobre contaminación. Limpiar la superficie antes de aplicar ImperShield.",
      },
      {
        field: "surfaceId",
        operator: "equals",
        value: "acero-inoxidable",
        reason:
          "ImperShield está formulado para sustratos de concreto y mampostería, no para metales.",
      },
      {
        field: "surfaceId",
        operator: "equals",
        value: "pintura-industrial",
        reason:
          "No compatible con recubrimientos pintados. Verificar compatibilidad técnica.",
      },
    ],
  },

  // ── OVI FlotaClean ──────────────────────────────────────────────────────────
  {
    productId: "ovi-flotaclean",
    priority: 88,
    recommendIf: [
      {
        field: "industryId",
        operator: "equals",
        value: "transporte",
        reason: "Especializado para lavado de vehículos de carga y flota industrial.",
      },
      {
        field: "contaminationId",
        operator: "equals",
        value: "grasa-pesada",
        reason: "Elimina grasa de caminos y residuos adheridos a carrocería.",
      },
      {
        field: "contaminationId",
        operator: "equals",
        value: "carbonilla",
        reason: "Actúa sobre hollín y carbonilla de motores y escapes.",
      },
      {
        field: "contaminationId",
        operator: "equals",
        value: "lodo",
        reason: "Diseñado para remoción de barro y lodo adherido en flota.",
      },
      {
        field: "surfaceId",
        operator: "equals",
        value: "pintura-automotriz",
        reason: "Compatible con pinturas al agua y solvente sin daño al acabado.",
      },
      {
        field: "surfaceId",
        operator: "equals",
        value: "aluminio",
        reason: "No corrosivo sobre aluminio anodizado de carrocería.",
      },
      {
        field: "surfaceId",
        operator: "equals",
        value: "plastico-tecnico",
        reason: "Apto para plásticos ABS y técnicos de cabina y paneles.",
      },
      {
        field: "assetType",
        operator: "equals",
        value: "camion",
        reason: "Formulado para lavado de camiones, buses y flota pesada.",
      },
    ],
    doNotRecommendIf: [
      {
        field: "industryId",
        operator: "equals",
        value: "alimentos",
        reason:
          "No certificado para industria alimentaria. Requiere producto con validación food-grade.",
      },
      {
        field: "contaminationId",
        operator: "equals",
        value: "biofilm",
        reason:
          "No tiene propiedades biocidas. Para biofilm, usar protocolo de desinfección específico.",
      },
      {
        field: "surfaceId",
        operator: "equals",
        value: "acero-inoxidable",
        reason:
          "FlotaClean está optimizado para superficies de carrocería. Usar BioClean Pro para acero inoxidable industrial.",
      },
    ],
  },

  // ── OVI Formulación Personalizada ──────────────────────────────────────────
  {
    productId: "ovi-formulacion-personalizada",
    priority: 60,
    recommendIf: [
      {
        field: "contaminationLevel",
        operator: "equals",
        value: "crítico",
        reason:
          "Cuando la contaminación crítica no tiene solución en el catálogo estándar, se desarrolla formulación ad hoc.",
      },
      {
        field: "clientGoal",
        operator: "equals",
        value: "minimizar-carga-quimica",
        reason:
          "Se puede formular un producto optimizado para la carga contaminante específica del cliente.",
      },
    ],
    doNotRecommendIf: [
      {
        field: "clientGoal",
        operator: "equals",
        value: "reducir-tiempo-ciclo",
        reason:
          "El proceso de formulación personalizada tarda 3 fases (análisis → prototipo → validación). No resuelve urgencias operativas inmediatas.",
      },
    ],
  },

  // ── OVI Flota Rinse Arch (equipo) ───────────────────────────────────────────
  {
    productId: "ovi-flota-rinse-arch",
    priority: 75,
    recommendIf: [
      {
        field: "industryId",
        operator: "equals",
        value: "transporte",
        reason: "Sistema de enjuague estandarizado para patios de flota de gran volumen.",
      },
      {
        field: "clientGoal",
        operator: "equals",
        value: "reducir-consumo-agua",
        reason: "Estandariza el consumo de agua por ciclo y elimina reprocesos.",
      },
      {
        field: "clientGoal",
        operator: "equals",
        value: "reducir-tiempo-ciclo",
        reason: "Convierte el enjuague en una etapa de ingeniería medible y repetible.",
      },
    ],
    doNotRecommendIf: [
      {
        field: "industryId",
        operator: "equals",
        value: "hospitales",
        reason:
          "No aplica para entornos hospitalarios. Usar equipos de limpieza y desinfección certificados.",
      },
    ],
  },

  // ── OVI Precision Foam Kit (accesorio) ──────────────────────────────────────
  {
    productId: "ovi-precision-foam-kit",
    priority: 72,
    recommendIf: [
      {
        field: "contaminationId",
        operator: "equals",
        value: "grasa-pesada",
        reason: "El espumado técnico mejora el tiempo de contacto del agente sobre grasa.",
      },
      {
        field: "contaminationId",
        operator: "equals",
        value: "biofilm",
        reason: "La espuma mantiene contacto prolongado sobre superficies con biofilm activo.",
      },
      {
        field: "industryId",
        operator: "equals",
        value: "alimentos",
        reason: "Protocolo de espumado compatible con HACCP y superficies de contacto.",
      },
      {
        field: "industryId",
        operator: "equals",
        value: "hospitales",
        reason: "Aplicación controlada y trazable en zonas hospitalarias críticas.",
      },
    ],
    doNotRecommendIf: [
      {
        field: "assetType",
        operator: "equals",
        value: "vehiculo-en-movimiento",
        reason:
          "El espumado requiere activo detenido. No aplicable durante operación en movimiento.",
      },
    ],
  },

  // ── OVI Dose Control Cart (accesorio) ───────────────────────────────────────
  {
    productId: "ovi-dose-control-cart",
    priority: 70,
    recommendIf: [
      {
        field: "clientGoal",
        operator: "equals",
        value: "trazabilidad-auditoria",
        reason:
          "Garantiza mezcla consistente y trazabilidad de diluciones para auditoría.",
      },
      {
        field: "clientGoal",
        operator: "equals",
        value: "minimizar-carga-quimica",
        reason:
          "Control preciso de dosificación reduce sobredosificación y carga química.",
      },
      {
        field: "clientGoal",
        operator: "equals",
        value: "cumplir-normativa-haccp",
        reason: "Control de diluciones documentado para cumplimiento de HACCP.",
      },
    ],
    doNotRecommendIf: [],
  },
];

/**
 * Returns the rule set for a specific product.
 * Returns undefined if no rules are defined for the given product ID.
 */
export function getProductRule(productId: string): OviProductRule | undefined {
  return productRules.find((rule) => rule.productId === productId);
}

/**
 * Returns all product IDs that have rules defined.
 */
export function getRuleProductIds(): string[] {
  return productRules.map((rule) => rule.productId);
}
