export const randomShuffledArray = <T>(arr: T[]): T[] => {
  if (arr.length < 2)
    throw new Error("Array must contain more than 2 elements");

  const shuffled = [...arr].sort(() => Math.floor(Math.random() - 0.5));
  return shuffled.slice(0, 2);
};
