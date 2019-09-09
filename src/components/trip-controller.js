import {
  Route,
  Menu,
  Filter,
  Sort,
  Price,
  Day
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
import PointController from "./point-controller";

class TripController {
  constructor(container, dates) {
    this._container = container;
    this._dates = dates;
    this._routePlace = null;
    this._menuPlace = null;
    this._filtersPlace = null;
    this.onChangeSort = this.onChangeSort.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
    this._daysContainer = null;
    this._subscriptions = [];
    this._onChangeView = this._onChangeView.bind(this);
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
      this._daysContainer = createElement(null, `ul`, [`trip-days`]);
      appendSection(this._container, this._daysContainer);
      this._renderGroupedPoints();

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

  onChangeSort(typeSort) {
    document.querySelectorAll(`.day`).forEach(unrender);
    const sortedPoints = sortToChange[typeSort]([...this._dates]);
    if (typeSort === `time` || typeSort === `price`) {
      sortedPoints.forEach((point) => {
        return this._renderDate(point.number, [point], false);
      });
    } else {
      this._renderGroupedPoints();
    }
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

  _renderGroupedPoints() {
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
      date = new Day(dayNumber, points[0].timeStart, `li`, [`trip-days__item`, `day`], points);
    } else {
      date = new Day(``, ``, `li`, [`trip-days__item`, `day`], points);
    }
    points.forEach((point) => {
      const pointController = new PointController(date.getElement(), point, this._onDataChange, this._onChangeView);
      pointController.init();
      this._subscriptions.push(pointController.setDefaultView.bind(pointController));
    });
    appendSection(this._daysContainer, date.getElement());
  }

  _onDataChange(oldPoint, newPoint) {
    const indexOfEditedPoint = this._dates.findIndex((it) => {
      return it === oldPoint;
    });

    this._dates[indexOfEditedPoint] = newPoint;
    this._daysContainer.innerHTML = ``;

    this._renderGroupedPoints();
  }

  _onChangeView() {
    this._subscriptions.forEach((it) => it());
  }

}

export default TripController;
