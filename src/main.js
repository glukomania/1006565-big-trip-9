import {
  Route,
  getMenuMarkup,
  getFiltersMarkup,
  getSortMarkup,
  getCardsMarkup,
  getAddEditMarkup,
  getPriceMarkup
} from "./components/index";

import {
  getMarkup,
  addSection,
  insertSection,
  Position,
  createElement
} from "./utils/dom";

import {
  routePoints,
  events
} from "./data";

// route
const routePlace = document.querySelector(`.trip-main__trip-info`);
const renderRoute = (routeMock) => {
  const route = new Route(routeMock, `section`, [`board`, `container`]);
  return route.getTemplate();
};
const route = routePoints.map(renderRoute).join(`\n`);
const routeBlock = createElement(route, `div`, [`trip-info__main`]);
insertSection(routePlace, routeBlock, Position.BEFOREEND);

// menu
const menuPlace = document.querySelector(`.trip-controls h2:first-child`);
addSection(menuPlace, getMenuMarkup(), `afterend`);

const filtersPlace = document.querySelector(`.trip-controls h2:last-child`);
addSection(filtersPlace, getFiltersMarkup(), `afterend`);

const contentPlace = document.querySelector(`.trip-events`);
addSection(contentPlace, getSortMarkup(), `beforeend`);

const addEditBlock = getMarkup(events.slice(0, 1), getAddEditMarkup);
addSection(contentPlace, addEditBlock, `beforeend`);

const cardsBlock = getMarkup(events.slice(1, events.length), getCardsMarkup);
addSection(contentPlace, cardsBlock, `beforeend`);

