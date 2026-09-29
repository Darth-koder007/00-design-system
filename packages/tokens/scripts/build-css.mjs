import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { toCssVariables } from "../dist/index.js";

const outPath = fileURLToPath(new URL("../dist/tokens.css", import.meta.url));
writeFileSync(outPath, toCssVariables());
