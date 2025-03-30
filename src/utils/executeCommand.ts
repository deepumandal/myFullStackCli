import { execa } from "execa";

export const executeCommands = async (command: string) => {
  const response = await execa(command, { stdio: "inherit" });
  console.table(response);
  console.log(response);
};
