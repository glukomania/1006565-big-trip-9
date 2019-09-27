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
  {type: `Taxi`, label: `Taxi to`},
  {type: `Bus`, label: `Bus to`},
  {type: `Train`, label: `Train to`},
  {type: `Ship`, label: `Ship to`},
  {type: `Transport`, label: `Transport in`},
  {type: `Drive`, label: `Drive to`},
  {type: `Flight`, label: `Flight to`},
];
const activities = [
  {type: `Check-in`, label: `Hotel in`},
  {type: `Sightseeing`, label: `Sightseeing in`},
  {type: `Restaurant`, label: `Restaurant in`},
];

const getDatesSorted = (unsortedPoints) => {
  if (unsortedPoints.length !== 0) {
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
  }
  return undefined;
};

const getPointsWithDuration = (initialPoints) => {
  if (initialPoints) {
    initialPoints.forEach((item) => {
      item.duration = duration.getNumericDuration(item.timeStart, item.timeEnd);
    });
  }

};

export {
  filterTypes,
  sortTypes,
  transports,
  activities,
  getDatesSorted,
  getPointsWithDuration
};
