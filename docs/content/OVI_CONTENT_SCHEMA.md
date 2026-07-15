# OVI CONTENT SCHEMA

## Foundation Order 002 — OVI Content Intelligence

> **Estado:** Borrador — Pendiente de aprobación  
> **Objetivo:** Convertir la biblioteca de contenido en una biblioteca semántica reutilizable  
> **Alcance:** Metadatos, clasificación, scoring, relaciones y base de arquitectura de búsqueda  
> **No incluye:** Cambios en Home, Three.js, GSAP, OVI Experience, OVI Lab, OVI Store, OVI AI ni diseño

---

## 1) PRINCIPIOS DEL ESQUEMA

- Cada recurso (foto, video, brochure, documento) debe tener **un JSON asociado**.
- Un recurso puede pertenecer a múltiples categorías sin duplicar archivos.
- La clasificación es semántica y orientada a reutilización automática.
- El esquema soporta contenido en **Español (ES)** e **Inglés (EN)**.

---

## 2) ESTRUCTURA DE CARPETAS

```text
content/
  metadata/
    PHOTO-001.json
    ...
```

---

## 3) METADATOS OBLIGATORIOS

Cada recurso debe incluir obligatoriamente:

- ID
- Título
- Descripción
- Categoría
- Subcategoría
- Sector
- Industria
- Servicio
- Producto
- Activo
- Tipo de suciedad
- Resultado
- Cliente
- Ubicación
- Idioma
- Fecha
- Autor
- Fuente
- Estado
- Prioridad
- Nivel de calidad
- Uso permitido

---

## 4) SISTEMA DE TAGS

Campo libre para etiquetas semánticas.

Ejemplos:

- Camión recolector
- Lavado
- Flota
- Industria
- Grasa
- Desengrase
- OVI
- Ingeniería en Limpieza

---

## 5) SISTEMA DE PRIORIDAD

Valores permitidos:

- `ALTA`
- `MEDIA`
- `BAJA`

Regla de consumo: en selección automática, priorizar primero recursos de `ALTA` y mayor calidad.

---

## 6) CONTENT SCORE

Cada recurso incluye 5 criterios, cada uno de 1 a 5:

- Visual Quality
- Story Value
- Commercial Value
- Technical Value
- DNA OVI

Puntaje total:

`total = visualQuality + storyValue + commercialValue + technicalValue + dnaOvi`

Rango total: **5 a 25**.

---

## 7) RELACIONES SEMÁNTICAS

Cada recurso debe declarar:

- Productos relacionados
- Servicios relacionados
- Casos relacionados
- Sectores relacionados
- Documentos relacionados

Estas relaciones habilitan recomendación y recuperación cruzada automática.

---

## 8) ARQUITECTURA BASE PARA BUSCADOR

Este esquema deja preparada la indexación para consultas como:

- “Fotos de paneles solares”
- “Casos de transporte”
- “Productos usados en hospitales”
- “Videos de limpieza industrial”

Campos mínimos a indexar:

- `title.*`
- `description.*`
- `category`, `subcategory`
- `sector`, `industry`
- `services`, `products`
- `soilType`, `result`
- `tags[]`
- `relations.*`
- `priority`, `qualityLevel`, `contentScore.total`
- `language[]`

---

## 9) REGLAS DE NO DUPLICACIÓN

- El ID del recurso es único y canónico.
- Un mismo recurso puede mapear a múltiples categorías y sectores mediante arrays.
- Las asociaciones cruzadas se resuelven por relaciones (`relations`) y no por copias físicas.

---

## 10) CONTRATO DE DATOS (ESTRUCTURA REFERENCIAL)

```json
{
  "id": "PHOTO-001",
  "resourceType": "photo",
  "title": { "es": "string", "en": "string" },
  "description": { "es": "string", "en": "string" },
  "category": ["string"],
  "subcategory": ["string"],
  "sector": ["string"],
  "industry": ["string"],
  "services": ["string"],
  "products": ["string"],
  "asset": "string",
  "soilType": ["string"],
  "result": ["string"],
  "client": "string",
  "location": {
    "country": "string",
    "city": "string",
    "site": "string"
  },
  "language": ["es", "en"],
  "date": "YYYY-MM-DD",
  "author": "string",
  "source": "string",
  "status": "ACTIVO | EN-REVISION | PENDIENTE | ARCHIVADO",
  "priority": "ALTA | MEDIA | BAJA",
  "qualityLevel": "A | B | C",
  "usageAllowed": "INTERNAL | COMMERCIAL | RESTRICTED",
  "tags": ["string"],
  "contentScore": {
    "visualQuality": 1,
    "storyValue": 1,
    "commercialValue": 1,
    "technicalValue": 1,
    "dnaOvi": 1,
    "total": 5
  },
  "relations": {
    "relatedProducts": ["string"],
    "relatedServices": ["string"],
    "relatedCases": ["string"],
    "relatedSectors": ["string"],
    "relatedDocuments": ["string"]
  }
}
```

---

## 11) ENTREGABLES DE FOUNDATION ORDER 002

- `docs/content/OVI_CONTENT_SCHEMA.md`
- `content/metadata/PHOTO-001.json` (ejemplo de referencia)
- Sistema de metadatos obligatorios
- Sistema de puntuación (1–25)
- Sistema de relaciones
- Base documental para aprobación
