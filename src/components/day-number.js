import {
  appendSection,
  createElement
} from "../utils/dom";
import AddEdit from "./add-edit";
import Event from "./event";
import {isEscapeKey} from "../utils/predicators";
import {formatDate} from "./event-date";

class DayNumber {
  constructor({number, dayDate}, selector, classes, events) {
    this._number = number;
    this._dayDate = dayDate;
    this._selector = selector;
    this._classes = classes;
    this._events = events;
    this._element = null;
  }

  _addListeners(event, container) {
    const eventItem = new Event(event, `li`, [`trip-events__item`]);
    const eventAddEdit = new AddEdit(event, `li`, [`trip-events__item`]);
    const onEscKeyDown = (evt) => {
      if (isEscapeKey(evt.key)) {
        container.replaceChild(eventItem.getElement(), eventAddEdit.getElement());
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    eventItem.getElement()
      .querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, () => {
        container.replaceChild(eventAddEdit.getElement(), eventItem.getElement());
        document.addEventListener(`keydown`, onEscKeyDown);
      });

    eventAddEdit.getElement()
      .querySelector(`.event__save-btn`)
      .addEventListener(`click`, () => {
        container.replaceChild(eventItem.getElement(), eventAddEdit.getElement());
        document.removeEventListener(`keydown`, onEscKeyDown);
      });
    appendSection(container, eventItem.getElement());
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate(), this._selector, this._classes);
      const container = this._element.querySelector(`.trip-events__list`);
      this._events.forEach((event) => this._addListeners(event, container));
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
}

export default DayNumber;
