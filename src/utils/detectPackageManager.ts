// utils/detectPackageManager.ts
import { existsSync } from "fs";
import path from "path";
import { execa } from "execa";

export type PackageManager = "yarn" | "pnpm" | "npm";

const hasBinary = async (command: string) => {
  try {
    await execa(command, ["--version"]);
    return true;
  } catch {
    return false;
  }
};

export const detectPackageManager = async (): Promise<PackageManager> => {
  const cwd = process.cwd();

  const yarnLock = existsSync(path.join(cwd, "yarn.lock"));
  const pnpmLock = existsSync(path.join(cwd, "pnpm-lock.yaml"));
  const npmLock = existsSync(path.join(cwd, "package-lock.json"));

  if (yarnLock && (await hasBinary("yarn"))) return "yarn";
  if (pnpmLock && (await hasBinary("pnpm"))) return "pnpm";
  if (npmLock && (await hasBinary("npm"))) return "npm";

  // If no lock files are found, fallback to first available in order
  if (await hasBinary("pnpm")) return "pnpm";
  if (await hasBinary("yarn")) return "yarn";
  return "npm";
};
