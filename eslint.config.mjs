// eslint.config.js

import js from "@eslint/js";
import tseslint from "typescript-eslint";

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
  js.configs.recommended,

  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.strictTypeChecked,

  {
    files: ["**/*.ts"],
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json"
      }
    },
    rules: {
      "no-console": ["warn", { allow: ["warn", "error", "log"] }],
      "@typescript-eslint/no-floating-promises": "warn",
      "@typescript-eslint/no-unused-vars": ["warn"]
    }
  },

  // ✅ Ignore JS config files and scripts
  {
    ignores: ["commitlint.config.js", "*.config.js", "scripts/**/*.js"]
  }
];
