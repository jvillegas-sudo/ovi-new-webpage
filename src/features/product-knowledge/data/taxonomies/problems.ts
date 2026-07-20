/**
 * Taxonomy: Problems
 * Work Order 008A — OVI Product Knowledge Engine
 *
 * Controlled vocabulary for cleaning problems and needs.
 *
 * Entries are added only when officially supported.
 * Currently minimal pending per-product official verification.
 */

export interface ProblemTaxonomyItem {
  id: string;
  slug: string;
  label: string;
  description: string | null;
  publicationStatus: "published" | "draft";
}

/**
 * Official cleaning problems taxonomy.
 * Intentionally minimal — populated only from officially verified sources.
 */
export const PROBLEMS: ProblemTaxonomyItem[] = [];

export function getProblemById(id: string): ProblemTaxonomyItem | undefined {
  return PROBLEMS.find((p) => p.id === id);
}

export function getPublishedProblems(): ProblemTaxonomyItem[] {
  return PROBLEMS.filter((p) => p.publicationStatus === "published");
}
