# PhysaFlow Public Report

Public website for the PhysaFlow report about **Stranded Capacity** in AI data centers.

## Tech Stack

- Next.js
- React
- Tailwind CSS

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open http://localhost:3000

Verify the production build compiles:

```bash
npm run build
```

## Commit Convention

This project follows the **Conventional Commits** specification to keep the commit history clean, consistent, and easy to understand.

| Type | Description |
|------|-------------|
| `feat` | Introduces a new feature or component. |
| `fix` | Fixes a bug or issue. |
| `docs` | Adds or updates project documentation. |
| `chore` | Performs maintenance tasks, configuration changes, or dependency updates. |
| `revert` | Reverts a previous commit. |

## Branches

- `main` → Production
- `develop` → Development
- `feature/*` → New features

## Brand Color Palette

The **PhysaFlow** design system is based on a dark green palette that conveys trust, stability, and professionalism, complemented by gold accents to highlight important UI elements.

### Primary Greens

| Color | Hex | Usage |
|--------|-----|-------|
| Dark Green | `#0B1F16` | Main application background |
| Deep Green | `#14291E` | Elevated surfaces (cards, sidebar, modals) |
| Forest Green | `#1F3D2B` | Borders, hover states, active elements |

### Gold Accents

| Color | Hex | Usage |
|--------|-----|-------|
| Gold | `#C9A227` | Icons, active borders, badges, primary accents |
| Light Gold | `#E8D48A` | Highlighted text on dark backgrounds (use sparingly) |

### Neutral Colors

| Color | Hex | Usage |
|--------|-----|-------|
| Warm White | `#F5F3EE` | Primary text on dark backgrounds |
| Muted Green Gray | `#A8AFA9` | Secondary text and metadata |
| Dark Green Gray | `#2A3830` | Dividers, borders, and separators |

### Design Guidelines

- Use **dark green tones** as the primary foundation of the interface.
- Reserve **gold** exclusively for emphasis and visual hierarchy.
- Apply gold to:
  - Active card borders
  - Icons
  - Primary action buttons
  - Badges
  - Section numbers
  - Key highlights
- **Avoid using gold as the background color for large sections or pages.**
- Maintain a consistent contrast ratio to ensure accessibility and readability.


## Team

SO7 - Team 02

## Content Authoring (MDX)

Report content is written in `.mdx` files. Any `page.mdx` inside `app/`
becomes a route, and React components can be imported and used inline.

See `app/prueba-mdx/page.mdx` for a working reference.

Shared MDX component overrides live in `mdx-components.tsx` at the project root.

## Troubleshooting

### `Cannot find module '@mdx-js/loader'`

The Turbopack cache is stale — this usually happens when the dev server was
already running before dependencies were installed.

Stop the dev server, then:

```powershell
# PowerShell
Remove-Item -Recurse -Force .next
```

```bash
# bash / zsh
rm -rf .next
```

Then run `npm run build` before `npm run dev`.

### Hydration mismatch on `<body>`

If the browser console reports a hydration error pointing at
`app/layout.tsx` with an unknown attribute such as
`__processed_<uuid>__="true"`, the cause is a browser extension injecting
attributes into the DOM before React hydrates. It is not an application bug.

Confirm it by opening the page in a private/incognito window. If the error
disappears, no code change is needed.

### Port 3000 already in use

```powershell
# PowerShell
netstat -ano | findstr :3000
taskkill /PID <pid> /F
```