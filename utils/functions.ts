export const getAuthLayoutTitle = (pathName: string | null) => {
  if (!pathName) return "";

  return pathName.split("/")[1];
};

export const getToken = () => {
  return localStorage.getItem("TOKEN");
};
