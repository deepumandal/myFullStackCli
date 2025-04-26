import { Step } from "../../types";

export const doYouWantToAddCodeQuality: Step = {
  name: "doYouWantToAddCodeQuality",
  type: "select",
  message: "Do you want to add code quality tools?",
  choices: [
    { title: "Yes", value: "yes" },
    { title: "No", value: "no" },
    { title: "Exit", value: "exit" }
  ]
};

export const doYouWantToUIComponents: Step = {
  name: "doYouWantToAddUIComponents",
  type: "select",
  message: "Do you want to add UI Components Tools?",
  choices: [
    { title: "Yes", value: "yes" },
    { title: "No", value: "no" },
    { title: "Exit", value: "exit" }
  ]
};

export const doYouWantToUtility: Step = {
  name: "doYouWantToAddUtility",
  type: "select",
  message: "Do you want to add Utility?",
  choices: [
    { title: "Yes", value: "yes" },
    { title: "No", value: "no" },
    { title: "Exit", value: "exit" }
  ]
};
