import { execa } from "execa";

export const cleanUp = async () => {
  try {
    await execa("rm -rf *", { stdio: "inherit" });
    console.log("Command executed successfully.");
  } catch (error) {
    console.error("Failed to execute command:", error);
  }
};
