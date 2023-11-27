import { glob } from "glob";
import { unlink } from "node:fs/promises";
import { resolve } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//Need to remove test dts files because its irrelevant to the package
//Typescipt succesfully ignore test files but still generate and output d.ts files
function removeTestDtsFiles() {
  const dtsPathsRelativeToDist = glob.sync("**/*.spec.d.ts", { root: "dist" });

  for (let path of dtsPathsRelativeToDist)
    unlink(resolve(__dirname, "..", path));
}

removeTestDtsFiles();
