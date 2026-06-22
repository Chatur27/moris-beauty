"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { Product } from "@/data/products";

export type CartItem = {
  product: Product;
  quantity: number;
  shade?: string;
};

type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (product: Product, shade?: string) => void;
  removeItem: (productId: string, shade?: string) => void;
  updateQuantity: (productId: string, quantity: number, shade?: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "moris-beauty-cart-v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) queueMicrotask(() => setItems(JSON.parse(stored) as CartItem[]));
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    } finally {
      queueMicrotask(() => setHasLoaded(true));
    }
  }, []);

  useEffect(() => {
    if (!hasLoaded) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hasLoaded]);

  function addItem(product: Product, shade?: string) {
    setItems((current) => {
      const index = current.findIndex(
        (item) => item.product.id === product.id && item.shade === shade,
      );
      if (index === -1) return [...current, { product, quantity: 1, shade }];
      return current.map((item, itemIndex) =>
        itemIndex === index ? { ...item, quantity: item.quantity + 1 } : item,
      );
    });
    setIsOpen(true);
  }

  function removeItem(productId: string, shade?: string) {
    setItems((current) =>
      current.filter(
        (item) => !(item.product.id === productId && item.shade === shade),
      ),
    );
  }

  function updateQuantity(productId: string, quantity: number, shade?: string) {
    if (quantity <= 0) {
      removeItem(productId, shade);
      return;
    }
    setItems((current) =>
      current.map((item) =>
        item.product.id === productId && item.shade === shade
          ? { ...item, quantity }
          : item,
      ),
    );
  }

  const value: CartContextValue = {
    items,
    itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
    subtotal: items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0,
    ),
    isOpen,
    openCart: () => setIsOpen(true),
    closeCart: () => setIsOpen(false),
    addItem,
    removeItem,
    updateQuantity,
    clearCart: () => setItems([]),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
}
