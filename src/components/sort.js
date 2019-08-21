import {sortTypes} from "../data";

class Sort {
  constructor() {
  }

  getTemplate() {
    const getSortTemplate = ({type, path = ``} = {}) => `
    <div class="trip-sort__item  trip-sort__item--${type}">
      <input id="sort-${type}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${type}">
      <label class="trip-sort__btn" for="sort-${type}">
        ${type.toUpperCase()}
        ${path}
      </label>
    </div>`;

    return `
    <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      <span class="trip-sort__item  trip-sort__item--day">
        Day
      </span>
      ${sortTypes.map(getSortTemplate).join(`\n`)}
      <span class="trip-sort__item  trip-sort__item--offers">
        Offers
      </span>
    </form>
    `;
  }

}


export {Sort};
