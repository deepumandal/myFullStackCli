#!/usr/bin/env node

import { cac } from "cac";
import chalk from "chalk";
import gradient from "gradient-string";

import figlet from "figlet";
// import { createProject } from './commands/create';
// import { dockerizeProject } from './commands/dockerize';
// import { setupCodeQuality } from './commands/setupCodeQuality';

const cli = cac("myFullStackCli");

function showHeader() {
  console.log(gradient.cristal(figlet.textSync("myFullStackCli", { horizontalLayout: "default" })));
  console.log(chalk.gray("A full-stack project setup tool for developers"));
  console.log();
}

cli.command("", "Run CLI in interactive mode").action(() => {
  showHeader();
  // In future: show interactive main menu here
  console.log(chalk.green("Welcome! Let’s get started..."));
});

cli.command("create", "Create a new project").action(() => {
  showHeader();
  // await createProject();
});

cli.command("dockerize", "Add Docker/Nginx to your project").action(() => {
  showHeader();
  // await dockerizeProject();
});

cli.command("setup-quality", "Install code quality tools").action(() => {
  showHeader();
  // await setupCodeQuality();
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
