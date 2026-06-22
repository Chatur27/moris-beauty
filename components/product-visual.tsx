import type { CSSProperties } from "react";
import type { Product } from "@/data/products";

function Label({ product, compact }: { product: Product; compact: boolean }) {
  const shortName = product.name.split(" ").slice(0, compact ? 1 : 2).join(" ");
  return (
    <g>
      <rect x="90" y="174" width="140" height="96" rx="12" fill="#fbf4eb" fillOpacity="0.96" />
      <text x="160" y="201" textAnchor="middle" fill="#6c5d55" fontSize="9" fontFamily="Arial" letterSpacing="2">{product.brand.split(" ")[0].toUpperCase()}</text>
      <text x="160" y="231" textAnchor="middle" fill="#1d1815" fontSize={compact ? 15 : 18} fontFamily="Georgia">{shortName}</text>
      <line x1="120" x2="200" y1="245" y2="245" stroke="#3d332e" strokeOpacity="0.18" />
      <text x="160" y="260" textAnchor="middle" fill="#82736b" fontSize="7" fontFamily="Arial" letterSpacing="1">MORIS EDIT</text>
    </g>
  );
}

function Shape({ product, compact }: { product: Product; compact: boolean }) {
  const commonLabel = <Label product={product} compact={compact} />;
  switch (product.visualType) {
    case "dropper":
      return <>
        <rect x="121" y="46" width="78" height="68" rx="18" fill="url(#cap)" />
        <rect x="139" y="105" width="42" height="38" rx="10" fill="#eadaca" />
        <path d="M78 164 Q78 132 110 126 H210 Q242 132 242 164 V322 Q242 356 210 366 H110 Q78 356 78 322 Z" fill="url(#body)" />
        {commonLabel}
      </>;
    case "bottle":
      return <>
        <rect x="116" y="58" width="88" height="58" rx="12" fill="url(#cap)" />
        <rect x="137" y="110" width="46" height="36" rx="9" fill="url(#metal)" />
        <rect x="72" y="138" width="176" height="226" rx="32" fill="url(#body)" />
        {commonLabel}
      </>;
    case "tube":
      return <>
        <path d="M104 66 H216 L234 330 Q235 362 207 372 H113 Q85 362 86 330 Z" fill="url(#body)" />
        <rect x="108" y="344" width="104" height="38" rx="10" fill="url(#cap)" />
        <g transform="translate(0,-10)">{commonLabel}</g>
      </>;
    case "lipstick":
      return <>
        <rect x="110" y="175" width="100" height="202" rx="18" fill="url(#cap)" />
        <rect x="120" y="128" width="80" height="72" rx="12" fill="url(#metal)" />
        <path d="M132 128 V72 Q132 50 154 44 L188 64 V128 Z" fill="url(#body)" />
        <rect x="127" y="234" width="66" height="82" rx="8" fill="#f8eee3" opacity="0.94" />
        <text x="160" y="270" textAnchor="middle" fill="#231b18" fontSize="14" fontFamily="Georgia">Corail</text>
        <text x="160" y="292" textAnchor="middle" fill="#75645d" fontSize="7" fontFamily="Arial" letterSpacing="1.5">LIP VEIL</text>
      </>;
    case "polish":
      return <>
        <rect x="116" y="44" width="88" height="126" rx="14" fill="url(#cap)" />
        <rect x="82" y="154" width="156" height="216" rx="34" fill="url(#body)" />
        {commonLabel}
      </>;
    case "jar":
    default:
      return <>
        <rect x="82" y="100" width="156" height="66" rx="22" fill="url(#cap)" />
        <rect x="68" y="151" width="184" height="190" rx="62" fill="url(#body)" />
        {commonLabel}
      </>;
  }
}

export function ProductVisual({ product, compact = false }: { product: Product; compact?: boolean }) {
  const style = {
    "--product-a": product.colors[0],
    "--product-b": product.colors[1],
    "--product-c": product.colors[2],
  } as CSSProperties;

  return (
    <div className={`product-visual product-visual-v2 ${compact ? "product-visual-compact product-visual-v2-compact" : ""}`} style={style} role="img" aria-label={`Stylised premium packshot of ${product.name}`}>
      <svg viewBox="0 0 320 420" aria-hidden="true">
        <defs>
          <linearGradient id={`bg-${product.id}`} x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor={product.colors[2]} />
            <stop offset="0.52" stopColor={product.colors[0]} />
            <stop offset="1" stopColor={product.colors[1]} />
          </linearGradient>
          <linearGradient id="body" x1="0" x2="1">
            <stop offset="0" stopColor={product.colors[1]} />
            <stop offset="0.25" stopColor={product.colors[0]} />
            <stop offset="0.55" stopColor={product.colors[2]} />
            <stop offset="0.8" stopColor={product.colors[0]} />
            <stop offset="1" stopColor={product.colors[1]} />
          </linearGradient>
          <linearGradient id="cap" x1="0" x2="1">
            <stop offset="0" stopColor="#141210" />
            <stop offset="0.5" stopColor="#514740" />
            <stop offset="1" stopColor="#151311" />
          </linearGradient>
          <linearGradient id="metal" x1="0" x2="1">
            <stop offset="0" stopColor="#8a6c45" />
            <stop offset="0.5" stopColor="#e7c995" />
            <stop offset="1" stopColor="#81613a" />
          </linearGradient>
          <filter id="packShadow" x="-50%" y="-50%" width="200%" height="220%">
            <feDropShadow dx="0" dy="18" stdDeviation="15" floodColor="#20100c" floodOpacity="0.28" />
          </filter>
        </defs>
        <rect width="320" height="420" rx="34" fill={`url(#bg-${product.id})`} opacity="0.9" />
        <circle cx="270" cy="64" r="94" fill="#fff" opacity="0.24" />
        <circle cx="34" cy="340" r="110" fill="#fff" opacity="0.12" />
        <ellipse cx="160" cy="376" rx="92" ry="17" fill="#20100c" opacity="0.18" />
        <g filter="url(#packShadow)"><Shape product={product} compact={compact} /></g>
      </svg>
    </div>
  );
}
