import { useContext } from "react";
import { ThemeProviderContext } from "../../HOC/theme";

const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};

export { useTheme };
