import { CAC } from "cac";
import { mainCMd } from "../commands/mainCMd";
import { createProjectCMD } from "../commands/createProjectCMD";
import { dockerizeProjectCMd } from "../commands/createDockerSetupCMD";
import { AddCodeQualityCMD } from "../commands/addCodeQualityCMd";
import { handleUserInterrupt } from "./userInterrupt";
import { addUIComponentsCMD } from "../commands/installUIComponents";
import { addUtilsCMD } from "../commands/installUtilsCMD";
// import { createProject } from "../commands/createProjectCMD";
// import { dockerizeProject } from "../commands/dockerizeProjectCMD";
// import { addUIComponents } from "../commands/addUIComponentsCMD";
// import { addUtils } from "../commands/addUtilsCMD";
// import { addAbsolutePaths } from "../commands/addAbsolutePathsCMD";
// import { addCodeQuality } from "../commands/addCodeQualityCMD";

export const loadAllCommands = (cli: CAC) => {
  handleUserInterrupt()
  cli.command("", "Interactive mode").action(mainCMd);
  cli.command("create", "Create a new project").action(createProjectCMD);
  cli.command("docker", "Add Docker/Nginx to your project").action(dockerizeProjectCMd);
  cli.command("quality", "Add Code Quality (ESLint, Prettier, Husky)").action(AddCodeQualityCMD);
  cli.command("ui", "Add UI components").action(addUIComponentsCMD)
  cli.command("utils", "Add Utils").action(addUtilsCMD)

  //   cli.command("add-ui", "Add UI components").action(addUIComponents);
  //   cli.command("add-utils", "Add Utility hooks and helpers").action(addUtils);
  //   cli.command("add-absolute-paths", "Setup Absolute Imports").action(addAbsolutePaths);
};