import { Step } from "../../types";
import { messagesConstants, namesConstants, choicesConstants } from "../../utils/constants";

const { createBackend, createFrontend, createProject, chooseProjectName } = namesConstants;
const {
  createBackend: createBackendMessage,
  createFrontend: createFrontendMessage,
  createProject: createProjectMessage,
  chooseProjectName: chooseProjectNameMessage
} = messagesConstants;
const {
  ExpressJS: expressJS,
  FastifyJs: fastifyJs,
  NestjS: nestjS,
  NextJS: nextJS,
  ReactJS: reactJS,
  backend,
  frontend,
  goBack
} = choicesConstants;

const createFrontendProject: Step = {
  name: createFrontend,
  type: "select",
  message: createFrontendMessage,
  choices: [
    { title: reactJS, value: reactJS },
    { title: nextJS, value: nextJS }
  ]
};

const createBackendProject: Step = {
  name: createBackend,
  type: "select",
  message: createBackendMessage,
  choices: [
    { title: expressJS, value: expressJS },
    { title: fastifyJs, value: fastifyJs },
    { title: nestjS, value: nestjS }
  ]
};

export const createProjectSteps: Step = {
  name: chooseProjectName,
  type: "text",
  message: chooseProjectNameMessage,
  validate: (value) => {
    if (value.length === 0) {
      return "Please enter a project name.";
    }
    return true;
  },
  defaultNext: {
    name: createProject,
    type: "select",
    message: createProjectMessage,
    choices: [
      { title: frontend, value: frontend },
      { title: backend, value: backend },
      { title: goBack, value: goBack }
    ],
    next: {
      frontend: createFrontendProject,
      backend: createBackendProject
    }
  }
};
