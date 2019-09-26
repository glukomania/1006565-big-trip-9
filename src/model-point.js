
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
    this.pictures = data[`destination`].pictures;
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

  toRAW() {
    return {
      'id': this.id,
      'type': this.type.type,
      'destination': {name: this.city, description: this.pointText, pictures: this.pictures},
      'date_from': this.timeStart,
      'date_to': this.timeEnd,
      'base_price': this.price,
      'offers': this.offers,
      'is_favorite': this.isFavorite,
    };
  }

}

