import type { Metadata } from "next";
import { BeautyFinderClient } from "@/components/beauty-finder-client";

export const metadata: Metadata = {
  title: "Beauty Finder",
  description: "A three-question beauty recommendation flow.",
};

export default function BeautyFinderPage() {
  return <BeautyFinderClient />;
}
