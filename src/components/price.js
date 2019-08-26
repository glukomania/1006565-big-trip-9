import {setPrice} from "../utils/price";
import AbstractComponent from "./abstract-component";

class Price extends AbstractComponent {

  getTemplate() {
    return `
    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${setPrice}</span>
    </p>`;
  }
}

export default Price;
