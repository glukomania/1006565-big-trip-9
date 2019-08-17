import {getMarkup} from "../utils";
import {transports, activities, cities} from "../data";
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

const transportBlock = getMarkup(transports, getTransportTemplate);
const activityBlock = getMarkup(activities, getActivityTemplate);
const citiesBlock = getMarkup(cities, getCityListTemplate);


const getAddEditMarkup = ({
  type,
  city,
  activity,
  eventText,
  timeStart,
  timeEnd,
  price,
  offers
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
        value=""
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
        ${price} &euro;&nbsp;
      </label>
      <input
        class="event__input
        event__input--price"
        id="event-price-1"
        type="text"
        name="event-price"
        value=""
      >
    </div>

    <button class="event__save-btn  btn  btn--blue" type="submit">
      Save
    </button>
    <button class="event__reset-btn" type="reset">
      Cancel
    </button>
  </header>
</form>
`;

export {getAddEditMarkup};
