# OVI CONTENT MASTER
## Inventario Oficial de Contenido Digital — OVI Ingeniería en Limpieza

> **Foundation Order:** 001  
> **Versión:** 1.0  
> **Estado:** Borrador — Pendiente de aprobación  
> **Idioma maestro:** Español  
> **Última actualización:** 2026-07-15  
> **Mantenido por:** Pendiente de asignación

---

## INSTRUCCIONES DE USO

Este documento es el inventario maestro de todo el contenido digital oficial de OVI.

**Reglas de este inventario:**
- Cada elemento tiene un ID único e irrepetible.
- Si un elemento (fotografía, video, documento) aparece en múltiples contextos, se registra **una sola vez** y se relaciona con múltiples categorías en el campo `Categorías relacionadas`.
- No se generan ni modifican contenidos aquí. Solo se organiza lo existente.
- Este inventario **no modifica** el diseño, React, Three.js, GSAP, OVI Experience, Home, OVI Lab, OVI Store ni OVI AI.
- Toda nueva pieza de contenido debe recibir un ID antes de ser utilizada en la plataforma.

**Sistema de IDs:**

| Prefijo | Categoría            |
|---------|----------------------|
| CASE    | Casos de éxito       |
| PROD    | Productos            |
| SERV    | Servicios            |
| IND     | Industrias / Sectores|
| VIDEO   | Videos               |
| PHOTO   | Fotografías          |
| BROCH   | Brochures            |
| LOGO    | Logos y marca        |
| TECH    | Fichas técnicas      |
| MSDS    | Hojas de seguridad   |

**Leyenda de Estado:**

| Estado        | Descripción                                      |
|---------------|--------------------------------------------------|
| ACTIVO        | Contenido validado y en uso activo               |
| EN-REVISION   | Presente en plataforma, pendiente validación técnica oficial |
| PENDIENTE     | Referenciado en sistema pero sin documentación aún |
| PLACEHOLDER   | Espacio reservado, contenido por producir        |

---

## TABLA DE CONTENIDO

