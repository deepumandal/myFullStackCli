import fs from "fs";
import chalk from "chalk";
import { join, resolve } from "path";
import { choicesConstants } from "../utils/constants";
import { execa } from "execa";

const { npm, yarn, pnpm, bun } = choicesConstants;

const installingCmd = {
  [npm]: "npm install",
  [yarn]: "yarn install",
  [pnpm]: "pnpm install",
  [bun]: "bun install"
};

export const installDeps = async (
  targetDir: string,
  packageManager: string,
  packages?: string[],
  hideInstallationProcess?: boolean,
  hideSuccessMessage?: boolean
) => {
  const cwd = process.cwd();
  const targetPath = targetDir === "." ? cwd : resolve(cwd, targetDir);
  const packageJsonPath = join(targetPath, "package.json");

  try {
    await fs.promises.access(packageJsonPath);
    // console.log(chalk.green("✅ package.json found at:"), packageJsonPath);
  } catch {
    console.error(chalk.red("❌ package.json not found in the specified directory."));
    return;
  }

  if (packages?.length) {
    console.log(chalk.blue("📦 Installing packages:"), packages.join(", "));
  }

  const installCmd = packages?.length
    ? `${installingCmd[packageManager]} ${packages.join(" ")}`
    : installingCmd[packageManager];

  const options: { cwd: string; shell: boolean; stdio?: "inherit" | "pipe" | "ignore" } = {
    cwd: targetPath,
    shell: true,
    stdio: hideInstallationProcess ? "ignore" : "inherit"
  };

  try {
    await execa(installCmd, options);
    if (!hideSuccessMessage) console.log(chalk.green("\n✅ Packages installed successfully!\n"));
  } catch (error) {
    console.error(chalk.red("❌ Failed to install packages."), error);
  }
};
