import {
  Route,
  Menu,
  Filter,
  Sort,
  Event,
  AddEdit,
  Price
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

// Total price
const renderPrice = () => {
  const totalPrice = new Price();
  addSection(routePlace, totalPrice.getTemplate(), `beforeend`);
};
renderPrice();


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
  addSection(contentPlace, sorting.getTemplate(), `afterbegin`);
};
renderSorting();

// cards
const renderEvent = (eventMock) => {
  const event = new Event(eventMock);
  const eventAddEdit = new AddEdit(eventMock);
  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      contentPlace.replaceChild(event.getElement(), eventAddEdit.getElement());
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  event.getElement()
  .querySelector(`.event__rollup-btn`)
  .addEventListener(`click`, () => {
    contentPlace.replaceChild(eventAddEdit.getElement(), event.getElement());
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  eventAddEdit.getElement()
  .querySelector(`.event__save-btn`)
  .addEventListener(`click`, () => {
    contentPlace.replaceChild(event.getElement(), eventAddEdit.getElement());
    eventAddEdit.removeElement();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  appendSection(contentPlace, event.getElement());
};


events.forEach((eventMock) => renderEvent(eventMock));
