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

const formatDate = (date) => dateFormat.format(date).toUpperCase();
const formatTime = (date) => timeFormat.format(date);

const getDuration = (timeStart, timeFinish) => {
  let hours = timeFinish.getHours() - timeStart.getHours();
  let minutes;

  // minutes

  if (timeFinish.getMinutes() < timeStart.getMinutes()) {
    hours = hours - 1;
    minutes = 60 - timeStart.getMinutes() + timeFinish.getMinutes();
  } else {
    minutes = timeFinish.getMinutes() - timeStart.getMinutes();
  }

  // over the midnight
  if (timeFinish.getHours() < timeStart.getHours()) {
    hours = 24 - timeStart.getHours() + timeFinish.getHours();
  }
  if (timeStart.getDate() < timeFinish.getDate()) {
    const days = timeFinish.getDate() - timeStart.getDate();
    if (days > 1) {
      return days + `D ` + hours + `H ` + minutes + `M`;
    }
  } else if (hours === 0) {
    return minutes + `M`;
  }


  return hours + `H ` + minutes + `M`;
};

export {
  formatDate,
  formatTime,
  getDuration,
};
