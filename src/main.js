import {
  Route,
  Menu,
  Filter,
  Sort,
  getCardsMarkup,
  getAddEditMarkup,
  getPriceMarkup
} from "./components/index";

import {
  getMarkup,
  addSection,
  appendSection,
  createElement
} from "./utils/dom";

import {
  routePoints,
  events
} from "./data";

// Route
const routePlace = document.querySelector(`.trip-main__trip-info`);
const renderRoute = (routeMock) => {
  const route = new Route(routeMock, `section`, [`board`, `container`]);
  return route.getTemplate();
};
const route = routePoints.map(renderRoute).join(`\n`);
const routeBlock = createElement(route, `div`, [`trip-info__main`]);
appendSection(routePlace, routeBlock);

// Menu
const menuPlace = document.querySelector(`.trip-controls h2:first-child`);
const renderMenu = () => {
  const menu = new Menu();
  addSection(menuPlace, menu.getTemplate(), `afterend`);
};
renderMenu();

// Filters
const filtersPlace = document.querySelector(`.trip-controls h2:last-child`);

const renderFilter = () => {
  const filter = new Filter();
  addSection(filtersPlace, filter.getTemplate(), `afterend`);
};
renderFilter();

// Sorting
const contentPlace = document.querySelector(`.trip-events`);
const renderSorting = () => {
  const sorting = new Sort();
  addSection(contentPlace, sorting.getTemplate(), `afterend`);
};
renderSorting();

// addSection(contentPlace, Sort(), `beforeend`);

// const addEditBlock = getMarkup(events.slice(0, 1), getAddEditMarkup);
// addSection(contentPlace, addEditBlock, `beforeend`);

// const cardsBlock = getMarkup(events.slice(1, events.length), getCardsMarkup);
// addSection(contentPlace, cardsBlock, `beforeend`);

