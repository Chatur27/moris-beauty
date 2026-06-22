# Changelog


## v2.2.0 — GitHub Pages Deployment

- added Next.js static export with trailing-slash routes
- added automatic base-path handling for project and root GitHub Pages sites
- added a GitHub Actions build-and-deploy workflow
- converted the shop category query handling to a static-export-safe client boundary
- added base-path-safe 3D and fallback product assets
- added local static preview and export verification scripts
- added a dedicated GitHub Pages deployment guide


## v2.1.3 — Hero Performance + Label Refinement

- reduced homepage scroll jank by pausing the 3D hero animation while the user is actively scrolling
- added viewport-aware 3D rendering so the hero stops continuous rendering once it leaves view
- trimmed WebGL workload with lower DPR and lighter scene geometry/shadow settings
- refined the Rivage Glow hero bottle artwork so the label text sits cleanly inside the label area
- preserved the existing interface and layout while making the hero feel smoother in normal browsing

## 2.1.2 — 22 June 2026

### Reliability and navigation

- Fixed category navigation between `/shop?category=...` URLs by synchronising the client filter state whenever the route query changes.
- Fixed product-card badge and wishlist positioning after the v2.1.1 stacking hotfix.
- Reworked the 3D readiness signal so the scene is revealed only after the canvas has held stable dimensions across multiple frames.
- Removed the mismatched bottle poster during normal loading, preventing the apparent small-to-large zoom on direct homepage loads.
- Added a subtle neutral 3D loading state; the full static bottle remains available for reduced-motion users and WebGL failure.

### Spacing refinement

- Reduced unproductive vertical gaps across the homepage, catalogue, product detail, Beauty Finder, cart and footer.
- Preserved comfortable reading and touch spacing rather than compressing the interface aggressively.
- Shortened homepage category and product stages, paired experience cards, shop filtering lead-in, product-detail transitions, Finder question spacing and cart tail spacing.
- Tightened mobile spacing while retaining horizontal category and product rails.

## 2.1.1 — 22 June 2026

### Stability and visual sharpness

- Replaced the WebGL hero texture source from SVG to a pre-rendered PNG for reliable first-load rendering in Firefox.
- Added a persistent static poster beneath the live WebGL layer so the hero can never collapse to an empty panel.
- Added explicit scene-ready, WebGL-context-loss and error fallback handling.
- Preloaded the hero texture before the scene becomes visible and cross-faded from poster to live 3D only after the texture is ready.
- Removed nested perspective, rotation, scale and filter effects from product-card hover states to keep bottle labels and typography crisp.
- Retained hover feedback through border, shadow and quick-add transitions rather than rasterizing the SVG artwork.

## 2.1.0 — 22 June 2026

### Compact 3D commerce polish

- Reintroduced a true WebGL hero using React Three Fiber, with a layered 3D product stage, pointer parallax, restrained motion and a static loading fallback.
- Compressed the homepage into four high-value stages to materially reduce scrolling.
- Replaced the oversized category section with a compact visual category rail.
- Combined product discovery into one tighter commerce section with denser cards and improved depth.
- Combined the ritual story and Beauty Finder into a two-panel experience section.
- Reduced footer height and tightened global vertical rhythm.
- Centered filtered shop results and reduced empty space on category pages.
- Preserved reduced-motion behavior and mobile horizontal rails without scroll hijacking.

## 2.0.0 — 22 June 2026

### Art direction rebuild

- Rebuilt the homepage composition from the ground up instead of patching the previous procedural 3D hero.
- Replaced the rough realtime bottle with an original cinematic SVG packshot and controlled layered motion.
- Reworked the entire homepage into a cohesive editorial-commerce system: premium hero, brand rail, bento categories, curated product edit, feature ritual, finder experience and service strip.
- Rebuilt all product visuals as original SVG packshots with distinct shapes for droppers, bottles, tubes, lipstick and nail lacquer.
- Elevated the shop and product detail surfaces with a stronger grid, card hierarchy, spacing, materials and responsive behaviour.
- Preserved cart, filtering, product routes, recommendations, reduced-motion support and public portfolio boundaries.

## 1.0.3 — 22 June 2026

### Cinematic hero rebuild

- Rebuilt the homepage hero as a full-bottle cinematic product scene instead of an extreme close-up.
- Replaced the stacked sleeve geometry with a cleaner bottle silhouette, proper cap, softer lighting and restrained motion.
- Added a generated front label design so the bottle reads as an actual premium skincare product.
- Reframed the composition to keep the object, copy and atmospheric space in balance.
- Upgraded the reduced-motion fallback so the static bottle better matches the 3D art direction.
- Refined hero copy and floating benefit cards to support the cinematic presentation.

## 1.0.2 — 22 June 2026

### Visual and experience polish

- Replaced the flat hero-label planes with a fitted cylindrical sleeve so the label remains attached while the bottle rotates.
- Reduced ambient scene movement and particle density for a more controlled premium presentation.
- Retained clear hero calls to action for shopping and the Beauty Finder.
- Replaced the portfolio notice in the announcement bar with click-and-collect messaging.

### Beauty Finder

- Introduced tailored result titles and summaries based on the selected path.
- Added preference chips, a direct top-match action and a public-safe WhatsApp share flow.
- Reduced the result-header footprint so recommended products appear sooner.
- Added clearer recommendation framing and a concise non-medical disclaimer.

### Cart and checkout demonstration

- Added a stronger shopping-bag header, continue-shopping action and item summary.
- Added an assurance panel and three complementary product recommendations.
- Replaced the blocking browser alert with an accessible inline demo-checkout status.

### Repository quality

- Replaced the default Next.js README with a complete public portfolio README.
- Made metadata use `NEXT_PUBLIC_SITE_URL` with a localhost fallback.
- Replaced the placeholder WhatsApp number with a public-safe share link.
- Updated architecture, portfolio, validation and publication documentation.
- Updated the package and lock-file versions to 1.0.2.

## 1.0.1 — 22 June 2026

- Replaced environment-specific internal package registry URLs in `package-lock.json` with the official npm registry.
- Added a repository-level `.npmrc` that explicitly uses `https://registry.npmjs.org/`.
- Revalidated clean installation, TypeScript, ESLint and production build from a fresh directory.

## 1.0.0 — 22 June 2026

- Initial public portfolio release.
