import { Step } from "../../types";

const createFrontendProject: Step = {
  name: "Choose Frontend Framework",
  type: "select",
  message: "Choose Frontend Framework",
  choices: [
    { title: "vite", value: "vite" },
    { title: "next", value: "next" },
    { title: "Astro (coming soon)", value: "astro" }
  ]
};

// todo
const createBackendProject: Step = {
  name: "Choose Backend Framework",
  type: "select",
  message: "Choose Backend Framework",
  choices: [
    { title: "Express JS (coming Soon)", value: "express" },
    { title: "Fastify JS (coming Soon)", value: "fastify" },
    { title: "Nest JS", value: "nest" }
  ]
};

export const createProjectSteps: Step = {
  name: "projectType",
  type: "select",
  message: "Create Frontend or Backend Project?",
  choices: [
    { title: "Frontend", value: "frontend" },
    { title: "Backend", value: "backend" },
    { title: "Go Back", value: "back" }
  ],
  next: {
    frontend: createFrontendProject,
    backend: createBackendProject
  }
};

// export const createProjectSteps: Step = {
//   name: "useCurrentFolder",
//   type: "select",
//   message: "Continue in current folder?",
//   choices: [
//     { title: "Yes", value: "yes" },
//     { title: "No (Enter project name)", value: "no" },
//     { title: "Go Back", value: "back" }
//   ],
//   next: {
//     yes: projectType,
//     no: {
//       name: "projectName",
//       type: "text",
//       message: "Enter your project name",
//       defaultNext: projectType,
//       validate: (value: string) => {
//         if (value === "") {
//           return "Project name cannot be empty";
//         }
//         return true;
//       }
//     }
//   }
// };

// export const createProjectSteps: Step = {
//   name: "languageChoice",
//   type: "select",
//   message: "Choose Language",
//   choices: [
//     { title: "TypeScript", value: "ts" },
//     { title: "JavaScript", value: "js" },
//     { title: "Go Back", value: "back" }
//   ],
//   next: {
//     ts: projectRoot,
//     js: projectRoot
//   }
// };
