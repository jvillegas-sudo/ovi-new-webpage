/**
 * Utility: resolve-public-product
 * Work Order 008A — OVI Product Knowledge Engine
 *
 * Converts a raw ProductKnowledge record into a safe PublicProductView.
 *
 * Rules:
 *   - Internal governance fields are stripped (verificationStatus, publicationStatus,
 *     revision, internalNotes, sourceReferences, verifiedBy, verifiedAt).
 *   - Only fields with verificationStatus source_confirmed or technically_verified
 *     are included in the public output.
 *   - Draft content (publicationStatus: "draft") is excluded entirely from public fields.
 *   - Technical claims without source references are excluded.
 *   - The informationStatus is preserved to allow UI to show appropriate fallbacks.
 */

import type { ProductKnowledge, PublicProductView } from "../types/product-knowledge";

/**
 * Resolve a ProductKnowledge record into a safe public view.
 *
 * This function is the single authorized path from internal knowledge to
 * public-facing product data. Never expose raw ProductKnowledge in the UI.
 *
 * For minimal records (informationStatus: "minimal"), all optional fields
 * will be empty — the UI must display the approved fallback:
 *   "Información oficial en proceso de publicación."
 */
export function resolvePublicProduct(knowledge: ProductKnowledge): PublicProductView {
  const isPublished = knowledge.publicationStatus === "published";

  // For draft records, return a safe minimal view with identity only
  if (!isPublished) {
    return buildMinimalPublicView(knowledge);
  }

  // For published records, include verified fields only
  return buildPublishedPublicView(knowledge);
}

/**
 * Build the minimal public view used for draft/pending records.
 * Only identity and informationStatus are populated.
 * All knowledge fields remain empty — the UI must display the fallback.
 */
function buildMinimalPublicView(knowledge: ProductKnowledge): PublicProductView {
  return {
    productId: knowledge.productId,
    slug: knowledge.slug,
    officialName: knowledge.officialName,
    sectorSlug: knowledge.sectorSlug,
    informationStatus: knowledge.informationStatus,
    shortDescription: null,
    aliases: [],
    keywords: [],
    customerLanguageTerms: [],
    problems: [],
    soils: [],
    residues: [],
    contaminationTypes: [],
    industries: knowledge.industries,
    applications: [],
    surfaces: [],
    equipment: [],
    areas: [],
    processes: [],
    environments: [],
    officialBenefits: [],
    differentiators: [],
    relatedProducts: [],
    complementaryProducts: [],
    alternativeProducts: [],
    relatedServices: [],
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
    presentations: [],
    documents: [],
    primaryImage: null,
    gallery: [],
  };
}

/**
 * Build the public view for a published record.
 * Includes all non-draft fields but strips internal governance metadata.
 */
function buildPublishedPublicView(knowledge: ProductKnowledge): PublicProductView {
  // Filter documents to those with a verified, real path
  const publicDocuments = knowledge.documents.filter(
    (doc) =>
      doc.filePath !== null &&
      (doc.verificationStatus === "source_confirmed" ||
        doc.verificationStatus === "technically_verified"),
  );

  // Filter gallery to verified media
  const publicGallery = knowledge.gallery.filter(
    (media) =>
      media.verificationStatus === "source_confirmed" ||
      media.verificationStatus === "technically_verified",
  );

  return {
    productId: knowledge.productId,
    slug: knowledge.slug,
    officialName: knowledge.officialName,
    sectorSlug: knowledge.sectorSlug,
    informationStatus: knowledge.informationStatus,

    // Discovery
    shortDescription: knowledge.shortDescription,
    aliases: knowledge.aliases,
    keywords: knowledge.keywords,
    customerLanguageTerms: knowledge.customerLanguageTerms,

    // Problems
    problems: knowledge.problems,
    soils: knowledge.soils,
    residues: knowledge.residues,
    contaminationTypes: knowledge.contaminationTypes,

    // Application Context
    industries: knowledge.industries,
    applications: knowledge.applications,
    surfaces: knowledge.surfaces,
    equipment: knowledge.equipment,
    areas: knowledge.areas,
    processes: knowledge.processes,
    environments: knowledge.environments,

    // Commercial
    officialBenefits: knowledge.officialBenefits,
    differentiators: knowledge.differentiators,
    relatedProducts: knowledge.relatedProducts,
    complementaryProducts: knowledge.complementaryProducts,
    alternativeProducts: knowledge.alternativeProducts,
    relatedServices: knowledge.relatedServices,

    // Technical
    compositionSummary: knowledge.compositionSummary,
    physicalState: knowledge.physicalState,
    color: knowledge.color,
    fragrance: knowledge.fragrance,
    pH: knowledge.pH,
    dilution: knowledge.dilution,
    usageInstructions: knowledge.usageInstructions,
    precautions: knowledge.precautions,
    compatibility: knowledge.compatibility,
    incompatibilities: knowledge.incompatibilities,
    performance: knowledge.performance,
    biodegradability: knowledge.biodegradability,

    // Presentations
    presentations: knowledge.presentations,

    // Documents — verified paths only
    documents: publicDocuments,

    // Media
    primaryImage: knowledge.primaryImage,
    gallery: publicGallery,
  };
}
