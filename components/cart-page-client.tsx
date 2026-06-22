"use client";

import Link from "next/link";
import { ArrowRight, Check, Minus, Plus, ShieldCheck, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { useCart } from "@/components/cart-provider";
import { formatMUR, products } from "@/data/products";
import { ProductVisual } from "@/components/product-visual";
import { ProductCard } from "@/components/product-card";

export function CartPageClient() {
  const { items, subtotal, removeItem, updateQuantity, clearCart } = useCart();
  const [fulfilment, setFulfilment] = useState<"delivery" | "pickup">("delivery");
  const [checkoutNotice, setCheckoutNotice] = useState(false);
  const delivery = fulfilment === "delivery" && subtotal < 1500 ? 150 : 0;
  const total = subtotal + delivery;
  const suggestions = useMemo(
    () => products.filter((product) => !items.some((item) => item.product.id === product.id)).slice(0, 3),
    [items],
  );

  if (!items.length) {
    return (
      <div className="cart-page empty-cart-page">
        <span className="eyebrow">Your selection</span>
        <h1>Your bag is empty.</h1>
        <p>Start with a few island-inspired essentials.</p>
        <Link className="button button-dark" href="/shop">Explore the collection</Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <header className="page-hero compact-page-hero cart-page-hero">
        <div>
          <span className="eyebrow">Your selection</span>
          <h1>Shopping bag</h1>
          <p>{items.length} selected {items.length === 1 ? "item" : "items"}, ready for local fulfilment.</p>
        </div>
        <div className="cart-page-actions">
          <Link className="text-link" href="/shop">Continue shopping <ArrowRight size={15} /></Link>
          <button className="text-link button-reset" onClick={clearCart}>Clear bag</button>
        </div>
      </header>

      <div className="cart-layout">
        <section className="cart-page-items" aria-label="Cart items">
          {items.map((item) => (
            <article className="cart-page-item" key={`${item.product.id}-${item.shade ?? "default"}`}>
              <ProductVisual product={item.product} compact />
              <div>
                <span className="product-brand">{item.product.brand}</span>
                <h2>{item.product.name}</h2>
                {item.shade && <span className="muted">Shade: {item.shade}</span>}
                <strong>{formatMUR(item.product.price)}</strong>
              </div>
              <div className="quantity-control">
                <button onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.shade)} aria-label="Decrease quantity"><Minus size={14} /></button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.shade)} aria-label="Increase quantity"><Plus size={14} /></button>
              </div>
              <button className="remove-button" onClick={() => removeItem(item.product.id, item.shade)} aria-label={`Remove ${item.product.name}`}><Trash2 size={17} /></button>
            </article>
          ))}

          <div className="cart-assurance-panel">
            <ShieldCheck size={21} />
            <div>
              <strong>Portfolio-safe checkout</strong>
              <p>This flow demonstrates totals and fulfilment only. It never asks for identity or payment details.</p>
            </div>
          </div>
        </section>

        <aside className="checkout-card">
          <span className="eyebrow">Fulfilment</span>
          <h2>Choose what works locally.</h2>
          <div className="fulfilment-options">
            <button className={fulfilment === "delivery" ? "selected" : ""} onClick={() => { setFulfilment("delivery"); setCheckoutNotice(false); }}>
              <span><strong>Home delivery</strong><small>2–4 working days</small></span>
              {fulfilment === "delivery" && <Check size={18} />}
            </button>
            <button className={fulfilment === "pickup" ? "selected" : ""} onClick={() => { setFulfilment("pickup"); setCheckoutNotice(false); }}>
              <span><strong>Click & collect</strong><small>Selected store locations</small></span>
              {fulfilment === "pickup" && <Check size={18} />}
            </button>
          </div>
          <div className="order-summary">
            <div><span>Subtotal</span><strong>{formatMUR(subtotal)}</strong></div>
            <div><span>{fulfilment === "delivery" ? "Delivery" : "Pickup"}</span><strong>{delivery ? formatMUR(delivery) : "Free"}</strong></div>
            <div className="order-total"><span>Total</span><strong>{formatMUR(total)}</strong></div>
          </div>
          <button className="button button-dark button-full" onClick={() => setCheckoutNotice(true)}>
            Continue to demo checkout
          </button>
          {checkoutNotice && (
            <div className="checkout-demo-notice" role="status">
              <Check size={16} />
              <span>Demo checkout reached. No payment or personal information is requested.</span>
            </div>
          )}
          <p className="secure-note"><ShieldCheck size={16} /> No real payment or personal data is collected.</p>
        </aside>
      </div>

      {suggestions.length > 0 && (
        <section className="cart-suggestions">
          <div className="section-heading split-heading">
            <div>
              <span className="eyebrow">Complete the edit</span>
              <h2>A few thoughtful additions.</h2>
            </div>
            <Link className="text-link" href="/shop">Browse everything <ArrowRight size={15} /></Link>
          </div>
          <div className="product-grid cart-suggestion-grid">
            {suggestions.map((product) => <ProductCard product={product} key={product.id} />)}
          </div>
        </section>
      )}
    </div>
  );
}
