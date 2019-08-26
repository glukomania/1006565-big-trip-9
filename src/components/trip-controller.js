import {
  Route,
  Menu,
  Filter,
  Sort,
  Price,
  DayNumber
} from "./index";

import {
  addSection,
  appendSection,
  createElement
} from "../utils/dom";

import {routePoints, dates} from "../data";

class TripController {
  constructor(container, points) {
    this._container = container;
    this._points = points;
    this._routePlace = null;
    this._menuPlace = null;
    this._filtersPlace = null;

  }

  init() {
    this._routePlace = document.querySelector(`.trip-main__trip-info`);
    this._menuPlace = document.querySelector(`.trip-controls h2:first-child`);
    this._filtersPlace = document.querySelector(`.trip-controls h2:last-child`);

    // Rendering
    if (this._points.length > 0) {
      const route = routePoints.map(this._renderRoute).join(`\n`);
      const routeBlock = createElement(route, `div`, [`trip-info__main`]);
      appendSection(this._routePlace, routeBlock);
      this._renderSorting();
      dates.forEach((date) => this._renderDate(date, this._points));
    } else {
      const stubText = document.createElement(`p`);
      stubText.classList.add(`trip-events__msg`);
      stubText.textContent = `Click New Event to create your first point`;
      this._contentPlace.appendChild(stubText);
    }

    this._renderPrice();

    this._renderMenu();

    this._renderFilter();

  }

  _renderRoute(routeMock) {
    const route = new Route(routeMock, `section`, [`board`, `container`]);
    return route.getTemplate();
  }

  _renderPrice() {
    const totalPrice = new Price();
    addSection(this._routePlace, totalPrice.getTemplate(), `beforeend`);
  }

  _renderMenu() {
    const menu = new Menu();
    addSection(this._menuPlace, menu.getTemplate(), `afterend`);
  }

  _renderFilter() {
    const filter = new Filter();
    addSection(this._filtersPlace, filter.getTemplate(), `afterend`);
  }

  _renderSorting() {
    const sorting = new Sort();
    addSection(this._container, sorting.getTemplate(), `afterbegin`);
  }

  _renderDate(dateMock, pointItems) {
    const date = new DayNumber(dateMock, `ul`, [`trip-days`], pointItems);
    appendSection(this._container, date.getElement());
  }
}

export default TripController;
