const getDateY = new Intl.DateTimeFormat(`en-GB`, {
  year: `numeric`
});

const getDateM = new Intl.DateTimeFormat(`en-GB`, {
  month: `short`,
});

const getDateD = new Intl.DateTimeFormat(`en-GB`, {
  day: `2-digit`,
});

const formatDate = (dateStart, dateEnd) => {
  let tripDate;

  if (dateStart.getMonth() !== dateEnd.getMonth()) {
    tripDate = `${getDateM.format(dateStart).toUpperCase()} ${getDateD.format(dateStart).toUpperCase()} - ${getDateM.format(dateEnd).toUpperCase()} ${getDateD.format(dateEnd).toUpperCase()}`;

    if (dateStart.getYear() !== dateEnd.getYear()) {
      tripDate = `${getDateY.format(dateStart).toUpperCase()} ${getDateM.format(dateStart).toUpperCase()} ${getDateD.format(dateStart).toUpperCase()} -  ${getDateY.format(dateEnd).toUpperCase()} ${getDateM.format(dateEnd).toUpperCase()} ${getDateD.format(dateEnd).toUpperCase()}`;
    }
  } else {
    tripDate = `${getDateM.format(dateStart).toUpperCase()} ${getDateD.format(dateStart).toUpperCase()} -  ${getDateD.format(dateEnd).toUpperCase()}`;
    if (dateStart.getDate() === dateEnd.getDate()) {
      tripDate = `${getDateM.format(dateStart).toUpperCase()} ${getDateD.format(dateStart).toUpperCase()}`;
    }
  }

  return tripDate;
};

export {
  formatDate,
};

