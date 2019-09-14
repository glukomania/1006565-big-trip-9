import {TIME_WEEK} from "../constants";
import {getRandomNumber} from "./randomizers";

const getRandomDateStart = () => {
  const startDate = new Date() - getRandomNumber(TIME_WEEK, 2 * TIME_WEEK) + getRandomNumber(TIME_WEEK, 2 * TIME_WEEK);
  return new Date(startDate);
};

const getRandomDateFinish = () => {
  const now = new Date();
  const finish = now + getRandomNumber(1, TIME_WEEK);
  const finishDate = new Date(finish);
  return finishDate;
};

export {
  getRandomDateStart,
  getRandomDateFinish,
};
