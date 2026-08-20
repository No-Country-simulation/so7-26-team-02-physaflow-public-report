<div align="center">
<picture> <source media="(prefers-color-scheme: dark)" srcset="./assets/logo-dark.svg"> <source media="(prefers-color-scheme: light)" srcset="./assets/logo-light.svg"> <img alt="PhysaFlow — Stranded Capacity Report" src="./assets/logo-dark.svg" width="380"> </picture>
<br><br>
 
**Un reporte de referencia de la industria que define el vocabulario operativo para identificar y medir la capacidad pagada y encendida que no produce trabajo computacional en data centers de IA.**
 
[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![License](https://img.shields.io/badge/license-MIT-yellow?style=for-the-badge)](#-licencia)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen?style=for-the-badge)](#-contribuir)
 
[Demo](#-demo) · [Instalación](#-instalación) · [Uso](#️-uso)
 
</div>
<br>

## 📖 Descripción

**Stranded Capacity Report** es un reporte interactivo desarrollado por **PhysaFlow** que presenta una taxonomía estandarizada del desperdicio de capacidad ("stranded capacity") en data centers de IA, clasificado en tres capas críticas:

- **Facility** — infraestructura física (energía, refrigeración, espacio)
- **IT** — capa de hardware/infraestructura de cómputo
- **Workload** — capa de cargas de trabajo y utilización real

El objetivo es proveer a operadores y stakeholders un lenguaje común y métricas consistentes para diagnosticar dónde se pierde capacidad pagada pero inutilizable, clasificado en tres capas críticas:

<div align="center">

| 🏢 Facility | 💻 IT | 📊 Workload |
|:---:|:---:|:---:|
| Infraestructura física — energía, refrigeración, espacio | Infraestructura de cómputo y hardware | Cargas de trabajo y utilización real |

</div>

<br>

## 🎬 Demo

<div align="center">

  [![Ver Demo](https://img.shields.io/badge/▶_Ver_Demo-en_vivo-FFC53D?style=for-the-badge)](#)

  <sub>🚧 Próximamente — reemplaza el `#` por la URL del despliegue.</sub>

</div>

<br>

## ✨ Secciones del reporte

<div align="center">

| Sección | Contenido |
|:---|:---|
| 📊 **Overview** | Resumen ejecutivo del reporte |
| ⚠️ **Problem** | Descripción del problema de capacidad varada |
| 🧬 **Taxonomy** | Taxonomía de las tres capas (Facility / IT / Workload) |
| 🏢 **Facility** | Detalle de la capa de infraestructura física |
| 💻 **IT** | Detalle de la capa de infraestructura de cómputo |
| 📈 **Workload** | Detalle de la capa de cargas de trabajo |
| 💬 **Evidence** | Evidencia y casos de soporte |
| 🔗 **Citations** | Fuentes y referencias citadas |

</div>

<br>

## 🧰 Stack tecnológico

- **Framework:** Next.js (App Router) + TypeScript
- **Contenido:** MDX (`mdx-components.tsx`)
- **Gestor de paquetes:** pnpm (monorepo con `pnpm-workspace.yaml`)
- **Estilos:** TailwindCSS
- **Despliegue:** Vercel

## ✅ Requisitos previos

- Node.js `>= 18.x`
- pnpm

## 🚀 Instalación

```bash
# Clonar el repositorio
git clone https://github.com/<usuario>/physaflow-public-report.git
cd physaflow-public-report

# Instalar dependencias
pnpm install
```

## ▶️ Uso

```bash
# Entorno de desarrollo
pnpm dev

# Build de producción
pnpm build

# Levantar build de producción
pnpm start
```

La app quedará disponible en `http://localhost:3000`.

## ⚙️ Configuración

Crea un archivo `.env.local` en la raíz del proyecto a partir de `.env.example`:

```bash
cp .env.example .env.local
```

| Variable | Descripción |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | URL base del sitio |
| `...` | _(completar según variables reales)_ |

## 📁 Estructura del proyecto

```
physaflow-public-report/
├── so7-26-team-02-ph.../   # App principal (Next.js)
│   ├── app/
│   │   ├── citations/       # Sección Citations (MDX)
│   │   ├── components/      # Componentes reutilizables (sidebar, layout, cards)
│   │   ├── evidence/        # Sección Evidence (MDX)
│   │   ├── problem/         # Sección Problem (MDX)
│   │   ├── sandbox/         # Entorno de pruebas / prototipos
│   │   ├── taxonomy/        # Sección Taxonomy (MDX)
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── docs/                 # Documentación adicional del proyecto
│   ├── public/                # Assets estáticos
│   ├── .gitignore
│   ├── CONTRIBUTING.md
│   ├── eslint.config.mjs
│   ├── mdx-components.tsx    # Configuración de componentes MDX
│   ├── next.config.ts
│   ├── package.json
│   ├── postcss.config.mjs
│   ├── tsconfig.json
│   └── README.md
├── pnpm-workspace.yaml
└── README.md
```

## 🧪 Testing

```bash
pnpm test
```

## 🌐 Despliegue

_(completar según el proveedor: Vercel, Netlify, servidor propio, etc.)_

## 🤝 Contribuir

Las contribuciones son bienvenidas 🎉

1. Haz un fork del proyecto
2. Crea tu rama (`git checkout -b feature/nueva-seccion`)
3. Commitea tus cambios (`git commit -m 'feat: agrega nueva sección'`)
4. Push a la rama (`git push origin feature/nueva-seccion`)
5. Abre un Pull Request

Revisa `CONTRIBUTING.md` para más detalles sobre el flujo y estándares de código.


<br>

<div align="center">
## Team 2
</div>
