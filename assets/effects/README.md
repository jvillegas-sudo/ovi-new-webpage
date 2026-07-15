# OAL — Effects

## Propósito

Activos visuales para efectos especiales: partículas de agua,
espuma, vapor, niebla, efectos de limpieza a presión, destellos
y post-procesado. Estos activos son complementarios a los modelos
3D principales y enriquecen las experiencias OVI.

## Tipos de Efectos

| Tipo          | Descripción                                      |
|---------------|--------------------------------------------------|
| Agua          | Partículas, gotas, impactos, flujos              |
| Espuma        | Capas de espuma, burbujas, aplicación            |
| Vapor         | Volúmenes de vapor, niebla industrial            |
| Destellos     | Reflejo de luz en superficies limpias            |
| Contaminación | Partículas de suciedad, aceite, polvo            |
| Holográficos  | Escaneo, análisis, visualizaciones OVI AI        |

## Formatos Permitidos

- `.glb` — efectos con geometría propia
- `.mp4` — videos de efectos (loop sin audio)
- `.webp` — sprites de efectos de partículas

## Peso Máximo

| Tipo   | Peso máximo |
|--------|-------------|
| Video  | 5 MB (loop) |
| GLB    | 1 MB        |
| Sprite | 512 KB      |

## Convenciones de Nombres

```
OAL-EF-{NNN}_{nombre-kebab}.{ext}
```

Ejemplos:
- `OAL-EF-001_water-impact.glb`
- `OAL-EF-002_foam-application.mp4`
- `OAL-EF-003_steam-volume.glb`

## Regla de Uso

Los efectos de partículas implementados como código Three.js/R3F
(sin activos externos) se documentan en `src/three/ovi-dna/`.
Este directorio contiene únicamente activos externos de efectos.
