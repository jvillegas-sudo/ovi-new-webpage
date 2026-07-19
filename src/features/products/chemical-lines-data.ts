/**
 * OVI Catálogo Oficial — Líneas de Productos Químicos
 *
 * Estructura de navegación por líneas de negocio del catálogo oficial OVI.
 * Cada línea agrupa los productos reales de la formulación OVI.
 *
 * Fuente: Catálogo oficial OVI — Ingeniería en Limpieza.
 * Restricción WO-023: NO inventar categorías, NO usar productos ficticios.
 */

// ─── Types ─────────────────────────────────────────────────────────────────────

export interface OviProduct {
  name: string;
  tagline: string;
}

export interface ChemicalLine {
  /** URL-safe slug for routing */
  slug: string;
  /** Display name of the line */
  name: string;
  /** One-line subtitle describing the line's purpose */
  subtitle: string;
  /** Rich description for the line card (2–3 sentences) */
  description: string;
  /** Industries / sectors this line serves */
  industries: string[];
  /** Actual product count from official catalog */
  productCount: number;
  /** Official products in this line (name + one-line tagline) */
  products: OviProduct[];
  /** Primary accent color (CSS value) */
  accentColor: string;
  /** Secondary/bg tint for the card */
  accentBg: string;
  /** Border accent */
  accentBorder: string;
  /** Gradient direction identifier — used to render the visual plate */
  gradientFrom: string;
  gradientTo: string;
  /** Category badge label */
  badge: string;
}

// ─── Líneas Oficiales del Catálogo OVI ─────────────────────────────────────────

