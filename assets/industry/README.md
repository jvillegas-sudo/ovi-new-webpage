# OAL — Industry Assets

## Propósito

Modelos 3D de equipos y activos industriales: paneles solares, tanques
industriales, bandas transportadoras, pisos industriales y fachadas.
Utilizados en experiencias que ilustran servicios de limpieza de OVI
en plantas de producción, refinerías y entornos industriales.

## Activos del Catálogo

| ID         | Nombre                 | Estado                    |
|------------|------------------------|---------------------------|
| OAL-IN-001 | Panel Solar            | Pendiente de integración  |
| OAL-IN-002 | Tanque Industrial      | Pendiente de integración  |
| OAL-IN-003 | Banda Transportadora   | Pendiente de integración  |
| OAL-IN-004 | Piso Industrial        | Pendiente de integración  |
| OAL-IN-005 | Fachada                | Pendiente de integración  |

## Formatos Permitidos

- `.glb` — preferido para activos optimizados para web
- `.gltf` — cuando se requiere separación de texturas
- `.webp` / `.png` — para texturas independientes
- Spline Export — para activos diseñados en Spline

## Peso Máximo por Activo

| LOD   | Peso máximo |
|-------|-------------|
| LOD-0 | 6 MB        |
| LOD-1 | 2 MB        |
| LOD-2 | 512 KB      |

## Convenciones de Nombres

```
OAL-IN-{NNN}_{nombre-kebab}_{lod}.glb
```

Ejemplos:
- `OAL-IN-001_panel-solar_lod0.glb`
- `OAL-IN-002_tanque-industrial_lod1.glb`
- `OAL-IN-003_banda-transportadora_lod0.glb`

## Estándar de Calidad

- Escala real en metros (eje Y = arriba)
- Materiales PBR — preferir materiales de la OAL (OVI Steel, OVI Concrete, etc.)
- Sin primitivas básicas visibles
- Hotspots preparados como nodos vacíos con nombre `hotspot_*`
- Optimizado para `@react-three/drei` `useGLTF` con Draco
