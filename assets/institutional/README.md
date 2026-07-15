# OAL — Institutional Assets

## Propósito

Modelos 3D para el sector institucional: edificios, interiores de
hospitales, colegios, centros comerciales, cocinas industriales y
entornos de servicios. Utilizados en experiencias de limpieza locativa
e institucional de OVI.

## Formatos Permitidos

- `.glb` — preferido
- `.gltf` — cuando se requiere separación de texturas
- `.webp` / `.png` — texturas
- Spline Export
- HDRI — para iluminación de entornos institucionales

## Peso Máximo por Activo

| LOD   | Peso máximo |
|-------|-------------|
| LOD-0 | 5 MB        |
| LOD-1 | 2 MB        |
| LOD-2 | 512 KB      |

## Convenciones de Nombres

```
OAL-IS-{NNN}_{nombre-kebab}_{lod}.glb
```

Ejemplos:
- `OAL-IS-001_cocina-industrial_lod0.glb`
- `OAL-IS-002_fachada-vidrio_lod1.glb`

## Estándar de Calidad

- Escala real en metros
- Materiales PBR de la biblioteca OAL
- Hotspots preparados como nodos vacíos `hotspot_*`
- Sin primitivas básicas visibles
- Optimizado para Draco + KTX2
