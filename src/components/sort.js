import {getMarkup} from "../render";
import {sortData} from "../data";

const sortSection = ({type, path = ``} = {}) => `
<div class="trip-sort__item  trip-sort__item--${type}">
  <input id="sort-${type}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${type}">
  <label class="trip-sort__btn" for="sort-${type}">
    ${type.toUpperCase()}
    ${path}
  </label>
</div>
`;

const sortMarkup = getMarkup(sortData, sortSection);

const sortTemplate = () => `
<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
  <span class="trip-sort__item  trip-sort__item--day">
    Day
  </span>

  ${sortMarkup}

  <span class="trip-sort__item  trip-sort__item--offers">
    Offers
  </span>
</form>
`;

export {sortTemplate};
