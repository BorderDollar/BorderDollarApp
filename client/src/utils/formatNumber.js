// src/utils/formatNumberWithCommas.js
export const formatNumberWithCommas = number => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const formatNumberWithTwoDecimalPlaces = number => {
  return (Math.round(number * 100) / 100).toFixed(2);
}

export const formatDateIntoUnix = dateString => {
  const [year, month, day] = dateString.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  const unixTimeSeconds = Math.floor(date.getTime() / 1000);
  return unixTimeSeconds
}