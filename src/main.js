import {
  getRouteMarkup,
  getMenuMarkup,
  getFiltersMarkup,
  getSortMarkup,
  getCardsMarkup,
  getAddEditMarkup,
  getPriceMarkup
} from "./components/index";

import {
  getMarkup,
  addSection
} from "./utils/dom";

import {
  routeData,
  events
} from "./data";

const routePlace = document.querySelector(`.trip-main__trip-info`);
const routeBlock = getMarkup(routeData, getRouteMarkup);
addSection(routePlace, routeBlock, `afterbegin`);
addSection(routePlace, getPriceMarkup(), `beforeend`);

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

