import { choicesConstants, messagesConstants } from "../../utils/constants";
import { Step, UIConfigsInterface } from "../../types";

const {
  doYouWantToAddUIComponents,
  addUIComponents,
  yes,
  no,
  selectMultipleOptions: selectMultipleUIComponents
} = choicesConstants;

const {
  doYouWantToAddUIComponents: doYouWantToAddUIComponentsMessage,
  addUIComponents: addUIComponentsMessage,
  selectMultipleOptions: selectMultipleOptionsMessage
} = messagesConstants;

export const doYouWantToAddUIComponentsSteps: Step = {
  name: doYouWantToAddUIComponents,
  type: "select",
  message: doYouWantToAddUIComponentsMessage,
  choices: [
    { title: yes, value: true },
    { title: no, value: false }
  ]
};

export const selectMultipleOptionsSteps = (configFile: UIConfigsInterface): Step => {
  const choices = Object.keys(configFile);

  console.log("💡 Available UI Components:", choices);

  return {
    name: selectMultipleUIComponents,
    type: "multiselect",
    message: selectMultipleOptionsMessage,
    choices: choices.map((name) => ({
      title: name,
      value: name
    }))
  };
};

export const addUIComponentsSteps: Step = {
  name: addUIComponents,
  type: "multiselect",
  message: addUIComponentsMessage,

  choices: [
    { title: "ESLint + Prettier", value: "eslint" },
    { title: "Husky + Lint-Staged", value: "husky" },
    { title: "Commitlint", value: "commitlint" },
    { title: "Stylelint", value: "stylelint" },
    { title: "cspell", value: "cspell" },
    { title: "Go Back", value: "back" }
  ]
};
