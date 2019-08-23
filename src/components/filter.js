import {filterTypes} from "../data";

class Filter {

  getTemplate() {
    return `
    <form class="trip-filters" action="#" method="get">
      ${filterTypes.map(this._getFilterTemplate).join(`\n`)}

      <button class="visually-hidden" type="submit">
        Accept filter
      </button>
    </form>
    `;
  }

  _getFilterTemplate(filter) {
    return `
  <div class="trip-filters__filter">
    <input id="filter-${filter.toLowerCase()}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything" checked>
    <label class="trip-filters__filter-label" for="filter-everything">
      ${filter}
    </label>
  </div>
  `;
  }
}

export default Filter;
