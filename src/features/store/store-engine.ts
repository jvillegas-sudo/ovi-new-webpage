/**
 * OVI Store Engine
 * Work Order 008 — OVI Store Intelligent Commerce Platform
 *
 * This module is the integration layer between the OVI Store UI and the
 * OVI Knowledge Base / Knowledge Engine.
 *
 * All product, protocol, service, equipment, and sector data consumed by
 * the store MUST flow through this engine — never through manual data lists.
 *
 * Architecture prepared for:
 *   Shopify · WooCommerce · Stripe · PayPal · Inventario · ERP · OVI OS
 */

import {
  products,
  getProduct,
  getProductContext,
  getProductsByCategory,
  getProductsBySector,
  getProductsByContamination,
  protocols,
  services,
  sectors,
  contaminationTypes,
  surfaces,
  getDocumentsByEntity,
  getDocumentsByType,
} from "@knowledge";

import type {
  OviProduct,
  OviProtocol,
  OviService,
  OviProductCategory,
  OviDocument,
  OviEquipment,
  OviSector,
  OviContaminationType,
  OviSurface,
} from "@knowledge";

// ─── Re-export KB types ───────────────────────────────────────────────────────

export type { OviProduct, OviProtocol, OviService, OviDocument };

// ─── Store-specific types ─────────────────────────────────────────────────────

/** Full product context resolved by the Knowledge Engine */
export interface StoreProductContext {
  product: OviProduct;
  relatedProducts: OviProduct[];
  protocols: OviProtocol[];
  services: OviService[];
  equipment: OviEquipment[];
  sectors: OviSector[];
  contamination: OviContaminationType[];
  surfaces: OviSurface[];
  fichaTecnica: OviDocument | null;
  msds: OviDocument | null;
}

/** Sector overview for store catalogue navigation */
export interface StoreSectorOverview {
  id: string;
  nombre: string;
  descripcion: string;
  desafios: string[];
  products: OviProduct[];
  protocols: OviProtocol[];
  services: OviService[];
}

/** Application case linking a sector, contamination type, and solution */
export interface StoreApplicationCase {
  id: string;
  sectorId: string;
  sectorNombre: string;
  titulo: string;
  descripcion: string;
  contaminacion: string;
  superficie: string;
  products: OviProduct[];
  protocols: OviProtocol[];
  services: OviService[];
}

// ─── Product queries ──────────────────────────────────────────────────────────

/** All active/in-revision products from the Knowledge Base */
export function getStoreProducts(): OviProduct[] {
  return products.filter((p) => p.status !== "inactivo");
}

/** Single product by ID — returns null if not found or inactive */
export function getStoreProduct(id: string): OviProduct | null {
  const p = getProduct(id);
  if (!p || p.status === "inactivo") return null;
  return p;
}

/** Products for a given category, active only */
export function getStoreProductsByCategory(category: OviProductCategory): OviProduct[] {
  return getProductsByCategory(category).filter((p) => p.status !== "inactivo");
}

/** Products for a given sector ID */
export function getStoreProductsBySector(sectorId: string): OviProduct[] {
  return getProductsBySector(sectorId).filter((p) => p.status !== "inactivo");
}

/** Static params for Next.js generateStaticParams */
export function getStoreProductStaticParams(): Array<{ slug: string }> {
  return getStoreProducts().map((p) => ({ slug: p.id }));
}

// ─── Full product context (Knowledge Engine integration) ──────────────────────

/**
 * Returns the full context for a product, including all related entities
 * resolved automatically by the Knowledge Engine — no manual relationships.
 */
export function getStoreProductContext(id: string): StoreProductContext | null {
  const ctx = getProductContext(id);
  if (!ctx) return null;

  const productDocs = getDocumentsByEntity("producto", id);
  const fichaTecnica = productDocs.find((d) => d.tipo === "ficha-tecnica") ?? null;
  const msds = productDocs.find((d) => d.tipo === "msds") ?? null;

  return {
    product: ctx.product,
    relatedProducts: ctx.relatedProducts,
    protocols: ctx.protocols,
    services: ctx.services,
    equipment: ctx.equipment,
    sectors: ctx.sectors,
    contamination: ctx.contamination,
    surfaces: ctx.surfaces,
    fichaTecnica,
    msds,
  };
}

// ─── Sector overviews ─────────────────────────────────────────────────────────

/** Returns all sector overviews for the store catalogue */
export function getStoreSectorOverviews(): StoreSectorOverview[] {
  const activeSectors = sectors.filter((s) => s.status !== "inactivo");

  return activeSectors.map((sector) => {
    const sectorProducts = getProductsBySector(sector.id).filter((p) => p.status !== "inactivo");
    const sectorProtocols = protocols.filter(
      (proto) => proto.sectores.includes(sector.id) && proto.status !== "inactivo",
    );
    const sectorServices = services.filter(
      (svc) => svc.sectores.includes(sector.id) && svc.status !== "inactivo",
    );

    return {
      id: sector.id,
      nombre: sector.nombre,
      descripcion: sector.descripcion,
      desafios: sector.desafios,
      products: sectorProducts,
      protocols: sectorProtocols,
      services: sectorServices,
    };
  });
}

