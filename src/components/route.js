import {formatDate} from "../date.js";

const getRouteMarkup = ({cityStart, cityFinish, dateStart} = {}) => `
<div class="trip-info__main">
  <h1 class="trip-info__title">
    ${cityStart} &mdash; ... &mdash; ${cityFinish}
  </h1>

  <p class="trip-info__dates">
    ${formatDate(dateStart)}
  </p>
</div>
`;

export {getRouteMarkup};