1. [Casos de Éxito](#1-casos-de-éxito)
2. [Productos](#2-productos)
3. [Servicios](#3-servicios)
4. [Industrias / Sectores](#4-industrias--sectores)
5. [Videos](#5-videos)
6. [Fotografías](#6-fotografías)
7. [Brochures](#7-brochures)
8. [Logos](#8-logos)
9. [Fichas Técnicas](#9-fichas-técnicas)
10. [Hojas de Seguridad (MSDS)](#10-hojas-de-seguridad-msds)
11. [Estructura de Carpetas](#11-estructura-de-carpetas)

---

## 1. CASOS DE ÉXITO

**Carpeta de destino:** `docs/content/cases/`

| ID       | Nombre                                   | Descripción                                                                                                          | Categoría       | Sector        | Producto relacionado         | Servicio relacionado                         | Idioma   | Estado    | Fuente                                  | Ubicación futura             |
|----------|------------------------------------------|----------------------------------------------------------------------------------------------------------------------|-----------------|---------------|------------------------------|----------------------------------------------|----------|-----------|-----------------------------------------|------------------------------|
| CASE-001 | Flota de transporte pesado               | Protocolo OVI Solwash en patio de flota pesada: +7,000 unidades/mes, reducción de tiempo de ciclo y estandarización de consumo de agua. | Lavado de flota | Transporte    | PROD-004 (OVI Solwash)       | SERV-001 (Lavado de Flota)                   | ES / EN  | ACTIVO    | `src/knowledge/home/success-cases.ts`   | `docs/content/cases/`        |
| CASE-002 | Planta industrial de manufactura         | Protocolo de desengrase con OVI Desengrasante Industrial en maquinaria y líneas de producción. Trazabilidad completa y cumplimiento HACCP. | Limpieza industrial | Industria  | PROD-001 (OVI Desengrasante Industrial) | SERV-002 (Limpieza Industrial)           | ES / EN  | ACTIVO    | `src/knowledge/home/success-cases.ts`   | `docs/content/cases/`        |
| CASE-003 | Instalación institucional de alto tráfico | Programa de mantenimiento preventivo con OVI Ecoseal. Reducción de limpiezas correctivas y extensión del ciclo de mantenimiento. | Mantenimiento preventivo | Institucional | PROD-002 (OVI Ecoseal)       | SERV-008 (Mantenimiento Preventivo)          | ES / EN  | ACTIVO    | `src/knowledge/home/success-cases.ts`   | `docs/content/cases/`        |

---

## 2. PRODUCTOS

**Carpeta de destino:** `docs/content/products/`

### 2.1 Químicos

| ID       | Nombre                          | Descripción                                                                                                                       | Categoría | Sector                           | Producto relacionado | Servicio relacionado                                                  | Idioma | Estado      | Fuente                                   | Ubicación futura               |
|----------|---------------------------------|-----------------------------------------------------------------------------------------------------------------------------------|-----------|----------------------------------|----------------------|-----------------------------------------------------------------------|--------|-------------|------------------------------------------|--------------------------------|
| PROD-001 | OVI Desengrasante Industrial    | Desengrasante industrial de alto poder 99% biodegradable. Base de cáscara de naranja. Ultradegreaser para industria pesada, automotriz, petrolera y construcción. | Químico   | Industria, Transporte, Energía   | —                    | SERV-002, SERV-005, SERV-006                                          | ES     | ACTIVO      | `src/knowledge/products/catalog.ts`      | `docs/content/products/`       |
| PROD-002 | OVI Ecoseal                     | Sellador para pisos institucionales e industriales. Crea capa protectora que facilita la limpieza diaria y prolonga la vida útil de las superficies. | Químico   | Institucional, Energía, Industria | —                   | SERV-008, SERV-007                                                    | ES     | ACTIVO      | `src/knowledge/products/catalog.ts`      | `docs/content/products/`       |
| PROD-003 | OVI JP 35                       | Desengrasante biodegradable especializado en grasas minerales para maquinaria, motores y equipos industriales.                    | Químico   | Industria, Energía, Transporte   | —                    | SERV-005, SERV-009                                                    | ES     | EN-REVISION | `src/knowledge/products/catalog.ts`      | `docs/content/products/`       |
| PROD-004 | OVI Solwash                     | Detergente especializado 100% biodegradable para lavado de flota vehicular pesada y buses. Cuida el brillo de la pintura, sin solventes. | Químico   | Transporte                       | —                    | SERV-001                                                              | ES     | EN-REVISION | `src/knowledge/products/catalog.ts`      | `docs/content/products/`       |
| PROD-005 | OVI Ecoshine                    | Limpiador de pisos con desinfección y aroma. Triple acción: limpieza profunda, acción bactericida y fragancia duradera.           | Químico   | Institucional, Hospitales, Retail | —                   | SERV-007, SERV-008                                                    | ES     | ACTIVO      | `src/knowledge/products/catalog.ts`      | `docs/content/products/`       |
| PROD-006 | OVI Eco Wax                     | Cera ecológica para pisos que brinda lustre y protección superficial. Complementa OVI Ecoseal.                                    | Químico   | Institucional, Retail            | PROD-002             | SERV-008                                                              | ES     | EN-REVISION | `src/knowledge/products/catalog.ts`      | `docs/content/products/`       |
| PROD-007 | OVI CR 30                       | Desengrasante solvente de alto poder penetrante para grasa pesada incrustada en maquinaria, motores y tanques. Versión aromática y desodorizada (CR 30S). | Químico   | Industria, Energía, Transporte   | —                    | SERV-005, SERV-002                                                    | ES     | EN-REVISION | `src/knowledge/products/catalog.ts`      | `docs/content/products/`       |
| PROD-008 | OVI Handsol                     | Limpiador industrial en seco para manos. Remueve grasa, aceites, óxido y suciedad industrial sin necesidad de agua. Humecta la piel. | Químico   | Industria, Transporte, Energía   | —                    | SERV-006                                                              | ES     | EN-REVISION | `src/knowledge/products/catalog.ts`      | `docs/content/products/`       |
| PROD-009 | OVI Formulación Personalizada   | Formulaciones específicamente adaptadas a requerimientos operativos y ambientales del cliente. Proceso: análisis → prototipo → validación in situ. | Químico   | Todos los sectores               | —                    | SERV-005                                                              | ES     | EN-REVISION | `src/knowledge/products/catalog.ts`      | `docs/content/products/`       |

### 2.2 Línea Industrial (OVI Industrial — 17 productos)

| ID       | Nombre                  | Descripción breve                                                              | Categoría | Sector              | Estado      | Fuente        | Ubicación futura         |
|----------|-------------------------|--------------------------------------------------------------------------------|-----------|---------------------|-------------|---------------|--------------------------|
| PROD-010 | Handsol                 | Limpiador de manos industrial en seco                                          | Químico   | Industrial          | PENDIENTE   | Memory / Catálogo oficial | `docs/content/products/` |
| PROD-011 | Biodex                  | Desengrasante industrial biodegradable (ver PROD-001)                          | Químico   | Industrial          | PENDIENTE   | Memory / Catálogo oficial | `docs/content/products/` |
| PROD-012 | Degreaser               | Desengrasante industrial                                                       | Químico   | Industrial          | PENDIENTE   | Memory / Catálogo oficial | `docs/content/products/` |
| PROD-013 | Solwash                 | Detergente para lavado de flota (ver PROD-004)                                 | Químico   | Industrial          | PENDIENTE   | Memory / Catálogo oficial | `docs/content/products/` |
| PROD-014 | Ecotex                  | Limpiador textil industrial                                                    | Químico   | Industrial          | PENDIENTE   | Memory / Catálogo oficial | `docs/content/products/` |
| PROD-015 | Biodelect               | Limpiador dieléctrico biodegradable                                            | Químico   | Industrial          | PENDIENTE   | Memory / Catálogo oficial | `docs/content/products/` |
| PROD-016 | Concrete Clean          | Limpiador de concreto industrial                                               | Químico   | Industrial          | PENDIENTE   | Memory / Catálogo oficial | `docs/content/products/` |
| PROD-017 | CR 30                   | Desengrasante solvente (ver PROD-007)                                          | Químico   | Industrial          | PENDIENTE   | Memory / Catálogo oficial | `docs/content/products/` |
| PROD-018 | CR 30 S                 | Desengrasante solvente desodorizado (ver PROD-007)                             | Químico   | Industrial          | PENDIENTE   | Memory / Catálogo oficial | `docs/content/products/` |
| PROD-019 | Ultradegreaser I        | Desengrasante ultra concentrado industrial                                     | Químico   | Industrial          | PENDIENTE   | Memory / Catálogo oficial | `docs/content/products/` |
| PROD-020 | Dust Off                | Removedor de polvo industrial                                                  | Químico   | Industrial          | PENDIENTE   | Memory / Catálogo oficial | `docs/content/products/` |
| PROD-021 | JP 35                   | Desengrasante para grasas minerales (ver PROD-003)                             | Químico   | Industrial          | PENDIENTE   | Memory / Catálogo oficial | `docs/content/products/` |
| PROD-022 | Litoclean               | Limpiador de litografías y tintas                                              | Químico   | Industrial          | PENDIENTE   | Memory / Catálogo oficial | `docs/content/products/` |
| PROD-023 | Improclean E            | Limpiador industrial mejorado                                                  | Químico   | Industrial          | PENDIENTE   | Memory / Catálogo oficial | `docs/content/products/` |
| PROD-024 | Gum Remove              | Removedor de gomas y adhesivos industriales                                    | Químico   | Industrial          | PENDIENTE   | Memory / Catálogo oficial | `docs/content/products/` |
| PROD-025 | Ecolub                  | Lubricante ecológico industrial                                                | Químico   | Industrial          | PENDIENTE   | Memory / Catálogo oficial | `docs/content/products/` |
| PROD-026 | Contact Sol             | Limpiador de contactos eléctricos                                              | Químico   | Industrial          | PENDIENTE   | Memory / Catálogo oficial | `docs/content/products/` |

### 2.3 Línea Alimentos (OVI Alimentos — 16 productos)

| ID       | Nombre                  | Descripción breve                                                              | Categoría | Sector   | Estado    | Fuente                    | Ubicación futura         |
|----------|-------------------------|--------------------------------------------------------------------------------|-----------|----------|-----------|---------------------------|--------------------------|
| PROD-027 | Ecogrill                | Limpiador para parrillas y superficies de cocción                              | Químico   | Alimentos | PENDIENTE | Memory / Catálogo oficial | `docs/content/products/` |
| PROD-028 | Biodegreaser-A          | Desengrasante biodegradable para industria alimentaria                         | Químico   | Alimentos | PENDIENTE | Memory / Catálogo oficial | `docs/content/products/` |
| PROD-029 | Ultradegreaser          | Desengrasante ultra concentrado para alimentos                                 | Químico   | Alimentos | PENDIENTE | Memory / Catálogo oficial | `docs/content/products/` |
| PROD-030 | Peroxol-A               | Limpiador peroxidado para industria alimentaria                                | Químico   | Alimentos | PENDIENTE | Memory / Catálogo oficial | `docs/content/products/` |
| PROD-031 | Chlorinne Detergent     | Detergente clorado para superficies de contacto con alimentos                  | Químico   | Alimentos | PENDIENTE | Memory / Catálogo oficial | `docs/content/products/` |
| PROD-032 | Ecoquat                 | Desinfectante cuaternario de amonio para alimentos                             | Químico   | Alimentos | PENDIENTE | Memory / Catálogo oficial | `docs/content/products/` |
| PROD-033 | Ecoblast                | Limpiador alcalino de alta potencia para alimentos                             | Químico   | Alimentos | PENDIENTE | Memory / Catálogo oficial | `docs/content/products/` |
| PROD-034 | Hipoclor                | Hipoclorito para desinfección en industria alimentaria                         | Químico   | Alimentos | PENDIENTE | Memory / Catálogo oficial | `docs/content/products/` |
| PROD-035 | Biocetic                | Limpiador a base de ácido acético biodegradable                                | Químico   | Alimentos | PENDIENTE | Memory / Catálogo oficial | `docs/content/products/` |
| PROD-036 | Biocitric               | Limpiador a base de ácido cítrico biodegradable                                | Químico   | Alimentos | PENDIENTE | Memory / Catálogo oficial | `docs/content/products/` |
| PROD-037 | Eco-Machine Rinse       | Enjuagante para máquinas lavaplatos industriales                               | Químico   | Alimentos | PENDIENTE | Memory / Catálogo oficial | `docs/content/products/` |
| PROD-038 | Eco-Machine             | Detergente para máquinas lavaplatos industriales                               | Químico   | Alimentos | PENDIENTE | Memory / Catálogo oficial | `docs/content/products/` |
| PROD-039 | Descaler-A              | Desescalante para industria alimentaria                                        | Químico   | Alimentos | PENDIENTE | Memory / Catálogo oficial | `docs/content/products/` |
| PROD-040 | Neutrodex               | Neutralizador de pH para procesos de limpieza alimentaria                      | Químico   | Alimentos | PENDIENTE | Memory / Catálogo oficial | `docs/content/products/` |
| PROD-041 | Cip Alcalino            | Solución alcalina para limpieza CIP                                            | Químico   | Alimentos | PENDIENTE | Memory / Catálogo oficial | `docs/content/products/` |
| PROD-042 | Cip Ácido               | Solución ácida para limpieza CIP                                               | Químico   | Alimentos | PENDIENTE | Memory / Catálogo oficial | `docs/content/products/` |

### 2.4 Línea Institucional (OVI Institucional — 11 productos)

| ID       | Nombre      | Descripción breve                                                | Categoría | Sector        | Estado    | Fuente                    | Ubicación futura         |
|----------|-------------|------------------------------------------------------------------|-----------|---------------|-----------|---------------------------|--------------------------|
| PROD-043 | Solfresh     | Limpiador fresco para superficies institucionales               | Químico   | Institucional | PENDIENTE | Memory / Catálogo oficial | `docs/content/products/` |
| PROD-044 | Biodegraser  | Desengrasante biodegradable institucional                       | Químico   | Institucional | PENDIENTE | Memory / Catálogo oficial | `docs/content/products/` |
| PROD-045 | Peroxol      | Limpiador peroxidado institucional                              | Químico   | Institucional | PENDIENTE | Memory / Catálogo oficial | `docs/content/products/` |
| PROD-046 | Ecoshine     | Limpiador de pisos con desinfección y aroma (ver PROD-005)      | Químico   | Institucional | PENDIENTE | Memory / Catálogo oficial | `docs/content/products/` |
| PROD-047 | Descaler     | Desescalante para uso institucional                             | Químico   | Institucional | PENDIENTE | Memory / Catálogo oficial | `docs/content/products/` |
| PROD-048 | Bioglass     | Limpiador de vidrios institucional                              | Químico   | Institucional | PENDIENTE | Memory / Catálogo oficial | `docs/content/products/` |
| PROD-049 | Restorer     | Restaurador de superficies institucionales                      | Químico   | Institucional | PENDIENTE | Memory / Catálogo oficial | `docs/content/products/` |
| PROD-050 | Floor Wax    | Cera para pisos institucionales                                 | Químico   | Institucional | PENDIENTE | Memory / Catálogo oficial | `docs/content/products/` |
| PROD-051 | Eco Wax      | Cera ecológica para pisos (ver PROD-006)                        | Químico   | Institucional | PENDIENTE | Memory / Catálogo oficial | `docs/content/products/` |
| PROD-052 | Eco Mov      | Removedor ecológico institucional                               | Químico   | Institucional | PENDIENTE | Memory / Catálogo oficial | `docs/content/products/` |
| PROD-053 | Ecoseal      | Sellador de pisos institucionales (ver PROD-002)                | Químico   | Institucional | PENDIENTE | Memory / Catálogo oficial | `docs/content/products/` |

### 2.5 Línea Cuidado Personal (4 productos)

| ID       | Nombre      | Descripción breve                                                      | Categoría       | Sector           | Estado    | Fuente                    | Ubicación futura         |
|----------|-------------|------------------------------------------------------------------------|-----------------|------------------|-----------|---------------------------|--------------------------|
| PROD-054 | Biohand     | Jabón líquido desinfectante y antibacterial                            | Cuidado Personal | Todos            | PENDIENTE | Memory / Catálogo oficial | `docs/content/products/` |
| PROD-055 | Biosan      | Gel sanitizante antibacterial para manos y antebrazos                 | Cuidado Personal | Todos            | PENDIENTE | Memory / Catálogo oficial | `docs/content/products/` |
| PROD-056 | Biosoap     | Jabón líquido antibacterial con aroma                                 | Cuidado Personal | Todos            | PENDIENTE | Memory / Catálogo oficial | `docs/content/products/` |
| PROD-057 | Quaterhand  | Jabón líquido desinfectante y antibacterial (amonio cuaternario)      | Cuidado Personal | Todos            | PENDIENTE | Memory / Catálogo oficial | `docs/content/products/` |

### 2.6 Línea Lavandería (6 productos)

| ID       | Nombre      | Descripción breve                                       | Categoría  | Sector     | Estado    | Fuente                    | Ubicación futura         |
|----------|-------------|---------------------------------------------------------|------------|------------|-----------|---------------------------|--------------------------|
| PROD-058 | Detertex    | Detergente industrial para lavandería                   | Lavandería | Lavandería | PENDIENTE | Memory / Catálogo oficial | `docs/content/products/` |
| PROD-059 | Degratex    | Desengrasante industrial para lavandería                | Lavandería | Lavandería | PENDIENTE | Memory / Catálogo oficial | `docs/content/products/` |
| PROD-060 | Oxytex      | Blanqueador oxigenado para lavandería                   | Lavandería | Lavandería | PENDIENTE | Memory / Catálogo oficial | `docs/content/products/` |
| PROD-061 | Clorotex    | Blanqueador clorado para lavandería                     | Lavandería | Lavandería | PENDIENTE | Memory / Catálogo oficial | `docs/content/products/` |
| PROD-062 | Oxifree     | Removedor de óxido en prendas                           | Lavandería | Lavandería | PENDIENTE | Memory / Catálogo oficial | `docs/content/products/` |
| PROD-063 | Rintex      | Suavizante textil para lavandería industrial            | Lavandería | Lavandería | PENDIENTE | Memory / Catálogo oficial | `docs/content/products/` |

### 2.7 Línea Biotecnología (2 productos)

| ID       | Nombre          | Descripción breve                                                           | Categoría      | Sector   | Estado    | Fuente                    | Ubicación futura         |
|----------|-----------------|-----------------------------------------------------------------------------|----------------|----------|-----------|---------------------------|--------------------------|
| PROD-064 | Eco-Zyme        | Digestor natural para tratamiento de efluentes orgánicos                    | Biotecnología  | Todos    | PENDIENTE | Memory / Catálogo oficial | `docs/content/products/` |
| PROD-065 | Eco-Zyme Solid  | Tratamiento biológico sólido para grasas. Protección y restauración ambiental. | Biotecnología | Todos    | PENDIENTE | Memory / Catálogo oficial | `docs/content/products/` |

### 2.8 Equipos y Accesorios (registrados en plataforma)

| ID       | Nombre                       | Descripción breve                                                            | Categoría  | Sector                                  | Estado  | Fuente                                   | Ubicación futura         |
|----------|------------------------------|------------------------------------------------------------------------------|------------|-----------------------------------------|---------|------------------------------------------|--------------------------|
| PROD-066 | OVI Flota Rinse Arch         | Sistema de enjuague para flota y activos de gran volumen                     | Equipo     | Transporte, Energía, Institucional      | ACTIVO  | `src/knowledge/equipment/catalog.ts`     | `docs/content/products/` |
| PROD-067 | OVI Dose Control Cart        | Estación móvil de dosificación para mezcla consistente y trazabilidad       | Equipo     | Transporte, Institucional, Energía, Industria | ACTIVO | `src/knowledge/equipment/catalog.ts` | `docs/content/products/` |
| PROD-068 | OVI Precision Foam Kit       | Kit de espumado técnico para control de cobertura y tiempo de contacto       | Accesorio  | Industria, Institucional, Transporte    | ACTIVO  | `src/knowledge/equipment/catalog.ts`     | `docs/content/products/` |
| PROD-069 | Lanza de espuma técnica      | Lanza de aplicación manual para superficies verticales y difícil acceso      | Accesorio  | Industrial, Alimentos                   | ACTIVO  | `src/knowledge/equipment/catalog.ts`     | `docs/content/products/` |
| PROD-070 | Aplicador de microfibra técnica | Sistema de aplicación para tratamientos preventivos en superficies sensibles | Herramienta | Institucional, Energía                 | ACTIVO  | `src/knowledge/equipment/catalog.ts`     | `docs/content/products/` |
| PROD-071 | Pulverizador de baja presión | Equipo portátil para aplicación de protectores y mantenimiento              | Herramienta | Institucional                          | ACTIVO  | `src/knowledge/equipment/catalog.ts`     | `docs/content/products/` |
| PROD-072 | Bomba de refuerzo            | Bomba auxiliar para refuerzo de presión en sistemas de lavado de flota       | Equipo     | Transporte                              | ACTIVO  | `src/knowledge/equipment/catalog.ts`     | `docs/content/products/` |

---

## 3. SERVICIOS

**Carpeta de destino:** `docs/content/services/`

| ID       | Nombre                                    | Descripción                                                                                                          | Categoría           | Sector                                          | Producto relacionado                  | Idioma | Estado  | Fuente                                   | Ubicación futura          |
|----------|-------------------------------------------|----------------------------------------------------------------------------------------------------------------------|---------------------|-------------------------------------------------|---------------------------------------|--------|---------|------------------------------------------|---------------------------|
| SERV-001 | Servicio de Lavado de Flota               | Lavado técnico de vehículos de carga, flota pesada y transporte público. Protocolos estandarizados, gestión de aguas residuales, trazabilidad. | Lavado de flota     | Transporte                                      | PROD-001, PROD-004, PROD-066, PROD-067 | ES    | ACTIVO  | `src/knowledge/services/catalog.ts`      | `docs/content/services/`  |
| SERV-002 | Servicio de Limpieza Industrial           | Limpieza integral de plantas de manufactura e instalaciones industriales. Diagnóstico técnico, protocolo y reporte trazable. | Limpieza industrial | Industria, Alimentos, Energía                   | PROD-001, PROD-002, PROD-067, PROD-068 | ES    | ACTIVO  | `src/knowledge/services/catalog.ts`      | `docs/content/services/`  |
| SERV-003 | Auditoría de Patio                        | Evaluación técnica de operaciones de lavado en patios de flota. Levantamiento in situ, informe y plan de mejora.     | Consultoría         | Transporte                                      | —                                     | ES     | ACTIVO  | `src/knowledge/services/catalog.ts`      | `docs/content/services/`  |
| SERV-004 | Optimización Hídrica                      | Diseño e implementación de medidas para reducir el consumo de agua en lavado técnico.                                | Ingeniería          | Transporte, Industria                           | PROD-001, PROD-066, PROD-067           | ES     | ACTIVO  | `src/knowledge/services/catalog.ts`      | `docs/content/services/`  |
| SERV-005 | Diagnóstico Técnico de Suciedad y Proceso | Caracterización técnica de contaminantes y evaluación del proceso de limpieza actual para diseñar soluciones a la medida. | Consultoría        | Industria, Transporte, Alimentos, Hospitales    | —                                     | ES     | ACTIVO  | `src/knowledge/services/catalog.ts`      | `docs/content/services/`  |
| SERV-006 | Capacitación Operativa                    | Entrenamiento técnico del personal en uso correcto de productos, equipos y protocolos OVI.                           | Formación           | Transporte, Industria, Institucional, Hospitales, Alimentos | PROD-067               | ES     | ACTIVO  | `src/knowledge/services/catalog.ts`      | `docs/content/services/`  |
| SERV-007 | Diseño de Protocolo por Sector            | Creación de protocolos de limpieza personalizados según sector, activo, contaminante y normativa.                    | Ingeniería          | Industria, Institucional, Transporte, Alimentos, Hospitales | —                     | ES     | ACTIVO  | `src/knowledge/services/catalog.ts`      | `docs/content/services/`  |
| SERV-008 | Mantenimiento Preventivo de Superficies   | Programa de intervenciones planificadas para extender la vida útil de superficies críticas.                          | Mantenimiento       | Energía, Institucional, Retail                  | PROD-002, PROD-070, PROD-071           | ES     | ACTIVO  | `src/knowledge/services/catalog.ts`      | `docs/content/services/`  |
| SERV-009 | Implementación Supervisada de Protocolo   | Acompañamiento técnico durante la implementación de nuevos protocolos.                                               | Ingeniería          | Industria, Transporte, Alimentos                | —                                     | ES     | ACTIVO  | `src/knowledge/services/catalog.ts`      | `docs/content/services/`  |
| SERV-010 | Levantamiento Técnico de Activos          | Inventario y caracterización técnica de activos físicos para diseñar intervenciones a medida.                        | Consultoría         | Energía, Industria, Transporte                  | —                                     | ES     | ACTIVO  | `src/knowledge/services/catalog.ts`      | `docs/content/services/`  |

---

## 4. INDUSTRIAS / SECTORES

**Carpeta de destino:** `docs/content/industries/`

| ID     | Nombre        | Descripción                                                                                                                         | Categorías relacionadas                 | Productos destacados                                          | Servicios relacionados                        | Idioma | Estado  | Fuente                                  | Ubicación futura            |
|--------|---------------|-------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------|---------------------------------------------------------------|-----------------------------------------------|--------|---------|-----------------------------------------|-----------------------------|
| IND-001 | Transporte    | Patios de flota, terminales y centros logísticos. Flotas de hasta 7,000 unidades/mes. Lavado técnico, gestión hídrica, trazabilidad. | Industrial, Logístico                   | PROD-001, PROD-004, PROD-066, PROD-067                       | SERV-001, SERV-003, SERV-004                  | ES     | ACTIVO  | `src/knowledge/sectors/catalog.ts`      | `docs/content/industries/`  |
| IND-002 | Industria     | Manufactura, metalmecánica, automotriz, petrolera, procesamiento de alimentos. Protocolos de desengrase, trazabilidad y cumplimiento normativo. | Industrial, Manufactura             | PROD-001, PROD-003, PROD-002, PROD-068, PROD-067             | SERV-002, SERV-005, SERV-009                  | ES     | ACTIVO  | `src/knowledge/sectors/catalog.ts`      | `docs/content/industries/`  |
| IND-003 | Institucional | Hospitales, universidades, edificios corporativos, centros comerciales. Mantenimiento preventivo con alto tráfico y múltiples superficies. | Institucional, Comercial           | PROD-002, PROD-005, PROD-006, PROD-068, PROD-067             | SERV-007, SERV-006, SERV-008                  | ES     | ACTIVO  | `src/knowledge/sectors/catalog.ts`      | `docs/content/industries/`  |
| IND-004 | Energía       | Generadoras, plantas de transmisión y activos energéticos. Limpieza en operación con control de riesgo eléctrico.                   | Industrial, Energético                  | PROD-002, PROD-066, PROD-067                                 | SERV-010, SERV-008                            | ES     | ACTIVO  | `src/knowledge/sectors/catalog.ts`      | `docs/content/industries/`  |
| IND-005 | Hospitales    | Infraestructura hospitalaria y clínicas. Desinfección de alto nivel, control de infecciones y diferenciación por zona de riesgo.    | Salud, Institucional                    | PROD-002, PROD-068, PROD-067                                 | SERV-002, SERV-006, SERV-007                  | ES     | ACTIVO  | `src/knowledge/sectors/catalog.ts`      | `docs/content/industries/`  |
| IND-006 | Retail        | Tiendas y centros comerciales. Alto estándar de presentación y limpieza visible con mínimo impacto en la experiencia del cliente.   | Comercial, Institucional                | PROD-002, PROD-068                                           | SERV-007, SERV-008                            | ES     | ACTIVO  | `src/knowledge/sectors/catalog.ts`      | `docs/content/industries/`  |
| IND-007 | Alimentos     | Plantas de procesamiento y cocinas industriales. Protocolos HACCP, inocuidad, superficies de contacto directo.                      | Industrial, Alimentario                 | PROD-001, PROD-068, PROD-002, PROD-067                       | SERV-005, SERV-009, SERV-007                  | ES     | ACTIVO  | `src/knowledge/sectors/catalog.ts`      | `docs/content/industries/`  |
| IND-008 | Hotelera      | Sector hotelero profesional. Integra referencias de Alimentos, Cuidado Personal, Lavandería e Institucional.                        | Hospitalidad, Institucional             | PROD-054, PROD-055, PROD-056, PROD-043, PROD-058             | SERV-006, SERV-007, SERV-008                  | ES     | PENDIENTE | Memory / Catálogo oficial             | `docs/content/industries/`  |
| IND-009 | Farmacéutica / Química | Industria farmacéutica y química con requerimientos de limpieza validada y trazabilidad regulatoria.            | Industrial, Regulado                    | Por definir                                                  | Por definir                                   | ES     | PENDIENTE | Memory / Catálogo oficial             | `docs/content/industries/`  |
| IND-010 | Minería       | Operaciones mineras y extractivas con maquinaria pesada y condiciones extremas.                                                     | Industrial, Extractivo                  | Por definir                                                  | Por definir                                   | ES     | PENDIENTE | Memory / Catálogo oficial             | `docs/content/industries/`  |
| IND-011 | Agrícola      | Maquinaria y instalaciones del sector agrícola y agroindustrial.                                                                    | Industrial, Agrícola                    | Por definir                                                  | Por definir                                   | ES     | PENDIENTE | Memory / Catálogo oficial             | `docs/content/industries/`  |

---

## 5. VIDEOS

**Carpeta de destino:** `docs/content/videos/`

> **Nota:** No se han identificado videos digitales registrados en el repositorio actual. Los siguientes son registros de contenido por producir o por inventariar desde fuentes externas (sitio web oficial, Instagram, materiales comerciales).

| ID        | Nombre                                     | Descripción                                                              | Categoría        | Sector        | Producto relacionado | Servicio relacionado | Idioma | Estado      | Fuente                    | Ubicación futura        |
|-----------|--------------------------------------------|--------------------------------------------------------------------------|------------------|---------------|----------------------|----------------------|--------|-------------|---------------------------|-------------------------|
| VIDEO-001 | Video institucional OVI                    | Video de presentación corporativa de OVI — Ingeniería en Limpieza        | Institucional    | Todos         | —                    | —                    | ES     | PLACEHOLDER | Sitio web oficial / Instagram | `docs/content/videos/` |
| VIDEO-002 | Demo OVI Flota Rinse Arch                  | Demostración del sistema de enjuague para flota                          | Producto         | Transporte    | PROD-066             | SERV-001             | ES     | PLACEHOLDER | Por producir              | `docs/content/videos/` |
| VIDEO-003 | Demo OVI Dose Control Cart                 | Demostración de la estación de dosificación                              | Producto         | Todos         | PROD-067             | SERV-006             | ES     | PLACEHOLDER | Por producir              | `docs/content/videos/` |
| VIDEO-004 | Demo OVI Precision Foam Kit                | Demostración del kit de espumado técnico                                 | Producto         | Industria     | PROD-068             | SERV-002             | ES     | PLACEHOLDER | Por producir              | `docs/content/videos/` |
| VIDEO-005 | Caso de éxito — Flota pesada               | Video del caso de éxito en flota de transporte pesado                    | Caso de éxito    | Transporte    | PROD-004             | SERV-001             | ES     | PLACEHOLDER | Por producir              | `docs/content/videos/` |
| VIDEO-006 | Caso de éxito — Planta industrial          | Video del caso de éxito en planta de manufactura                         | Caso de éxito    | Industria     | PROD-001             | SERV-002             | ES     | PLACEHOLDER | Por producir              | `docs/content/videos/` |
| VIDEO-007 | Protocolo de lavado de flota               | Tutorial del protocolo P-001: lavado exterior de bajo consumo            | Protocolo        | Transporte    | PROD-001, PROD-004   | SERV-001             | ES     | PLACEHOLDER | Por producir              | `docs/content/videos/` |

---

## 6. FOTOGRAFÍAS

**Carpeta de destino:** `docs/content/photos/`

> **Nota:** Las carpetas de assets del repositorio (`assets/industry/`, `assets/institutional/`, `assets/transport/`, etc.) tienen estructura definida pero están vacías (solo `.gitkeep`). Las fotografías deben inventariarse cuando sean proporcionadas por OVI.

| ID        | Nombre                                        | Descripción                                                                     | Categorías relacionadas               | Sector             | Producto relacionado | Servicio relacionado | Idioma | Estado      | Fuente                            | Ubicación futura         |
|-----------|-----------------------------------------------|---------------------------------------------------------------------------------|---------------------------------------|--------------------|----------------------|----------------------|--------|-------------|-----------------------------------|--------------------------|
| PHOTO-001 | Logo OVI SVG                                  | Logotipo oficial de OVI en formato SVG                                          | Logos, Marca                          | Todos              | —                    | —                    | —      | ACTIVO      | `public/brand/ovi-logo.svg`       | `docs/content/logos/`    |
| PHOTO-002 | Fotografías de planta industrial              | Imágenes de planta de manufactura en operación de limpieza                      | Industrial, Casos de éxito            | Industria          | PROD-001             | SERV-002             | —      | PLACEHOLDER | Archivo fotográfico OVI           | `docs/content/photos/`   |
| PHOTO-003 | Fotografías de patio de flota                 | Imágenes de lavado de flota vehicular pesada                                    | Transporte, Casos de éxito            | Transporte         | PROD-004, PROD-066   | SERV-001             | —      | PLACEHOLDER | Archivo fotográfico OVI           | `docs/content/photos/`   |
| PHOTO-004 | Fotografías de instalaciones institucionales  | Imágenes de pisos, pasillos y áreas de alto tráfico en instalaciones institucionales | Institucional, Mantenimiento       | Institucional      | PROD-002, PROD-005   | SERV-008             | —      | PLACEHOLDER | Archivo fotográfico OVI           | `docs/content/photos/`   |
| PHOTO-005 | Fotografías de productos químicos OVI         | Envases y presentaciones comerciales de los productos OVI                       | Productos, Catálogo                   | Todos              | Múltiples            | —                    | —      | PLACEHOLDER | Archivo fotográfico OVI           | `docs/content/photos/`   |
| PHOTO-006 | Fotografías de equipos OVI                    | Imágenes del OVI Flota Rinse Arch, Dose Control Cart y Precision Foam Kit       | Productos, Equipo                     | Transporte, Industria | PROD-066, PROD-067, PROD-068 | —            | —      | PLACEHOLDER | Archivo fotográfico OVI           | `docs/content/photos/`   |
| PHOTO-007 | Fotografías de servicio en campo              | Personal OVI en operaciones de limpieza y capacitación                          | Servicios, Institucional              | Todos              | —                    | Múltiples            | —      | PLACEHOLDER | Archivo fotográfico OVI           | `docs/content/photos/`   |
| PHOTO-008 | Fotografías de sector hospitalario            | Imágenes de protocolo de limpieza en instalaciones de salud                     | Hospitales, Institucional             | Hospitales         | PROD-002, PROD-068   | SERV-002, SERV-006   | —      | PLACEHOLDER | Archivo fotográfico OVI           | `docs/content/photos/`   |
| PHOTO-009 | Fotografías de sector alimentario             | Imágenes de limpieza en planta de producción alimentaria                        | Alimentos, Industrial                 | Alimentos          | PROD-001, PROD-068   | SERV-002, SERV-005   | —      | PLACEHOLDER | Archivo fotográfico OVI / Instagram | `docs/content/photos/` |
| PHOTO-010 | Fotografías de Instagram oficial              | Contenido visual del Instagram oficial de OVI                                   | Redes sociales, Marca                 | Todos              | Múltiples            | Múltiples            | ES     | PLACEHOLDER | Instagram oficial OVI             | `docs/content/photos/`   |

---

## 7. BROCHURES

**Carpeta de destino:** `docs/content/brochures/`

> **Nota:** Los siguientes brochures están identificados como existentes o necesarios. Deben ser provistos por OVI para registrarse con archivo físico.

| ID        | Nombre                                        | Descripción                                                                    | Categoría       | Sector        | Productos relacionados          | Idioma   | Estado      | Fuente                    | Ubicación futura           |
|-----------|-----------------------------------------------|--------------------------------------------------------------------------------|-----------------|---------------|---------------------------------|----------|-------------|---------------------------|----------------------------|
| BROCH-001 | Catálogo General OVI                          | Catálogo maestro de productos y servicios OVI                                  | Catálogo        | Todos         | Todos                           | ES       | PLACEHOLDER | Por proveer por OVI       | `docs/content/brochures/`  |
| BROCH-002 | Brochure OVI Industrial                       | Presentación de la línea industrial de OVI (17 productos)                      | Línea Industrial | Industria    | PROD-010 a PROD-026             | ES       | PLACEHOLDER | Por proveer por OVI       | `docs/content/brochures/`  |
| BROCH-003 | Brochure OVI Alimentos                        | Presentación de la línea para industria alimentaria (16 productos)             | Línea Alimentos | Alimentos     | PROD-027 a PROD-042             | ES       | PLACEHOLDER | Por proveer por OVI       | `docs/content/brochures/`  |
| BROCH-004 | Brochure OVI Institucional                    | Presentación de la línea para sector institucional (11 productos)              | Línea Institucional | Institucional | PROD-043 a PROD-053           | ES       | PLACEHOLDER | Por proveer por OVI       | `docs/content/brochures/`  |
| BROCH-005 | Brochure OVI Cuidado Personal                 | Presentación de la línea de cuidado personal (4 productos)                     | Línea Cuidado Personal | Todos   | PROD-054 a PROD-057             | ES       | PLACEHOLDER | Por proveer por OVI       | `docs/content/brochures/`  |
| BROCH-006 | Brochure OVI Lavandería                       | Presentación de la línea para lavandería industrial (6 productos)              | Línea Lavandería | Lavandería   | PROD-058 a PROD-063             | ES       | PLACEHOLDER | Por proveer por OVI       | `docs/content/brochures/`  |
| BROCH-007 | Brochure OVI Biotecnología                    | Presentación de la línea de biotecnología (2 productos)                        | Línea Biotecnología | Todos     | PROD-064, PROD-065              | ES       | PLACEHOLDER | Por proveer por OVI       | `docs/content/brochures/`  |
| BROCH-008 | Brochure OVI Hotelera                         | Presentación de la línea hotelera profesional                                  | Línea Hotelera  | Hotelera      | PROD-054, PROD-043, PROD-058    | ES       | PLACEHOLDER | Por proveer por OVI       | `docs/content/brochures/`  |
| BROCH-009 | Brochure de Servicios OVI                     | Presentación completa del portafolio de servicios OVI                          | Servicios       | Todos         | —                               | ES       | PLACEHOLDER | Por proveer por OVI       | `docs/content/brochures/`  |
| BROCH-010 | Brochure Equipos OVI                          | Presentación de los equipos OVI (Flota Rinse Arch, Dose Control Cart, Foam Kit) | Equipos        | Industria, Transporte | PROD-066, PROD-067, PROD-068  | ES  | PLACEHOLDER | Por proveer por OVI       | `docs/content/brochures/`  |

---

## 8. LOGOS

**Carpeta de destino:** `docs/content/logos/`

| ID       | Nombre                        | Descripción                                                                    | Categoría  | Sector | Producto relacionado | Idioma | Estado  | Fuente                          | Ubicación futura        |
|----------|-------------------------------|--------------------------------------------------------------------------------|------------|--------|----------------------|--------|---------|---------------------------------|-------------------------|
| LOGO-001 | OVI Logo SVG — Principal      | Logotipo principal de OVI en formato SVG. Versión oscura (sobre fondos oscuros). | Logo      | Todos  | —                    | —      | ACTIVO  | `public/brand/ovi-logo.svg`     | `docs/content/logos/`   |
| LOGO-002 | OVI Logo — Versión clara      | Logotipo OVI para uso sobre fondos claros                                      | Logo       | Todos  | —                    | —      | PLACEHOLDER | Por proveer por OVI          | `docs/content/logos/`   |
| LOGO-003 | OVI Logo — Isotipo            | Isotipo / ícono de OVI sin texto                                               | Logo       | Todos  | —                    | —      | PLACEHOLDER | Por proveer por OVI          | `docs/content/logos/`   |
| LOGO-004 | OVI Logo — Horizontal         | Versión horizontal del logotipo OVI                                            | Logo       | Todos  | —                    | —      | PLACEHOLDER | Por proveer por OVI          | `docs/content/logos/`   |
| LOGO-005 | OVI Logo — Vertical           | Versión vertical / apilada del logotipo OVI                                    | Logo       | Todos  | —                    | —      | PLACEHOLDER | Por proveer por OVI          | `docs/content/logos/`   |
| LOGO-006 | OVI Logo — Blanco y Negro     | Versión monocromática del logotipo OVI                                         | Logo       | Todos  | —                    | —      | PLACEHOLDER | Por proveer por OVI          | `docs/content/logos/`   |
| LOGO-007 | OVI Logo — Variante color     | Versión en colores primarios de marca (#00C4FF / #0047AB / #00FF85)            | Logo       | Todos  | —                    | —      | PLACEHOLDER | Por proveer por OVI          | `docs/content/logos/`   |
| LOGO-008 | Favicon OVI                   | Favicon de OVI para uso en navegadores y apps                                  | Favicon    | Todos  | —                    | —      | PLACEHOLDER | Por proveer por OVI          | `docs/content/logos/`   |

---

## 9. FICHAS TÉCNICAS

**Carpeta de destino:** `docs/content/technical/`

> **Nota:** Las fichas técnicas contienen especificaciones de producto: composición, diluciones, modos de uso, compatibilidades de superficie y almacenamiento. Deben ser provistas por OVI para su inclusión física.

| ID       | Nombre                                       | Descripción                                                                   | Categoría     | Sector                        | Producto relacionado | Idioma | Estado      | Fuente                    | Ubicación futura           |
|----------|----------------------------------------------|-------------------------------------------------------------------------------|---------------|-------------------------------|----------------------|--------|-------------|---------------------------|----------------------------|
| TECH-001 | Ficha Técnica — OVI Desengrasante Industrial  | Especificaciones técnicas: composición, dilución, superficies compatibles, almacenamiento | Ficha técnica | Industria, Transporte, Energía | PROD-001             | ES     | PENDIENTE   | Por proveer por OVI       | `docs/content/technical/`  |
| TECH-002 | Ficha Técnica — OVI Ecoseal                  | Especificaciones técnicas del sellador de pisos                               | Ficha técnica | Institucional, Energía, Industria | PROD-002           | ES     | PENDIENTE   | Por proveer por OVI       | `docs/content/technical/`  |
| TECH-003 | Ficha Técnica — OVI JP 35                    | Especificaciones técnicas del desengrasante para grasas minerales             | Ficha técnica | Industria, Energía, Transporte | PROD-003            | ES     | PENDIENTE   | Por proveer por OVI       | `docs/content/technical/`  |
| TECH-004 | Ficha Técnica — OVI Solwash                  | Especificaciones técnicas del detergente para flota vehicular                 | Ficha técnica | Transporte                    | PROD-004             | ES     | PENDIENTE   | Por proveer por OVI       | `docs/content/technical/`  |
| TECH-005 | Ficha Técnica — OVI Ecoshine                 | Especificaciones técnicas del limpiador de pisos                              | Ficha técnica | Institucional, Hospitales     | PROD-005             | ES     | PENDIENTE   | Por proveer por OVI       | `docs/content/technical/`  |
| TECH-006 | Ficha Técnica — OVI Eco Wax                  | Especificaciones técnicas de la cera ecológica para pisos                     | Ficha técnica | Institucional, Retail         | PROD-006             | ES     | PENDIENTE   | Por proveer por OVI       | `docs/content/technical/`  |
| TECH-007 | Ficha Técnica — OVI CR 30 / CR 30 S          | Especificaciones técnicas del desengrasante solvente (aromático y desodorizado) | Ficha técnica | Industria, Energía            | PROD-007             | ES     | PENDIENTE   | Por proveer por OVI       | `docs/content/technical/`  |
| TECH-008 | Ficha Técnica — OVI Handsol                  | Especificaciones técnicas del limpiador industrial de manos en seco           | Ficha técnica | Industria, Transporte, Energía | PROD-008            | ES     | PENDIENTE   | Por proveer por OVI       | `docs/content/technical/`  |
| TECH-009 | Ficha Técnica — OVI Flota Rinse Arch         | Especificaciones técnicas del sistema de enjuague de flota                    | Ficha técnica | Transporte, Energía           | PROD-066             | ES     | PENDIENTE   | Por proveer por OVI       | `docs/content/technical/`  |
| TECH-010 | Ficha Técnica — OVI Dose Control Cart        | Especificaciones técnicas de la estación de dosificación                      | Ficha técnica | Todos                         | PROD-067             | ES     | PENDIENTE   | Por proveer por OVI       | `docs/content/technical/`  |
| TECH-011 | Ficha Técnica — OVI Precision Foam Kit       | Especificaciones técnicas del kit de espumado técnico                         | Ficha técnica | Industria, Transporte         | PROD-068             | ES     | PENDIENTE   | Por proveer por OVI       | `docs/content/technical/`  |
| TECH-012 | Fichas Técnicas — Línea Industrial (17 prod.) | Set de fichas técnicas para toda la línea OVI Industrial                      | Ficha técnica | Industria                     | PROD-010 a PROD-026  | ES     | PENDIENTE   | Por proveer por OVI       | `docs/content/technical/`  |
| TECH-013 | Fichas Técnicas — Línea Alimentos (16 prod.) | Set de fichas técnicas para toda la línea OVI Alimentos                       | Ficha técnica | Alimentos                     | PROD-027 a PROD-042  | ES     | PENDIENTE   | Por proveer por OVI       | `docs/content/technical/`  |
| TECH-014 | Fichas Técnicas — Línea Institucional (11 prod.) | Set de fichas técnicas para toda la línea OVI Institucional               | Ficha técnica | Institucional                 | PROD-043 a PROD-053  | ES     | PENDIENTE   | Por proveer por OVI       | `docs/content/technical/`  |
| TECH-015 | Fichas Técnicas — Línea Cuidado Personal (4 prod.) | Set de fichas técnicas para la línea de cuidado personal               | Ficha técnica | Todos                         | PROD-054 a PROD-057  | ES     | PENDIENTE   | Por proveer por OVI       | `docs/content/technical/`  |
| TECH-016 | Fichas Técnicas — Línea Lavandería (6 prod.) | Set de fichas técnicas para la línea OVI Lavandería                           | Ficha técnica | Lavandería                    | PROD-058 a PROD-063  | ES     | PENDIENTE   | Por proveer por OVI       | `docs/content/technical/`  |
| TECH-017 | Fichas Técnicas — Línea Biotecnología (2 prod.) | Set de fichas técnicas para la línea OVI Biotecnología                     | Ficha técnica | Todos                         | PROD-064, PROD-065   | ES     | PENDIENTE   | Por proveer por OVI       | `docs/content/technical/`  |

---

## 10. HOJAS DE SEGURIDAD (MSDS)

**Carpeta de destino:** `docs/content/msds/`

> **Nota:** Las hojas MSDS (Material Safety Data Sheet) son documentos técnicos regulatorios. Su contenido exacto debe ser provisto por OVI. Los registros a continuación representan los documentos que deben existir para cada producto.

| ID       | Nombre                                        | Descripción                                                                   | Categoría | Sector                        | Producto relacionado | Idioma | Estado    | Fuente              | Ubicación futura       |
|----------|-----------------------------------------------|-------------------------------------------------------------------------------|-----------|-------------------------------|----------------------|--------|-----------|---------------------|------------------------|
| MSDS-001 | MSDS — OVI Desengrasante Industrial           | Hoja de seguridad del desengrasante industrial (Ultradegreaser / Biodex)      | MSDS      | Industria, Transporte, Energía | PROD-001            | ES     | PENDIENTE | Por proveer por OVI | `docs/content/msds/`   |
| MSDS-002 | MSDS — OVI Ecoseal                            | Hoja de seguridad del sellador de pisos                                       | MSDS      | Institucional, Energía, Industria | PROD-002         | ES     | PENDIENTE | Por proveer por OVI | `docs/content/msds/`   |
| MSDS-003 | MSDS — OVI JP 35                              | Hoja de seguridad del desengrasante para grasas minerales                     | MSDS      | Industria, Energía, Transporte | PROD-003           | ES     | PENDIENTE | Por proveer por OVI | `docs/content/msds/`   |
| MSDS-004 | MSDS — OVI Solwash                            | Hoja de seguridad del detergente para flota vehicular                         | MSDS      | Transporte                    | PROD-004             | ES     | PENDIENTE | Por proveer por OVI | `docs/content/msds/`   |
| MSDS-005 | MSDS — OVI Ecoshine                           | Hoja de seguridad del limpiador de pisos con desinfección                     | MSDS      | Institucional, Hospitales     | PROD-005             | ES     | PENDIENTE | Por proveer por OVI | `docs/content/msds/`   |
| MSDS-006 | MSDS — OVI Eco Wax                            | Hoja de seguridad de la cera ecológica para pisos                             | MSDS      | Institucional, Retail         | PROD-006             | ES     | PENDIENTE | Por proveer por OVI | `docs/content/msds/`   |
| MSDS-007 | MSDS — OVI CR 30 / CR 30 S                    | Hoja de seguridad del desengrasante solvente                                  | MSDS      | Industria, Energía            | PROD-007             | ES     | PENDIENTE | Por proveer por OVI | `docs/content/msds/`   |
| MSDS-008 | MSDS — OVI Handsol                            | Hoja de seguridad del limpiador de manos en seco                              | MSDS      | Industria, Transporte, Energía | PROD-008            | ES     | PENDIENTE | Por proveer por OVI | `docs/content/msds/`   |
| MSDS-009 | MSDS — Línea Industrial (17 prod.)            | Set de hojas MSDS para toda la línea OVI Industrial                           | MSDS      | Industria                     | PROD-010 a PROD-026  | ES     | PENDIENTE | Por proveer por OVI | `docs/content/msds/`   |
| MSDS-010 | MSDS — Línea Alimentos (16 prod.)             | Set de hojas MSDS para toda la línea OVI Alimentos                            | MSDS      | Alimentos                     | PROD-027 a PROD-042  | ES     | PENDIENTE | Por proveer por OVI | `docs/content/msds/`   |
| MSDS-011 | MSDS — Línea Institucional (11 prod.)         | Set de hojas MSDS para toda la línea OVI Institucional                        | MSDS      | Institucional                 | PROD-043 a PROD-053  | ES     | PENDIENTE | Por proveer por OVI | `docs/content/msds/`   |
| MSDS-012 | MSDS — Línea Cuidado Personal (4 prod.)       | Set de hojas MSDS para la línea de cuidado personal                           | MSDS      | Todos                         | PROD-054 a PROD-057  | ES     | PENDIENTE | Por proveer por OVI | `docs/content/msds/`   |
| MSDS-013 | MSDS — Línea Lavandería (6 prod.)             | Set de hojas MSDS para la línea OVI Lavandería                                | MSDS      | Lavandería                    | PROD-058 a PROD-063  | ES     | PENDIENTE | Por proveer por OVI | `docs/content/msds/`   |
| MSDS-014 | MSDS — Línea Biotecnología (2 prod.)          | Set de hojas MSDS para la línea OVI Biotecnología                             | MSDS      | Todos                         | PROD-064, PROD-065   | ES     | PENDIENTE | Por proveer por OVI | `docs/content/msds/`   |

---

## 11. ESTRUCTURA DE CARPETAS

```
docs/
└── content/
    ├── OVI_CONTENT_MASTER.md          ← Este archivo (inventario maestro)
    │
    ├── cases/                          ← Casos de éxito (CASE-001 …)
    │   └── .gitkeep
    │
    ├── products/                       ← Productos: fichas, renders, imágenes (PROD-001 …)
    │   └── .gitkeep
    │
    ├── services/                       ← Servicios: descripciones, entregables (SERV-001 …)
    │   └── .gitkeep
    │
    ├── industries/                     ← Sectores e industrias (IND-001 …)
    │   └── .gitkeep
    │
    ├── videos/                         ← Videos institucionales y demos (VIDEO-001 …)
    │   └── .gitkeep
    │
    ├── photos/                         ← Fotografías oficiales (PHOTO-001 …)
    │   └── .gitkeep
    │
    ├── brochures/                      ← Brochures y catálogos PDF (BROCH-001 …)
    │   └── .gitkeep
    │
    ├── logos/                          ← Logos y elementos de marca (LOGO-001 …)
    │   └── .gitkeep
    │
    ├── technical/                      ← Fichas técnicas de producto (TECH-001 …)
    │   └── .gitkeep
    │
    └── msds/                           ← Hojas de seguridad MSDS (MSDS-001 …)
        └── .gitkeep
```

---

## RESUMEN DEL INVENTARIO

| Categoría            | IDs            | Total registrado | Estado predominante |
|----------------------|----------------|-----------------|---------------------|
| Casos de éxito       | CASE-001–003   | 3               | ACTIVO              |
| Productos            | PROD-001–072   | 72              | Mixto               |
| Servicios            | SERV-001–010   | 10              | ACTIVO              |
| Industrias / Sectores | IND-001–011   | 11              | Mixto               |
| Videos               | VIDEO-001–007  | 7               | PLACEHOLDER         |
| Fotografías          | PHOTO-001–010  | 10              | Mixto               |
| Brochures            | BROCH-001–010  | 10              | PLACEHOLDER         |
| Logos                | LOGO-001–008   | 8               | Mixto               |
| Fichas técnicas      | TECH-001–017   | 17              | PENDIENTE           |
| MSDS                 | MSDS-001–014   | 14              | PENDIENTE           |
| **TOTAL**            |                | **162**         |                     |

---

## PRÓXIMOS PASOS

Para completar este inventario se requiere de OVI:

1. **Fotografías oficiales** — Entregar por sector/producto para reemplazar PLACEHOLDERs en `docs/content/photos/`.
2. **Videos** — Entregar videos institucionales y demos para `docs/content/videos/`.
3. **Brochures y catálogos** — Entregar PDFs oficiales para `docs/content/brochures/`.
4. **Fichas técnicas** — Entregar fichas oficiales de todos los productos para `docs/content/technical/`.
5. **Hojas MSDS** — Entregar hojas de seguridad de todos los productos para `docs/content/msds/`.
6. **Logos completos** — Entregar set completo de variantes de logo para `docs/content/logos/`.
7. **Validación de productos EN-REVISION** — Confirmar y aprobar contenido de PROD-003 a PROD-009.
8. **Contenido de Instagram** — Inventariar y registrar contenido del Instagram oficial de OVI.

---

*Este documento es un inventario de organización. No genera, modifica ni publica contenido. Solo organiza lo existente. Toda adición de contenido real requiere aprobación previa de OVI.*

*Versión 1.0 — Foundation Order 001 — Pendiente de aprobación*
