import type { Metadata } from "next";
import { Suspense } from "react";
import { ShopClient } from "@/components/shop-client";

export const metadata: Metadata = {
  title: "Shop",
  description: "Explore the Moris Beauty portfolio collection.",
};

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="shop-page" aria-hidden="true" />}>
      <ShopClient />
    </Suspense>
  );
}
