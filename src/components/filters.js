import {getMarkup} from "../utils/dom";
import {filtersData} from "../data";

const getFilterTemplate = (filter) => `
<div class="trip-filters__filter">
  <input id="filter-${filter.toLowerCase()}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything" checked>
  <label class="trip-filters__filter-label" for="filter-everything">
    ${filter}
  </label>
</div>
`;

const renderBlock = getMarkup(filtersData, getFilterTemplate);

const getFiltersMarkup = () => `
<form class="trip-filters" action="#" method="get">
  ${renderBlock}

  <button class="visually-hidden" type="submit">
    Accept filter
  </button>
</form>
`;

export {getFiltersMarkup};
