# OVI DESIGN LANGUAGE — GUÍA DE TRANSICIONES

> **FOUNDATION ORDER 003 · Entregable 6 de 7**  
> Estado: Aprobado — Pendiente de implementación  
> Versión: 1.0

---

## FILOSOFÍA DE TRANSICIONES

Cada transición en OVI **cuenta una historia**.

No son simplemente un cambio de estado.  
Son un **micro-relato visual** del universo OVI.

Una transición nunca debe ser un efecto decorativo vacío.  
Debe representar un proceso de limpieza, revelación o transformación.

---

## NUNCA UTILIZAR

- Fades simples (fade to black / fade to white sin contexto)
- Cortes duros entre escenas
- Slides genéricos (deslizamiento sin narrativa)
- Wipes de videojuego
- Efectos de desenfoque aleatorio sin propósito

---

## TRANSICIONES APROBADAS

### 1. Onda de Agua (Water Wave Reveal)

- **Narrativa:** Una ola de agua cruza la pantalla y revela la escena siguiente.
- **Dirección:** Izquierda → derecha / derecha → izquierda / arriba → abajo.
- **Velocidad:** 0.8 – 1.5 segundos.
- **Paleta:** Azul cobalto + cian con translucidez alta.
- **Uso:** Transición principal entre secciones del sitio.

### 2. Revelación por Espuma (Foam Reveal)

- **Narrativa:** La espuma cubre la escena actual → se disuelve lentamente → aparece la nueva escena.
- **Velocidad:** 1.5 – 2.5 segundos.
- **Comportamiento:** La espuma se comporta con física real (burbujas pequeñas que se desintegran).
- **Uso:** Transición narrativa larga. Ideal para cambios de contexto importante.

### 3. Push Through (Atravesar con Cámara)

- **Narrativa:** La cámara avanza y atraviesa un material (vapor, agua, espuma, cristal).
- **Velocidad:** 1.0 – 2.0 segundos.
- **Efecto complementario:** Luz volumétrica al cruzar el umbral.
- **Uso:** Transiciones cinematográficas entre escenas 3D.

### 4. Escáner de Luz (Light Scan)

- **Narrativa:** Un haz de luz barre la pantalla → lo que ilumina aparece / lo que deja atrás desaparece.
- **Velocidad:** 0.6 – 1.2 segundos.
- **Color del haz:** Cian (`#00C4FF`).
- **Uso:** Transición de alta tecnología. Entrada de OVI AI, diagnósticos.

### 5. Superficie que se Limpia (Clean Wipe)

- **Narrativa:** Una herramienta de limpieza (simbólica) pasa sobre la pantalla → deja la superficie limpia y la nueva escena aparece.
- **Velocidad:** 0.8 – 1.4 segundos.
- **Efecto:** Residuo de agua o espuma detrás del borde que se evapora.
- **Uso:** Transición narrativa OVI-first. Ideal para el Story Engine.

### 6. Disolución en Vapor (Vapor Dissolve)

- **Narrativa:** La escena actual se convierte en vapor → el vapor forma la escena siguiente.
- **Velocidad:** 2.0 – 3.5 segundos (transición lenta y evocadora).
- **Uso:** Transiciones de alta importancia narrativa. No usar con frecuencia.

---

## TIMINGS DE REFERENCIA

| Tipo de transición         | Duración mínima | Duración máxima |
|----------------------------|-----------------|-----------------|
| Micro (entre elementos UI) | 0.15s           | 0.4s            |
| Estándar (entre módulos)   | 0.6s            | 1.5s            |
| Narrativa (entre escenas)  | 1.5s            | 3.5s            |

---

## EASING APROBADO

| Contexto               | Curva de easing                   |
|------------------------|-----------------------------------|
| Entradas               | `cubic-bezier(0.0, 0.0, 0.2, 1)` |
| Salidas                | `cubic-bezier(0.4, 0.0, 1, 1)`   |
| Entradas y salidas     | `cubic-bezier(0.4, 0.0, 0.2, 1)` |
| Transiciones de agua   | Custom spring con `stiffness: 80, damping: 20` |

---

## STACKING DE TRANSICIONES

En el Story Engine, las transiciones pueden encadenarse:

```
[Escena A termina]
  → Onda de agua (0.8s)
  → Espuma se disuelve (0.5s)
  → Luz escanea la nueva superficie (0.4s)
[Escena B aparece completamente]
```

Total: ~1.7 segundos de narrativa visual coherente.

---

## REGLA DE DECISIÓN

> Antes de implementar cualquier transición, pregunta:  
> **¿Esta transición cuenta una historia del universo OVI (limpieza, revelación, transformación)?**  
> Si la respuesta es NO → reemplazar con uno de los tipos aprobados.
