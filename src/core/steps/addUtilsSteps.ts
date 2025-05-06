import { choicesConstants, messagesConstants } from "../../utils/constants";
import { Step } from "../../types";

const { doYouWantToAddUtils, addUtils, yes, no } = choicesConstants;

const { doYouWantToAddUtils: doYouWantToAddUtilsMessage, addUtils: addUtilsMessage } =
  messagesConstants;

export const doYouWantToAddUtilsSteps: Step = {
  name: doYouWantToAddUtils,
  type: "select",
  message: doYouWantToAddUtilsMessage,
  choices: [
    { title: yes, value: true },
    { title: no, value: false }
  ]
};

export const addUtilsSteps: Step = {
  name: addUtils,
  type: "multiselect",
  message: addUtilsMessage,

  choices: [
    { title: "ESLint + Prettier", value: "eslint" },
    { title: "Husky + Lint-Staged", value: "husky" },
    { title: "Commitlint", value: "commitlint" },
    { title: "Stylelint", value: "stylelint" },
    { title: "cspell", value: "cspell" },
    { title: "Go Back", value: "back" }
  ]
};
