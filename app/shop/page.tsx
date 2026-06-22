import type { Metadata } from "next";
import { ShopClient } from "@/components/shop-client";
import type { ProductCategory } from "@/data/products";

export const metadata: Metadata = {
  title: "Shop",
  description: "Explore the Moris Beauty portfolio collection.",
};

const allowed = ["Skincare", "Makeup", "Fragrance", "Nails"];

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const initialCategory = allowed.includes(category ?? "")
    ? (category as ProductCategory)
    : "All";

  return <ShopClient key={initialCategory} initialCategory={initialCategory} />;
}
