import {transports, activities, cities} from "../data";
import {
  formatDate,
  formatTime
} from "./add-edit-date";
import {createElement} from "../utils/dom";

class AddEdit {
  constructor({type, pointText, city, timeStart, timeEnd, price, offers}, selector, classes, isAdd = false) {
    this._element = null;
    this._city = city;
    this._type = type;
    this._pointText = pointText;
    this._timeStart = timeStart;
    this._timeEnd = timeEnd;
    this._price = price;
    this._offers = offers;
    this._isAdd = isAdd;
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
    <form class="trip-events__item  event  event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">
              Choose event type
            </span>
            <img
              class="event__type-icon"
              width="17" height="17"
              src="img/icons/${this._type.toLowerCase()}.png"
              alt="Event type icon">
          </label>
          <input
            class="event__type-toggle
            visually-hidden"
            id="event-type-toggle-1"
            type="checkbox"
          >

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">
                Transfer
              </legend>

              ${transports.map(this._getTransportTemplate).join(`\n`)}

            </fieldset>

            <fieldset class="event__type-group">
              <legend class="visually-hidden">
                Activity
              </legend>

              ${activities.map(this._getActivityTemplate).join(`\n`)}

            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label
            class="event__label
            event__type-output"
            for="event-destination-1">
              ${this._pointText}
          </label>
          <input
            class="event__input
            event__input--destination"
            id="event-destination-1"
            type="text"
            name="event-destination"
            value="${this._city}"
            list="destination-list-1"
          >
          <datalist id="destination-list-1">
            ${cities.map(this._getCityListTemplate).join(`\n`)}
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">
            From
          </label>
          <input
            class="event__input
            event__input--time"
            id="event-start-time-1"
            type="text"
            name="event-start-time"
            value="${formatDate(this._timeStart)} ${formatTime(this._timeStart)}"
          >
          &mdash;
          <label
            class="visually-hidden"
            for="event-end-time-1">
              To
          </label>
          <input
            class="event__input
            event__input--time"
            id="event-end-time-1"
            type="text"
            name="event-end-time"
            value="${formatDate(this._timeEnd)} ${formatTime(this._timeEnd)}"
          >
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;&nbsp;
          </label>
          <input
            class="event__input
            event__input--price"
            id="event-price-1"
            type="text"
            name="event-price"
            value="${this._price}"
          >
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">
          Save
        </button>
        <button class="event__reset-btn" type="reset">
          ${this._isAdd ? `Cancel` : `Delete`}
        </button>
        ${this._isAdd ? `` : this._getOptionBlock()}
      </header>
      ${this._isAdd ? `` : this._getEventDetailsTemplate(this._pointText)}
    </form>
    `;
  }

  removeElement() {
    this._element = null;
  }

  _getTransportTemplate(transport) {
    const transportLowCase = transport.toLowerCase();
    return `
    <div class="event__type-item">
      <input
        id="event-type-${transportLowCase}-1"
        class="event__type-input
        visually-hidden"
        type="radio"
        name="event-type"
        value="${transportLowCase}"
      >
      <label
        class="event__type-label
        event__type-label--${transportLowCase}"
        for="event-type-${transportLowCase}-1">
          ${transport}
      </label>
    </div>`;
  }

  _getActivityTemplate(activity) {
    const activityLow = activity.toLowerCase();
    return `
    <div class="event__type-item">
      <input
        id="event-type-${activityLow}-1"
        class="event__type-input
        visually-hidden" type="radio"
        name="event-type"
        value="${activityLow}"
      >
      <label
        class="event__type-label
        event__type-label--${activityLow}"
        for="event-type-${activityLow}-1">
          ${activity}
      </label>
    </div>`;
  }

  _getCityListTemplate(city) {
    return `<option value="${city}"></option>`;
  }

  _getOptionBlock() {
    return `
  <input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" checked>
  <label class="event__favorite-btn" for="event-favorite-1">
    <span class="visually-hidden">Add to favorite</span>
    <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
      <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
    </svg>
  </label>

  <button class="event__rollup-btn" type="button">
    <span class="visually-hidden">Open event</span>
  </button>`;
  }

  _getOfferTemplate({id, text, price}) {
    return `
  <div class="event__offer-selector">
  <input class="event__offer-checkbox  visually-hidden" id="event-offer-${id}-1" type="checkbox" name="event-offer-${id}" checked>
  <label class="event__offer-label" for="event-offer-${id}-1">
    <span class="event__offer-title">${text}</span>
    &plus;
    &euro;&nbsp;<span class="event__offer-price">${price}</span>
  </label>
  </div>`;
  }

  _getEventDetailsTemplate() {
    return `
  <section class="event__details">

    <section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>

      <div class="event__available-offers">
       ${this._offers.map(this._getOfferTemplate).join(`\n`)}

      </div>
    </section>

    <section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${this._pointText}</p>

      <div class="event__photos-container">
        <div class="event__photos-tape">
          <img class="event__photo" src="img/photos/1.jpg" alt="Event photo">
          <img class="event__photo" src="img/photos/2.jpg" alt="Event photo">
          <img class="event__photo" src="img/photos/3.jpg" alt="Event photo">
          <img class="event__photo" src="img/photos/4.jpg" alt="Event photo">
          <img class="event__photo" src="img/photos/5.jpg" alt="Event photo">
        </div>
      </div>
    </section>
  </section>
  `;
  }

}

export default AddEdit;
