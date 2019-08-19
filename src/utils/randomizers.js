// randomizer
const getRandomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min)) + min;

const getRandomItem = (array) =>
  array[Math.floor(Math.random() * array.length)];

const getRandomValues = (array, num = 1) =>
  Array.from({length: num}, () => getRandomItem(array));


export {
  getRandomItem,
  getRandomNumber,
  getRandomValues
};
