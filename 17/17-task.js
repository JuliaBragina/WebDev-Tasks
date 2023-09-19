/*17.	Необходимо реализовать простое поле ввода адреса с функцией геокодинга: 
пользователь вводит данные в поле с помощью одного из геоинформационных сервисов 
(Яндекс.Карты, ДаДата, GraphHopper), подбирается адрес. 
Найденные данные должны отображаться в выпадающем списке, из которого 
можно выбрать подходящее значение. Реализовать дебоунсинг и защиту от троттлинга с помощью замыканий.*/

import { Api } from './api.js';
const api = new Api();

const listTemplate = document.querySelector('#tempalate').content;
const list = document.querySelector('.main__list');

const addressButton = document.querySelector('.address__button');
const addressInput = document.querySelector('.address__input');

// Функция для выполнения геокодинга
function geocodeAddress(address) {
  const apiKey = 'c46bf863-8b90-4e75-b926-085e7effd943'; // ключ API
  const url = `https://geocode-maps.yandex.ru/1.x/?apikey=${apiKey}&format=json&geocode=${address}`;

  api.getAddress(url)
    .then((res) => {
      const suggestions = res.response.GeoObjectCollection.featureMember;
      displaySuggestions(suggestions);
    })
    .catch((err) => console.log(err))
}

// Функция для отображения предложений в выпадающем списке
function displaySuggestions(suggestions) {
    suggestions.forEach(element => {
      const listElement = listTemplate.querySelector('.tempalate').cloneNode(true);
      listElement.querySelector('.tempalate__title').textContent = element.GeoObject.name;
      listElement.querySelector('.tempalate__address').textContent = element.GeoObject.metaDataProperty.GeocoderMetaData.Address.formatted;
      list.append(listElement); // Добавляем элемент в список
    });
}
  
// Обработчик события отправки формы
addressButton.addEventListener('click', (event)=> {
  event.preventDefault();
  geocodeAddress(addressInput.value);
});

//защита от троттлинга с помощью замыканий
//callback - это функция, которую нужно ограничить в частоте вызова
//limit - минимальное время (в миллисекундах) между вызовами этой функции
function throttle(callback, limit) {
  let inThrottle = false; //флаг, который указывает, выполняется ли в данный момент функция callback с задержкой (true) или нет (false)
  let lastInputValue = null; //переменная хранит последнее значение поля ввода

  return function () {
    const inputValue = addressInput.value; // используется для сравнения текущего значения с предыдущим, чтобы понять, изменилось ли оно
    
    if (inputValue !== lastInputValue) { //сравниваем текущее значение inputValue с предыдущим lastInputValue
      //Если они не равны, это означает, что значение поля ввода изменилось
      lastInputValue = inputValue;

      if (!inThrottle) { //проверяем, выполняется ли в данный момент функция callback с задержкой (inThrottle = false)
        callback(inputValue); // вызываем функцию с текущим значением поля ввода
        inThrottle = true;  // установим флаг в true, чтобы предотвратить последующие вызовы функции callback
        setTimeout(() => { // устанавливаем таймер с задержкой времени limit с помощью setTimeout
          inThrottle = false; /// установим флаг в false
        }, limit);
      }
    }
  };
}

const throttledGeocode = throttle(geocodeAddress, 1000);
addressInput.addEventListener('input', () => {
  throttledGeocode();
});


//Дебаунсинг
function debounce(callback, delay) {
  let timeoutId; // перменная для хранения идентификатора задержки
  let lastArgs; // перменная будет хранить последние аргументы переданные в функцию debouncedGeocode.
  
  return function(event) {
    lastArgs = event.target.value; // === текстовое значение поля ввода addressInput
    
    clearTimeout(timeoutId);
    timeoutId = setTimeout(function() { // задаем таймер, который вызовет callback с аргументами lastArgs через delay миллисекунд
      callback(lastArgs);
    }, delay);
  };
}

const debouncedGeocode = debounce(geocodeAddress, 500); // Задержка 500 миллисекунд
addressInput.addEventListener('input', function(event) {
  debouncedGeocode(event);
});

