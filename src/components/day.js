import {formatDate} from "./point-date";
import AbstractComponent from "./abstract-component";
import moment from 'moment';

class Day extends AbstractComponent {
  constructor(number, timeStart, selector, classes, points) {
    super();
    this._number = number;
    this._timeStart = timeStart;
    this._selector = selector;
    this._classes = classes;
    this._points = points;
  }

  getTemplate() {
    return `
      <div class="day__info">
        <span class="day__counter">${this._number}</span>
        <time class="day__date" datetime="${formatDate(this._timeStart)}">${moment(this._timeStart).format(`MMM DD`)}</time>
      </div>

      <ul class="trip-events__list">

      </ul>
    `;
  }

}

export default Day;
