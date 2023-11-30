import { existsSync } from "node:fs";
import { resolve } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { exec } from "node:child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function preTestSetup() {
  const isLibraryBuilt = existsSync(
    resolve(__dirname, "..", "dist", "main.js")
  );

  if (!isLibraryBuilt) exec("npm run build");
}

preTestSetup();
