import { detectPackageManager } from "./detectPackageManager";
import { getProjectName } from "./getProjectName";

type AnswerMap = Record<string, string>;

type CommandRule = {
  when: (answers: AnswerMap) => boolean;
  getCommand: (answers: AnswerMap) => string | Promise<string>;
};

export const commandRules: CommandRule[] = [
  // ✅ Frontend Project with TypeScript
  {
    when: (a) => a.mainChoice === "create" && a.projectType === "frontend",
    getCommand: async (a) => {
      const pm = await detectPackageManager();
      switch (a["Choose Frontend Framework"]) {
        case "vite":
          return `${pm} create vite@latest`;
        case "next":
          return `npx create-next-app@latest`;
        case "astro":
          return `echo "Astro project setup coming soon!"`;
        default:
          return `echo "Invalid choice"`;
      }
    }
  },
  // ✅ NestJS Backend Project
  {
    when: (a) =>
      a.mainChoice === "create" &&
      a.languageChoice === "ts" &&
      a.projectType === "backend" &&
      a["Choose Backend Framework"] === "nest",
    getCommand: (a) => {
      const folder = getProjectName(a.projectName, a.useCurrentFolder);

      return `npx @nestjs/cli new ${folder} --package-manager npm`;
    }
  },

  // 🏗️ Express JS Placeholder
  {
    when: (a) =>
      a.mainChoice === "create" &&
      a.projectType === "backend" &&
      a["Choose Backend Framework"] === "express",
    getCommand: () => `echo "Express project setup coming soon!"`
  },

  // 🏗️ Fastify Placeholder
  {
    when: (a) =>
      a.mainChoice === "create" &&
      a.projectType === "backend" &&
      a["Choose Backend Framework"] === "fastify",
    getCommand: () => `echo "Fastify project setup coming soon!"`
  }
];
