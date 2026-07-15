export type StoreIndustrySlug = "transporte" | "institucional" | "industria" | "energia";
export type StoreCategorySlug = "quimicos" | "equipos" | "accesorios" | "herramientas";

export interface StoreEntryPoint {
  title: string;
  description: string;
  href: string;
  cta: string;
}

export interface StoreIndustry {
  slug: StoreIndustrySlug;
  label: string;
  challenge: string;
  description: string;
  featuredProductSlugs: string[];
  protocols: string[];
  services: string[];
}

export interface StoreCategory {
  slug: StoreCategorySlug;
  label: string;
  description: string;
}

export interface StoreProduct {
  slug: string;
  name: string;
  category: StoreCategorySlug;
  categoryLabel: string;
  badge: string;
  summary: string;
  purpose: string;
  industries: string[];
  recommendedSurfaces: string[];
  contaminationTypes: string[];
  applicationMethod: string;
  dilution: string;
  safetyInformation: string[];
  environmentalBenefits: string[];
  compatibleEquipment: string[];
  relatedProtocols: string[];
  recommendedServices: string[];
  relatedProducts: string[];
  relatedEquipment: string[];
  aiRecommendation: string;
  challengeStatement: string;
  solutionLabScene: string;
}

export const storeEntryPoints: StoreEntryPoint[] = [
  {
    title: "Resolver un desafío",
    description:
      "Comience desde el problema operacional y deje que OVI AI conecte protocolo, producto, equipo y servicio.",
    href: "/ovi-ai",
    cta: "Iniciar con OVI AI",
  },
  {
    title: "Explorar por Industria",
    description:
      "Navegue recomendaciones diseñadas para transporte, institucional, industria y energía.",
    href: "#store-industries",
    cta: "Ver industrias",
  },
  {
    title: "Explorar por Producto",
    description:
      "Revise químicos, equipos, accesorios y herramientas como parte de una solución completa.",
    href: "#store-products",
    cta: "Ver especificaciones",
  },
];

export const storeIndustries: StoreIndustry[] = [
  {
    slug: "transporte",
    label: "Transporte",
    challenge:
      "Reducir tiempos de ciclo, consumo de agua y variabilidad en operaciones de lavado técnico de flota.",
    description:
      "Recomendaciones para patios, terminales y centros logísticos que necesitan continuidad operativa sin sacrificar imagen ni sostenibilidad.",
    featuredProductSlugs: ["ovi-biodex", "ovi-flota-rinse-arch", "ovi-dose-control-cart"],
    protocols: [
      "Protocolo P-001 · Lavado exterior de bajo consumo",
      "Protocolo P-003 · Control de calidad por ciclo",
    ],
    services: ["Auditoría de patio", "Optimización hídrica", "Capacitación operativa de flota"],
  },
  {
    slug: "institucional",
    label: "Institucional",
    challenge:
      "Estandarizar limpieza, higiene y seguridad en instalaciones críticas con múltiples superficies y alto tráfico.",
    description:
      "Aplicable a hospitales, universidades, edificios corporativos y centros comerciales donde la experiencia del usuario depende de la disciplina operacional.",
    featuredProductSlugs: [
      "ovi-ecoseal",
      "ovi-precision-foam-kit",
      "ovi-dose-control-cart",
    ],
    protocols: [
      "Protocolo H-001 · Limpieza y desinfección de área crítica",
      "Protocolo F-002 · Mantenimiento preventivo diario",
    ],
    services: [
      "Diseño de protocolo por zona",
      "Capacitación de personal",
      "Verificación de cumplimiento",
    ],
  },
  {
    slug: "industria",
    label: "Industria",
    challenge:
      "Atender grasa pesada, residuos adheridos y superficies de proceso sin detener la productividad.",
    description:
      "Pensado para plantas de alimentos, manufactura, metalmecánica y operaciones que requieren desempeño técnico, trazabilidad y compatibilidad con normativas internas.",
    featuredProductSlugs: ["ovi-biodex", "ovi-ecoseal", "ovi-precision-foam-kit"],
    protocols: [
      "Protocolo P-010 · Limpieza CIP de superficies de contacto",
      "Protocolo P-011 · Desengrase de campanas y ductos",
    ],
    services: [
      "Diagnóstico de puntos críticos",
      "Diseño HACCP compatible",
      "Implementación supervisada",
    ],
  },
  {
    slug: "energia",
    label: "Energía",
    challenge:
      "Mantener activos expuestos a aceites, partículas y agentes climáticos con intervención segura y controlada.",
    description:
      "Soluciones para generación, transmisión y mantenimiento industrial donde cada aplicación debe equilibrar seguridad, disponibilidad y protección de infraestructura.",
    featuredProductSlugs: ["ovi-ecoseal", "ovi-flota-rinse-arch", "ovi-dose-control-cart"],
    protocols: [
      "Protocolo E-004 · Limpieza de activos energéticos en operación controlada",
      "Protocolo E-007 · Protección y mantenimiento preventivo de superficies críticas",
    ],
    services: [
      "Levantamiento técnico de activos",
      "Mantenimiento preventivo",
      "Soporte de ingeniería en campo",
    ],
  },
];