export const CHEMICAL_LINES: ChemicalLine[] = [
  // ── 1. OVI Alimentos ───────────────────────────────────────────────────────
  {
    slug: "alimentos",
    name: "OVI Alimentos",
    subtitle: "Línea de higiene para industria alimentaria",
    description:
      "Formulaciones de grado alimentario diseñadas para limpiar y desinfectar superficies, equipos y ambientes en plantas de procesamiento y cadenas de producción de alimentos. Cumplen normas sanitarias y de inocuidad.",
    industries: [
      "Plantas de alimentos",
      "Cadenas de producción",
      "Cocinas industriales",
      "Industria cárnica",
      "Lácteos",
    ],
    productCount: 16,
    products: [
      { name: "Ecogrill", tagline: "Desengrasante para parrillas y superficies de cocción" },
      { name: "Biodegreaser-A", tagline: "Desengrasante biodegradable grado alimentario" },
      { name: "Ultradegreaser", tagline: "Desengrasante de alto poder para grasa severa" },
      {
        name: "Peroxol-A",
        tagline: "Desinfectante a base de peróxido para superficies de contacto",
      },
      { name: "Chlorinne Detergent", tagline: "Detergente clorado para limpieza y desinfección" },
      { name: "Ecoquat", tagline: "Sanitizante de amonio cuaternario" },
      { name: "Ecoblast", tagline: "Limpiador de alta presión para plantas de proceso" },
      { name: "Hipoclor", tagline: "Hipoclorito de sodio estabilizado para desinfección" },
      { name: "Biocetic", tagline: "Ácido acético biológico para sanitización de superficies" },
      { name: "Biocitric", tagline: "Ácido cítrico para remoción de mineral y sarro" },
      { name: "Eco-Machine Rinse", tagline: "Abrillantador para máquinas lavaplatos industriales" },
      { name: "Eco-Machine", tagline: "Detergente para máquinas lavaplatos industriales" },
      { name: "Descaler-A", tagline: "Descalcificador ácido para superficies metálicas" },
      { name: "Neutrodex", tagline: "Neutralizador pH para tratamiento de aguas de proceso" },
      { name: "Cip Alcalino", tagline: "Limpiador CIP alcalino para sistemas de circuito cerrado" },
      { name: "Cip Ácido", tagline: "Limpiador CIP ácido para remoción de mineral en circuito" },
    ],
    accentColor: "var(--color-brand-accent)",
    accentBg: "rgba(0,255,133,0.07)",
    accentBorder: "rgba(0,255,133,0.22)",
    gradientFrom: "rgba(0,255,133,0.18)",
    gradientTo: "rgba(0,196,255,0.06)",
    badge: "Industria Alimentaria",
  },

  // ── 2. OVI Industrial ──────────────────────────────────────────────────────
  {
    slug: "industrial",
    name: "OVI Industrial",
    subtitle: "Soluciones para industria pesada y automotriz",
    description:
      "Formulaciones de alto desempeño para remoción de grasas minerales, aceites industriales y contaminantes severos en maquinaria pesada, flotas vehiculares y plantas de manufactura. Alta eficacia con 99% de biodegradabilidad.",
    industries: [
      "Industria pesada",
      "Sector automotriz",
      "Sector petrolero",
      "Construcción",
      "Manufactura",
    ],
    productCount: 17,
    products: [
      { name: "Handsol", tagline: "Jabón industrial desengrasante para manos" },
      {
        name: "Biodex",
        tagline: "Desengrasante industrial 99% biodegradable, base cáscara de naranja",
      },
      { name: "Degreaser", tagline: "Desengrasante multipropósito para industria general" },
      { name: "Solwash", tagline: "Detergente biodegradable para lavado de flotas pesadas" },
      { name: "Ecotex", tagline: "Limpiador biodegradable para superficies textiles industriales" },
      { name: "Biodelect", tagline: "Limpiador de componentes eléctricos y electrónicos" },
      {
        name: "Concrete Clean",
        tagline: "Removedor de concreto, cemento y residuos de construcción",
      },
      { name: "CR 30", tagline: "Limpiador ácido para óxido y corrosión superficial" },
      { name: "CR 30 S", tagline: "Limpiador ácido selectivo para acero inoxidable" },
      {
        name: "Ultradegreaser I",
        tagline: "Desengrasante de máximo poder para grasa industrial severa",
      },
      { name: "Dust Off", tagline: "Removedor de polvo industrial y partículas suspendidas" },
      { name: "JP 35", tagline: "Desengrasante especializado en grasas minerales para maquinaria" },
      { name: "Litoclean", tagline: "Limpiador de superficies pétreas y lapidadas" },
      { name: "Improclean E", tagline: "Limpiador industrial de alto espectro para equipos" },
      { name: "Gum Remove", tagline: "Removedor de goma, adhesivos y residuos pegajosos" },
      { name: "Ecolub", tagline: "Lubricante y protector de superficies metálicas biodegradable" },
      { name: "Contact Sol", tagline: "Limpiador dieléctrico para contactos eléctricos" },
    ],
    accentColor: "var(--color-brand-primary)",
    accentBg: "rgba(0,196,255,0.08)",
    accentBorder: "rgba(0,196,255,0.25)",
    gradientFrom: "rgba(0,196,255,0.18)",
    gradientTo: "rgba(0,71,171,0.08)",
    badge: "Industria General y Automotriz",
  },

  // ── 3. OVI Institucional ───────────────────────────────────────────────────
  {
    slug: "institucional",
    name: "OVI Institucional",
    subtitle: "Limpieza y mantenimiento para sector institucional",
    description:
      "Línea integral para el mantenimiento de instalaciones educativas, hospitalarias, corporativas y de retail. Formulaciones que combinan limpieza profunda, desinfección efectiva y protección de superficies.",
    industries: [
      "Sector salud",
      "Educación",
      "Oficinas corporativas",
      "Retail y centros comerciales",
      "Infraestructura pública",
    ],
    productCount: 11,
    products: [
      {
        name: "Solfresh",
        tagline: "Limpiador multiusos con aroma duradero para áreas institucionales",
      },
      { name: "Biodegraser", tagline: "Desengrasante biodegradable para cocinas institucionales" },
      { name: "Peroxol", tagline: "Desinfectante de superficies a base de peróxido" },
      {
        name: "Ecoshine",
        tagline: "Limpiador de pisos con triple acción: limpieza, desinfección y aroma",
      },
      {
        name: "Descaler",
        tagline: "Descalcificador para baños, sanitarios y superficies con sarro",
      },
      { name: "Bioglass", tagline: "Limpiador de vidrios y superficies espejadas sin rayas" },
      { name: "Restorer", tagline: "Restaurador y abrillantar para superficies institucionales" },
      { name: "Floor Wax", tagline: "Cera para pisos de alto tráfico con efecto brillante" },
      { name: "Eco Wax", tagline: "Cera ecológica para mantenimiento y embellecimiento de pisos" },
      { name: "Eco Mov", tagline: "Removedor de ceras y capas acumuladas en pisos" },
      { name: "Ecoseal", tagline: "Sellador de pisos institucionales contra manchas y humedad" },
    ],
    accentColor: "var(--color-brand-secondary)",
    accentBg: "rgba(0,71,171,0.1)",
    accentBorder: "rgba(0,71,171,0.3)",
    gradientFrom: "rgba(0,71,171,0.2)",
    gradientTo: "rgba(0,196,255,0.06)",
    badge: "Institucional",
  },

  // ── 4. OVI Lavandería ──────────────────────────────────────────────────────
  {
    slug: "lavanderia",
    name: "OVI Lavandería",
    subtitle: "Químicos para lavandería industrial y textil",
    description:
      "Formulaciones especializadas para plantas de lavado industrial, lavanderías hospitalarias y servicios textiles. Garantizan limpieza profunda, remoción de manchas y protección de las fibras en cada ciclo.",
    industries: [
      "Lavandería industrial",
      "Hospitales y clínicas",
      "Hoteles y hospedajes",
      "Uniformes corporativos",
      "Textil industrial",
    ],
    productCount: 6,
    products: [
      { name: "Detertex", tagline: "Detergente industrial de alto poder para lavandería" },
      { name: "Degratex", tagline: "Desengrasante industrial para remoción de grasas en prendas" },
      { name: "Oxytex", tagline: "Blanqueador oxigenado sin cloro para prendas delicadas" },
      { name: "Clorotex", tagline: "Blanqueador clorado de alto desempeño para ropa blanca" },
      { name: "Oxifree", tagline: "Removedor de manchas de óxido en prendas y tejidos" },
      { name: "Rintex", tagline: "Suavizante textil concentrado de larga duración" },
    ],
    accentColor: "rgba(180,100,255,0.9)",
    accentBg: "rgba(180,100,255,0.07)",
    accentBorder: "rgba(180,100,255,0.25)",
    gradientFrom: "rgba(180,100,255,0.15)",
    gradientTo: "rgba(0,71,171,0.08)",
    badge: "Lavandería Industrial",
  },

  // ── 5. OVI Cuidado Personal ────────────────────────────────────────────────
  {
    slug: "cuidado-personal",
    name: "OVI Cuidado Personal",
    subtitle: "Higiene y desinfección para personas",
    description:
      "Línea de productos para higiene personal en entornos industriales, hospitalarios e institucionales. Jabones líquidos y geles antibacteriales formulados para proteger la salud de los operadores en cada turno.",
    industries: [
      "Plantas industriales",
      "Hospitales y clínicas",
      "Manufactura de alimentos",
      "Institucional",
      "Oficinas corporativas",
    ],
    productCount: 4,
    products: [
      {
        name: "Biohand",
        tagline: "Jabón líquido desinfectante y antibacterial para manos industriales",
      },
      {
        name: "Biosan",
        tagline: "Gel sanitizante antibacterial para manos y antebrazos sin enjuague",
      },
      {
        name: "Biosoap",
        tagline: "Jabón líquido antibacterial con fragancia fresca para uso diario",
      },
      {
        name: "Quaterhand",
        tagline: "Jabón líquido desinfectante con amonio cuaternario de amplio espectro",
      },
    ],
    accentColor: "var(--color-brand-accent)",
    accentBg: "rgba(0,255,133,0.06)",
    accentBorder: "rgba(0,255,133,0.2)",
    gradientFrom: "rgba(0,255,133,0.15)",
    gradientTo: "rgba(0,196,255,0.05)",
    badge: "Higiene y Desinfección",
  },
];

// ─── Helpers ────────────────────────────────────────────────────────────────────

export function getChemicalLineBySlug(slug: string): ChemicalLine | undefined {
  return CHEMICAL_LINES.find((line) => line.slug === slug);
}

export const TOTAL_PRODUCTS = CHEMICAL_LINES.reduce((acc, line) => acc + line.productCount, 0);
