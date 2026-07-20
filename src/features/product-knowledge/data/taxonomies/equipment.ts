/**
 * Taxonomy: Equipment
 * Work Order 008A — OVI Product Knowledge Engine
 *
 * Controlled vocabulary for compatible equipment.
 *
 * Sources: src/knowledge/equipment/catalog.ts (existing OVI Knowledge Base).
 * Equipment-to-product associations require per-product official verification.
 */

export interface EquipmentTaxonomyItem {
  id: string;
  slug: string;
  label: string;
  description: string | null;
  publicationStatus: "published" | "draft";
}

/**
 * Official equipment taxonomy.
 * IDs align with src/knowledge/equipment/catalog.ts for cross-reference compatibility.
 */
export const EQUIPMENT: EquipmentTaxonomyItem[] = [
  {
    id: "ovi-flota-rinse-arch",
    slug: "ovi-flota-rinse-arch",
    label: "OVI Flota Rinse Arch",
    description: "Sistema de enjuague para flota y activos de gran volumen.",
    publicationStatus: "published",
  },
  {
    id: "ovi-dose-control-cart",
    slug: "ovi-dose-control-cart",
    label: "OVI Dose Control Cart",
    description: "Sistema de dosificación controlada para protocolos OVI.",
    publicationStatus: "published",
  },
];

export function getEquipmentById(id: string): EquipmentTaxonomyItem | undefined {
  return EQUIPMENT.find((e) => e.id === id);
}

export function getPublishedEquipment(): EquipmentTaxonomyItem[] {
  return EQUIPMENT.filter((e) => e.publicationStatus === "published");
}
