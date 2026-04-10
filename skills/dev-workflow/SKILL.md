---
name: dev-workflow
description: Local setup, npm scripts, codegen prerequisites, and CI.
---

# Dev workflow – Contentstack Kickstart: Next.js GraphQL

## When to use

- Setting up the repo from scratch or onboarding someone new
- You need the canonical list of npm scripts or to know when to run GraphQL codegen
- You want to know what GitHub Actions run on pull requests

## Instructions

### Prerequisites

- Node.js and npm suitable for Next.js 16 (see root `package.json` dependencies).
- A Contentstack stack and tokens; product-specific steps and env variable names are in [README.md](../../README.md).

### Setup

- `npm install` from the repository root.
- Copy or create `.env` using the variables documented in [README.md](../../README.md) (same names `codegen.ts` reads via `dotenv`).

### npm scripts (canonical list)

| Script | Command | Notes |
| --- | --- | --- |
| `dev` | `next dev` | Local development at default Next port |
| `build` | `next build` | Production build |
| `start` | `next start` | Run production server after `build` |
| `lint` | `next lint` | ESLint via Next |
| `codegen` | `graphql-codegen --config codegen.ts` | Fetches schema from Contentstack GraphQL using env (`apiKey`, `environment`, `region`, delivery token). Run after schema or document changes affecting types |

### Codegen and env

- `codegen.ts` loads `.env` and builds the schema URL from `NEXT_PUBLIC_CONTENTSTACK_*` values. Without valid env, codegen fails.
- Generated output goes to `gql/`; regenerate with `npm run codegen` instead of hand-editing.

### Branches and pull requests

- There is no `CONTRIBUTING.md` in this repo; follow your team or GitHub organization’s usual PR practices.

### CI on pull requests

- [.github/workflows/policy-scan.yml](../../.github/workflows/policy-scan.yml) — security policy checks (e.g. `SECURITY.md`, license) for public repos
- [.github/workflows/sca-scan.yml](../../.github/workflows/sca-scan.yml) — supply-chain / dependency scanning
- [.github/workflows/issues-jira.yml](../../.github/workflows/issues-jira.yml) — issue integration

These workflows do **not** run `npm run build` or `npm run lint`; run those locally before merging when possible.
