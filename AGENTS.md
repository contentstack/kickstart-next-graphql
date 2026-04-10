# Contentstack Kickstart: Next.js GraphQL – Agent guide

**Universal entry point** for contributors and AI agents. Detailed conventions live in **`skills/*/SKILL.md`**.

## What this repo is

| Field | Detail |
| --- | --- |
| **Name:** | https://github.com/contentstack/kickstart-next-graphql |
| **Purpose:** | Minimal Next.js app that connects to Contentstack over GraphQL with Live Preview enabled. |
| **Out of scope (if any):** | Not an npm library—this is a sample / kickstart application, not a packaged SDK. |

## Tech stack (at a glance)

| Area | Details |
| --- | --- |
| Language | TypeScript 5, React 19, Node.js (compatible with Next.js 16; no `engines` field in package.json) |
| Build | Next.js 16 (`next build`); [`package.json`](package.json), [`tsconfig.json`](tsconfig.json) |
| Tests | No automated test runner or `*.test`/`*spec*` files in this repo today |
| Lint / coverage | ESLint via `next lint`; [`.eslintrc.json`](.eslintrc.json) (`next/core-web-vitals`, `next/typescript`). No coverage tool configured |
| Other | Tailwind CSS 4; GraphQL Code Generator → `gql/`; Contentstack Delivery SDK, Live Preview, `graphql-request` |

## Commands (quick reference)

| Command Type | Command |
| --- | --- |
| Build | `npm run build` |
| Dev server | `npm run dev` |
| Production start | `npm run start` (after build) |
| Lint | `npm run lint` |
| GraphQL codegen | `npm run codegen` (needs `.env` for schema fetch—see [`skills/contentstack-kickstart/SKILL.md`](skills/contentstack-kickstart/SKILL.md)) |

**CI:** This repository runs security and policy workflows on PRs, not `build`/`lint` gates. See [.github/workflows/policy-scan.yml](.github/workflows/policy-scan.yml), [.github/workflows/sca-scan.yml](.github/workflows/sca-scan.yml), and [.github/workflows/issues-jira.yml](.github/workflows/issues-jira.yml).

## Where the documentation lives: skills

| Skill | Path | What it covers |
| --- | --- | --- |
| Dev workflow | [`skills/dev-workflow/SKILL.md`](skills/dev-workflow/SKILL.md) | Local setup, npm scripts, when to run codegen, CI overview |
| Contentstack kickstart | [`skills/contentstack-kickstart/SKILL.md`](skills/contentstack-kickstart/SKILL.md) | SDK, GraphQL, codegen, env vars, `lib/contentstack.ts`, `gql/` |
| Framework (Next.js) | [`skills/framework/SKILL.md`](skills/framework/SKILL.md) | App Router layout, server vs client components, Tailwind, `@/*` paths |
| Testing | [`skills/testing/SKILL.md`](skills/testing/SKILL.md) | Lint, build, manual checks; no unit/E2E suite in repo |
| Code review | [`skills/code-review/SKILL.md`](skills/code-review/SKILL.md) | PR checklist and integration safety |

## Using Cursor (optional)

If you use **Cursor**, [`.cursor/rules/README.md`](.cursor/rules/README.md) only points to **`AGENTS.md`**—same docs as everyone else.
