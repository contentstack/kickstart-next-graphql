---
name: framework
description: Next.js 16 App Router, server vs client components, layout, and Tailwind in this repo.
---

# Framework (Next.js) – Contentstack Kickstart: Next.js GraphQL

## When to use

- Adding routes, layouts, or moving UI between server and client components
- Deciding where `Suspense` belongs (e.g. preview + `useSearchParams`)
- Styling with Tailwind or using the `@/*` import alias

## Instructions

### App Router layout

- [app/layout.tsx](../../app/layout.tsx) — root layout for the application
- [app/page.tsx](../../app/page.tsx) — home route: async **server** component; chooses preview client branch vs static `getPage("/")` path

### Server vs client components

- Default components under `app/` are **server** components unless marked with `"use client"`.
- [components/Preview.tsx](../../components/Preview.tsx) is a **client** component (`"use client"`) because it uses `useSearchParams`, React hooks, and Live Preview behavior on the client.
- [components/Page.tsx](../../components/Page.tsx) — presentational rendering of fetched page data; keep imports consistent with how it is used (from server or client parents).

### Suspense

- When rendering `Preview`, the home page wraps it in `<Suspense>` because `useSearchParams()` in a client subtree expects a boundary in the App Router pattern used here.

### Project structure

- `app/` — routes and layouts
- `components/` — React UI pieces shared by routes
- `lib/` — non-UI modules (Contentstack integration, types)

### TypeScript and imports

- [tsconfig.json](../../tsconfig.json) uses `strict: true` and `"paths": { "@/*": ["./*"] }` — import from the repo root with `@/...` (e.g. `@/lib/contentstack`).

### Styling

- Tailwind CSS 4 with `@tailwindcss/postcss` (see `package.json`); PostCSS config is part of the standard Next + Tailwind setup for this project.
