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
    this._cities = this._points ? this._groupByCity(this._points) : [];
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

  getRoute(cities) {
    if (!cities) {
      return ``;
    } else if (cities.length === 1) {
      return cities[0];
    } else if (cities.length === 2) {
      return cities[0] + ` &mdash; ` + cities[1];
    } else if (cities.length === 3) {
      return cities[0] + ` &mdash; ` + cities[1] + ` &mdash; ` + cities[2];
    }
    return cities[0] + ` &mdash; ... &mdash; ` + cities[cities.length - 1];

  }

  getTemplate() {
    return `
  <div class="trip-info__main">
    <h1 class="trip-info__title">
      ${this.getRoute(this._citiesNames)}
    </h1>

    <p class="trip-info__dates">
      ${this._points ? formatDate(this._points[0].timeStart, this._points[this._points.length - 1].timeEnd) : ``}
    </p>
  </div>
    `;
  }
}


export default Route;
