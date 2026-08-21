# Documentación Técnica — PhysaFlow
 
> Última actualización: 21 de agosto de 2026

---
 
## 1. Resumen del Proyecto
 
PhysaFlow Stranded capacity report es un **reporte web de "Informe de capacidad varada"** desarrollado con **Next.js** (full-stack), construido como parte del proyecto simulado No Country (equipo `so7-26-team-02`).
 
**Objetivo del proyecto:** presentar un reporte de capacidad estratégica organizado mediante una taxonomía de **Facility / TI Workload**, documentando evidencia, caso (problem) y citaciones asociadas a cada categoría de la taxonomía.
 
---

## 2. Decisiones de Arquitectura
 
### 2.1 Stack Tecnológico
 
| Capa | Tecnología | Justificación |
|---|---|---|
| Framework | Next.js (App Router) | Full-stack en un solo repo, SSR/SSG nativo, despliegue directo en Vercel |
| Contenido / Datos | Archivos MDX | El proyecto no requiere una base de datos; el contenido (evidencia, casos, citaciones, taxonomía) se gestiona como archivos versionados en el propio repositorio, simplificando el despliegue y el control de versiones |
| Estilos | Tailwind CSS | Estilado utility-first, consistencia visual rápida sin escribir CSS a medida |
| Gestor de paquetes | npm | Instalaciones rápidas y eficientes |
| Despliegue | Vercel | Integración nativa con Next.js, despliegue automático por rama/push |
| Autenticación | No implementada | El alcance del proyecto no requiere gestión de usuarios ni sesiones |
 
### 2.2 ¿Por qué MDX en lugar de una base de datos?
 
- El contenido del proyecto es mayormente estático o semi-estático.
- Permite versionar el contenido junto al código (mismo repo, mismo historial de Git).
- Reduce la complejidad de infraestructura (no hay que levantar ni mantener un servidor de base de datos).
- Next.js tiene soporte nativo/optimizado para renderizar MDX en tiempo de build (SSG).

### 2.3 Estructura de Carpetas
 
```
so7-26-team-02-ph.../
├── app/
│   ├── citations/        # Páginas/rutas con las citaciones del reporte
│   ├── components/       # Componentes reutilizables de UI
│   ├── evidence/         # Páginas/rutas con la evidencia recopilada
│   ├── problem/          # Páginas/rutas con el planteamiento del problema (casos)
│   ├── sandbox/          # Entorno de pruebas / prototipado de componentes o vistas
│   ├── taxonomy/         # Páginas/rutas con la taxonomía Facility / TI Workload
│   ├── favicon.ico
│   ├── globals.css       # Estilos globales (Tailwind)
│   ├── layout.tsx        # Layout raíz de la aplicación
│   └── page.tsx          # Página principal (Home)
├── assets/               # Recursos estáticos del proyecto (imágenes, íconos propios)
├── docs/                 # Documentación técnica del proyecto (este archivo vive aquí)
├── public/               # Assets públicos servidos directamente por Next.js
├── mdx-components.tsx    # Configuración global de componentes usados dentro de archivos MDX
├── next.config.ts
├── tsconfig.json
├── postcss.config.mjs
├── eslint.config.mjs
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── CONTRIBUTING.md
└── README.md
```

 
### 2.4 Flujo de Renderizado de Contenido
 
1. El contenido en formato `.mdx` se organiza por dominio dentro de `app/` (`citations`, `evidence`, `problem`, `taxonomy`).
2. La configuración global de componentes MDX vive en `mdx-components.tsx` en la raíz del proyecto (mecanismo estándar de Next.js App Router para personalizar cómo se renderizan elementos MDX, ej. encabezados, links, bloques de código).
3. En build time, Next.js lee y parsea el MDX correspondiente a cada ruta y lo renderiza como componentes React dentro del `layout.tsx` raíz.


### 2.5 Taxonomía: Las Tres Capas de Stranded Capacity
 
El núcleo conceptual del reporte es una **taxonomía de tres capas**, representada como un modelo apilado (`Facility`, `IT`, `Workload`). Cada capa depende de la que tiene debajo, y un cuello de botella en una capa "vara" (deja inutilizable) la capacidad disponible en las capas superiores.
 
| Capa | Qué incluye | Tipo de Stranded Capacity |
|---|---|---|
| **Facility Layer** | Infraestructura física: distribución eléctrica (power distribution), sistemas de enfriamiento (cooling systems) | **Stranded Facility Capacity** — infraestructura física subutilizada (ej. espacio o refrigeración disponible que no se aprovecha) |
| **IT Layer** | Hardware de cómputo y almacenamiento: compute (GPU/CPU), storage | **Stranded IT Capacity** — hardware sin usar (unused hardware) por falta de energía, espacio o conectividad para activarlo |
| **Workload Layer** | Cargas de trabajo que corren sobre el hardware: AI Training, Model Inference | **Stranded Workload Capacity** — capacidad de cómputo disponible que no se traduce en carga de trabajo real ejecutándose |
 
**Idea central:** la capacidad total instalada en la capa inferior (Facility) no siempre se traduce en capacidad utilizable en la capa superior (Workload). El reporte documenta, capa por capa, dónde se pierde esa capacidad y por qué.
 
Cada categoría de la taxonomía se relaciona con tres tipos de contenido, reflejados en la navegación de la app:
- **Evidence** (`app/evidence`): datos/soportes que sustentan la existencia de capacidad varada en una capa específica.
- **Problem** (`app/problem`): el planteamiento del problema que se busca resolver con el reporte.
- **Citations** (`app/citations`): fuentes citadas que respaldan la evidencia y el análisis.

### 2.6 Metodología de Datos (Evidence)
 
> Fuente: contenido de la sección **Evidence — Metodología de Datos** de la aplicación.
 
Esta sección documenta cómo se construyeron los datos numéricos que aparecen en las páginas de taxonomía (Facility, IT, Workload), para que se interpreten con el mismo rigor que el marco conceptual.
 
**Datos ilustrativos, no mediciones reales**
 
Todos los valores numéricos del reporte son **ilustrativos**: no provienen de mediciones, auditorías ni resultados operativos de PhysaFlow, y no deben leerse como evidencia del desempeño de una instalación específica. El alcance del proyecto es metodológico — definir el vocabulario y la estructura con la que la industria puede identificar y medir la capacidad varada — no operativo, ya que publicar cifras reales exigiría acceso a telemetría de instalaciones concretas.
 
Por eso, toda página que presenta cifras incluye la etiqueta:
 
> *Illustrative data — no basado en resultados medidos de PhysaFlow.*

## 3. Convenciones del Proyecto



