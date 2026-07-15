# OVI DESIGN LANGUAGE — GUÍA DE CÁMARA

> **FOUNDATION ORDER 003 · Entregable 5 de 7**  
> Estado: Aprobado — Pendiente de implementación  
> Versión: 1.0

---

## FILOSOFÍA DE CÁMARA

El movimiento de cámara en OVI es **cinematográfico**.

No arcade. No brusco. No aleatorio.

**Siempre elegante.**

---

## REFERENCIAS DE INSPIRACIÓN

| Referencia          | Cualidad a emular                                     |
|---------------------|-------------------------------------------------------|
| Apple Vision Pro    | Movimiento de precisión quirúrgica. Revelación gradual. |
| BMW / Audi          | Cámara que sigue la ingeniería del objeto.            |
| Mercedes-Benz       | Lentitud intencional. Cada frame comunica calidad.    |
| Industrial Design   | Punto de vista funcional. La cámara trabaja como herramienta. |

---

## TIPOS DE MOVIMIENTO APROBADOS

### 1. Dolly In / Out

- **Descripción:** Avance o retroceso lineal hacia un objeto o escena.
- **Velocidad:** Lenta (2–6 segundos para un movimiento completo).
- **Uso:** Presentar equipos, revelar superficies, acercar OVI AI.
- **Easing:** `ease-in-out` suave. Nunca lineal. Nunca abrupto.

### 2. Pan Horizontal (Travel)

- **Descripción:** Desplazamiento lateral suave.
- **Velocidad:** Muy lenta. Sensación de recorrido, no de giro rápido.
- **Uso:** Recorrer una instalación industrial, transición entre módulos del sitio.
- **Easing:** `ease-out` prolongado.

### 3. Orbit / Arc

- **Descripción:** La cámara rodea un objeto describiendo un arco.
- **Velocidad:** Lenta a muy lenta. El objeto siempre centrado.
- **Uso:** Presentación de equipos OVI, logo, objetos de OVI Lab.
- **Ángulo:** Preferir ángulos bajos (ligeramente por debajo del horizonte) para dar imponencia al objeto.

### 4. Push Through

- **Descripción:** La cámara atraviesa una superficie, vapor, espuma o agua.
- **Velocidad:** Media-lenta. El elemento se disuelve gradualmente.
- **Uso:** Transiciones entre escenas. La cámara "cruza" hacia el siguiente módulo.
- **Efecto complementario:** Partículas, iluminación volumétrica.

### 5. Tilt (Inclinación Vertical)

- **Descripción:** La cámara inclina su eje vertical suavemente.
- **Velocidad:** Lenta.
- **Uso:** Revelar la altura de una instalación, seguir el flujo de agua hacia abajo.

---

## PARÁMETROS TÉCNICOS

| Parámetro              | Valor recomendado                            |
|------------------------|----------------------------------------------|
| Campo de visión (FOV)  | 35° – 50° (cinematográfico, no gran angular) |
| Profundidad de campo   | Moderada. Foco nítido en el objeto principal. |
| Desenfoque de fondo    | Leve bokeh en materiales. No exagerado.      |
| Motion blur            | Muy leve. Solo presente en movimientos rápidos de transición. |
| Frame rate             | 60fps mínimo en web. 120fps en entornos compatibles. |
| Estabilización         | Siempre. Sin vibración aleatoria (no handheld shake). |

---

## MOVIMIENTOS PROHIBIDOS

| Movimiento             | Razón de exclusión                                      |
|------------------------|---------------------------------------------------------|
| Shake / vibración      | Estética de acción, videojuego o pánico. No OVI.        |
| Zoom rápido            | Brusquedad contraria al ritmo elegante.                 |
| Cortes de cámara duros | Rompen la continuidad cinematográfica.                  |
| Rotación en 360° rápida | Estética de demo genérica.                            |
| Camera bob (bounce)    | Imitación de caminata humana. Innecesario.              |

---

## REGLA DE DECISIÓN

> Antes de definir cualquier movimiento de cámara, pregunta:  
> **¿Este movimiento podría aparecer en un filme publicitario de BMW o en un spot de Apple?**  
> Si la respuesta es NO → ralentizar, suavizar o rediseñar el movimiento.
