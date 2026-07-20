# OKP-001 — COMPANY KNOWLEDGE (OVI DNA)

**Programa:** OVI Knowledge Program  
**Prioridad:** MÁXIMA  
**Tipo:** FOUNDATIONAL KNOWLEDGE  
**Implementación:** ADITIVA  
**Idioma:** Español  
**Versión de schema:** 1.0.0

---

## 1. Resumen Ejecutivo

OKP-001 consolida el dominio **Company Knowledge** como la fuente corporativa oficial de OVI dentro del repositorio.

El objetivo sigue siendo el mismo:

- no rediseñar interfaces,
- no crear nuevas páginas,
- no inventar contenido,
- y exponer únicamente información respaldada por evidencia oficial del repositorio.

En esta actualización se enriqueció el perfil corporativo con misión, visión, historia, experiencia estructurada, referencias de industrias, referencias de servicios, tecnología aplicada, cifras corporativas textuales, referencias de proyectos y respuestas más naturales para búsqueda e IA.

---

## 2. Fuentes oficiales auditadas

### Fuentes corporativas principales

- `src/config/site.ts`
- `src/app/about/page.tsx`
- `company/brand/brand-pillars.md`
- `company/brand/brand-promise.md`
- `company/brand/tone-of-voice.md`
- `company/PROJECT_VISION.md`
- `company/CONTENT_RULES.md`
- `company/MASTER_INDEX.md`

### Fuentes de website content / knowledge content

- `src/knowledge/home/engineering-pillars.ts`
- `src/knowledge/home/identity-metrics.ts`
- `src/knowledge/home/success-cases.ts`
- `src/knowledge/services/catalog.ts`
- `src/knowledge/sectors/catalog.ts`
- `src/app/missions/page.tsx`

### Fuentes DAM / casos / activos

- `docs/content/OVI_CONTENT_MASTER.md`
- `public/ovi-dam/metadata/CASE-001-IMG-01.json`
- `public/ovi-media/cases/emvarias/emvarias-fleet-wash.png`
- `public/brand/ovi-logo.svg`

---

## 3. Auditoría del repositorio

### Información oficial encontrada ✓

| Campo                                                   | Fuente(s)                                                                            | Estado             |
| ------------------------------------------------------- | ------------------------------------------------------------------------------------ | ------------------ |
| Identidad corporativa                                   | `src/config/site.ts`                                                                 | `source_confirmed` |
| Misión                                                  | `src/app/about/page.tsx`                                                             | `source_confirmed` |
| Visión                                                  | `src/app/about/page.tsx`                                                             | `source_confirmed` |
| Historia narrativa                                      | `src/knowledge/home/engineering-pillars.ts`                                          | `source_confirmed` |
| Timeline soportado                                      | `public/ovi-dam/metadata/CASE-001-IMG-01.json`, `docs/content/OVI_CONTENT_MASTER.md` | `source_confirmed` |
| Valores / pilares                                       | `company/brand/brand-pillars.md`                                                     | `source_confirmed` |
| Tono y cultura de comunicación                          | `company/brand/tone-of-voice.md`                                                     | `source_confirmed` |
| Experiencia (+18 años, +7,000 unidades/mes, 7 sectores) | `src/knowledge/home/identity-metrics.ts`                                             | `source_confirmed` |
| Casos oficiales                                         | `src/knowledge/home/success-cases.ts`, `docs/content/OVI_CONTENT_MASTER.md`          | `source_confirmed` |
| Servicios                                               | `src/knowledge/services/catalog.ts`                                                  | `source_confirmed` |
| Industrias                                              | `src/knowledge/sectors/catalog.ts`                                                   | `source_confirmed` |
| Tecnología aplicada                                     | `company/brand/brand-pillars.md`, `company/PROJECT_VISION.md`                        | `source_confirmed` |
| Cobertura textual                                       | `src/knowledge/home/identity-metrics.ts`                                             | `source_confirmed` |
| Activos de marca                                        | `public/brand/ovi-logo.svg`                                                          | `source_confirmed` |

### Información aún no encontrada / no publicable

| Campo                                                               | Estado                           |
| ------------------------------------------------------------------- | -------------------------------- |
| Año de fundación exacto                                             | No documentado oficialmente      |
| Fundadores                                                          | No documentado oficialmente      |
| Historia legal detallada                                            | No documentada oficialmente      |
| Certificaciones corporativas                                        | No documentadas oficialmente     |
| Cobertura por países específicos más allá de “Colombia y la región” | No documentada oficialmente      |
| Cifras exactas de clientes / equipo / portafolio corporativo        | No documentadas oficialmente     |
| Testimonios oficiales                                               | No encontrados en el repositorio |
| Alianzas estratégicas                                               | No documentadas oficialmente     |
| Gobernanza corporativa                                              | No documentada oficialmente      |

---

## 4. Arquitectura vigente

```text
src/features/company-knowledge/
├── __tests__/
│   └── company-knowledge.test.ts
├── data/
│   └── company-knowledge-data.ts
├── repositories/
│   └── company-knowledge.repository.ts
├── services/
│   ├── company-knowledge-resolver.ts
│   └── company-knowledge-validator.ts
├── types/
│   ├── company-profile.ts
│   ├── knowledge-governance.ts
│   └── source-reference.ts
└── index.ts
```

Se reutilizó la arquitectura existente y se mantuvieron:

