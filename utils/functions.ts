export const getAuthLayoutTitle = (pathName: string | null) => {
  if (!pathName) return "";

  return pathName.split("/")[1];
};
