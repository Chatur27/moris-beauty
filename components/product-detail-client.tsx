"use client";

import Link from "next/link";
import {
  ArrowLeft,
  BadgeCheck,
  ChevronDown,
  MessageCircle,
  PackageCheck,
  ShoppingBag,
  Star,
  Store,
} from "lucide-react";
import { useState } from "react";
import type { Product } from "@/data/products";
import { formatMUR } from "@/data/products";
import { ProductVisual } from "@/components/product-visual";
import { ProductCard } from "@/components/product-card";
import { useCart } from "@/components/cart-provider";

export function ProductDetailClient({
  product,
  related,
}: {
  product: Product;
  related: Product[];
}) {
  const [shade, setShade] = useState(product.shades?.[0]);
  const { addItem } = useCart();

  return (
    <div className="product-page">
      <Link className="back-link" href="/shop"><ArrowLeft size={16} /> Back to shop</Link>
      <div className="product-detail">
        <div className="product-detail-visual">
          {product.tag && <span className="product-tag">{product.tag}</span>}
          <ProductVisual product={product} />
          <span className="visual-caption">Original CSS-rendered portfolio asset</span>
        </div>

        <div className="product-detail-copy">
          <span className="product-brand">{product.brand}</span>
          <h1>{product.name}</h1>
          <div className="rating-row">
            <Star size={15} fill="currentColor" />
            <strong>{product.rating}</strong>
            <span className="muted">{product.reviewCount} reviews</span>
          </div>
          <p className="product-lede">{product.shortDescription}</p>
          <div className="detail-price">
            <strong>{formatMUR(product.price)}</strong>
            {product.compareAt && <del>{formatMUR(product.compareAt)}</del>}
          </div>

          {product.shades && (
            <fieldset className="shade-fieldset">
              <legend>Choose shade: <strong>{shade}</strong></legend>
              <div className="shade-list">
                {product.shades.map((item, index) => (
                  <button
                    type="button"
                    key={item}
                    className={shade === item ? "selected" : ""}
                    onClick={() => setShade(item)}
                    aria-label={`Select ${item}`}
                    style={{ backgroundColor: `hsl(${8 + index * 18} 42% ${42 + index * 4}%)` }}
                  />
                ))}
              </div>
            </fieldset>
          )}

          <span className={`stock-state ${product.stock === "Low stock" ? "low" : ""}`}>
            <span /> {product.stock}
          </span>

          <button className="button button-dark button-full detail-add" onClick={() => addItem(product, shade)}>
            <ShoppingBag size={17} /> Add to bag
          </button>
          <a
            className="button button-outline button-full"
            href={`https://wa.me/?text=${encodeURIComponent(`Hello, I would like advice about ${product.name}.`)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle size={17} /> Ask a beauty adviser
          </a>

          <div className="delivery-grid">
            <div><PackageCheck size={20} /><span><strong>Local delivery</strong><small>2–4 working days</small></span></div>
            <div><Store size={20} /><span><strong>Click & collect</strong><small>Selected locations</small></span></div>
            <div><BadgeCheck size={20} /><span><strong>Genuine product</strong><small>Authenticity assured</small></span></div>
          </div>

          <div className="detail-accordions">
            <details open>
              <summary>About this product <ChevronDown size={17} /></summary>
              <p>{product.description}</p>
            </details>
            <details>
              <summary>Benefits <ChevronDown size={17} /></summary>
              <ul>{product.benefits.map((benefit) => <li key={benefit}>{benefit}</li>)}</ul>
            </details>
            <details>
              <summary>Key ingredients <ChevronDown size={17} /></summary>
              <p>{product.ingredients}</p>
            </details>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="related-products">
          <div className="section-heading">
            <span className="eyebrow">You may also like</span>
            <h2>More from {product.category.toLowerCase()}.</h2>
          </div>
          <div className="product-grid">
            {related.map((item) => <ProductCard product={item} key={item.id} />)}
          </div>
        </section>
      )}
    </div>
  );
}
