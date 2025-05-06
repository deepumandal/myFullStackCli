import fs from "fs";
import chalk from "chalk";
import { join, resolve } from "path";
import { choicesConstants } from "../utils/constants";
import { execa } from "execa";
import { clear } from "console";

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
  packages?: string[]
) => {
  const cwd = process.cwd();

  const targetPath = targetDir === "." ? cwd : resolve(cwd, targetDir);

  const packageJsonPath = join(targetPath, "package.json");

  try {
    await fs.promises.access(packageJsonPath);

    console.log(chalk.green("✅ package.json found:", packageJsonPath));
  } catch (error) {
    console.error(chalk.red("❌ package.json not found in the specified directory."));

    return;
  }

  console.log(chalk.blue("📦 Installing packages:", packages?.join(", ")));

  const installCmd = packages?.length
    ? `${installingCmd[packageManager]} ${packages.join(" ")}`
    : installingCmd[packageManager];

  await execa(installCmd, {
    cwd: targetPath,
    shell: true,
    stdio: "inherit" // this shows output in real time!
  });

  console.log(chalk.green("✅ Packages installed successfully!"));
};
