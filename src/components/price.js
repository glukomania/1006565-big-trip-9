import {getPrice} from "../utils/price";
import AbstractComponent from "./abstract-component";

class Price extends AbstractComponent {

  getTemplate(points) {
    return `
    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${points ? getPrice(points) : 0}</span>
    </p>`;
  }
}

export default Price;
