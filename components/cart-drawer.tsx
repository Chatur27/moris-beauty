"use client";

import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCart } from "@/components/cart-provider";
import { formatMUR } from "@/data/products";
import { ProductVisual } from "@/components/product-visual";

export function CartDrawer() {
  const {
    items,
    subtotal,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
  } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.button
            className="drawer-backdrop"
            aria-label="Close cart"
            onClick={closeCart}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.aside
            className="cart-drawer"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-title"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 310, damping: 34 }}
          >
            <div className="drawer-header">
              <div>
                <span className="eyebrow">Your selection</span>
                <h2 id="cart-title">Shopping bag</h2>
              </div>
              <button className="icon-button" onClick={closeCart} aria-label="Close cart">
                <X size={22} />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="empty-cart">
                <ShoppingBag size={34} strokeWidth={1.3} />
                <h3>Your bag is waiting</h3>
                <p>Discover island-inspired beauty essentials.</p>
                <Link className="button button-dark" href="/shop" onClick={closeCart}>
                  Explore the collection
                </Link>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {items.map((item) => (
                    <article className="cart-item" key={`${item.product.id}-${item.shade ?? "default"}`}>
                      <ProductVisual product={item.product} compact />
                      <div className="cart-item-copy">
                        <span className="product-brand">{item.product.brand}</span>
                        <h3>{item.product.name}</h3>
                        {item.shade && <span className="muted">Shade: {item.shade}</span>}
                        <strong>{formatMUR(item.product.price)}</strong>
                        <div className="cart-item-controls">
                          <div className="quantity-control" aria-label={`Quantity for ${item.product.name}`}>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.shade)}
                              aria-label="Decrease quantity"
                            >
                              <Minus size={14} />
                            </button>
                            <span>{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.shade)}
                              aria-label="Increase quantity"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <button
                            className="remove-button"
                            onClick={() => removeItem(item.product.id, item.shade)}
                            aria-label={`Remove ${item.product.name}`}
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
                <div className="drawer-summary">
                  <div>
                    <span>Subtotal</span>
                    <strong>{formatMUR(subtotal)}</strong>
                  </div>
                  <p>Delivery is calculated at checkout. This is a demonstration flow.</p>
                  <Link href="/cart" className="button button-dark button-full" onClick={closeCart}>
                    View bag and checkout
                  </Link>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
