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
    const days = Math.trunc(durationMilliseconds / 86400000);
    const hours = Math.trunc((durationMilliseconds - days * 86400000) / 3600000);
    const minutes = Math.trunc((durationMilliseconds - days * 86400000 - hours * 3600000) / 60000);
    return `${days ? days + `D` : ``}  ${hours ? hours + `H` : ``} ${minutes ? minutes + `M` : ``}`;
  },

  getDuration(eventDuration) {
    const days = Math.trunc(eventDuration / 86400000);
    const hours = Math.trunc((eventDuration - days * 86400000) / 3600000);
    const minutes = Math.trunc((eventDuration - days * 86400000 - hours * 3600000) / 60000);
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
