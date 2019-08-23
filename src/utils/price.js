
import {points} from "../data";

const getPrice = (array, key, extraKey) => {
  let sum = 0;
  for (let item of array) {
    sum = sum + item[key];

    if (item[extraKey]) {
      for (let extraItem of item[extraKey]) {
        sum = sum + extraItem[key];
      }
    }
  }
  return sum;
};

const setPrice = getPrice(points, `price`, `offers`);

export {setPrice};
