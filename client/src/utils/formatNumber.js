// src/utils/formatNumberWithCommas.js
export const formatNumberWithCommas = number => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const formatNumberWithTwoDecimalPlaces = number => {
  return (Math.round(number * 100) / 100).toFixed(2);
}