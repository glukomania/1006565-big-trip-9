import {getDate} from "../getDateFormat.js";

const getRouteMarkup = ({cityStart, cityFinish, dateStart} = {}) => `
<div class="trip-info__main">
  <h1 class="trip-info__title">
    ${cityStart} &mdash; ... &mdash; ${cityFinish}
  </h1>

  <p class="trip-info__dates">
    ${getDate(dateStart)}
  </p>
</div>
`;

export {getRouteMarkup};