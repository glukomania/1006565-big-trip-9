const getDate = (date) => {
  return new Date(date);
};

const getDuration = (start, end) => {
  const duration = end - start;
  return duration;
};

const getTime = (date) => {
  const dateFormat = new Date(date);
  return dateFormat.getTime;
};

export {
  getDate,
  getDuration,
  getTime
};
