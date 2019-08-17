import {
  getRouteMarkup,
  getMenuMarkup,
  getFiltersMarkup,
  getSortMarkup,
  getCardsMarkup,
  getAddEditMarkup
} from "./components/index";

import {
  getMarkup,
  addSection
} from "./utils";

import {
  routeData,
  event
} from "./data";

const routePlace = document.querySelector(`.trip-main__trip-info`);
const routeBlock = getMarkup(routeData, getRouteMarkup);
addSection(routePlace, routeBlock, `afterbegin`);

const menuPlace = document.querySelector(`.trip-controls h2:first-child`);
addSection(menuPlace, getMenuMarkup(), `afterend`);

const filtersPlace = document.querySelector(`.trip-controls h2:last-child`);
addSection(filtersPlace, getFiltersMarkup(), `afterend`);

const contentPlace = document.querySelector(`.trip-events`);
addSection(contentPlace, getSortMarkup(), `beforeend`);

const eventToEdit = event.slice(0, 1);
const addEditBlock = getMarkup(eventToEdit, getAddEditMarkup);
addSection(contentPlace, addEditBlock, `beforeend`);

const cardsBlock = getMarkup(event, getCardsMarkup);
addSection(contentPlace, cardsBlock, `beforeend`);

