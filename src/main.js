import {
  menu,
  route,
  filters,
  addEdit,
  sort,
  cards
} from "./components/index";

import {
  getMarkup,
  addSection
} from "./render";

const routePlace = document.querySelector(`.trip-main__trip-info`);
addSection(routePlace, route, `afterbegin`);

const menuPlace = document.querySelector(`.trip-controls h2:first-child`);
addSection(menuPlace, menu, `afterend`);

const filtersPlace = document.querySelector(`.trip-controls h2:last-child`);
addSection(filtersPlace, filters, `afterend`);

const contentPlace = document.querySelector(`.trip-events`);
addSection(contentPlace, sort, `beforeend`);

addSection(contentPlace, addEdit, `beforeend`);

addSection(contentPlace, cards, `beforeend`);




