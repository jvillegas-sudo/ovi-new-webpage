/**
 * Product Knowledge Data
 * Work Order 008A — OVI Product Knowledge Engine
 *
 * Governed knowledge records for all 56 official OVI products.
 *
 * Data Integrity Policy:
 *   Records start with informationStatus: "minimal" and are enriched only
 *   when official repository evidence is available.
 *
 *   WO-003 Phase I adds official enrichment for a controlled subset of products
 *   with explicit source references, while preserving minimal records for the
 *   remaining catalog until official data is available.
 *
 * Source: src/features/products/chemical-lines-data.ts
 *   — canonical identity for all 56 products across 7 official sectors.
 */

import type { ProductKnowledge } from "../types/product-knowledge";

/**
 * Create a minimal, structurally valid ProductKnowledge record.
 * All optional knowledge fields are left empty — no information is invented.
 */
function createMinimalKnowledge(
  productId: string,
  slug: string,
  officialName: string,
  sectorSlug: string,
): ProductKnowledge {
  return {
    // Identity
    productId,
    slug,
    officialName,
    sectorSlug,

    // Governance
    informationStatus: "minimal",
    verificationStatus: "unverified",
    publicationStatus: "draft",
    revision: 1,
    updatedAt: "2025-07-20",
    internalNotes: null,

    // Source References
    sourceReferences: [
      {
        sourceType: "catalog_file",
        sourceFile: "src/features/products/chemical-lines-data.ts",
        sourcePage: null,
        sourceSection: `sector: ${sectorSlug}, product: ${officialName}`,
        verificationStatus: "source_confirmed",
        internalNote: "Identity confirmed from canonical product source.",
      },
    ],

    // Discovery — pending official sources
    shortDescription: null,
    aliases: [],
    keywords: [],
    customerLanguageTerms: [],

    // Problems — pending official sources
    problems: [],
    soils: [],
    residues: [],
    contaminationTypes: [],

    // Application Context — pending official sources
    industries: [sectorSlug],
    applications: [],
    surfaces: [],
    equipment: [],
    areas: [],
    processes: [],
    environments: [],

    // Commercial — pending official sources
    officialBenefits: [],
    differentiators: [],
    relatedProducts: [],
    complementaryProducts: [],
    alternativeProducts: [],
    relatedServices: [],

    // Technical — pending official sources
    compositionSummary: null,
    physicalState: null,
    color: null,
    fragrance: null,
    pH: null,
    dilution: null,
    usageInstructions: null,
    precautions: [],
    compatibility: [],
    incompatibilities: [],
    performance: null,
    biodegradability: null,

    // Presentations — pending official sources
    presentations: [],

    // Documents — pending official sources
    documents: [],

    // Media — pending official sources (all images are officially missing per product-images-manifest.json)
    primaryImage: null,
    gallery: [],

    // Verification
    verifiedBy: null,
    verifiedAt: null,
  };
}

type ProductKnowledgeOverride = Partial<
  Omit<
    ProductKnowledge,
    | "productId"
    | "slug"
    | "officialName"
    | "sectorSlug"
    | "sourceReferences"
    | "revision"
    | "updatedAt"
  >
> & {
  sourceReferences?: ProductKnowledge["sourceReferences"];
};

