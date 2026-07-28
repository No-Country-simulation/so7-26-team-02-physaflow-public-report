# Contributing Guide

## Branch Strategy

- `main`: Production-ready code.
- `development`: Integration branch.
- `feature/*`: New features.
- `fix/*`: Bug fixes.
- `docs/*`: Documentation changes.
- `chore/*`: Maintenance tasks.

## Branch Naming Convention

Examples:

```text
feature/login
feature/user-profile
fix/navbar
docs/readme
chore/dependencies
```

## Commit Convention

| Type | Description |
|------|-------------|
| `feat` | New feature or component |
| `fix` | Bug fix |
| `docs` | Documentation updates |
| `chore` | Maintenance or configuration |
| `revert` | Revert a previous commit |

## Pull Request Process

1. Create a branch from `development`.
2. Implement your changes.
3. Commit following the commit convention.
4. Push your branch to GitHub.
5. Open a Pull Request targeting `development`.
6. Wait for at least one review.
7. Resolve all review comments.
8. Merge only after approval.

## Development Workflow

```text
feature/*
      │
      ▼
Pull Request
      │
      ▼
development
      │
      ▼
Pull Request
      │
      ▼
main
```
