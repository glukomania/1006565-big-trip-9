const getDateFormat = new Intl.DateTimeFormat(`en-GB`, {
  day: `2-digit`,
  month: `2-digit`,
  year: `2-digit`
});


const getTimeFormat = new Intl.DateTimeFormat(`en-GB`, {
  hour24: true,
  hour: `numeric`,
  minute: `numeric`,
});

const formatDate = (date) => getDateFormat.format(date).toUpperCase();
const formatTime = (date) => getTimeFormat.format(date);


export {
  formatDate,
  formatTime,
};
