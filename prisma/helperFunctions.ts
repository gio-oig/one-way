export const getRandomitem = <T>(itemsArr: T[]): T => {
  const randomIndex = Math.floor(Math.random() * itemsArr.length);
  return itemsArr[randomIndex];
};
