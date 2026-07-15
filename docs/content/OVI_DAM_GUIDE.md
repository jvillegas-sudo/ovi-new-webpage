# OVI DAM GUIDE

## Foundation Order 003 — OVI Digital Asset Extraction

> Este documento define el flujo oficial para extracción, optimización y organización de activos digitales OVI sin modificar experiencias visuales del producto.

---

## 1) Alcance y restricciones

- No modifica Home, Three.js, GSAP, OVI Experience, OVI Lab, OVI Store, OVI AI.
- No modifica componentes React, navegación, escenas 3D ni animaciones.
- Solo organiza y prepara activos en `/public/ovi-dam`.

---

## 2) Fuentes oficiales permitidas

Se aceptan exclusivamente recursos provenientes de:

- Sitio web oficial OVI
- Instagram oficial OVI
- Brochures oficiales
- Casos de éxito
- Catálogo de productos
- Fotografías oficiales
- Videos oficiales
- Logos
- Manual de marca
- Documentación técnica

Prohibido:

- Imágenes de stock
- Generación de imágenes con IA
- Contenido sin autorización

---

## 3) Estructura oficial DAM

```text
public/ovi-dam/
  images/
    cases/
    services/
    products/
    industries/
    team/
    logos/
    textures/
      agua/
      espuma/
      vapor/
      acero/
      concreto/
      vidrio/
      pintura/
      caucho/
      panel-solar/
      materiales-industriales/
  videos/
  documents/
  technical/
  brochures/
  thumbnails/
  metadata/
```

---

## 4) Convenciones de nombre

Ejemplos válidos:

- `CASE-001-IMG-01.jpg`
- `CASE-001-IMG-01.webp`
- `CASE-001-IMG-02.webp`
- `SERVICE-003-VIDEO-01.mp4`
- `PRODUCT-012-IMG-01.webp`

Regla: usar prefijo funcional (`CASE`, `SERVICE`, `PRODUCT`, etc.), ID correlativo y tipo (`IMG`, `VIDEO`).

---

## 5) Ingesta de nuevos recursos

1. Copiar archivos fuente a `content/ingest/<categoria>/`.
2. Crear sidecar JSON junto al archivo con el mismo nombre + `.json`.
   - Ejemplo: `content/ingest/cases/CASE-001-IMG-01.jpg`
   - Sidecar: `content/ingest/cases/CASE-001-IMG-01.jpg.json`
3. Completar todos los metadatos obligatorios.
4. Ejecutar:

```bash
npm run dam:build
```

---

## 6) Optimización automática (pipeline)

Script oficial: `scripts/ovi-dam/pipeline.mjs`

Para imágenes:

- Original
- WebP
- AVIF
- Mobile
- Retina
- Thumbnails (256, 512, 1024)
- Metadata JSON

Para videos:

- MP4 optimizado
- Poster
- Preview
- Metadata con duración y resolución

---

## 7) Validación automática

El pipeline elimina de procesamiento recursos:

- Duplicados (hash SHA-256)
- Corruptos (ffprobe/ffmpeg)
- Menores a calidad mínima
- Incompletos (metadata faltante)
- Con fuente no autorizada

Salida de control:

- `public/ovi-dam/dam-report.json`

---

## 8) Metadata obligatoria

Cada recurso debe contener:

- ID
- Nombre
- Título
- Descripción
- Categoría
- Sector
- Servicio
- Producto
- Cliente
- Caso
- Activo
- Idioma
- Prioridad
- Quality Score
- Commercial Score
- DNA OVI Score
- Fecha
- Fuente
- Copyright
- Estado

Plantilla oficial:

- `public/ovi-dam/metadata/ASSET-METADATA-TEMPLATE.json`

---

## 9) Reemplazo de recursos

1. Mantener el mismo ID del recurso existente.
2. Sustituir archivo en `content/ingest`.
3. Actualizar sidecar metadata si cambia contexto comercial/técnico.
4. Ejecutar `npm run dam:build`.
5. Validar `dam-report.json` y metadata final en `public/ovi-dam/metadata`.

---

## 10) Etiquetado semántico

Usar tags consistentes por:

- Sector
- Industria
- Servicio
- Producto
- Tipo de suciedad
- Resultado
- Material/superficie

Esto habilita búsqueda transversal y reutilización automática en la plataforma.
