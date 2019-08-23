import {sortTypes} from "../data";

class Sort {
  getTemplate() {
    return `
    <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      <span class="trip-sort__item  trip-sort__item--day">
        Day
      </span>
      ${sortTypes.map(this._getSortTemplate).join(`\n`)}
      <span class="trip-sort__item  trip-sort__item--offers">
        Offers
      </span>
    </form>
    `;
  }

  _getSortTemplate({type, path = ``}) {
    return `
  <div class="trip-sort__item  trip-sort__item--${type}">
    <input id="sort-${type}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${type}">
    <label class="trip-sort__btn" for="sort-${type}">
      ${type.toUpperCase()}
      ${path}
    </label>
  </div>`;
  }

}


export default Sort;
