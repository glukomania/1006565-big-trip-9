import {
  createElement
} from "../utils/dom";
import {
  dates,
  events,
} from "../data";

import {
  formatDate,
  formatTime,
  getDuration
} from "../date";


class Event {
  constructor({type, eventText, timeStart, timeEnd, price, offers}) {
    this._element = null;
    this._type = type;
    this._eventText = eventText;
    this._timeStart = timeStart;
    this._timeEnd = timeEnd;
    this._price = price;
    this._offers = offers;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  getTemplate() {
    const getEventTemplate = () => `
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
          ${this._eventText}
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

        ${getOffersTemplate(this._offers)}

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>
    `;

    const getOfferBlok = ({text, price}) => `
    <li class="event__offer">
    <span class="event__offer-title">${text}</span>
    &plus;
    &euro;&nbsp;<span class="event__offer-price">${price}</span>
    </li>`;

    const getOffersTemplate = () => {
      return `
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        ${this._offers.map(getOfferBlok).join(`\n`)}
      </ul>`;
    };

    const getDayTemplate = ({number, dayDate} = {}) => `
    <li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${number}</span>
        <time class="day__date" datetime="${formatDate(dayDate)}">${formatDate(dayDate)}</time>
      </div>

      <ul class="trip-events__list">
        ${events.map(getEventTemplate).join(`\n`)}
      </ul>
    </li>
    `;

    return `
    <ul class="trip-days">
      ${dates.map(getDayTemplate).join(`\n`)}
    </ul>
    `;
  }

}

export {Event};
