export const groupByDayNumber = () => {
  return (array) =>
    array.reduce((objectsByKeyValue, obj) => {
      if (obj !== null && objectsByKeyValue !== null) {
        const value = obj[`number`];
        objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
      }
      return objectsByKeyValue;
    }, {});
};

export const sortToChange = {
  event: (points) => points,
  time: (points) => points.sort((a, b) => a.duration < b.duration ? 1 : -1),
  price: (points) => points.sort((a, b) => a.price < b.price ? 1 : -1),
};
