import { resolve } from "path";
import { fileURLToPath } from "url";

// Assumes this utility is in src/utils/...
const root = resolve(fileURLToPath(import.meta.url), "../../");

export const resolveFromRoot = (...segments: string[]) => {
  return resolve(root, ...segments);
};
