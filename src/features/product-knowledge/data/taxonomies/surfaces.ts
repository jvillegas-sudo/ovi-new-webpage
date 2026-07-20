/**
 * Taxonomy: Surfaces
 * Work Order 008A — OVI Product Knowledge Engine
 *
 * Controlled vocabulary for compatible surfaces.
 *
 * Sources: src/knowledge/surfaces/catalog.ts (existing OVI Knowledge Base).
 * Only entries from the existing catalog are referenced here.
 * Product-to-surface associations require separate official confirmation.
 */

export interface SurfaceTaxonomyItem {
  id: string;
  slug: string;
  label: string;
  description: string | null;
  publicationStatus: "published" | "draft";
}

/**
 * Official surface taxonomy.
 * IDs align with src/knowledge/surfaces/catalog.ts for cross-reference compatibility.
 * Entries are intentionally minimal pending per-product official verification.
 */
export const SURFACES: SurfaceTaxonomyItem[] = [
  {
    id: "acero-inoxidable",
    slug: "acero-inoxidable",
    label: "Acero inoxidable",
    description: "Material metálico resistente a la corrosión.",
    publicationStatus: "published",
  },
  {
    id: "aluminio",
    slug: "aluminio",
    label: "Aluminio",
    description: "Metal liviano, sensible a álcalis fuertes y ácidos concentrados.",
    publicationStatus: "published",
  },
  {
    id: "concreto-sellado",
    slug: "concreto-sellado",
    label: "Concreto sellado",
    description: "Superficies de concreto con recubrimiento protector.",
    publicationStatus: "published",
  },
  {
    id: "ceramica",
    slug: "ceramica",
    label: "Cerámica",
    description: "Pisos y paredes de cerámica.",
    publicationStatus: "published",
  },
  {
    id: "pisos-sellados",
    slug: "pisos-sellados",
    label: "Pisos sellados",
    description: "Cualquier piso tratado con sellador.",
    publicationStatus: "published",
  },
  {
    id: "vidrio",
    slug: "vidrio",
    label: "Vidrio",
    description: "Superficies de vidrio.",
    publicationStatus: "published",
  },
];

export function getSurfaceById(id: string): SurfaceTaxonomyItem | undefined {
  return SURFACES.find((s) => s.id === id);
}

export function getPublishedSurfaces(): SurfaceTaxonomyItem[] {
  return SURFACES.filter((s) => s.publicationStatus === "published");
}
