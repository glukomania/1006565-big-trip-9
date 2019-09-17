import {
  getRandomNumber,
  getRandomItem} from "./utils/randomizers";
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
  {name: `Venice`, description: `Venice, is a beautiful city, a true asian pearl, with crowded streets, in a middle of Europe, famous for its crowded street markets with the best street food in Asia.`, photos: []},
  {name: `Tokio`, description: `Tokio, is a beautiful city, for those who value comfort and coziness.`, photos: []},
  {name: `Milan`, description: `Milan, a true asian pearl, with crowded streets, middle-eastern paradise.`, photos: []},
  {name: `Berlin`, description: `Berlin, a true asian pearl, middle-eastern paradise.`, photos: []},
  {name: `Chamonix`, description: `Chamonix, with crowded streets, in a middle of Europe, for those who value comfort and coziness.`, photos: []},
  {name: `Geneva`, description: `Geneva, middle-eastern paradise.`, photos: []},
  {name: `Sochi`, description: `Sochi, in a middle of Europe, with an embankment of a mighty river as a centre of attraction.`, photos: []},
  {name: `Frankfurt`, description: `Frankfurt, a true asian pearl, in a middle of Europe, middle-eastern paradise.`, photos: []},
  {name: `Kioto`, description: `Kioto, a true asian pearl, in a middle of Europe, middle-eastern paradise, for those who value comfort and coziness, with an embankment of a mighty river as a centre of attraction, full of of cozy canteens where you can try the best coffee in the Middle East, a perfect place to stay with a family.`, photos: []},
  {name: `Barcelona`, description: `Barcelona, is a beautiful city, with a beautiful old town, with an embankment of a mighty river as a centre of attraction, famous for its crowded street markets with the best street food in Asia.`, photos: []},
  {name: `Moscow`, description: `Moscow, is a beautiful city, a true asian pearl, in a middle of Europe, for those who value comfort and coziness, full of of cozy canteens where you can try the best coffee in the Middle East.`, photos: []},
  {name: `Saint Petersburg`, description: `Saint Petersburg, in a middle of Europe, a perfect place to stay with a family.`, photos: []},
  {name: `Nagasaki`, description: `Nagasaki, with an embankment of a mighty river as a centre of attraction.`, photos: []},
  {name: `Paris`, description: `Paris, a true asian pearl, in a middle of Europe, middle-eastern paradise.`, photos: []},
  {name: `Naples`, description: `Naples, for those who value comfort and coziness, full of of cozy canteens where you can try the best coffee in the Middle East.`, photos: []},
  {name: `Monaco`, description: `Monaco, full of of cozy canteens where you can try the best coffee in the Middle East, famous for its crowded street markets with the best street food in Asia.`, photos: []},
  {name: `Vien`, description: `Vien, is a beautiful city, full of of cozy canteens where you can try the best coffee in the Middle East.`, photos: []},
  {name: `Hiroshima`, description: `Hiroshima, with a beautiful old town, full of of cozy canteens where you can try the best coffee in the Middle East.`, photos: []},
  {name: `Rome`, description: `Rome, is a beautiful city.`, photos: []},
  {name: `Den Haag`, description: `Den Haag, .`, photos: []},
  {name: `Amsterdam`, description: `Amsterdam, is a beautiful city, for those who value comfort and coziness, with an embankment of a mighty river as a centre of attraction, full of of cozy canteens where you can try the best coffee in the Middle East, a perfect place to stay with a family, famous for its crowded street markets with the best street food in Asia.`, photos: []},
  {name: `Kopenhagen`, description: `Kopenhagen, a true asian pearl, with crowded streets, in a middle of Europe, middle-eastern paradise, for those who value comfort and coziness, with an embankment of a mighty river as a centre of attraction, full of of cozy canteens where you can try the best coffee in the Middle East, a perfect place to stay with a family.`, photos: []},
  {name: `Rotterdam`, description: `Rotterdam, a true asian pearl, full of of cozy canteens where you can try the best coffee in the Middle East.`, photos: []},
  {name: `Rome`, description: `Rome, is a beautiful city.`, photos: []},
  {name: `Valencia`, description: `Valencia, is a beautiful city, a true asian pearl, with a beautiful old town, middle-eastern paradise, with an embankment of a mighty river as a centre of attraction.`, photos: []},
  {name: `Madrid`, description: `Madrid, is a beautiful city, in a middle of Europe, with an embankment of a mighty river as a centre of attraction, famous for its crowded street markets with the best street food in Asia.`, photos: []},
  {name: `Munich`, description: `Munich, with crowded streets, famous for its crowded street markets with the best street food in Asia.`, photos: []},
  {name: `Helsinki`, description: `Helsinki, in a middle of Europe, middle-eastern paradise, for those who value comfort and coziness, with an embankment of a mighty river as a centre of attraction.`, photos: []},
  {name: `Oslo`, description: `Oslo, with crowded streets, middle-eastern paradise, a perfect place to stay with a family.`, photos: []},
];


const getOffersMock = () => (
  [{
    id: `event-offer-luggage`,
    text: `Add luggage`,
    price: 30,
    checked: Boolean(Math.round(Math.random()))
  },
  {
    id: `event-offer-comfort`,
    text: `Switch to comfort class`,
    price: 100,
    checked: Boolean(Math.round(Math.random()))
  },
  {
    id: `event-offer-meal`,
    text: `Add meal`,
    price: 15,
    checked: Boolean(Math.round(Math.random()))
  },
  {
    id: `event-offer-seats`,
    text: `Choose seats`,
    price: 5,
    checked: Boolean(Math.round(Math.random()))
  },
  {
    id: `event-offer-train`,
    text: `Travel by train`,
    price: 40,
    checked: Boolean(Math.round(Math.random()))
  }
  ]
);

const offersMock = getOffersMock();

const makeEvent = () => {
  const point = {
    type: getRandomItem(transports.concat(activities)),
    city: getRandomItem(cities).name,
    pointText: getRandomItem(cities).description,
    timeStart: getRandomDateStart(),
    timeEnd: getRandomDateFinish(),
    price: getRandomNumber(10, 200),
    offers: getOffersMock(),
  };
  return point;
};

const getEvents = (num) =>
  new Array(num).fill(null).map(makeEvent);

const points = getEvents(5);

const getDatesSorted = (unsortedPoints) => {
  const sortedPoints = unsortedPoints.sort((a, b) => a.timeStart > b.timeStart ? 1 : -1);
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

// const dates = getDatesSorted(points);

// getPointsWithDuration(dates);

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

// get data for stats

// const groupedPointsByType = groupeByType(dates);

export {
  routePoints,
  filterTypes,
  sortTypes,
  transports,
  activities,
  cities,
  points,
  offersMock,
  getDatesSorted,
  getPointsWithDuration
};
