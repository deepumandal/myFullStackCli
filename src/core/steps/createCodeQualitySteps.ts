import { Step } from "../../types";

export const createCodeQualitySteps: Step = {
  name: "setupCodeQuality",
  type: "multiselect",
  message: "Select tools to setup",
  choices: [
    { title: "ESLint + Prettier", value: "eslint" },
    { title: "Husky + Lint-Staged", value: "husky" },
    { title: "Commitlint", value: "commitlint" },
    { title: "Stylelint", value: "stylelint" },
    { title: "cspell", value: "cspell" },
    { title: "Go Back", value: "back" }
  ]
};
