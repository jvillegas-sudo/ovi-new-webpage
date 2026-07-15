# OAL — Environment Assets

## Propósito

Entornos 3D e iluminación para escenas OVI: HDRI de entornos
industriales, urbanos y nocturnos, fondos de escena, skyboxes
y mapas de iluminación. También incluye terrenos, suelos y
elementos de escenario reutilizables.

## Tipos de Activos

| Tipo         | Descripción                                     |
|--------------|-------------------------------------------------|
| HDRI         | Iluminación de entorno para escenas PBR         |
| Skybox       | Fondos de cielo para escenas exteriores         |
| Terreno      | Suelos industriales, pavimentos, plataformas    |
| Escenario    | Edificios, estructuras de fondo, ambientación   |

## Formatos Permitidos

- `.hdr` / `.exr` — HDRI sin comprimir (edición)
- `.ktx2` — HDRI comprimido para producción web
- `.glb` — elementos de escenario 3D
- `.webp` — texturas de terreno y fondo

## Peso Máximo

| Tipo     | Peso máximo |
|----------|-------------|
| HDRI     | 4 MB (KTX2) |
| GLB      | 5 MB        |
| Textura  | 2 MB        |

## Convenciones de Nombres

```
OAL-ENV-{NNN}_{nombre-kebab}.{ext}
```

Ejemplos:
- `OAL-ENV-001_industrial-night.ktx2`
- `OAL-ENV-002_urban-dawn.ktx2`
- `OAL-ENV-003_workshop-interior.ktx2`

## Estándar de Calidad

- HDRI: mínimo 2K resolución comprimida a KTX2
- Escenarios alineados con la estética OVI (oscura, industrial, premium)
- Sin elementos que rompan la coherencia de la identidad visual
