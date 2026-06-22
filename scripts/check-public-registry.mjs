import { readFile } from "node:fs/promises";

const lockfile = await readFile("package-lock.json", "utf8");
const blocked = ["applied-caas-gateway", "internal.api.openai.org"];

for (const marker of blocked) {
  if (lockfile.includes(marker)) {
    throw new Error(`package-lock.json contains a non-public registry marker: ${marker}`);
  }
}

console.log("package-lock.json uses public registry URLs only.");
