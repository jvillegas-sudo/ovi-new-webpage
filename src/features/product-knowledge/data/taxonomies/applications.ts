/**
 * Taxonomy: Applications
 * Work Order 008A — OVI Product Knowledge Engine
 *
 * Controlled vocabulary for product application contexts.
 * Entries are added only when supported by official repository sources.
 *
 * Currently empty pending official source verification.
 * Entries will be added as product knowledge records are enriched.
 */

export interface ApplicationTaxonomyItem {
  id: string;
  slug: string;
  label: string;
  description: string | null;
  publicationStatus: "published" | "draft";
}

/**
 * Official application taxonomy.
 * Intentionally minimal — populated only from officially verified sources.
 */
export const APPLICATIONS: ApplicationTaxonomyItem[] = [];

export function getApplicationById(id: string): ApplicationTaxonomyItem | undefined {
  return APPLICATIONS.find((a) => a.id === id);
}

export function getPublishedApplications(): ApplicationTaxonomyItem[] {
  return APPLICATIONS.filter((a) => a.publicationStatus === "published");
}
