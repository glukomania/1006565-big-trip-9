const routeTemplate = ({cityStart, cityFinish, date} = {}) => `
<div class="trip-info__main">
  <h1 class="trip-info__title">
    ${cityStart} &mdash; ... &mdash; ${cityFinish}
  </h1>

  <p class="trip-info__dates">
    ${date}
  </p>
</div>
`;

export {routeTemplate};
