const routeData = [
  {
    cityStart: `Amsterdam`,
    cityFinish: `Amsterdam`,
    date: `Mar 18 - 21`
  }
];

const filtersData = [`Everything`, `Future`, `Past`];

const sortData = [
  {
    type: `event`
  },
  {
    type: `time`,
    path: `<svg class="trip-sort__direction-icon" width="8" height="10" viewBox="0 0 8 10">
  <path d="M2.888 4.852V9.694H5.588V4.852L7.91 5.068L4.238 0.00999987L0.548 5.068L2.888 4.852Z"/>
  </svg>`
  },
  {
    type: `price`,
    path: `<svg class="trip-sort__direction-icon" width="8" height="10" viewBox="0 0 8 10">
    <path d="M2.888 4.852V9.694H5.588V4.852L7.91 5.068L4.238 0.00999987L0.548 5.068L2.888 4.852Z"/>
  </svg>`
  },
  {
    type: `offers`
  }];

const transports = [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`];
const activities = [`Check-in`, `Sightseeing`, `Restaurant`];
const cities = [`Amsterdam`, `Saint-Petersburg`, `Chamonix`, `Geneva`];

const editData = [
  {
    eventName: `Sightseeing at`,
    dateFrom: `18/03/19 00:00`,
    dateTo: `18/03/19 00:00`,
    currency: `&euro;`
  }
];

const date = [
  {number: `1`, datetime: `2019-03-18`, dates: `MAR 18`},
  {number: `2`, datetime: `2019-03-19`, dates: `MAR 19`},
  {number: `3`, datetime: `2019-03-18`, dates: `MAR 20`},
];

const eventData = {
  '1': [
    {type: `taxi`, eventText: `Taxi to airport`, timeStart: `2019-03-18T10:30`, timeStartFormat: `10:30`, timeEnd: `2019-03-18T11:00`, timeEndFormat: `11:00`, duration: `1H 30M`, price: `20`, offers: [`Order Uber`], offerprice: `20`},
    {type: `flight`, eventText: `Flight to Geneva`, timeStart: `2019-03-18T12:25`, timeStartFormat: `12:25`, timeEnd: `2019-03-18T13:35`, timeEndFormat: `13:35`, duration: `1H 30M`, price: `160`, offers: [`Add luggage`, `Switch to comfort`], offerprice: [`50`, `80`]},
    {type: `drive`, eventText: `Drive to Chamonix`, timeStart: `2019-03-18T14:30`, timeStartFormat: `14:30`, timeEnd: `2019-03-18T11:00`, timeEndFormat: `16:05`, duration: `1H 10M`, price: `160`, offers: [`Rent a car`], offerprice: `200`},
    {type: `drive`, eventText: `Check into hotel`, timeStart: `2019-03-18T12:25`, timeStartFormat: `12:25`, timeEnd: `2019-03-18T13:35`, timeEndFormat: `13:35`, duration: `1H 30M`, price: `600`, offers: [`Add breakfast`], offerprice: `50`},
  ],
  '2': [
    {type: `drive`, eventText: `Drive to Geneva`, timeStart: `2019-03-19T10:00`, timeStartFormat: `10:00`, timeEnd: `2019-03-19T11:00`, timeEndFormat: `11:00`, duration: `1H`, price: `20`, offers: [], offerprice: ``},
    {type: `sightseeing`, eventText: `Natural History Museum`, timeStart: `2019-03-19T11:20`, timeStartFormat: `11:20`, timeEnd: `2019-03-19T13:00`, timeEndFormat: `13:00`, duration: `1H 20M`, price: `50`, offers: [`Book tickets`, `Lunch in city`], offerprice: [`40`, `30`]},
    {type: `drive`, eventText: `Drive to Chamonix`, timeStart: `2019-03-19T18:00"`, timeStartFormat: `18:00`, timeEnd: `2019-03-19T19:00`, timeEndFormat: `19:00`, duration: `1H`, price: `20`, offers: [], offerprice: []}
  ],
  '3': [
    {type: `drive`, eventText: `Drive to airport`, timeStart: `2019-03-20T08:25`, timeStartFormat: `08:25`, timeEnd: `2019-03-20T09:25`, timeEndFormat: `09:25`, duration: `1H`, price: `20`, offers: [], offerprice: []},
    {type: `flight`, eventText: `Flight to Amsterdam`, timeStart: `2019-03-20T11:15`, timeStartFormat: `11:15`, timeEnd: `2019-03-20T12:15`, timeEndFormat: `12:15`, duration: `1H`, price: `180`, offers: [`Add luggage`, `Switch to comfort`], offerprice: [`30`, `100`]},
  ]
};

export {
  routeData,
  filtersData,
  sortData,
  transports,
  activities,
  editData,
  cities,
  date,
  eventData
};
