# architecture/

## Purpose

Documenta la arquitectura técnica de la plataforma OVI Experience Platform: stack tecnológico, estructura de directorios, decisiones de diseño, diagramas de sistemas e integraciones.

## Expected Files

- `tech_stack.md` — Stack tecnológico completo: Next.js 15, React 19, TypeScript, Tailwind CSS v4, Three.js/R3F, GSAP, Framer Motion, Lenis, Zustand, CVA.
- `system_diagram.md` — Diagrama de arquitectura general del sistema (frontend, backend, IA, OVI OS, CDN).
- `frontend_architecture.md` — Estructura del proyecto frontend: App Router, componentes, engine, escenas, store.
- `engine_architecture.md` — Documentación del OVI Story Engine: 11 managers, sistema de escenas, hooks, debug overlay.
- `data_flow.md` — Flujo de datos entre capas: contenido → store → renderizado → IA.
- `deployment.md` — Arquitectura de despliegue: hosting, CI/CD, variables de entorno, dominios.
- `security.md` — Consideraciones de seguridad: autenticación, autorización, protección de datos, CSP.
- `performance.md` — Estrategia de rendimiento: lazy loading, code splitting, optimización de activos 3D, Core Web Vitals.

## How the Information Will Be Consumed

- Los agentes de desarrollo consultan estos documentos para mantener consistencia arquitectónica entre Work Orders.
- El `engine_architecture.md` es referencia obligatoria antes de modificar cualquier escena Three.js o el OVI Story Engine.
- `deployment.md` guía la configuración de entornos y pipelines CI/CD.
- `data_flow.md` orienta la integración entre el frontend y el módulo de IA.

## Dependencies

- `ovi_os/` — La arquitectura de OVI OS es parte de la arquitectura general.
- `ai/` — La integración de IA tiene implicaciones arquitectónicas directas.
- `roadmap/` — Las decisiones arquitectónicas se registran en `decisions_log.md`.

## Owner

TODO: Definir arquitecto técnico líder de la plataforma OVI.

## Status

🟡 EN PROGRESO — Arquitectura base documentada en memorias del agente. Pendiente formalización en archivos.