const OFFICIAL_PRODUCT_KNOWLEDGE_OVERRIDES: Record<string, ProductKnowledgeOverride> = {
  "industrial-biodex": {
    informationStatus: "partial",
    verificationStatus: "source_confirmed",
    publicationStatus: "pending_review",
    shortDescription:
      "Desengrasante industrial de alto poder 99% biodegradable para remoción de grasa severa en operación industrial.",
    aliases: ["OVI Desengrasante Industrial", "Ultradegreaser"],
    keywords: ["desengrasante industrial", "ultradegreaser", "grasa pesada", "biodegradable"],
    customerLanguageTerms: ["desengrasante para grasa pesada", "desengrasante biodegradable"],
    officialBenefits: [
      "99% biodegradable con base de cáscara de naranja",
      "Alto poder de desengrase para suciedad industrial severa",
      "Protección de metales durante la limpieza",
      "Sin solventes agresivos ni clorados",
    ],
    differentiators: [
      "Formulación de alto poder orientada a grasa severa",
      "Enfoque de desempeño con menor impacto ambiental",
    ],
    relatedServices: ["limpieza-industrial", "diagnostico-tecnico", "implementacion-protocolo"],
    compositionSummary:
      "Formulación desengrasante biodegradable con base de cáscara de naranja y agentes emulsificantes.",
    biodegradability: "99% biodegradable",
    usageInstructions:
      "Aplicar por aspersión, espuma controlada o aplicación manual según protocolo OVI definido para el activo.",
    internalNotes:
      "WO-003 Phase I enrichment from official product catalog and content inventory. Pending editorial publication.",
    sourceReferences: [
      {
        sourceType: "knowledge_base_file",
        sourceFile: "src/knowledge/products/catalog.ts",
        sourcePage: null,
        sourceSection: "ovi-biodex",
        verificationStatus: "source_confirmed",
        internalNote:
          "Official product description and benefits for OVI Desengrasante Industrial (Ultradegreaser).",
      },
      {
        sourceType: "repository_document",
        sourceFile: "docs/content/OVI_CONTENT_MASTER.md",
        sourcePage: null,
        sourceSection: "2.1 Químicos — PROD-001",
        verificationStatus: "source_confirmed",
        internalNote: "Cross-reference for product positioning and linked services.",
      },
    ],
  },
  "industrial-solwash": {
    informationStatus: "partial",
    verificationStatus: "source_confirmed",
    publicationStatus: "pending_review",
    shortDescription:
      "Detergente especializado 100% biodegradable para lavado técnico de flota pesada y transporte público.",
    aliases: ["OVI Solwash"],
    keywords: ["lavado de flota", "detergente flota", "flota pesada", "100% biodegradable"],
    customerLanguageTerms: ["jabón para lavar buses", "limpiador para camiones"],
    officialBenefits: [
      "Formulación 100% biodegradable",
      "Protege brillo de pintura al no usar abrasivos ni solventes",
      "Compatible con lavado automático y manual",
    ],
    differentiators: [
      "Diseñado para operación de flota pesada con protocolos estandarizados",
      "Alineado a control de consumo y trazabilidad operativa",
    ],
    relatedServices: ["lavado-flota", "optimizacion-hidrica"],
    biodegradability: "100% biodegradable",
    usageInstructions:
      "Aplicar manualmente o en sistema de lavado automático según protocolo OVI para tipo de flota y nivel de suciedad.",
    internalNotes:
      "WO-003 Phase I enrichment from official product catalog and CASE-001 references. Pending editorial publication.",
    sourceReferences: [
      {
        sourceType: "knowledge_base_file",
        sourceFile: "src/knowledge/products/catalog.ts",
        sourcePage: null,
        sourceSection: "ovi-solwash",
        verificationStatus: "source_confirmed",
        internalNote: "Official Solwash description, applications, and benefits.",
      },
      {
        sourceType: "repository_document",
        sourceFile: "docs/content/OVI_CONTENT_MASTER.md",
        sourcePage: null,
        sourceSection: "1. CASOS DE ÉXITO — CASE-001 / 2.1 Químicos — PROD-004",
        verificationStatus: "source_confirmed",
        internalNote: "Cross-reference for service/product relation and operational case context.",
      },
    ],
  },
  "industrial-jp-35": {
    informationStatus: "partial",
    verificationStatus: "source_confirmed",
    publicationStatus: "pending_review",
    shortDescription:
      "Desengrasante biodegradable especializado en grasas minerales para maquinaria y equipos industriales.",
    aliases: ["OVI JP 35"],
    keywords: ["jp 35", "grasa mineral", "desengrasante biodegradable", "maquinaria industrial"],
    customerLanguageTerms: ["desengrasante para motores", "limpiador para grasa mineral"],
    officialBenefits: [
      "Formulación biodegradable para remoción de grasas minerales",
      "Eficiente en aplicaciones continuas",
      "No daña superficies metálicas en uso adecuado",
    ],
    differentiators: [
      "Especialización en grasa mineral para equipos y motores",
      "Compatibilidad con protocolos de mantenimiento técnico",
    ],
    relatedServices: ["diagnostico-tecnico", "implementacion-protocolo", "levantamiento-activos"],
    biodegradability: "Biodegradable",
    usageInstructions:
      "Aplicar por aspersión a presión o aplicación manual en ambientes con ventilación adecuada, según protocolo OVI.",
    internalNotes:
      "WO-003 Phase I enrichment from official product catalog and content inventory. Pending editorial publication.",
    sourceReferences: [
      {
        sourceType: "knowledge_base_file",
        sourceFile: "src/knowledge/products/catalog.ts",
        sourcePage: null,
        sourceSection: "ovi-jp35",
        verificationStatus: "source_confirmed",
        internalNote: "Official JP 35 summary, usage context, and benefits.",
      },
      {
        sourceType: "repository_document",
        sourceFile: "docs/content/OVI_CONTENT_MASTER.md",
        sourcePage: null,
        sourceSection: "2.1 Químicos — PROD-003",
        verificationStatus: "source_confirmed",
        internalNote: "Cross-reference for JP 35 product positioning and service links.",
      },
    ],
  },
  "institucional-ecoshine": {
    informationStatus: "partial",
    verificationStatus: "source_confirmed",
    publicationStatus: "pending_review",
    shortDescription:
      "Limpiador de pisos con desinfección y aroma para mantenimiento institucional de alto tráfico.",
    aliases: ["OVI Ecoshine"],
    keywords: ["limpiador de pisos", "desinfección", "aroma", "alto tráfico"],
    customerLanguageTerms: ["limpiador para pisos institucionales", "desinfectante para pisos"],
    officialBenefits: [
      "Triple acción: limpieza profunda, desinfección y aroma duradero",
      "Apoyo a protocolos de mantenimiento diario institucional",
      "Formulación ecológica de bajo impacto ambiental",
    ],
    differentiators: [
      "Producto orientado a pisos de alto tráfico con enfoque operativo",
      "Integra limpieza y desinfección en una sola intervención",
    ],
    relatedServices: ["diseno-protocolo", "mantenimiento-preventivo"],
    usageInstructions:
      "Diluir según nivel de suciedad y aplicar con mopa o equipo de limpieza, siguiendo protocolo OVI.",
    internalNotes:
      "WO-003 Phase I enrichment from official product catalog and content inventory. Pending editorial publication.",
    sourceReferences: [
      {
        sourceType: "knowledge_base_file",
        sourceFile: "src/knowledge/products/catalog.ts",
        sourcePage: null,
        sourceSection: "ovi-ecoshine",
        verificationStatus: "source_confirmed",
        internalNote: "Official Ecoshine description and benefits.",
      },
      {
        sourceType: "repository_document",
        sourceFile: "docs/content/OVI_CONTENT_MASTER.md",
        sourcePage: null,
        sourceSection: "2.1 Químicos — PROD-005",
        verificationStatus: "source_confirmed",
        internalNote: "Cross-reference for institutional/hospitality usage context.",
      },
    ],
  },
  "institucional-ecoseal": {
    informationStatus: "partial",
    verificationStatus: "source_confirmed",
    publicationStatus: "pending_review",
    shortDescription:
      "Sellador para pisos institucionales e industriales que facilita mantenimiento preventivo y extiende vida útil.",
    aliases: ["OVI Ecoseal"],
    keywords: ["sellador de pisos", "mantenimiento preventivo", "protección de superficies"],
    customerLanguageTerms: ["protector para pisos", "sellador para alto tráfico"],
    officialBenefits: [
      "Crea capa protectora contra manchas, humedad y desgaste",
      "Reduce frecuencia de limpiezas correctivas",
      "Extiende la vida útil de superficies en alto tráfico",
    ],
    differentiators: [
      "Integra limpieza técnica con protección preventiva de superficie",
      "Optimiza ciclo de mantenimiento en instalaciones institucionales",
    ],
    relatedServices: ["mantenimiento-preventivo", "diseno-protocolo"],
    usageInstructions:
      "Aplicar listo para uso sobre superficie limpia y seca, respetando tiempos de curado definidos por protocolo OVI.",
    internalNotes:
      "WO-003 Phase I enrichment from official product catalog and CASE-003 context. Pending editorial publication.",
    sourceReferences: [
      {
        sourceType: "knowledge_base_file",
        sourceFile: "src/knowledge/products/catalog.ts",
        sourcePage: null,
        sourceSection: "ovi-ecoseal",
        verificationStatus: "source_confirmed",
        internalNote: "Official Ecoseal description and preventive maintenance fit.",
      },
      {
        sourceType: "repository_document",
        sourceFile: "docs/content/OVI_CONTENT_MASTER.md",
        sourcePage: null,
        sourceSection: "1. CASOS DE ÉXITO — CASE-003 / 2.1 Químicos — PROD-002",
        verificationStatus: "source_confirmed",
        internalNote: "Cross-reference for preventive maintenance case and product usage context.",
      },
    ],
  },

  // ─── WO-004 Phase II enrichments ─────────────────────────────────────────────

  "industrial-handsol": {
    informationStatus: "partial",
    verificationStatus: "source_confirmed",
    publicationStatus: "pending_review",
    shortDescription:
      "Limpiador industrial en seco para manos. Remueve grasa, aceites y suciedad severa sin necesidad de agua.",
    aliases: ["OVI Handsol"],
    keywords: ["limpiador de manos", "handsol", "limpieza en seco", "operador industrial"],
    customerLanguageTerms: ["limpiador para manos sin agua", "jabón industrial en seco"],
    officialBenefits: [
      "Sin necesidad de agua — uso directo en seco",
      "Humecta y cuida la piel del operador",
      "Formulación ecológica segura para uso continuado",
      "Reduce riesgo por cambios bruscos de temperatura",
    ],
    differentiators: [
      "Limpieza profunda de manos sin enjuague con agua",
      "Cuida la piel del operador en condiciones de trabajo exigentes",
    ],
    relatedServices: ["capacitacion-personal"],
    relatedProducts: ["industrial-biodex"],
    usageInstructions:
      "Aplicar directamente sobre manos sucias. Frotar hasta remover la suciedad. No requiere enjuague.",
    internalNotes:
      "WO-004 Phase II enrichment from official product catalog (src/knowledge/products/catalog.ts: ovi-handsol). Pending editorial publication.",
    sourceReferences: [
      {
        sourceType: "knowledge_base_file",
        sourceFile: "src/knowledge/products/catalog.ts",
        sourcePage: null,
        sourceSection: "ovi-handsol",
        verificationStatus: "source_confirmed",
        internalNote: "Official Handsol description, usage instructions, and benefits.",
      },
      {
        sourceType: "repository_document",
        sourceFile: "docs/content/OVI_CONTENT_MASTER.md",
        sourcePage: null,
        sourceSection: "2.2 Línea Industrial — PROD-010",
        verificationStatus: "source_confirmed",
        internalNote: "Cross-reference for product positioning in industrial line.",
      },
    ],
  },

  "industrial-cr-30": {
    informationStatus: "partial",
    verificationStatus: "source_confirmed",
    publicationStatus: "pending_review",
    shortDescription:
      "Desengrasante solvente de alto poder penetrante para grasa pesada incrustada en maquinaria, motores y equipos.",
    aliases: ["OVI CR 30"],
    keywords: ["cr 30", "desengrasante solvente", "grasa incrustada", "maquinaria pesada"],
    customerLanguageTerms: [
      "solvente para grasa incrustada",
      "limpiador de motores",
      "desengrasante para grúas",
    ],
    officialBenefits: [
      "Alta penetración sobre grasa vieja e incrustada",
      "Fórmula solvente de acción rápida",
      "Disponible en versión aromática (CR 30) y desodorizada (CR 30S)",
    ],
    differentiators: [
      "Fórmula solvente de penetración rápida para grasa de alta compactación",
      "Versatilidad entre versión aromática y desodorizada según requerimiento operativo",
    ],
    relatedServices: ["diagnostico-tecnico", "limpieza-industrial"],
    relatedProducts: ["industrial-biodex", "industrial-jp-35"],
    complementaryProducts: ["industrial-cr-30-s"],
    usageInstructions:
      "Aplicación directa o por aspersión. Usar en ambientes ventilados con EPP completo.",
    precautions: [
      "Usar EPP completo — guantes, gafas y protección respiratoria",
      "Ventilación obligatoria durante la aplicación",
      "Revisar MSDS antes de aplicar",
    ],
    internalNotes:
      "WO-004 Phase II enrichment from official product catalog (src/knowledge/products/catalog.ts: ovi-cr30). Pending editorial publication.",
    sourceReferences: [
      {
        sourceType: "knowledge_base_file",
        sourceFile: "src/knowledge/products/catalog.ts",
        sourcePage: null,
        sourceSection: "ovi-cr30",
        verificationStatus: "source_confirmed",
        internalNote: "Official CR 30 description, applications, and safety information.",
      },
      {
        sourceType: "repository_document",
        sourceFile: "docs/content/OVI_CONTENT_MASTER.md",
        sourcePage: null,
        sourceSection: "2.1 Químicos — PROD-007 / 2.2 Línea Industrial — PROD-017",
        verificationStatus: "source_confirmed",
        internalNote: "Cross-reference for CR 30 product positioning and industrial line.",
      },
    ],
  },

  "industrial-cr-30-s": {
    informationStatus: "partial",
    verificationStatus: "source_confirmed",
    publicationStatus: "pending_review",
    shortDescription:
      "Desengrasante solvente de alto poder penetrante, versión desodorizada, para grasa pesada incrustada en ambientes sensibles.",
    aliases: ["OVI CR 30S", "CR 30 S"],
    keywords: ["cr 30s", "desengrasante solvente", "desodorizado", "grasa incrustada"],
    customerLanguageTerms: ["solvente desodorizado para grasa", "cr 30 sin olor"],
    officialBenefits: [
      "Alta penetración sobre grasa vieja e incrustada",
      "Fórmula desodorizada para ambientes sensibles a olores",
      "Acción rápida y eficiente",
    ],
    differentiators: [
      "Versión desodorizada del CR 30 para entornos donde el olor es una restricción operativa",
    ],
    relatedServices: ["diagnostico-tecnico", "limpieza-industrial"],
    relatedProducts: ["industrial-cr-30", "industrial-biodex"],
    alternativeProducts: ["industrial-cr-30"],
    usageInstructions:
      "Aplicación directa o por aspersión. Usar en ambientes ventilados con EPP completo.",
    precautions: [
      "Usar EPP completo — guantes, gafas y protección respiratoria",
      "Ventilación obligatoria durante la aplicación",
    ],
    internalNotes:
      "WO-004 Phase II enrichment. CR 30 S is the deodorized variant of CR 30 (ovi-cr30 in catalog.ts). Source: docs/content/OVI_CONTENT_MASTER.md PROD-018. Pending editorial publication.",
    sourceReferences: [
      {
        sourceType: "knowledge_base_file",
        sourceFile: "src/knowledge/products/catalog.ts",
        sourcePage: null,
        sourceSection: "ovi-cr30 (desodorized variant CR 30S)",
        verificationStatus: "source_confirmed",
        internalNote: "CR 30 S is explicitly described as the deodorized version of ovi-cr30.",
      },
      {
        sourceType: "repository_document",
        sourceFile: "docs/content/OVI_CONTENT_MASTER.md",
        sourcePage: null,
        sourceSection: "2.2 Línea Industrial — PROD-018",
        verificationStatus: "source_confirmed",
        internalNote: "Cross-reference for CR 30 S product positioning in industrial line.",
      },
    ],
  },

  "institucional-ecowax": {
    informationStatus: "partial",
    verificationStatus: "source_confirmed",
    publicationStatus: "pending_review",
    shortDescription:
      "Cera ecológica para pisos que brinda lustre y protección superficial en entornos institucionales e industriales.",
    aliases: ["OVI Eco Wax"],
    keywords: ["eco wax", "cera de pisos", "lustre", "protección de pisos", "institucional"],
    customerLanguageTerms: [
      "cera para pisos institucionales",
      "encerador de pisos",
      "protector de pisos",
    ],
    officialBenefits: [
      "Protección y lustre duradero en pisos de alto tráfico",
      "Facilita la limpieza diaria al crear barrera protectora",
      "Formulación ecológica compatible con estándares ambientales",
      "Complementa el sistema OVI Ecoseal para protección integral",
    ],
    differentiators: [
      "Componente complementario del sistema OVI Ecoseal para protección de pisos",
      "Formulación ecológica que reduce el impacto ambiental del mantenimiento de pisos",
    ],
    relatedServices: ["mantenimiento-preventivo"],
    relatedProducts: ["institucional-ecoseal"],
    complementaryProducts: ["institucional-ecoseal"],
    usageInstructions:
      "Aplicar con mopa o aplicador de microfibra sobre superficie limpia y seca, siguiendo protocolo OVI.",
    internalNotes:
      "WO-004 Phase II enrichment from official product catalog (src/knowledge/products/catalog.ts: ovi-eco-wax). Pending editorial publication.",
    sourceReferences: [
      {
        sourceType: "knowledge_base_file",
        sourceFile: "src/knowledge/products/catalog.ts",
        sourcePage: null,
        sourceSection: "ovi-eco-wax",
        verificationStatus: "source_confirmed",
        internalNote: "Official Eco Wax description, applications, and benefits.",
      },
      {
        sourceType: "repository_document",
        sourceFile: "docs/content/OVI_CONTENT_MASTER.md",
        sourcePage: null,
        sourceSection: "2.1 Químicos — PROD-006 / 2.4 Línea Institucional — PROD-051",
        verificationStatus: "source_confirmed",
        internalNote: "Cross-reference for Eco Wax product positioning and institutional line.",
      },
    ],
  },

  "biotecnologia-eco-zyme": {
    informationStatus: "partial",
    verificationStatus: "source_confirmed",
    publicationStatus: "pending_review",
    shortDescription: "Digestor natural biotecnológico para tratamiento de efluentes orgánicos.",
    aliases: ["OVI Eco-Zyme"],
    keywords: [
      "eco-zyme",
      "biotecnología",
      "digestor natural",
      "efluentes",
      "tratamiento biológico",
    ],
    customerLanguageTerms: ["digestor de efluentes", "tratamiento biológico de aguas"],
    officialBenefits: [
      "Digestión natural de efluentes orgánicos",
      "Reducción de carga contaminante en aguas de proceso",
      "Formulación biotecnológica de origen natural",
    ],
    differentiators: [
      "Tecnología biotecnológica aplicada al tratamiento de efluentes de proceso de limpieza",
    ],
    internalNotes:
      "WO-004 Phase II enrichment from OVI_CONTENT_MASTER.md (PROD-064). Pending editorial publication.",
    sourceReferences: [
      {
        sourceType: "repository_document",
        sourceFile: "docs/content/OVI_CONTENT_MASTER.md",
        sourcePage: null,
        sourceSection: "2.7 Línea Biotecnología — PROD-064",
        verificationStatus: "source_confirmed",
        internalNote: "Official Eco-Zyme description from content master inventory.",
      },
    ],
  },

  "biotecnologia-eco-zyme-solid": {
    informationStatus: "partial",
    verificationStatus: "source_confirmed",
    publicationStatus: "pending_review",
    shortDescription:
      "Tratamiento biológico sólido para grasas. Protección y restauración ambiental.",
    aliases: ["OVI Eco-Zyme Solid"],
    keywords: [
      "eco-zyme solid",
      "biotecnología",
      "tratamiento sólido",
      "grasas",
      "restauración ambiental",
    ],
    customerLanguageTerms: ["tratamiento biológico para grasas", "digestor sólido"],
    officialBenefits: [
      "Tratamiento biológico sólido para remoción de grasas",
      "Protección y restauración ambiental",
      "Formato sólido para mayor facilidad de manejo y dosificación",
    ],
    differentiators: [
      "Presentación sólida diferenciada del Eco-Zyme líquido para grasas específicas",
    ],
    relatedProducts: ["biotecnologia-eco-zyme"],
    internalNotes:
      "WO-004 Phase II enrichment from OVI_CONTENT_MASTER.md (PROD-065). Pending editorial publication.",
    sourceReferences: [
      {
        sourceType: "repository_document",
        sourceFile: "docs/content/OVI_CONTENT_MASTER.md",
        sourcePage: null,
        sourceSection: "2.7 Línea Biotecnología — PROD-065",
        verificationStatus: "source_confirmed",
        internalNote: "Official Eco-Zyme Solid description from content master inventory.",
      },
    ],
  },

  "cuidado-personal-biohand": {
    informationStatus: "partial",
    verificationStatus: "source_confirmed",
    publicationStatus: "pending_review",
    shortDescription:
      "Jabón líquido desinfectante y antibacterial para higiene personal en entornos industriales e institucionales.",
    aliases: ["OVI Biohand"],
    keywords: ["biohand", "jabón antibacterial", "desinfectante de manos", "higiene personal"],
    customerLanguageTerms: ["jabón desinfectante para manos", "jabón antibacterial industrial"],
    officialBenefits: [
      "Acción desinfectante y antibacterial en una sola aplicación",
      "Formulación líquida para dispensadores estándar",
      "Adecuado para uso continuo en entornos industriales e institucionales",
    ],
    differentiators: ["Combinación de limpieza y desinfección antibacterial en formato líquido"],
    relatedProducts: ["cuidado-personal-biosan", "cuidado-personal-quaterhand"],
    internalNotes:
      "WO-004 Phase II enrichment from OVI_CONTENT_MASTER.md (PROD-054). Pending editorial publication.",
    sourceReferences: [
      {
        sourceType: "repository_document",
        sourceFile: "docs/content/OVI_CONTENT_MASTER.md",
        sourcePage: null,
        sourceSection: "2.5 Línea Cuidado Personal — PROD-054",
        verificationStatus: "source_confirmed",
        internalNote: "Official Biohand description from content master inventory.",
      },
    ],
  },

  "cuidado-personal-biosan": {
    informationStatus: "partial",
    verificationStatus: "source_confirmed",
    publicationStatus: "pending_review",
    shortDescription: "Gel sanitizante antibacterial para manos y antebrazos. Uso sin agua.",
    aliases: ["OVI Biosan"],
    keywords: ["biosan", "gel sanitizante", "antibacterial", "sanitizante sin agua"],
    customerLanguageTerms: ["gel antibacterial", "sanitizante de manos sin agua"],
    officialBenefits: [
      "Gel sanitizante sin enjuague para uso rápido",
      "Acción antibacterial en manos y antebrazos",
      "Formulación de uso sin agua para puntos de control de higiene",
    ],
    differentiators: ["Formato gel de uso sin agua diferenciado del Biohand líquido"],
    relatedProducts: ["cuidado-personal-biohand", "cuidado-personal-quaterhand"],
    internalNotes:
      "WO-004 Phase II enrichment from OVI_CONTENT_MASTER.md (PROD-055). Pending editorial publication.",
    sourceReferences: [
      {
        sourceType: "repository_document",
        sourceFile: "docs/content/OVI_CONTENT_MASTER.md",
        sourcePage: null,
        sourceSection: "2.5 Línea Cuidado Personal — PROD-055",
        verificationStatus: "source_confirmed",
        internalNote: "Official Biosan description from content master inventory.",
      },
    ],
  },

  "cuidado-personal-quaterhand": {
    informationStatus: "partial",
    verificationStatus: "source_confirmed",
    publicationStatus: "pending_review",
    shortDescription:
      "Jabón líquido desinfectante y antibacterial con amonio cuaternario para higiene de alto nivel.",
    aliases: ["OVI Quaterhand"],
    keywords: ["quaterhand", "amonio cuaternario", "desinfectante de manos", "antibacterial"],
    customerLanguageTerms: [
      "jabón con amonio cuaternario",
      "desinfectante de alto nivel para manos",
    ],
    officialBenefits: [
      "Desinfección de alto nivel por amonio cuaternario",
      "Acción antibacterial potenciada",
      "Adecuado para entornos de alto requerimiento sanitario",
    ],
    differentiators: [
      "Formulación con amonio cuaternario para mayor poder desinfectante frente al Biohand estándar",
    ],
    relatedProducts: ["cuidado-personal-biohand", "cuidado-personal-biosan"],
    internalNotes:
      "WO-004 Phase II enrichment from OVI_CONTENT_MASTER.md (PROD-057). Pending editorial publication.",
    sourceReferences: [
      {
        sourceType: "repository_document",
        sourceFile: "docs/content/OVI_CONTENT_MASTER.md",
        sourcePage: null,
        sourceSection: "2.5 Línea Cuidado Personal — PROD-057",
        verificationStatus: "source_confirmed",
        internalNote: "Official Quaterhand description from content master inventory.",
      },
    ],
  },

  "cuidado-personal-biosoap": {
    informationStatus: "partial",
    verificationStatus: "source_confirmed",
    publicationStatus: "pending_review",
    shortDescription: "Jabón líquido antibacterial con aroma para higiene personal.",
    aliases: ["OVI Biosoap"],
    keywords: ["biosoap", "jabón con aroma", "antibacterial", "higiene personal"],
    customerLanguageTerms: ["jabón antibacterial aromático", "jabón de manos con fragancia"],
    officialBenefits: [
      "Acción antibacterial con fragancia agradable",
      "Formulación líquida para dispensadores estándar",
      "Adecuado para instalaciones institucionales con atención al usuario",
    ],
    differentiators: [
      "Incorpora aroma para mejorar la experiencia del usuario en espacios institucionales",
    ],
    relatedProducts: ["cuidado-personal-biohand"],
    internalNotes:
      "WO-004 Phase II enrichment from OVI_CONTENT_MASTER.md (PROD-056). Pending editorial publication.",
    sourceReferences: [
      {
        sourceType: "repository_document",
        sourceFile: "docs/content/OVI_CONTENT_MASTER.md",
        sourcePage: null,
        sourceSection: "2.5 Línea Cuidado Personal — PROD-056",
        verificationStatus: "source_confirmed",
        internalNote: "Official Biosoap description from content master inventory.",
      },
    ],
  },
};

