// Last Words Before the Unplugging — R1 entry.
// Reads the single entry line from entry.txt next to this file,
// validates it against the competition gate (1–200 characters,
// not only whitespace), and writes it to $MAKEFUN_OUTPUT_DIR/entry.txt.
// Node standard library only.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const raw = readFileSync(join(here, "entry.txt"), "utf8");
const line = raw.replace(/\r\n/g, "\n").split("\n")[0].trim();

if (line.length < 1 || line.length > 200) {
  throw new Error(`entry must be 1-200 characters, got ${line.length}`);
}
if (!/\S/.test(line)) {
  throw new Error("entry must not be only whitespace");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  throw new Error("MAKEFUN_OUTPUT_DIR is not set");
}
mkdirSync(outDir, { recursive: true });
const outText = line + "\n";
writeFileSync(join(outDir, "entry.txt"), outText, "utf8");
console.log(`last words delivered (${line.length} chars) — entry.txt written to ${outDir}`);
