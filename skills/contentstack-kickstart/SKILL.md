---
name: contentstack-kickstart
description: Contentstack Delivery SDK, GraphQL, Live Preview, codegen, env, and data layer in this kickstart.
---

# Contentstack kickstart – Contentstack Kickstart: Next.js GraphQL

## When to use

- Changing how the app talks to Contentstack (REST SDK, GraphQL, Live Preview)
- Adding or changing GraphQL operations or regenerating `gql/` types
- Debugging env, tokens, regions, or preview vs delivery behavior

## Instructions

### Main entry points

- [lib/contentstack.ts](../../lib/contentstack.ts) — `contentstack.stack(...)` (Delivery SDK), `initLivePreview()`, `getPage()`; uses `graphql-request` and typed documents from `gql/`
- [codegen.ts](../../codegen.ts) — GraphQL Code Generator config: introspects Contentstack GraphQL schema (EU vs default host from region); `documents` globs are the `**/*.ts` / `**/*.tsx` entries in that file (do not point operations at generated `gql/` output)
- [gql/](../../gql/) — generated client preset output; files are marked `eslint-disable` at top—treat as build artifacts

### Environment variables

Use the names documented in [README.md](../../README.md), including at least:

- `NEXT_PUBLIC_CONTENTSTACK_API_KEY`
- `NEXT_PUBLIC_CONTENTSTACK_DELIVERY_TOKEN`
- `NEXT_PUBLIC_CONTENTSTACK_PREVIEW_TOKEN`
- `NEXT_PUBLIC_CONTENTSTACK_REGION`
- `NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT`
- `NEXT_PUBLIC_CONTENTSTACK_PREVIEW`

Optional overrides used for internal/host testing appear in `lib/contentstack.ts` (e.g. content delivery / preview hosts); most kickstarts only need the public vars above.

### GraphQL codegen policy

- Run `npm run codegen` after you change operations in app or lib code that codegen scans.
- Do not manually edit `gql/*.ts` except through regeneration (conflicts and drift otherwise).

### Live Preview

- Preview mode branches in [app/page.tsx](../../app/page.tsx): server-rendered static path vs client [components/Preview.tsx](../../components/Preview.tsx) with `useSearchParams` and Live Preview utils.
- `initLivePreview()` is called from the preview client path; stack config enables `live_preview` when `NEXT_PUBLIC_CONTENTSTACK_PREVIEW` is `"true"`.

### Integration boundaries

- **In scope:** This repo’s wiring of `@contentstack/delivery-sdk`, `@contentstack/live-preview-utils`, `graphql-request`, and `@timbenniks/contentstack-endpoints` for region URLs.
- **Out of scope:** Building a generic reusable SDK—this is an application kickstart.
