# OKP-001 — COMPANY KNOWLEDGE (OVI DNA)

**Programa:** OVI Knowledge Program  
**Prioridad:** MÁXIMA  
**Tipo:** FOUNDATIONAL KNOWLEDGE  
**Implementación:** ADITIVA  
**Idioma:** Español  
**Versión de schema:** 1.0.0

---

## 1. Resumen Ejecutivo

OKP-001 implementa el primer dominio de conocimiento empresarial del OVI Knowledge Engine: el **Company Knowledge Domain**.

Este Work Order establece el repositorio oficial de identidad corporativa de OVI como fuente autoritativa para todos los sistemas de la plataforma: website, OVI AI, OVI OS, CRM, Generador de Propuestas, Buscador de Soluciones, Product Experience Platform y futuros sistemas.

El objetivo **no es rediseñar el sitio web**. El objetivo es construir el repositorio oficial de conocimiento corporativo, gobernado, trazable y preparado para integración futura.

---

## 2. Auditoría del Repositorio

### Información oficial encontrada ✓

| Campo                    | Fuente                                                                             | Estado             |
| ------------------------ | ---------------------------------------------------------------------------------- | ------------------ |
| Nombre de marca          | `src/config/site.ts`                                                               | `source_confirmed` |
| Tagline                  | `src/config/site.ts`                                                               | `source_confirmed` |
| Descripción corporativa  | `src/config/site.ts`                                                               | `source_confirmed` |
| URL del sitio            | `src/config/site.ts`                                                               | `source_confirmed` |
| Email de contacto        | `src/config/site.ts`                                                               | `source_confirmed` |
| LinkedIn                 | `src/config/site.ts`                                                               | `source_confirmed` |
| Keywords SEO             | `src/config/site.ts`                                                               | `source_confirmed` |
| 6 Pilares de Marca       | `company/brand/brand-pillars.md`                                                   | `source_confirmed` |
| Brand Promise (draft)    | `company/brand/brand-promise.md`                                                   | `source_confirmed` |
| Tono de voz              | `company/brand/tone-of-voice.md`                                                   | `source_confirmed` |
| Unidades de negocio      | `company/PROJECT_VISION.md`, `src/config/site.ts`                                  | `source_confirmed` |
| Referencias de servicios | `src/config/site.ts`                                                               | `source_confirmed` |
| Cliente EMVARIAS         | `public/ovi-media/cases/emvarias/`, `public/ovi-dam/metadata/CASE-001-IMG-01.json` | `source_confirmed` |
| Logo OVI                 | `public/brand/ovi-logo.svg`                                                        | `source_confirmed` |

### Información no encontrada (pendiente oficial)

| Campo                  | Evidencia                                                                     |
| ---------------------- | ----------------------------------------------------------------------------- |
| Misión                 | `company/MASTER_INDEX.md` — "TODO: Insertar misión oficial aprobada por OVI." |
| Visión                 | `company/MASTER_INDEX.md` — "TODO: Insertar visión oficial aprobada por OVI." |
| Historia corporativa   | `company/MASTER_INDEX.md` — "TODO: Insertar historia de la empresa"           |
| Certificaciones        | `company/MASTER_INDEX.md` — PENDIENTE                                         |
| Cobertura geográfica   | No documentada oficialmente                                                   |
| Cifras corporativas    | No documentadas oficialmente                                                  |
| Catálogo de servicios  | `company/services/README.md` — PENDIENTE                                      |
| Industrias objetivo    | `company/industries/README.md` — PENDIENTE                                    |
| Alianzas estratégicas  | No documentadas oficialmente                                                  |
| Gobernanza corporativa | No documentada oficialmente                                                   |

---

## 3. Arquitectura del Dominio

```
src/features/company-knowledge/
├── __tests__/
│   └── company-knowledge.test.ts        # 20 test cases
├── data/
│   └── company-knowledge-data.ts        # Datos oficiales auditados
├── repositories/
│   └── company-knowledge.repository.ts  # Capa de acceso a datos
├── services/
│   ├── company-knowledge-resolver.ts    # Resolver público + AI + Search
│   └── company-knowledge-validator.ts   # Validador de integridad
├── types/
│   ├── company-profile.ts               # CompanyProfile y tipos derivados
│   ├── knowledge-governance.ts          # VerificationStatus, PublicationStatus
│   └── source-reference.ts             # SourceReference
└── index.ts                             # API pública del módulo
```

---

## 4. Modelo Corporativo (CompanyProfile)

El `CompanyProfile` es el tipo central del dominio. Todos los campos son opcionales. No se permite contenido inventado.

### Secciones del modelo

