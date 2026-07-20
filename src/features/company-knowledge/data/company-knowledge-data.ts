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
 *   ✓ Brand Pillars:    company/brand/brand-pillars.md
 *   ✓ Brand Promise:    company/brand/brand-promise.md (draft, not published)
 *   ✓ Tone of Voice:    company/brand/tone-of-voice.md
 *   ✓ Client evidence:  public/ovi-media/cases/emvarias/emvarias-fleet-wash.png
 *   ✓ Brand Assets:     public/brand/ovi-logo.svg
 *
 * NOT FOUND IN REPOSITORY (marked missing):
 *   ✗ Mission:          company/MASTER_INDEX.md — "TODO: Insertar misión oficial"
 *   ✗ Vision:           company/MASTER_INDEX.md — "TODO: Insertar visión oficial"
 *   ✗ History:          company/MASTER_INDEX.md — "TODO: Insertar historia"
 *   ✗ Certifications:   company/MASTER_INDEX.md — pending
 *   ✗ Geographic coverage: not documented officially
 *   ✗ Corporate numbers:   not documented officially
 *   ✗ Services catalog:    company/services/README.md — pending
 *   ✗ Industries:          company/industries/README.md — pending
 *   ✗ Strategic alliances: not documented officially
 *   ✗ Corporate governance: not documented officially
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
  lastUpdated: "2026-07-20T00:00:00.000Z",

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
  // Source: company/MASTER_INDEX.md — "TODO: Insertar misión oficial aprobada por OVI."
  // FINDING: Mission has NOT been officially defined in the repository.
  // This section intentionally has no description — it must not be invented.
  mission: {
    publicationStatus: "draft",
    verificationStatus: "unverified",
    sources: [
      {
        sourceType: "repository_document",
        sourceFile: "company/MASTER_INDEX.md",
        sourceSection: "2. MISSION",
        verificationStatus: "unverified",
        internalNote:
          "MASTER_INDEX.md contains 'TODO: Insertar misión oficial aprobada por OVI.' — mission not yet defined.",
      },
    ],
  },

  // ─── Vision ─────────────────────────────────────────────────────────────────
  // Source: company/MASTER_INDEX.md — "TODO: Insertar visión oficial aprobada por OVI."
  // FINDING: Vision has NOT been officially defined in the repository.
  vision: {
    publicationStatus: "draft",
    verificationStatus: "unverified",
    sources: [
      {
        sourceType: "repository_document",
        sourceFile: "company/MASTER_INDEX.md",
        sourceSection: "3. VISION",
        verificationStatus: "unverified",
        internalNote:
          "MASTER_INDEX.md contains 'TODO: Insertar visión oficial aprobada por OVI.' — vision not yet defined.",
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
  // Source: company/MASTER_INDEX.md — "TODO: Insertar historia de la empresa"
  // FINDING: No official history found in repository.
  history: {
    publicationStatus: "draft",
    verificationStatus: "unverified",
    sources: [
      {
        sourceType: "repository_document",
        sourceFile: "company/MASTER_INDEX.md",
        sourceSection: "4. HISTORY",
        verificationStatus: "unverified",
        internalNote:
          "MASTER_INDEX.md contains 'TODO: Insertar historia de la empresa: fecha de fundación, fundadores, hitos clave, evolución del negocio.' — history not yet defined.",
      },
    ],
  },

  // ─── Differentiators ────────────────────────────────────────────────────────
  // Source: company/brand/brand-pillars.md — brand pillars as competitive differentiators
  differentiators: [
    {
      id: "ingenieria-diagnostico",
      title: "Diagnóstico técnico antes de recomendar una solución",
      description:
        "OVI aplica metodologías estructuradas y medibles. Diagnóstico técnico antes de recomendar, no ventas genéricas.",
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
  // Source: src/config/site.ts (footer/nav — official routes)
  // Full service definitions will live in the Service Knowledge domain.
  serviceReferences: [
    { serviceId: "soluciones-quimicas", label: "Soluciones Químicas" },
    { serviceId: "limpieza-industrial", label: "Limpieza Industrial" },
    { serviceId: "lavado-de-flota", label: "Lavado de Flota" },
    { serviceId: "impermeabilizacion", label: "Impermeabilización" },
    { serviceId: "post-obra", label: "Post Obra" },
    { serviceId: "limpieza-infraestructura", label: "Limpieza de Infraestructura" },
  ],

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

  // ─── Commercial Positioning ──────────────────────────────────────────────────
  // Source: company/brand/brand-pillars.md, company/MASTER_INDEX.md, company/PROJECT_VISION.md
  commercialPositioning: {
    primaryStatement: "OVI — Ingeniería en Limpieza",
    targetAudience:
      "Supervisores de planta, gerentes de operaciones y responsables de calidad en industria pesada, alimentaria, hotelería y transporte.",
    valueProposition:
      "Ingeniería en Limpieza — OVI diseña soluciones impulsadas por ingeniería para resolver desafíos complejos de limpieza, higiene y mantenimiento.",
    competitiveAdvantages: [
      "Diagnóstico técnico antes de recomendar una solución",
      "Socio de largo plazo, no proveedor transaccional",
      "Tecnología integrada como habilitador operativo",
      "Sostenibilidad como criterio de ingeniería",
      "Transferencia de conocimiento técnico aplicado",
    ],
    publicationStatus: "draft",
    verificationStatus: "source_confirmed",
    sources: [
      {
        sourceType: "brand_document",
        sourceFile: "company/brand/brand-pillars.md",
        sourceSection: "THE SIX PERMANENT PILLARS",
        verificationStatus: "source_confirmed",
        internalNote:
          "Derived from official brand pillars. Requires OVI approval before publishing.",
      },
      {
        sourceType: "repository_document",
        sourceFile: "company/MASTER_INDEX.md",
        sourceSection: "5. VALUE PROPOSITION",
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
      answerStatus: "missing",
      publicationStatus: "draft",
      verificationStatus: "unverified",
      sources: [],
    },
    {
      id: "faq-que-servicios-ofrece",
      question: "¿Qué servicios ofrece OVI?",
      answer:
        "OVI ofrece soluciones químicas, limpieza industrial, lavado de flota, impermeabilización, post obra y limpieza de infraestructura, entre otros servicios. El catálogo completo de servicios está en proceso de documentación oficial.",
      answerStatus: "partial",
      publicationStatus: "draft",
      verificationStatus: "source_confirmed",
      sources: [
        {
          sourceType: "site_config",
          sourceFile: "src/config/site.ts",
          sourceSection: "footer.groups — Soluciones",
          verificationStatus: "source_confirmed",
          internalNote:
            "Services listed in nav/footer — full catalog pending official documentation.",
        },
      ],
    },
    {
      id: "faq-por-que-elegir-ovi",
      question: "¿Por qué elegir OVI?",
      answer:
        "OVI se diferencia por aplicar diagnóstico técnico antes de recomendar soluciones, actuar como socio de largo plazo integrado a la operación, integrar tecnología como habilitador operativo, y tratar la sostenibilidad como criterio de ingeniería.",
      answerStatus: "partial",
      publicationStatus: "draft",
      verificationStatus: "source_confirmed",
      sources: [
        {
          sourceType: "brand_document",
          sourceFile: "company/brand/brand-pillars.md",
          sourceSection: "THE SIX PERMANENT PILLARS",
          verificationStatus: "source_confirmed",
          internalNote: "Derived from official pillars. Requires approval before publishing.",
        },
      ],
    },
    {
      id: "faq-que-industrias-atiende",
      question: "¿Qué industrias atiende OVI?",
      answerStatus: "missing",
      publicationStatus: "draft",
      verificationStatus: "unverified",
      sources: [],
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
      answerStatus: "missing",
      publicationStatus: "draft",
      verificationStatus: "unverified",
      sources: [],
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
  ],
};
