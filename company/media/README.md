# media/

## Purpose

Directorio de referencia para todos los activos multimedia de OVI: fotografías, videos, ilustraciones, íconos e infografías. No almacena archivos binarios pesados directamente; contiene manifiestos, metadatos y referencias a los activos en sus repositorios de almacenamiento (CDN, DAM).

## Expected Files

- `media_manifest.md` — Inventario de todos los activos multimedia disponibles con nombre, tipo, dimensiones, URL de acceso y estado de aprobación.
- `photography_guidelines.md` — Guía de estilo fotográfico: encuadres, iluminación, paleta, contextos industriales aprobados.
- `video_guidelines.md` — Estándares de video: formatos, resoluciones, duración máxima, subtítulos, marca de agua.
- `icon_library.md` — Referencia al sistema de íconos utilizado y criterios de uso.
- `infographics/` — Infografías en formato fuente (Figma, SVG) listas para publicación web.

## How the Information Will Be Consumed

- El sitio web referencia los activos aprobados listados en `media_manifest.md` para poblar galerías, banners y páginas de producto.
- El sistema de IA puede recibir contexto visual a través de los metadatos del manifiesto.
- Las escenas de Three.js/R3F en el frontend consumen texturas y modelos 3D referenciados en este directorio.

## Dependencies

- `brand/` — Los activos deben cumplir los lineamientos de identidad visual.
- `content/` — El contenido editorial hace referencia a activos específicos de este directorio.

## Owner

TODO: Definir responsable de activos multimedia OVI.

## Status

🔴 PENDIENTE — Esperando activos multimedia oficiales de OVI.
