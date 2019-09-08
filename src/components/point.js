import AbstractComponent from "./abstract-component";

import {
  formatTime,
  duration
} from "./point-date";

class Point extends AbstractComponent {
  constructor({type, activity, city, pointText, timeStart, timeEnd, price, offers}, selector, classes) {
    super();
    this._type = type;
    this._pointText = pointText;
    this._activity = activity;
    this._city = city;
    this._timeStart = timeStart;
    this._timeEnd = timeEnd;
    this._price = price;
    this._offers = offers;
    this._selector = selector;
    this._classes = classes;
  }

  getElement() {
    if (this._element === null) {
      this._element = document.createElement(`li`);
      this._element.classList.add(`trip-events__item`);
      this._element.innerHTML = this.getTemplate();
    }
    return this._element;
  }

  getTemplate() {
    return `
      <div class="event">
        <div class="event__type">
          <img
            class="event__type-icon"
            width="42" height="42"
            src="img/icons/${this._type.type}.png"
            alt="Event type icon">
        </div>
        <h3 class="event__title">
          ${this._type.label} ${this._city}
        </h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${this._timeStart}">${formatTime(this._timeStart)}</time>
            &mdash;
            <time class="event__end-time" datetime="${this._timeEnd}">${formatTime(this._timeEnd)}</time>
          </p>
          <p class="event__duration">${duration.getNormalDuration(this._timeStart, this._timeEnd)}</p>
        </div>

        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${this._price}</span>
        </p>

        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${this._offers.filter((it) => it.checked === true).map(this._getOfferBlock).join(`\n`)}
        </ul>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    `;
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
