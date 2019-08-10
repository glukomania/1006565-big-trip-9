import {getMarkup} from "../render";
import {filtersData} from "../data";

const filterBlock = (filter) => `
<div class="trip-filters__filter">
  <input id="filter-${filter.toLowerCase()}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything" checked>
  <label class="trip-filters__filter-label" for="filter-everything">
    ${filter}
  </label>
</div>
`;

const renderSection = getMarkup(filtersData, filterBlock);

const filtersTemplate = () => `
<form class="trip-filters" action="#" method="get">
  ${renderSection}

  <button class="visually-hidden" type="submit">
    Accept filter
  </button>
</form>
`;

export {filtersTemplate};
