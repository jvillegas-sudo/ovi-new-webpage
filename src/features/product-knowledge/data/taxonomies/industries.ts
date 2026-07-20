/**
 * Taxonomy: Industries
 * Work Order 008A — OVI Product Knowledge Engine
 *
 * Controlled vocabulary for industries.
 * Only entries supported by the official OVI sector structure are included.
 *
 * Source: src/features/products/chemical-lines-data.ts — 7 official sectors.
 * The seven OVI sectors are preserved exactly as established by the canonical source.
 */

export interface IndustryTaxonomyItem {
  id: string;
  slug: string;
  label: string;
  description: string | null;
  publicationStatus: "published" | "draft";
}

/**
 * Official industry taxonomy.
 * Entries map 1:1 to the seven official OVI sectors from chemical-lines-data.ts.
 * Additional subsector entries may be added when supported by official sources.
 */
export const INDUSTRIES: IndustryTaxonomyItem[] = [
  {
    id: "industrial",
    slug: "industrial",
    label: "Industrial",
    description: "Industria pesada, automotriz, metalmecánica, petroquímica y construcción.",
    publicationStatus: "published",
  },
  {
    id: "biotecnologia",
    slug: "biotecnologia",
    label: "Biotecnología",
    description: "Aplicaciones biotecnológicas y tratamiento enzimático.",
    publicationStatus: "published",
  },
  {
    id: "lavanderia",
    slug: "lavanderia",
    label: "Lavandería",
    description: "Lavado industrial y comercial de textiles.",
    publicationStatus: "published",
  },
  {
    id: "alimentos",
    slug: "alimentos",
    label: "Alimentos",
    description: "Industria alimentaria y procesamiento de alimentos.",
    publicationStatus: "published",
  },
  {
    id: "cuidado-personal",
    slug: "cuidado-personal",
    label: "Protección y Cuidado Personal",
    description: "Higiene, desinfección y protección personal.",
    publicationStatus: "published",
  },
  {
    id: "hoteleria",
    slug: "hoteleria",
    label: "Hotelería",
    description: null,
    publicationStatus: "draft",
  },
  {
    id: "institucional",
    slug: "institucional",
    label: "Institucional y Mantenimiento",
    description: "Mantenimiento de instalaciones institucionales, educativas y hospitalarias.",
    publicationStatus: "published",
  },
];

export function getIndustryById(id: string): IndustryTaxonomyItem | undefined {
  return INDUSTRIES.find((i) => i.id === id);
}

export function getPublishedIndustries(): IndustryTaxonomyItem[] {
  return INDUSTRIES.filter((i) => i.publicationStatus === "published");
}
