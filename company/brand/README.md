# brand/

## Purpose

Almacena todos los activos y lineamientos que definen la identidad visual y verbal de OVI. Este directorio es la fuente de verdad para cualquier expresión de la marca en la plataforma.

## Expected Files

- `brand_guidelines.md` — Lineamientos oficiales de marca (tipografía, paleta de colores, tono de voz, logotipo).
- `logo/` — Archivos de logotipo en formatos SVG, PNG y WebP en distintas variantes (positivo, negativo, ícono).
- `typography.md` — Familias tipográficas aprobadas, jerarquías y usos permitidos.
- `color_palette.md` — Colores primarios, secundarios y de acento con valores HEX, RGB y CSS custom properties.
- `tone_of_voice.md` — Guía de tono y voz: formal, técnico, cercano. Ejemplos aprobados y prohibidos.
- `tagline.md` — Taglines oficiales, versiones en español e inglés, contextos de uso.

## How the Information Will Be Consumed

Los tokens de diseño definidos aquí se mapean directamente a `src/config/tokens/` en el frontend. Los lineamientos de marca guían la generación de contenido por IA y la redacción de copys en toda la plataforma. El sistema de diseño (Tailwind CSS v4, CVA) consume las variables CSS derivadas de esta fuente.

## Dependencies

- `content/` — Los textos del sitio deben respetar el tono de voz definido aquí.
- `media/` — Los activos multimedia deben cumplir con los lineamientos de marca.

## Owner

TODO: Definir responsable interno de marca OVI.

## Status

🔴 PENDIENTE — Esperando documentación oficial de marca OVI.
