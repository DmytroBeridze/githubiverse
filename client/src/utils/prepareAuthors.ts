import { NewUser } from "../components/molecules/RandomUserCard";
import { User } from "../types/userTypes";
import { randomShuffledArray } from "./randomShuffledArray";

const titles = [
  "Join the Hunt for the Most Revered GitHub Authors",
  "Quest to Unearth Treasured Repositories",
];

export const prepareAuthors = (authors: User[]): NewUser[] => {
  const filteredAuthors = authors.filter((author) => author.type === "User");
  const shuffle = randomShuffledArray(filteredAuthors);
  // adding  static titles
  const addTitles = shuffle.map((elem, i) => {
    const res = { ...elem, title: titles[i] };
    return res;
  });
  return addTitles;
};
