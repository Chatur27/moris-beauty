"use client";

import Link from "next/link";
import { Heart, Plus, Star } from "lucide-react";
import type { Product } from "@/data/products";
import { formatMUR } from "@/data/products";
import { ProductVisual } from "@/components/product-visual";
import { useCart } from "@/components/cart-provider";

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();

  return (
    <article className="product-card">
      <div className="product-card-visual">
        {product.tag && <span className="product-tag">{product.tag}</span>}
        <button className="wishlist-button" aria-label={`Save ${product.name}`}>
          <Heart size={18} strokeWidth={1.6} />
        </button>
        <Link href={`/product/${product.slug}`} aria-label={`View ${product.name}`}>
          <ProductVisual product={product} />
        </Link>
        <button
          className="quick-add"
          onClick={() => addItem(product, product.shades?.[0])}
          aria-label={`Add ${product.name} to cart`}
        >
          <Plus size={17} />
          Quick add
        </button>
      </div>
      <div className="product-card-copy">
        <span className="product-brand">{product.brand}</span>
        <Link href={`/product/${product.slug}`}>
          <h3>{product.name}</h3>
        </Link>
        <div className="rating-row">
          <Star size={13} fill="currentColor" />
          <span>{product.rating}</span>
          <span className="muted">({product.reviewCount})</span>
        </div>
        <div className="price-row">
          <strong>{formatMUR(product.price)}</strong>
          {product.compareAt && <del>{formatMUR(product.compareAt)}</del>}
        </div>
      </div>
    </article>
  );
}
