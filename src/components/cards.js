import {getMarkup} from "../render";
import {dateData, eventDatas} from "../data";

const date = [
  {number: `1`, datetime: `2019-03-18`, dates: `MAR 18`},
  {number: `2`, datetime: `2019-03-19`, dates: `MAR 19`},
  {number: `3`, datetime: `2019-03-18`, dates: `MAR 20`},
];

const eventData = {
  '1': [
    {type: `taxi`, eventText: `Taxi to airport`, timeStart: `2019-03-18T10:30`, timeStartFormat: `10:30`, timeEnd: `2019-03-18T11:00`, timeEndFormat: `11:00`, duration: `1H 30M`, price: `20`, offers: [`Order Uber`], offerprice: `20`},
    {type: `flight`, eventText: `Flight to Geneva`, timeStart: `2019-03-18T12:25`, timeStartFormat: `12:25`, timeEnd: `2019-03-18T13:35`, timeEndFormat: `13:35`, duration: `1H 30M`, price: `160`, offers: [`Add luggage`, `Switch to comfort`], offerprice: [`50`, `80`]},
    {type: `drive`, eventText: `Drive to Chamonix`, timeStart: `2019-03-18T14:30`, timeStartFormat: `14:30`, timeEnd: `2019-03-18T11:00`, timeEndFormat: `16:05`, duration: `1H 10M`, price: `160`, offers: [`Rent a car`], offerprice: `200`},
    {type: `drive`, eventText: `Check into hotel`, timeStart: `2019-03-18T12:25`, timeStartFormat: `12:25`, timeEnd: `2019-03-18T13:35`, timeEndFormat: `13:35`, duration: `1H 30M`, price: `600`, offers: [`Add breakfast`], offerprice: `50`},
  ],
  '2': [
    {type: `drive`, eventText: `Drive to Geneva`, timeStart: `2019-03-19T10:00`, timeStartFormat: `10:00`, timeEnd: `2019-03-19T11:00`, timeEndFormat: `11:00`, duration: `1H`, price: `20`, offers: [], offerprice: ``},
    {type: `sightseeing`, eventText: `Natural History Museum`, timeStart: `2019-03-19T11:20`, timeStartFormat: `11:20`, timeEnd: `2019-03-19T13:00`, timeEndFormat: `13:00`, duration: `1H 20M`, price: `50`, offers: [`Book tickets`, `Lunch in city`], offerprice: [`40`, `30`]},
    {type: `drive`, eventText: `Drive to Chamonix`, timeStart: `2019-03-19T18:00"`, timeStartFormat: `18:00`, timeEnd: `2019-03-19T19:00`, timeEndFormat: `19:00`, duration: `1H`, price: `20`, offers: [], offerprice: []}
  ],
  '3': [
    {type: `drive`, eventText: `Drive to airport`, timeStart: `2019-03-20T08:25`, timeStartFormat: `08:25`, timeEnd: `2019-03-20T09:25`, timeEndFormat: `09:25`, duration: `1H`, price: `20`, offers: [], offerprice: []},
    {type: `flight`, eventText: `Flight to Amsterdam`, timeStart: `2019-03-20T11:15`, timeStartFormat: `11:15`, timeEnd: `2019-03-20T12:15`, timeEndFormat: `12:15`, duration: `1H`, price: `180`, offers: [`Add luggage`, `Switch to comfort`], offerprice: [`30`, `100`]},
  ]
};

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
