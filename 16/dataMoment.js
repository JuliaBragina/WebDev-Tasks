const moment = require('moment');

// Функция для форматирования даты
function formatDate(date, format) {
  return moment(date).format(format);
}

// Функция для получения текущей даты
function getCurrentDate() {
  return moment().format('YYYY-MM-DD');
}

// Экспортируем функции для работы с датами
module.exports = {
  formatDate,
  getCurrentDate,
};