/**
 * Company Knowledge — Official Company Data
 * OKP-001 — OVI Knowledge Program — Company Knowledge
 *
 * ──────────────────────────────────────────────────────────────────────────────
 * GOVERNANCE RULES — READ BEFORE EDITING
 * ──────────────────────────────────────────────────────────────────────────────
 *
 * 1. Only populate fields from official repository sources.
 *    Sources: company/, src/config/site.ts, docs/, README.md
 *
 * 2. Missing information stays absent — use undefined, NEVER invent content.
 *    See company/CONTENT_RULES.md, Regla 1.
 *
 * 3. Sections without official data are NOT populated (no placeholders in data).
 *    Incomplete sections are reflected in informationStatus.
 *
 * 4. Spanish is the master language.
 *    See company/CONTENT_RULES.md, Regla 4.
 *
 * ──────────────────────────────────────────────────────────────────────────────
 * REPOSITORY AUDIT SUMMARY (OKP-001)
 * ──────────────────────────────────────────────────────────────────────────────
 *
 * VERIFIED OFFICIAL INFORMATION FOUND:
 *   ✓ Identity:         src/config/site.ts, company/brand/brand-pillars.md
 *   ✓ Mission:          src/app/about/page.tsx
 *   ✓ Vision:           src/app/about/page.tsx
 *   ✓ History:          src/knowledge/home/engineering-pillars.ts
 *   ✓ Experience:       src/knowledge/home/identity-metrics.ts, src/knowledge/home/success-cases.ts
 *   ✓ Brand Pillars:    company/brand/brand-pillars.md
 *   ✓ Brand Promise:    company/brand/brand-promise.md (draft, not published)
 *   ✓ Tone of Voice:    company/brand/tone-of-voice.md
 *   ✓ Industries:       src/knowledge/sectors/catalog.ts
 *   ✓ Services:         src/knowledge/services/catalog.ts
 *   ✓ Technology:       company/brand/brand-pillars.md, company/PROJECT_VISION.md
 *   ✓ Client evidence:  public/ovi-media/cases/emvarias/emvarias-fleet-wash.png
 *   ✓ Brand Assets:     public/brand/ovi-logo.svg
 *
 * NOT FOUND IN REPOSITORY (marked missing):
 *   ✗ Certifications:   company/MASTER_INDEX.md — pending
 *   ✗ Strategic alliances: not documented officially
 *   ✗ Corporate governance: not documented officially
 *   ✗ Founding year and legal history: not documented officially
 *   ✗ Exact countries beyond "Colombia y la región": not documented officially
 *   ✗ Testimonials: no testimonial repository source found
 *
 * ──────────────────────────────────────────────────────────────────────────────
 */

import type { CompanyProfile } from "../types/company-profile";

// ─── Company Profile ──────────────────────────────────────────────────────────

