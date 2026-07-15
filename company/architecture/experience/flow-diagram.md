# OVI EXPERIENCE ARCHITECTURE — DIAGRAMA DE FLUJO

> **FOUNDATION ORDER 004 · Entregable 3 de 5**  
> Estado: Aprobado — Pendiente de implementación  
> Versión: 1.0

---

## FLUJO PRIMARIO — CLIENTE NUEVO

```
[INICIO]
   │
   ▼
┌──────────────────────────────────────────────┐
│  HOME (/)                                    │
│  ¿Qué hace OVI?                              │
│  "Ingeniería en Limpieza"                    │
└──────────────┬───────────────────────────────┘
               │
       ¿Cliente quiere entender primero?
               │
      ┌────────┴────────┐
      │ SÍ              │ NO (ya sabe lo que busca)
      ▼                 ▼
┌───────────┐     ┌───────────────────┐
│ ENGINEERING│    │ OVI AI directo    │
│/engineering│    └────────┬──────────┘
└──────┬─────┘             │
       │                   │
       ▼                   │
┌──────────────────────────▼───────────────────┐
│  OVI AI (/ovi-ai)                            │
│  Seleccionar: Industria / Activo / Suciedad  │
│  → generateRecommendation()                  │
└──────────────┬───────────────────────────────┘
               │
       ¿Cliente quiere ver simulación?
               │
      ┌────────┴────────┐
      │ SÍ              │ NO (confía en el diagnóstico)
      ▼                 │
┌───────────────┐       │
│ SOLUTION LAB  │       │
│/solution-lab  │       │
└───────┬───────┘       │
        │               │
        ▼               ▼
┌──────────────────────────────────────────────┐
│  SOLUCIÓN RECOMENDADA                        │
│  (contexto activo: industria, activo, prod.) │
└──────────────┬───────────────────────────────┘
               │
      ┌────────┴────────┐
      │                 │
      ▼                 ▼
┌───────────┐     ┌───────────────┐
│ SOLUTIONS │     │   PRODUCTS    │
│/solutions │     │  /products    │
└──────┬────┘     └───────┬───────┘
       │                  │
       │          ¿Quiere adquirir?
       │                  │
       │         ┌────────┴────────┐
       │         │ SÍ              │ NO
       │         ▼                 ▼
       │   ┌──────────┐    ┌──────────────┐
       │   │ OVI STORE│    │   CONTACTO   │
       │   │ /store   │    │   /contact   │
       │   └──────────┘    └──────────────┘
       │
       ▼
┌──────────────────────────────────────────────┐
│  ¿Necesita ver evidencia?                    │
└──────────────┬───────────────────────────────┘
               │ SÍ
               ▼
┌──────────────────────────────────────────────┐
│  MISSIONS (/missions)                        │
│  Casos de éxito verificados                  │
└──────────────┬───────────────────────────────┘
               │
               ▼
┌──────────────────────────────────────────────┐
│  CONTACT (/contact)                          │
│  Ingeniero disponible                        │
│  Visita técnica / Propuesta                  │
└──────────────┬───────────────────────────────┘
               │
               ▼
┌──────────────────────────────────────────────┐
│  OVI OS (/ovi-os)                            │
│  Plataforma de operaciones continuas         │
│  Monitoreo / Dashboard / Portal              │
└──────────────────────────────────────────────┘
```

---

## FLUJO ALTERNATIVO — CLIENTE RECURRENTE

```
[CLIENTE CON CONTEXTO PREVIO]
   │
   ▼
OVI AI (/ovi-ai)
   │
   ├── Diagnóstico ya realizado → SOLUTION LAB directo
   │
   └── Nueva consulta → Flujo primario normal
```

---

## FLUJO DE CASOS DE ÉXITO → NUEVO DIAGNÓSTICO

```
[CLIENTE LEE UN CASO EN MISSIONS]
   │
   ▼
¿Su escenario es similar?
   │
   ├── SÍ → /solution-lab?mission={id} (contexto pre-cargado)
   │             │
   │             ▼
   │         OVI AI con contexto del caso
   │
   └── NO → OVI AI desde cero
```

---

## FLUJO DE ESTADO DE CONTEXTO (FUTURO)

```
[CUALQUIER MÓDULO]
   │
   ▼
Estado global Zustand:
  - industry: string | null
  - asset: string | null
  - contaminantType: string | null
  - recommendedProduct: Product | null
  - recommendedService: Service | null
   │
   ▼
Cada módulo consulta este estado:
  - OVI AI: escribe el estado tras diagnóstico
  - Solution Lab: lee el estado para pre-cargar simulación
  - Products: filtra catálogo según estado
  - Store: solo accesible si recommendedProduct !== null
  - Contact: incluye contexto en el formulario de contacto
```

---

## PUNTOS DE ENTRADA ALTERNATIVOS (DEEP LINKS)

Algunos usuarios llegan directamente a módulos intermedios (vía búsqueda, referidos, etc.):

| Punto de entrada | Módulo destino   | Acción recomendada                              |
|------------------|------------------|-------------------------------------------------|
| Google / SEO     | `/engineering`   | Mostrar CTA hacia OVI AI                        |
| Referido         | `/missions`      | Mostrar CTA hacia Solution Lab con contexto     |
| Campaña          | `/ovi-ai`        | Iniciar flujo de diagnóstico directamente       |
| Redes sociales   | `/`              | Flujo primario completo                         |

---

## DIAGRAMA DE ESTADO DE EXPERIENCIA

```
DESCONOCIDO
   │
   ▼ (Home, Engineering, About)
INFORMADO
   │
   ▼ (OVI AI, Solution Lab)
DIAGNOSTICADO
   │
   ▼ (Solutions, Products, Missions)
CONVENCIDO
   │
   ▼ (Contact, Store)
CLIENTE
   │
   ▼ (OVI OS)
OPERACIÓN CONTINUA
```
