import {setPrice} from "../utils/price";
const getPriceMarkup = () => `
<p class="trip-info__cost">
  Total: &euro;&nbsp;<span class="trip-info__cost-value">${setPrice}</span>
</p>
`;

export {getPriceMarkup};
