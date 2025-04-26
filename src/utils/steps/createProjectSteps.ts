import { Step } from "../../types";
import { constant, Messages, techStacks, FrameworkTitles } from "../constants";

const createFrontendProject: Step = {
  name: Messages.chooseFramework.frontend,
  type: "select",
  message: Messages.chooseFramework.frontend,
  choices: [
    { title: FrameworkTitles.vite, value: techStacks.vite },
    { title: FrameworkTitles.next, value: techStacks.nextjs }
  ]
};

const createBackendProject: Step = {
  name: Messages.chooseFramework.backend,
  type: "select",
  message: Messages.chooseFramework.backend,
  choices: [
    { title: FrameworkTitles.express, value: techStacks.express },
    { title: FrameworkTitles.fastify, value: techStacks.fastify },
    { title: FrameworkTitles.nest, value: techStacks.nestjs }
  ]
};

export const createProjectSteps: Step = {
  name: constant.projectsType,
  type: "select",
  message: Messages.createProjects.projectsType,
  choices: [
    { title: constant.frontend, value: constant.frontend },
    { title: constant.backend, value: constant.backend },
    { title: constant.goBack, value: constant.goBack }
  ],
  next: {
    frontend: createFrontendProject,
    backend: createBackendProject
  }
};
