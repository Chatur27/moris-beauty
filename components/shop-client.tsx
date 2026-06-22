"use client";

import { Search, SlidersHorizontal, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { ProductCard } from "@/components/product-card";
import { products, type ProductCategory } from "@/data/products";

const categories: Array<"All" | ProductCategory> = [
  "All",
  "Skincare",
  "Makeup",
  "Fragrance",
  "Nails",
];

export function ShopClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const category: "All" | ProductCategory = categories.includes(
    categoryParam as "All" | ProductCategory,
  )
    ? (categoryParam as "All" | ProductCategory)
    : "All";

  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("featured");

  function selectCategory(nextCategory: "All" | ProductCategory) {
    router.replace(
      nextCategory === "All"
        ? "/shop"
        : `/shop?category=${encodeURIComponent(nextCategory)}`,
      { scroll: false },
    );
  }

  const filtered = useMemo(() => {
    const result = products.filter((product) => {
      const categoryMatch = category === "All" || product.category === category;
      const searchMatch = `${product.name} ${product.brand} ${product.category}`
        .toLowerCase()
        .includes(query.toLowerCase());
      return categoryMatch && searchMatch;
    });

    return [...result].sort((a, b) => {
      if (sort === "low") return a.price - b.price;
      if (sort === "high") return b.price - a.price;
      if (sort === "rating") return b.rating - a.rating;
      return Number(Boolean(b.tag)) - Number(Boolean(a.tag));
    });
  }, [category, query, sort]);

  return (
    <div className="shop-page">
      <header className="page-hero compact-page-hero">
        <span className="eyebrow">The island beauty edit</span>
        <h1>Shop the collection</h1>
        <p>Focused products, clear information and no unnecessary friction.</p>
      </header>

      <div className="shop-toolbar">
        <label className="search-field">
          <Search size={18} />
          <span className="sr-only">Search products</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by product, brand or category"
          />
          {query && (
            <button onClick={() => setQuery("")} aria-label="Clear search">
              <X size={16} />
            </button>
          )}
        </label>
        <label className="sort-field">
          <SlidersHorizontal size={17} />
          <span className="sr-only">Sort products</span>
          <select value={sort} onChange={(event) => setSort(event.target.value)}>
            <option value="featured">Featured</option>
            <option value="rating">Best rated</option>
            <option value="low">Price: low to high</option>
            <option value="high">Price: high to low</option>
          </select>
        </label>
      </div>

      <div className="category-tabs" role="group" aria-label="Filter by category">
        {categories.map((item) => (
          <button
            className={category === item ? "active" : ""}
            onClick={() => selectCategory(item)}
            key={item}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="results-summary">
        <span>{filtered.length} products</span>
        {(query || category !== "All") && (
          <button
            className="text-link button-reset"
            onClick={() => {
              setQuery("");
              selectCategory("All");
            }}
          >
            Clear filters
          </button>
        )}
      </div>

      {filtered.length ? (
        <div className="product-grid product-grid-shop">
          {filtered.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      ) : (
        <div className="empty-results">
          <h2>No products match yet.</h2>
          <p>Try another phrase or clear the current category.</p>
        </div>
      )}
    </div>
  );
}