| Sección                 | Tipo                           | Descripción                                    |
| ----------------------- | ------------------------------ | ---------------------------------------------- |
| `identity`              | `CompanyIdentity`              | Nombre, tagline, descripción, contacto, social |
| `mission`               | `CompanyMission`               | Declaración de misión con versión y evidencia  |
| `vision`                | `CompanyVision`                | Declaración de visión con versión y evidencia  |
| `purpose`               | `CompanyPurpose`               | Propósito y brand promise                      |
| `coreValues`            | `CompanyCoreValue[]`           | Valores corporativos (pilares de marca)        |
| `history`               | `CompanyHistory`               | Historia y timeline corporativo                |
| `capabilities`          | `CompanyCapability[]`          | Capacidades operativas                         |
| `differentiators`       | `CompanyDifferentiator[]`      | Diferenciadores competitivos                   |
| `businessUnits`         | `CompanyBusinessUnit[]`        | Unidades de negocio                            |
| `serviceReferences`     | `CompanyServiceReference[]`    | Referencias a servicios (sin duplicar)         |
| `industryReferences`    | `CompanyIndustryReference[]`   | Referencias a industrias (sin duplicar)        |
| `geographicCoverage`    | `CompanyGeographicCoverage`    | Cobertura geográfica                           |
| `corporateNumbers`      | `CompanyCorporateNumbers`      | Cifras corporativas oficiales                  |
| `certifications`        | `CompanyCertification[]`       | Certificaciones activas                        |
| `technologyStack`       | `CompanyTechnologyStack`       | Stack tecnológico                              |
| `strategicAlliances`    | `CompanyStrategicAlliance[]`   | Alianzas estratégicas                          |
| `corporateDocuments`    | `CorporateDocument[]`          | Brochures, presentaciones, certificados        |
| `brandAssets`           | `CompanyBrandAsset[]`          | Logos, imágenes de marca                       |
| `commercialPositioning` | `CompanyCommercialPositioning` | Posicionamiento comercial                      |
| `clients`               | `CompanyClientReference[]`     | Referencias de clientes                        |
| `faqs`                  | `CompanyFAQEntry[]`            | Preguntas frecuentes                           |
| `governance`            | `CompanyCorporateGovernance`   | Gobernanza corporativa                         |
| `sources`               | `SourceReference[]`            | Fuentes globales del perfil                    |

### Gobernanza por campo (GovernedField)

Todo bloque de conocimiento extiende `GovernedField`:

```typescript
interface GovernedField {
  publicationStatus: PublicationStatus; // draft | pending_review | published | archived
  verificationStatus: VerificationStatus; // unverified | source_confirmed | technically_verified | rejected
  sources: SourceReference[];
}
```

---

## 5. Resolver

### resolveCompanyProfile()

Produce un `PublicCompanyProfile` seguro para uso externo:

- Elimina todos los campos internos: `sources`, `verificationStatus`, `publicationStatus` de secciones individuales.
- Solo incluye secciones con `publicationStatus === "published"`.
- Confidential clients are never exposed.

### resolveCompanyAIContext()

Produce un `CompanyAIContext` estructurado para OVI AI:

- La IA **nunca lee el JSON crudo directamente**.
- Consume este contexto estructurado.
- Solo incluye información verificada y publicada.
- Incluye respuestas a las 7 preguntas de búsqueda corporativa.

### resolveCompanySearchDocument()

Produce un `CompanySearchDocument` plano para indexación:

- Estructura preparada para full-text y keyword search.
- Responde: ¿Quién es OVI?, ¿Dónde opera?, ¿Qué servicios ofrece?, ¿Por qué elegir OVI?, ¿Qué industrias atiende?, ¿Qué certificaciones tiene?, ¿Qué experiencia tiene?

---

## 6. Validador

`validateCompanyProfile()` detecta:

| Tipo    | Campo                 | Condición                                     |
| ------- | --------------------- | --------------------------------------------- |
| WARNING | `mission`             | Misión no definida o sin descripción          |
| WARNING | `vision`              | Visión no definida o sin descripción          |
| WARNING | `history`             | Historia corporativa no definida              |
| WARNING | `geographicCoverage`  | Cobertura geográfica no definida              |
| WARNING | `certifications`      | Sin certificaciones registradas               |
| WARNING | `serviceReferences`   | Sin referencias a servicios                   |
| WARNING | `industryReferences`  | Sin referencias a industrias                  |
| ERROR   | `identity.brandName`  | Nombre de marca ausente                       |
| ERROR   | `identity.tagline`    | Tagline ausente                               |
| ERROR   | `*.sources`           | Sección publicada sin fuentes                 |
| ERROR   | `faqs[id].answer`     | FAQ publicada sin respuesta                   |
| ERROR   | `coreValues[id]`      | ID de valor duplicado                         |
| ERROR   | `differentiators[id]` | ID de diferenciador duplicado                 |
| ERROR   | `clients[id]`         | ID de cliente duplicado                       |
| ERROR   | `certifications[id]`  | ID de certificación duplicado                 |
| ERROR   | `faqs[id]`            | FAQ con answerStatus "complete" sin respuesta |

