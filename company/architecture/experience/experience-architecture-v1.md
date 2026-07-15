# OVI EXPERIENCE ARCHITECTURE — VERSION 1.0

> **FOUNDATION ORDER 004**  
> Estado: Aprobado — Pendiente de implementación  
> Versión: 1.0  
> Fecha: 2026-07

---

## FILOSOFÍA

La plataforma OVI no es un sitio web compuesto por páginas.

Es **un único universo** donde cada experiencia conduce naturalmente a la siguiente.

El usuario nunca pierde el contexto. Nunca repite información. Nunca "navega" — **avanza**.

---

## REGLA FUNDAMENTAL

> Cada módulo responde a una pregunta del cliente.  
> No existe ninguna sección sin propósito claro.

---

## MÓDULOS ACTUALES

| ID de módulo       | Ruta actual        | Propósito en la experiencia OVI                                |
|--------------------|--------------------|----------------------------------------------------------------|
| `home`             | `/`                | Bienvenida. Puerta de entrada al universo OVI.                 |
| `engineering`      | `/engineering`     | Explica la ingeniería. Educa sobre métodos y procesos OVI.     |
| `ovi-ai`           | `/ovi-ai`          | Diagnóstico interactivo. Genera recomendaciones personalizadas.|
| `solution-lab`     | `/solution-lab`    | OVI Lab. Simulador de escenarios y análisis de activos.        |
| `solutions`        | `/solutions`       | Catálogo de servicios. Responde ¿qué servicio necesita?        |
| `products`         | `/products`        | Catálogo de productos. Responde ¿qué producto recomienda OVI?  |
| `store`            | `/store`           | OVI Store. Solo accesible cuando ya existe una recomendación.  |
| `missions`         | `/missions`        | Casos de éxito. Valida con evidencia real.                     |
| `contact`          | `/contact`         | Ingenieros disponibles. Cierre consultivo, no transaccional.   |
| `ovi-os`           | `/ovi-os`          | Plataforma de operaciones. Futuro portal de clientes.          |
| `technology`       | `/technology`      | Metodología OVI. Profundiza la ingeniería.                     |
| `sustainability`   | `/sustainability`  | Propósito ambiental. Refuerza confianza y valores.             |
| `about`            | `/about`           | Identidad OVI. Quiénes somos, por qué existimos.               |

---

## JERARQUÍA DE RESOLUCIÓN

El orden de prioridad en toda la experiencia es invariable:

```
1. Resolver el problema
2. Explicar la ingeniería
3. Recomendar el servicio
4. Recomendar el producto
5. Facilitar la compra
```

**Este orden nunca se invierte.**

---

## REGLAS GLOBALES DE LA EXPERIENCIA

### Regla de Navegación

El usuario nunca "entra" a una nueva página.  
Siempre avanza dentro de una misma experiencia.  
Las transiciones mantienen continuidad visual y narrativa (ver Foundation Order 003).

### Regla de Contexto

Toda la plataforma recuerda:

- Industria seleccionada
- Activo seleccionado
- Tipo de suciedad / contaminación
- Producto recomendado
- Servicio recomendado

El usuario nunca repite información.

### Regla de Continuidad

- No romper la inmersión.
- No cargar páginas completamente nuevas sin transición.
- Usar transiciones cinematográficas (ver `transitions-guide.md`).

### Regla de Comunicación

Todo el contenido responde a uno de estos objetivos:

| Objetivo    | Módulos principales                    |
|-------------|----------------------------------------|
| Educar      | `engineering`, `technology`, `about`  |
| Diagnosticar| `ovi-ai`, `solution-lab`              |
| Demostrar   | `missions`, `sustainability`          |
| Resolver    | `solutions`, `products`               |
| Acompañar   | `contact`, `ovi-os`                   |

**Nunca vender agresivamente.**

### Regla de Confianza

Antes de solicitar cualquier dato del cliente, la plataforma deberá haber demostrado conocimiento técnico.  
**La confianza precede a la conversión.**

---

## PREPARACIÓN PARA FUTURAS FUNCIONES

Esta arquitectura está diseñada para absorber sin ruptura:

| Función futura         | Módulo de integración probable |
|------------------------|-------------------------------|
| Portal de clientes     | `ovi-os`                      |
| Dashboard de proyectos | `ovi-os`                      |
| Academia OVI           | Nuevo módulo `/academy`       |
| Centro documental      | Nuevo módulo `/docs`          |
| Certificaciones        | `/academy` o `/ovi-os`        |
| Visión Artificial      | `ovi-ai`, `solution-lab`      |
| IoT                    | `ovi-os`, `solution-lab`      |
| Agentes IA             | `ovi-ai`                      |

---

## ÍNDICE DE DOCUMENTOS

| Documento                     | Archivo                        |
|-------------------------------|--------------------------------|
| Mapa maestro de navegación    | `navigation-map.md`            |
| Relaciones entre módulos      | `module-relationships.md`      |
| Diagrama de flujo de usuario  | `flow-diagram.md`              |
| Validación de coherencia      | `coherence-validation.md`      |

---

## NOTA DE IMPLEMENTACIÓN

> Este documento define la arquitectura de experiencia.  
> No modifica diseño, contenido ni código existente.  
> La implementación de contexto persistente, transiciones cinematográficas entre rutas y guardado de estado de usuario se realizará en fases posteriores previa aprobación formal.
