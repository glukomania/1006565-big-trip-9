import {dates} from "./data";
import TripController from "./components/trip-controller";
import {routePoints} from "./data";
import {
  Route,
  Menu,
  Filter,
  Price,
  Statistics
} from "./components/index";
import {
  createElement,
  appendSection,
  addSection
} from "./utils/dom";


const routePlace = document.querySelector(`.trip-main__trip-info`);
const menuPlace = document.querySelector(`.trip-controls h2:first-child`);
const filtersPlace = document.querySelector(`.trip-controls h2:last-child`);
const tripControls = document.querySelector(`.trip-controls`);
const eventAddBtn = document.querySelector(`.trip-main__event-add-btn`);
const totalPrice = new Price();
const menu = new Menu();
const filter = new Filter();

const renderRoute = (routeMock) => {
  const route = new Route(routeMock, `section`, [`board`, `container`]);
  return route.getTemplate();
};

const route = routePoints.map(renderRoute).join(`\n`);
const routeBlock = createElement(route, `div`, [`trip-info__main`]);
appendSection(routePlace, routeBlock);

addSection(routePlace, totalPrice.getTemplate(), `beforeend`);
addSection(menuPlace, menu.getTemplate(), `afterend`);
addSection(filtersPlace, filter.getTemplate(), `afterend`);

const contentPlace = document.querySelector(`.trip-events`);

const tripController = new TripController(contentPlace, dates);
tripController.init();

// statistics

const statistics = new Statistics();
statistics.getElement().classList.add(`visually-hidden`);

const menuEl = tripControls.querySelector(`.trip-tabs`);

const onMenuClick = (evt) => {
  const allTabs = tripControls.querySelectorAll(`.trip-tabs__btn`);
  allTabs.forEach((item) => item.classList.remove(`trip-tabs__btn--active`));

  switch (evt.target.dataset.menu) {
    case `table`:
      statistics.getElement().classList.add(`visually-hidden`);
      evt.target.classList.add(`trip-tabs__btn--active`);
      tripController.show();
      break;
    case `stats`:
      tripController.hide();
      statistics.getElement().classList.remove(`visually-hidden`);
      evt.target.classList.add(`trip-tabs__btn--active`);
      break;
  }
};

menuEl.addEventListener(`click`, onMenuClick);


// add a new event
const onAddNewClick = () => tripController.createPoint();
//
eventAddBtn.addEventListener(`click`, onAddNewClick);


