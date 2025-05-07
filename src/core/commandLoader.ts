import { CAC } from "cac";
import { mainCMd } from "../commands/mainCMd";
import { createProjectCMD } from "../commands/createProjectCMD";
import { dockerizeProjectCMd } from "../commands/createDockerSetupCMD";
import { AddCodeQualityCMD } from "../commands/addCodeQualityCMd";
import { addUIComponentsCMD } from "../commands/installUIComponents";
import { addUtilsCMD } from "../commands/installUtilsCMD";
import { handleUserInterrupt } from "./userInterrupt";

export const loadAllCommands = (cli: CAC) => {
  // Register Ctrl+C, unhandledRejection, etc.
  handleUserInterrupt();

  cli.command("", "Interactive mode").action(async () => {
    try {
      await mainCMd();
    } catch (err) {
      console.error("❌ Error in interactive mode:", err);
      process.exit(1);
    }
  });

  cli.command("create", "Create a new project").action(async () => {
    try {
      await createProjectCMD();
    } catch (err) {
      console.error("❌ Failed to create project:", err);
      process.exit(1);
    }
  });

  cli.command("docker", "Add Docker/Nginx to your project").action(async () => {
    try {
      await dockerizeProjectCMd();
    } catch (err) {
      console.error("❌ Failed to add Docker setup:", err);
      process.exit(1);
    }
  });

  cli.command("quality", "Add Code Quality (ESLint, Prettier, Husky)").action(async () => {
    try {
      await AddCodeQualityCMD();
    } catch (err) {
      console.error("❌ Failed to add code quality tools:", err);
      process.exit(1);
    }
  });

  cli.command("ui", "Add UI components").action(async () => {
    try {
      await addUIComponentsCMD();
    } catch (err) {
      console.error("❌ Failed to add UI components:", err);
      process.exit(1);
    }
  });

  cli.command("utils", "Add utility functions/helpers").action(async () => {
    try {
      await addUtilsCMD();
    } catch (err) {
      console.error("❌ Failed to add utility tools:", err);
      process.exit(1);
    }
  });
};
