import { CAC } from "cac";
import { mainCMd } from "../commands/mainCMd";
import { createProjectCMD } from "../commands/createProjectCMD";
import { dockerizeProjectCMd } from "../commands/createDockerSetupCMD";
import { AddCodeQualityCMD } from "../commands/addCodeQualityCMd";
// import { createProject } from "../commands/createProjectCMD";
// import { dockerizeProject } from "../commands/dockerizeProjectCMD";
// import { addUIComponents } from "../commands/addUIComponentsCMD";
// import { addUtils } from "../commands/addUtilsCMD";
// import { addAbsolutePaths } from "../commands/addAbsolutePathsCMD";
// import { addCodeQuality } from "../commands/addCodeQualityCMD";

export const loadAllCommands = (cli: CAC) => {
  cli.command("", "Interactive mode").action(mainCMd);
  cli.command("create", "Create a new project").action(createProjectCMD);
  cli.command("docker", "Add Docker/Nginx to your project").action(dockerizeProjectCMd);
  cli.command("quality", "Add Code Quality (ESLint, Prettier, Husky)").action(AddCodeQualityCMD);
  //   cli.command("add-ui", "Add UI components").action(addUIComponents);
  //   cli.command("add-utils", "Add Utility hooks and helpers").action(addUtils);
  //   cli.command("add-absolute-paths", "Setup Absolute Imports").action(addAbsolutePaths);
};
/**
 *
 * kl different templates bnane hain joh v type ka project serve krna hai uska and ussme pre-built folder structure ho
 * kuch cheje joh ki extra ho skhti hai unhe ristrict krna hai vo based on user preference install hongi bakki sbh ese hi default honi chaiye
 * for example  folder strucuture ho or baki cheje jese components utils voh user preference based honi chaiye like light dark mode
 * jadha complex nhi kerna hai joh v m use krta hu voh sbh dena hai
 * bss
 * baki baad m dekhenge ki ager kux alag required hui toh first priority pe add nessacary cheje hi add karna hai 😀
 *
 */
