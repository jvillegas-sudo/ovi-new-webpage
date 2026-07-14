# products/

## Purpose

Contiene la descripción técnica y comercial de todos los productos OVI. Esta información alimenta las páginas de producto, el catálogo interactivo y las respuestas del asistente de IA.

## Expected Files

- `product_catalog.md` — Catálogo maestro con todos los productos, SKUs y categorías.
- `product_[nombre].md` — Ficha individual por producto: nombre, descripción, especificaciones técnicas, aplicaciones, sectores, imágenes de referencia.
- `comparison_matrix.md` — Tabla comparativa entre productos para uso en la plataforma y en el asistente IA.
- `pricing_guidelines.md` — Estructura de precios de referencia (si aplica y es público).

## How the Information Will Be Consumed

- Las páginas de producto del sitio leen las fichas de `product_[nombre].md`.
- El módulo de IA de OVI OS utiliza `product_catalog.md` y las fichas individuales como base de conocimiento para responder consultas de clientes.
- El catálogo interactivo renderiza tarjetas de producto a partir de datos estructurados en estos archivos.

## Dependencies

- `brand/` — Tono de voz y lineamientos visuales.
- `media/` — Imágenes y videos de producto.
- `industries/` — Mapeo de productos por sector industrial.

## Owner

TODO: Definir responsable de catálogo de productos OVI.

## Status

🔴 PENDIENTE — Esperando listado oficial de productos OVI.
