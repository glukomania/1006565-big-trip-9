import {sortTypes} from "../data";
import AbstractComponent from "./abstract-component";
import {createElement} from "../utils/dom";

class Sort extends AbstractComponent {
  constructor(onChangeSort) {
    super();
    this._onChangeSort = onChangeSort;
    this._onSortClick = this._onSortClick.bind(this);
    this._displayDay = true;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
      const sortContainer = this._element.querySelector(`.trip-sort`);
      sortContainer.addEventListener(`click`, this._onSortClick);
    }

    return this._element;
  }

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
    <label class="trip-sort__btn" for="sort-${type}" data-sort="${type}">
      ${type.toUpperCase()}
      ${path}
    </label>
  </div>`;
  }

  _onSortClick(evt) {
    const target = evt.target;
    const dayTitle = this._element.querySelector(`.trip-sort__item--day`);
    if (!target.dataset.sort) {
      return;
    }
    dayTitle.style.visibility = target.dataset.sort === `event` ? `visible` : `hidden`;
    this._onChangeSort(target.dataset.sort);
  }
}


export default Sort;
