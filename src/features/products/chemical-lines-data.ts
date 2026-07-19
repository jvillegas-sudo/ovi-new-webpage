export type ProductStatus =
  "active" | "pending-content" | "pending-image" | "pending-catalog-validation";

export interface OviProductRecord {
  id: string;
  slug: string;
  officialName: string;
  sector: string;
  shortDescription: string | null;
  image: string | null;
  imageAlt: string | null;
  catalogPage: number | null;
  applications: string[];
  availablePresentations: string[];
  technicalSheet: string | null;
  safetySheet: string | null;
  status: ProductStatus;
}

export interface OviSector {
  slug: string;
  officialName: string;
  products: OviProductRecord[];
  contentGap?: string;
}

function createProduct(
  sectorSlug: string,
  sectorName: string,
  officialName: string,
): OviProductRecord {
  const slug = officialName
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  return {
    id: `${sectorSlug}-${slug}`,
    slug,
    officialName,
    sector: sectorName,
    shortDescription: null,
    image: `/ovi-media/products/${sectorSlug}/${sectorSlug}-${slug}.webp`,
    imageAlt: null,
    catalogPage: null,
    applications: [],
    availablePresentations: [],
    technicalSheet: null,
    safetySheet: null,
    status: "pending-catalog-validation",
  };
}

export const OVI_SECTORS: OviSector[] = [
  {
    slug: "industrial",
    officialName: "Industrial",
    products: [
      "HANDSOL",
      "BIODEX",
      "DEGREASER",
      "BIODELECT",
      "ECOTEX",
      "SOLWASH",
      "CONCRETE CLEAN",
      "CR 30",
      "CR 30 S",
      "JP 35",
      "DUST OFF",
      "ULTRADEGREASER I",
      "LITOCLEAN",
      "IMPROCLEAN E",
      "GUM REMOVE",
      "CONTACT SOL",
      "ECOLUB",
    ].map((name) => createProduct("industrial", "Industrial", name)),
  },
  {
    slug: "biotecnologia",
    officialName: "Biotecnología",
    products: ["ECO-ZYME", "ECO-ZYME SOLID"].map((name) =>
      createProduct("biotecnologia", "Biotecnología", name),
    ),
  },
  {
    slug: "lavanderia",
    officialName: "Lavandería",
    products: ["DETERTEX", "DEGRATEX", "OXYTEX", "RINTEX", "OXIFREE", "CLOROTEX"].map((name) =>
      createProduct("lavanderia", "Lavandería", name),
    ),
  },
  {
    slug: "alimentos",
    officialName: "Alimentos",
    products: [
      "ECOGRILL",
      "BIODEGREASER-A",
      "ULTRA DEGREASER",
      "CHLORINNE DETERGENT",
      "ECOQUAT",
      "PEROXOL-A",
      "ECOBLAST",
      "HIPOCLOR",
      "BIOCETIC",
      "ECO-MACHINE RINSE",
      "ECO-MACHINE",
      "BIOCITRIC",
      "DESCALER-A",
      "NEUTRODEX",
      "CIP ÁCIDO",
      "CIP ALCALINO",
    ].map((name) => createProduct("alimentos", "Alimentos", name)),
  },
  {
    slug: "cuidado-personal",
    officialName: "Protección y Cuidado Personal",
    products: ["BIOHAND", "BIOSAN", "QUATERHAND", "BIOSOAP"].map((name) =>
      createProduct("cuidado-personal", "Protección y Cuidado Personal", name),
    ),
  },
  {
    slug: "hoteleria",
    officialName: "Hotelería",
    products: [],
    contentGap:
      "Pendiente validación del catálogo oficial para confirmar productos independientes del sector Hotelería.",
  },
  {
    slug: "institucional",
    officialName: "Institucional y Mantenimiento",
    products: [
      "SOLFRESH",
      "BIODEGREASER",
      "PEROXOL",
      "BIOGLASS",
      "DESCALER",
      "ECOSHINE",
      "RESTORER",
      "FLOOR WAX",
      "ECOWAX",
      "ECOSEAL",
      "ECOMOV",
    ].map((name) => createProduct("institucional", "Institucional y Mantenimiento", name)),
  },
];

export const TOTAL_PRODUCTS = OVI_SECTORS.reduce((acc, sector) => acc + sector.products.length, 0);

export function getSectorBySlug(slug: string): OviSector | undefined {
  return OVI_SECTORS.find((sector) => sector.slug === slug);
}

export function getProductBySlug(
  sectorSlug: string,
  productSlug: string,
): OviProductRecord | undefined {
  const sector = getSectorBySlug(sectorSlug);
  return sector?.products.find((product) => product.slug === productSlug);
}
