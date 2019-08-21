import {formatDate} from "../date.js";

class Route {
  constructor({cityStart, cityFinish, dateStart}, selector, _classNames) {
    this._cityStart = cityStart;
    this._cityFinish = cityFinish;
    this._dateStart = dateStart;
    this._element = null;
    this._selector = selector;
  }

  getTemplate() {
    return `
<div class="trip-info__main">
  <h1 class="trip-info__title">
    ${this._cityStart} &mdash; ... &mdash; ${this._cityFinish}
  </h1>

  <p class="trip-info__dates">
    ${formatDate(this._dateStart)}
  </p>
</div>
    `;
  }
}


export {Route};
