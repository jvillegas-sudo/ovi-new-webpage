# OVI Asset Library — OAL Specification

**Versión:** 1.0  
**Estado:** Activo  
**Work Order:** WO-016  
**Propietario:** OVI — Ingeniería en Limpieza

---

## 1. Arquitectura

La OVI Asset Library (OAL) es la biblioteca oficial de activos visuales
reutilizables para todo el ecosistema OVI. Su propósito es garantizar
coherencia visual, calidad industrial y rendimiento óptimo en todas las
experiencias digitales de la empresa.

### 1.1 Estructura de Directorios

```
assets/
  transport/       — Vehículos industriales y de transporte
  industry/        — Equipos y activos industriales
  institutional/   — Entornos y activos del sector institucional
  products/        — Productos OVI (envases, dosificadores, equipos)
  materials/       — Biblioteca de materiales PBR reutilizables
  effects/         — Activos de efectos especiales
  environment/     — HDRI, skyboxes, entornos de escena
  ui/              — Assets de interfaz de usuario 3D
  placeholders/    — Marcadores de posición corporativos
```

### 1.2 Arquitectura de Código

```
src/lib/oal/
  index.ts                 — Exports públicos de la OAL
  catalog.ts               — Catálogo tipado de activos
  materials.ts             — Definiciones de materiales oficiales OVI
  loader.ts                — Cargador de activos con Draco + Suspense
  OalAssetPlaceholder.tsx  — Componente 3D de marcador de posición
```

---

## 2. Convenciones

### 2.1 Identificadores de Activos

```
OAL-{CATEGORÍA}-{NNN}
```

| Categoría | Prefijo | Ejemplo       |
|-----------|---------|---------------|
| Transport | TR      | OAL-TR-001    |
| Industry  | IN      | OAL-IN-002    |
| Institutional | IS  | OAL-IS-001    |
| Products  | PR      | OAL-PR-001    |
| Materials | MAT     | OAL-MAT-001   |
| Effects   | EF      | OAL-EF-001    |
| Environment | ENV   | OAL-ENV-001   |
| UI        | UI      | OAL-UI-001    |
| Placeholder | PH    | OAL-PH-001    |

### 2.2 Convención de Nombres de Archivos

```
{ID}_{nombre-kebab}_{lod}.{ext}
```

Ejemplos:
- `OAL-TR-001_camion-recolector_lod0.glb`
- `OAL-IN-002_tanque-industrial_lod1.glb`
- `OAL-MAT-001_ovi-steel/albedo.ktx2`

### 2.3 Escala

Todos los activos deben estar en escala real:
- Unidad: metros
- Eje Y = arriba
- Activo centrado en el origen (0, 0, 0) a nivel del suelo

---

## 3. Materiales

### 3.1 Materiales Oficiales OVI

La plataforma OVI utiliza una biblioteca compartida de materiales PBR.
Ninguna escena debe definir materiales independientes para activos
industriales contemplados en esta biblioteca.

| ID          | Nombre              | metalness | roughness | notas                    |
|-------------|---------------------|-----------|-----------|--------------------------|
| OAL-MAT-001 | OVI Steel           | 0.92      | 0.28      | Acero industrial cepillado |
| OAL-MAT-002 | OVI Glass           | 0.05      | 0.04      | Vidrio templado claro    |
| OAL-MAT-003 | OVI Water           | 0.10      | 0.02      | Superficie líquida       |
| OAL-MAT-004 | OVI Foam            | 0.00      | 0.98      | Espuma de limpieza       |
| OAL-MAT-005 | OVI Mist            | 0.00      | 1.00      | Niebla y vapor           |
| OAL-MAT-006 | OVI Concrete        | 0.00      | 0.90      | Concreto industrial      |
| OAL-MAT-007 | OVI Industrial Paint| 0.05      | 0.45      | Pintura de equipos       |
| OAL-MAT-008 | OVI Rubber          | 0.00      | 0.95      | Goma / neumáticos        |
| OAL-MAT-009 | OVI Plastic         | 0.00      | 0.55      | Plástico de envases      |

### 3.2 Integración en Código

```tsx
import { OVI_MATERIALS } from '@lib/oal';

// Uso en R3F
<meshStandardMaterial {...OVI_MATERIALS.steel} />
<meshStandardMaterial {...OVI_MATERIALS.rubber} />
```

---

## 4. Pipeline de Activos

### 4.1 Origen de Activos

Los activos OAL pueden provenir de:

- **Blender** — modelado propio o licenciado
- **Spline** — activos interactivos y de UI
- **Activos licenciados** — Sketchfab, TurboSquid u otros con licencia comercial
- **Fotogrametría** — escaneado 3D de activos reales
- **Gaussian Splatting** — representación volumétrica (preparado para integración futura)

### 4.2 Proceso de Integración

```
1. Modelado / Adquisición del activo
2. Revisión de proporciones y escala real
3. Aplicación de materiales OAL (OVI Steel, OVI Rubber, etc.)
4. Horneado de texturas PBR (albedo, normal, ORM)
5. Compresión de texturas a KTX2
6. Exportación a GLB con compresión Draco
7. Generación de LODs (lod0, lod1, lod2)
8. Preparación de hotspots (nodos vacíos `hotspot_*`)
9. Prueba en escena de referencia OVI
10. Registro en catálogo OAL (catalog.ts)
```

### 4.3 Herramientas de Procesamiento

- **Draco Encoder** — compresión de geometría para GLB
- **KTX2 / Basis Universal** — compresión de texturas
- **gltf-transform** — optimización y LOD de archivos GLTF/GLB
- **meshoptimizer** — simplificación de malla para LODs

---

## 5. Optimización Web

### 5.1 Estrategias

