import { promises as fs } from "fs";
import { resolve, join } from "path";
import ora from "ora";
import chalk from "chalk";
import { AnyType } from "../types";

export async function templateGenerator(templateName: string, targetDir: string = ".") {
  const templatePath = resolve(__dirname, "../templates", templateName);
  const cwd = process.cwd();
  const targetPath = targetDir === "." ? cwd : resolve(cwd, targetDir);

  console.log(chalk.blueBright(`\n📦 Installing template: ${chalk.bold(templateName)}\n`));

  const verifySpinner = ora("🔍 Verifying template...").start();

  try {
    await fs.access(templatePath);
    verifySpinner.succeed("✅ Template found");
  } catch {
    verifySpinner.fail(chalk.red(`❌ Template "${templateName}" not found.`));
    process.exit(1);
  }

  async function copyDirectory(src: string, dest: string) {
    await fs.mkdir(dest, { recursive: true });
    const entries = await fs.readdir(src, { withFileTypes: true });

    for (const entry of entries) {
      const srcPath = join(src, entry.name);
      const destPath = join(dest, entry.name);

      if (entry.isDirectory()) {
        await copyDirectory(srcPath, destPath);
      } else {
        await fs.copyFile(srcPath, destPath);
      }
    }
  }

  const copySpinner = ora("📦 Installing Template...").start();

  try {
    await copyDirectory(templatePath, targetPath);
    copySpinner.succeed("🎉 Template successfully!");
  } catch (err: AnyType) {
    copySpinner.fail(`❌ Failed to Installing Template: ${chalk.red(err.message)}`);
  }
}
