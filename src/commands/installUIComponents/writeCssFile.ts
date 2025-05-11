import fs from "fs";
import { join } from "path";
import chalk from "chalk";

export const writeCssFile = async (targetPath: string, components: string[]) => {
  const stylesCssFile = join(targetPath, "index.css");
  console.log(chalk.blue("📝 Writing CSS file to:"), stylesCssFile);

  let existingCssContent = "";
  try {
    existingCssContent = await fs.promises.readFile(stylesCssFile, "utf-8");
  } catch {
    console.log(chalk.yellow("⚠️ index.css does not exist. It will be created."));
  }

  const cssImportsToAdd = await Promise.all(
    components.map(async (component) => {
      const indexCssPath = join(targetPath, component, "index.css");
      const importLine = `@import "./styles/${component}/index.css";`;

      try {
        await fs.promises.access(indexCssPath);
        if (!existingCssContent.includes(importLine)) return importLine;
        // console.log(chalk.gray(`🔁 Import already exists: ${importLine}`));
      } catch {
        // console.log(chalk.yellow(`⚠️ index.css not found in: styles/${component}/`));
      }

      return null;
    })
  );

  const filteredImports = cssImportsToAdd.filter(Boolean);
  if (filteredImports.length > 0) {
    const updatedContent = `${existingCssContent.trim()}\n${filteredImports.join("\n")}\n`;
    await fs.promises.writeFile(stylesCssFile, updatedContent, "utf-8");
    // console.log(chalk.green("✅ New CSS imports added!"));
  }
  // else {
  // console.log(chalk.green("✅ No new CSS imports needed. All are already present."));
  // }
};