function applyProductKnowledgeOverride(record: ProductKnowledge): ProductKnowledge {
  const override = OFFICIAL_PRODUCT_KNOWLEDGE_OVERRIDES[record.productId];
  if (!override) {
    return record;
  }

  return {
    ...record,
    ...override,
    sourceReferences: override.sourceReferences ?? record.sourceReferences,
    revision: record.revision + 1,
    updatedAt: "2026-07-20",
  };
}

// ─── Industrial (17 products) ─────────────────────────────────────────────────

const industrialKnowledge: ProductKnowledge[] = [
  createMinimalKnowledge("industrial-handsol", "handsol", "HANDSOL", "industrial"),
  createMinimalKnowledge("industrial-biodex", "biodex", "BIODEX", "industrial"),
  createMinimalKnowledge("industrial-degreaser", "degreaser", "DEGREASER", "industrial"),
  createMinimalKnowledge("industrial-biodelect", "biodelect", "BIODELECT", "industrial"),
  createMinimalKnowledge("industrial-ecotex", "ecotex", "ECOTEX", "industrial"),
  createMinimalKnowledge("industrial-solwash", "solwash", "SOLWASH", "industrial"),
  createMinimalKnowledge(
    "industrial-concrete-clean",
    "concrete-clean",
    "CONCRETE CLEAN",
    "industrial",
  ),
  createMinimalKnowledge("industrial-cr-30", "cr-30", "CR 30", "industrial"),
  createMinimalKnowledge("industrial-cr-30-s", "cr-30-s", "CR 30 S", "industrial"),
  createMinimalKnowledge("industrial-jp-35", "jp-35", "JP 35", "industrial"),
  createMinimalKnowledge("industrial-dust-off", "dust-off", "DUST OFF", "industrial"),
  createMinimalKnowledge(
    "industrial-ultradegreaser-i",
    "ultradegreaser-i",
    "ULTRADEGREASER I",
    "industrial",
  ),
  createMinimalKnowledge("industrial-litoclean", "litoclean", "LITOCLEAN", "industrial"),
  createMinimalKnowledge("industrial-improclean-e", "improclean-e", "IMPROCLEAN E", "industrial"),
  createMinimalKnowledge("industrial-gum-remove", "gum-remove", "GUM REMOVE", "industrial"),
  createMinimalKnowledge("industrial-contact-sol", "contact-sol", "CONTACT SOL", "industrial"),
  createMinimalKnowledge("industrial-ecolub", "ecolub", "ECOLUB", "industrial"),
];

