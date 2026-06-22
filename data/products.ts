export type ProductCategory = "Skincare" | "Makeup" | "Fragrance" | "Nails";

export type ProductVisualType = "dropper" | "bottle" | "tube" | "jar" | "lipstick" | "polish";

export type Product = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: ProductCategory;
  price: number;
  compareAt?: number;
  rating: number;
  reviewCount: number;
  tag?: string;
  visualType: ProductVisualType;
  colors: [string, string, string];
  shortDescription: string;
  description: string;
  benefits: string[];
  ingredients: string;
  shades?: string[];
  stock: "In stock" | "Low stock";
};

export const products: Product[] = [
  {
    id: "p1",
    slug: "rivage-glow-serum",
    name: "Rivage Glow Serum",
    brand: "Moris Beauty Lab",
    category: "Skincare",
    price: 1490,
    compareAt: 1690,
    rating: 4.9,
    reviewCount: 128,
    tag: "Bestseller",
    visualType: "dropper",
    colors: ["#f4c9a8", "#d9835e", "#fff5eb"],
    shortDescription: "Niacinamide, tamarind and marine minerals for a calm, luminous finish.",
    description:
      "A lightweight daily serum inspired by the Mauritian coast. The fast-absorbing formula supports a brighter-looking complexion without a sticky finish.",
    benefits: ["Brightens dull-looking skin", "Supports an even-looking tone", "Lightweight under makeup"],
    ingredients: "Niacinamide, sodium hyaluronate, tamarind extract, aloe vera and marine minerals.",
    stock: "In stock",
  },
  {
    id: "p2",
    slug: "jardin-noir-eau-de-parfum",
    name: "Jardin Noir Eau de Parfum",
    brand: "Maison Île",
    category: "Fragrance",
    price: 2190,
    rating: 4.8,
    reviewCount: 84,
    tag: "New",
    visualType: "bottle",
    colors: ["#615347", "#1a1816", "#d5b889"],
    shortDescription: "A warm island evening of vanilla orchid, black tea and soft amber.",
    description:
      "An elegant eau de parfum with an intimate trail. Jardin Noir opens with black tea, deepens into vanilla orchid and settles into smooth amber woods.",
    benefits: ["Warm floral amber profile", "Day-to-evening wear", "Gift-ready presentation"],
    ingredients: "Alcohol denat., parfum, aqua and fragrance allergens as listed on packaging.",
    stock: "In stock",
  },
  {
    id: "p3",
    slug: "corail-lip-veil",
    name: "Corail Lip Veil",
    brand: "Atelier Corail",
    category: "Makeup",
    price: 690,
    rating: 4.7,
    reviewCount: 212,
    tag: "Trending",
    visualType: "lipstick",
    colors: ["#db6c70", "#6d2027", "#ffe3dd"],
    shortDescription: "A soft satin lip colour with buildable pigment and a comfortable finish.",
    description:
      "A modern satin lipstick that layers from a sheer wash to richer colour. The slim format is designed for precise, effortless application.",
    benefits: ["Buildable satin colour", "Comfortable non-drying feel", "Easy precision application"],
    ingredients: "Plant wax blend, castor oil, vitamin E, pigments and flavour.",
    shades: ["Corail", "Rosé", "Grenadine", "Cacao"],
    stock: "In stock",
  },
  {
    id: "p4",
    slug: "lagon-mineral-spf-50",
    name: "Lagon Mineral SPF 50",
    brand: "Moris Beauty Lab",
    category: "Skincare",
    price: 1190,
    rating: 4.8,
    reviewCount: 176,
    tag: "Island essential",
    visualType: "tube",
    colors: ["#a3d7d7", "#2a7f82", "#e9ffff"],
    shortDescription: "A lightweight mineral sunscreen with a soft, skin-like finish.",
    description:
      "A daily mineral sunscreen created for humid weather. It spreads easily, layers under makeup and leaves a soft natural finish.",
    benefits: ["Broad-spectrum SPF 50", "Comfortable in humid weather", "No added fragrance"],
    ingredients: "Zinc oxide, titanium dioxide, glycerin, squalane and antioxidant botanical extracts.",
    stock: "In stock",
  },
  {
    id: "p5",
    slug: "sable-skin-tint",
    name: "Sable Skin Tint",
    brand: "Atelier Corail",
    category: "Makeup",
    price: 990,
    rating: 4.6,
    reviewCount: 96,
    visualType: "tube",
    colors: ["#bc7b58", "#5c3427", "#f4d2bd"],
    shortDescription: "Flexible light coverage with a breathable, natural skin finish.",
    description:
      "A sheer-to-light tint for everyday wear. The flexible formula evens the look of skin while allowing natural texture to remain visible.",
    benefits: ["Light flexible coverage", "Natural finish", "Eight adaptable shades"],
    ingredients: "Water, glycerin, emollients, mineral pigments and vitamin E.",
    shades: ["Dune 1", "Dune 2", "Sable 3", "Sable 4", "Terre 5", "Terre 6"],
    stock: "Low stock",
  },
  {
    id: "p6",
    slug: "flamboyant-nail-lacquer",
    name: "Flamboyant Nail Lacquer",
    brand: "Studio Lakaz",
    category: "Nails",
    price: 450,
    rating: 4.7,
    reviewCount: 64,
    tag: "Quick dry",
    visualType: "polish",
    colors: ["#e5413f", "#4d1111", "#ffc0bd"],
    shortDescription: "High-shine colour inspired by the island's flamboyant bloom.",
    description:
      "A vivid, high-shine lacquer with a wide brush for smooth application and an expressive colour payoff.",
    benefits: ["High-gloss finish", "Wide application brush", "Fast-drying formula"],
    ingredients: "Solvent base, film formers, plasticisers and cosmetic pigments.",
    shades: ["Flamboyant", "Bougainvillea", "Lagoon", "Ebony"],
    stock: "In stock",
  },
  {
    id: "p7",
    slug: "ile-douce-body-mist",
    name: "Île Douce Body Mist",
    brand: "Maison Île",
    category: "Fragrance",
    price: 790,
    rating: 4.5,
    reviewCount: 153,
    visualType: "bottle",
    colors: ["#f3d2a4", "#d29a47", "#fff3d8"],
    shortDescription: "Mandarin, frangipani and vanilla in a light, easy-to-layer mist.",
    description:
      "A bright body mist for everyday refreshment. Wear it alone or layer it with your favourite warm fragrance.",
    benefits: ["Fresh tropical floral profile", "Light everyday wear", "Easy fragrance layering"],
    ingredients: "Alcohol denat., aqua, parfum and fragrance allergens as listed on packaging.",
    stock: "In stock",
  },
  {
    id: "p8",
    slug: "vanilla-bloom-hand-cream",
    name: "Vanilla Bloom Hand Cream",
    brand: "Lakaz Botanics",
    category: "Skincare",
    price: 490,
    rating: 4.8,
    reviewCount: 118,
    tag: "Giftable",
    visualType: "tube",
    colors: ["#e8d4ac", "#8e7246", "#fff9ec"],
    shortDescription: "A comforting hand cream with shea butter and soft vanilla blossom.",
    description:
      "A rich but non-greasy hand cream that softens dry hands and leaves a subtle vanilla blossom scent.",
    benefits: ["Softens dry hands", "Non-greasy finish", "Comforting soft scent"],
    ingredients: "Shea butter, glycerin, sweet almond oil, vitamin E and fragrance.",
    stock: "In stock",
  },
];

export const featuredProducts = products.slice(0, 4);

export function formatMUR(value: number) {
  return new Intl.NumberFormat("en-MU", {
    style: "currency",
    currency: "MUR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}
