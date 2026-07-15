# OVI Knowledge Base

**FASE 1 · Work Order 002**

> La OVI Knowledge Base no es un módulo del sitio web. Es el cerebro de todo el ecosistema OVI.

---

## Resumen

La OVI Knowledge Base es la única fuente de verdad para toda la información técnica y comercial de OVI — Ingeniería en Limpieza. Todo módulo de la plataforma debe leer datos desde aquí.

**Queda prohibido escribir manualmente nombres de productos, servicios o protocolos dentro de componentes React.**

---

## Ubicación

```
src/knowledge/
```

---

## Arquitectura

```
src/knowledge/
├── index.ts              ← Barrel principal de exportaciones
├── README.md             ← Este documento
│
├── types/
│   └── index.ts          ← Interfaces legacy + compatibilidad
│
├── shared/
│   ├── index.ts          ← Exportaciones comunes Work Order 002
│   ├── models.ts         ← Modelos oficiales de datos
│   └── relations.ts      ← Utilidades relacionales (deduplicación)
│
├── products/
│   ├── index.ts          ← Exportaciones + query helpers
│   ├── catalog.ts        ← Catálogo legacy/base
│   └── official-catalog.ts ← Modelo oficial normalizado (WO-002)
│
├── services/
│   ├── index.ts
│   ├── catalog.ts
│   └── official-catalog.ts ← Modelo oficial normalizado (WO-002)
│
├── sectors/
│   ├── index.ts
│   ├── catalog.ts
│   └── official-catalog.ts ← Catálogo oficial WO-002
│
├── industries/
│   ├── index.ts          ← Alias de sectors (compatibilidad)
│   └── catalog.ts        ← Alias de catálogo oficial
│
├── protocols/
│   ├── index.ts
│   ├── catalog.ts
│   └── official-catalog.ts ← Modelo oficial normalizado (WO-002)
│
├── equipment/
│   ├── index.ts
│   └── catalog.ts        ← Registro de equipos OVI
│
├── contamination/
│   ├── index.ts
│   └── catalog.ts        ← Catálogo legacy/base
│
├── contaminants/
│   ├── index.ts
│   └── catalog.ts        ← Catálogo oficial de tipos de suciedad (WO-002)
│
├── surfaces/
│   ├── index.ts
│   ├── catalog.ts
│   └── official-catalog.ts ← Catálogo oficial WO-002
│
├── media/
│   └── index.ts          ← Registro de medios (imágenes, videos, docs)
│
├── documents/
│   └── index.ts          ← Registro de documentos técnicos
│
└── queries/
    └── index.ts          ← Funciones de consulta relacional
```

---

## Uso

```ts
// Importar desde el barrel principal
import {
  products,
  getProduct,
  getProductsBySector,
  resolveSolution,
  getSectorOverview,
} from "@knowledge";
```

---

## Modelos de Datos Oficiales (Work Order 002)

### `OviKnowledgeProduct`

| Campo                     | Tipo                 | Descripción                                            |
| ------------------------- | -------------------- | ------------------------------------------------------ |
| `id`                      | `string`             | Slug único (ej: `ovi-bioclean-pro`)                    |
| `nombre`                  | `string`             | Nombre oficial del producto                            |
| `categoria`               | `string`             | Categoría del producto                                 |
| `descripcion`             | `string`             | Descripción completa                                   |
| `beneficios`              | `string[]`           | Beneficios clave                                       |
| `aplicaciones`            | `string[]`           | Casos de uso                                           |
| `sectores`                | `string[]`           | IDs de sectores objetivo                               |
| `tipo_de_suciedad`        | `string[]`           | IDs de tipos de suciedad que combate                   |
| `superficies`             | `string[]`           | IDs de superficies compatibles                         |
| `dilucion`                | `string`             | Instrucción de dilución                                |
| `modo_de_uso`             | `string`             | Modo de aplicación                                     |
| `tiempo_de_accion`        | `string`             | Tiempo de contacto recomendado                         |
| `equipos_recomendados`    | `string[]`           | IDs de equipos compatibles                             |
| `servicios_relacionados`  | `string[]`           | IDs de servicios relacionados                          |
| `protocolos_relacionados` | `string[]`           | IDs de protocolos relacionados                         |
| `impacto_ambiental`       | `string[]`           | Beneficios ambientales                                 |
| `compatibilidades`        | `string[]`           | Compatibilidades documentadas                          |
| `incompatibilidades`      | `string[]`           | Incompatibilidades documentadas                        |
| `ficha_tecnica`           | `string \| null`     | ID o URL de ficha técnica                              |
| `msds`                    | `string \| null`     | ID o URL de MSDS                                       |
| `imagenes`                | `string[]`           | IDs de media                                           |
| `estado`                  | `OviKnowledgeStatus` | `activo` \| `en-revision` \| `pendiente` \| `inactivo` |

### `OviKnowledgeService`

| Campo                    | Tipo                 | Descripción                   |
| ------------------------ | -------------------- | ----------------------------- |
| `id`                     | `string`             | Slug único                    |
| `nombre`                 | `string`             | Nombre del servicio           |
| `problema_que_resuelve`  | `string[]`           | Problemas que resuelve        |
| `sectores`               | `string[]`           | IDs de sectores objetivo      |
| `productos_relacionados` | `string[]`           | IDs de productos relacionados |
| `equipos`                | `string[]`           | IDs de equipos                |
| `protocolos`             | `string[]`           | IDs de protocolos             |
| `beneficios`             | `string[]`           | Beneficios para el cliente    |
| `galeria`                | `string[]`           | IDs de media de galería       |
| `estado`                 | `OviKnowledgeStatus` | Estado del servicio           |

