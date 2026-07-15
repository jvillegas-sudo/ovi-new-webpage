# OAL — Materials

## Propósito

Materiales PBR reutilizables compartidos por toda la plataforma OVI.
Ninguna escena debe crear materiales independientes para activos que
ya están contemplados aquí. Toda la plataforma comparte esta biblioteca.

## Materiales Oficiales OVI

| ID               | Nombre              | Uso principal                                     |
|------------------|---------------------|---------------------------------------------------|
| OAL-MAT-001      | OVI Steel           | Carrocería de vehículos, estructuras metálicas    |
| OAL-MAT-002      | OVI Glass           | Parabrisas, fachadas de vidrio                    |
| OAL-MAT-003      | OVI Water           | Superficies de agua, líquidos de limpieza         |
| OAL-MAT-004      | OVI Foam            | Espuma de limpieza, aplicación de productos       |
| OAL-MAT-005      | OVI Mist            | Vapor, niebla, efectos de limpieza a presión      |
| OAL-MAT-006      | OVI Concrete        | Pisos industriales, fachadas de concreto          |
| OAL-MAT-007      | OVI Industrial Paint| Pintura de equipos, señalización industrial       |
| OAL-MAT-008      | OVI Rubber          | Neumáticos, juntas, mangueras                     |
| OAL-MAT-009      | OVI Plastic         | Envases de productos, paneles de control          |

## Formatos Permitidos

- `.glb` — materiales con texturas embebidas como referencia
- `.ktx2` — texturas comprimidas para producción
- `.webp` / `.png` — texturas sin comprimir para edición

## Estructura de Archivos

```
materials/
  OAL-MAT-001_ovi-steel/
    albedo.ktx2
    normal.ktx2
    orm.ktx2          (occlusion-roughness-metalness packed)
    preview.webp
  OAL-MAT-002_ovi-glass/
    ...
```

## Convenciones de Nombres

```
OAL-MAT-{NNN}_{nombre-kebab}/
  albedo.ktx2
  normal.ktx2
  orm.ktx2
  preview.webp
```

## Estándar de Calidad

- Workflow: metalness/roughness (PBR)
- Resolución máxima de texturas: 2048×2048 (KTX2 comprimido)
- Todas las texturas deben tener versión KTX2 para producción
- Cada material incluye `preview.webp` para catálogo
- Los valores de metalness/roughness deben ser físicamente correctos

## Regla de uso

Todo activo visible de la plataforma OVI debe utilizar materiales
de esta biblioteca. Queda prohibido crear materiales únicos por escena
para activos industriales o de transporte.