// ─── Biotecnología (2 products) ───────────────────────────────────────────────

const biotecnologiaKnowledge: ProductKnowledge[] = [
  createMinimalKnowledge("biotecnologia-eco-zyme", "eco-zyme", "ECO-ZYME", "biotecnologia"),
  createMinimalKnowledge(
    "biotecnologia-eco-zyme-solid",
    "eco-zyme-solid",
    "ECO-ZYME SOLID",
    "biotecnologia",
  ),
];

// ─── Lavandería (6 products) ──────────────────────────────────────────────────

const lavanderiKnowledge: ProductKnowledge[] = [
  createMinimalKnowledge("lavanderia-detertex", "detertex", "DETERTEX", "lavanderia"),
  createMinimalKnowledge("lavanderia-degratex", "degratex", "DEGRATEX", "lavanderia"),
  createMinimalKnowledge("lavanderia-oxytex", "oxytex", "OXYTEX", "lavanderia"),
  createMinimalKnowledge("lavanderia-rintex", "rintex", "RINTEX", "lavanderia"),
  createMinimalKnowledge("lavanderia-oxifree", "oxifree", "OXIFREE", "lavanderia"),
  createMinimalKnowledge("lavanderia-clorotex", "clorotex", "CLOROTEX", "lavanderia"),
];

