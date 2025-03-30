export const getProjectName = (
  projectName: string | undefined,
  useCurrentFolder: string
): string => {
  if (useCurrentFolder === "yes") return ".";
  return projectName?.trim().replace(/\s+/g, "-") || "my-app";
};
