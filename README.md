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

## Branches

- `main` → Production
- `develop` → Development
- `feature/*` → New features

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