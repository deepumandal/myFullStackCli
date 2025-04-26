#!/usr/bin/env node

import cac from "cac";
import chalk from "chalk";
import figlet from "figlet";
import gradient from "gradient-string";
import { createProject } from "./commands/create";
import { dockerizeProject } from "./commands/dockerize";
import { setupCodeQuality } from "./commands/setupCodeQuality";
import { main } from "./commands/main";
import { AddUIComponents } from "./commands/add-ui";
import { AbsolutePaths } from "./commands/absolutePaths";
import { AddUtils } from "./commands/addUtils";
import { AddCodeQuality } from "./commands/AddCodeQality";
import { cleanUp } from "./commands/cleanUp";

const cli = cac("myFullStackCli");

export const Banner = () => {
  console.log(
    gradient.cristal(figlet.textSync("My Full Stack CLI TOOL ", { horizontalLayout: "default" }))
  );
  console.log(chalk.gray("A full-stack project setup tool for developers"));
  console.log();
};

cli.command("", "Run CLI in interactive mode").action(async () => {
  Banner();
  await main();
});

// for future
cli.command("create", "Create a new project").action(async () => {
  Banner();
  await createProject();
});

cli.command("dockerize", "Add Docker/Nginx to your project").action(async () => {
  Banner();
  await dockerizeProject();
});

cli.command("setup-quality", "Install code quality tools").action(async () => {
  Banner();
  await setupCodeQuality();
});

cli.command("add-ui", "Add UI components").action(async () => {
  Banner();
  await AddUIComponents();
});

cli.command("Add Utility", "Add Utility").action(async () => {
  Banner();
  // this contains hooks and utils
  await AddUtils();
});

cli.command("Absolute Paths", "Synchronize Absolute Path in Project").action(async () => {
  Banner();
  // this contains hooks and utils
  await AbsolutePaths();
});

// cli.command("Quality", "Add Code Quality").action(async () => {
//   Banner();
//   // this contains hooks and utils
//   await AddCodeQuality();
// });

cli.command("clean", "Cleaning up").action(async () => {
  Banner();
  // this contains hooks and utils
  await cleanUp();
});

cli.help();
cli.version("0.1.0");

cli.on("help", () => {
  console.log();
  console.log(chalk.cyan("Examples:"));
  console.log();
  console.log(`  ${chalk.gray("$")} myFullStackCli create`);
  console.log("  Create a new frontend or backend project");
  console.log();
  console.log(`  ${chalk.gray("$")} myFullStackCli dockerize`);
  console.log("  Generate Dockerfile and related configs");
  console.log();
  console.log(`  ${chalk.gray("$")} myFullStackCli setup-quality`);
  console.log("  Add ESLint, Prettier, Husky and more");
  console.log();
});

cli.parse();