// ─── Application cases ────────────────────────────────────────────────────────

/**
 * Generates application cases from the Knowledge Base by cross-referencing
 * sector × contamination type × compatible products.
 * Cases are derived automatically — no manual data entry.
 */
export function getStoreApplicationCases(): StoreApplicationCase[] {
  const cases: StoreApplicationCase[] = [];

  const activeSectors = sectors.filter((s) => s.status !== "inactivo").slice(0, 6);

  for (const sector of activeSectors) {
    // Find contamination types relevant to this sector
    const sectorContamination = contaminationTypes.filter(
      (c) => c.sectoresHabituales.includes(sector.id) && c.status !== "inactivo",
    );

    for (const contamination of sectorContamination.slice(0, 2)) {
      const caseProducts = getProductsByContamination(contamination.id).filter(
        (p) => p.industrias.includes(sector.id) && p.status !== "inactivo",
      );

      if (caseProducts.length === 0) continue;

      const caseProtocols = protocols.filter(
        (proto) =>
          proto.sectores.includes(sector.id) &&
          proto.tiposSuciedad.includes(contamination.id) &&
          proto.status !== "inactivo",
      );

      const productIds = caseProducts.map((p) => p.id);
      const caseServices = services.filter(
        (svc) =>
          svc.sectores.includes(sector.id) &&
          svc.productosAsociados.some((pid) => productIds.includes(pid)),
      );

      // Find a primary compatible surface from the first product
      const primarySurface =
        caseProducts[0]?.superficiesCompatibles[0] ??
        surfaces.find((s) => s.status === "activo")?.id ??
        "acero-inoxidable";

      const surfaceObj = surfaces.find((s) => s.id === primarySurface);

      cases.push({
        id: `${sector.id}-${contamination.id}`,
        sectorId: sector.id,
        sectorNombre: sector.nombre,
        titulo: `${sector.nombre} — ${contamination.nombre}`,
        descripcion: `Caso de aplicación para eliminar ${contamination.nombre.toLowerCase()} en entornos de ${sector.nombre.toLowerCase()}. ${contamination.descripcion}`,
        contaminacion: contamination.nombre,
        superficie: surfaceObj?.nombre ?? primarySurface,
        products: caseProducts,
        protocols: caseProtocols,
        services: caseServices,
      });
    }
  }

  return cases;
}

// ─── Comparator ───────────────────────────────────────────────────────────────

/** Returns comparison data for two or more products */
export function compareStoreProducts(productIds: string[]) {
  return productIds.map((id) => getStoreProductContext(id)).filter(Boolean);
}

// ─── Featured products ────────────────────────────────────────────────────────

/** Returns up to N active products for store hero / featured sections */
export function getFeaturedStoreProducts(limit = 6): OviProduct[] {
  return products.filter((p) => p.status === "activo").slice(0, limit);
}

// ─── Documents ────────────────────────────────────────────────────────────────

/** Returns all downloadable technical documents (fichas técnicas) */
export function getAllFichasTecnicas(): OviDocument[] {
  return getDocumentsByType("ficha-tecnica");
}

/** Returns all MSDS documents */
export function getAllMsds(): OviDocument[] {
  return getDocumentsByType("msds");
}

// ─── Protocol catalogue ───────────────────────────────────────────────────────

/** Returns all active protocols for the store protocols section */
export function getStoreProtocols(): OviProtocol[] {
  return protocols.filter((p) => p.status !== "inactivo");
}

/** Returns all active services for the store services section */
export function getStoreServices(): OviService[] {
  return services.filter((s) => s.status !== "inactivo");
}

// ─── Future integration stubs ─────────────────────────────────────────────────
//
// The following stubs are architecture placeholders for future payment and
// e-commerce integrations. They accept the cart payload from cart.store.ts
// and will delegate to the appropriate provider once activated.
//
// Do NOT implement these now — see Work Order 008 preparation requirements.

export const futureIntegrations = {
  shopify: { status: "pendiente" as const, descripcion: "Shopify Storefront API integration" },
  woocommerce: { status: "pendiente" as const, descripcion: "WooCommerce REST API integration" },
  stripe: { status: "pendiente" as const, descripcion: "Stripe Payment Intent API integration" },
  paypal: { status: "pendiente" as const, descripcion: "PayPal Orders API integration" },
  inventario: { status: "pendiente" as const, descripcion: "Inventory management module" },
  erp: { status: "pendiente" as const, descripcion: "ERP order synchronization" },
  oviOs: { status: "pendiente" as const, descripcion: "OVI OS operational traceability" },
} as const;
