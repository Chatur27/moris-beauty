# Validation Record

Validated on **22 June 2026** using Node.js 22.16.0 and npm 10.9.2.

## Release

`moris-beauty-3d-storefront` **v2.1.2 — Stability & Spacing Refinement**

## Passed checks

```text
npm ci                   PASS
npm run typecheck        PASS
npm run lint             PASS
npm run build            PASS
npm audit --omit=dev     PASS — 0 vulnerabilities
```

## Production routes generated

- `/`
- `/shop`
- `/beauty-finder`
- `/cart`
- eight static product routes under `/product/[slug]`
- custom not-found route

## Regression controls implemented

- Shop category links now remount the catalogue with the selected query category, so direct navigation between Shop, Skincare, Makeup, Fragrance and Nails updates correctly.
- In-page category controls also update the browser URL without forcing a full page reload.
- The WebGL hero is revealed only after its canvas dimensions remain stable across multiple rendered frames.
- Normal cold loading uses a neutral scene loader instead of a differently scaled bottle poster, preventing an apparent zoom.
- Reduced-motion users and WebGL failures still receive the complete static product poster.
- Product tags, wishlist controls and Quick Add controls have independent absolute overlay positioning and no longer collapse into the product artwork.
- Product artwork remains unscaled and unfiltered on hover to preserve sharp label typography.
- Final CSS overrides reduce excessive vertical spacing across the homepage, shop, product detail, Beauty Finder, cart and footer while retaining readable and touch-friendly spacing.

## Source boundaries

- Official npm registry URLs are used in `.npmrc` and `package-lock.json`.
- No production credentials, customer data, payment data or third-party client assets are included.
- The demo checkout does not request identity or payment information.
- Moris Beauty remains a fictional portfolio brand with no affiliation to Simple.mu.

## Boundary

This validation confirms installation, TypeScript, linting, production compilation, route generation, dependency status and source-level regression controls. It does not claim production payment, authentication, database, inventory, formal security assessment or client deployment readiness.
