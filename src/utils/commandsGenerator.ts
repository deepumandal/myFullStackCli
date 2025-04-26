import { commandRules } from "./cmdMap";

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

  console.log("Commands generated:", commands, allSettled);
  return commands;
};
