# CONTENT RULES
# OVI Experience Platform — Reglas de Contenido

> Versión: 1.0  
> Fecha de vigencia: Work Order 002  
> Aplica a: Todo el contenido de la plataforma OVI

---

## REGLA 1 — NUNCA INVENTAR INFORMACIÓN CORPORATIVA

Está **estrictamente prohibido** crear, inferir o asumir información sobre OVI que no haya sido proporcionada oficialmente.

Esto incluye:
- Cifras de ventas, clientes o alcance.
- Historia de la empresa no confirmada.
- Características de productos no documentadas.
- Certificaciones o reconocimientos no verificados.
- Testimonios o casos de estudio ficticios.

**Si la información no existe, se crea un placeholder. Nunca se inventa.**

---

## REGLA 2 — SOLO DOCUMENTACIÓN OFICIAL OVI ES VÁLIDA

La única fuente válida para poblar el contenido de la plataforma es la documentación oficial proporcionada por OVI a través de sus representantes autorizados o Work Orders oficiales.

Fuentes no válidas:
- Sitios web de terceros o competidores.
- Suposiciones basadas en tendencias del sector.
- Contenido generado por IA sin validación humana de OVI.
- Información desactualizada no confirmada como vigente.

---

## REGLA 3 — INFORMACIÓN FALTANTE → PLACEHOLDER TODO

Cuando la información oficial no esté disponible, se utiliza el formato de placeholder:

```
TODO: [descripción breve de qué información se necesita aquí]
```

Ejemplos:
```
TODO: Insertar misión oficial aprobada por OVI.
TODO: Completar especificaciones técnicas del producto X.
TODO: Validar y agregar certificaciones vigentes.
```

Los placeholders son visibles, trazables y nunca se reemplazan con contenido genérico o inventado.

---

## REGLA 4 — ESPAÑOL ES EL IDIOMA MAESTRO

Todo el contenido original se redacta **primero en español**.

- El español es la lengua de creación, revisión y aprobación.
- Ningún contenido en inglés puede existir sin su versión española aprobada previamente.
- En caso de conflicto entre versiones, la versión española prevalece.
- Las traducciones al inglés son derivadas y deben ser revisadas por hablante nativo.

---

## REGLA 5 — EL INGLÉS SE TRADUCE DEL ESPAÑOL APROBADO

El flujo obligatorio para contenido bilingüe es:

```
Redacción en español → Revisión y aprobación OVI → Traducción al inglés → Revisión de traducción
```

Está **prohibido**:
- Redactar en inglés primero y luego traducir al español.
- Publicar contenido en inglés sin versión española aprobada.
- Usar herramientas de traducción automática sin revisión humana.

---

## REGLA 6 — CERO LOREM IPSUM

Ningún texto placeholder del tipo "Lorem ipsum dolor sit amet..." está permitido en ningún entorno: desarrollo, staging o producción.

Los placeholders válidos son:
- `TODO: [descripción]` — para contenido pendiente.
- `[NOMBRE DEL PRODUCTO]` — para referencias a completar.
- Textos cortos descriptivos como `"Descripción del servicio pendiente de redacción."`.

El Lorem Ipsum confunde a los agentes de IA, contamina índices de búsqueda y degrada la calidad del entrenamiento del sistema.

---

## REGLA 7 — CERO COPYWRITING INDUSTRIAL GENÉRICO

Está prohibido el uso de frases vacías o genéricas comunes en la industria de limpieza o en sitios corporativos, tales como:

- ❌ "Soluciones integrales para su empresa."
- ❌ "Comprometidos con la excelencia."
- ❌ "Más de X años de experiencia."
- ❌ "Líderes en el sector."
- ❌ "Calidad garantizada."
- ❌ "Su satisfacción es nuestra prioridad."

Cada frase debe ser específica, técnica y verificable. OVI comunica con precisión de ingeniería.

---

## REGLA 8 — TODA PÁGINA SOPORTA EL POSICIONAMIENTO "INGENIERÍA EN LIMPIEZA"

El posicionamiento central de OVI es:

> **"Ingeniería en Limpieza"**

Cada página, sección o pieza de contenido de la plataforma debe poder responder afirmativamente a esta pregunta:

*¿Este contenido refuerza la idea de que OVI no vende productos de limpieza, sino que aplica ingeniería para resolver problemas de higiene industrial?*

Esto implica:
- Usar lenguaje técnico y preciso, no aspiracional o vago.
- Mostrar metodologías, no solo resultados.
- Citar normativas, certificaciones y parámetros de control cuando sea relevante.
- Posicionar al cliente como un aliado técnico, no como un consumidor.

---

## APLICACIÓN DE ESTAS REGLAS

Estas reglas aplican a:
- Todo el contenido en `company/content/`.
- Prompts del sistema de IA en `company/ai/`.
- Copys del frontend en `src/`.
- Documentación técnica en todos los subdirectorios de `company/`.

**Agentes de IA y desarrolladores deben verificar el cumplimiento de estas reglas antes de hacer commit de cualquier contenido.**
