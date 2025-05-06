import chalk from "chalk";
import figlet from "figlet";
import gradient from "gradient-string";
import { messagesConstants } from "../utils/constants";

const { welcome, description } = messagesConstants;

export const printBanner = () => {
  // eslint-disable-next-line no-console
  console.clear();
  console.log(gradient.cristal(figlet.textSync(welcome, { horizontalLayout: "default" })));
  console.log(chalk.gray(description));
};
