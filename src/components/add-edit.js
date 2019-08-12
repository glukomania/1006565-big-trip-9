import {getMarkup} from "../render";
import {transports, activities, cities} from "../data";

const transportTemplate = (transport) => {
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

const activityTemplate = (activity) => {
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

const cityListTemplate = (city) => {
  return `<option value="${city}"></option>`;
};

const transportBlock = getMarkup(transports, transportTemplate);
const activityBlock = getMarkup(activities, activityTemplate);
const citiesBlock = getMarkup(cities, cityListTemplate);


const addEditMarkup = ({eventName = ``, dateFrom = ``, dateTo = ``, currency = ``} = {}) => `
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
          src="img/icons/flight.png"
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
          ${eventName}
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
        value="${dateFrom}"
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
        value="${dateTo}"
      >
    </div>

    <div class="event__field-group  event__field-group--price">
      <label class="event__label" for="event-price-1">
        <span class="visually-hidden">Price</span>
        ${currency}
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

export {addEditMarkup};
