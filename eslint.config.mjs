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
      "@typescript-eslint/no-unused-vars": ["warn"],
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-unsafe-return": "off",
      "@typescript-eslint/no-invalid-void-type": "off"
    }
  },

  // ✅ Ignore JS config files and scripts
  {
    ignores: [
      "dist/**",
      "commitlint.config.js",
      "*.config.js",
      "scripts/**/*.js",
      "bin.js",
      "*.js",
      "*.mjs",
      "src/templates/**",
      "src/templates/typescript-next-template/**",
      "src_old/**",
      "eslint.config.mjs"
    ]
  }
];
