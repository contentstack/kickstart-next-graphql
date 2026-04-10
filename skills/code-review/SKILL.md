---
name: code-review
description: PR checklist for this kickstart—secrets, generated code, preview paths, and verification.
---

# Code review – Contentstack Kickstart: Next.js GraphQL

## When to use

- Reviewing a pull request or self-review before requesting review

## Instructions

### Checklist

- **Secrets:** No tokens, keys, or private URLs committed; `.env` stays local (confirm `.gitignore` coverage if adding new secret files).
- **Generated GraphQL:** If operations changed, `gql/` should be updated via `npm run codegen`, not hand-edited arbitrarily.
- **Preview vs production:** Changes to [app/page.tsx](../../app/page.tsx) or [components/Preview.tsx](../../components/Preview.tsx) should keep preview and non-preview paths coherent.
- **Integration:** Stack config, regions, and hosts in [lib/contentstack.ts](../../lib/contentstack.ts) should remain understandable; avoid breaking EU vs default GraphQL host logic in [codegen.ts](../../codegen.ts) without good reason.
- **Accessibility / UX:** If UI changes, quick pass for obvious regressions (focus, contrast, loading states) when the PR touches components.

### Verification

- Author should run lint, build, and manual smoke steps before requesting review.
