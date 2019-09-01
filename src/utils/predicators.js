export const isEscapeKey = ({key}) => key === `Escape` || key === `Esc`;

export const groupBy = () => {
  return (array) =>
    array.reduce((objectsByKeyValue, obj) => {
      const value = obj[`number`];
      objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
      return objectsByKeyValue;
    }, {});
};

export const typeOfSort = {
  event: (points) => points,
  time: (points) => points.sort((a, b) => a.duration > b.duration ? 1 : -1),
  price: (points) => points.sort((a, b) => a.price < b.price ? 1 : -1),
};
