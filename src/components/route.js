import {formatDate} from "./route-date";

class Route {
  constructor({cityStart, cityFinish, dateStart, dateEnd}) {
    this._cityStart = cityStart;
    this._cityFinish = cityFinish;
    this._dateStart = dateStart;
    this._dateEnd = dateEnd;
    this._element = null;
  }

  getTemplate() {
    return `
<div class="trip-info__main">
  <h1 class="trip-info__title">
    ${this._cityStart} &mdash; ... &mdash; ${this._cityFinish}
  </h1>

  <p class="trip-info__dates">
    ${formatDate(this._dateStart, this._dateEnd)}
  </p>
</div>
    `;
  }
}


export default Route;
