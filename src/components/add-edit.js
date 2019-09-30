import {transports, activities} from "../data";
import AbstractComponent from "./abstract-component";
import {ModelPoint} from "../model-point";
import {unrender} from "../utils/dom";
import moment from 'moment';
import DOMPurify from 'dompurify';


class AddEdit extends AbstractComponent {
  constructor({id, type, pointText, city, pictures, timeStart, timeEnd, price, offers, isFavorite}, isAdd = false, onDataChange, allDestinations, allOffers, onError, clearNewPointAddView) {
    super();
    this._id = id;
    this._city = city;
    this._isFavorite = isFavorite;
    this._type = type;
    this._pointText = pointText;
    this._timeStart = timeStart;
    this._timeEnd = timeEnd;
    this._price = price;
    this._offers = offers;
    this._isAdd = isAdd;
    this._allDestinations = allDestinations;
    this._allOffers = allOffers;
    this._pictures = pictures;
    this._onError = onError;
    this._onDataChange = onDataChange;
    this.onSaveClick = this.onSaveClick.bind(this);
    this._getOfferTemplate = this._getOfferTemplate.bind(this);
    this._getTransportTemplate = this._getTransportTemplate.bind(this);
    this._getActivityTemplate = this._getActivityTemplate.bind(this);
    this._clearNewPointAddView = clearNewPointAddView;
  }

  getTemplate() {
    return `
    <form class="trip-events__item  event  event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${this._type.type}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

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
              ${this._type.label}
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
            ${this._allDestinations.map(this._getCityListTemplate).join(`\n`)}
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
            value="${moment(this._timeStart).format(`DD/MM/YY`)}"
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
            value="${moment(this._timeEnd).format(`DD/MM/YY`)}"
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

        <button class="event__save-btn btn  btn--blue" type="submit">
          Save
        </button>
        <button class="event__reset-btn" type="reset">
          ${this._isAdd ? `Cancel` : `Delete`}
        </button>
        ${this._isAdd ? `` : this._getOptionBlock()}
      </header>
      ${this._getEventDetailsTemplate(this._pointText)}
    </form>
    `;
  }

  onSaveClick(evt) {

    evt.preventDefault();
    const saveButton = document.querySelector(`.event__save-btn`);
    const formData = new FormData(document.querySelector(`.event--edit`));

    const validateFields = () => {
      return formData.get(`event-destination`)
        && this._allDestinations.find((item) => item.name === formData.get(`event-destination`))
        && (new Date(formData.get(`event-end-time`))) >= (new Date(formData.get(`event-start-time`)))
        && (new Date(formData.get(`event-end-time`)))
        && (new Date(formData.get(`event-start-time`)))
        && (formData.get(`event-price`)).match(/^\d+(\.\d+)?$/);
    };

    const offers = Array.from(document.querySelectorAll(`.event__offer-selector`));

    if (validateFields()) {
      const entry = {
        "id": this._id ? this._id : ``,
        "type": formData.get(`event-type`),
        "destination": {
          name: formData.get(`event-destination`),
          description: this._getCityDesc(formData.get(`event-destination`)),
          pictures: this._getCityPictures(formData.get(`event-destination`))
        },
        "date_from": new Date(formData.get(`event-start-time`)),
        "date_to": new Date(formData.get(`event-end-time`)),
        "base_price": +formData.get(`event-price`),
        "is_favorite": formData.get(`event-favorite`) ? true : false,
        "offers": offers
          .map((it) => ({
            id: it.querySelector(`.event__offer-checkbox`).id,
            title: it.querySelector(`.event__offer-title`).textContent,
            price: +it.querySelector(`.event__offer-price`).textContent,
            accepted: it.querySelector(`.event__offer-checkbox`).checked
          }))
      };

      this._blockForm(saveButton);

      if (this._isAdd) {
        this._onDataChange(`create`, entry, this._onError);
      } else {
        const changedPoint = new ModelPoint(entry);
        this._onDataChange(`update`, changedPoint, this._onError);
      }
      unrender(this._element);
      this._element = null;
    } else {
      document.querySelector(`.event--edit`).classList.add(`apply-shake`);
    }

  }

