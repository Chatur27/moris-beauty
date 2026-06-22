"use client";

import Link from "next/link";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/components/cart-provider";

const nav = [
  { href: "/shop", label: "Shop" },
  { href: "/shop?category=Skincare", label: "Skincare" },
  { href: "/shop?category=Makeup", label: "Makeup" },
  { href: "/shop?category=Fragrance", label: "Fragrance" },
  { href: "/beauty-finder", label: "Beauty Finder" },
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { itemCount, openCart } = useCart();

  return (
    <>
      <div className="announcement">
        <span>Free Mauritius delivery from Rs 1,500</span>
        <span className="announcement-separator">•</span>
        <span>Click & collect available</span>
      </div>
      <header className="site-header">
        <Link className="brand" href="/" aria-label="Moris Beauty home">
          <span className="brand-main">MORIS</span>
          <span className="brand-script">beauty</span>
        </Link>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {nav.map((item) => (
            <Link href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <Link className="icon-button hide-mobile" href="/shop" aria-label="Search products">
            <Search size={19} strokeWidth={1.7} />
          </Link>
          <button className="cart-button" onClick={openCart} aria-label={`Open cart with ${itemCount} items`}>
            <ShoppingBag size={19} strokeWidth={1.7} />
            <span>Bag</span>
            <span className="cart-count" aria-hidden="true">{itemCount}</span>
          </button>
          <button
            className="icon-button menu-button"
            onClick={() => setMenuOpen((value) => !value)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </header>

      {menuOpen && (
        <nav id="mobile-menu" className="mobile-nav" aria-label="Mobile navigation">
          {nav.map((item) => (
            <Link href={item.href} key={item.href} onClick={() => setMenuOpen(false)}>
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </>
  );
}