| Estrategia       | Implementación                              |
|------------------|---------------------------------------------|
| Lazy Loading     | `React.lazy` + `Suspense` por activo        |
| LOD              | `useGLTF` con variante según distancia      |
| Draco            | Activado en `DRACOLoader` de drei           |
| KTX2             | `KTX2Loader` de three para texturas         |
| Instancing       | `InstancedMesh` para activos repetidos      |
| Frustum Culling  | Automático en Three.js (verificar bounds)   |
| Dynamic Imports  | Cada activo como chunk separado en webpack  |

### 5.2 Cargador OAL

El cargador oficial está en `src/lib/oal/loader.ts`:

```tsx
import { useOalAsset } from '@lib/oal';

function MyScene() {
  const { scene } = useOalAsset('OAL-TR-001');
  return <primitive object={scene} />;
}
```

### 5.3 Presupuesto de Rendimiento

| LOD   | Polígonos máx. | Texturas máx. | Peso máx. |
|-------|---------------|---------------|-----------|
| LOD-0 | 100,000       | 4 × 2K KTX2   | 8 MB      |
| LOD-1 | 25,000        | 2 × 1K KTX2   | 3 MB      |
| LOD-2 | 5,000         | 1 × 512 KTX2  | 1 MB      |

---

## 6. Integración en Escenas

### 6.1 Uso del Catálogo

```tsx
import { OAL_CATALOG, OalAssetStatus } from '@lib/oal';

const asset = OAL_CATALOG['OAL-TR-001'];
// { id, name, category, status, path, lods, hotspots, animations }
```

### 6.2 Componente de Placeholder

Mientras un activo definitivo no esté integrado, usar siempre el
componente `OalAssetPlaceholder`:

```tsx
import { OalAssetPlaceholder } from '@lib/oal';

// En escena R3F
<OalAssetPlaceholder
  assetId="OAL-TR-001"
  weight={1}
/>
```

Nunca usar `<boxGeometry>`, `<cylinderGeometry>` u otras primitivas
como representación visual de un activo industrial o de transporte.

---

## 7. Hotspots

### 7.1 Convención de Nodos

Los hotspots se definen como nodos vacíos en el modelo 3D con el
prefijo `hotspot_`:

```
hotspot_front       — Punto frontal del activo
hotspot_engine      — Motor / zona técnica
hotspot_label       — Etiqueta del producto (para envases)
hotspot_cap         — Tapa / cierre del envase
```

### 7.2 Extracción en Código

```tsx
import { extractHotspots } from '@lib/oal';

const hotspots = extractHotspots(scene);
// [{ name: 'hotspot_front', position: Vector3, ... }]
```

---

## 8. LOD (Level of Detail)

### 8.1 Sistema de LOD

```tsx
import { useOalLod } from '@lib/oal';

function VehicleAsset() {
  const lod = useOalLod('OAL-TR-001', cameraDistance);
  // lod = 'lod0' | 'lod1' | 'lod2'

  const { scene } = useOalAsset(`OAL-TR-001`, lod);
  return <primitive object={scene} />;
}
```

### 8.2 Umbrales de Distancia

| Distancia a cámara | LOD activo |
|--------------------|------------|
| 0–10 m             | LOD-0      |
| 10–30 m            | LOD-1      |
| > 30 m             | LOD-2      |

---

## 9. Animaciones

### 9.1 Convención de Nombres

| Nombre          | Descripción                              |
|-----------------|------------------------------------------|
| `idle`          | Estado en reposo                         |
| `contaminated`  | Transición a estado contaminado          |
| `clean`         | Transición a estado limpio               |
| `pour`          | Vertido de producto (envases)            |
| `open`          | Apertura (tapa, puerta, compuerta)       |
| `loop`          | Animación en loop continuo               |

### 9.2 Reproducción

```tsx
import { useOalAnimation } from '@lib/oal';

function VehicleScene({ isClean }: { isClean: boolean }) {
  const { playAnimation } = useOalAnimation(scene, mixer);

  useEffect(() => {
    playAnimation(isClean ? 'clean' : 'contaminated');
  }, [isClean]);
}
```

---

## 10. Directiva de Calidad

### Prohibiciones

Queda **prohibido** representar visualmente activos industriales o
de transporte mediante:

- `<boxGeometry>` / `BoxGeometry`
- `<sphereGeometry>` / `SphereGeometry`
- `<cylinderGeometry>` / `CylinderGeometry`
- `<coneGeometry>` / `ConeGeometry`
- Combinaciones de primitivas como representación final

### Uso permitido de primitivas

Las primitivas geométricas **solo** pueden usarse para:

- Depuración (debug mode)
- Colisiones invisibles
- Bounding boxes de escaneo holográfico
- Hotspots invisibles
- Efectos de partículas abstractas (agua, espuma, vapor)
- Planos de suelo/reflejo abstractos

Nunca como representación visual de un vehículo, equipo industrial
o producto.

---

## Catálogo de Activos — Estado Actual

### Transporte

| ID         | Nombre              | Estado     |
|------------|---------------------|------------|
| OAL-TR-001 | Camión Recolector   | Pendiente  |
| OAL-TR-002 | Bus Urbano          | Pendiente  |
| OAL-TR-003 | Tractocamión        | Pendiente  |
| OAL-TR-004 | Camión de Carga     | Pendiente  |

### Industria

| ID         | Nombre                | Estado     |
|------------|-----------------------|------------|
| OAL-IN-001 | Panel Solar           | Pendiente  |
| OAL-IN-002 | Tanque Industrial     | Pendiente  |
| OAL-IN-003 | Banda Transportadora  | Pendiente  |
| OAL-IN-004 | Piso Industrial       | Pendiente  |
| OAL-IN-005 | Fachada               | Pendiente  |

---

*OVI Asset Library — Versión 1.0 — WO-016*
