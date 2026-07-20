/**
 * Taxonomies — Public API
 * Work Order 008A — OVI Product Knowledge Engine
 */

export { INDUSTRIES, getIndustryById, getPublishedIndustries } from "./industries";
export type { IndustryTaxonomyItem } from "./industries";

export { APPLICATIONS, getApplicationById, getPublishedApplications } from "./applications";
export type { ApplicationTaxonomyItem } from "./applications";

export { SURFACES, getSurfaceById, getPublishedSurfaces } from "./surfaces";
export type { SurfaceTaxonomyItem } from "./surfaces";

export { EQUIPMENT, getEquipmentById, getPublishedEquipment } from "./equipment";
export type { EquipmentTaxonomyItem } from "./equipment";

export { PROBLEMS, getProblemById, getPublishedProblems } from "./problems";
export type { ProblemTaxonomyItem } from "./problems";

import { INDUSTRIES } from "./industries";
import { APPLICATIONS } from "./applications";
import { SURFACES } from "./surfaces";
import { EQUIPMENT } from "./equipment";
import { PROBLEMS } from "./problems";

/** Complete set of valid taxonomy IDs for validation purposes. */
export function getAllTaxonomyIds(): {
  industryIds: string[];
  applicationIds: string[];
  surfaceIds: string[];
  equipmentIds: string[];
  problemIds: string[];
} {
  return {
    industryIds: INDUSTRIES.map((i) => i.id),
    applicationIds: APPLICATIONS.map((a) => a.id),
    surfaceIds: SURFACES.map((s) => s.id),
    equipmentIds: EQUIPMENT.map((e) => e.id),
    problemIds: PROBLEMS.map((p) => p.id),
  };
}
