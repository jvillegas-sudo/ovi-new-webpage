# knowledge/

## Purpose

Base de conocimiento centralizada de OVI. Integra y conecta la información de todos los demás directorios para crear una capa de conocimiento unificada que alimenta al asistente de IA, al motor de búsqueda y a la consultoría técnica.

## Expected Files

- `knowledge_graph.md` — Mapa conceptual de relaciones entre entidades del dominio OVI (productos, sectores, protocolos, normativas).
- `glossary.md` — Glosario oficial de términos técnicos de limpieza industrial en español (con equivalentes en inglés).
- `technical_references.md` — Referencias bibliográficas, normativas y científicas que sustentan el conocimiento OVI.
- `case_studies/` — Casos de estudio y experiencias documentadas (anonimizadas si aplica).
- `research/` — Investigaciones internas o externas relevantes para el posicionamiento técnico de OVI.

## How the Information Will Be Consumed

- El sistema RAG del asistente de IA indexa todos los archivos de este directorio para responder preguntas complejas con contexto técnico.
- El `knowledge_graph.md` permite al motor de búsqueda del sitio relacionar conceptos y mejorar la relevancia de resultados.
- El `glossary.md` garantiza consistencia terminológica en todo el contenido generado o revisado por IA.
- Los casos de estudio se publican como contenido de valor en el sitio.

## Dependencies

- `products/`, `services/`, `protocols/`, `industries/` — Fuentes del conocimiento del dominio.
- `ai/` — Define cómo se indexa y consume este conocimiento.

## Owner

TODO: Definir responsable de gestión del conocimiento OVI.

## Status

🔴 PENDIENTE — Esperando validación del dominio de conocimiento técnico OVI.
