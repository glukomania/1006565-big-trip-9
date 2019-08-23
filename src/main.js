import {
  Route,
  Menu,
  Filter,
  Sort,
  Price,
  DayNumber
} from "./components/index";

import {
  addSection,
  appendSection,
  createElement
} from "./utils/dom";

import {
  routePoints,
  points,
  dates
} from "./data";

const routePlace = document.querySelector(`.trip-main__trip-info`);
const menuPlace = document.querySelector(`.trip-controls h2:first-child`);
const filtersPlace = document.querySelector(`.trip-controls h2:last-child`);
const contentPlace = document.querySelector(`.trip-events`);

const renderRoute = (routeMock) => {
  const route = new Route(routeMock, `section`, [`board`, `container`]);
  return route.getTemplate();
};

const renderPrice = () => {
  const totalPrice = new Price();
  addSection(routePlace, totalPrice.getTemplate(), `beforeend`);
};

const renderMenu = () => {
  const menu = new Menu();
  addSection(menuPlace, menu.getTemplate(), `afterend`);
};

const renderFilter = () => {
  const filter = new Filter();
  addSection(filtersPlace, filter.getTemplate(), `afterend`);
};

const renderSorting = () => {
  const sorting = new Sort();
  addSection(contentPlace, sorting.getTemplate(), `afterbegin`);
};

const renderDate = (dateMock, pointItems) => {
  const date = new DayNumber(dateMock, `ul`, [`trip-days`], pointItems);
  appendSection(contentPlace, date.getElement());
};
// Rendering

const route = routePoints.map(renderRoute).join(`\n`);
const routeBlock = createElement(route, `div`, [`trip-info__main`]);
appendSection(routePlace, routeBlock);

renderPrice();

renderMenu();

renderFilter();

// Sorting
renderSorting();

// const eventBlock =  ;
dates.forEach((date) => renderDate(date, points));
