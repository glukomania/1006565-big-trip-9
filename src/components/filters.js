import {filterTypes} from "../data";

class Filter {

  getTemplate() {
    const getFilterTemplate = (filter) => `
    <div class="trip-filters__filter">
      <input id="filter-${filter.toLowerCase()}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything" checked>
      <label class="trip-filters__filter-label" for="filter-everything">
        ${filter}
      </label>
    </div>
    `;

    return `
    <form class="trip-filters" action="#" method="get">
      ${filterTypes.map(getFilterTemplate).join(`\n`)}

      <button class="visually-hidden" type="submit">
        Accept filter
      </button>
    </form>
    `;
  }
}

export default Filter;
