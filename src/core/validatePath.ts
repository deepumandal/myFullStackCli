import fs from "fs/promises";
import path from "path";

export const validatePath = async (inputPath: string): Promise<boolean> => {
  try {
    const resolved = path.resolve(inputPath);
    await fs.access(resolved);
    return true;
  } catch {
    return false;
  }
};