  addListeners() {
    const saveButton = document.querySelector(`.event__save-btn`);
    const cancelButton = document.querySelector(`.event__reset-btn`);
    const detailsBlock = document.querySelector(`.event__details`);
    const offersBlock = document.querySelector(`.event__section--offers`);
    const offersPlace = document.querySelector(`.event__available-offers`);
    const eventType = document.querySelector(`.event__type-group`);
    const eventTypeButton = document.querySelector(`.event__type-btn img`);
    const eventTypeOutput = document.querySelector(`.event__type-output`);

    const onOfferChoose = (evtOffers) => {
      const name = evtOffers.target.value;
      const offersAvailable = this._allOffers.find((item) => item.type === name).offers;

      eventTypeButton.src = `img/icons/${evtOffers.target.value}.png`;

      eventTypeOutput.textContent = transports.concat(activities).find((item) => item.type.toLowerCase() === evtOffers.target.value).label;

      if (offersBlock.classList.contains(`visually-hidden`)) {
        offersBlock.classList.remove(`visually-hidden`);
        if (detailsBlock.classList.contains(`visually-hidden`)) {
          detailsBlock.classList.remove(`visually-hidden`);
        }
      }

      if (name === `Check-in`) {
        offersPlace.innerHTML = ``;
      } else {
        offersPlace.innerHTML = offersAvailable.map(this._getOfferTemplate).join(`\n`);
      }
    };

    const city = document.querySelector(`.event__input--destination`);

    const onCitySelectChoose = (evtCity) => {
      const target = evtCity.target;

      const descriptionBlock = document.querySelector(`.event__section--destination`);

      if (descriptionBlock.classList.contains(`visually-hidden`)) {
        descriptionBlock.classList.remove(`visually-hidden`);
        if (detailsBlock.classList.contains(`visually-hidden`)) {
          detailsBlock.classList.remove(`visually-hidden`);
        }
      }
      const descriptionText = document.querySelector(`.event__destination-description`);
      if (target.value !== ``) {
        descriptionText.textContent = this._getCityDesc(target.value);
        const pictureBlock = document.querySelector(`.event__photos-tape`);

        pictureBlock.innerHTML = DOMPurify.sanitize(this._getCityPictures(target.value).map(this._getpicturesElement).join(`\n`));
      }

    };

    const onCancelClick = () => {
      if (this._isAdd) {
        unrender(document.querySelector(`.event--edit`));
        this._clearNewPointAddView();
        this._element = null;
      }
    };


    city.addEventListener(`change`, onCitySelectChoose);

    eventType.addEventListener(`change`, onOfferChoose);

    cancelButton.addEventListener(`click`, onCancelClick);
    saveButton.addEventListener(`click`, this.onSaveClick);
  }

  removeListeners() {

  }

  onCancelClick() {
    if (this._isAdd) {
      unrender(document.querySelector(`.event--edit`));
      this._clearNewPointAddView();
      this._element = null;
    }
  }

  _blockForm(button) {
    document.querySelectorAll(`input`).forEach((item) => {
      item.disabled = true;
    });
    button.disabled = true;
    button.textContent = `Saving...`;
  }

  _getCityDesc(destination) {
    const destinationFromList = this._allDestinations.find((item) => item.name === destination);
    let description = ``;
    if (destinationFromList !== undefined) {
      description = this._allDestinations.find((item) => item.name === destination).description;
    }
    return description;
  }

  _getCityPictures(destination) {
    const destinationFromList = this._allDestinations.find((item) => item.name === destination);
    let pictures = [];
    if (destinationFromList !== undefined) {
      pictures = this._allDestinations.find((item) => item.name === destination).pictures;
    }
    return pictures;
  }

  _getTransportTemplate({type}) {
    const transportLowCase = type.toLowerCase();
    return `
    <div class="event__type-item">
      <input
        id="event-type-${transportLowCase}-1"
        class="event__type-input
        visually-hidden"
        type="radio"
        name="event-type"
        value="${transportLowCase}"
        ${this._type.type.toLowerCase() === transportLowCase ? `checked` : ``}
      >
      <label
        class="event__type-label
        event__type-label--${transportLowCase}"
        for="event-type-${transportLowCase}-1">
          ${type}
      </label>
    </div>`;
  }

  _getActivityTemplate({type}) {
    const activityLowCase = type.toLowerCase();
    return `
    <div class="event__type-item">
      <input
        id="event-type-${activityLowCase}-1"
        class="event__type-input
        visually-hidden"
        type="radio"
        name="event-type"
        value="${activityLowCase}"
        ${this._type.type === activityLowCase ? `checked` : ``}
      >
      <label
        class="event__type-label
        event__type-label--${activityLowCase}"
        for="event-type-${activityLowCase}-1">
          ${type}
      </label>
    </div>`;
  }

  _getCityListTemplate({name}) {
    return `<option value="${name}" name="city"></option>`;
  }

  _getOptionBlock() {
    return `
  <input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${this._isFavorite ? `checked` : ``}>
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

  _getOfferTemplate({title, price, accepted}) {
    return `
  <div class="event__offer-selector">
  <input class="event__offer-checkbox  visually-hidden" id="${title}-1" type="checkbox" name="event-offer" value="${title}" ${accepted === true ? `checked` : ``}>
  <label class="event__offer-label" for="${title}-1">
    <span class="event__offer-title">${title}</span>
    &plus;
    &euro;&nbsp;<span class="event__offer-price">${price}</span>
  </label>
  </div>`;
  }

  _getEventDetailsTemplate() {
    return `
  <section class="event__details ${!this._pointText ? `visually-hidden` : ``}" >

    <section class="event__section  event__section--offers ${!this._pointText ? `visually-hidden` : ``}" >
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>

      <div class="event__available-offers">
       ${this._offers.map(this._getOfferTemplate).join(`\n`)}
      </div>
    </section>

    <section class="event__section  event__section--destination ${!this._pointText ? `visually-hidden` : ``}">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${this._pointText}</p>

      <div class="event__photos-container">
        <div class="event__photos-tape">
          ${this._pictures ? this._pictures.map(this._getpicturesElement).join(`\n`) : ``}
        </div>
      </div>
    </section>
  </section>
  `;
  }

  _getpicturesElement({src, description}) {
    return `<img class="event__photo" src="${src}" alt="${description}">`;
  }
}

export default AddEdit;
