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
