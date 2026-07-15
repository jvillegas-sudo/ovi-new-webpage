# OVI Knowledge Engine

**FASE 2 · Foundation Order 002**

> El OVI Knowledge Engine no es un modelo de IA.
> Es el motor de decisión que le enseña a la plataforma cómo seleccionar la mejor solución.
> La IA únicamente comunica el conocimiento que este motor construye.

---

## Filosofía

OVI no vende productos. OVI resuelve problemas.

Por lo tanto, la lógica del sistema **nunca** comienza por un producto.

Siempre comienza por un desafío operativo.

---

## Ubicación

```
src/knowledge-engine/
```

---

## Arquitectura

```
src/knowledge-engine/
├── index.ts                          ← Barrel principal de exportaciones
├── README.md                         ← Este documento
│
├── types/
│   └── index.ts                      ← Interfaces TypeScript del motor
│
├── rules/
│   ├── index.ts                      ← Motor de reglas + evaluador
│   └── product-rules.ts              ← SE RECOMIENDA SI / NO SE RECOMIENDA SI por producto
│
├── decision-tree/
│   ├── index.ts                      ← Árbol de decisión barrel
│   └── cleaning-decision-tree.ts     ← Flujo de 8 pasos de decisión
│
├── compatibility-matrix/
│   ├── index.ts                      ← Matriz barrel
│   └── matrix.ts                     ← Producto × Suciedad × Superficie × Industria × Servicio × Equipo × Protocolo
│
├── recommendation-engine/
│   ├── index.ts                      ← Motor de recomendación barrel
│   └── recommender.ts                ← Motor principal de razonamiento
│
├── mappings/
│   ├── index.ts                      ← Mappings barrel
│   └── entity-mappings.ts            ← Índices bidireccionales pre-computados
│
└── validators/
    ├── index.ts                      ← Validators barrel
    └── input-validators.ts           ← Validadores contra la Knowledge Base
```

---

## Uso

```ts
// Importar desde el barrel principal
import {
  generateRecommendation,
  generateResolvedRecommendation,
  validateDecisionInput,
  decisionTree,
  getEntryNode,
} from '@knowledge-engine';

// Generar recomendación completa
const recommendation = generateRecommendation({
  industryId: 'transporte',
  surfaceId: 'pintura-automotriz',
  contaminationId: 'grasa-pesada',
  contaminationLevel: 'severo',
  clientGoal: 'reducir-tiempo-ciclo',
});

// recommendation incluye:
// - diagnosis
// - technicalJustification
// - primaryProductId
// - complementaryProductIds
// - protocolId
// - serviceId
// - equipmentIds
// - expectedBenefit
// - reasoning (whyProduct, whyProtocol, whyService, risksAvoided, benefitsGenerated)
// - confidence ('alta' | 'media' | 'baja')
```

---

## Modelo de Decisión

El flujo **nunca** se invierte. Siempre comienza en el desafío operativo:

```
1. Industria
   ↓
2. Activo
   ↓
3. Zona
   ↓
4. Material (superficie)
   ↓
5. Tipo de suciedad
   ↓
6. Nivel de contaminación
   ↓
7. Objetivo del cliente
   ↓
8. Restricciones ambientales
   ↓
   [MOTOR DE RAZONAMIENTO]
   ↓
9.  Protocolo recomendado
   ↓
10. Servicio OVI
   ↓
11. Productos OVI
   ↓
12. Equipo recomendado
   ↓
13. Resultado esperado
```

---

## Motor de Reglas

Cada producto tiene reglas parametrizables:

### SE RECOMIENDA SI
Condiciones que califican al producto como candidato.
El producto es candidato si **cualquier** condición coincide.

### NO SE RECOMIENDA SI
Condiciones que **excluyen** al producto sin importar las señales positivas.
El producto queda eliminado si **cualquier** condición de exclusión coincide.

### Ejemplo: OVI BioClean Pro

**SE RECOMIENDA SI:**
- Existe grasa pesada
- Existe aceite
- La superficie es acero inoxidable
- La superficie es concreto sellado
- El entorno es industrial, de transporte o energía
- El nivel de contaminación es severo o crítico

**NO SE RECOMIENDA SI:**
- La superficie es aluminio (requiere prueba de compatibilidad)
- La superficie es pintura automotriz (requiere pH neutro)
- Existe restricción sanitaria activa
- El entorno requiere superficie delicada

---

## Matriz de Compatibilidad

Dimensiones de la matriz relacional:

