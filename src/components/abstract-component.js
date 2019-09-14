import {createElement} from "../utils/dom";

class AbstractComponent {
  constructor(selector, classes) {
    this._selector = selector;
    this._classes = classes;
    this._element = null;
    if (new.target === AbstractComponent) {
      throw new Error(`Can't instantiate AbstractComponent, only concrete one.`);
    }
  }

  getElement() {
    if (this._element === null) {
      this._element = createElement(this.getTemplate(), this._selector, this._classes);
    }
    return this._element;
  }

  getTemplate() {
    throw new Error(`Abstract method not implemented: getTemplate`);
  }

  removeElement() {
    this._element = null;
  }
}

export default AbstractComponent;
