
const getPrice = (array) => {
  let sum = 0;
  for (let item of array) {
    sum = sum + item.price;

    if (item.offers) {
      for (let extraItem of item.offers) {
        if (extraItem.accepted) {
          sum = sum + extraItem.price;
        }
      }
    }
  }
  return sum;
};

export {getPrice};
