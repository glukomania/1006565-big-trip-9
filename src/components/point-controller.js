import AddEdit from "./add-edit";
import Point from "./point";
import {isEscapeKey} from "../utils/predicators";
import {appendSection} from "../utils/dom";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import "flatpickr/dist/themes/light.css";

class PointController {
  constructor(container, point, onDataChange, onChangeView, allDestinations, allOffers) {
    this._container = container.querySelector(`.trip-events__list`);
    this._point = point;
    this._onDataChange = onDataChange;
    this._onChangeView = onChangeView;
    this._allDestinations = allDestinations;
    this._allOffers = allOffers;
    this._pointItem = new Point(this._point);
    this._pointAddEdit = new AddEdit(this._point, false, this._onDataChange, this._allDestinations, this._allOffers);
    this.onEscKeyDown = this.onEscKeyDown.bind(this);
  }

  init() {
    flatpickr(this._pointAddEdit.getElement().querySelector(`#event-start-time-1`), {
      altInput: true,
      allowInput: true,
      defaultDate: this._point.timeStart,
    });

    flatpickr(this._pointAddEdit.getElement().querySelector(`#event-end-time-1`), {
      altInput: true,
      allowInput: true,
      defaultDate: this._point.timeEnd,
    });

    this._pointItem.getElement()
      .querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, () => {
        this._onChangeView();
        this._container.replaceChild(this._pointAddEdit.getElement(), this._pointItem.getElement());
        this._pointAddEdit.addListeners();
        document.addEventListener(`keydown`, this.onEscKeyDown);
      });

    this._pointAddEdit.getElement()
      .querySelector(`.event__save-btn`)
      .addEventListener(`click`, () => {
        document.addEventListener(`keydown`, this.onEscKeyDown);
      });

    this._pointAddEdit.getElement()
    .querySelector(`.event__rollup-btn`)
    .addEventListener(`click`, () => {
      this._container.replaceChild(this._pointItem.getElement(), this._pointAddEdit.getElement());
      document.removeEventListener(`keydown`, this.onEscKeyDown);
    });

    this._pointAddEdit.getElement()
    .querySelector(`.event__reset-btn`)
    .addEventListener(`click`, () => {
      this._onDataChange(`delete`, this._point);
    });

    appendSection(this._container, this._pointItem.getElement());
  }

  onEscKeyDown(evt) {
    if (isEscapeKey(evt)) {
      this.setDefaultView();
      document.removeEventListener(`keydown`, this.onEscKeyDown);
    }
  }

  setDefaultView() {
    if (this._container.contains(this._pointAddEdit.getElement())) {
      this._container.replaceChild(this._pointItem.getElement(), this._pointAddEdit.getElement());
    }
  }

}
export default PointController;