```
Producto
  × Suciedad
  × Superficie
  × Industria
  × Servicio
  × Equipo
  × Protocolo
```

Cada producto tiene un `compatibilityScore` (0–100):

| Rango | Significado |
|---|---|
| 90–100 | Producto diseñado específicamente para este caso |
| 70–89 | Producto altamente efectivo en este contexto |
| 50–69 | Compatible, no es la primera recomendación |
| 0–49 | No recomendado |

---

## Motor de Recomendación

El motor **siempre** retorna:

| Campo | Descripción |
|---|---|
| `diagnosis` | Resumen del desafío operativo identificado |
| `technicalJustification` | Justificación técnica de la recomendación |
| `protocolId` | Protocolo recomendado (Knowledge Base) |
| `serviceId` | Servicio OVI recomendado |
| `primaryProductId` | Producto principal |
| `complementaryProductIds` | Productos complementarios |
| `equipmentIds` | Equipos recomendados |
| `expectedBenefit` | Beneficio operativo esperado |
| `reasoning` | ¿Por qué ese producto? ¿Por qué ese protocolo? ¿Qué riesgo evita? |
| `confidence` | `alta` / `media` / `baja` |

---

## Razonamiento

Toda recomendación responde:

- **¿Por qué ese producto?** → `reasoning.whyProduct`
- **¿Por qué ese protocolo?** → `reasoning.whyProtocol`
- **¿Por qué ese servicio?** → `reasoning.whyService`
- **¿Qué riesgo evita?** → `reasoning.risksAvoided[]`
- **¿Qué beneficio genera?** → `reasoning.benefitsGenerated[]`

---

## Niveles de Confianza

| Nivel | Condición |
|---|---|
| `alta` | 3+ dimensiones de entrada especificadas + candidatos encontrados |
| `media` | 1–2 dimensiones especificadas + candidatos encontrados |
| `baja` | Sin dimensiones suficientes o sin candidatos |

---

## Validadores

Los validadores verifican los IDs de entrada contra la Knowledge Base antes de ejecutar el motor:

```ts
import { validateDecisionInput } from '@knowledge-engine';

const result = validateDecisionInput({
  industryId: 'transporte',
  contaminationId: 'grasa-pesada',
});

// result.valid → true/false
// result.errors → IDs desconocidos o valores inválidos (bloqueantes)
// result.warnings → campos faltantes, baja confianza (informativos)
```

---

## Integración con la Knowledge Base

Este motor consume exclusivamente datos de `@knowledge`:

```
@knowledge-engine  ←  consulta  →  @knowledge
    (lógica)                         (datos)
```

El motor **nunca** define datos de productos, servicios o protocolos.
Siempre consulta la fuente de verdad en `src/knowledge/`.

---

## Consumidores del Motor

Este motor está preparado para ser consumido por:

| Plataforma | Uso |
|---|---|
| **OVI AI** | Genera diagnósticos y recomendaciones a partir de conversación |
| **OVI Lab** | Árbol de decisión interactivo para demostración |
| **OVI Store** | Filtros de producto basados en desafío operativo |
| **OVI OS** | Trazabilidad de intervenciones y recomendaciones |
| **Aplicación móvil** | Diagnóstico rápido en campo |
| **Agentes inteligentes** | Contexto completo disponible por producto/sector/protocolo |
| **WhatsApp / CRM** | Bot de recomendación técnica |

---

## Regla Absoluta

1. **Nunca** retornar solo un producto. Siempre retornar la solución completa.
2. **Nunca** comenzar el flujo desde un producto. Siempre desde el desafío.
3. **Nunca** inventar datos. El motor opera exclusivamente sobre `@knowledge`.
4. **Nunca** implementar IA en este módulo. La lógica es determinista y parametrizable.

---

## Estado de Datos

| Módulo | Registros | Estado |
|---|---|---|
| Reglas de producto | 10 | Activo |
| Nodos de árbol de decisión | 8 | Activo |
| Entradas en matriz | 10 | Activo |
| Motor de recomendación | 1 | Activo |
| Mappings | Auto-generados | Activo |
| Validadores | 12 funciones | Activo |

---

## Fase 3 (Pendiente Aprobación)

- Integrar `generateRecommendation()` como fuente de respuesta de OVI AI
- Exponer el árbol de decisión en OVI Lab como experiencia interactiva
- Alimentar OVI Store con filtros basados en `OviDecisionInput`
- Conectar OVI OS para trazabilidad de recomendaciones por cliente
- Ampliar reglas con validación oficial de documentos técnicos OVI
