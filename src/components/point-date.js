const DAY_MILLISECONDS = 86400000;
const HOUR_MILLISECONDS = 3600000;
const MINUTE_MILLISECONDS = 60000;

const dateFormat = new Intl.DateTimeFormat(`en-GB`, {
  dateStyle: `medium`,
  month: `long`,
  day: `numeric`,
});


const timeFormat = new Intl.DateTimeFormat(`en-GB`, {
  hour24: true,
  hour: `numeric`,
  minute: `numeric`,
});

const formatDate = (date) => {
  if (date > 0) {
    return dateFormat.format(date).toUpperCase();
  } else {
    return ``;
  }
};

const formatTime = (date) => timeFormat.format(date);

const duration = {
  getNormalDuration(timeStart, timeFinish) {
    const durationMilliseconds = timeFinish - timeStart;
    const days = Math.trunc(durationMilliseconds / DAY_MILLISECONDS);
    const hours = Math.trunc((durationMilliseconds - days * DAY_MILLISECONDS) / HOUR_MILLISECONDS);
    const minutes = Math.trunc((durationMilliseconds - days * DAY_MILLISECONDS - hours * HOUR_MILLISECONDS) / MINUTE_MILLISECONDS);
    return `${days ? days + `D` : ``}  ${hours ? hours + `H` : ``} ${minutes ? minutes + `M` : ``}`;
  },

  getDuration(eventDuration) {
    const days = Math.trunc(eventDuration / DAY_MILLISECONDS);
    const hours = Math.trunc((eventDuration - days * DAY_MILLISECONDS) / HOUR_MILLISECONDS);
    const minutes = Math.trunc((eventDuration - days * DAY_MILLISECONDS - hours * HOUR_MILLISECONDS) / MINUTE_MILLISECONDS);
    return `${days ? days + `D` : ``}  ${hours ? hours + `H` : ``} ${minutes ? minutes + `M` : ``}`;
  },

  getNumericDuration(timeStart, timeFinish) {
    return timeFinish - timeStart;
  }

};

export {
  formatDate,
  formatTime,
  duration,
};
