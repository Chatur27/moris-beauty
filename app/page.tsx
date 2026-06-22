import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  MessageCircle,
  PackageCheck,
  ShieldCheck,
  Sparkles,
  Store,
} from "lucide-react";
import { HeroVisual } from "@/components/hero-visual";
import { ProductCard } from "@/components/product-card";
import { ProductVisual } from "@/components/product-visual";
import { SectionReveal } from "@/components/section-reveal";
import { featuredProducts, products } from "@/data/products";

const categories = [
  { name: "Skincare", copy: "Glow, barrier care and daily SPF.", href: "/shop?category=Skincare", tone: "sage", product: products.find((product) => product.category === "Skincare")! },
  { name: "Makeup", copy: "Flexible colour for island light.", href: "/shop?category=Makeup", tone: "rose", product: products.find((product) => product.category === "Makeup")! },
  { name: "Fragrance", copy: "Scent stories for warm evenings.", href: "/shop?category=Fragrance", tone: "plum", product: products.find((product) => product.category === "Fragrance")! },
  { name: "Nails", copy: "Expressive colour, simply edited.", href: "/shop?category=Nails", tone: "sand", product: products.find((product) => product.category === "Nails")! },
];

export default function HomePage() {
  const ritualProduct = products[0];

  return (
    <>
      <section className="hero-v3-section">
        <div className="hero-v3-copy">
          <span className="eyebrow">The island beauty edit · Mauritius</span>
          <h1>
            Beauty with
            <em> atmosphere.</em>
          </h1>
          <p>
            A premium commerce concept combining an interactive 3D product stage, thoughtful guidance and fast local shopping.
          </p>
          <div className="hero-v3-actions">
            <Link className="button button-dark" href="/shop">
              Explore the collection <ArrowRight size={17} />
            </Link>
            <Link className="button button-ghost-v2" href="/beauty-finder">
              Find your ritual
            </Link>
          </div>
          <div className="hero-v3-proof">
            <span><BadgeCheck size={16} /> Genuine products</span>
            <span><MessageCircle size={16} /> Human guidance</span>
            <span><Store size={16} /> Click & collect</span>
          </div>
        </div>
        <HeroVisual />
      </section>

      <div className="editorial-marquee editorial-marquee-v3" aria-label="Moris Beauty qualities">
        <span>Island-aware skincare</span><i>✦</i>
        <span>Curated colour</span><i>✦</i>
        <span>Local fulfilment</span><i>✦</i>
        <span>Personal advice</span>
      </div>

      <section className="compact-commerce-section">
        <SectionReveal className="compact-section-heading">
          <div>
            <span className="eyebrow">Shop the edit</span>
            <h2>Four worlds. Four favourites.</h2>
          </div>
          <div>
            <p>Quick to scan, easy to shop and compact enough to keep the best products within reach.</p>
            <Link className="text-link" href="/shop">View the full collection <ArrowRight size={15} /></Link>
          </div>
        </SectionReveal>

        <div className="category-v3-rail">
          {categories.map((category, index) => (
            <Link className={`category-v3-card category-v3-${category.tone}`} href={category.href} key={category.name}>
              <span className="category-v3-index">0{index + 1}</span>
              <div className="category-v3-product"><ProductVisual product={category.product} compact /></div>
              <div className="category-v3-copy">
                <h3>{category.name}</h3>
                <p>{category.copy}</p>
              </div>
              <span className="category-v3-arrow"><ArrowRight size={17} /></span>
            </Link>
          ))}
        </div>

        <div className="featured-v3-header">
          <div>
            <span className="eyebrow">The current edit</span>
            <h2>Products worth pausing for.</h2>
          </div>
          <p>Four focused formulas and colour stories, presented without the crowded marketplace feeling.</p>
        </div>
        <div className="product-grid product-grid-v3">
          {featuredProducts.map((product) => <ProductCard product={product} key={product.id} />)}
        </div>
      </section>

      <section className="experience-v3-section">
        <article className="ritual-v3-card">
          <div className="ritual-v3-visual">
            <ProductVisual product={ritualProduct} />
          </div>
          <div className="ritual-v3-copy">
            <span className="eyebrow eyebrow-light">The daily ritual</span>
            <h2>Glow that still looks like skin.</h2>
            <p>A lightweight niacinamide serum with ingredient clarity and a direct path to purchase.</p>
            <div className="ritual-v3-meta">
              <span><strong>4.9</strong> rating</span>
              <span><strong>30 ml</strong> daily formula</span>
              <span><strong>2–4 days</strong> delivery</span>
            </div>
            <Link className="button button-light" href={`/product/${ritualProduct.slug}`}>
              Discover Rivage Glow <ArrowRight size={16} />
            </Link>
          </div>
        </article>

        <article className="finder-v3-card">
          <div className="finder-v3-copy">
            <span className="eyebrow">Guidance without pressure</span>
            <h2>Find the edit that feels like you.</h2>
            <p>Three quick questions. A focused recommendation. No account required.</p>
            <Link className="button button-dark" href="/beauty-finder">
              Start the Beauty Finder <Sparkles size={16} />
            </Link>
          </div>
          <div className="finder-v3-art" aria-hidden="true">
            <span className="finder-v3-orbit" />
            <span className="finder-v3-orb finder-v3-orb-one" />
            <span className="finder-v3-orb finder-v3-orb-two" />
            <div className="finder-v3-result">
              <small>Your edit</small>
              <strong>Glow + calm</strong>
              <span>3 considered matches</span>
            </div>
          </div>
        </article>
      </section>

      <section className="service-v2-strip service-v3-strip" aria-label="Shopping services">
        <div><ShieldCheck size={20} /><span><strong>Genuine</strong><small>Authenticity assured</small></span></div>
        <div><PackageCheck size={20} /><span><strong>Local</strong><small>Delivery across Mauritius</small></span></div>
        <div><MessageCircle size={20} /><span><strong>Personal</strong><small>Advice through WhatsApp</small></span></div>
        <div><Store size={20} /><span><strong>Connected</strong><small>Online and click & collect</small></span></div>
      </section>
    </>
  );
}
