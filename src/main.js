import TripController from "./components/trip-controller";
import {
  Route,
  Price,
  Menu,
  Filter,
  Statistics,
  RouteStubMessage
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
const tripControls = pageBody.querySelector(`.trip-controls`);
const eventAddBtn = pageBody.querySelector(`.trip-main__event-add-btn`);

const AUTHORIZATION = `Basic dXNlckBwYXNzd29yZAo=${Math.random()}`;
const END_POINT = `https://htmlacademy-es-9.appspot.com/big-trip/`;
const api = new API(END_POINT, AUTHORIZATION);

let newPointAddView = null;
const menu = new Menu();
const filter = new Filter(`form`, [`trip-filters`]);
const routeStubMessage = new RouteStubMessage();

addSection(menuPlace, menu.getTemplate(), `afterend`);
appendSection(tripControls, filter.getElement());
appendSection(routePlace, routeStubMessage.getElement());

const contentPlace = document.querySelector(`.trip-events`);

const totalPrice = new Price();

const renewAllPage = (points) => {
  tripController.unrenderAllPoints();
  unrender(pageBody.querySelector(`.trip-events__msg`));
  unrender(pageBody.querySelector(`.trip-info__main`));
  unrender(pageBody.querySelector(`.trip-info__cost`));

  const sortedPoints = setSortAndDuration(points);
  const route = new Route(sortedPoints);
  if (points.length !== 0) {
    appendSection(routePlace, route.getElement());
    addSection(routePlace, totalPrice.getTemplate(sortedPoints), `beforeend`);
    appendSection(pageMain, statistics.getElement(sortedPoints));
  }

  tripController.init(`Everything`, sortedPoints);
};

// change points

const onDataChange = (actionType, update, onError) => {

  switch (actionType) {

    case `create`:
      api.createPoint(update)
        .then(() => api.getPoints())
        .then((points) => {
          renewAllPage(points);
          newPointAddView = null;
        })
        .catch(() => {
          onError();
        });
      break;

    case `update`:
      api.updatePoint({
        id: update.id,
        data: update.toRAW()
      }).then(() => api.getPoints())
        .then((points) => {
          renewAllPage(points);
        })
        .catch(() => {
          onError();
        });
      break;

    case `delete`:
      api.deletePoint({
        id: update.id
      })
        .then(() => api.getPoints())
        .then((points) => {
          renewAllPage(points);
        })
        .catch(() => {
          onError();
        });
      break;
  }
};

let tripController = new TripController(contentPlace, onDataChange, () => newPointAddView);
const statistics = new Statistics();

const setSortAndDuration = (points) => {
  const sortedDates = getDatesSorted(points);
  getPointsWithDuration(sortedDates);
  return sortedDates;
};

// get data

api.getDestinations().then((items) => {
  tripController.getDestinations(items);
})
  .then(() => api.getOffers().then((items) => {
    tripController.getOffers(items);
  }))
  .then(() => api.getPoints()
    .then((datesFromServer) => {
      const sortedPoints = setSortAndDuration(datesFromServer);

      const route = new Route(sortedPoints);
      appendSection(routePlace, route.getElement());

      unrender(routeStubMessage.getElement());
      addSection(routePlace, totalPrice.getTemplate(sortedPoints), `beforeend`);

      appendSection(pageMain, statistics.getElement(sortedPoints));

      tripController.init(`Everything`, sortedPoints);
    }));

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
      filter.getElement().addEventListener(`click`, onFilterClick);
      appendSection(tripControls, filter.getElement());

      eventAddBtn.disabled = false;
      tripController.show();
      break;
    case `stats`:
      tripController.hide();

      unrender(tripControls.querySelector(`.trip-filters`));
      // filterContainer.removeEventListener(`click`, onFilterClick);

      statistics.getElement().classList.remove(`visually-hidden`);
      evt.target.classList.add(`trip-tabs__btn--active`);
      eventAddBtn.disabled = true;
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
    if ((target.value === `Future`) || (target.value === `Past`)) {
      pageBody.querySelector(`.trip-info__cost`).style.visibility = `hidden`;
    } else {
      pageBody.querySelector(`.trip-info__cost`).style.visibility = `visible`;
    }
    tripController.init(target.dataset.filter);
  }
};

filterContainer.addEventListener(`click`, onFilterClick);

// add a new event
const onAddNewClick = () => {
  if (!newPointAddView) {
    newPointAddView = tripController.createPoint(() => {
      newPointAddView = null;
    });
    tripController._onChangeView();
  }
};

eventAddBtn.addEventListener(`click`, onAddNewClick);
