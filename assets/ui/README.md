# OAL — UI Assets

## Propósito

Recursos visuales para la interfaz de usuario: iconos 3D, elementos
holográficos, badges animados, logos y activos de marca utilizados
en overlays, paneles informativos y componentes interactivos OVI.

## Tipos de Activos

| Tipo           | Descripción                                          |
|----------------|------------------------------------------------------|
| Iconos 3D      | Representaciones tridimensionales de iconos OVI      |
| Holográficos   | Marcos, paneles y elementos de UI holográfica        |
| Logos          | Logo OVI en formatos optimizados para web            |
| Badges         | Insignias animadas para identificación de sectores   |
| Tipografía     | Assets de tipografía 3D para escenas                 |

## Formatos Permitidos

- `.glb` — iconos y elementos 3D
- `.svg` — iconos planos y logos vectoriales
- `.webp` / `.png` — badges y elementos rasterizados
- Spline Export — elementos interactivos

## Peso Máximo

| Tipo       | Peso máximo |
|------------|-------------|
| GLB        | 500 KB      |
| SVG        | 50 KB       |
| Imagen     | 200 KB      |

## Convenciones de Nombres

```
OAL-UI-{NNN}_{nombre-kebab}.{ext}
```

Ejemplos:
- `OAL-UI-001_ovi-logo-3d.glb`
- `OAL-UI-002_holographic-panel.glb`
- `OAL-UI-003_sector-badge-transporte.webp`

## Estándar de Calidad

- Consistencia con el sistema de diseño OVI (colores brand, glassmorphism)
- SVGs optimizados con SVGO
- Sin assets que rompan la paleta de colores oficial
