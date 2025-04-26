#!/usr/bin/env node

import cac from "cac";
import { printBanner } from "./core/banner";
import { loadAllCommands } from "./core/commandLoader";
const cli = cac("myFullStackCli");

// Always show Banner once
printBanner();

// Dynamically load all commands
loadAllCommands(cli);

// CLI Help
cli.help();
cli.version("0.1.0");

// Parse CLI
cli.parse();
