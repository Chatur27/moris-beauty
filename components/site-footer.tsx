import Link from "next/link";
import { Instagram, MessageCircle } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <span className="eyebrow">Designed in Mauritius</span>
        <h2>Beauty made simple.</h2>
        <p>
          An original portfolio concept demonstrating premium ecommerce,
          accessible motion and local-first shopping flows.
        </p>
      </div>
      <div className="footer-links">
        <div>
          <h3>Explore</h3>
          <Link href="/shop">Shop all</Link>
          <Link href="/beauty-finder">Beauty Finder</Link>
          <Link href="/shop?category=Fragrance">Fragrance</Link>
        </div>
        <div>
          <h3>Service</h3>
          <a href="mailto:hello@example.com">Contact</a>
          <a href="#stores">Stores</a>
          <a href="https://wa.me/?text=Hello%2C%20I%20would%20like%20beauty%20advice%20from%20Moris%20Beauty." target="_blank" rel="noopener noreferrer">
            WhatsApp adviser
          </a>
        </div>
        <div>
          <h3>Portfolio note</h3>
          <p>
            Fictional brand, products and flows. No affiliation with Simple.mu
            or any featured retailer.
          </p>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Moris Beauty Concept</span>
        <div className="social-links" aria-label="Social links">
          <a href="#" aria-label="Instagram"><Instagram size={18} /></a>
          <a href="https://wa.me/?text=Hello%2C%20I%20would%20like%20beauty%20advice%20from%20Moris%20Beauty." target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><MessageCircle size={18} /></a>
        </div>
      </div>
    </footer>
  );
}
