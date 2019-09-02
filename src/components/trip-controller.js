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
  createElement,
  unrender
} from "../utils/dom";

import {
  groupByDayNumber,
  sortToChange
} from "../utils/util";

import {routePoints} from "../data";

class TripController {
  constructor(container, dates) {
    this._container = container;
    this._dates = dates;
    this._routePlace = null;
    this._menuPlace = null;
    this._filtersPlace = null;
    this.onChangeSort = this.onChangeSort.bind(this);
  }

  init() {
    this._routePlace = document.querySelector(`.trip-main__trip-info`);
    this._menuPlace = document.querySelector(`.trip-controls h2:first-child`);
    this._filtersPlace = document.querySelector(`.trip-controls h2:last-child`);

    // Rendering
    if (this._dates.length > 0) {
      const route = routePoints.map(this._renderRoute).join(`\n`);
      const routeBlock = createElement(route, `div`, [`trip-info__main`]);
      appendSection(this._routePlace, routeBlock);
      this._renderSorting();

      this._renderDroupedPoints();

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
    const sorting = new Sort(this.onChangeSort);
    appendSection(this._container, sorting.getElement());
  }

  onChangeSort(typeSort) {
    document.querySelectorAll(`.day`).forEach(unrender);
    const sortedPoints = sortToChange[typeSort]([...this._dates]);
    if (typeSort === `time` || typeSort === `price`) {
      sortedPoints.forEach((point) => {
        return this._renderDate(point.number, [point], false);
      });
    } else {
      this._renderDroupedPoints();
    }
  }

  _renderDroupedPoints() {
    const groupeByDayNumber = groupByDayNumber();
    const groupedPoints = groupeByDayNumber(this._dates);
    //

    for (const [key, value] of Object.entries(groupedPoints)) {
      this._renderDate(key, value);
    }
  }

  _sortByTime(points) {
    return points.sort((a, b) => a.timeStart < b.timeStart ? 1 : -1);
  }

  _renderDate(dayNumber, points, displayDate = true) {
    let date = null;
    if (displayDate) {
      date = new DayNumber(dayNumber, points[0].timeStart, `ul`, [`trip-days`], points);
    } else {
      date = new DayNumber(``, ``, `ul`, [`trip-days`], points);
    }
    appendSection(this._container, date.getElement());
  }
}

export default TripController;
