const yearFormatter = new Intl.DateTimeFormat(`en-GB`, {
  year: `numeric`
});

const monthFormatter = new Intl.DateTimeFormat(`en-GB`, {
  month: `short`,
});

const dayFormatter = new Intl.DateTimeFormat(`en-GB`, {
  day: `2-digit`,
});

const formatDate = (dateStart, dateEnd) => {
  let tripDate;

  if (dateStart.getMonth() !== dateEnd.getMonth()) {
    tripDate = `${monthFormatter.format(dateStart).toUpperCase()} ${dayFormatter.format(dateStart).toUpperCase()} - ${monthFormatter.format(dateEnd).toUpperCase()} ${dayFormatter.format(dateEnd).toUpperCase()}`;

    if (dateStart.getYear() !== dateEnd.getYear()) {
      tripDate = `${yearFormatter.format(dateStart).toUpperCase()} ${monthFormatter.format(dateStart).toUpperCase()} ${dayFormatter.format(dateStart).toUpperCase()} -  ${yearFormatter.format(dateEnd).toUpperCase()} ${monthFormatter.format(dateEnd).toUpperCase()} ${dayFormatter.format(dateEnd).toUpperCase()}`;
    }
  } else {
    tripDate = `${monthFormatter.format(dateStart).toUpperCase()} ${dayFormatter.format(dateStart).toUpperCase()} -  ${dayFormatter.format(dateEnd).toUpperCase()}`;
    if (dateStart.getDate() === dateEnd.getDate()) {
      tripDate = `${monthFormatter.format(dateStart).toUpperCase()} ${dayFormatter.format(dateStart).toUpperCase()}`;
    }
  }

  return tripDate;
};

export {
  formatDate,
};