### `OviKnowledgeProtocol`

| Campo                 | Tipo                 | Descripción               |
| --------------------- | -------------------- | ------------------------- |
| `objetivo`            | `string`             | Objetivo del protocolo    |
| `preparacion`         | `string[]`           | Pasos de preparación      |
| `equipos`             | `string[]`           | IDs de equipos            |
| `productos`           | `string[]`           | IDs de productos          |
| `diluciones`          | `string[]`           | Instrucciones de dilución |
| `frecuencia`          | `string`             | Frecuencia recomendada    |
| `tiempo`              | `string`             | Tiempo estimado           |
| `normas_de_seguridad` | `string[]`           | Normas de seguridad       |
| `buenas_practicas`    | `string[]`           | Buenas prácticas          |
| `estado`              | `OviKnowledgeStatus` | Estado del protocolo      |

### `OviProtocol`

| Campo                    | Tipo       | Descripción                  |
| ------------------------ | ---------- | ---------------------------- |
| `id`                     | `string`   | Slug único                   |
| `codigo`                 | `string`   | Código oficial (ej: `P-001`) |
| `sectores`               | `string[]` | Sectores aplicables          |
| `productosRequeridos`    | `string[]` | Productos necesarios         |
| `tiposSuciedad`          | `string[]` | Suciedad que combate         |
| `superficiesCompatibles` | `string[]` | Superficies compatibles      |

---

## Relaciones

La base de conocimiento implementa el siguiente grafo de relaciones:

```
Producto
  ↓ tiposSuciedad → OviContaminationType
  ↓ superficiesCompatibles → OviSurface
  ↓ industrias → OviSector
  ↓ serviciosRelacionados → OviService
  ↓ equipoRecomendado → OviEquipment
  ↓ productosRelacionados → OviProduct[]

Protocolo
  ↓ productosRequeridos → OviProduct[]
  ↓ sectores → OviSector[]
  ↓ tiposSuciedad → OviContaminationType[]
  ↓ superficiesCompatibles → OviSurface[]

Sector
  ↓ productosRelacionados → OviProduct[]
  ↓ serviciosRelacionados → OviService[]
  ↓ protocolosRelacionados → OviProtocol[]
```

---

## Funciones de Consulta Relacional (`@knowledge/queries`)

| Función                                                        | Descripción                                                                   |
| -------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| `resolveSolution({ contaminationId?, surfaceId?, sectorId? })` | Resuelve una solución completa (productos + servicios + protocolos + equipos) |
| `getSectorOverview(sectorId)`                                  | Retorna el panorama completo de un sector                                     |
| `getProductContext(productId)`                                 | Retorna todas las entidades relacionadas a un producto                        |
| `getSolutionForContamination(id)`                              | Productos recomendados para un tipo de suciedad                               |
| `getSolutionForSurface(id)`                                    | Productos compatibles con una superficie                                      |

---

## Alias de Ruta

Acceder desde cualquier módulo de la plataforma:

```ts
import { products } from "@knowledge";
import { getProduct } from "@knowledge/products";
import { sectors } from "@knowledge/sectors";
```

---

## Estado de Datos

| Módulo            | Registros | Estado                                       |
| ----------------- | --------- | -------------------------------------------- |
| Productos         | 10        | Catálogo oficial WO-002 normalizado          |
| Servicios         | 10        | 10 activos                                   |
| Sectores          | 8         | Incluye `infraestructura` en revisión        |
| Tipos de suciedad | 12        | Catálogo `contaminants/` oficial             |
| Superficies       | 9         | Catálogo oficial WO-002                      |
| Protocolos        | 13        | Normalizados con estructura operativa WO-002 |
| Equipos           | 7         | 7 activos                                    |
| Media             | 0         | Pendiente fotografía oficial                 |
| Documentos        | 0         | Pendiente fichas técnicas y MSDS             |

---

## Regla Absoluta

Esta base de conocimiento sigue las siguientes reglas sin excepción:

1. **Nunca inventar información.** Solo datos validados por OVI.
2. **Nunca duplicar datos.** Si un componente necesita un nombre de producto, lo obtiene de aquí.
3. **Status `en-revision`** indica datos presentes en la plataforma que aún no han sido validados por documentación oficial.
4. **Status `pendiente`** indica una entidad referenciada que aún no tiene ficha completa.

---

## Integración Futura

Esta estructura está preparada para alimentar:

- **OVI AI** — Consulta el grafo de relaciones para generar diagnósticos y recomendaciones
- **OVI Lab** — Reemplaza datos simulados por datos oficiales
- **OVI Store** — La tienda consume `products` como catálogo
- **OVI OS** — Administración y trazabilidad operacional
- **Aplicación móvil** — Referencia directa a esta estructura
- **CRM** — Historial de soluciones por cliente
- **Agentes IA** — Contexto completo disponible por producto/sector/protocolo
- **WhatsApp** — Bot consulta esta estructura para recomendaciones
- **API pública** — Exposición externa de datos estructurados

---

## Fase 2 (Pendiente Aprobación)

- Migrar componentes existentes para consumir datos desde `@knowledge`
- Cargar fichas técnicas y MSDS oficiales en `documents/`
- Cargar fotografías oficiales en `media/`
- Completar pasos detallados de protocolos
- Validar productos `en-revision` con documentación oficial
