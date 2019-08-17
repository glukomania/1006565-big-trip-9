import {getMarkup} from "../utils";
import {transports, activities, cities, offersList} from "../data";
import {formatDate} from "../getDateFormat.js";

const getTransportTemplate = (transport) => {
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
};

const getActivityTemplate = (activity) => {
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
};

const getCityListTemplate = (city) => {
  return `<option value="${city}"></option>`;
};

const optionBlock = () => `
<input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" checked>
<label class="event__favorite-btn" for="event-favorite-1">
  <span class="visually-hidden">Add to favorite</span>
  <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
    <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
  </svg>
</label>

<button class="event__rollup-btn" type="button">
  <span class="visually-hidden">Open event</span>
</button>
`;
const offerTemplate = ({id, text, price}) => `
<div class="event__offer-selector">
<input class="event__offer-checkbox  visually-hidden" id="event-offer-${id}-1" type="checkbox" name="event-offer-${id}" checked>
<label class="event__offer-label" for="event-offer-${id}-1">
  <span class="event__offer-title">${text}</span>
  &plus;
  &euro;&nbsp;<span class="event__offer-price">${price}</span>
</label>
</div>`;

const getOfferMarkup = getMarkup(offersList, offerTemplate);

const getEventDetailsTemplate = (eventText) => `
<section class="event__details">

  <section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>

    <div class="event__available-offers">
     ${getOfferMarkup}

    </div>
  </section>

  <section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    <p class="event__destination-description">${eventText}</p>

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

const transportBlock = getMarkup(transports, getTransportTemplate);
const activityBlock = getMarkup(activities, getActivityTemplate);
const citiesBlock = getMarkup(cities, getCityListTemplate);


const getAddEditMarkup = ({
  isAdd = false,
  type,
  city,
  eventText,
  timeStart,
  timeEnd,
  price
}) => `
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
          src="img/icons/${type}.png"
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

          ${transportBlock}

        </fieldset>

        <fieldset class="event__type-group">
          <legend class="visually-hidden">
            Activity
          </legend>

          ${activityBlock}

        </fieldset>
      </div>
    </div>

    <div class="event__field-group  event__field-group--destination">
      <label
        class="event__label
        event__type-output"
        for="event-destination-1">
          ${eventText}
      </label>
      <input
        class="event__input
        event__input--destination"
        id="event-destination-1"
        type="text"
        name="event-destination"
        value="${city}"
        list="destination-list-1"
      >
      <datalist id="destination-list-1">
        ${citiesBlock}
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
        value="${formatDate(timeStart)}"
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
        value="${formatDate(timeEnd)}"
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
        value="${price}"
      >
    </div>

    <button class="event__save-btn  btn  btn--blue" type="submit">
      Save
    </button>
    <button class="event__reset-btn" type="reset">
      ${isAdd ? `Cancel` : `Delete`}
    </button>
    ${isAdd ? `` : optionBlock()}
  </header>
  ${isAdd ? `` : getEventDetailsTemplate(eventText)}
</form>


`;

export {getAddEditMarkup};
