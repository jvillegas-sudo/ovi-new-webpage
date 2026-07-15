# OVI DESIGN LANGUAGE — GUÍA DE PARTÍCULAS

> **FOUNDATION ORDER 003 · Entregable 4 de 7**  
> Estado: Aprobado — Pendiente de implementación  
> Versión: 1.0

---

## REDEFINICIÓN

En el universo OVI, **las partículas dejan de ser partículas abstractas**.

Cada punto, esfera o forma suspendida en el espacio representa:

- **Moléculas** — química activa en acción.
- **Micro gotas** — agua en su forma más precisa.
- **Burbujas** — espuma controlada a escala microscópica.
- **Nanopartículas de limpieza** — agentes activos del proceso OVI.

---

## TIPOS DE PARTÍCULAS APROBADOS

### 1. Micro Gotas de Agua

- **Forma:** Esfera perfecta o levemente oblonga.
- **Tamaño:** Muy pequeño (0.1px – 2px en pantalla).
- **Color:** Blanco translúcido, cian tenue, o reflejo del entorno.
- **Comportamiento:** Caída vertical suave, dispersión controlada, tensión superficial visible.
- **Uso:** Fondos de escenas de limpieza, transiciones, ambiente de procesos.

### 2. Burbujas de Espuma

- **Forma:** Esfera con iridiscencia interna, fina pared.
- **Tamaño:** Pequeño a mediano.
- **Color:** Reflejo iridiscente sobre base transparente.
- **Comportamiento:** Ascenso lento, agrupación orgánica, explosión suave al tocar superficies.
- **Uso:** Escenas de espuma premium, transiciones reveladoras.

### 3. Nanopartículas Activas

- **Forma:** Puntos o pequeñas esferas de luz.
- **Tamaño:** Mínimo (0.5px – 1px).
- **Color:** Verde OVI (`#00FF85`) o cian (`#00C4FF`).
- **Comportamiento:** Movimiento de enjambre ordenado. Siguen vectores de flujo. No caóticas.
- **Uso:** OVI AI, visualización de procesos activos, diagnóstico.

### 4. Vapor Molecular

- **Forma:** Puntos semi-transparentes con desenfoque gaussiano.
- **Tamaño:** Variable, con jerarquía de profundidad.
- **Color:** Blanco puro con baja opacidad.
- **Comportamiento:** Ascenso lento con dispersión lateral. No se precipitan.
- **Uso:** Escenas de vapor, procesos térmicos.

---

## COMPORTAMIENTO GENERAL

| Propiedad         | Especificación                                              |
|-------------------|-------------------------------------------------------------|
| Velocidad         | Lenta a muy lenta. Nunca frenética.                         |
| Dirección         | Vectorizada (flujo de agua, ascenso de vapor, caída de gota) |
| Densidad          | Media-baja. El espacio negro debe predominar.               |
| Interactividad    | Pueden reaccionar a la presencia del cursor o a eventos de escena. |
| Ciclo de vida     | Aparecen, se mueven con propósito y desaparecen suavemente. |

---

## PARTÍCULAS PROHIBIDAS

| Tipo                              | Razón de exclusión                                  |
|-----------------------------------|-----------------------------------------------------|
| Partículas estrelladas (sparkles) | Estética de videojuego o efecto mágico.             |
| Polvo de estrellas / espacio      | Universo espacial ajeno a OVI.                      |
| Partículas de fuego / chispa      | Connotación de riesgo, peligro o calor destructivo. |
| Partículas de DNA / hélice        | Estética de biotecnología ajena al universo OVI.    |
| Confeti o formas aleatorias       | Sin significado en el universo de ingeniería.       |

---

## PALETA DE PARTÍCULAS

| Tipo                    | Color base        | Opacidad    |
|-------------------------|-------------------|-------------|
| Micro gotas             | `#FFFFFF`         | 40% – 70%   |
| Burbujas                | Iridiscente       | 20% – 50%   |
| Nanopartículas activas  | `#00FF85`         | 60% – 100%  |
| Nanopartículas de agua  | `#00C4FF`         | 50% – 80%   |
| Vapor molecular         | `#FFFFFF`         | 10% – 30%   |

---

## REGLA DE DECISIÓN

> Antes de agregar partículas a una escena, pregunta:  
> **¿Estas partículas representan una sustancia real del proceso de limpieza o ingeniería?**  
> Si la respuesta es NO → rediseñar con alguno de los tipos aprobados.
