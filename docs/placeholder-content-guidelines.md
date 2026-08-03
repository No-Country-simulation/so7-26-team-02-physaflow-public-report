# PhysaFlow — Placeholder Content Guidelines

## Propósito

Este documento establece criterios compartidos para crear contenido y datos placeholder coherentes en todas las secciones del reporte.

El contenido placeholder es únicamente ilustrativo y no representa investigación, mediciones ni resultados reales de PhysaFlow.

## Tono y redacción

El contenido debe ser:

* Técnico, profesional y objetivo.
* Claro para operadores de data centers.
* Directo y fácil de comprender.
* Consistente con un reporte de referencia de la industria.

Cada categoría debe explicar:

1. **Qué se observa:** cómo aparece el problema.
2. **Qué cuesta:** qué capacidad o recursos permanecen sin utilizar.
3. **Por qué ocurre:** qué causa la restricción.

Evitar lenguaje publicitario, afirmaciones exageradas y datos presentados como resultados reales.

## Estructura de cada categoría

Cada categoría de stranded capacity debe incluir:

* **Nombre:** corto, distintivo y fácil de recordar.
* **Resumen:** entre 40 y 70 palabras.
* **Qué se observa:** entre 60 y 100 palabras.
* **Qué cuesta:** entre 40 y 80 palabras.
* **Por qué ocurre:** entre 60 y 100 palabras.
* **Indicadores:** entre 3 y 5 datos placeholder.

## Criterios para datos placeholder

Los datos deben ser plausibles, consistentes y claramente identificados como ilustrativos.

| Métrica                 | Rango sugerido |
| ----------------------- | -------------: |
| Capacidad stranded      |         5%–30% |
| Utilización             |        40%–85% |
| Capacidad no utilizable |         5%–25% |
| Impacto en eficiencia   |         3%–20% |
| Tiempo bajo restricción |     2–24 horas |

Los valores deben:

* Incluir unidades.
* Usar un máximo de un decimal.
* Evitar precisión excesiva.
* Mantener coherencia con la descripción.

Etiqueta requerida:

> **Illustrative data — not based on measured PhysaFlow results.**

## Ejemplo de aplicación

### Cooling-Locked Capacity

**Layer:** Facility

**Resumen**

Cooling-Locked Capacity ocurre cuando existe capacidad eléctrica y computacional disponible, pero las restricciones térmicas impiden utilizarla de forma segura.

**Qué se observa**

Algunas zonas alcanzan límites térmicos mientras otras mantienen capacidad disponible. Los operadores no pueden aumentar la carga sin superar los límites de temperatura.

**Qué cuesta**

Parte de la infraestructura permanece energizada, pero no puede utilizarse para generar trabajo computacional.

**Por qué ocurre**

La capacidad de cooling puede estar distribuida de forma desigual o no adaptarse a cambios en la densidad de los racks.

**Indicadores placeholder**

* Capacidad instalada: `10 MW`
* Capacidad utilizable: `8.2 MW`
* Capacidad stranded: `18%`
* Tiempo bajo restricción: `8 horas`

> **Illustrative data — not based on measured PhysaFlow results.**

## Disponibilidad

El documento debe estar disponible para todo el equipo antes de redactar contenido y guardarse en:

`docs/placeholder-content-guidelines.md`

Todo contenido nuevo debe seguir estos criterios.
