const moment = require('moment');

// function to get day of year as a number
const dayOfYear = (date) => {
  const x = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
  const y = Date.UTC(date.getFullYear(), 0, 0);

  const day = (x - y) / 24 / 60 / 60 / 1000;
  return isLeapYear(date) ? day + 1 : day;
};

// function to valid leap year
const isLeapYear = (date) => {
  const year = date.getFullYear();
  return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
};

const getLastDaysDate = (days) => {
  return new Date(moment().subtract(days, 'days'))
}

module.exports = {
  dayOfYear,
  getLastDaysDate
}