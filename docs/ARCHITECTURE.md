# Architecture Notes

## Objectives

The project is designed around five constraints:

1. 3D should strengthen one high-value surface rather than dominate every route.
2. Commerce tasks must remain understandable without motion.
3. Expensive browser-only code should be isolated from server-rendered content.
4. Mobile layouts should be intentionally compact and horizontally scannable where appropriate.
5. Public portfolio code must contain no client assets, credentials or proprietary logic.

## Rendering model

The Next.js App Router provides server-rendered route shells. Client boundaries are used only where browser state, animation or WebGL is required.

### Server-oriented components

- route pages and metadata;
- product lookup and static product route generation;
- footer and other non-interactive structure;
- typed local product content.

### Client components

- cart provider and drawer;
- catalogue search, category and sort state;
- product add-to-cart actions;
- Beauty Finder state;
- 3D hero loader, pause control and scene.

## Selective 3D

`hero-visual.tsx` dynamically imports `hero-scene.tsx` with server rendering disabled for that scene only.

The scene uses React Three Fiber and Drei to create:

- a layered product presentation card;
- a product artwork plane inside three-dimensional space;
- real lighting, depth, shadows, rings and floating objects;
- restrained pointer parallax and low-amplitude idle movement.

The hero keeps its headline, body copy, actions and benefits in semantic HTML outside the canvas. Users requesting reduced motion receive a static poster. A React error boundary also returns the static poster if WebGL fails during rendering.

The current lightweight SVG artwork is original portfolio material. A production implementation should replace it with an approved, compressed GLB product asset where a true rotatable model is commercially justified.

## Reduced-scroll homepage

The homepage is deliberately compressed into four stages:

1. 3D hero;
2. category rail plus featured products;
3. paired ritual and Beauty Finder panels;
4. service strip and compact footer.

Desktop visitors can review the core concept in a few viewport transitions. Mobile category and product sections use native horizontal overflow and scroll snapping rather than forcing a long vertical stack or hijacking page scrolling.

## State

Cart state uses React context and browser local storage. The provider:

- restores a saved cart after hydration;
- persists line items and quantities;
- supports product variants;
- exposes drawer state and subtotal;
- collects no personal information.

A production implementation would replace this with authenticated server state and an inventory/order service.

## Product model and visual system

The typed local product dataset keeps the demonstration deterministic and deployable without infrastructure. Each record contains:

- brand and category;
- MUR price;
- visual type and palette;
- product copy;
- optional shades;
- benefits and ingredients;
- stock presentation.

Original SVG packshots are reused across product cards, categories, the product story and cart views. The homepage 3D stage uses a dedicated high-resolution SVG visual as a lightweight texture.

## Progressive enhancement path

A commercial continuation could add:

1. approved GLB models and a controlled asset pipeline;
2. Supabase/PostgreSQL catalogue data;
3. authentication and customer profiles;
4. seller/admin roles and row-level policies;
5. image storage and moderation;
6. payment-provider sandbox integration;
7. server-verified webhooks and reconciliation;
8. field performance and conversion analytics.

None of those claims are simulated as production-ready in this repository.
