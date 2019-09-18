import TripController from "./components/trip-controller";
import {
  Route,
  Price,
  Menu,
  Filter,
  Statistics
} from "./components/index";
import {
  appendSection,
  addSection,
  unrender
} from "./utils/dom";
import API from "./api";

import {
  getDatesSorted,
  getPointsWithDuration
} from "./data";

const pageMain = document.querySelector(`.main-container`);
const pageBody = document.querySelector(`.page-body__container`);
const routePlace = pageBody.querySelector(`.trip-main__trip-info`);
const menuPlace = pageBody.querySelector(`.trip-controls h2:first-child`);
const filtersPlace = pageBody.querySelector(`.trip-controls h2:last-child`);
const tripControls = pageBody.querySelector(`.trip-controls`);
const eventAddBtn = pageBody.querySelector(`.trip-main__event-add-btn`);
const tripDaysContainer = document.querySelector(`.trip-days`);

const AUTHORIZATION = `Basic dXNlckBwYXNzd29yZAo=${Math.random()}`;
const END_POINT = `https://htmlacademy-es-9.appspot.com/big-trip/`;
const api = new API(END_POINT, AUTHORIZATION);

const menu = new Menu();
const filter = new Filter();

addSection(menuPlace, menu.getTemplate(), `afterend`);
addSection(filtersPlace, filter.getTemplate(), `afterend`);

const contentPlace = document.querySelector(`.trip-events`);

const totalPrice = new Price();

// change points

const onDataChange = (actionType, update) => {
  tripController.unrenderAllPoints();
  switch (actionType) {
    case `create`:
      api.createPoint({
        id: update.id,
        data: update.toRAW()
      }).then(() => api.getPoints())
        .then((points) => {
          const sortedPoints = setSortAndDuration(points);
          tripController.init(`Everything`, sortedPoints);
        });
      break;
    case `update`:
      api.updatePoint({
        id: update.id,
        data: update.toRAW()
      }).then(() => api.getPoints())
        .then((points) => {
          const sortedPoints = setSortAndDuration(points);
          tripController.init(`Everything`, sortedPoints);
        });
      break;
    case `delete`:
      api.deletePoint({
        id: update.id
      })
        .then(() => api.getPoints())
        .then((points) => {
          const sortedPoints = setSortAndDuration(points);
          tripController.init(`Everything`, sortedPoints);
        });
      break;
  }
};

let tripController = new TripController(contentPlace, onDataChange);
const statistics = new Statistics();

// load data

const setSortAndDuration = (points) => {
  const sortedDates = getDatesSorted(points);
  getPointsWithDuration(sortedDates);
  return sortedDates;
};

api.getPoints()
.then((datesFromServer) => {
  const sortedPoints = setSortAndDuration(datesFromServer);

  const route = new Route(sortedPoints);
  route.getTemplate();
  appendSection(routePlace, route.getElement(), `beforeend`);

  addSection(routePlace, totalPrice.getTemplate(sortedPoints), `beforeend`);
  appendSection(pageMain, statistics.getElement(sortedPoints), `beforeend`);

  tripController.init(`Everything`, sortedPoints);
});

// statistics

statistics.getElement().classList.add(`visually-hidden`);

const menuContainer = tripControls.querySelector(`.trip-tabs`);

const onMenuClick = (evt) => {
  const allTabs = tripControls.querySelectorAll(`.trip-tabs__btn`);
  allTabs.forEach((item) => item.classList.remove(`trip-tabs__btn--active`));

  switch (evt.target.dataset.menu) {
    case `table`:
      statistics.getElement().classList.add(`visually-hidden`);
      evt.target.classList.add(`trip-tabs__btn--active`);

      appendSection(tripControls, filter.getElement());
      filterContainer.addEventListener(`click`, onFilterClick);

      tripController.show();
      break;
    case `stats`:
      tripController.hide();

      unrender(tripControls.querySelector(`.trip-filters`));
      filterContainer.removeEventListener(`click`, onFilterClick);

      statistics.getElement().classList.remove(`visually-hidden`);
      evt.target.classList.add(`trip-tabs__btn--active`);
      statistics.getCharts();
      break;
  }
};

menuContainer.addEventListener(`click`, onMenuClick);

// filters

const filterContainer = document.querySelector(`.trip-filters`);

const onFilterClick = (evt) => {
  const target = evt.target;

  if (target.tagName !== `INPUT`) {
    return;
  } else {

    if (document.querySelector(`.trip-events__msg`)) {
      unrender(document.querySelector(`.trip-events__msg`));
    }

    document.querySelectorAll(`.day`).forEach(unrender);
    unrender(document.querySelector(`.trip-sort`));
    unrender(document.querySelector(`.trip-info__cost`));

    tripController.init(target.dataset.filter);
  }
};

filterContainer.addEventListener(`click`, onFilterClick);

// add a new event
const onAddNewClick = () => tripController.createPoint();
eventAddBtn.addEventListener(`click`, onAddNewClick);

