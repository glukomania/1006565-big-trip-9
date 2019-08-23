import {
  createElement
} from "../utils/dom";


import {
  formatTime,
  getDuration
} from "./point-date";


class Point {
  constructor({type, pointText, timeStart, timeEnd, price, offers}, selector, classes) {
    this._element = null;
    this._type = type;
    this._pointText = pointText;
    this._timeStart = timeStart;
    this._timeEnd = timeEnd;
    this._price = price;
    this._offers = offers;
    this._selector = selector;
    this._classes = classes;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate(), this._selector, this._classes);
    }
    return this._element;
  }

  getTemplate() {
    return `
    <li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img
            class="event__type-icon"
            width="42" height="42"
            src="img/icons/${this._type}.png"
            alt="Event type icon">
        </div>
        <h3 class="event__title">
          ${this._pointText}
        </h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${this._timeStart}">${formatTime(this._timeStart)}</time>
            &mdash;
            <time class="event__end-time" datetime="${this._timeEnd}">${formatTime(this._timeEnd)}</time>
          </p>
          <p class="event__duration">${getDuration(this._timeStart, this._timeEnd)}</p>
        </div>

        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${this._price}</span>
        </p>

        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${this._offers.map(this._getOfferBlock).join(`\n`)}
        </ul>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>
    `;
  }

  removeElement() {
    this._element = null;
  }

  _getOfferBlock({text, price}) {
    return `
    <li class="event__offer">
    <span class="event__offer-title">${text}</span>
    &plus;
    &euro;&nbsp;<span class="event__offer-price">${price}</span>
    </li>`;
  }
}

export default Point;
