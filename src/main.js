// import {dates} from "./data";
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
import API from "./api";

const pageMain = document.querySelector(`.main-container`);
const pageBody = document.querySelector(`.page-body__container`);
const routePlace = pageBody.querySelector(`.trip-main__trip-info`);
const menuPlace = pageBody.querySelector(`.trip-controls h2:first-child`);
const filtersPlace = pageBody.querySelector(`.trip-controls h2:last-child`);
const tripControls = pageBody.querySelector(`.trip-controls`);
const eventAddBtn = pageBody.querySelector(`.trip-main__event-add-btn`);

const AUTHORIZATION = `Basic dXNlckBwYXNzd29yZAo=${Math.random()}`;
const END_POINT = `https://htmlacademy-es-9.appspot.com/big-trip/`;
const api = new API(END_POINT, AUTHORIZATION);

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

// points

const onDataChange = (actionType, update) => {
  switch (actionType) {
    case `delete`:
      api.deleteTask({
        id: update.id
      })
        .then(() => api.getTasks())
        .then((points) => tripController.show(points));
      break;
  }
};

let tripController = new TripController(contentPlace, onDataChange);
api.getPoints().then((dates) => tripController.init(dates));

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
const getFilteredPoints = (datesToFilter, filterType) => {
  const dateNow = new Date();
  if (filterType === `Future`) {
    return datesToFilter.filter((item) => item.timeStart > dateNow);
  } else if (filterType === `Past`) {
    return datesToFilter.filter((item) => item.timeStart < dateNow);
  }
  return datesToFilter;
};

const renderFilteredPoints = (filterType) => {
  document.querySelectorAll(`.day`).forEach(unrender);
  unrender(document.querySelector(`.trip-sort`));

  tripController = new TripController(contentPlace);
  api.getPoints().then((dates) => tripController.init(getFilteredPoints(dates, filterType)));
};

const filterContainer = document.querySelector(`.trip-filters`);

const onFilterClick = (evt) => {
  const target = evt.target;

  if (target.tagName !== `INPUT`) {
    return;
  } else {

    if (document.querySelector(`.trip-events__msg`)) {
      unrender(document.querySelector(`.trip-events__msg`));
    }

    renderFilteredPoints(target.dataset.filter);
  }
};

filterContainer.addEventListener(`click`, onFilterClick);

// add a new event
const onAddNewClick = () => tripController.createPoint();
//
eventAddBtn.addEventListener(`click`, onAddNewClick);

// requests

