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
    id: "ovi-biodex",
    nombre: "OVI Biodex",
    categoria: "quimicos",
    resumen:
      "Desengrasante de alto poder para suciedad industrial severa. Alcalino, hidrosoluble y biodegradable con agentes penetrantes e inhibidores de corrosión.",
    descripcion:
      "Desengrasante de alto poder formulado para industria pesada, automotriz, petrolera y construcción. Base acuosa sin solventes agresivos, con agentes penetrantes, emulsificantes e inhibidores de corrosión que protegen los metales durante la limpieza. Acción profunda sobre grasas minerales, aceites industriales y residuos de proceso con mínima carga química.",
    beneficios: [
      "Formulación biodegradable: seguro para el ambiente y para los operadores",
      "Protege metales contra corrosión durante el proceso de limpieza",
      "Alta eficacia en suciedad severa con dilución controlada",
      "Sin solventes agresivos ni clorados",
    ],
    aplicaciones: ["Industria pesada", "Automotriz", "Sector petrolero", "Construcción", "Metalmecánica"],
    tiposSuciedad: ["grasa-pesada", "aceite", "carbonilla", "residuos-organicos"],
    superficiesCompatibles: [
      "acero-inoxidable",
      "concreto-sellado",
      "pintura-industrial",
    ],
    industrias: ["industria", "transporte", "energia"],
    dilucion:
      "Dilución operativa según carga contaminante y protocolo. Validar con equipo técnico OVI según tipo de activo.",
    modoUso:
      "Aspersión a presión, espuma controlada o aplicación manual asistida según protocolo OVI definido para el activo.",
    tiempoAccion: "Pendiente documentación técnica oficial",
    equipoRecomendado: ["ovi-flota-rinse-arch", "lanza-espuma-tecnica", "ovi-dose-control-cart"],
    serviciosRelacionados: ["diagnostico-tecnico", "implementacion-protocolo", "capacitacion-personal"],
    impactoAmbiental: [
      "Formulación biodegradable que reduce la carga contaminante del efluente",
      "Sin solventes clorados — menor impacto en tratamiento de aguas residuales",
    ],
    informacionSeguridad: [
      "Usar guantes resistentes a químicos, gafas de seguridad y protección facial",
      "Validar compatibilidad en área controlada antes de escalar a toda la instalación",
    ],
    imagenes: [],
    recomendacionAI:
      "Úselo cuando la operación requiera remover grasa pesada o aceites minerales sin comprometer la seguridad del operador ni el cumplimiento ambiental.",
    desafio:
      "Ideal cuando la suciedad es severa y recurrente — parte del proceso productivo, no una excepción.",
    escenaLab: "Planta de manufactura, taller mecánico y línea de mantenimiento de flota.",
    productosRelacionados: ["ovi-precision-foam-kit", "ovi-dose-control-cart", "ovi-ecoseal"],
    status: "activo",
  },
  {
    id: "ovi-ecoseal",
    nombre: "OVI Ecoseal",
    categoria: "quimicos",
    resumen:
      "Sellador para pisos institucionales e industriales. Crea capa protectora que facilita la limpieza diaria y prolonga la vida útil de las superficies.",
    descripcion:
      "Sellador especialmente formulado para proteger y sellar pisos institucionales e industriales. Crea una capa protectora que facilita la limpieza diaria, prolonga la vida útil del piso y lo protege de manchas, humedad y desgaste. Facilita el mantenimiento posterior con protocolos OVI.",
    beneficios: [
      "Protege pisos de manchas, humedad y desgaste cotidiano",
      "Reduce frecuencia de limpiezas correctivas al facilitar el mantenimiento preventivo",
      "Extiende la vida útil de superficies en entornos de alto tráfico",
      "Facilita la integración con protocolos de limpieza OVI",
    ],
    aplicaciones: [
      "Pisos institucionales de alto tráfico",
      "Superficies industriales expuestas",
      "Áreas técnicas críticas",
      "Instalaciones educativas y hospitalarias",
    ],
    tiposSuciedad: ["recontaminacion-superficial", "polvo-industrial"],
    superficiesCompatibles: [
      "pisos-sellados",
      "concreto-sellado",
      "ceramica",
    ],
    industrias: ["institucional", "energia", "industria"],
    dilucion: "Listo para uso. Aplicar sobre superficie completamente limpia y seca.",
    modoUso:
      "Aplicación posterior a limpieza técnica como capa de protección preventiva. Seguir tiempos de curado según protocolo OVI.",
    equipoRecomendado: ["aplicador-microfibra-tecnica", "pulverizador-baja-presion"],
    serviciosRelacionados: ["mantenimiento-preventivo", "diseno-protocolo"],
    impactoAmbiental: [
      "Reduce frecuencia de limpiezas correctivas y consumo de agua e insumos",
      "Extiende el ciclo de intervención, disminuyendo residuos de proceso",
    ],
    informacionSeguridad: [
      "Aplicar sobre superficie completamente limpia y seca para adherencia óptima",
      "Mantener ventilación y restringir tránsito hasta completar el tiempo de curado",
    ],
    imagenes: [],
    recomendacionAI:
      "Recomendado al cierre del ciclo de limpieza: protege la superficie tratada y reduce el costo de re-intervención.",
    desafio:
      "Cierre del sistema de limpieza: protección activa que reduce el costo de mantenimiento a largo plazo.",
    escenaLab: "Pasillos institucionales, áreas técnicas y superficies de alto tráfico.",
    productosRelacionados: ["ovi-precision-foam-kit", "ovi-biodex", "ovi-dose-control-cart"],
    status: "activo",
  },
  {
    id: "ovi-jp35",
    nombre: "OVI JP 35",
    categoria: "quimicos",
    resumen:
      "Desengrasante biodegradable especializado en grasas minerales para maquinaria, motores y equipos industriales.",
    descripcion:
      "Desengrasante biodegradable formulado específicamente para la remoción de grasas minerales en maquinaria, motores, equipos industriales y piezas mecánicas. Seguro y eficiente en aplicaciones prolongadas, sin dañar superficies metálicas.",
    beneficios: [
      "Formulación biodegradable — seguro para el ambiente y operadores",
      "Diseñado para romper grasa mineral sin dañar superficies metálicas",
      "Eficiente en aplicaciones continuas y prolongadas",
    ],
    aplicaciones: ["Industria pesada", "Sector automotriz", "Sector energético", "Mantenimiento de equipos"],
    tiposSuciedad: ["grasa-pesada", "aceite", "residuos-quimicos"],
    superficiesCompatibles: ["acero-inoxidable", "pintura-industrial"],
    industrias: ["industria", "energia", "transporte"],
    dilucion: "Según protocolo OVI por tipo de contaminante y superficie",
    modoUso: "Aspersión a presión o aplicación manual en ambientes con ventilación adecuada.",
    equipoRecomendado: [],
    serviciosRelacionados: ["diagnostico-tecnico", "implementacion-protocolo"],
    impactoAmbiental: ["Formulación biodegradable que minimiza el impacto ambiental del efluente"],
    informacionSeguridad: ["Usar EPP adecuado. Revisar ficha de seguridad antes de aplicar."],
    imagenes: [],
    productosRelacionados: ["ovi-biodex", "ovi-dose-control-cart"],
    status: "en-revision",
  },
  {
    id: "ovi-ecoshine",
    nombre: "OVI Ecoshine",
    categoria: "quimicos",
    resumen:
      "Limpiador ecológico multiusos para cristales, superficies esmaltadas y vitrificadas. Deja superficies transparentes sin velos ni residuos.",
    descripcion:
      "Limpiador, desinfectante y multiusos ecológico de pH neutro (7–8) formulado para cristales, espejos y superficies vitrificadas o esmaltadas. Deja los cristales completamente transparentes sin dejar velos ni residuos. Respetuoso con el medio ambiente, con impacto reducido en agua y aire.",
    beneficios: [
      "pH neutro — seguro para superficies delicadas y para el operador",
      "Sin residuos ni velos sobre cristales y espejos",
      "No requiere enjuague ni aclarado posterior",
      "Formulación ecológica con bajo impacto ambiental",
    ],
    aplicaciones: ["Cristales y vitrinas", "Espejos", "Superficies vitrificadas", "Oficinas e instituciones"],
    tiposSuciedad: ["residuos-quimicos", "residuos-organicos"],
    superficiesCompatibles: ["ceramica", "vidrio", "acero-inoxidable", "pvc"],
    industrias: ["institucional", "hospitales", "retail"],
    dilucion: "Listo para uso. Se puede diluir ligeramente según la superficie.",
    modoUso: "Aplicar directamente y secar con paño de microfibra. No necesita enjuague.",
    equipoRecomendado: ["aplicador-microfibra-tecnica"],
    serviciosRelacionados: ["diseno-protocolo", "mantenimiento-preventivo"],
    impactoAmbiental: [
      "Formulación ecológica con bajo impacto en agua y aire",
      "Sin compuestos nocivos para sistemas de tratamiento de efluentes",
    ],
    informacionSeguridad: ["Producto de bajo riesgo. Consultar ficha de seguridad para detalles de almacenamiento."],
    imagenes: [],
    productosRelacionados: ["ovi-ecoseal", "ovi-dose-control-cart"],
    status: "en-revision",
  },
  {
    id: "ovi-eco-wax",
    nombre: "OVI Eco Wax",
    categoria: "quimicos",
    resumen:
      "Cera ecológica para pisos que brinda lustre y protección superficial. Ideal para mantenimiento de pisos institucionales e industriales.",
    descripcion:
      "Cera ecológica formulada para el mantenimiento y embellecimiento de pisos institucionales e industriales. Brinda lustre duradero y capa protectora que facilita la limpieza diaria y prolonga la vida útil del piso. Complementa el sistema de protección OVI Ecoseal.",
    beneficios: [
      "Protección y lustre duradero en pisos de alto tráfico",
      "Facilita la limpieza diaria al crear barrera protectora",
      "Formulación ecológica compatible con estándares ambientales",
      "Complementa el sistema OVI Ecoseal para protección integral",
    ],
    aplicaciones: ["Pisos institucionales", "Pasillos de alto tráfico", "Instalaciones comerciales"],
    tiposSuciedad: [],
    superficiesCompatibles: ["pisos-sellados", "ceramica", "concreto-sellado"],
    industrias: ["institucional", "retail"],
    dilucion: "Listo para uso según instrucciones del protocolo OVI.",
    modoUso: "Aplicar con mopa o aplicador de microfibra sobre superficie limpia y seca.",
    equipoRecomendado: ["aplicador-microfibra-tecnica"],
    serviciosRelacionados: ["mantenimiento-preventivo"],
    impactoAmbiental: ["Formulación ecológica con menor impacto ambiental"],
    informacionSeguridad: ["Consultar ficha de seguridad. Producto de bajo riesgo."],
    imagenes: [],
    productosRelacionados: ["ovi-ecoseal"],
    status: "en-revision",
  },
  {
    id: "ovi-solwash",
    nombre: "OVI Solwash",
    categoria: "quimicos",
    resumen:
      "Detergente especializado 100% biodegradable para lavado de flota vehicular pesada y buses. Cuida el brillo de la pintura y sin solventes.",
    descripcion:
      "Detergente especializado 100% biodegradable formulado para el lavado y mantenimiento de flotas de vehículos pesados, camiones, buses y equipos industriales. Sin abrasivos ni solventes — cuida el brillo de la pintura mientras elimina grasa de caminos, hollín y contaminantes adheridos. Compatible con sistemas de lavado automático y manual.",
    beneficios: [
      "Formulación 100% biodegradable — seguro para el ambiente",
      "Sin abrasivos ni solventes — protege el brillo de la pintura",
      "Compatible con pinturas al agua y solvente",
      "Diseñado para lavado automático y manual de flotas",
    ],
    aplicaciones: ["Flota de camiones", "Buses y transporte público", "Vehículos de carga", "Maquinaria industrial"],
    tiposSuciedad: ["grasa-pesada", "carbonilla", "lodo", "polvo-industrial"],
    superficiesCompatibles: ["pintura-automotriz", "aluminio", "plastico-tecnico"],
    industrias: ["transporte"],
    dilucion: "Según protocolo OVI para el tipo de flota y nivel de suciedad",
    modoUso: "Aplicación manual con esponja o mopa, o mediante sistema de lavado automático.",
    equipoRecomendado: ["ovi-flota-rinse-arch"],
    serviciosRelacionados: ["lavado-flota"],
    impactoAmbiental: [
      "Formulación 100% biodegradable que reduce el impacto ambiental del efluente",
      "Sin solventes: menor carga tóxica en aguas de proceso",
    ],
    informacionSeguridad: ["Consultar ficha técnica y MSDS. Usar EPP básico en aplicación a presión."],
    imagenes: [],
    productosRelacionados: ["ovi-biodex", "ovi-dose-control-cart"],
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
  {
    id: "ovi-cr30",
    nombre: "OVI CR 30",
    categoria: "quimicos",
    resumen:
      "Desengrasante solvente de alto poder penetrante para grasa pesada incrustada en maquinaria, motores, tanques y equipos industriales.",
    descripcion:
      "Desengrasante con base solvente de fórmula penetrante rápida para remoción de grasa pesada e incrustada. Especialmente efectivo en maquinaria, motores, tanques, grúas y equipos del sector industrial, automotriz y petrolero. Disponible en presentación aromática (CR 30) y desodorizada (CR 30S).",
    beneficios: [
      "Alta penetración sobre grasa vieja e incrustada",
      "Fórmula solvente de acción rápida",
      "Disponible en versión aromática y desodorizada",
    ],
    aplicaciones: ["Industria pesada", "Automotriz", "Sector petrolero", "Maquinaria pesada"],
    tiposSuciedad: ["grasa-pesada", "aceite", "residuos-quimicos"],
    superficiesCompatibles: ["acero-inoxidable", "pintura-industrial"],
    industrias: ["industria", "energia", "transporte"],
    dilucion: "Listo para uso o según protocolo OVI para el tipo de contaminante.",
    modoUso: "Aplicación directa o por aspersión. Usar en ambientes ventilados.",
    equipoRecomendado: [],
    serviciosRelacionados: ["diagnostico-tecnico", "limpieza-industrial"],
    impactoAmbiental: [],
    informacionSeguridad: ["Usar EPP completo. Ventilación obligatoria. Revisar MSDS antes de aplicar."],
    imagenes: [],
    productosRelacionados: ["ovi-biodex", "ovi-jp35", "ovi-dose-control-cart"],
    status: "en-revision",
  },
  {
    id: "ovi-handsol",
    nombre: "OVI Handsol",
    categoria: "quimicos",
    resumen:
      "Limpiador industrial especializado en seco para manos. Remueve grasa, aceites, óxido y suciedad del trabajo industrial sin necesidad de agua.",
    descripcion:
      "Limpiador industrial ecológico en seco para manos. Permite la remoción de grasa, aceites, tierra, carbón, anilinas, óxido y suciedad común del trabajo industrial sin necesidad de enjuague con agua. Cuidado de la piel: humecta y protege las manos del operador. Reduce el riesgo de enfermedades por cambios bruscos de temperatura.",
    beneficios: [
      "Sin necesidad de agua — uso en seco",
      "Humecta y cuida la piel del operador",
      "Ecológico y seguro para uso continuado",
      "Reduce riesgo por cambios de temperatura en lavado tradicional",
    ],
    aplicaciones: ["Mantenimiento industrial", "Talleres mecánicos", "Operaciones de campo"],
    tiposSuciedad: ["grasa-pesada", "aceite", "carbonilla"],
    superficiesCompatibles: [],
    industrias: ["industria", "transporte", "energia"],
    dilucion: "Listo para uso directo",
    modoUso: "Aplicar directamente sobre manos sucias. Frotar hasta remover la suciedad. No requiere enjuague.",
    equipoRecomendado: [],
    serviciosRelacionados: ["capacitacion-personal"],
    impactoAmbiental: ["Formulación ecológica. Elimina la necesidad de agua para limpieza de manos."],
    informacionSeguridad: ["Para uso externo en manos. Evitar contacto con ojos."],
    imagenes: [],
    productosRelacionados: ["ovi-biodex"],
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
    productosRelacionados: ["ovi-biodex", "ovi-dose-control-cart", "ovi-precision-foam-kit"],
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
    productosRelacionados: ["ovi-biodex", "ovi-ecoseal", "ovi-dose-control-cart"],
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
    productosRelacionados: ["ovi-biodex", "ovi-precision-foam-kit", "ovi-flota-rinse-arch"],
    status: "activo",
  },
];
