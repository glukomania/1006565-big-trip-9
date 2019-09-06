import {
  getRandomNumber,
  getRandomItem,
  getRandomValues} from "./utils/randomizers";
import {
  getRandomDateStart,
  getRandomDateFinish,
} from "./utils/time";
import {duration} from "./components/point-date";

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
  }];

const transports = [
  {type: `Taxi`, label: `Taxi to airport`},
  {type: `Bus`, label: `Going by bus to`},
  {type: `Train`, label: `Going by train to`},
  {type: `Ship`, label: `Ship to`},
  {type: `Transport`, label: `Time in transport of`},
  {type: `Drive`, label: `Drive to`},
  {type: `Flight`, label: `Flight to`},
];

const activities = [
  {type: `Check-in`, label: `Check in the hotel of`},
  {type: `Sightseeing`, label: `Sightseeing in`},
  {type: `Restaurant`, label: `Restaurant in`},
];

const cities = [
  {city: `Amsterdam`, description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`},
  {city: `Moscow`, description: `Cras aliquet varius magna, non porta ligula feugiat eget.`},
  {city: `Chamonix`, description: `Fusce tristique felis at fermentum pharetra.`},
  {city: `Geneva`, description: `Aliquam id orci ut lectus varius viverra.`},
  {city: `Praha`, description: `Nunc fermentum tortor ac porta dapibus.`},
  {city: `Berlin`, description: `In rutrum ac purus sit amet tempus.`},
];


const offersMock =
[{
  id: `event-offer-luggage`,
  text: `Add luggage`,
  price: 30,
  check: Boolean(Math.round(Math.random()))
},
{
  id: `event-offer-comfort`,
  text: `Switch to comfort class`,
  price: 100,
  check: Boolean(Math.round(Math.random()))
},
{
  id: `event-offer-meal`,
  text: `Add meal`,
  price: 15,
  check: Boolean(Math.round(Math.random()))
},
{
  id: `event-offer-seats`,
  text: `Choose seats`,
  price: 5,
  check: Boolean(Math.round(Math.random()))
},
{
  id: `event-offer-train`,
  text: `Travel by train`,
  price: 40,
  check: Boolean(Math.round(Math.random()))
}
];

const getRandomOffers = () => {
  const randomOffers = new Set(getRandomValues(offersMock, getRandomNumber(0, 3)));
  return randomOffers;
};


const makeEvent = () => {
  const point = {
    type: getRandomItem(transports.concat(activities)),
    city: getRandomItem(cities).city,
    pointText: getRandomItem(cities).description,
    timeStart: getRandomDateStart(),
    timeEnd: getRandomDateFinish(),
    price: getRandomNumber(10, 200),
    offers: Array.from(getRandomOffers()),
  };
  return point;
};

const getEvents = (num) =>
  new Array(num).fill(null).map(makeEvent);

const points = getEvents(5);

const getDatesFiltering = (unfilteredPoints) => {
  const sortedPoints = unfilteredPoints.sort((a, b) => a.timeStart > b.timeStart ? 1 : -1);
  let number = 1;
  sortedPoints[0].number = number;
  for (let i = 1; i < sortedPoints.length; i++) {
    if (sortedPoints[i].timeStart.getDate() !== sortedPoints[i - 1].timeStart.getDate()) {
      number++;
    }
    sortedPoints[i].number = number;
  }
  return sortedPoints;
};

const getPointsWithDuration = (initialPoints) => {
  initialPoints.forEach((item) => {
    item.duration = duration.getNumericDuration(item.timeStart, item.timeEnd);
  });
};

const dates = getDatesFiltering(points);

getPointsWithDuration(dates);

const getRoutePoints = () => [
  {
    cityStart: points[0].city,
    cityFinish: points[points.length - 1].city,
    dateStart: points[0].timeStart,
    dateEnd: points[points.length - 1].timeEnd
  }
];

let routePoints = [];
if (points.length > 0) {
  routePoints = getRoutePoints();
}

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
