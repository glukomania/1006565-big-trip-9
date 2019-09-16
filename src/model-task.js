
const types = [
  {type: `taxi`, label: `Taxi to airport`},
  {type: `bus`, label: `Going by bus to`},
  {type: `train`, label: `Going by train to`},
  {type: `ship`, label: `Ship to`},
  {type: `transport`, label: `Time in transport of`},
  {type: `drive`, label: `Drive to`},
  {type: `flight`, label: `Flight to`},
  {type: `check-in`, label: `Check in the hotel of`},
  {type: `sightseeing`, label: `Sightseeing in`},
  {type: `restaurant`, label: `Restaurant in`},
];

export class ModelPoint {
  constructor(data) {
    this.id = data[`id`];
    this.type = {};
    this.type.type = data[`type`];
    this.type.label = types.find((item) => item.type === data[`type`]).label;
    this.city = data[`destination`].name;
    this.pointText = data[`destination`].description;
    this.timeStart = new Date(data[`date_from`]);
    this.timeEnd = new Date(data[`date_to`]);
    this.price = data[`base_price`];
    this.offers = data[`offers`];
    this.isFavorite = data[`is_favorite`];
  }

  static parsePoint(data) {
    return new ModelPoint(data);
  }

  static parsePoints(data) {
    return data.map(ModelPoint.parsePoint);
  }
}

