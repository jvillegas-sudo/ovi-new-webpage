# OVI Knowledge Base

**FASE 1 · Foundation Order 001**

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
│   └── index.ts          ← Interfaces TypeScript de todos los modelos
│
├── products/
│   ├── index.ts          ← Exportaciones + query helpers
│   └── catalog.ts        ← Catálogo oficial de productos OVI
│
├── services/
│   ├── index.ts
│   └── catalog.ts        ← Catálogo oficial de servicios OVI
│
├── sectors/
│   ├── index.ts
│   └── catalog.ts        ← Catálogo de sectores (Transporte, Industria, ...)
│
├── industries/
│   └── index.ts          ← Alias de sectors (compatibilidad)
│
├── protocols/
│   ├── index.ts
│   └── catalog.ts        ← Registro de protocolos técnicos OVI
│
├── equipment/
│   ├── index.ts
│   └── catalog.ts        ← Registro de equipos OVI
│
├── contamination/
│   ├── index.ts
│   └── catalog.ts        ← Catálogo de tipos de suciedad
│
├── surfaces/
│   ├── index.ts
│   └── catalog.ts        ← Catálogo de superficies compatibles
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
} from '@knowledge';
```

---

## Modelos de Datos

### `OviProduct`

| Campo | Tipo | Descripción |
|---|---|---|
| `id` | `string` | Slug único (ej: `ovi-bioclean-pro`) |
| `nombre` | `string` | Nombre oficial del producto |
| `categoria` | `OviProductCategory` | `quimicos` \| `equipos` \| `accesorios` \| `herramientas` |
| `resumen` | `string` | Descripción corta |
| `descripcion` | `string` | Descripción completa |
| `beneficios` | `string[]` | Beneficios clave |
| `aplicaciones` | `string[]` | Casos de uso |
| `tiposSuciedad` | `string[]` | IDs de tipos de suciedad que combate |
| `superficiesCompatibles` | `string[]` | IDs de superficies compatibles |
| `industrias` | `string[]` | IDs de sectores objetivo |
| `dilucion` | `string` | Instrucción de dilución |
| `modoUso` | `string` | Modo de aplicación |
| `equipoRecomendado` | `string[]` | IDs de equipos compatibles |
| `serviciosRelacionados` | `string[]` | IDs de servicios relacionados |
| `impactoAmbiental` | `string[]` | Beneficios ambientales |
| `informacionSeguridad` | `string[]` | Advertencias de seguridad |
| `imagenes` | `string[]` | IDs de media |
| `recomendacionAI` | `string?` | Texto para OVI AI |
| `status` | `KbStatus` | `activo` \| `en-revision` \| `pendiente` \| `inactivo` |

### `OviService`

| Campo | Tipo | Descripción |
|---|---|---|
| `id` | `string` | Slug único |
| `nombre` | `string` | Nombre del servicio |
| `resumen` | `string` | Pitch de una línea |
| `sectores` | `string[]` | IDs de sectores objetivo |
| `beneficios` | `string[]` | Beneficios para el cliente |
| `problemasQueResuelve` | `string[]` | Problemas que resuelve |
| `equiposNecesarios` | `string[]` | IDs de equipos necesarios |
| `productosAsociados` | `string[]` | IDs de productos asociados |
| `protocolosAsociados` | `string[]` | IDs de protocolos asociados |
| `entregables` | `string[]` | Entregables del servicio |

### `OviSector`

| Campo | Tipo | Descripción |
|---|---|---|
| `id` | `string` | Slug (ej: `transporte`) |
| `nombre` | `string` | Nombre del sector |
| `desafios` | `string[]` | Desafíos operacionales típicos |
| `productosRelacionados` | `string[]` | IDs de productos |
| `serviciosRelacionados` | `string[]` | IDs de servicios |
| `protocolosRelacionados` | `string[]` | IDs de protocolos |

### `OviProtocol`

| Campo | Tipo | Descripción |
|---|---|---|
| `id` | `string` | Slug único |
| `codigo` | `string` | Código oficial (ej: `P-001`) |
| `sectores` | `string[]` | Sectores aplicables |
| `productosRequeridos` | `string[]` | Productos necesarios |
| `tiposSuciedad` | `string[]` | Suciedad que combate |
| `superficiesCompatibles` | `string[]` | Superficies compatibles |

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

| Función | Descripción |
|---|---|
| `resolveSolution({ contaminationId?, surfaceId?, sectorId? })` | Resuelve una solución completa (productos + servicios + protocolos + equipos) |
| `getSectorOverview(sectorId)` | Retorna el panorama completo de un sector |
| `getProductContext(productId)` | Retorna todas las entidades relacionadas a un producto |
| `getSolutionForContamination(id)` | Productos recomendados para un tipo de suciedad |
| `getSolutionForSurface(id)` | Productos compatibles con una superficie |

---

## Alias de Ruta

Acceder desde cualquier módulo de la plataforma:

```ts
import { products } from '@knowledge';
import { getProduct } from '@knowledge/products';
import { sectors } from '@knowledge/sectors';
```

---

## Estado de Datos

| Módulo | Registros | Estado |
|---|---|---|
| Productos | 10 | 4 activos, 6 en revisión |
| Servicios | 10 | 10 activos |
| Sectores | 7 | 7 activos |
| Tipos de suciedad | 12 | 12 activos |
| Superficies | 12 | 12 activos |
| Protocolos | 13 | 13 en revisión (pasos pendientes) |
| Equipos | 7 | 7 activos |
| Media | 0 | Pendiente fotografía oficial |
| Documentos | 0 | Pendiente fichas técnicas y MSDS |

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
