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
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "off",
        {
          vars: "all",
          args: "after-used",
          ignoreRestSiblings: true,
          varsIgnorePattern: "^_", // optional: allow _ignored vars
          argsIgnorePattern: "^_" // optional: allow _ignored args
        }
      ],
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-unsafe-return": "off",
      "@typescript-eslint/no-invalid-void-type": "off",
      "@typescript-eslint/restrict-template-expressions": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unnecessary-condition": "off",
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
