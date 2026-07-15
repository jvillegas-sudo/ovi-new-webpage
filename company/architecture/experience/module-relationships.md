# OVI EXPERIENCE ARCHITECTURE — RELACIONES ENTRE MÓDULOS

> **FOUNDATION ORDER 004 · Entregable 2 de 5**  
> Estado: Aprobado — Pendiente de implementación  
> Versión: 1.0

---

## MÓDULO: HOME (`/`)

**Propósito:** Puerta de entrada al universo OVI. Primera impresión. Establece identidad.

**Conduce hacia:**

| Destino          | Ruta            | Motivo                                              |
|------------------|-----------------|-----------------------------------------------------|
| Ingeniería       | `/engineering`  | Explicar la disciplina que sustenta todo OVI        |
| OVI AI           | `/ovi-ai`       | Iniciar diagnóstico directo                         |
| Solution Lab     | `/solution-lab` | Explorar OVI Lab como propuesta tecnológica         |

**Nunca conduce directamente hacia:**
- OVI Store — El cliente no debe comprar antes de conocer.

**Estado actual:** Home conduce a `/solutions` y `/contact` directamente (CTA de cierre). ⚠️ Requiere ajuste en fases futuras para priorizar el flujo de diagnóstico primero.

---

## MÓDULO: ENGINEERING (`/engineering`)

**Propósito:** Educa sobre la ingeniería aplicada a la limpieza. Genera confianza técnica.

**Conduce hacia:**

| Destino  | Ruta       | Motivo                                       |
|----------|------------|----------------------------------------------|
| OVI AI   | `/ovi-ai`  | Después de entender la ingeniería, diagnosticar |
| OVI OS   | `/ovi-os`  | Explorar la plataforma de operaciones        |
| Contacto | `/contact` | Hablar con un ingeniero                      |

**Estado actual:** ✅ Los tres destinos están implementados con links activos.

---

## MÓDULO: OVI AI (`/ovi-ai`)

**Propósito:** Diagnóstico interactivo. Genera recomendaciones personalizadas basadas en industria, activo y tipo de suciedad.

**Conduce hacia:**

| Destino       | Ruta            | Condición de activación                       |
|---------------|-----------------|-----------------------------------------------|
| Solution Lab  | `/solution-lab` | Cuando existe un escenario a simular          |
| Casos de éxito| `/missions`     | Cuando hay un caso relacionado al diagnóstico |
| Contacto      | `/contact`      | Para continuar con un ingeniero               |
| OVI Store     | `/store`        | **Solo** cuando existe recomendación de producto |

**Estado actual:** OVI AI envía a `/contact` y `/technology`. ⚠️ No hay link activo hacia `/solution-lab` desde el workspace. Pendiente en fases futuras.

**Tecnología clave:**  
- `src/features/ovi-ai/OviAiWorkspace.tsx` — Workspace interactivo  
- `src/features/ovi-ai/ovi-ai-engine.ts` — Motor de recomendación  
- `src/store/ovi-ai.store.ts` — Estado Zustand del diagnóstico

---

## MÓDULO: SOLUTION LAB (`/solution-lab`)

**Propósito:** OVI Lab. Simula el escenario del cliente. Visualiza el problema y la solución.

**Conduce hacia:**

| Destino  | Ruta       | Condición de activación                    |
|----------|------------|--------------------------------------------|
| OVI AI   | `/ovi-ai`  | Para profundizar el diagnóstico            |
| Contacto | `/contact` | Para solicitar una visita técnica          |
| Servicios| `/solutions`| Cuando se identifica el servicio necesario|
| Productos| `/products` | Cuando se identifica el producto necesario|

**Estado actual:** Solution Lab conduce a `/ovi-ai` y `/contact`. ✅ Parcialmente alineado. ⚠️ Pendiente agregar rutas hacia `/solutions` y `/products`.

**Tecnología clave:**  
- `src/features/solution-lab/SolutionLabWorkspace.tsx`

---

## MÓDULO: SOLUTIONS (`/solutions`)

**Propósito:** Catálogo de servicios OVI. Responde "¿qué servicio necesito?".

