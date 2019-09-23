import AbstractComponent from "./abstract-component.js";

class RouteStubMessage extends AbstractComponent {

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
  <p class="trip-events__msg">
    Loading...
  </p>`;
  }
}

export default RouteStubMessage;
