import {setPrice} from "../utils/price";

class Price {
  constructor() {
  }

  getTemplate() {
    return `
    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${setPrice}</span>
    </p>`;
  }
}

export {Price};
