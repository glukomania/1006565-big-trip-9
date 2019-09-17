import AddEdit from "./add-edit";
import Point from "./point";
import {isEscapeKey} from "../utils/predicators";
import {appendSection, unrender} from "../utils/dom";
import {transports, activities, cities} from "../data";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import "flatpickr/dist/themes/light.css";

class PointController {
  constructor(container, point, onDataChange, onChangeView) {
    this._container = container.querySelector(`.trip-events__list`);
    this._point = point;
    this._onDataChange = onDataChange;
    this._onChangeView = onChangeView;
    this._pointItem = new Point(this._point);
    this._pointAddEdit = new AddEdit(this._point);
    this._changeCityDescription = this._changeCityDescription.bind(this);
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

    const onEscKeyDown = (evt) => {
      if (isEscapeKey(evt)) {
        this._container.replaceChild(this._pointItem.getElement(), this._pointAddEdit.getElement());
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    const offers = Array.from(this._pointAddEdit.getElement().querySelectorAll(`.event__offer-selector`));

    this._pointAddEdit.getElement()
      .querySelector(`.event__save-btn`)
      .addEventListener(`click`, (evt) => {
        evt.preventDefault();
        const formData = new FormData(this._pointAddEdit.getElement().querySelector(`.trip-events__item`));
        console.log(formData.get(`event-type`));
        const entry = {
          number: this._point.number,
          type: {type: formData.get(`event-type`), label: transports.concat(activities).find((x) => x.type.toLowerCase() === formData.get(`event-type`)).label},
          city: formData.get(`event-destination`),
          pointText: this._getCityDesc(formData.get(`event-destination`)),
          timeStart: new Date(formData.get(`event-start-time`)),
          timeEnd: new Date(formData.get(`event-end-time`)),
          price: +formData.get(`event-price`),
          isFavorite: formData.get(`event-favorite`),
          offers: offers
          .map((it) => ({
            id: it.querySelector(`.event__offer-checkbox`).id,
            title: it.querySelector(`.event__offer-title`).textContent,
            price: +it.querySelector(`.event__offer-price`).textContent,
            accepted: it.querySelector(`.event__offer-checkbox`).checked
          }))
        };

        this._onDataChange(this._point, entry);
        unrender(this._element);
        this._element = null;

        document.addEventListener(`keydown`, onEscKeyDown);


      });

    this._pointItem.getElement()
      .querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, () => {
        this._onChangeView();
        this._container.replaceChild(this._pointAddEdit.getElement(), this._pointItem.getElement());
        document.addEventListener(`keydown`, onEscKeyDown);
      });

    this._pointAddEdit.getElement()
      .querySelector(`.event__save-btn`)
      .addEventListener(`click`, () => {
        document.addEventListener(`keydown`, onEscKeyDown);
      });

    this._pointAddEdit.getElement()
      .querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, () => {
        this._container.replaceChild(this._pointItem.getElement(), this._pointAddEdit.getElement());
        document.removeEventListener(`keydown`, onEscKeyDown);
      });

    this._pointAddEdit.getElement()
      .querySelector(`.event__reset-btn`)
      .addEventListener(`click`, () => {
        this._onDataChange(this._point, null);
      });

    const city = this._pointAddEdit.getElement().querySelector(`.event__input--destination`);

    city.addEventListener(`change`, this._changeCityDescription);

    appendSection(this._container, this._pointItem.getElement());
  }

  setDefaultView() {
    if (this._container.contains(this._pointAddEdit.getElement())) {
      this._container.replaceChild(this._pointItem.getElement(), this._pointAddEdit.getElement());
    }
  }


  _changeCityDescription(evtCity) {
    const target = evtCity.target;
    const description = this._pointAddEdit.getElement().querySelector(`.event__destination-description`);
    description.textContent = this._getCityDesc(target.value);
  }

  _getCityDesc(destination) {
    return cities.find((item) => item.name === destination).description;
  }

}
export default PointController;