---

## 7. Integración con Search

El `CompanySearchDocument` permite que futuros motores de búsqueda respondan:

| Pregunta                        | Campo en SearchDocument                  |
| ------------------------------- | ---------------------------------------- |
| ¿Quién es OVI?                  | `brandName`, `description`, `faqAnswers` |
| ¿Dónde opera OVI?               | `coverageText`                           |
| ¿Qué servicios ofrece OVI?      | `serviceLabels`                          |
| ¿Por qué elegir OVI?            | `differentiatorTitles`                   |
| ¿Qué industrias atiende OVI?    | `industryLabels`                         |
| ¿Qué certificaciones tiene OVI? | `certificationNames`                     |
| ¿Qué experiencia tiene OVI?     | `faqAnswers`                             |

---

## 8. Integración con OVI AI

OVI AI consume `CompanyAIContext` a través de `resolveCompanyAIContext()`.

La IA **nunca lee el `CompanyProfile` directamente**.

```typescript
import { resolveCompanyAIContext } from "@features/company-knowledge";
const context = resolveCompanyAIContext();
// context.brandName, context.tagline, context.searchAnswers, etc.
```

El contexto incluye:

- Nombre y tagline de marca
- Descripción corta
- Misión y visión (cuando estén publicadas)
- Nombres de pilares de marca
- Etiquetas de industrias y servicios
- Respuestas a preguntas corporativas frecuentes

---

## 9. Tests

20 casos de prueba cubren:

1. Perfil existe y tiene estructura válida
2. Identidad oficial correcta
3. Valores corporativos de pilares de marca
4. Validador detecta misión faltante
5. Validador detecta visión faltante
6. Validador detecta historia faltante
7. Resolver elimina campos internos
8. Resolver excluye secciones no publicadas
9. Resolver incluye valores publicados
10. Fuentes de referencia en identidad
11. Sin contenido ficticio
12. Visibilidad de clientes
13. FAQs estructuradas para búsqueda y AI
14. Contexto AI correctamente resuelto
15. Documento de búsqueda correctamente resuelto
16. Validador sin errores en perfil oficial
17. Validador detecta IDs duplicados
18. Validador detecta FAQ publicada sin respuesta
19. Diferenciadores de pilares de marca
20. Estado de información del perfil

---

## 10. Integraciones Futuras

| Sistema         | Integración                                   | Estado    |
| --------------- | --------------------------------------------- | --------- |
| Website         | `resolveCompanyProfile()` → página /about     | Pendiente |
| OVI AI          | `resolveCompanyAIContext()` → system prompt   | Pendiente |
| OVI OS          | `getCompanyProfile()` → dashboard corporativo | Pendiente |
| CRM             | `PublicCompanyProfile` → contexto comercial   | Pendiente |
| Search Engine   | `resolveCompanySearchDocument()` → índice     | Pendiente |
| Knowledge Graph | `CompanyProfile.sources` → nodos del grafo    | Pendiente |

---

## 11. Reglas de Gobernanza

Este dominio sigue estrictamente las reglas de `company/CONTENT_RULES.md`:

1. **Nunca inventar información** — Solo fuentes oficiales del repositorio.
2. **Solo documentación oficial es válida** — No suposiciones ni datos de terceros.
3. **Información faltante = ausente** — Campos vacíos, nunca placeholders inventados.
4. **Español es el idioma maestro** — Todo contenido original en español.
5. **Cero Lorem Ipsum** — Ningún texto genérico en ningún entorno.
6. **Cada afirmación es verificable** — Toda información tiene `SourceReference`.

---

## 12. Información Corporativa Faltante

Las siguientes secciones requieren información oficial de OVI para ser completadas:

| Campo                  | Razón                                                        |
| ---------------------- | ------------------------------------------------------------ |
| `mission.description`  | No encontrada en repositorio — ver `company/MASTER_INDEX.md` |
| `vision.description`   | No encontrada en repositorio — ver `company/MASTER_INDEX.md` |
| `history.*`            | No documentada — ver `company/MASTER_INDEX.md`               |
| `geographicCoverage.*` | No documentada oficialmente                                  |
| `certifications[]`     | No documentadas — ver `company/MASTER_INDEX.md`              |
| `industryReferences[]` | Pendiente — ver `company/industries/README.md`               |
| `corporateNumbers.*`   | No documentadas oficialmente                                 |
| `strategicAlliances[]` | No documentadas oficialmente                                 |
| `governance.*`         | No documentada oficialmente                                  |

---

_Documento generado por OKP-001. No modificar sin un Work Order oficial._
