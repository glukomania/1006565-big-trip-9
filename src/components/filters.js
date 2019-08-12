import {getMarkup} from "../render";
import {filtersData} from "../data";

const filterTemplate = (filter) => `
<div class="trip-filters__filter">
  <input id="filter-${filter.toLowerCase()}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything" checked>
  <label class="trip-filters__filter-label" for="filter-everything">
    ${filter}
  </label>
</div>
`;

const renderBlock = getMarkup(filtersData, filterTemplate);

const filtersMarkup = () => `
<form class="trip-filters" action="#" method="get">
  ${renderBlock}

  <button class="visually-hidden" type="submit">
    Accept filter
  </button>
</form>
`;

export {filtersMarkup};
