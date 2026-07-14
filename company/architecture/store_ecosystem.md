# OVI STORE ECOSYSTEM

## Purpose

Documentar la arquitectura UX de `/store` como etapa final del journey de ingeniería, sin habilitar ecommerce transaccional en esta fase.

## Experience Principles

- OVI Store no es un catálogo tradicional ni un checkout.
- La pregunta principal es **"¿Qué desafío desea resolver?"**.
- Cada producto se presenta como una especificación técnica conectada a protocolo, industria, equipo, servicio y recomendación de IA.
- La compra futura debe sentirse como la consecuencia lógica de una recomendación de ingeniería, no como una navegación por categorías de retail.

## Frontend Architecture

### Route structure

- `/store` — Landing premium con tres entradas principales:
  - Resolver un desafío → OVI AI
  - Explorar por industria
  - Explorar por producto
- `/store/[slug]` — Ficha técnica individual del producto con contexto de ingeniería y motor de recomendaciones.

### Shared data model

La implementación usa un modelo estático en `src/features/store/store-data.ts` para centralizar:

- entry points de navegación
- industrias y desafíos asociados
- categorías de producto
- especificaciones técnicas por producto
- relaciones entre producto ↔ protocolo ↔ servicio ↔ equipo ↔ IA
- lista de integraciones futuras

Esta estructura permite migrar a CMS, base de conocimiento o backend transaccional sin rehacer la composición visual del store.

### UX composition

- Hero premium con lenguaje técnico y glass panels
- Tabs por industria y por producto para evitar grids tradicionales
- Product detail pages orientadas a especificación, no a precio o checkout
- CTAs persistentes a OVI AI, OVI Engineering y Solution Lab
- Recommendation engine con copy: **"Los ingenieros de OVI también recomiendan"**

## Integration Architecture (Future)

La fase actual es UX only, pero la información y los flujos se preparan para:

- Shopify
- WooCommerce
- Medusa
- ERP
- OVI OS
- Inventory
- Payments
- Logistics

### Intended integration boundaries

- **Store presentation layer**: narrativa, especificación y recomendaciones
- **Commerce adapter layer**: sincronización futura de pricing, stock, checkout y órdenes
- **Operational layer**: conexión futura con OVI OS, inventario, ERP y logística
- **Recommendation layer**: OVI AI y Solution Lab como orquestadores del contexto técnico

## Accessibility and Motion

- Navegación completa por teclado
- Jerarquía semántica consistente en landing y detalle
- Contraste alto sobre tema oscuro
- Uso de componentes existentes con soporte de `prefers-reduced-motion`

## Explicitly out of scope in this work order

- pagos
- checkout
- inventario conectado
- ERP conectado
- lógica de carrito
- ecommerce tradicional
- grids de categorías como patrón principal

## Artifacts produced

- implementación UX en `/store`
- páginas de detalle de producto en `/store/[slug]`
- screenshots en `artifacts/screenshots/`
- video de interacción en `artifacts/videos/`
