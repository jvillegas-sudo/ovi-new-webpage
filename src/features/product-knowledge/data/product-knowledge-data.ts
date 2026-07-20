/**
 * Product Knowledge Data
 * Work Order 008A — OVI Product Knowledge Engine
 *
 * Minimal knowledge records for all 56 official OVI products.
 *
 * Data Integrity Policy:
 *   All records are initialized with informationStatus: "minimal" because
 *   the repository audit found no official source with verified product details
 *   (shortDescription, applications, surfaces, industries, equipment, problems).
 *
 *   Fields will be enriched only when an authorized editor provides an official
 *   source reference. See docs/WORK-ORDER-008A-PRODUCT-KNOWLEDGE-ENGINE.md
 *   for instructions on how to safely add verified information.
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
];

/**
 * Precomputed lookup map for O(1) access by product ID.
 * Do not mutate this map.
 */
export const PRODUCT_KNOWLEDGE_MAP: ReadonlyMap<string, ProductKnowledge> = new Map(
  PRODUCT_KNOWLEDGE_REGISTRY.map((pk) => [pk.productId, pk]),
);

/** Total number of products in the knowledge registry. */
export const TOTAL_KNOWLEDGE_PRODUCTS = PRODUCT_KNOWLEDGE_REGISTRY.length;
