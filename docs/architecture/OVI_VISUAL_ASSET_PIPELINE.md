# OVI Visual Asset Pipeline — WO 015

## Ruta base del sistema visual

- Librería modular OVI DNA: `/home/runner/work/ovi-new-webpage/ovi-new-webpage/src/three/ovi-dna/`
- Integración principal Home: `/home/runner/work/ovi-new-webpage/ovi-new-webpage/src/features/home/HomeCinematicJourney.tsx`

## 1) Ingreso de modelo GLB/GLTF

1. Guardar archivo en `src/assets/models/<categoria>/<asset>.glb`.
2. Comprimir con Draco + mallas optimizadas antes de commit.
3. Cargar con `useGLTF` en componente de escena (R3F).
4. Registrar props configurables (escala, posición, roughness, metalness) con tipado estricto.

## 2) Optimización recomendada

- Triángulos objetivo por asset hero: 50k–120k.
- Triángulos objetivo por asset secundario: 10k–40k.
- Texturas: priorizar 1024/2048, evitar 4K salvo primer plano validado.
- Activar compresión Draco en export.
- Reducir materiales duplicados mediante material sharing.

## 3) Asignación de materiales OVI

- Vidrio/líquido: `LiquidGlassMaterial`.
- Acero inoxidable: `BrushedSteelMaterial`.
- Superficie húmeda industrial: `WetIndustrialSurface`.
- Mantener semántica de color:
  - Azul = análisis / tecnología
  - Verde = solución / sostenibilidad
  - Blanco = resultado limpio

## 4) Integración de escenas exportadas desde Spline

1. Exportar desde Spline como GLTF/GLB optimizado.
2. Convertir en pipeline interno (limpieza de nodos no usados, bake de animaciones necesarias).
3. Importar como activo Three.js dentro de `src/assets/models/spline/`.
4. Mantener Three.js/R3F como motor runtime principal.

## 5) Punto de integración futuro para Gaussian Splats

- Ubicación sugerida: `src/three/integrations/gaussian-splats/`.
- Estrategia:
  1. Dynamic import del renderer de splats.
  2. Fallback inmediato a `RealMediaPortal`/imagen optimizada si no hay soporte.
  3. Feature flag por dispositivo y presupuesto GPU.

## 6) Fotos y videos oficiales

1. Almacenar media aprobada en CDN oficial o `public/media/official/`.
2. Registrar metadata en fuente de conocimiento (sector, caso, fecha, origen oficial).
3. Consumir en `RealMediaPortal` con estado:
   - `official`: activo aprobado
   - `pending`: placeholder pendiente de validación oficial
4. Prohibido inventar fotos o videos.

## 7) Compatibilidad requerida

- GLB/GLTF
- Draco
- KTX2 (cuando aplique)
- Spline exports (vía GLTF/GLB)
- Gaussian Splats (punto de integración documentado)
- Fotografías y video optimizado

## 8) Límites de peso recomendados

- Hero critical path (modelos + texturas iniciales): ≤ 6 MB comprimido.
- Asset individual hero: ≤ 2 MB comprimido.
- Video web (1080p): 2–6 Mbps (H.264/H.265 según compatibilidad).
- Imagen web: preferir WebP/AVIF ≤ 400 KB por recurso principal.

## 9) Convenciones de nombres

- Modelos: `ovi-<dominio>-<uso>-vNN.glb`
- Texturas: `tx-<material>-<res>-vNN.ktx2|webp`
- Videos: `vid-<sector>-<caso>-vNN.mp4`
- Portales media: `portal-<sector>-<asset-id>`

## 10) Estrategia de lazy loading

- `dynamic()` para bloques visuales no críticos.
- Carga diferida por escena activa (scroll position).
- Suspense + fallback accesible (texto/imagen optimizada).
- Degradación progresiva por `threePerformanceLevel` y reduced motion.

## 11) Checklist operativo de ingreso de activos

- [ ] Activo proviene de fuente oficial OVI.
- [ ] Peso y geometría dentro de presupuesto.
- [ ] Material OVI DNA asignado.
- [ ] Fallback para reduced motion y bajo rendimiento.
- [ ] Nombre y versión cumplen convención.
- [ ] Validación en `npm run lint`, `npm run type-check`, `npm run build`.
