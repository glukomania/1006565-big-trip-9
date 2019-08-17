import {getRandomElement} from "./utils";
import {formatDate} from "./getDateFormat";

const routeData = [
  {
    cityStart: `Amsterdam`,
    cityFinish: `Amsterdam`,
    date: `Mar 18 - 21`
  }
];

const description = [`Lorem ipsum dolor sit amet, consectetur adipiscing elit.`, `Cras aliquet varius magna, non porta ligula feugiat eget.`, `Fusce tristique felis at fermentum pharetra.`, `Aliquam id orci ut lectus varius viverra.`, `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`, `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`, `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`, `Sed sed nisi sed augue convallis suscipit in sed felis.`, `Aliquam erat volutpat.`, `Nunc fermentum tortor ac porta dapibus.`, `In rutrum ac purus sit amet tempus.`];

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

const editData = [
  {
    eventName: `Sightseeing at`,
    dateFrom: `18/03/19 00:00`,
    dateTo: `18/03/19 00:00`,
    currency: `&euro;`
  }
];

const getDate = new Date();
let past = new Date();
past.setTime(1332403882588);

const date = [
  {number: `1`, datetime: getDate, dates: formatDate(getDate)},
  {number: `2`, datetime: getDate, dates: `test`},
  {number: `3`, datetime: getDate, dates: `test`},
];

const offers = [
  {offer: `add luggage`, price: 10},
  {offer: `Switch to comfort class`, price: 150},
  {offer: `Add meal`, price: 2},
  {offer: `Choose seats`, price: 9}
];

const event = [
  {
    type: transports[getRandomElement(0, 6)],
    eventText: description[getRandomElement(0, description.length)],
    timeStart: past,
    timeEnd: getDate,
    duration: `1H 30M`,
    price: getRandomElement(10, 200),
    offers: offers[getRandomElement(0, 3)]
  },
  {
    type: transports[getRandomElement(0, 6)],
    eventText: description[getRandomElement(0, description.length)],
    timeStart: past,
    timeEnd: getDate,
    duration: `1H 30M`,
    price: getRandomElement(10, 200),
    offers: offers[getRandomElement(0, 3)]
  },
];

export {
  routeData,
  filtersData,
  sorting,
  transports,
  activities,
  editData,
  cities,
  date,
  event
};
