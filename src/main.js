import {
  routeTemplate,
  menuTemplate,
  filtersTemplate,
  sortTemplate,
  cardsTemplate,
  addEditTemplate
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
const routeMarkup = getMarkup(routeData, routeTemplate);
addSection(routePlace, routeMarkup, `afterbegin`);

const menuPlace = document.querySelector(`.trip-controls h2:first-child`);
addSection(menuPlace, menuTemplate(), `afterend`);

const filtersPlace = document.querySelector(`.trip-controls h2:last-child`);
addSection(filtersPlace, filtersTemplate(), `afterend`);

const contentPlace = document.querySelector(`.trip-events`);
addSection(contentPlace, sortTemplate(), `beforeend`);

const addEditMarkup = getMarkup(editData, addEditTemplate);
addSection(contentPlace, addEditMarkup, `beforeend`);

addSection(contentPlace, cardsTemplate(), `beforeend`);
