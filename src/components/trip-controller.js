import {
  Sort,
  Day,
  AddEdit
} from "./index";

import {
  appendSection,
  createElement,
  unrender,
  addSection
} from "../utils/dom";

import {
  groupByKey,
  sortToChange
} from "../utils/util";

import {getDatesFiltering, getPointsWithDuration} from "../data";

import PointController from "./point-controller";

import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import "flatpickr/dist/themes/light.css";

class TripController {
  constructor(container) {
    this._container = container;
    this._dates = null;
    this.onChangeSort = this.onChangeSort.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
    this._daysContainer = null;
    this._subscriptions = [];
    this._onChangeView = this._onChangeView.bind(this);
    this._pointAdd = null;
  }

  init(dates) {
    this._dates = getDatesFiltering(dates);
    getPointsWithDuration(this._dates);
    // Rendering
    if (this._dates.length > 0) {
      this._renderSorting();
      this._daysContainer = createElement(null, `ul`, [`trip-days`]);
      appendSection(this._container, this._daysContainer);
      this._renderGroupedPoints();

    } else {
      this._showStubMessage();
    }
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

  hide() {
    this._container.classList.add(`visually-hidden`);
  }

  show() {
    this._container.classList.remove(`visually-hidden`);
  }
  createPoint() {
    if (this._pointAdd) {
      return;
    }

    const defaultPoint = {
      number: 1,
      type: {type: `Taxi`, label: `Taxi to airport`},
      city: ``,
      pointText: ``,
      timeStart: new Date(),
      timeEnd: new Date(),
      price: 0,
      offers: []
    };
    this._pointAdd = new AddEdit(defaultPoint, true);
    addSection(this._container, this._pointAdd.getTemplate(), `afterbegin`);

    flatpickr(this._pointAdd.getElement().querySelector(`#event-start-time-1`), {
      altInput: true,
      allowInput: true,
      defaultDate: new Date(),
    });

    flatpickr(this._pointAdd.getElement().querySelector(`#event-end-time-1`), {
      altInput: true,
      allowInput: true,
      defaultDate: new Date(),
    });
  }

  _showStubMessage() {
    const stubText = document.createElement(`p`);
    stubText.classList.add(`trip-events__msg`);
    stubText.textContent = `Click New Event to create your first point`;
    this._container.appendChild(stubText);
  }

  _renderSorting() {
    const sorting = new Sort(this.onChangeSort);
    appendSection(this._container, sorting.getElement());
  }

  _renderGroupedPoints() {
    const groupeByDayNumber = groupByKey(`number`);
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

    if (this._dates.every((element) => element === null)) {
      this._showStubMessage();
    } else {
      this._renderGroupedPoints();
    }
  }

  _onChangeView() {
    this._subscriptions.forEach((it) => it());
  }
}

export default TripController;
