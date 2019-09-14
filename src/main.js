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
  addSection,
  unrender
} from "./utils/dom";


const pageMain = document.querySelector(`.main-container`);
const pageBody = document.querySelector(`.page-body__container`);
const routePlace = pageBody.querySelector(`.trip-main__trip-info`);
const menuPlace = pageBody.querySelector(`.trip-controls h2:first-child`);
const filtersPlace = pageBody.querySelector(`.trip-controls h2:last-child`);
const tripControls = pageBody.querySelector(`.trip-controls`);
const eventAddBtn = pageBody.querySelector(`.trip-main__event-add-btn`);

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

let tripController = new TripController(contentPlace, dates);
tripController.init();

// statistics

const statistics = new Statistics(`section`, [`statistics`]);
appendSection(pageMain, statistics.getElement());
statistics.getElement().classList.add(`visually-hidden`);

const menuContainer = tripControls.querySelector(`.trip-tabs`);

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
      statistics.getCharts();
      break;
  }
};

menuContainer.addEventListener(`click`, onMenuClick);

// filters
const getFiltered = (filterType) => {
  const dateNow = new Date();
  if (filterType === `Future`) {
    return dates.filter((item) => item.timeStart > dateNow);
  } else if (filterType === `Past`) {
    return dates.filter((item) => item.timeStart < dateNow);
  }
  return dates;
};

const filterContainer = document.querySelector(`.trip-filters`);
const onFilterClick = (evt) => {
  const target = evt.target;
  let filteredDates = [];
  if (document.querySelector(`.trip-events__msg`)) {
    unrender(document.querySelector(`.trip-events__msg`));
  }
  switch (target.dataset.filter) {
    case `Everything`:
      document.querySelectorAll(`.day`).forEach(unrender);
      unrender(document.querySelector(`.trip-sort`));
      filteredDates = getFiltered(target.dataset.filter);
      tripController = new TripController(contentPlace, filteredDates);
      tripController.init();
      break;
    case `Future`:
      document.querySelectorAll(`.day`).forEach(unrender);
      unrender(document.querySelector(`.trip-sort`));
      filteredDates = getFiltered(target.dataset.filter);
      tripController = new TripController(contentPlace, filteredDates);
      tripController.init();
      break;
    case `Past`:
      document.querySelectorAll(`.day`).forEach(unrender);
      unrender(document.querySelector(`.trip-sort`));
      filteredDates = getFiltered(target.dataset.filter);
      tripController = new TripController(contentPlace, filteredDates);
      tripController.init();
      break;
  }
};

filterContainer.addEventListener(`click`, onFilterClick);

// add a new event
const onAddNewClick = () => tripController.createPoint();
//
eventAddBtn.addEventListener(`click`, onAddNewClick);


