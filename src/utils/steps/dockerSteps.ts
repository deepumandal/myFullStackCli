import { Step } from "../../types";

export const dockerSteps: Step = {
  name: "dockerProjectType",
  type: "select",
  message: "Project Type?",
  choices: [
    { title: "Frontend", value: "frontend" },
    { title: "Backend", value: "backend" },
    { title: "Go Back", value: "back" }
  ]
};