// ─── Alimentos (16 products) ──────────────────────────────────────────────────

const alimentosKnowledge: ProductKnowledge[] = [
  createMinimalKnowledge("alimentos-ecogrill", "ecogrill", "ECOGRILL", "alimentos"),
  createMinimalKnowledge(
    "alimentos-biodegreaser-a",
    "biodegreaser-a",
    "BIODEGREASER-A",
    "alimentos",
  ),
  createMinimalKnowledge(
    "alimentos-ultra-degreaser",
    "ultra-degreaser",
    "ULTRA DEGREASER",
    "alimentos",
  ),
  createMinimalKnowledge(
    "alimentos-chlorinne-detergent",
    "chlorinne-detergent",
    "CHLORINNE DETERGENT",
    "alimentos",
  ),
  createMinimalKnowledge("alimentos-ecoquat", "ecoquat", "ECOQUAT", "alimentos"),
  createMinimalKnowledge("alimentos-peroxol-a", "peroxol-a", "PEROXOL-A", "alimentos"),
  createMinimalKnowledge("alimentos-ecoblast", "ecoblast", "ECOBLAST", "alimentos"),
  createMinimalKnowledge("alimentos-hipoclor", "hipoclor", "HIPOCLOR", "alimentos"),
  createMinimalKnowledge("alimentos-biocetic", "biocetic", "BIOCETIC", "alimentos"),
  createMinimalKnowledge(
    "alimentos-eco-machine-rinse",
    "eco-machine-rinse",
    "ECO-MACHINE RINSE",
    "alimentos",
  ),
  createMinimalKnowledge("alimentos-eco-machine", "eco-machine", "ECO-MACHINE", "alimentos"),
  createMinimalKnowledge("alimentos-biocitric", "biocitric", "BIOCITRIC", "alimentos"),
  createMinimalKnowledge("alimentos-descaler-a", "descaler-a", "DESCALER-A", "alimentos"),
  createMinimalKnowledge("alimentos-neutrodex", "neutrodex", "NEUTRODEX", "alimentos"),
  createMinimalKnowledge("alimentos-cip-acido", "cip-acido", "CIP ÁCIDO", "alimentos"),
  createMinimalKnowledge("alimentos-cip-alcalino", "cip-alcalino", "CIP ALCALINO", "alimentos"),
];

