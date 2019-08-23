const dateFormat = new Intl.DateTimeFormat(`en-GB`, {
  day: `2-digit`,
  month: `2-digit`,
  year: `2-digit`
});


const timeFormat = new Intl.DateTimeFormat(`en-GB`, {
  hour24: true,
  hour: `numeric`,
  minute: `numeric`,
});

const formatDate = (date) => dateFormat.format(date).toUpperCase();
const formatTime = (date) => timeFormat.format(date);


export {
  formatDate,
  formatTime,
};
