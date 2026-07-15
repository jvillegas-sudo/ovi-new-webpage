# OAL — Product Assets

## Propósito

Modelos 3D de los productos OVI: bidones, envases, dosificadores,
kits de limpieza y equipos OVI WASH. Cada producto debe soportar
modelo 3D completo, etiqueta, materiales, animaciones, estados,
hotspots e información técnica.

## Estructura por Producto

```
products/
  ovi-handsol/
    model_lod0.glb
    model_lod1.glb
    label.webp
    technical-sheet.json
  ovi-biodex/
    ...
```

## Soporte por Activo

Cada activo de producto debe soportar:

- **Modelo 3D** — geometría realista del envase
- **Etiqueta** — textura PNG/WEBP de alta resolución
- **Materiales** — OVI Plastic / OVI Glass según corresponda
- **Animaciones** — `idle`, `open`, `pour`
- **Estados** — `full`, `half`, `empty`
- **Hotspots** — `hotspot_label`, `hotspot_cap`, `hotspot_bottom`
- **Información técnica** — JSON con ficha técnica vinculada

## Formatos Permitidos

- `.glb` — modelo principal con texturas embebidas
- `.webp` — etiqueta de alta resolución
- `.png` — si se requiere canal alpha en etiqueta
- `.json` — metadata técnica del producto

## Peso Máximo por Producto

| LOD   | Peso máximo |
|-------|-------------|
| LOD-0 | 3 MB        |
| LOD-1 | 1 MB        |
| LOD-2 | 256 KB      |

## Convenciones de Nombres

```
OAL-PR-{NNN}_{id-producto}_{lod}.glb
```

Ejemplos:
- `OAL-PR-001_ovi-handsol_lod0.glb`
- `OAL-PR-002_ovi-biodex_lod1.glb`

## Estándar de Calidad

- Escala real (altura del envase en metros)
- Materiales PBR con etiqueta como textura UV
- Sin primitivas básicas visibles
- Optimizado para visualización en OVI Store y OVI Experience
