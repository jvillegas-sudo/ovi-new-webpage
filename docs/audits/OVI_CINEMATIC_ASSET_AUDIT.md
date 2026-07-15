# OVI Cinematic Asset Audit — WO 015

## Alcance auditado

- Home cinematográfico: `/home/runner/work/ovi-new-webpage/ovi-new-webpage/src/features/home/HomeCinematicJourney.tsx` (estado previo a WO-015).
- Escenas auditadas: Hero + tres primeras escenas cinematográficas del Home.

## Inventario técnico

| #   | ID interno             | Archivo / ruta                               | Componente render   | Escena           | Tipo                                    | Función narrativa actual                  | Rol             | Dependencias técnicas                  | Impacto rendimiento | Decisión    | Reemplazo OVI DNA propuesto                                     |
| --- | ---------------------- | -------------------------------------------- | ------------------- | ---------------- | --------------------------------------- | ----------------------------------------- | --------------- | -------------------------------------- | ------------------- | ----------- | --------------------------------------------------------------- |
| 1   | `WaterSurface`         | `src/features/home/HomeCinematicJourney.tsx` | `WaterSurface`      | Hero             | Geometría + Material                    | Piso húmedo reflectivo                    | Protagonista    | R3F, Three MeshStandardMaterial        | Medio               | TRANSFORMAR | `WaterRippleSurface` + `WetIndustrialSurface`                   |
| 2   | `WaterDrop`            | `src/features/home/HomeCinematicJourney.tsx` | `WaterDrop`         | Hero escena 1    | Geometría                               | Gota de arranque                          | Protagonista    | R3F `useFrame`                         | Bajo                | TRANSFORMAR | `PrecisionWaterDrop` con refracción/Fresnel                     |
| 3   | `WaterRipples`         | `src/features/home/HomeCinematicJourney.tsx` | `WaterRipples`      | Hero escena 2    | Geometría                               | Ondas de impacto                          | Protagonista    | R3F + `ringGeometry`                   | Bajo                | TRANSFORMAR | `WaterRippleSurface` con limpieza narrativa                     |
| 4   | `MicroDropletField`    | `src/features/home/HomeCinematicJourney.tsx` | `MicroDropletField` | Hero/ambiente    | Partículas                              | Spray ambiental genérico                  | Ambiental       | `Points`, `bufferGeometry`             | Medio               | TRANSFORMAR | `MicroDropletField` modular con calidad adaptable               |
| 5   | `FoamBubbles`          | `src/features/home/HomeCinematicJourney.tsx` | `FoamBubbles`       | Hero             | Partículas/Geometría                    | Espuma superficial                        | Secundario      | `SphereGeometry`, animación sinusoidal | Bajo                | TRANSFORMAR | `PremiumFoamLayer` con significado químico                      |
| 6   | `OVILogo`              | `src/features/home/HomeCinematicJourney.tsx` | `OVILogo`           | Hero escena 3    | Geometría abstracta                     | Logo 3D construido con toroides/cilindros | Protagonista    | Torus/Cylinder/Sphere                  | Medio               | REEMPLAZAR  | `OviLogoReveal` con activo oficial `/public/brand/ovi-logo.svg` |
| 7   | `IndustrialAssets`     | `src/features/home/HomeCinematicJourney.tsx` | `IndustrialAssets`  | Escena A inicial | Geometría                               | Tanques/tuberías industriales             | Protagonista    | Cylinder/Torus/Plane                   | Medio               | TRANSFORMAR | `WetIndustrialSurface` + etiquetas de inspección                |
| 8   | `InspectionBeam`       | `src/features/home/HomeCinematicJourney.tsx` | `InspectionBeam`    | Escena A/B       | Luz                                     | Barrido de inspección                     | Protagonista    | Plane meshes + emissive                | Bajo                | TRANSFORMAR | `InspectionLightSweep` reutilizable                             |
| 9   | `SteamParticles`       | `src/features/home/HomeCinematicJourney.tsx` | `SteamParticles`    | Escena A/C       | Partículas                              | Vapor industrial                          | Secundario      | `Points` + velocidades                 | Medio               | TRANSFORMAR | `TechnicalSteamVolume` con degradación progresiva               |
| 10  | `AICore`               | `src/features/home/HomeCinematicJourney.tsx` | `AICore`            | Escena posterior | Geometría abstracta (icosaedro)         | Núcleo tecnológico genérico               | Protagonista    | Icosahedron + torus orbit              | Medio               | REEMPLAZAR  | Portales de sectores + transformación de limpieza               |
| 11  | `EcosystemOrbit`       | `src/features/home/HomeCinematicJourney.tsx` | `EcosystemOrbit`    | Escena posterior | Geometría abstracta (esferas orbitales) | Ecosistema genérico                       | Protagonista    | Sphere/Torus orbit                     | Medio               | REEMPLAZAR  | `RealMediaPortal` integrado a superficies técnicas              |
| 12  | `CinematicLighting`    | `src/features/home/HomeCinematicJourney.tsx` | `CinematicLighting` | Todas            | Luz                                     | Clima cinematográfico azul/verde          | Ambiental       | Spot + Point lights                    | Bajo                | CONSERVAR   | Ajuste semántico azul/verde/blanco                              |
| 13  | `SceneEnvironment`     | `src/three/components/SceneEnvironment.tsx`  | `SceneEnvironment`  | Todas            | Fondo/Environment                       | Ambiente nocturno                         | Ambiental       | drei preset                            | Bajo                | CONSERVAR   | Mantener preset night con control de intensidad                 |
| 14  | `PostProcessing`       | `src/three/components/PostProcessing.tsx`    | `PostProcessing`    | Todas            | Postprocesado                           | Glow premium                              | Ambiental       | postprocessing + R3F                   | Medio               | CONSERVAR   | Mantener y desactivar en reduced motion                         |
| 15  | Rail indicador escenas | `src/features/home/HomeCinematicJourney.tsx` | JSX UI              | Todas            | UI Overlay                              | Estado de progreso                        | Secundario      | React + Tailwind                       | Bajo                | CONSERVAR   | Mantener                                                        |
| 16  | CTAs Hero              | `src/features/home/HomeCinematicJourney.tsx` | JSX UI              | Hero             | UI Overlay                              | Acciones primarias                        | Protagonista UI | React + Next Link                      | Bajo                | TRANSFORMAR | Ajustar a “Iniciar la Experiencia” y “Resolver un desafío”      |

