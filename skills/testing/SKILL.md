---
name: testing
description: Verifying changes in this repo without a dedicated unit or E2E test suite.
---

# Testing – Contentstack Kickstart: Next.js GraphQL

## When to use

- Before opening a PR or after touching data fetching, codegen, or routing
- You need a repeatable smoke path but there is no `npm test` in this project

## Instructions

### Automated checks available today

- **Lint:** `npm run lint`
- **Typecheck + bundle sanity:** `npm run build` catches many TypeScript and Next.js issues.

There is **no** Jest, Vitest, Playwright, or Cypress setup in `package.json` and no `*.test.*` / `*.spec.*` sources—do not assume a test runner exists.

### GraphQL types

- After changing GraphQL operations, run `npm run codegen` (requires `.env`) and confirm `npm run build` still passes.

### Manual and preview checks

- `npm run dev`, open the app in the browser, exercise the home route and Live Preview flows documented in [README.md](../../README.md).
- Never commit real API keys, delivery tokens, or preview tokens; use local `.env` only.
