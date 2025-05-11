/* eslint-disable @typescript-eslint/no-unsafe-argument */
// src/core/installSelectedUIComponents.ts

import fs from "fs";
import { join, resolve } from "path";
import chalk from "chalk";
import { ensureValidPath } from "./ensureValidPath";
import { writeCssFile } from "./writeCssFile";
import {
  chooseUIComponentsStep,
  chooseUIStyleComponentsStep
} from "../../core/steps/chooseProjectRootStep";
import { UIConfigInterface } from "../../types";
import { UIConfigs } from "../../templates/UI-templates/config";
import { templateGenerator } from "../../core/templateGenerator";
import { installDeps } from "../../core/installDeps";
import { resolveFromRoot } from "../../utils/resolveFromRoot";
import ora from "ora";

interface InstallUIArgs {
  targetPath: string;
  stylePath: string;
  resolvedRoot: string;
  packageManager: string;
  selectedComponents: string[];
}

export const installSelectedUIComponents = async ({
  targetPath,
  stylePath,
  resolvedRoot,
  packageManager,
  selectedComponents
}: InstallUIArgs): Promise<void> => {
  const templatePath = resolveFromRoot("templates", "UI-templates");

  const UIPaths = await ensureValidPath(targetPath, chooseUIComponentsStep, "UI components");
  const actualComponentPath = UIPaths.path + (UIPaths.isNewPath ? "/UI" : "");

  const CSSPaths = await ensureValidPath(stylePath, chooseUIStyleComponentsStep, "UI styles");
  const actualStylesPath = CSSPaths.path + (CSSPaths.isNewPath ? "/Styles" : "");

  const componentsDownloads = [...selectedComponents];

  for (const component of selectedComponents) {
    const config: UIConfigInterface = UIConfigs[component];
    const sourcePath = join(templatePath, config.path);
    const cssSourcePath = config.cssPath ? join(templatePath, config.cssPath) : null;

    const spinner = ora(`🚀 Installing component: ${chalk.cyan(component)}`).start();

    try {
      if (config.siblingDependencies?.length) {
        componentsDownloads.push(...config.siblingDependencies);

        for (const siblingDependency of config.siblingDependencies) {
          const siblingConfig: UIConfigInterface = UIConfigs[siblingDependency];
          const siblingSourcePath = join(templatePath, siblingConfig.path);
          const siblingCssSourcePath = siblingConfig.cssPath
            ? join(templatePath, siblingConfig.cssPath)
            : null;

          // Simple log — avoid overlapping ora spinner text
          // console.log(chalk.gray(`\n    🧩 Installing sibling: ${chalk.magenta(siblingDependency)}`));

          // Package install info
          if (siblingConfig.dependencies.length || siblingConfig.devDependencies.length) {
            const allDeps = [...siblingConfig.dependencies, ...siblingConfig.devDependencies];
            // console.log(chalk.gray(`        📦 Installing packages: ${chalk.yellow(allDeps.join(", "))}`));
          }

          // Simulate spinner steps manually
          try {
            await templateGenerator(
              siblingSourcePath,
              join(actualComponentPath, siblingDependency),
              true
            );
            if (siblingCssSourcePath) {
              await templateGenerator(
                siblingCssSourcePath,
                join(actualStylesPath, siblingDependency),
                true
              );
            }

            if (siblingConfig.dependencies.length) {
              await installDeps(
                resolvedRoot,
                packageManager,
                siblingConfig.dependencies,
                true,
                true
              );
            }

            if (siblingConfig.devDependencies.length) {
              await installDeps(
                resolvedRoot,
                packageManager,
                siblingConfig.devDependencies,
                true,
                true
              );
            }

            // console.log(chalk.green(`        ✅ Sibling installed: ${siblingDependency}`));
          } catch (err) {
            // console.log(chalk.red(`        ❌ Failed to install sibling: ${siblingDependency}`));
            console.error(err);
          }
        }
      }

      await templateGenerator(sourcePath, join(actualComponentPath, component), true);
      if (cssSourcePath) {
        await templateGenerator(cssSourcePath, join(actualStylesPath, component), true);
      }

      if (config.dependencies.length) {
        await installDeps(resolvedRoot, packageManager, config.dependencies, true, true);
      }

      if (config.devDependencies.length) {
        await installDeps(resolvedRoot, packageManager, config.devDependencies, true, true);
      }

      spinner.succeed(`✅ Installed component: ${chalk.green(component)}\n`);
    } catch (err) {
      spinner.fail(`❌ Failed to install: ${chalk.red(component)}\n`);
      console.error(err);
    } finally {
      if (spinner.isSpinning) {
        spinner.succeed();
      }
    }
  }

  await writeCssFile(actualStylesPath, componentsDownloads);
  console.log(chalk.green("✅ All selected UI components installed successfully!\n\n"));
};
