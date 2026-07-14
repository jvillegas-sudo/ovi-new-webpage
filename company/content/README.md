# content/

## Purpose

Repositorio maestro de todo el contenido editorial de la plataforma OVI: textos de páginas, copys de marketing, artículos técnicos, FAQs y metadatos SEO. El español es el idioma maestro; el inglés se deriva de traducciones aprobadas.

## Expected Files

- `content_index.md` — Índice de todo el contenido disponible por sección, idioma y estado de aprobación.
- `pages/` — Contenido estructurado por página del sitio (home, productos, servicios, industrias, OVI OS, contacto).
  - `page_[nombre]_es.md` — Versión en español (maestra).
  - `page_[nombre]_en.md` — Versión en inglés (derivada de la versión española aprobada).
- `blog/` — Artículos técnicos y de conocimiento para blog o recursos.
- `faq.md` — Preguntas frecuentes generales de la empresa y la plataforma.
- `seo/` — Metadatos SEO: títulos, descripciones, keywords, datos estructurados por página.
- `legal/` — Textos legales: aviso de privacidad, términos de uso, política de cookies.

## How the Information Will Be Consumed

- Las páginas del sitio Next.js leen los archivos de contenido correspondientes para renderizar textos.
- El sistema de IA referencia `faq.md` y artículos del blog para responder preguntas de usuario.
- Los metadatos SEO en `seo/` se inyectan en los `<head>` de las páginas vía Next.js Metadata API.
- La versión inglesa se genera únicamente a partir de la española aprobada, nunca de forma independiente.

## Dependencies

- `brand/` — Tono de voz y lineamientos de comunicación.
- `products/`, `services/`, `industries/` — Fuentes de verdad del contenido técnico.
- `media/` — Activos multimedia que acompañan el contenido.

## Owner

TODO: Definir responsable editorial de contenido OVI.

## Status

🔴 PENDIENTE — Esperando contenido editorial oficial aprobado por OVI.
