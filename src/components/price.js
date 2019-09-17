import {getPrice} from "../utils/price";
import AbstractComponent from "./abstract-component";

class Price extends AbstractComponent {

  getTemplate(points) {
    const totalPrice = getPrice(points, `price`, `offers`);

    return `
    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalPrice}</span>
    </p>`;
  }
}

export default Price;
