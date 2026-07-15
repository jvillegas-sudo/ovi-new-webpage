/**
 * OVI Knowledge Home — Query Layer
 * Work Order 004 · Home Intelligence Integration
 *
 * Thin adapter that merges KB entities with home display configs.
 * Components import from here — never directly from deep KB paths.
 * Results are module-level memoized (pure functions over static data).
 */

import { officialSectors } from "@knowledge/sectors/official-catalog";
import { officialServices } from "@knowledge/services/official-catalog";
import { officialProducts } from "@knowledge/products/official-catalog";
import { getSectorDisplayConfig } from "./sector-display";
import type { SectorDisplayConfig } from "./sector-display";
import type { OviKnowledgeSector, OviKnowledgeService, OviKnowledgeProduct } from "@knowledge";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface HomeDisplaySector extends OviKnowledgeSector {
  iconName: SectorDisplayConfig["iconName"];
  colorClass: string;
}

export interface HomeDisplayService {
  id: string;
  nombre: string;
  descripcion: string;
  beneficios: string[];
}

export interface HomeDisplayProduct {
  id: string;
  nombre: string;
  categoria: string;
  descripcion: string;
}

// ─── Sectors ──────────────────────────────────────────────────────────────────

/** Memoized: KB sectors merged with display config */
const _sectors: HomeDisplaySector[] = officialSectors.map((sector) => {
  const display = getSectorDisplayConfig(sector.id);
  return {
    ...sector,
    iconName: display.iconName,
    colorClass: display.colorClass,
  };
});

export function getHomeSectors(): HomeDisplaySector[] {
  return _sectors;
}

// ─── Services ─────────────────────────────────────────────────────────────────

/** Featured service IDs for the home page highlights */
const FEATURED_SERVICE_IDS = [
  "lavado-flota",
  "limpieza-industrial",
  "diagnostico-tecnico",
  "implementacion-protocolo",
];

/** Memoized: featured services for home */
const _services: HomeDisplayService[] = officialServices
  .filter((s) => FEATURED_SERVICE_IDS.includes(s.id))
  .sort((a, b) => FEATURED_SERVICE_IDS.indexOf(a.id) - FEATURED_SERVICE_IDS.indexOf(b.id))
  .map((s) => ({
    id: s.id,
    nombre: s.nombre,
    descripcion: s.descripcion,
    beneficios: s.beneficios,
  }));

export function getHomeServices(): HomeDisplayService[] {
  return _services;
}

// ─── Products ─────────────────────────────────────────────────────────────────

/** Featured product IDs for the home page highlights */
const FEATURED_PRODUCT_IDS = [
  "ovi-biodex",
  "ovi-ecoseal",
  "ovi-precision-foam-kit",
  "ovi-dose-control-cart",
];

/** Memoized: featured products for home */
const _products: HomeDisplayProduct[] = officialProducts
  .filter((p) => FEATURED_PRODUCT_IDS.includes(p.id))
  .sort((a, b) => FEATURED_PRODUCT_IDS.indexOf(a.id) - FEATURED_PRODUCT_IDS.indexOf(b.id))
  .map((p) => ({
    id: p.id,
    nombre: p.nombre,
    categoria: p.categoria,
    descripcion: p.descripcion,
  }));

export function getHomeProducts(): HomeDisplayProduct[] {
  return _products;
}
