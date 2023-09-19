/*16.	Задача на модули и использование внешних библиотек: напишите модуль, который экспортирует 
функцию для работы с датами. Внутри модуля используйте внешнюю библиотеку Moment.js 
для удобной работы с датами. */

const dateModule = require('./dataMoment');

const formattedDate = dateModule.formatDate(new Date(), 'DD.MM.YYYY');
console.log('Formatted Date:', formattedDate);

const currentDate = dateModule.getCurrentDate();
console.log('Current Date:', currentDate);