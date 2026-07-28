# PhysaFlow Public Report

Public website for the PhysaFlow report about **Stranded Capacity** in AI data centers.

## Tech Stack

- Next.js
- React
- Tailwind CSS

## Getting Started

Install dependencies:

```bash
pnpm install
```

Run the development server:

```bash
pnpm dev
```

Open http://localhost:3000

Verify the production build compiles:

```bash
pnpm build
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

## Team

SO7 - Team 02

## Content Authoring (MDX)

Report content is written in `.mdx` files. Any `page.mdx` inside `app/`
becomes a route, and React components can be imported and used inline.

See `app/sandbox/page.mdx` for a working reference.

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

Then run `pnpm build` before `pnpm dev`.

### Hydration mismatch on `<html>` / `<body>`

If the browser console reports a hydration error on `app/layout.tsx`
(e.g. mismatched `className` on `<html>`, or an unknown attribute like
`__processed_<uuid>__="true"`), a browser extension often mutated the DOM
before React hydrated. `suppressHydrationWarning` on `<html>` and `<body>`
covers this expected case.

Confirm with a private/incognito window (extensions disabled): if the warning
only appears with extensions on, it is not an application logic bug.

### Port 3000 already in use

```powershell
# PowerShell
netstat -ano | findstr :3000
taskkill /PID <pid> /F
```