# ai/

## Purpose

Contiene la arquitectura, configuración y base de conocimiento del componente de Inteligencia Artificial de la plataforma OVI. Define cómo el asistente de IA debe comportarse, qué sabe y cómo responde.

## Expected Files

- `ai_overview.md` — Visión general del componente de IA: objetivos, capacidades, limitaciones y roadmap.
- `system_prompt.md` — Prompt de sistema oficial del asistente OVI (instrucciones de rol, tono, restricciones).
- `knowledge_sources.md` — Fuentes de conocimiento autorizadas que puede utilizar la IA (productos, protocolos, servicios, FAQs).
- `conversation_flows.md` — Flujos conversacionales principales: consulta de producto, cotización, soporte técnico, onboarding.
- `guardrails.md` — Reglas de lo que la IA NO debe hacer: inventar información, salir del dominio OVI, dar precios sin validación.
- `training_data/` — Ejemplos de pares pregunta-respuesta aprobados para fine-tuning o evaluación.

## How the Information Will Be Consumed

- El motor de IA (integrado en OVI OS) carga `system_prompt.md` como instrucción base en cada sesión.
- Los `knowledge_sources.md` definen el índice RAG (Retrieval-Augmented Generation) para respuestas precisas.
- Los `conversation_flows.md` guían la lógica de routing de intenciones del asistente.
- Los `guardrails.md` se validan en capa de middleware antes de enviar respuestas al usuario.

## Dependencies

- `knowledge/` — Base de conocimiento general.
- `products/`, `services/`, `protocols/` — Fuentes de datos del dominio.
- `ovi_os/` — Plataforma operativa donde se despliega la IA.

## Owner

TODO: Definir responsable de arquitectura de IA OVI.

## Status

🔴 PENDIENTE — Esperando definición oficial de la estrategia de IA OVI.
