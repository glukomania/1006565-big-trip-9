const year = new Intl.DateTimeFormat(`en-GB`, {
  year: `numeric`
});

const month = new Intl.DateTimeFormat(`en-GB`, {
  month: `short`,
});

const day = new Intl.DateTimeFormat(`en-GB`, {
  day: `2-digit`,
});

const dateFormat = (dateStart, dateEnd) => {
  let tripDate;

  if (dateStart.getMonth() !== dateEnd.getMonth()) {
    tripDate = `${month.format(dateStart).toUpperCase()} ${day.format(dateStart).toUpperCase()} - ${month.format(dateEnd).toUpperCase()} ${day.format(dateEnd).toUpperCase()}`;

    if (dateStart.getYear() !== dateEnd.getYear()) {
      tripDate = `${year.format(dateStart).toUpperCase()} ${month.format(dateStart).toUpperCase()} ${day.format(dateStart).toUpperCase()} -  ${year.format(dateEnd).toUpperCase()} ${month.format(dateEnd).toUpperCase()} ${day.format(dateEnd).toUpperCase()}`;
    }
  } else {
    tripDate = `${month.format(dateStart).toUpperCase()} ${day.format(dateStart).toUpperCase()} -  ${day.format(dateEnd).toUpperCase()}`;
    if (dateStart.getDate() === dateEnd.getDate()) {
      tripDate = `${month.format(dateStart).toUpperCase()} ${day.format(dateStart).toUpperCase()}`;
    }
  }

  return tripDate;
};

export {
  dateFormat,
};