**Conduce hacia:**

| Destino  | Ruta       | Motivo                                    |
|----------|------------|-------------------------------------------|
| Contacto | `/contact` | Para contratar o consultar el servicio    |
| OVI AI   | `/ovi-ai`  | Para refinar el diagnóstico si es necesario |

**Estado actual:** Requiere verificación de links de salida. Ver validación de coherencia.

---

## MÓDULO: PRODUCTS (`/products`)

**Propósito:** Catálogo de productos OVI. Responde "¿qué producto resuelve mi problema?".

**Conduce hacia:**

| Destino      | Ruta            | Condición                                 |
|--------------|-----------------|-------------------------------------------|
| OVI Store    | `/store/[slug]` | Cuando el cliente quiere adquirir         |
| Contacto     | `/contact`      | Para consulta técnica sobre el producto   |
| Solution Lab | `/solution-lab` | Para simular la aplicación del producto   |
| OVI AI       | `/ovi-ai`       | Para refinar la recomendación             |
| Engineering  | `/engineering`  | Para entender la ingeniería del producto  |

**Estado actual:** ✅ Todos los destinos están implementados con links activos.

---

## MÓDULO: MISSIONS (`/missions`)

**Propósito:** Casos de éxito. Valida con evidencia que OVI resuelve problemas reales.

**Conduce hacia:**

| Destino      | Ruta                              | Motivo                                    |
|--------------|-----------------------------------|-------------------------------------------|
| Solution Lab | `/solution-lab?mission={id}`      | Abrir el mismo escenario simulado         |
| Contacto     | `/contact`                        | Consultar ingeniero sobre el caso         |
| OVI AI       | `/ovi-ai`                         | Iniciar diagnóstico en el mismo contexto  |

**Estado actual:** ✅ Los tres destinos están implementados.  
Missions ya pasa el `mission.id` como parámetro de URL a Solution Lab — esto es un precursor del contexto persistente.

---

## MÓDULO: CONTACT (`/contact`)

**Propósito:** Ingenieros disponibles. Cierre consultivo. No es un formulario de ventas.

**Conduce hacia:**

| Destino  | Nota                                             |
|----------|--------------------------------------------------|
| (Cierre) | Es el destino final del flujo primario           |

**Restricción:** Contact debe ser un inicio de relación técnica, no una transacción comercial.

**Estado actual:** ✅ Implementado. Incluye email y LinkedIn.

---

## MÓDULO: OVI STORE (`/store`)

**Propósito:** Adquisición de productos. Solo accesible cuando el cliente ya conoce la solución.

**Conduce hacia:**

| Destino      | Ruta            | Motivo                              |
|--------------|-----------------|-------------------------------------|
| OVI AI       | `/ovi-ai`       | Si el cliente aún no tiene recomendación |
| Solution Lab | `/solution-lab` | Para validar antes de comprar       |
| Producto     | `/store/[slug]` | Página de detalle del producto      |

**Estado actual:** ✅ Store incluye acceso a OVI AI y Solution Lab como alternativa al flujo transaccional. ⚠️ El acceso al Store desde navbar es directo — pendiente hacerlo condicional.

---

## MÓDULO: OVI OS (`/ovi-os`)

**Propósito:** Plataforma de operaciones continuas. Futuro portal de clientes.

**Conduce hacia:**

| Destino  | Ruta       | Motivo                         |
|----------|------------|--------------------------------|
| Contacto | `/contact` | Para activar el servicio OVI OS |

**Estado actual:** ✅ Implementado. Es el destino final del flujo de experiencia.

---

## MÓDULOS DE SOPORTE (no parte del flujo primario)

| Módulo         | Ruta             | Rol en la experiencia                          |
|----------------|------------------|------------------------------------------------|
| Metodología    | `/technology`    | Profundizar comprensión técnica                |
| Sostenibilidad | `/sustainability`| Construir confianza por valores                |
| Nosotros       | `/about`         | Contexto de la empresa                         |
| Privacidad     | `/privacy`       | Legal                                          |
| Términos       | `/terms`         | Legal                                          |
