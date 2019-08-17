import {getRandomElement} from "./utils";
import {formatDate} from "./getDateFormat";

const routeData = [
  {
    cityStart: `Amsterdam`,
    cityFinish: `Amsterdam`,
    date: `Mar 18 - 21`
  }
];

const description = [
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
const filtersData = [`Everything`, `Future`, `Past`];

const sorting = [
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
const activities = [`Check-in`, `Sightseeing`, `Restaurant`, `Trip`];
const cities = [`Amsterdam`, `Saint-Petersburg`, `Chamonix`, `Geneva`, `Praha`, `Berlin`];

const offersList = [
  {id: `luggage`, text: `add luggage`, price: 10},
  {id: `comfort`, text: `Switch to comfort class`, price: 150},
  {id: `meal`, text: `Add meal`, price: 2},
  {id: `seats`, text: `Choose seats`, price: 9},
  {id: `train`, text: `Choose seats`, price: 9}
];

const getDate = new Date();
let past = new Date();
past.setTime(1332403882588);

const date = [
  {number: `1`, datetime: getDate, dates: formatDate(getDate)},
  {number: `2`, datetime: getDate, dates: `test`},
  {number: `3`, datetime: getDate, dates: `test`},
];

const event = [
  {
    type: transports[getRandomElement(0, transports.length)],
    city: cities[getRandomElement(0, 5)],
    activity: activities[getRandomElement(0, 3)],
    eventText: description[getRandomElement(0, description.length)],
    timeStart: past,
    timeEnd: getDate,
    price: getRandomElement(10, 200),
    offers: offersList[getRandomElement(0, 3)]
  },
  {
    type: transports[getRandomElement(0, transports.length)],
    city: cities[getRandomElement(0, 5)],
    activity: activities[getRandomElement(0, 3)],
    eventText: description[getRandomElement(0, description.length)],
    timeStart: past,
    timeEnd: getDate,
    price: getRandomElement(10, 200),
    offers: offersList[getRandomElement(0, 3)]
  },
];

const price = (eventData) => {
  let sum = 0;
  for (let i = 0; i < event.length; i++) {
    sum = sum + eventData[i];
    if (eventData.offers) {
      for (let j = 0; j < eventData.offers.length; j++) {
        sum = sum + eventData.offers[i];
      }
    }
  }
  return sum;
};

const setPrice = price(event);

export {
  routeData,
  filtersData,
  sorting,
  transports,
  activities,
  cities,
  date,
  event,
  offersList,
  setPrice
};
