import {getMarkup} from "../render";
import {date, eventData} from "../data";

const eventSection = ({type, eventText, timeStart, timeStartFormat, timeEnd, timeEndFormat, duration, price, offers = [], offerprice}) => `
<li class="trip-events__item">
  <div class="event">
    <div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
    </div>
    <h3 class="event__title">${eventText}</h3>

    <div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time" datetime="${timeStart}">${timeStartFormat}</time>
        &mdash;
        <time class="event__end-time" datetime="${timeEnd}">${timeEndFormat}</time>
      </p>
      <p class="event__duration">${duration}</p>
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

const eventsMarkup = (number) => {
  const dayEvent = eventData[number];
  return getMarkup(dayEvent, eventSection);
};

const daySection = ({number, datetime, dates} = {}) => `
<li class="trip-days__item  day">
  <div class="day__info">
    <span class="day__counter">${number}</span>
    <time class="day__date" datetime="${datetime}">${dates}</time>
  </div>

  <ul class="trip-events__list">

    ${eventsMarkup(number)}
  </ul>
</li>
`;

const dateMarkup = getMarkup(date, daySection);

const cardsTemplate = () => `
<ul class="trip-days">
  ${dateMarkup}
</ul>
`;


export {cardsTemplate};
