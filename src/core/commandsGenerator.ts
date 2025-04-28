import { choicesConstants, namesConstants } from "../utils/constants";

type AnswerMap = Record<string, string>;

type CommandRule = {
  when: (answers: AnswerMap) => boolean;
  getCommand: (answers: AnswerMap) => string | Promise<string>;
};

const { createFrontend, createBackend, createProject } = namesConstants;
const { frontend, backend } = choicesConstants;

export const commandRules: CommandRule[] = [
  // ✅ Frontend Project with TypeScript
  {
    when: (a) => a[createProject] === frontend,
    getCommand: (a) => {
      switch (a[createFrontend]) {
        case "vite":
          return `pnpm create vite@latest`;
        case "next":
          return `npx create-next-app@latest`;
        default:
          return `echo "Invalid choice"`;
      }
    }
  },
  {
    when: (a) => a[createProject] === backend,
    getCommand: (a) => {
      switch (a[createBackend]) {
        default:
          return `echo "Invalid choice"`;
      }
    }
  }
];

export const commandsGenerator = async (answers: Record<string, string>): Promise<string> => {
  const allSettled = await Promise.allSettled(
    commandRules.map(async (rule) => {
      if (rule.when(answers)) {
        return await rule.getCommand(answers);
      }
    })
  );

  const commands = allSettled
    .filter(
      (result): result is PromiseFulfilledResult<string> =>
        result.status === "fulfilled" && result.value !== undefined
    )
    .map((result) => result.value)
    .join(" && ");

  return commands;
};
