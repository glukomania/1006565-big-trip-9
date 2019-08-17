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
  if (hours < 0) {
    hours = 24 + hours;
  }
  let minutes = 0;
  if (timeFinish.getMinutes() < timeStart.getMinutes()) {
    hours = hours - 1;
    minutes = 60 - timeStart.getMinutes() + timeFinish.getMinutes();
    minutes = minutes + Number(timeStart.getMinutes());
  } else {
    minutes = timeFinish.getMinutes() - timeStart.getMinutes();
  }
  return hours + `H ` + minutes + `M`;
};

export {
  formatDate,
  formatTime,
  getDuration,
};
