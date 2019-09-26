import AddEdit from "./add-edit";
import Point from "./point";
import {isEscapeKey} from "../utils/predicators";
import {appendSection} from "../utils/dom";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import "flatpickr/dist/themes/light.css";

class PointController {
  constructor(container, point, onDataChange, onChangeView, allDestinations, allOffers, getNewPointAddView) {
    this._container = container.querySelector(`.trip-events__list`);
    this._point = point;
    this._onDataChange = onDataChange;
    this._onChangeView = onChangeView;
    this._allDestinations = allDestinations;
    this._allOffers = allOffers;
    this._pointItem = new Point(this._point);
    this._getNewPointAddView = getNewPointAddView;
    this._pointAddEdit = new AddEdit(this._point, false, this._onDataChange, this._allDestinations, this._allOffers);
    this.onEscKeyDown = this.onEscKeyDown.bind(this);
    this._oneError = this._oneError.bind(this);
  }

  init() {
    flatpickr(this._pointAddEdit.getElement().querySelector(`#event-start-time-1`), {
      altInput: true,
      allowInput: true,
      enableTime: true,
      format: `d.m.Y h:m`,
      altFormat: `d.m.Y  h:m`,
      defaultDate: this._point.timeStart,
    });

    flatpickr(this._pointAddEdit.getElement().querySelector(`#event-end-time-1`), {
      altInput: true,
      allowInput: true,
      enableTime: true,
      format: `d.m.Y h:m`,
      altFormat: `d.m.Y  h:m`,
      defaultDate: this._point.timeEnd,
    });

    this._pointItem.getElement()
      .querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, () => {
        const newPointAddView = this._getNewPointAddView();
        if (newPointAddView) {
          newPointAddView.onCancelClick();
        }
        this._onChangeView();
        this._container.replaceChild(this._pointAddEdit.getElement(), this._pointItem.getElement());
        this._pointAddEdit.addListeners();
        document.addEventListener(`keydown`, this.onEscKeyDown);
      });

    this._pointAddEdit.getElement()
      .querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, () => {
        this._container.replaceChild(this._pointItem.getElement(), this._pointAddEdit.getElement());
        document.removeEventListener(`keydown`, this.onEscKeyDown);
      });


    const deleteButton = this._pointAddEdit.getElement().querySelector(`.event__reset-btn`);

    deleteButton.addEventListener(`click`, () => {
      this._pointAddEdit.getElement().querySelectorAll(`input`).forEach((item) => {
        item.disabled = true;
      });
      deleteButton.disabled = true;
      deleteButton.textContent = `Deleting...`;

      this._onDataChange(`delete`, this._point, this._oneError);
    });

    appendSection(this._container, this._pointItem.getElement());

  }

  _oneError() {
    this._shake();
    document.querySelectorAll(`input`).forEach((item) => {
      item.disabled = false;
    });

  }

  _shake() {
    document.querySelector(`.event--edit`).classList.add(`apply-shake`);
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