## Hallazgos obligatorios solicitados

| Elemento buscado                 | Estado en Home actual (pre-WO015)                     | Acción      |
| -------------------------------- | ----------------------------------------------------- | ----------- |
| Montañas                         | No detectadas                                         | N/A         |
| Rocas                            | No detectadas                                         | N/A         |
| Terrenos                         | No detectados                                         | N/A         |
| Poliedros                        | Sí (`AICore` usa icosaedro)                           | REEMPLAZAR  |
| Esferas abstractas               | Sí (`EcosystemOrbit`, nodos de `AICore`)              | REEMPLAZAR  |
| Cubos                            | No protagonistas                                      | N/A         |
| Túneles geométricos              | No detectados                                         | N/A         |
| Formas generativas               | Sí (orbitales abstractas)                             | REEMPLAZAR  |
| Partículas genéricas             | Sí (`MicroDropletField` previo)                       | TRANSFORMAR |
| Líneas sin significado           | Parcial (`InspectionBeam` sin semántica completa)     | TRANSFORMAR |
| Fondos espaciales                | No detectados                                         | N/A         |
| Objetos abstractos protagonistas | Sí (`OVILogo` geométrico, `AICore`, `EcosystemOrbit`) | REEMPLAZAR  |

## Resultado de auditoría

La narrativa visual del Home previo tenía base cinematográfica válida, pero conservaba protagonistas abstractos sin vínculo directo con Ingeniería en Limpieza. Se aprueba sustitución inmediata por módulos OVI DNA orientados a agua controlada, superficies industriales, inspección técnica y reveal del logo oficial OVI.