- `CompanyProfile`
- `PublicCompanyProfile`
- `resolveCompanyProfile()`
- `resolveCompanyAIContext()`
- `resolveCompanySearchDocument()`

No se crearon modelos paralelos.

---

## 5. Campos enriquecidos

### Ya poblados con evidencia oficial

- `identity`
- `mission`
- `vision`
- `history.narrative`
- `history.timeline`
- `experience`
- `coreValues`
- `capabilities`
- `differentiators`
- `businessUnits`
- `serviceReferences`
- `industryReferences`
- `geographicCoverage.description`
- `corporateNumbers.otherFigures`
- `technologyStack`
- `clients`
- `brandAssets`
- `projectReferences`
- `commercialPositioning`
- `faqs`
- `sources`

### Nuevos bloques aditivos incorporados al modelo

- `experience`
- `projectReferences`
- `history.timeline.date`
- `history.timeline.sourceReference`
- `capabilities[].evidence`
- `differentiators[].evidence`

---

## 6. Experience section estructurada

Se creó una sección `experience` con soporte para:

- **Years:** `Más de 18 años`
- **Projects:** 3 referencias oficiales (`CASE-001`, `CASE-002`, `CASE-003`)
- **Industries:** 7 industrias referenciadas
- **Capabilities:** diagnóstico técnico, diseño operativo, protocolos especializados, tecnología aplicada, implementación en campo
- **Evidence:** lista resumida de pruebas corporativas
- **Status:** `partial`

---

## 7. Timeline corporativo

Solo se publicó un evento con soporte documental explícito:

| Fecha        | Evento                                                       | Fuente                                         |
| ------------ | ------------------------------------------------------------ | ---------------------------------------------- |
| `2026-07-15` | Caso de lavado de flota pesada documentado en el DAM oficial | `public/ovi-dam/metadata/CASE-001-IMG-01.json` |

No se agregaron hitos fundacionales ni fechas históricas no verificadas.

---

## 8. Project references

Se publicaron referencias oficiales a proyectos/casos únicamente donde existía soporte en el repositorio:

- `CASE-001` — Flota de transporte pesado
- `CASE-002` — Planta industrial de manufactura
- `CASE-003` — Instalación institucional de alto tráfico

No se publicaron testimonios porque no existen testimonios oficiales auditables en el repositorio.

---

## 9. Búsqueda corporativa

`resolveCompanySearchDocument()` ahora incluye:

- `purposeText`
- `historyText`
- `experienceText`
- `capabilityNames`
- `technologyHighlights`
- `projectReferenceTitles`
- `projectReferenceDescriptions`
- `answerSnippets`

Con esto la búsqueda puede responder de forma más natural:

- ¿Quién es OVI?
- ¿Por qué elegir OVI?
- ¿Qué hace diferente a OVI?
- ¿Qué experiencia tiene?
- ¿Qué industrias atiende?
- ¿Qué servicios presta?

---

## 10. Contexto para IA

`resolveCompanyAIContext()` ahora entrega contexto estructurado adicional:

- `history`
- `capabilityNames`
- `technologyHighlights`
- `projectReferenceTitles`
- `experienceSummary`
- `searchAnswers.whatMakesOviDifferent`

La IA sigue consumiendo únicamente datos resueltos y publicados; no se expusieron notas internas ni información no publicada.

---

## 11. Validaciones implementadas

`validateCompanyProfile()` ahora detecta además:

- referencias rotas a servicios,
- referencias rotas a industrias,
- IDs duplicados en proyectos de experiencia,
- IDs duplicados en `projectReferences`,
- eventos de timeline publicados sin `date`,
- eventos de timeline publicados sin `sourceReference`,
- secciones publicadas sin `sources`,
- diferenciadores/capacidades sin evidencia textual explícita.

---

## 12. Tests

La suite cubre ahora:

1. Identidad corporativa oficial
2. Misión publicada
3. Visión publicada
4. Historia publicada
5. Timeline con evidencia
6. Experience section estructurada
7. Core values
8. Referencias de servicios
9. Referencias de industrias
10. Capacidades y diferenciadores con evidencia
11. Resolver público
12. AI context enriquecido
13. Search document enriquecido
14. FAQs publicadas
15. Validación de referencias rotas
16. Validación de timeline inválido
17. Validación de IDs duplicados

---

## 13. Información todavía faltante

Sigue pendiente documentación oficial para:

- año de fundación exacto,
- fundadores,
- historia corporativa detallada,
- certificaciones,
- países específicos de operación,
- cifras exactas de clientes/equipo,
- testimonios,
- alianzas estratégicas,
- gobernanza corporativa.

---

## 14. Recomendaciones

1. Documentar misión y visión también en `company/MASTER_INDEX.md` para alinear la navegación documental con el website content ya publicado.
2. Incorporar certificados oficiales si existen para habilitar `certifications`.
3. Publicar cobertura geográfica por país/ciudad solo cuando exista documento oficial.
4. Crear fichas formales para los tres casos activos en `docs/content/cases/`.
5. Si OVI quiere exponer cifras exactas, documentarlas primero en una fuente corporativa controlada.

---

## 15. Reglas de gobernanza

Este dominio sigue las reglas de `company/CONTENT_RULES.md`:

1. Nunca inventar información.
2. Solo usar documentación oficial OVI.
3. Información faltante permanece ausente.
4. Español como idioma maestro.
5. Cero lorem ipsum.
6. Toda afirmación debe ser trazable.

---

_Documento actualizado para Work Order 002. No introducir contenido no verificado._
