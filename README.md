# Moris Beauty — Compact 3D Storefront

A premium, mobile-first beauty-commerce portfolio concept designed for the Mauritian market with **Next.js, TypeScript, React Three Fiber, original product visuals and accessible motion**.

Moris Beauty demonstrates how a storefront can combine a selective 3D product experience with familiar, fast shopping flows. The homepage has been deliberately compressed into four high-value stages so visitors can understand the concept without excessive scrolling.

> **Portfolio boundary:** Moris Beauty is a fictional original brand. The project is not affiliated with Simple.mu or any retailer, and it does not process real orders, payments or personal data.

## Preview

The gallery below reflects the compact v2.1 visual direction; v2.1.2 keeps that art direction while refining spacing and interaction reliability.


| 3D hero | Compact commerce section |
|---|---|
| ![Moris Beauty 3D hero](docs/screenshots/v2.1.0/home-top-desktop.png) | ![Moris Beauty commerce section](docs/screenshots/v2.1.0/home-commerce-desktop.png) |

| Experience panels | Mobile hero |
|---|---|
| ![Moris Beauty experience panels](docs/screenshots/v2.1.0/home-experience-desktop.png) | ![Moris Beauty mobile homepage](docs/screenshots/v2.1.0/home-mobile.png) |

![Moris Beauty compact shop catalogue](docs/screenshots/v2.1.0/shop-desktop.png)

## Highlights

- True WebGL hero built with React Three Fiber and Drei
- Layered 3D product stage with restrained pointer parallax and soft floating motion
- Static loading, WebGL-failure and reduced-motion fallbacks
- Compact homepage with substantially less scrolling than earlier releases
- Visual category rail with direct routes into skincare, makeup, fragrance and nails
- Four-product featured edit with compact premium cards
- Searchable catalogue with category filters, sorting and centred filtered results
- Eight original fictional products with MUR pricing
- Static product routes with shades, stock, delivery and click-and-collect details
- Persistent local cart with quantity and fulfilment controls
- Three-step Beauty Finder with transparent recommendation rules
- Public-safe WhatsApp share and advice flows
- GitHub Actions quality workflow and PowerShell publication helper

## v2.1.2 — Stability & Spacing Refinement

This release keeps the compact four-stage homepage and focuses on reliability and finish:

1. fixes direct category navigation between Shop, Skincare, Makeup and Fragrance;
2. removes the apparent small-to-large 3D zoom on cold homepage loads;
3. restores correct badge and wishlist positioning on product cards;
4. reduces unnecessary blank space across all primary routes without making the interface cramped.

The category tabs now also keep the URL in sync, which improves refresh, browser-history and direct-link behaviour.

## Technology

- Next.js 16 App Router
- React 19
- TypeScript
- React Three Fiber
- Drei
- Three.js
- Motion for React
- Lucide React
- CSS custom properties and responsive layouts
- Original SVG product artwork used as lightweight visual assets

## Architecture

The application uses server-oriented routes for static commerce content and small client boundaries only where browser state, animation or WebGL is required.

```text
app/
  page.tsx                    Compact homepage experience
  shop/                       Searchable catalogue
  product/[slug]/             Static product routes
  beauty-finder/              Recommendation flow
  cart/                       Cart and fulfilment demo
components/
  hero-scene.tsx              Isolated React Three Fiber scene
  hero-visual.tsx             Lazy loading, pause control and fallbacks
  cart-provider.tsx           Local cart state and persistence
  product-card.tsx            Reusable commerce card
  product-detail-client.tsx   Product interactions
  beauty-finder-client.tsx    Transparent quiz logic
```

More detail is available in [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md).

## Run locally

### Requirements

- Node.js 20.9 or newer
- npm 10 or newer recommended

### Installation

```bash
npm ci
npm run dev
```

Open `http://localhost:3000`.

### Production mode

```bash
npm run build
npm run start
```

### Quality checks

```bash
npm run typecheck
npm run lint
npm run build
npm audit --omit=dev
```

## Environment configuration

No credentials are required.

Copy `.env.example` to `.env.local` only when setting the canonical deployment URL:

```env
NEXT_PUBLIC_SITE_URL=https://your-deployment.example
```

Never commit real secrets or payment credentials.

## Deploy to Vercel

1. Push this repository to GitHub.
2. Import it into Vercel.
3. Set `NEXT_PUBLIC_SITE_URL` to the final deployment URL.
4. Deploy using the default Next.js settings.

## Publish to GitHub from Windows

After authenticating GitHub CLI with `gh auth login`, run from the repository root:

```powershell
Set-ExecutionPolicy -Scope Process Bypass

.\scripts\publish-to-github.ps1 `
  -GitHubUsername "YOUR-GITHUB-USERNAME" `
  -CreateWithGitHubCli
```

The helper performs a locked installation, TypeScript validation, linting and a production build before publishing.

## Honest limitations

This project intentionally does **not** claim:

- production authentication or customer accounts;
- a live database or inventory service;
- seller or administrator permissions;
- real MIPS, Juice, card or bank-payment integration;
- real order creation or fulfilment;
- medical or diagnostic recommendations;
- client work for Simple.mu.

The 3D hero is a portfolio demonstration using a lightweight original visual asset inside a WebGL stage. A production retailer would replace the demonstration asset with approved optimised GLB models and photography.

## Documentation

- [Architecture](docs/ARCHITECTURE.md)
- [Portfolio presentation notes](docs/PORTFOLIO_NOTES.md)
- [Security policy](SECURITY.md)
- [Contribution guide](CONTRIBUTING.md)
- [Validation record](VALIDATION.md)
- [Changelog](CHANGELOG.md)

## Licence

Released under the [MIT Licence](LICENSE). Product names, visual compositions and the Moris Beauty identity are original fictional portfolio material.