export const OVI_COMPANY_PROFILE: CompanyProfile = {
  profileId: "ovi-company-profile",
  schemaVersion: "1.0.0",
  informationStatus: "partial",
  publicationStatus: "draft",
  lastUpdated: "2026-07-20T22:08:51.000Z",

  // ─── Identity ───────────────────────────────────────────────────────────────
  // Source: src/config/site.ts, company/brand/brand-pillars.md
  identity: {
    officialName: "OVI",
    brandName: "OVI",
    tagline: "Ingeniería en Limpieza",
    description:
      "OVI — Ingeniería en Limpieza. Diseñamos soluciones integrales para resolver desafíos de limpieza, mantenimiento e higiene industrial mediante diagnóstico técnico, protocolos especializados, servicios y tecnología aplicada.",
    website: "https://ovi.com",
    contactEmail: "info@ovi.com",
    contactPhone: undefined,
    address: undefined,
    linkedin: "https://www.linkedin.com/company/ovi",
    instagram: undefined,
    twitter: undefined,
    youtube: undefined,
    keywords: [
      "limpieza industrial",
      "soluciones químicas biodegradables",
      "lavado de flota",
      "OVI",
      "ingeniería en limpieza",
      "impermeabilización",
      "post obra",
      "limpieza de infraestructura",
      "buenas prácticas ambientales",
    ],
    publicationStatus: "published",
    verificationStatus: "source_confirmed",
    sources: [
      {
        sourceType: "site_config",
        sourceFile: "src/config/site.ts",
        sourceSection: "siteConfig",
        verificationStatus: "source_confirmed",
        internalNote:
          "Canonical site configuration — official source of truth for identity fields.",
      },
    ],
  },

  // ─── Mission ────────────────────────────────────────────────────────────────
  // Source: src/app/about/page.tsx
  mission: {
    title: "Nuestra Misión",
    description:
      "Creamos soluciones industriales de limpieza y química biodegradable que elevan los estándares operativos reduciendo la huella ambiental. Cada producto y servicio está diseñado para resolver problemas medibles en limpieza industrial, post obra, impermeabilización y lavado de flota de transporte.",
    evidence:
      "La página About presenta una sección titulada 'Nuestra Misión' con un texto oficial que conecta limpieza industrial, química biodegradable, sostenibilidad y resultados medibles.",
    publicationStatus: "published",
    verificationStatus: "source_confirmed",
    sources: [
      {
        sourceType: "repository_document",
        sourceFile: "src/app/about/page.tsx",
        sourceSection: "Nuestra Misión",
        verificationStatus: "source_confirmed",
        internalNote: null,
      },
    ],
  },

  // ─── Vision ─────────────────────────────────────────────────────────────────
  // Source: src/app/about/page.tsx
  vision: {
    title: "Visión",
    description:
      "Creemos que el futuro de la industria depende de soluciones que sean altamente efectivas e inherentemente responsables con el medio ambiente.",
    evidence:
      "La página About incluye una declaración destacada en formato de cita orientada al futuro de la industria y a la responsabilidad ambiental.",
    publicationStatus: "published",
    verificationStatus: "source_confirmed",
    sources: [
      {
        sourceType: "repository_document",
        sourceFile: "src/app/about/page.tsx",
        sourceSection: "Quote card in About mission section",
        verificationStatus: "source_confirmed",
        internalNote: null,
      },
    ],
  },

  // ─── Purpose ────────────────────────────────────────────────────────────────
  // Source: company/brand/brand-promise.md (draft — do not publish yet)
  purpose: {
    brandPromise:
      "Ayudamos a las organizaciones a resolver sus desafíos más complejos de limpieza y mantenimiento mediante ingeniería, tecnología y soluciones operativas inteligentes.",
    publicationStatus: "draft",
    verificationStatus: "source_confirmed",
    sources: [
      {
        sourceType: "brand_document",
        sourceFile: "company/brand/brand-promise.md",
        sourceSection: "VERSION 1 — INTERNAL REVIEW DRAFT",
        verificationStatus: "source_confirmed",
        internalNote:
          "brand-promise.md explicitly states 'Do not publish yet' and 'Esta promesa aún no está aprobada para publicación.'",
      },
    ],
  },

  // ─── Core Values / Brand Pillars ────────────────────────────────────────────
  // Source: company/brand/brand-pillars.md
  // The Six Permanent Pillars are treated as core values in this model.
  coreValues: [
    {
      id: "ingenieria-en-limpieza",
      name: "Ingeniería en Limpieza",
      description:
        "OVI diseña soluciones impulsadas por ingeniería para resolver desafíos complejos de limpieza, higiene y mantenimiento.",
      publicationStatus: "published",
      verificationStatus: "source_confirmed",
      sources: [
        {
          sourceType: "brand_document",
          sourceFile: "company/brand/brand-pillars.md",
          sourceSection: "1. Ingeniería en Limpieza",
          verificationStatus: "source_confirmed",
          internalNote: null,
        },
      ],
    },
    {
      id: "operational-excellence",
      name: "Operational Excellence",
      description:
        "OVI mejora productividad, calidad y eficiencia a través de soluciones operativas diseñadas con precisión.",
      publicationStatus: "published",
      verificationStatus: "source_confirmed",
      sources: [
        {
          sourceType: "brand_document",
          sourceFile: "company/brand/brand-pillars.md",
          sourceSection: "2. Operational Excellence",
          verificationStatus: "source_confirmed",
          internalNote: null,
        },
      ],
    },
    {
      id: "technology",
      name: "Technology",
      description:
        "La propuesta de valor de OVI integra tecnología como habilitador directo del desempeño operativo.",
      publicationStatus: "published",
      verificationStatus: "source_confirmed",
      sources: [
        {
          sourceType: "brand_document",
          sourceFile: "company/brand/brand-pillars.md",
          sourceSection: "3. Technology",
          verificationStatus: "source_confirmed",
          internalNote: null,
        },
      ],
    },
    {
      id: "sustainability",
      name: "Sustainability",
      description:
        "OVI incorpora sostenibilidad como criterio de ingeniería y eficiencia operacional.",
      publicationStatus: "published",
      verificationStatus: "source_confirmed",
      sources: [
        {
          sourceType: "brand_document",
          sourceFile: "company/brand/brand-pillars.md",
          sourceSection: "4. Sustainability",
          verificationStatus: "source_confirmed",
          internalNote: null,
        },
      ],
    },
    {
      id: "knowledge",
      name: "Knowledge",
      description:
        "OVI convierte conocimiento técnico en soluciones aplicables y repetibles para sus clientes.",
      publicationStatus: "published",
      verificationStatus: "source_confirmed",
      sources: [
        {
          sourceType: "brand_document",
          sourceFile: "company/brand/brand-pillars.md",
          sourceSection: "5. Knowledge",
          verificationStatus: "source_confirmed",
          internalNote: null,
        },
      ],
    },
    {
      id: "long-term-partnership",
      name: "Long-Term Partnership",
      description:
        "OVI no actúa como proveedor transaccional. OVI se integra a la operación del cliente como socio de largo plazo.",
      publicationStatus: "published",
      verificationStatus: "source_confirmed",
      sources: [
        {
          sourceType: "brand_document",
          sourceFile: "company/brand/brand-pillars.md",
          sourceSection: "6. Long-Term Partnership",
          verificationStatus: "source_confirmed",
          internalNote: null,
        },
      ],
    },
  ],

  // ─── History ────────────────────────────────────────────────────────────────
  // Source: src/knowledge/home/engineering-pillars.ts, src/knowledge/home/success-cases.ts,
  //         public/ovi-dam/metadata/CASE-001-IMG-01.json
  history: {
    narrative:
      "OVI lleva más de 18 años integrando ingeniería, tecnología, productos, servicios, protocolos e inteligencia operacional para resolver desafíos complejos de limpieza, mantenimiento e higiene.",
    timeline: [
      {
        date: "2026-07-15",
        year: 2026,
        event: "Caso de lavado de flota pesada documentado en el DAM oficial",
        description:
          "La metadata oficial CASE-001-IMG-01 registra el caso 'Lavado de flota pesada en operación industrial' como evidencia pública del trabajo de OVI en transporte.",
        evidence:
          "CASE-001 documenta capacidad para más de 7,000 unidades por mes, reducción de tiempo de ciclo y estandarización del consumo de agua.",
        sourceReference: "public/ovi-dam/metadata/CASE-001-IMG-01.json",
        publicationStatus: "published",
        verificationStatus: "source_confirmed",
        sources: [
          {
            sourceType: "repository_document",
            sourceFile: "public/ovi-dam/metadata/CASE-001-IMG-01.json",
            sourceSection: "date",
            verificationStatus: "source_confirmed",
            internalNote: null,
          },
          {
            sourceType: "repository_document",
            sourceFile: "docs/content/OVI_CONTENT_MASTER.md",
            sourceSection: "1. CASOS DE ÉXITO — CASE-001",
            verificationStatus: "source_confirmed",
            internalNote: null,
          },
        ],
      },
    ],
    publicationStatus: "published",
    verificationStatus: "source_confirmed",
    sources: [
      {
        sourceType: "repository_document",
        sourceFile: "src/knowledge/home/engineering-pillars.ts",
        sourceSection: "homeAbout.locales.es.body",
        verificationStatus: "source_confirmed",
        internalNote: null,
      },
      {
        sourceType: "repository_document",
        sourceFile: "src/knowledge/home/engineering-pillars.ts",
        sourceSection: "homeAbout.locales.es.heading",
        verificationStatus: "source_confirmed",
        internalNote: null,
      },
    ],
  },

  // ─── Experience ──────────────────────────────────────────────────────────────
  // Source: src/knowledge/home/identity-metrics.ts, src/knowledge/home/success-cases.ts,
  //         docs/content/OVI_CONTENT_MASTER.md
  experience: {
    years: "Más de 18 años",
    projects: [
      {
        id: "case-001-flota-transporte-pesado",
        title: "Flota de transporte pesado",
        caseStudyId: "CASE-001",
        description:
          "Protocolo de lavado OVI Solwash implementado en patio con capacidad para atender más de 7,000 unidades por mes.",
        evidence:
          "Reducción del tiempo de ciclo por unidad y estandarización del consumo de agua entre operadores.",
        status: "complete",
      },
      {
        id: "case-002-planta-industrial-manufactura",
        title: "Planta industrial de manufactura",
        caseStudyId: "CASE-002",
        description:
          "Implementación de protocolo de desengrase en maquinaria y líneas de producción con trazabilidad completa.",
        evidence: "Cumplimiento de normativa de inocuidad y documentación de cada intervención.",
        status: "complete",
      },
      {
        id: "case-003-instalacion-institucional",
        title: "Instalación institucional de alto tráfico",
        caseStudyId: "CASE-003",
        description:
          "Programa de mantenimiento preventivo con OVI Ecoseal para reducir limpiezas correctivas y extender el ciclo de mantenimiento.",
        evidence:
          "Menor consumo de insumos y extensión del ciclo de mantenimiento en operación real.",
        status: "complete",
      },
    ],
    industries: [
      { industryId: "transporte", label: "Transporte" },
      { industryId: "industria", label: "Industria" },
      { industryId: "hospitales", label: "Hospitales" },
      { industryId: "energia", label: "Energía" },
      { industryId: "institucional", label: "Institucional" },
      { industryId: "retail", label: "Retail" },
      { industryId: "alimentos", label: "Alimentos" },
    ],
    capabilities: [
      "Diagnóstico técnico",
      "Diseño operativo",
      "Protocolos especializados",
      "Tecnología aplicada",
      "Implementación en campo",
    ],
    evidence: [
      "Más de 18 años de experiencia en operaciones reales.",
      "3 casos oficiales documentados en el repositorio.",
      "Capacidad para atender flotas de más de 7,000 unidades por mes.",
      "Cobertura documentada en 7 sectores con protocolos especializados.",
    ],
    status: "partial",
    publicationStatus: "published",
    verificationStatus: "source_confirmed",
    sources: [
      {
        sourceType: "repository_document",
        sourceFile: "src/knowledge/home/identity-metrics.ts",
        sourceSection: "identityMetrics",
        verificationStatus: "source_confirmed",
        internalNote: null,
      },
      {
        sourceType: "repository_document",
        sourceFile: "src/knowledge/home/success-cases.ts",
        sourceSection: "successCases",
        verificationStatus: "source_confirmed",
        internalNote: null,
      },
      {
        sourceType: "repository_document",
        sourceFile: "docs/content/OVI_CONTENT_MASTER.md",
        sourceSection: "1. CASOS DE ÉXITO",
        verificationStatus: "source_confirmed",
        internalNote: null,
      },
    ],
  },

  // ─── Capabilities ────────────────────────────────────────────────────────────
  capabilities: [
    {
      id: "diagnostico-tecnico",
      category: "engineering",
      name: "Diagnóstico técnico",
      description:
        "OVI parte de un diagnóstico técnico antes de recomendar una solución o un protocolo.",
      evidence:
        "Las fuentes oficiales describen el diagnóstico técnico como primer paso de la metodología y del posicionamiento 'Ingeniería en Limpieza'.",
      publicationStatus: "published",
      verificationStatus: "source_confirmed",
      sources: [
        {
          sourceType: "brand_document",
          sourceFile: "company/brand/brand-pillars.md",
          sourceSection: "1. Ingeniería en Limpieza — Implica",
          verificationStatus: "source_confirmed",
          internalNote: null,
        },
        {
          sourceType: "repository_document",
          sourceFile: "src/knowledge/services/catalog.ts",
          sourceSection: "diagnostico-tecnico",
          verificationStatus: "source_confirmed",
          internalNote: null,
        },
      ],
    },
    {
      id: "protocolos-especializados",
      category: "operations",
      name: "Protocolos especializados",
      description:
        "OVI diseña y ejecuta protocolos operativos documentados para contaminantes, superficies y sectores específicos.",
      evidence:
        "Los sectores, servicios y casos oficiales destacan protocolos documentados, auditables y especializados por sector.",
      publicationStatus: "published",
      verificationStatus: "source_confirmed",
      sources: [
        {
          sourceType: "repository_document",
          sourceFile: "src/knowledge/home/engineering-pillars.ts",
          sourceSection: "homeEngineering.locales.es.pillars",
          verificationStatus: "source_confirmed",
          internalNote: null,
        },
        {
          sourceType: "repository_document",
          sourceFile: "src/knowledge/services/catalog.ts",
          sourceSection: "diseno-protocolo",
          verificationStatus: "source_confirmed",
          internalNote: null,
        },
      ],
    },
    {
      id: "tecnologia-aplicada",
      category: "technology",
      name: "Tecnología aplicada",
      description:
        "OVI integra inteligencia artificial, automatización, datos y OVI OS como habilitadores del desempeño operativo.",
      evidence:
        "La documentación oficial identifica Artificial Intelligence, Automation, OVI OS, Data y Digital Transformation como componentes clave.",
      publicationStatus: "published",
      verificationStatus: "source_confirmed",
      sources: [
        {
          sourceType: "brand_document",
          sourceFile: "company/brand/brand-pillars.md",
          sourceSection: "3. Technology",
          verificationStatus: "source_confirmed",
          internalNote: null,
        },
        {
          sourceType: "repository_document",
          sourceFile: "company/PROJECT_VISION.md",
          sourceSection: "2. Artificial Intelligence / 3. OVI OS",
          verificationStatus: "source_confirmed",
          internalNote: null,
        },
      ],
    },
    {
      id: "implementacion-campo",
      category: "execution",
      name: "Implementación en campo",
      description:
        "OVI combina diseño operativo con ejecución trazable en campo para generar resultados medibles y consistentes.",
      evidence:
        "Las fuentes oficiales describen la implementación en campo como parte del sistema integrado de protocolos, productos y servicios.",
      publicationStatus: "published",
      verificationStatus: "source_confirmed",
      sources: [
        {
          sourceType: "repository_document",
          sourceFile: "src/knowledge/home/engineering-pillars.ts",
          sourceSection: "homeEngineering.locales.es.body",
          verificationStatus: "source_confirmed",
          internalNote: null,
        },
        {
          sourceType: "repository_document",
          sourceFile: "src/knowledge/home/success-cases.ts",
          sourceSection: "successCases",
          verificationStatus: "source_confirmed",
          internalNote: null,
        },
      ],
    },
  ],

  // ─── Differentiators ────────────────────────────────────────────────────────
  // Source: company/brand/brand-pillars.md — brand pillars as competitive differentiators
  differentiators: [
    {
      id: "ingenieria-diagnostico",
      title: "Diagnóstico técnico antes de recomendar una solución",
      description:
        "OVI aplica metodologías estructuradas y medibles. Diagnóstico técnico antes de recomendar, no ventas genéricas.",
      evidence:
        "El pilar 'Ingeniería en Limpieza' establece explícitamente el diagnóstico técnico antes de recomendar una solución.",
      publicationStatus: "published",
      verificationStatus: "source_confirmed",
      sources: [
        {
          sourceType: "brand_document",
          sourceFile: "company/brand/brand-pillars.md",
          sourceSection: "1. Ingeniería en Limpieza — Implica",
          verificationStatus: "source_confirmed",
          internalNote: null,
        },
      ],
    },
    {
      id: "socio-largo-plazo",
      title: "Socio de largo plazo, no proveedor transaccional",
      description:
        "OVI se integra a la operación del cliente con acompañamiento continuo y evolución de soluciones con el tiempo.",
      evidence:
        "El pilar 'Long-Term Partnership' define a OVI como socio de largo plazo integrado a la operación.",
      publicationStatus: "published",
      verificationStatus: "source_confirmed",
      sources: [
        {
          sourceType: "brand_document",
          sourceFile: "company/brand/brand-pillars.md",
          sourceSection: "6. Long-Term Partnership",
          verificationStatus: "source_confirmed",
          internalNote: null,
        },
      ],
    },
    {
      id: "tecnologia-operativa",
      title: "Tecnología integrada como habilitador operativo",
      description:
        "Inteligencia artificial, automatización, OVI OS, datos y transformación digital aplicados a la operación de limpieza.",
      evidence:
        "El pilar 'Technology' enumera Artificial Intelligence, Automation, OVI OS, Data y Digital Transformation como componentes clave.",
      publicationStatus: "published",
      verificationStatus: "source_confirmed",
      sources: [
        {
          sourceType: "brand_document",
          sourceFile: "company/brand/brand-pillars.md",
          sourceSection: "3. Technology",
          verificationStatus: "source_confirmed",
          internalNote: null,
        },
      ],
    },
    {
      id: "sostenibilidad-criterio-ingenieria",
      title: "Sostenibilidad como criterio de ingeniería",
      description:
        "Reducción de agua, químicos y residuos integrada en el diseño de soluciones, no como cumplimiento cosmético.",
      evidence:
        "El pilar 'Sustainability' fija la reducción de agua, químicos y residuos como objetivos permanentes.",
      publicationStatus: "published",
      verificationStatus: "source_confirmed",
      sources: [
        {
          sourceType: "brand_document",
          sourceFile: "company/brand/brand-pillars.md",
          sourceSection: "4. Sustainability",
          verificationStatus: "source_confirmed",
          internalNote: null,
        },
      ],
    },
    {
      id: "excelencia-operativa",
      title: "Excelencia operativa como objetivo continuo",
      description:
        "OVI mejora productividad, calidad y eficiencia a través de soluciones diseñadas para reducir fricción, retrabajo y variabilidad.",
      evidence:
        "El pilar 'Operational Excellence' establece explícitamente la optimización de procesos y la reducción de variabilidad como objetivos permanentes.",
      publicationStatus: "published",
      verificationStatus: "source_confirmed",
      sources: [
        {
          sourceType: "brand_document",
          sourceFile: "company/brand/brand-pillars.md",
          sourceSection: "2. Operational Excellence",
          verificationStatus: "source_confirmed",
          internalNote: null,
        },
      ],
    },
    {
      id: "conocimiento-tecnico-aplicado",
      title: "Conocimiento técnico convertido en soluciones aplicables",
      description:
        "OVI convierte conocimiento técnico en protocolos, mejores prácticas, capacitación y consultoría que los clientes pueden aplicar y repetir.",
      evidence:
        "El pilar 'Knowledge' define la transferencia de conocimiento útil, estandarización de mejores prácticas y formación como parte del valor entregado.",
      publicationStatus: "published",
      verificationStatus: "source_confirmed",
      sources: [
        {
          sourceType: "brand_document",
          sourceFile: "company/brand/brand-pillars.md",
          sourceSection: "5. Knowledge",
          verificationStatus: "source_confirmed",
          internalNote: null,
        },
      ],
    },
  ],

  // ─── Business Units ──────────────────────────────────────────────────────────
  // Source: src/config/site.ts, company/PROJECT_VISION.md
  businessUnits: [
    {
      id: "ovi-ai",
      name: "OVI AI",
      description:
        "Asistente de inteligencia artificial con conocimiento profundo del dominio de OVI.",
      publicationStatus: "published",
      verificationStatus: "source_confirmed",
      sources: [
        {
          sourceType: "repository_document",
          sourceFile: "company/PROJECT_VISION.md",
          sourceSection: "2. Artificial Intelligence",
          verificationStatus: "source_confirmed",
          internalNote: null,
        },
      ],
    },
    {
      id: "ovi-os",
      name: "OVI OS",
      description:
        "Sistema operativo de gestión de limpieza industrial con dashboards, protocolos, alertas y trazabilidad.",
      publicationStatus: "published",
      verificationStatus: "source_confirmed",
      sources: [
        {
          sourceType: "repository_document",
          sourceFile: "company/PROJECT_VISION.md",
          sourceSection: "3. OVI OS",
          verificationStatus: "source_confirmed",
          internalNote: null,
        },
      ],
    },
    {
      id: "ovi-field",
      name: "OVI Field",
      description: "Plataforma de operación de campo para equipos de limpieza industrial.",
      publicationStatus: "published",
      verificationStatus: "source_confirmed",
      sources: [
        {
          sourceType: "site_config",
          sourceFile: "src/config/site.ts",
          sourceSection: "nav.main — OVI Field",
          verificationStatus: "source_confirmed",
          internalNote: null,
        },
      ],
    },
    {
      id: "ovi-ops",
      name: "OVI OPS",
      description: "Plataforma de gestión operativa.",
      publicationStatus: "published",
      verificationStatus: "source_confirmed",
      sources: [
        {
          sourceType: "site_config",
          sourceFile: "src/config/site.ts",
          sourceSection: "nav.main — OVI OPS",
          verificationStatus: "source_confirmed",
          internalNote: null,
        },
      ],
    },
    {
      id: "ovi-analytics",
      name: "OVI Analytics",
      description:
        "Plataforma de analítica operativa para visualización de KPIs de higiene y cumplimiento.",
      publicationStatus: "published",
      verificationStatus: "source_confirmed",
      sources: [
        {
          sourceType: "site_config",
          sourceFile: "src/config/site.ts",
          sourceSection: "nav.main — OVI Analytics",
          verificationStatus: "source_confirmed",
          internalNote: null,
        },
      ],
    },
    {
      id: "ovi-command-center",
      name: "OVI Command Center",
      description: "Centro de comando para supervisión centralizada de operaciones.",
      publicationStatus: "published",
      verificationStatus: "source_confirmed",
      sources: [
        {
          sourceType: "site_config",
          sourceFile: "src/config/site.ts",
          sourceSection: "nav.main — OVI Command Center",
          verificationStatus: "source_confirmed",
          internalNote: null,
        },
      ],
    },
  ],

  // ─── Service References ──────────────────────────────────────────────────────
  // Source: src/knowledge/services/catalog.ts
  // Referenced only — service definitions remain in the Service Knowledge domain.
  serviceReferences: [
    { serviceId: "lavado-flota", label: "Servicio de Lavado de Flota" },
    { serviceId: "limpieza-industrial", label: "Servicio de Limpieza Industrial" },
    { serviceId: "auditoria-patio", label: "Auditoría de Patio" },
    { serviceId: "optimizacion-hidrica", label: "Optimización Hídrica" },
    { serviceId: "diagnostico-tecnico", label: "Diagnóstico Técnico de Suciedad y Proceso" },
    { serviceId: "capacitacion-personal", label: "Capacitación Operativa" },
    { serviceId: "diseno-protocolo", label: "Diseño de Protocolo por Sector" },
    { serviceId: "mantenimiento-preventivo", label: "Mantenimiento Preventivo de Superficies" },
    { serviceId: "implementacion-protocolo", label: "Implementación de Protocolo" },
    { serviceId: "levantamiento-activos", label: "Levantamiento de Activos" },
  ],

  // ─── Industry References ─────────────────────────────────────────────────────
  // Source: src/knowledge/sectors/catalog.ts
  industryReferences: [
    { industryId: "transporte", label: "Transporte" },
    { industryId: "industria", label: "Industria" },
    { industryId: "hospitales", label: "Hospitales" },
    { industryId: "energia", label: "Energía" },
    { industryId: "institucional", label: "Institucional" },
    { industryId: "retail", label: "Retail" },
    { industryId: "alimentos", label: "Alimentos" },
  ],

  // ─── Geographic Coverage ─────────────────────────────────────────────────────
  geographicCoverage: {
    description:
      "OVI resuelve desafíos de limpieza, mantenimiento e higiene en Colombia y la región.",
    publicationStatus: "published",
    verificationStatus: "source_confirmed",
    sources: [
      {
        sourceType: "repository_document",
        sourceFile: "src/knowledge/home/identity-metrics.ts",
        sourceSection: "metric-years-experience.seoDescription",
        verificationStatus: "source_confirmed",
        internalNote: null,
      },
    ],
  },

  // ─── Corporate Numbers ───────────────────────────────────────────────────────
  corporateNumbers: {
    productCount: 56,
    otherFigures: {
      experiencia: "Más de 18 años",
      capacidadFlota: "Más de 7,000 unidades por mes",
      sectoresAtendidos: "7 sectores",
      casosDocumentados: "3 casos oficiales activos",
      productosQuimicos: "56 productos",
      servicios: "10 servicios",
    },
    publicationStatus: "published",
    verificationStatus: "source_confirmed",
    sources: [
      {
        sourceType: "repository_document",
        sourceFile: "src/knowledge/home/identity-metrics.ts",
        sourceSection: "identityMetrics",
        verificationStatus: "source_confirmed",
        internalNote: null,
      },
      {
        sourceType: "repository_document",
        sourceFile: "docs/content/OVI_CONTENT_MASTER.md",
        sourceSection: "1. CASOS DE ÉXITO",
        verificationStatus: "source_confirmed",
        internalNote: null,
      },
      {
        sourceType: "repository_document",
        sourceFile: "src/features/products/chemical-lines-data.ts",
        sourceSection: "TOTAL_PRODUCTS",
        verificationStatus: "source_confirmed",
        internalNote: "56 official products confirmed from chemical-lines-data.ts TOTAL_PRODUCTS.",
      },
    ],
  },

  // ─── Technology Stack ────────────────────────────────────────────────────────
  technologyStack: {
    technologies: {
      "Artificial Intelligence": "Asistente con conocimiento profundo del dominio OVI.",
      Automation: "Automatización de tareas críticas dentro de la operación.",
      "OVI OS": "Sistema operativo para dashboards, protocolos, alertas y trazabilidad.",
      Data: "Trazabilidad, documentación y decisiones mejor informadas.",
      "Digital Transformation":
        "Integración digital de protocolos, servicios, productos y ejecución.",
    },
    publicationStatus: "published",
    verificationStatus: "source_confirmed",
    sources: [
      {
        sourceType: "brand_document",
        sourceFile: "company/brand/brand-pillars.md",
        sourceSection: "3. Technology",
        verificationStatus: "source_confirmed",
        internalNote: null,
      },
      {
        sourceType: "repository_document",
        sourceFile: "company/PROJECT_VISION.md",
        sourceSection: "2. Artificial Intelligence / 3. OVI OS / 7. Operational Dashboards",
        verificationStatus: "source_confirmed",
        internalNote: null,
      },
    ],
  },

  // ─── Client References ───────────────────────────────────────────────────────
  // Source: public/ovi-media/cases/emvarias/emvarias-fleet-wash.png,
  //         public/ovi-dam/metadata/CASE-001-IMG-01.json
  clients: [
    {
      id: "emvarias",
      displayName: "EMVARIAS",
      visibility: "public",
      industry: "Infraestructura / Transporte",
      caseStudyId: "CASE-001",
      publicationStatus: "published",
      verificationStatus: "source_confirmed",
      sources: [
        {
          sourceType: "repository_document",
          sourceFile: "public/ovi-media/cases/emvarias/emvarias-fleet-wash.png",
          sourceSection: null,
          verificationStatus: "source_confirmed",
          internalNote:
            "Official case study image found in public/ovi-media/cases/emvarias/. CASE-001-IMG-01.json references this asset.",
        },
      ],
    },
  ],

  // ─── Brand Assets ────────────────────────────────────────────────────────────
  // Source: public/brand/ovi-logo.svg
  brandAssets: [
    {
      id: "ovi-logo-svg",
      title: "OVI Logo (SVG)",
      path: "/brand/ovi-logo.svg",
      type: "logo",
      publicationStatus: "published",
      verificationStatus: "source_confirmed",
      sources: [
        {
          sourceType: "repository_document",
          sourceFile: "public/brand/ovi-logo.svg",
          sourceSection: null,
          verificationStatus: "source_confirmed",
          internalNote: null,
        },
      ],
    },
  ],

  // ─── Project References ──────────────────────────────────────────────────────
  projectReferences: [
    {
      id: "case-001",
      title: "Flota de transporte pesado",
      description:
        "Caso oficial de lavado de flota pesada con OVI Solwash, reducción de tiempo de ciclo y estandarización del consumo de agua.",
      caseStudyId: "CASE-001",
      imagePath: "/ovi-media/cases/emvarias/emvarias-fleet-wash.png",
      documentPath: "public/ovi-dam/metadata/CASE-001-IMG-01.json",
      publicationStatus: "published",
      verificationStatus: "source_confirmed",
      sources: [
        {
          sourceType: "repository_document",
          sourceFile: "docs/content/OVI_CONTENT_MASTER.md",
          sourceSection: "1. CASOS DE ÉXITO — CASE-001",
          verificationStatus: "source_confirmed",
          internalNote: null,
        },
        {
          sourceType: "repository_document",
          sourceFile: "public/ovi-dam/metadata/CASE-001-IMG-01.json",
          sourceSection: "title",
          verificationStatus: "source_confirmed",
          internalNote: null,
        },
      ],
    },
    {
      id: "case-002",
      title: "Planta industrial de manufactura",
      description:
        "Caso oficial de desengrase en maquinaria y líneas de producción con trazabilidad completa y cumplimiento HACCP.",
      caseStudyId: "CASE-002",
      publicationStatus: "published",
      verificationStatus: "source_confirmed",
      sources: [
        {
          sourceType: "repository_document",
          sourceFile: "docs/content/OVI_CONTENT_MASTER.md",
          sourceSection: "1. CASOS DE ÉXITO — CASE-002",
          verificationStatus: "source_confirmed",
          internalNote: null,
        },
        {
          sourceType: "repository_document",
          sourceFile: "src/knowledge/home/success-cases.ts",
          sourceSection: "caso-planta-industrial-manufactura",
          verificationStatus: "source_confirmed",
          internalNote: null,
        },
      ],
    },
    {
      id: "case-003",
      title: "Instalación institucional de alto tráfico",
      description:
        "Caso oficial de mantenimiento preventivo con OVI Ecoseal para reducir limpiezas correctivas y extender el ciclo de mantenimiento.",
      caseStudyId: "CASE-003",
      publicationStatus: "published",
      verificationStatus: "source_confirmed",
      sources: [
        {
          sourceType: "repository_document",
          sourceFile: "docs/content/OVI_CONTENT_MASTER.md",
          sourceSection: "1. CASOS DE ÉXITO — CASE-003",
          verificationStatus: "source_confirmed",
          internalNote: null,
        },
        {
          sourceType: "repository_document",
          sourceFile: "src/knowledge/home/success-cases.ts",
          sourceSection: "caso-instalacion-institucional",
          verificationStatus: "source_confirmed",
          internalNote: null,
        },
      ],
    },
  ],

  // ─── Commercial Positioning ──────────────────────────────────────────────────
  // Source: company/brand/brand-pillars.md, src/knowledge/home/engineering-pillars.ts
  commercialPositioning: {
    primaryStatement: "OVI — Ingeniería en Limpieza",
    targetAudience:
      "Supervisores de planta, gerentes de operaciones y responsables de calidad en transporte, industria, alimentos, institucional y energía.",
    valueProposition:
      "Ingeniería en Limpieza — OVI diseña soluciones impulsadas por ingeniería para resolver desafíos complejos de limpieza, higiene y mantenimiento.",
    competitiveAdvantages: [
      "Diagnóstico técnico antes de recomendar una solución",
      "Socio de largo plazo, no proveedor transaccional",
      "Tecnología integrada como habilitador operativo",
      "Sostenibilidad como criterio de ingeniería",
      "Transferencia de conocimiento técnico aplicado",
    ],
    publicationStatus: "published",
    verificationStatus: "source_confirmed",
    sources: [
      {
        sourceType: "brand_document",
        sourceFile: "company/brand/brand-pillars.md",
        sourceSection: "THE SIX PERMANENT PILLARS",
        verificationStatus: "source_confirmed",
        internalNote: null,
      },
      {
        sourceType: "repository_document",
        sourceFile: "src/knowledge/home/engineering-pillars.ts",
        sourceSection: "homeAbout.locales.es.body",
        verificationStatus: "source_confirmed",
        internalNote: null,
      },
    ],
  },

  // ─── FAQs ────────────────────────────────────────────────────────────────────
  // Pre-structured for future search and AI integration.
  // Only questions with verifiable official answers are populated.
  faqs: [
    {
      id: "faq-quienes-somos",
      question: "¿Quiénes son OVI?",
      answer:
        "OVI es una empresa de Ingeniería en Limpieza que diseña soluciones integrales para resolver desafíos de limpieza, mantenimiento e higiene industrial mediante diagnóstico técnico, protocolos especializados, servicios y tecnología aplicada.",
      answerStatus: "complete",
      publicationStatus: "published",
      verificationStatus: "source_confirmed",
      sources: [
        {
          sourceType: "site_config",
          sourceFile: "src/config/site.ts",
          sourceSection: "siteConfig.description",
          verificationStatus: "source_confirmed",
          internalNote: null,
        },
      ],
    },
    {
      id: "faq-que-significa-ingenieria-en-limpieza",
      question: "¿Qué significa 'Ingeniería en Limpieza'?",
      answer:
        "Ingeniería en Limpieza es el posicionamiento central de OVI. Significa que OVI no vende productos de limpieza genéricos, sino que aplica ingeniería para diagnosticar, diseñar y ejecutar soluciones específicas para cada desafío de higiene industrial.",
      answerStatus: "complete",
      publicationStatus: "published",
      verificationStatus: "source_confirmed",
      sources: [
        {
          sourceType: "brand_document",
          sourceFile: "company/brand/brand-pillars.md",
          sourceSection: "POSITIONING ANCHOR",
          verificationStatus: "source_confirmed",
          internalNote: null,
        },
      ],
    },
    {
      id: "faq-donde-opera",
      question: "¿Dónde opera OVI?",
      answer: "OVI resuelve desafíos de limpieza, mantenimiento e higiene en Colombia y la región.",
      answerStatus: "complete",
      publicationStatus: "published",
      verificationStatus: "source_confirmed",
      sources: [
        {
          sourceType: "repository_document",
          sourceFile: "src/knowledge/home/identity-metrics.ts",
          sourceSection: "metric-years-experience.seoDescription",
          verificationStatus: "source_confirmed",
          internalNote: null,
        },
      ],
    },
    {
      id: "faq-que-servicios-ofrece",
      question: "¿Qué servicios ofrece OVI?",
      answer:
        "OVI presta servicios de lavado de flota, limpieza industrial, diagnóstico técnico, capacitación operativa, diseño de protocolos por sector, mantenimiento preventivo de superficies y optimización hídrica.",
      answerStatus: "complete",
      publicationStatus: "published",
      verificationStatus: "source_confirmed",
      sources: [
        {
          sourceType: "repository_document",
          sourceFile: "src/knowledge/services/catalog.ts",
          sourceSection: "services",
          verificationStatus: "source_confirmed",
          internalNote: null,
        },
      ],
    },
    {
      id: "faq-por-que-elegir-ovi",
      question: "¿Por qué elegir OVI?",
      answer:
        "OVI se diferencia por aplicar diagnóstico técnico antes de recomendar soluciones, actuar como socio de largo plazo integrado a la operación, integrar tecnología como habilitador operativo, y tratar la sostenibilidad como criterio de ingeniería.",
      answerStatus: "complete",
      publicationStatus: "published",
      verificationStatus: "source_confirmed",
      sources: [
        {
          sourceType: "brand_document",
          sourceFile: "company/brand/brand-pillars.md",
          sourceSection: "THE SIX PERMANENT PILLARS",
          verificationStatus: "source_confirmed",
          internalNote: null,
        },
      ],
    },
    {
      id: "faq-que-hace-diferente-ovi",
      question: "¿Qué hace diferente a OVI?",
      answer:
        "OVI combina diagnóstico técnico, protocolos especializados, tecnología aplicada, sostenibilidad medible y una relación de socio de largo plazo en lugar de un servicio transaccional.",
      answerStatus: "complete",
      publicationStatus: "published",
      verificationStatus: "source_confirmed",
      sources: [
        {
          sourceType: "brand_document",
          sourceFile: "company/brand/brand-pillars.md",
          sourceSection: "THE SIX PERMANENT PILLARS",
          verificationStatus: "source_confirmed",
          internalNote: null,
        },
      ],
    },
    {
      id: "faq-que-industrias-atiende",
      question: "¿Qué industrias atiende OVI?",
      answer:
        "OVI atiende transporte, industria, hospitales, energía, institucional, retail y alimentos con protocolos y servicios especializados por sector.",
      answerStatus: "complete",
      publicationStatus: "published",
      verificationStatus: "source_confirmed",
      sources: [
        {
          sourceType: "repository_document",
          sourceFile: "src/knowledge/sectors/catalog.ts",
          sourceSection: "sectors",
          verificationStatus: "source_confirmed",
          internalNote: null,
        },
      ],
    },
    {
      id: "faq-certificaciones",
      question: "¿Qué certificaciones tiene OVI?",
      answerStatus: "missing",
      publicationStatus: "draft",
      verificationStatus: "unverified",
      sources: [],
    },
    {
      id: "faq-experiencia",
      question: "¿Qué experiencia tiene OVI?",
      answer:
        "OVI documenta más de 18 años de experiencia en operaciones reales, 3 casos oficiales activos y capacidad para atender flotas de más de 7,000 unidades por mes, además de experiencia en 7 sectores.",
      answerStatus: "complete",
      publicationStatus: "published",
      verificationStatus: "source_confirmed",
      sources: [
        {
          sourceType: "repository_document",
          sourceFile: "src/knowledge/home/identity-metrics.ts",
          sourceSection: "identityMetrics",
          verificationStatus: "source_confirmed",
          internalNote: null,
        },
        {
          sourceType: "repository_document",
          sourceFile: "docs/content/OVI_CONTENT_MASTER.md",
          sourceSection: "1. CASOS DE ÉXITO",
          verificationStatus: "source_confirmed",
          internalNote: null,
        },
      ],
    },
    {
      id: "faq-que-productos-ofrece",
      question: "¿Qué productos químicos tiene OVI?",
      answer:
        "OVI tiene 56 productos químicos distribuidos en 7 líneas: industrial (17 productos), alimentos (16), institucional (11), lavandería (6), cuidado personal (4), biotecnología (2) y hotelería (pendiente). Las líneas clave son desengrasantes biodegradables, selladores de pisos, detergentes para flota, desinfectantes y productos de biotecnología.",
      answerStatus: "complete",
      publicationStatus: "published",
      verificationStatus: "source_confirmed",
      sources: [
        {
          sourceType: "repository_document",
          sourceFile: "src/features/products/chemical-lines-data.ts",
          sourceSection: "OVI_SECTORS / TOTAL_PRODUCTS",
          verificationStatus: "source_confirmed",
          internalNote: "56 official products confirmed from product catalog.",
        },
        {
          sourceType: "repository_document",
          sourceFile: "docs/content/OVI_CONTENT_MASTER.md",
          sourceSection: "2. PRODUCTOS",
          verificationStatus: "source_confirmed",
          internalNote: null,
        },
      ],
    },
    {
      id: "faq-sostenibilidad",
      question: "¿Cómo incorpora OVI la sostenibilidad?",
      answer:
        "OVI trata la sostenibilidad como criterio de ingeniería: diseña soluciones para reducir consumo de agua, químicos y residuos de proceso. Sus formulaciones son biodegradables y sus protocolos están diseñados para minimizar el impacto ambiental sin sacrificar eficiencia operativa.",
      answerStatus: "complete",
      publicationStatus: "published",
      verificationStatus: "source_confirmed",
      sources: [
        {
          sourceType: "brand_document",
          sourceFile: "company/brand/brand-pillars.md",
          sourceSection: "4. Sustainability",
          verificationStatus: "source_confirmed",
          internalNote: null,
        },
        {
          sourceType: "repository_document",
          sourceFile: "src/knowledge/sectors/catalog.ts",
          sourceSection: "sector transporte — desafios",
          verificationStatus: "source_confirmed",
          internalNote:
            "Official sector challenges describe water reduction and process efficiency.",
        },
      ],
    },
    {
      id: "faq-metodologia",
      question: "¿Cuál es la metodología de trabajo de OVI?",
      answer:
        "La metodología OVI parte de diagnóstico técnico, luego diseña protocolos específicos por contaminante y sector, ejecuta con personal especializado y cierra con evidencia, KPIs y acompañamiento continuo. No recomienda soluciones sin diagnóstico previo.",
      answerStatus: "complete",
      publicationStatus: "published",
      verificationStatus: "source_confirmed",
      sources: [
        {
          sourceType: "brand_document",
          sourceFile: "company/brand/brand-pillars.md",
          sourceSection: "1. Ingeniería en Limpieza — Implica",
          verificationStatus: "source_confirmed",
          internalNote: null,
        },
        {
          sourceType: "repository_document",
          sourceFile: "src/knowledge/services/catalog.ts",
          sourceSection: "diagnostico-tecnico / diseno-protocolo / implementacion-protocolo",
          verificationStatus: "source_confirmed",
          internalNote: "Official service sequence confirms methodology.",
        },
      ],
    },
  ],

  // ─── Global Sources ──────────────────────────────────────────────────────────
  sources: [
    {
      sourceType: "repository_document",
      sourceFile: "company/MASTER_INDEX.md",
      sourceSection: null,
      verificationStatus: "source_confirmed",
      internalNote: "Primary knowledge navigation index for OVI Experience Platform.",
    },
    {
      sourceType: "repository_document",
      sourceFile: "company/CONTENT_RULES.md",
      sourceSection: null,
      verificationStatus: "source_confirmed",
      internalNote: "Governance rules that control all content in this domain.",
    },
    {
      sourceType: "brand_document",
      sourceFile: "company/brand/brand-pillars.md",
      sourceSection: null,
      verificationStatus: "source_confirmed",
      internalNote: "The Six Permanent Brand Pillars — approved as base for implementation.",
    },
    {
      sourceType: "site_config",
      sourceFile: "src/config/site.ts",
      sourceSection: null,
      verificationStatus: "source_confirmed",
      internalNote: "Canonical site configuration — authoritative for identity, contact, and nav.",
    },
    {
      sourceType: "repository_document",
      sourceFile: "company/PROJECT_VISION.md",
      sourceSection: null,
      verificationStatus: "source_confirmed",
      internalNote:
        "OVI Experience Platform vision — authoritative for business unit descriptions.",
    },
    {
      sourceType: "repository_document",
      sourceFile: "src/knowledge/home/identity-metrics.ts",
      sourceSection: null,
      verificationStatus: "source_confirmed",
      internalNote:
        "Official website content used for years of experience, geographic scope, and sector count.",
    },
    {
      sourceType: "repository_document",
      sourceFile: "src/knowledge/home/success-cases.ts",
      sourceSection: null,
      verificationStatus: "source_confirmed",
      internalNote:
        "Official website content used for structured experience and project references.",
    },
    {
      sourceType: "repository_document",
      sourceFile: "src/knowledge/services/catalog.ts",
      sourceSection: null,
      verificationStatus: "source_confirmed",
      internalNote: "Official service knowledge source used for service references.",
    },
    {
      sourceType: "repository_document",
      sourceFile: "src/knowledge/sectors/catalog.ts",
      sourceSection: null,
      verificationStatus: "source_confirmed",
      internalNote: "Official industry knowledge source used for industry references.",
    },
    {
      sourceType: "repository_document",
      sourceFile: "src/features/products/chemical-lines-data.ts",
      sourceSection: null,
      verificationStatus: "source_confirmed",
      internalNote:
        "WO-004: Official product catalog — authoritative for 56 products across 7 sectors.",
    },
    {
      sourceType: "brand_document",
      sourceFile: "company/brand/tone-of-voice.md",
      sourceSection: null,
      verificationStatus: "source_confirmed",
      internalNote: "WO-004: Official tone of voice — governs communication style and AI language.",
    },
  ],
};
