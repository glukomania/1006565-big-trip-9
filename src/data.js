import {
  getRandomNumber,
  getRandomItem,
  getRandomValues} from "./utils/randomizers";
import {
  getRandomDateStart,
  getRandomDateFinish,
} from "./utils/time";


const descriptions = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat.`, `Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`];
const filterTypes = [`Everything`, `Future`, `Past`];

const sortTypes = [
  {
    type: `event`
  },
  {
    type: `time`,
    path: `<svg class="trip-sort__direction-icon" width="8" height="10" viewBox="0 0 8 10">
  <path d="M2.888 4.852V9.694H5.588V4.852L7.91 5.068L4.238 0.00999987L0.548 5.068L2.888 4.852Z"/>
  </svg>`
  },
  {
    type: `price`,
    path: `<svg class="trip-sort__direction-icon" width="8" height="10" viewBox="0 0 8 10">
    <path d="M2.888 4.852V9.694H5.588V4.852L7.91 5.068L4.238 0.00999987L0.548 5.068L2.888 4.852Z"/>
  </svg>`
  },
  {
    type: `offers`
  }];

const transports = [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`];
const activities = [`Check-in`, `Sightseeing`, `Restaurant`];
const cities = [`Amsterdam`, `Saint-Petersburg`, `Chamonix`, `Geneva`, `Praha`, `Berlin`];

const offersMock = [
  {id: `luggage`, text: `add luggage`, price: 10},
  {id: `comfort`, text: `Switch to comfort class`, price: 150},
  {id: `meal`, text: `Add meal`, price: 2},
  {id: `seats`, text: `Choose seats`, price: 9},
  {id: `train`, text: `Choose seats`, price: 9}
];

const getRandomOffers = () => {
  const randomOffers = new Set(getRandomValues(offersMock, getRandomNumber(0, 3)));
  return randomOffers;
};


const makeEvent = () => ({
  type: getRandomItem(transports),
  city: getRandomItem(cities),
  activity: getRandomItem(activities),
  pointText: getRandomItem(descriptions),
  timeStart: getRandomDateStart(),
  timeEnd: getRandomDateFinish(),
  price: getRandomNumber(10, 200),
  offers: Array.from(getRandomOffers()),
}
);

const getEvents = (num) =>
  new Array(num).fill(null).map(makeEvent);

const points = getEvents(3);

const dates = [
  {number: `1`, datetime: points[0].timeStart},
  {number: `2`, datetime: points[1].timeStart},
];

const routePoints = [
  {
    cityStart: points[0].city,
    cityFinish: points[points.length - 1].city,
    dateStart: points[0].timeStart,
    dateEnd: points[points.length - 1].timeEnd
  }
];

export {
  routePoints,
  filterTypes,
  sortTypes,
  transports,
  activities,
  cities,
  dates,
  points,
  offersMock,
};
