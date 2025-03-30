#!/usr/bin/env node

import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Gracefully exit on Ctrl+C
process.on("SIGINT", () => {
  console.log("\n👋 Exiting CLI...");
  process.exit(0);
});

import(path.join(__dirname, "dist/index.js"));
