# OAL — Transport Assets

## Propósito

Modelos 3D de vehículos industriales y de transporte utilizados en las
experiencias OVI. Incluye camiones recolectores, buses urbanos,
tractocamiones y vehículos de carga que protagonizan las escenas de
limpieza y mantenimiento.

## Activos del Catálogo

| ID         | Nombre              | Estado                    |
|------------|---------------------|---------------------------|
| OAL-TR-001 | Camión Recolector   | Pendiente de integración  |
| OAL-TR-002 | Bus Urbano          | Pendiente de integración  |
| OAL-TR-003 | Tractocamión        | Pendiente de integración  |
| OAL-TR-004 | Camión de Carga     | Pendiente de integración  |

## Formatos Permitidos

- `.glb` — preferido para activos optimizados para web
- `.gltf` — cuando se requiere separación de texturas
- Spline Export — para activos diseñados en Spline

## Peso Máximo por Activo

| LOD   | Peso máximo |
|-------|-------------|
| LOD-0 | 8 MB        |
| LOD-1 | 3 MB        |
| LOD-2 | 1 MB        |

El archivo `.glb` debe incluir LOD comprimido con Draco.
Las texturas deben estar en formato KTX2 siempre que sea posible.

## Convenciones de Nombres

```
OAL-TR-{NNN}_{nombre-kebab}_{lod}.glb
```

Ejemplos:
- `OAL-TR-001_camion-recolector_lod0.glb`
- `OAL-TR-002_bus-urbano_lod1.glb`
- `OAL-TR-004_camion-carga_lod2.glb`

## Estándar de Calidad

- Escala real en metros (eje Y = arriba)
- Materiales PBR (metalness/roughness workflow)
- Hotspots preparados como nodos vacíos con nombre `hotspot_*`
- Animaciones nombradas: `idle`, `clean`, `contaminated`
- Sin primitivas básicas visibles
- Optimizado para `@react-three/drei` `useGLTF` con Draco
