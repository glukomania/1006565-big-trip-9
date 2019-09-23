import {formatDate} from "./route-date";
import AbstractComponent from "./abstract-component";
import {
  groupByKey
} from "../utils/util";

class Route extends AbstractComponent {
  constructor(points) {
    super();
    this._points = points;
    this._groupByCity = groupByKey(`city`);
    this._cities = this._groupByCity(this._points);
    this._citiesNames = Object.keys(this._cities);
  }

  getElement() {
    if (this._element === null) {
      this._element = document.createElement(`section`);
      this._element.classList.add(`board`);
      this._element.classList.add(`container`);
      this._element.innerHTML = this.getTemplate();
    }
    return this._element;
  }

  getTemplate() {
    return `
  <div class="trip-info__main">
    <h1 class="trip-info__title">
      ${this._citiesNames[0]} ${this._citiesNames.length <= 3 ? this._citiesNames[1] : `&mdash; ...`} ${`&mdash;` + this._citiesNames[this._citiesNames.length - 1]}
    </h1>

    <p class="trip-info__dates">
      ${formatDate(this._points[0].timeStart, this._points[this._points.length - 1].timeEnd)}
    </p>
  </div>
    `;
  }
}


export default Route;
