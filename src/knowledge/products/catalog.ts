/**
 * OVI Knowledge Base — Products Catalog
 * FASE 1 · Foundation Order 001
 *
 * Official product registry. This is the single source of truth for all
 * OVI product data. All platform modules must read from here.
 *
 * Data sources:
 *   - store-data.ts (primary structured source)
 *   - ProductsPage.tsx (additional products)
 *
 * Status legend:
 *   activo      — validated and in active use
 *   en-revision — present in platform but pending official technical validation
 *   pendiente   — referenced by protocols/services but not yet documented
 */

import type { OviProduct } from "../types";

export const products: OviProduct[] = [
  // ── Químicos ────────────────────────────────────────────────────────────────
  {
    id: "ovi-bioclean-pro",
    nombre: "OVI BioClean Pro",
    categoria: "quimicos",
    resumen:
      "Formulación concentrada para remoción de grasa pesada y suciedad adherida en activos críticos de operación.",
    descripcion:
      "Formulación concentrada para remoción de grasa pesada y suciedad adherida en activos críticos de operación. Resolver acumulaciones de grasa, aceites y residuos industriales cuando el protocolo exige limpieza profunda con menor carga química.",
    beneficios: [
      "Formulación biodegradable orientada a reducir la carga contaminante del efluente",
      "Alta dilución para disminuir consumo total por ciclo y transporte de insumos",
      "Acción profunda sobre grasa pesada y residuos de proceso",
    ],
    aplicaciones: ["Manufactura", "Metalmecánica", "Plantas de alimentos", "Flota vehicular"],
    tiposSuciedad: ["grasa-pesada", "aceite", "carbonilla", "residuos-organicos"],
    superficiesCompatibles: [
      "acero-inoxidable",
      "concreto-sellado",
      "pintura-industrial",
    ],
    industrias: ["industria", "transporte", "energia"],
    dilucion:
      "Dilución operativa sugerida 1:8 a 1:20 según carga contaminante, temperatura y tiempo de contacto.",
    modoUso:
      "Aplicación por espuma controlada, aspersión de baja presión o lavado manual asistido según el protocolo definido por ingeniería.",
    tiempoAccion: "Pendiente documentación oficial",
    equipoRecomendado: ["ovi-flota-rinse-arch", "lanza-espuma-tecnica", "ovi-dose-control-cart"],
    serviciosRelacionados: ["diagnostico-tecnico", "implementacion-protocolo", "capacitacion-personal"],
    impactoAmbiental: [
      "Formulación biodegradable orientada a reducir la carga contaminante del efluente",
      "Alta dilución para disminuir consumo total por ciclo y transporte de insumos",
    ],
    informacionSeguridad: [
      "Usar guantes resistentes a químicos, gafas de seguridad y protección facial en aplicaciones presurizadas",
      "Validar compatibilidad con aluminio sensible y realizar prueba en área controlada antes de escalar",
    ],
    imagenes: [],
    recomendacionAI:
      "Úselo cuando la operación requiera limpiar más rápido sin sobredosificar producto ni comprometer el cumplimiento ambiental.",
    desafio:
      "Ideal cuando la suciedad es parte del proceso productivo y no una excepción operacional.",
    escenaLab: "Planta de manufactura y línea de mantenimiento de flota.",
    productosRelacionados: ["ovi-precision-foam-kit", "ovi-dose-control-cart", "ovi-surface-guard-x9"],
    status: "activo",
  },
  {
    id: "ovi-surface-guard-x9",
    nombre: "OVI Surface Guard X9",
    categoria: "quimicos",
    resumen:
      "Tratamiento para mantenimiento preventivo y control de recontaminación en superficies expuestas a uso intensivo.",
    descripcion:
      "Tratamiento para mantenimiento preventivo y control de recontaminación en superficies expuestas a uso intensivo. Extiende el desempeño visual y funcional de superficies sometidas a tráfico, humedad o ciclos frecuentes de limpieza.",
    beneficios: [
      "Reduce frecuencia de limpiezas correctivas al facilitar mantenimiento preventivo",
      "Disminuye consumo acumulado de agua y químicos por re-intervención",
      "Extiende el ciclo de limpieza en superficies de alto tráfico",
    ],
    aplicaciones: [
      "Pisos de alto tráfico",
      "Superficies exteriores",
      "Equipos con acabado protector",
      "Áreas técnicas críticas",
    ],
    tiposSuciedad: ["recontaminacion-superficial", "polvo-industrial"],
    superficiesCompatibles: [
      "pisos-sellados",
      "concreto-sellado",
      "acero-inoxidable",
    ],
    industrias: ["institucional", "energia", "industria"],
    dilucion: "Listo para uso o dilución ligera 1:1 según superficie y nivel de protección deseado.",
    modoUso:
      "Aplicación posterior a limpieza técnica como capa funcional de mantenimiento preventivo según frecuencia diseñada por ingeniería.",
    equipoRecomendado: ["aplicador-microfibra-tecnica", "ovi-precision-foam-kit", "pulverizador-baja-presion"],
    serviciosRelacionados: ["mantenimiento-preventivo", "diseno-protocolo"],
    impactoAmbiental: [
      "Reduce frecuencia de limpiezas correctivas al facilitar mantenimiento preventivo",
      "Disminuye consumo acumulado de agua y químicos por re-intervención",
    ],
    informacionSeguridad: [
      "Aplicar sobre superficie completamente limpia y seca para asegurar adherencia controlada",
      "Mantener ventilación y restringir tránsito hasta completar el tiempo de curado operacional",
    ],
    imagenes: [],
    recomendacionAI:
      "Recomendado cuando el objetivo no es solo limpiar hoy, sino controlar la velocidad de recontaminación durante la operación.",
    desafio:
      "Funciona como cierre del sistema: limpieza, protección y menor costo de mantenimiento a lo largo del tiempo.",
    escenaLab: "Pasillos institucionales, áreas técnicas y superficies exteriores expuestas.",
    productosRelacionados: ["ovi-precision-foam-kit", "ovi-bioclean-pro", "ovi-dose-control-cart"],
    status: "activo",
  },
  {
    id: "ovi-desengrasante-industrial",
    nombre: "OVI Desengrasante Industrial",
    categoria: "quimicos",
    resumen:
      "Desengrasante de alto rendimiento para maquinaria, equipos y líneas de producción con mínimo tiempo de contacto.",
    descripcion:
      "Desengrasante de alto rendimiento para maquinaria, equipos y líneas de producción. Actúa sobre grasas minerales, aceites de corte y residuos de proceso con mínimo tiempo de contacto. Fórmula libre de solventes clorados.",
    beneficios: [
      "Tiempo de contacto 3–5 min en grasa pesada",
      "Apto para aspersión a presión y aplicación manual",
      "Fórmula libre de solventes clorados",
    ],
    aplicaciones: ["Industria pesada", "Energía", "Transporte"],
    tiposSuciedad: ["grasa-pesada", "aceite", "residuos-quimicos"],
    superficiesCompatibles: ["acero-inoxidable", "pintura-industrial"],
    industrias: ["industria", "energia", "transporte"],
    dilucion: "Pendiente documentación oficial",
    modoUso: "Aspersión a presión o aplicación manual. Sin límite de aplicación en ambientes ventilados.",
    equipoRecomendado: [],
    serviciosRelacionados: ["diagnostico-tecnico", "implementacion-protocolo"],
    impactoAmbiental: [],
    informacionSeguridad: [],
    imagenes: [],
    productosRelacionados: ["ovi-bioclean-pro", "ovi-dose-control-cart"],
    status: "en-revision",
  },
  {
    id: "ovi-ecodetox",
    nombre: "OVI EcoDetox",
    categoria: "quimicos",
    resumen:
      "Solución biodegradable para tratamiento y neutralización de contaminantes en superficies y sustratos industriales.",
    descripcion:
      "Solución biodegradable para tratamiento y neutralización de contaminantes en superficies y sustratos industriales. Ideal para operaciones con estrictos protocolos ambientales. Formulado bajo principios de química verde.",
    beneficios: [
      "Neutraliza ácidos y bases residuales en superficie",
      "Formulado bajo principios de química verde",
      "Apto para zonas protegidas y áreas sensibles",
      "Certificable para programas de sostenibilidad corporativa",
    ],
    aplicaciones: ["Institucional", "Hospitalario", "Corporativo"],
    tiposSuciedad: ["residuos-quimicos", "residuos-organicos"],
    superficiesCompatibles: ["ceramica", "acero-inoxidable", "pvc"],
    industrias: ["institucional", "hospitales"],
    dilucion: "Pendiente documentación oficial",
    modoUso: "Pendiente documentación oficial",
    equipoRecomendado: [],
    serviciosRelacionados: ["diseno-protocolo"],
    impactoAmbiental: [
      "Neutraliza residuos químicos sin generar nuevos contaminantes",
      "Compatible con programas de sostenibilidad corporativa",
    ],
    informacionSeguridad: [],
    imagenes: [],
    productosRelacionados: ["ovi-surface-guard-x9", "ovi-dose-control-cart"],
    status: "en-revision",
  },
  {
    id: "ovi-impershield",
    nombre: "OVI ImperShield",
    categoria: "quimicos",
    resumen:
      "Tratamiento impermeabilizante de penetración profunda para concreto, ladrillo y mampostería.",
    descripcion:
      "Tratamiento impermeabilizante de penetración profunda para concreto, ladrillo y mampostería. Crea barrera molecular duradera sin alterar la estética ni la transpiración de la superficie.",
    beneficios: [
      "Penetración hasta 8 mm en concreto estándar",
      "Resistencia comprobada UV, humedad y ciclos de temperatura",
      "No forma película superficial visible",
      "Vigencia estimada: 5–8 años según exposición",
    ],
    aplicaciones: ["Construcción", "Edificaciones", "Infraestructura"],
    tiposSuciedad: [],
    superficiesCompatibles: ["concreto", "concreto-sellado"],
    industrias: ["institucional", "energia"],
    dilucion: "Pendiente documentación oficial",
    modoUso: "Pendiente documentación oficial",
    equipoRecomendado: [],
    serviciosRelacionados: ["mantenimiento-preventivo"],
    impactoAmbiental: [],
    informacionSeguridad: [],
    imagenes: [],
    productosRelacionados: ["ovi-surface-guard-x9"],
    status: "en-revision",
  },
  {
    id: "ovi-flotaclean",
    nombre: "OVI FlotaClean",
    categoria: "quimicos",
    resumen:
      "Producto especializado para lavado de vehículos de carga y flota industrial. Elimina grasa de caminos, hollín y contaminantes adheridos.",
    descripcion:
      "Producto especializado para el lavado de vehículos de carga y flota industrial. Elimina grasa de caminos, hollín y contaminantes adheridos sin dañar pinturas ni sellos. Compatible con sistemas de lavado automático y manual.",
    beneficios: [
      "Compatible con pinturas al agua y solvente",
      "No corrosivo sobre aluminio, acero y plástico ABS",
      "Diseñado para sistemas de lavado automático y manual",
      "Criterios de buenas prácticas ambientales incorporados",
    ],
    aplicaciones: ["Flota pesada", "Logística", "Transporte público"],
    tiposSuciedad: ["grasa-pesada", "carbonilla", "lodo", "polvo-industrial"],
    superficiesCompatibles: ["pintura-automotriz", "aluminio", "plastico-tecnico"],
    industrias: ["transporte"],
    dilucion: "Pendiente documentación oficial",
    modoUso: "Manual o sistema de lavado automático",
    equipoRecomendado: ["ovi-flota-rinse-arch"],
    serviciosRelacionados: ["lavado-flota"],
    impactoAmbiental: ["Criterios de buenas prácticas ambientales incorporados"],
    informacionSeguridad: [],
    imagenes: [],
    productosRelacionados: ["ovi-bioclean-pro", "ovi-dose-control-cart"],
    status: "en-revision",
  },
  {
    id: "ovi-formulacion-personalizada",
    nombre: "OVI Formulación Personalizada",
    categoria: "quimicos",
    resumen:
      "Formulaciones específicamente adaptadas a requerimientos operativos y ambientales del cliente.",
    descripcion:
      "Desarrollo de formulaciones específicamente adaptadas a los requerimientos operativos y ambientales del cliente. Proceso de 3 fases: análisis del contaminante objetivo → prototipo → validación in situ.",
    beneficios: [
      "Proceso de 3 fases: análisis → prototipo → validación",
      "Soporte técnico y ajuste in situ incluidos",
      "Documentación técnica y fichas de seguridad completas",
      "Opción de exclusividad de fórmula para el cliente",
    ],
    aplicaciones: ["Cualquier industria", "Aplicaciones críticas"],
    tiposSuciedad: [],
    superficiesCompatibles: [],
    industrias: ["industria", "transporte", "institucional", "alimentos", "energia"],
    dilucion: "Definido según la formulación desarrollada",
    modoUso: "Definido según la formulación desarrollada",
    equipoRecomendado: [],
    serviciosRelacionados: ["diagnostico-tecnico"],
    impactoAmbiental: [],
    informacionSeguridad: [],
    imagenes: [],
    productosRelacionados: [],
    status: "en-revision",
  },
  // ── Equipos ─────────────────────────────────────────────────────────────────
  {
    id: "ovi-flota-rinse-arch",
    nombre: "OVI Flota Rinse Arch",
    categoria: "equipos",
    resumen:
      "Sistema de enjuague para flota y activos de gran volumen con cobertura repetible y reducción de tiempos muertos.",
    descripcion:
      "Sistema de enjuague para flota y activos de gran volumen con cobertura repetible y reducción de tiempos muertos. Acelera etapas de enjuague y arrastre de suciedad en operaciones de transporte, energía e infraestructura expuesta.",
    beneficios: [
      "Ayuda a estandarizar el consumo de agua por unidad y a reducir reprocesos de enjuague",
      "Minimiza pérdidas por aplicación manual inconsistente",
      "Convierte el enjuague en una etapa de ingeniería medible",
    ],
    aplicaciones: ["Patio de flota", "Zona exterior de activos energéticos"],
    tiposSuciedad: ["lodo", "polvo-industrial", "espuma-residual"],
    superficiesCompatibles: ["pintura-automotriz", "pintura-industrial"],
    industrias: ["transporte", "energia", "institucional"],
    dilucion:
      "No aplica como consumible; se integra a líneas hidráulicas y protocolos de consumo hídrico controlado.",
    modoUso:
      "Instalación en punto fijo o semimóvil para ciclos repetitivos de enjuague técnico con patrones de cobertura configurados.",
    equipoRecomendado: ["ovi-dose-control-cart", "bomba-refuerzo"],
    serviciosRelacionados: ["lavado-flota", "optimizacion-hidrica", "auditoria-patio"],
    impactoAmbiental: [
      "Ayuda a estandarizar el consumo de agua por unidad y a reducir reprocesos de enjuague",
      "Minimiza pérdidas por aplicación manual inconsistente",
    ],
    informacionSeguridad: [
      "Validar presión de línea y distancia operacional para evitar impacto sobre sensores, rótulos o componentes sensibles",
      "Mantener zonas de tránsito delimitadas durante el ciclo automatizado",
    ],
    imagenes: [],
    recomendacionAI:
      "Considérelo cuando el cuello de botella de la operación ya no es el químico sino la repetibilidad del enjuague.",
    desafio:
      "Convierte el enjuague en una etapa de ingeniería medible, no en una tarea dependiente del operador.",
    escenaLab: "Patio de flota y zona exterior de activos energéticos.",
    productosRelacionados: ["ovi-bioclean-pro", "ovi-dose-control-cart", "ovi-precision-foam-kit"],
    status: "activo",
  },
  // ── Accesorios ──────────────────────────────────────────────────────────────
  {
    id: "ovi-precision-foam-kit",
    nombre: "OVI Precision Foam Kit",
    categoria: "accesorios",
    resumen:
      "Kit de espumado técnico para controlar cobertura, tiempo de contacto y visibilidad del protocolo sobre superficies complejas.",
    descripcion:
      "Kit de espumado técnico para controlar cobertura, tiempo de contacto y visibilidad del protocolo sobre superficies complejas. Mejora la precisión de aplicación en limpiezas donde la superficie, la verticalidad o la carga orgánica exigen permanencia controlada.",
    beneficios: [
      "Mejora el tiempo de contacto y evita re-aplicaciones innecesarias",
      "Favorece uso dirigido del químico en lugar de aspersión indiscriminada",
      "Hace visible la metodología sobre la superficie y reduce la variación entre operadores",
    ],
    aplicaciones: [
      "Cocinas industriales",
      "Pasillos de alto tráfico",
      "Equipos verticales de proceso",
      "Carrocerías verticales",
    ],
    tiposSuciedad: ["biofilm", "grasa-pesada", "residuos-organicos"],
    superficiesCompatibles: ["acero-inoxidable", "ceramica", "pintura-industrial"],
    industrias: ["industria", "institucional", "transporte"],
    dilucion:
      "Depende del químico asociado; diseñado para trabajar con protocolos de dilución definidos por producto y superficie.",
    modoUso:
      "Acople a líneas de baja presión o sistemas móviles para generar espuma estable y visualmente trazable.",
    equipoRecomendado: ["ovi-dose-control-cart", "lanza-espuma-tecnica"],
    serviciosRelacionados: ["capacitacion-personal", "diseno-protocolo"],
    impactoAmbiental: [
      "Mejora el tiempo de contacto y evita re-aplicaciones innecesarias",
      "Favorece uso dirigido del químico en lugar de aspersión indiscriminada",
    ],
    informacionSeguridad: [
      "Verificar anclaje de mangueras y boquillas antes de presurizar el sistema",
      "No dirigir la descarga hacia tableros eléctricos ni superficies no validadas por protocolo",
    ],
    imagenes: [],
    recomendacionAI:
      "Recomendado cuando la efectividad del químico depende más del tiempo de contacto y la cobertura que de aumentar concentración.",
    desafio:
      "Hace visible la metodología sobre la superficie y reduce la variación entre operadores.",
    escenaLab: "Cocina industrial, pasillos de alto tráfico y equipos verticales de proceso.",
    productosRelacionados: ["ovi-bioclean-pro", "ovi-surface-guard-x9", "ovi-dose-control-cart"],
    status: "activo",
  },
  // ── Herramientas ────────────────────────────────────────────────────────────
  {
    id: "ovi-dose-control-cart",
    nombre: "OVI Dose Control Cart",
    categoria: "herramientas",
    resumen:
      "Estación móvil de dosificación y preparación de soluciones para asegurar mezcla consistente, trazabilidad y seguridad operacional.",
    descripcion:
      "Estación móvil de dosificación y preparación de soluciones para asegurar mezcla consistente, trazabilidad y seguridad operacional. Elimina improvisación en preparación de químicos y garantiza repetibilidad en múltiples frentes de trabajo.",
    beneficios: [
      "Reduce desperdicio por sobremezcla y errores de dilución",
      "Facilita control del consumo real por turno, activo o instalación",
      "Transforma la dosificación en una disciplina operativa auditable",
    ],
    aplicaciones: [
      "Cuartos técnicos",
      "Patios operativos",
      "Estaciones de soporte de limpieza",
    ],
    tiposSuciedad: [],
    superficiesCompatibles: [],
    industrias: ["transporte", "institucional", "energia", "industria"],
    dilucion:
      "Configurable según ficha técnica; preparado para recetas operativas con control visual y etiquetado.",
    modoUso:
      "Se integra al flujo operativo como estación de mezcla, control de recipientes y punto de verificación para diluciones aprobadas.",
    equipoRecomendado: ["ovi-precision-foam-kit", "ovi-flota-rinse-arch"],
    serviciosRelacionados: ["capacitacion-personal", "diseno-protocolo"],
    impactoAmbiental: [
      "Reduce desperdicio por sobremezcla y errores de dilución",
      "Facilita control del consumo real por turno, activo o instalación",
    ],
    informacionSeguridad: [
      "Operar únicamente con fichas visibles y recipientes identificados para evitar incompatibilidades químicas",
      "Asegurar ventilación y contención secundaria en la zona de carga",
    ],
    imagenes: [],
    recomendacionAI:
      "Es la herramienta correcta cuando la pérdida económica proviene de variación de mezcla, no solo del precio del químico.",
    desafio: "Transforma la dosificación en una disciplina operativa auditable.",
    escenaLab: "Cuarto técnico, patio operativo y estación de soporte de limpieza.",
    productosRelacionados: ["ovi-bioclean-pro", "ovi-precision-foam-kit", "ovi-flota-rinse-arch"],
    status: "activo",
  },
];
