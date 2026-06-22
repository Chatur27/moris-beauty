import type { Metadata } from "next";
import { CartPageClient } from "@/components/cart-page-client";

export const metadata: Metadata = {
  title: "Shopping Bag",
  description: "Review the demonstration shopping bag and local fulfilment options.",
};

export default function CartPage() {
  return <CartPageClient />;
}