export const storeCategories: StoreCategory[] = [
  {
    slug: "quimicos",
    label: "Químicos",
    description:
      "Formulaciones técnicas biodegradables diseñadas para contaminar menos y rendir más.",
  },
  {
    slug: "equipos",
    label: "Equipos",
    description:
      "Sistemas de aplicación que aseguran repetibilidad, cobertura y productividad operacional.",
  },
  {
    slug: "accesorios",
    label: "Accesorios",
    description:
      "Interfaces de contacto que convierten un protocolo en ejecución precisa sobre la superficie correcta.",
  },
  {
    slug: "herramientas",
    label: "Herramientas",
    description:
      "Elementos de control y dosificación para operar con seguridad, consistencia y trazabilidad.",
  },
];

export const storeProducts: StoreProduct[] = [
  {
    slug: "ovi-biodex",
    name: "OVI Biodex",
    category: "quimicos",
    categoryLabel: "Químicos",
    badge: "Desengrase industrial",
    summary:
      "Desengrasante de alto poder para suciedad industrial severa. Alcalino, hidrosoluble y biodegradable con agentes penetrantes e inhibidores de corrosión.",
    purpose:
      "Remover grasa pesada, aceites minerales y residuos industriales en maquinaria, equipos y activos de flota cuando la operación exige profundidad técnica sin comprometer la seguridad ambiental.",
    industries: ["Industria", "Transporte", "Energía", "Construcción"],
    recommendedSurfaces: [
      "Acero inoxidable",
      "Concreto sellado",
      "Pintura industrial",
      "Chasis y componentes metálicos",
    ],
    contaminationTypes: [
      "Grasa pesada",
      "Aceite hidráulico y mineral",
      "Carbonilla y residuos de proceso",
      "Suciedad incrustada industrial",
    ],
    applicationMethod:
      "Aspersión a presión, espuma controlada o lavado manual asistido según el protocolo OVI definido para el tipo de activo.",
    dilution:
      "Dilución según protocolo OVI para el contaminante y la superficie. Validar con equipo técnico antes de escalar.",
    safetyInformation: [
      "Usar guantes resistentes a químicos, gafas de seguridad y protección facial en aplicaciones presurizadas.",
      "Validar compatibilidad con aluminio sensible. Realizar prueba en área controlada antes de escalar.",
    ],
    environmentalBenefits: [
      "Formulación biodegradable que reduce la carga contaminante del efluente.",
      "Sin solventes clorados — menor impacto en tratamiento de aguas residuales.",
    ],
    compatibleEquipment: [
      "OVI Flota Rinse Arch",
      "Lanza de espuma técnica",
      "OVI Dose Control Cart",
    ],
    relatedProtocols: [
      "Protocolo P-010 · Limpieza CIP de superficies de contacto",
      "Protocolo P-011 · Desengrase de campanas y ductos",
      "Protocolo P-001 · Lavado exterior de bajo consumo",
    ],
    recommendedServices: [
      "Diagnóstico técnico de suciedad y proceso",
      "Implementación supervisada de protocolo",
      "Capacitación operativa para dosificación correcta",
    ],
    relatedProducts: ["ovi-precision-foam-kit", "ovi-dose-control-cart", "ovi-ecoseal"],
    relatedEquipment: [
      "Lanza de espuma técnica",
      "OVI Dose Control Cart",
      "OVI Flota Rinse Arch",
    ],
    aiRecommendation:
      "Recomendar cuando la operación requiera remover grasa pesada o aceites minerales sin comprometer la seguridad del operador ni el cumplimiento ambiental.",
    challengeStatement:
      "Ideal cuando la suciedad es severa y recurrente — parte del proceso productivo, no una excepción.",
    solutionLabScene: "Planta de manufactura, taller mecánico y línea de mantenimiento de flota.",
  },
  {
    slug: "ovi-flota-rinse-arch",
    name: "OVI Flota Rinse Arch",
    category: "equipos",
    categoryLabel: "Equipos",
    badge: "Cobertura uniforme",
    summary:
      "Sistema de enjuague para flota y activos de gran volumen con cobertura repetible y reducción de tiempos muertos.",
    purpose:
      "Acelerar etapas de enjuague y arrastre de suciedad en operaciones de transporte, energía e infraestructura expuesta.",
    industries: ["Transporte", "Energía", "Institucional"],
    recommendedSurfaces: [
      "Carrocerías",
      "Paneles externos",
      "Equipos móviles",
      "Activos metálicos de gran formato",
    ],
    contaminationTypes: [
      "Polvo acumulado",
      "Barro liviano",
      "Residuos de prelavado",
      "Espuma residual",
    ],
    applicationMethod:
      "Instalación en punto fijo o semimóvil para ciclos repetitivos de enjuague técnico con patrones de cobertura configurados.",
    dilution:
      "No aplica como consumible; se integra a líneas hidráulicas y protocolos de consumo hídrico controlado.",
    safetyInformation: [
      "Validar presión de línea y distancia operacional para evitar impacto sobre sensores, rótulos o componentes sensibles.",
      "Mantener zonas de tránsito delimitadas durante el ciclo automatizado.",
    ],
    environmentalBenefits: [
      "Ayuda a estandarizar el consumo de agua por unidad y a reducir reprocesos de enjuague.",
      "Minimiza pérdidas por aplicación manual inconsistente.",
    ],
    compatibleEquipment: ["OVI Dose Control Cart", "Bomba de refuerzo", "Sensores de ciclo OVI OS"],
    relatedProtocols: [
      "Protocolo P-001 · Lavado exterior de bajo consumo",
      "Protocolo E-004 · Limpieza de activos energéticos en operación controlada",
    ],
    recommendedServices: [
      "Ingeniería de layout de patio",
      "Optimización hídrica y de tiempos de ciclo",
      "Puesta en marcha de equipos de lavado",
    ],
    relatedProducts: ["ovi-biodex", "ovi-dose-control-cart", "ovi-precision-foam-kit"],
    relatedEquipment: [
      "Bomba de refuerzo",
      "Boquillas de cobertura uniforme",
      "Controlador de presión",
    ],
    aiRecommendation:
      "Considérelo cuando el cuello de botella de la operación ya no es el químico sino la repetibilidad del enjuague.",
    challengeStatement:
      "Convierte el enjuague en una etapa de ingeniería medible, no en una tarea dependiente del operador.",
    solutionLabScene: "Patio de flota y zona exterior de activos energéticos.",
  },
  {
    slug: "ovi-precision-foam-kit",
    name: "OVI Precision Foam Kit",
    category: "accesorios",
    categoryLabel: "Accesorios",
    badge: "Aplicación dirigida",
    summary:
      "Kit de espumado técnico para controlar cobertura, tiempo de contacto y visibilidad del protocolo sobre superficies complejas.",
    purpose:
      "Mejorar la precisión de aplicación en limpiezas donde la superficie, la verticalidad o la carga orgánica exigen permanencia controlada.",
    industries: ["Industria", "Institucional", "Transporte"],
    recommendedSurfaces: [
      "Muros lavables",
      "Equipos de proceso",
      "Cocinas industriales",
      "Carrocerías verticales",
    ],
    contaminationTypes: [
      "Biofilm inicial",
      "Grasa adherida",
      "Suciedad orgánica",
      "Residuo de tráfico",
    ],
    applicationMethod:
      "Acople a líneas de baja presión o sistemas móviles para generar espuma estable y visualmente trazable.",
    dilution:
      "Depende del químico asociado; diseñado para trabajar con protocolos de dilución definidos por producto y superficie.",
    safetyInformation: [
      "Verificar anclaje de mangueras y boquillas antes de presurizar el sistema.",
      "No dirigir la descarga hacia tableros eléctricos ni superficies no validadas por protocolo.",
    ],
    environmentalBenefits: [
      "Mejora el tiempo de contacto y evita re aplicaciones innecesarias.",
      "Favorece uso dirigido del químico en lugar de aspersión indiscriminada.",
    ],
    compatibleEquipment: [
      "OVI Dose Control Cart",
      "Compresor de baja presión",
      "Lanza de espuma técnica",
    ],
    relatedProtocols: [
      "Protocolo H-001 · Limpieza y desinfección de área crítica",
      "Protocolo F-002 · Mantenimiento preventivo diario",
    ],
    recommendedServices: [
      "Capacitación de aplicación técnica",
      "Diseño de protocolo por superficie",
      "Validación de cobertura y tiempos de contacto",
    ],
    relatedProducts: ["ovi-biodex", "ovi-ecoseal", "ovi-dose-control-cart"],
    relatedEquipment: [
      "Compresor de baja presión",
      "Mangueras de conexión rápida",
      "Boquillas de espuma",
    ],
    aiRecommendation:
      "Recomendado cuando la efectividad del químico depende más del tiempo de contacto y la cobertura que de aumentar concentración.",
    challengeStatement:
      "Hace visible la metodología sobre la superficie y reduce la variación entre operadores.",
    solutionLabScene:
      "Cocina industrial, pasillos de alto tráfico y equipos verticales de proceso.",
  },
  {
    slug: "ovi-dose-control-cart",
    name: "OVI Dose Control Cart",
    category: "herramientas",
    categoryLabel: "Herramientas",
    badge: "Dosificación móvil",
    summary:
      "Estación móvil de dosificación y preparación de soluciones para asegurar mezcla consistente, trazabilidad y seguridad operacional.",
    purpose:
      "Eliminar improvisación en preparación de químicos y garantizar repetibilidad en múltiples frentes de trabajo.",
    industries: ["Transporte", "Institucional", "Energía", "Industria"],
    recommendedSurfaces: [
      "Puntos de preparación",
      "Cuartos técnicos",
      "Patios operativos",
      "Áreas de soporte",
    ],
    contaminationTypes: ["No aplica sobre suciedad; controla preparación de soluciones"],
    applicationMethod:
      "Se integra al flujo operativo como estación de mezcla, control de recipientes y punto de verificación para diluciones aprobadas.",
    dilution:
      "Configurable según ficha técnica; preparado para recetas operativas con control visual y etiquetado.",
    safetyInformation: [
      "Operar únicamente con fichas visibles y recipientes identificados para evitar incompatibilidades químicas.",
      "Asegurar ventilación y contención secundaria en la zona de carga.",
    ],
    environmentalBenefits: [
      "Reduce desperdicio por sobremezcla y errores de dilución.",
      "Facilita control del consumo real por turno, activo o instalación.",
    ],
    compatibleEquipment: ["OVI Precision Foam Kit", "OVI Flota Rinse Arch", "Bidones certificados"],
    relatedProtocols: [
      "Protocolo G-003 · Control de calidad y verificación",
      "Protocolo P-003 · Control de calidad por ciclo",
    ],
    recommendedServices: [
      "Estandarización de cuarto químico",
      "Implementación de trazabilidad de consumos",
      "Capacitación de seguridad y manejo de insumos",
    ],
    relatedProducts: ["ovi-biodex", "ovi-precision-foam-kit", "ovi-flota-rinse-arch"],
    relatedEquipment: [
      "Bidones certificados",
      "Etiquetado operacional",
      "Medidores visuales de mezcla",
    ],
    aiRecommendation:
      "Es la herramienta correcta cuando la pérdida económica proviene de variación de mezcla, no solo del precio del químico.",
    challengeStatement: "Transforma la dosificación en una disciplina operativa auditable.",
    solutionLabScene: "Cuarto técnico, patio operativo y estación de soporte de limpieza.",
  },
  {
    slug: "ovi-ecoseal",
    name: "OVI Ecoseal",
    category: "quimicos",
    categoryLabel: "Químicos",
    badge: "Sellador de pisos",
    summary:
      "Sellador para pisos institucionales e industriales. Crea capa protectora que facilita la limpieza diaria y prolonga la vida útil de las superficies.",
    purpose:
      "Proteger pisos después de la limpieza técnica, extendiendo el ciclo de mantenimiento y reduciendo re-intervenciones correctivas.",
    industries: ["Institucional", "Retail", "Industria"],
    recommendedSurfaces: [
      "Pisos sellados",
      "Cerámica y superficies vitrificadas",
      "Concreto sellado",
      "Instalaciones de alto tráfico",
    ],
    contaminationTypes: [
      "Recontaminación por tráfico",
      "Humedad y manchas",
      "Desgaste superficial",
    ],
    applicationMethod:
      "Aplicar sobre superficie completamente limpia y seca con aplicador de microfibra o mopa. Seguir tiempos de curado del protocolo OVI.",
    dilution:
      "Listo para uso. Aplicar sobre superficie limpia y seca para adherencia óptima.",
    safetyInformation: [
      "Aplicar sobre superficie completamente limpia y seca para asegurar adherencia óptima.",
      "Mantener ventilación y restringir tránsito hasta completar el tiempo de curado.",
    ],
    environmentalBenefits: [
      "Reduce la frecuencia de limpiezas correctivas, disminuyendo consumo de agua e insumos.",
      "Extiende el ciclo de intervención — menos residuos de proceso.",
    ],
    compatibleEquipment: [
      "Aplicador de microfibra técnica",
      "Pulverizador de baja presión",
    ],
    relatedProtocols: [
      "Protocolo F-002 · Mantenimiento preventivo de pisos",
      "Protocolo F-003 · Restauración y protección anual",
    ],
    recommendedServices: [
      "Diseño de programa de mantenimiento preventivo",
      "Capacitación operativa para aplicación correcta",
    ],
    relatedProducts: ["ovi-precision-foam-kit", "ovi-biodex", "ovi-dose-control-cart"],
    relatedEquipment: [
      "Aplicador de microfibra técnica",
      "Pulverizador de baja presión",
    ],
    aiRecommendation:
      "Recomendar al cierre del ciclo de limpieza para proteger la superficie tratada y reducir el costo de re-intervención.",
    challengeStatement:
      "Cierre del sistema: protege la superficie después de limpiarla y extiende el ciclo de mantenimiento preventivo.",
    solutionLabScene:
      "Pasillos institucionales, áreas de alto tráfico y pisos de instalaciones hospitalarias.",
  },
];

export const futureIntegrations = [
  "Shopify",
  "WooCommerce",
  "Medusa",
  "ERP",
  "OVI OS",
  "Inventario",
  "Pagos",
  "Logística",
] as const;

export function getStoreProduct(slug: string) {
  return storeProducts.find((product) => product.slug === slug);
}

export function getStoreProductsByCategory(category: StoreCategorySlug) {
  return storeProducts.filter((product) => product.category === category);
}

export function getStoreProductsBySlugs(slugs: string[]) {
  return slugs
    .map((slug) => getStoreProduct(slug))
    .filter((product): product is StoreProduct => Boolean(product));
}
