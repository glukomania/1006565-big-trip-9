import {getMarkup} from "../render";
import {
  date,
  eventData
} from "../data";
import {
  getDate,
  getDuration,
  getTime
} from "../getDateFormat.js";


const getEventTemplate = ({
  type,
  eventText,
  timeStart,
  timeEnd,
  price,
  offers = [],
  offerprice
}) => `
<li class="trip-events__item">
  <div class="event">
    <div class="event__type">
      <img
        class="event__type-icon"
        width="42" height="42"
        src="img/icons/${type}.png"
        alt="Event type icon">
    </div>
    <h3 class="event__title">
      ${eventText}
    </h3>

    <div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time" datetime="${timeStart}">${getDate(timeStart)}</time>
        &mdash;
        <time class="event__end-time" datetime="${timeEnd}">${getDate(timeEnd)}</time>
      </p>
      <p class="event__duration">${getDuration(timeStart, timeEnd)}</p>
    </div>

    <p class="event__price">
      &euro;&nbsp;<span class="event__price-value">${price}</span>
    </p>

    <h4 class="visually-hidden">Offers:</h4>
    <ul class="event__selected-offers">
      <li class="event__offer">
        <span class="event__offer-title">${offers}</span>
        &plus;
        &euro;&nbsp;<span class="event__offer-price">${offerprice}</span>
        </li>
    </ul>

    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </div>
</li>
`;

const getEventsBlock = (number) => {
  const dayEvent = eventData[number];
  return getMarkup(dayEvent, getEventTemplate);
};

const dayTemplate = ({number, dayDate} = {}) => `
<li class="trip-days__item  day">
  <div class="day__info">
    <span class="day__counter">${number}</span>
    <time class="day__date" datetime="${getTime(dayDate)}">${getDate(dayDate)}</time>
  </div>

  <ul class="trip-events__list">

    ${getEventsBlock(number)}
  </ul>
</li>
`;

const dateBlock = getMarkup(date, dayTemplate);

const getCardsMarkup = () => `
<ul class="trip-days">
  ${dateBlock}
</ul>
`;


export {getCardsMarkup};
