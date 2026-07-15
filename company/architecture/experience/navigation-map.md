# OVI EXPERIENCE ARCHITECTURE — MAPA MAESTRO DE NAVEGACIÓN

> **FOUNDATION ORDER 004 · Entregable 1 de 5**  
> Estado: Aprobado — Pendiente de implementación  
> Versión: 1.0

---

## FLUJO PRIMARIO DE EXPERIENCIA

El mapa de experiencia OVI define el recorrido ideal del cliente desde el primer contacto hasta la solución y operación continua.

```
┌─────────────────────────────────────────────────────┐
│                   BIENVENIDA                        │
│                      HOME (/)                       │
│   "OVI — Ingeniería en Limpieza"                    │
└──────────────────────┬──────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────┐
│             INGENIERÍA EN LIMPIEZA                  │
│            ENGINEERING (/engineering)               │
│   "¿Qué es la ingeniería aplicada a la limpieza?"   │
└──────────────────────┬──────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────┐
│          ¿QUÉ DESAFÍO DESEA RESOLVER?               │
│              OVI AI (/ovi-ai)                       │
│   Diagnóstico interactivo por industria y activo    │
└──────────────────────┬──────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────┐
│                   OVI LAB                           │
│          SOLUTION LAB (/solution-lab)               │
│   Simulación del escenario específico del cliente   │
└──────────────────────┬──────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────┐
│             SOLUCIÓN RECOMENDADA                    │
│     OVI AI genera recomendación personalizada       │
│   (permanece en contexto, no es una nueva página)   │
└──────────┬───────────────────────┬──────────────────┘
           │                       │
           ▼                       ▼
┌──────────────────┐     ┌──────────────────────────┐
│  SERVICIO OVI    │     │      PRODUCTO OVI         │
│ SOLUTIONS        │     │   PRODUCTS (/products)    │
│ (/solutions)     │     │                          │
└────────┬─────────┘     └────────────┬─────────────┘
         │                            │
         └──────────────┬─────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────┐
│              CASOS DE ÉXITO                         │
│            MISSIONS (/missions)                     │
│   "Esto ya lo resolvimos antes"                     │
└──────────────────────┬──────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────┐
│          CONTACTAR UN INGENIERO                     │
│             CONTACT (/contact)                      │
│   Consulta técnica, visita o propuesta              │
└──────────────────────┬──────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────┐
│                   OVI OS                            │
│              OVI OS (/ovi-os)                       │
│   Plataforma de operaciones continuas               │
└─────────────────────────────────────────────────────┘
```

---

## MÓDULOS DE ACCESO LATERAL

Estos módulos enriquecen la experiencia sin interrumpir el flujo primario:

| Módulo          | Ruta              | Cuándo acceder                                          |
|-----------------|-------------------|---------------------------------------------------------|
| Metodología     | `/technology`     | Desde Engineering o cuando el cliente quiere profundizar |
| Sostenibilidad  | `/sustainability` | Refuerzo de confianza y valores OVI                     |
| Nosotros        | `/about`          | Construcción de confianza antes de consultar            |
| OVI Store       | `/store`          | **Solo** cuando ya existe una recomendación activa      |

---

## ACCESOS DE NAVEGACIÓN GLOBAL (NAVBAR)

El navbar actual expone todos los módulos directamente. Según la arquitectura v1.0, los accesos deberían organizarse por nivel de intención:

| Nivel          | Módulos                                           | Estado actual |
|----------------|---------------------------------------------------|---------------|
| Entrada        | Inicio, Nosotros, Ingeniería                      | ✅ Disponible |
| Diagnóstico    | OVI AI, Solution Lab                              | ✅ Disponible |
| Solución       | Servicios, Productos                              | ✅ Disponible |
| Evidencia      | OVI Missions                                      | ✅ Disponible |
| Conversión     | Contacto                                          | ✅ Disponible |
| Plataforma     | OVI OS                                            | ✅ Disponible |
| Transaccional  | OVI Store (acceso solo post-recomendación)        | ⚠️ Pendiente ajuste |

> **Nota de implementación:** El reordenamiento del navbar para reflejar esta jerarquía se realizará en fase posterior.

---

## OVI STORE — REGLA DE ACCESO

OVI Store **nunca** debe funcionar como un e-commerce tradicional de acceso libre.

Debe abrirse únicamente cuando:
1. OVI AI ha generado una recomendación de producto.
2. El cliente confirma que desea proceder con la adquisición.
3. El contexto (industria, activo, contaminante) está presente en el estado global.

Implementación futura: acceso condicional basado en estado de contexto del usuario.
