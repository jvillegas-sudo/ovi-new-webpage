# WORK ORDER 003 — OVI KNOWLEDGE SERVICES DOMAIN

## Arquitectura

Se implementó un dominio nuevo y 100% aditivo en:

`src/features/services-knowledge/`

Estructura:

- `types/` — modelo gobernado `ServiceKnowledge`, `PublicServiceView`, `ServiceAIContext`, `ServiceSearchDocument`.
- `data/services-knowledge-data.ts` — registro oficial de servicios reutilizando `src/knowledge/services/catalog.ts`.
- `repositories/services-knowledge.repository.ts` — consultas por ID, industria, producto, estado y conteo.
- `services/services-knowledge-resolver.ts` — resolución de vista pública, contexto AI y documentos de búsqueda.
- `services/services-knowledge-validator.ts` — validación de integridad, gobierno y relaciones.
- `__tests__/services-knowledge.test.ts` — validación funcional completa del dominio.

## Relaciones

El dominio usa identificadores estables y referencia (sin duplicar entidades) hacia:

- Productos (`@knowledge/products/official-catalog`)
- Industrias (`@knowledge/sectors/catalog`)
- Proyectos y clientes (`@features/company-knowledge`)
- Protocolos/equipos de ingeniería (`@knowledge/protocols/catalog`, `@knowledge/equipment/catalog`)
- Documentos (`@knowledge/documents`)
- Campos futuros (`futureTrainingIds`, `futureRegulatoryIds`)

Las relaciones se guardan en:

- campos directos (`products`, `industries`, `relatedProjects`, etc.)
- objeto normalizado `relationships` para integración interdominio.

## Resolver

Funciones principales:

- `resolvePublicService()`
- `resolvePublishedServicesPublicView()`
- `resolveServiceAIContext()`
- `resolveServiceSearchDocument()`
- `buildServiceSearchIndex()`

Regla de gobierno:

- Solo servicios `published` se exponen a vista pública, búsqueda y AI.
- Contenido `draft` no se publica.

## Validator

`validateServicesKnowledge()` detecta:

- IDs duplicados
- Fuentes faltantes
- Referencias rotas
- Servicio publicado sin evidencia
- Relaciones inválidas
- Estados de publicación inválidos

## Integración

El dominio se publica vía:

`src/features/services-knowledge/index.ts`

Esto habilita consumo desde:

- OVI AI (contexto estructurado por servicio)
- Solution Finder / búsquedas futuras (índice de servicios)
- OVI OS, CRM y ecommerce futuro (relaciones por IDs estables)

## Expansión futura

La estructura permite enriquecer sin romper compatibilidad:

- completar `purpose`, `technicalBenefits`, `differentiators`, `kpis`, `executionSteps`
- poblar `relatedProjects`, `relatedCustomers`, `relatedDocuments`
- activar `futureTrainingIds` y `futureRegulatoryIds` cuando existan dominios oficiales

No se inventó contenido nuevo: los datos poblados provienen de componentes ya aprobados del repositorio y los campos sin respaldo oficial permanecen vacíos.
