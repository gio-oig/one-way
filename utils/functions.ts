export const getAuthLayoutTitle = (pathName: string | null) => {
  if (!pathName) return "";

  return pathName.split("/")[1];
};

export const getToken = () => {
  return localStorage.getItem("TOKEN");
};

export const calculateLeftDays = (dateString: string) => {
  const millisecondsInADay = 86400000;
  const targetDate = new Date(Date.parse(dateString));
  const currentDate = new Date();
  const timeDiff = targetDate.getTime() - currentDate.getTime();
  const daysLeft = Math.floor(timeDiff / millisecondsInADay);

  return daysLeft;
};

export const createQueryString = (filters: Record<string, any>) => {
  let queryString = "";
  for (const key in filters) {
    if (filters[key] !== null && filters[key] !== "") {
      queryString += `${key}=${filters[key]}&`;
    }
  }
  return queryString.slice(0, -1);
};
