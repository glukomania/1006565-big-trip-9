import {
  appendSection,
  createElement
} from "../utils/dom";
import AddEdit from "./add-edit";
import Point from "./point";
import {isEscapeKey} from "../utils/predicators";
import {formatDate} from "./point-date";

class DayNumber {
  constructor({number, dayDate}, selector, classes, points) {
    this._number = number;
    this._dayDate = dayDate;
    this._selector = selector;
    this._classes = classes;
    this._points = points;
    this._element = null;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate(), this._selector, this._classes);
      const container = this._element.querySelector(`.trip-events__list`);
      this._points.forEach((point) => this._addListeners(point, container));
    }

    return this._element;
  }

  getTemplate() {
    return `
    <li class="trip-days__item  day">
    <div class="day__info">
      <span class="day__counter">${this._number}</span>
      <time class="day__date" datetime="${formatDate(this._dayDate)}">${formatDate(this._dayDate)}</time>
    </div>

    <ul class="trip-events__list">

    </ul>
  </li>
    `;
  }

  _addListeners(point, container) {
    const pointItem = new Point(point, `li`, [`trip-events__item`]);
    const pointAddEdit = new AddEdit(point, `li`, [`trip-events__item`]);
    const onEscKeyDown = (evt) => {
      if (isEscapeKey(evt)) {
        container.replaceChild(pointItem.getElement(), pointAddEdit.getElement());
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    pointItem.getElement()
      .querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, () => {
        container.replaceChild(pointAddEdit.getElement(), pointItem.getElement());
        document.addEventListener(`keydown`, onEscKeyDown);
      });

    pointAddEdit.getElement()
      .querySelector(`.event__save-btn`)
      .addEventListener(`click`, () => {
        container.replaceChild(pointItem.getElement(), pointAddEdit.getElement());
        document.removeEventListener(`keydown`, onEscKeyDown);
      });
    appendSection(container, pointItem.getElement());
  }

}

export default DayNumber;