// ─── Cuidado Personal (4 products) ───────────────────────────────────────────

const cuidadoPersonalKnowledge: ProductKnowledge[] = [
  createMinimalKnowledge("cuidado-personal-biohand", "biohand", "BIOHAND", "cuidado-personal"),
  createMinimalKnowledge("cuidado-personal-biosan", "biosan", "BIOSAN", "cuidado-personal"),
  createMinimalKnowledge(
    "cuidado-personal-quaterhand",
    "quaterhand",
    "QUATERHAND",
    "cuidado-personal",
  ),
  createMinimalKnowledge("cuidado-personal-biosoap", "biosoap", "BIOSOAP", "cuidado-personal"),
];

// ─── Hotelería (0 products) ───────────────────────────────────────────────────
// No official products are currently assigned to this sector.
// Sector is officially recognized but product list is pending catalog validation.

const hoteleriaKnowledge: ProductKnowledge[] = [];

// ─── Institucional (11 products) ─────────────────────────────────────────────

const institucionalKnowledge: ProductKnowledge[] = [
  createMinimalKnowledge("institucional-solfresh", "solfresh", "SOLFRESH", "institucional"),
  createMinimalKnowledge(
    "institucional-biodegreaser",
    "biodegreaser",
    "BIODEGREASER",
    "institucional",
  ),
  createMinimalKnowledge("institucional-peroxol", "peroxol", "PEROXOL", "institucional"),
  createMinimalKnowledge("institucional-bioglass", "bioglass", "BIOGLASS", "institucional"),
  createMinimalKnowledge("institucional-descaler", "descaler", "DESCALER", "institucional"),
  createMinimalKnowledge("institucional-ecoshine", "ecoshine", "ECOSHINE", "institucional"),
  createMinimalKnowledge("institucional-restorer", "restorer", "RESTORER", "institucional"),
  createMinimalKnowledge("institucional-floor-wax", "floor-wax", "FLOOR WAX", "institucional"),
  createMinimalKnowledge("institucional-ecowax", "ecowax", "ECOWAX", "institucional"),
  createMinimalKnowledge("institucional-ecoseal", "ecoseal", "ECOSEAL", "institucional"),
  createMinimalKnowledge("institucional-ecomov", "ecomov", "ECOMOV", "institucional"),
];

// ─── Combined Registry ────────────────────────────────────────────────────────

/**
 * Complete product knowledge registry — all 56 official OVI products.
 *
 * Products are in canonical sector order matching chemical-lines-data.ts.
 * Immutable product IDs are used as the join key.
 */
export const PRODUCT_KNOWLEDGE_REGISTRY: ProductKnowledge[] = [
  ...industrialKnowledge,
  ...biotecnologiaKnowledge,
  ...lavanderiKnowledge,
  ...alimentosKnowledge,
  ...cuidadoPersonalKnowledge,
  ...hoteleriaKnowledge,
  ...institucionalKnowledge,
].map(applyProductKnowledgeOverride);

/**
 * Precomputed lookup map for O(1) access by product ID.
 * Do not mutate this map.
 */
export const PRODUCT_KNOWLEDGE_MAP: ReadonlyMap<string, ProductKnowledge> = new Map(
  PRODUCT_KNOWLEDGE_REGISTRY.map((pk) => [pk.productId, pk]),
);

/** Total number of products in the knowledge registry. */
export const TOTAL_KNOWLEDGE_PRODUCTS = PRODUCT_KNOWLEDGE_REGISTRY.length;
