import type { Metadata, Viewport } from "next";
import "./globals.css";
import { CartProvider } from "@/components/cart-provider";
import { SiteHeader } from "@/components/site-header";
import { CartDrawer } from "@/components/cart-drawer";
import { SiteFooter } from "@/components/site-footer";
import { MotionProvider } from "@/components/motion-provider";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Moris Beauty — Beauty made simple",
    template: "%s | Moris Beauty",
  },
  description:
    "An original Mauritian beauty-commerce portfolio concept featuring a fast storefront, selective 3D, local shopping flows and accessible motion.",
  keywords: [
    "Mauritius ecommerce",
    "beauty storefront",
    "Next.js portfolio",
    "React Three Fiber",
    "mobile-first commerce",
  ],
  openGraph: {
    title: "Moris Beauty — Beauty made simple",
    description:
      "A premium, mobile-first Mauritian beauty storefront with selective 3D.",
    images: ["/og-cover.svg"],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-cover.svg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#11100f",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <MotionProvider>
          <CartProvider>
            <a className="skip-link" href="#main-content">
              Skip to content
            </a>
            <SiteHeader />
            <main id="main-content">{children}</main>
            <SiteFooter />
            <CartDrawer />
          </CartProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
