import { readFile, stat } from "node:fs/promises";
import { join } from "node:path";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const requiredFiles = [
  "index.html",
  "404.html",
  "shop/index.html",
  "cart/index.html",
  "beauty-finder/index.html",
  "product/rivage-glow-serum/index.html",
  "rivage-glow-bottle.png",
];

for (const relativePath of requiredFiles) {
  const file = join(process.cwd(), "out", relativePath);
  const info = await stat(file).catch(() => null);
  if (!info?.isFile()) {
    throw new Error(`Static export is missing: out/${relativePath}`);
  }
}

const homepage = await readFile(join(process.cwd(), "out", "index.html"), "utf8");
const expectedNextPath = `${basePath}/_next/`.replace("//", "/");

if (!homepage.includes(expectedNextPath)) {
  throw new Error(`Homepage does not reference the expected Next.js asset path: ${expectedNextPath}`);
}

if (basePath && (homepage.includes('src="/_next/') || homepage.includes('href="/_next/'))) {
  throw new Error("Unprefixed Next.js assets were found in a project-site export.");
}

console.log(`Static export verified${basePath ? ` for ${basePath}` : " at the domain root"}.`);
