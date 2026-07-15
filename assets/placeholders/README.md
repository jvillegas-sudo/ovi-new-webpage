# OAL — Placeholders

## Propósito

Activos de marcador de posición corporativos para ser utilizados
mientras los activos definitivos están en desarrollo. Reemplazan
cualquier geometría primitiva visible (cajas, cilindros, esferas)
con representaciones elegantes que comunican identidad OVI.

## Regla de Uso

**Queda prohibido mostrar geometrías básicas como representación
de activos industriales.** Mientras un activo definitivo no exista:

- ✅ Usar placeholder corporativo de este directorio
- ✅ Mostrar "Activo OVI en desarrollo"
- ✅ Usar fotografía oficial cuando esté disponible
- ❌ Nunca mostrar un cubo
- ❌ Nunca mostrar un cilindro como vehículo o tanque
- ❌ Nunca usar geometrías primitivas como representación final

## Placeholders Disponibles

| ID             | Nombre                     | Uso                              |
|----------------|----------------------------|----------------------------------|
| OAL-PH-001     | Placeholder Vehículo       | Transporte (camión, bus)         |
| OAL-PH-002     | Placeholder Industria      | Equipos y maquinaria industrial  |
| OAL-PH-003     | Placeholder Producto       | Envases y productos OVI          |
| OAL-PH-004     | Placeholder Instalación    | Edificios e instalaciones        |

## Componente 3D (Código)

El placeholder 3D oficial está implementado en:

```
src/lib/oal/OalAssetPlaceholder.tsx
```

Este componente muestra una representación holográfica con la leyenda
"Activo OVI en desarrollo" y debe ser utilizado en todas las escenas
3D donde el activo definitivo no haya sido integrado aún.

## Formatos Permitidos

- `.webp` — placeholder fotográfico corporativo
- `.svg` — placeholder vectorial minimalista
- `.glb` — marcador de posición 3D genérico

## Convenciones de Nombres

```
OAL-PH-{NNN}_{tipo}_{variante}.{ext}
```

Ejemplos:
- `OAL-PH-001_vehicle_dark.webp`
- `OAL-PH-002_industry_dark.webp`
- `OAL-PH-003_product_dark.webp`
