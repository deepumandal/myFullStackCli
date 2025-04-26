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
    when: (a) => a.projectType === "frontend",
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
  {
    when: (a) => a.projectType === "backend",
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
  }
];
