import {
  createElement
} from "../utils/dom";
import {formatDate} from "./point-date";
import AbstractComponent from "./abstract-component";

class Day extends AbstractComponent {
  constructor(number, timeStart, selector, classes, points) {
    super();
    this._number = number;
    this._timeStart = timeStart;
    this._selector = selector;
    this._classes = classes;
    this._points = points;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate(), this._selector, this._classes);
    }

    return this._element;
  }

  getTemplate() {
    return `
      <div class="day__info">
        <span class="day__counter">${this._number}</span>
        <time class="day__date" datetime="${formatDate(this._timeStart)}">${formatDate(this._timeStart)}</time>
      </div>

      <ul class="trip-events__list">

      </ul>
    `;
  }

}

export default Day;
