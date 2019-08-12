import {
  routeMarkup,
  menuMarkup,
  filtersMarkup,
  sortMarkup,
  cardsMarkup,
  addEditMarkup
} from "./components/index";

import {
  getMarkup,
  addSection
} from "./render";

import {
  routeData,
  editData
} from "./data";

const routePlace = document.querySelector(`.trip-main__trip-info`);
const routeBlock = getMarkup(routeData, routeMarkup);
addSection(routePlace, routeBlock, `afterbegin`);

const menuPlace = document.querySelector(`.trip-controls h2:first-child`);
addSection(menuPlace, menuMarkup(), `afterend`);

const filtersPlace = document.querySelector(`.trip-controls h2:last-child`);
addSection(filtersPlace, filtersMarkup(), `afterend`);

const contentPlace = document.querySelector(`.trip-events`);
addSection(contentPlace, sortMarkup(), `beforeend`);

const addEditBlock = getMarkup(editData, addEditMarkup);
addSection(contentPlace, addEditBlock, `beforeend`);

addSection(contentPlace, cardsMarkup(), `beforeend`);
