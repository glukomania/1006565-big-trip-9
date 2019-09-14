export const groupByKey = (key) => {
  return (array) =>
    array.reduce((objectsByKeyValue, obj) => {
      const value = obj[key];
      objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
      return objectsByKeyValue;
    }, {});
};

const getPriceForKey = (arrayOfObj, key) => {
  let price = 0;
  let filteredArray = arrayOfObj.filter((item) => {
    const itemType = item.type;
    return itemType.type === key;
  });
  filteredArray.forEach((item) => {
    price = price + item.price;
  });
  return price;
};

const getNumberOfTransports = (arrayOfObj, key) => {
  let number = 1;
  let filteredArray = arrayOfObj.filter((item) => {
    const itemType = item.type;
    return itemType.type === key;
  });
  filteredArray.forEach(() => {
    number = number + 1;
  });
  return number;
};

export const groupeByType = (array) => {
  const groupped = [];
  array.forEach((item, index) => {
    const typeArray = item.type;
    groupped[index] = {};
    groupped[index].type = typeArray.type;
    groupped[index].price = getPriceForKey(array, typeArray.type);
    groupped[index].number = getNumberOfTransports(array, typeArray.type);
    groupped[index].duration = item.duration;
  });
  return groupped.filter((item, index, initialarray) => {
    return initialarray.map((mapItem) => mapItem[`type`]).indexOf(item[`type`]) === index;
  });
};

export const sortToChange = {
  event: (points) => points,
  time: (points) => points.sort((a, b) => a.duration < b.duration ? 1 : -1),
  price: (points) => points.sort((a, b) => a.price < b.price ? 1 : -1),
};
