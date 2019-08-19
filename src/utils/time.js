import {TIME_HALF_DAY} from "../constants";
import {getRandomNumber} from "./randomizers";

const getRandomDateStart = () => {
  const startDate = new Date() - getRandomNumber(TIME_HALF_DAY, 2 * TIME_HALF_DAY);
  return new Date(startDate);
};

const getRandomDateFinish = () => {
  const now = new Date();
  let finish = now - getRandomNumber(1, TIME_HALF_DAY);
  let finishDate = new Date(finish);
  return finishDate;
};

export {
  getRandomDateStart,
  getRandomDateFinish,
};
