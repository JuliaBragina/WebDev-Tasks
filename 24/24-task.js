/*24.	Разработайте страницу, отображающую таблицу с данными. Данные необходимо подгружать из этого источника.

Требования:
•	данные должны загружаться при загрузке страницы
•	необходимо реализовать сортировку по убыванию и по возрастания для всех колонок
•	необходимо реализовать клиентскую пагинацию (50 элементов на странице)
 */

import { Api } from './api.js';

const api = new Api();
let page = 1;
const itemsPerPage = 50;
let currentPage = 0;
let data = null;

const rightButton = document.querySelector('.header__button_right');
const leftButton = document.querySelector('.header__button_left');
const sortButtonUP = document.querySelectorAll('.main__buttonSortUP');
const sortButtonDOWN = document.querySelectorAll('.main__buttonSortDOWN');

//Запрашиваем данные
async function initialPage() {
  if (localStorage.getItem('data')) {
    data = await JSON.parse(localStorage.getItem('data'));
    setData(currentPage); // Инициализация страницы данными
  } else {
    // Загрузка данных при загрузке страницы
    data = await api.getItems(page);
    localStorage.setItem('data', JSON.stringify(data))
    setData(currentPage); // Инициализация страницы данными
  }
}

// Функция для установки данных на текущей странице
function setData(page) {
  //Готовим контейнер
  const item = document.querySelector('.main__dataContainer');
  item.replaceChildren();
  const listTemplate = document.querySelector('#tempalate').content;

  //Заполняем таблицу данными
  for(let i = page; i < itemsPerPage + page; i++) {
    const listElement = listTemplate.querySelector('.tempalate').cloneNode(true);

    listElement.querySelector('.main__itemZip').textContent = data[i].zip;
    listElement.querySelector('.main__itemName').textContent = data[i].fname;
    listElement.querySelector('.main__itemSname').textContent = data[i].lname;
    listElement.querySelector('.main__itemTel').textContent = data[i].tel;
    listElement.querySelector('.main__itemCity').textContent = data[i].city;
    listElement.querySelector('.main__itemState').textContent = data[i].state;
    listElement.querySelector('.main__itemAdress').textContent = data[i].address;

    item.appendChild(listElement);
  }
}

// Обработчики событий для кнопок пагинации
rightButton.addEventListener('click', () => {
  currentPage++;
  if(currentPage > data.length / 50) {
    currentPage = data.length / 50;
  }
  let page = null;
  if(currentPage === 0) {
    page = 0;
  } else {
    page = currentPage * itemsPerPage;
  }
  setData(page);
});

leftButton.addEventListener('click', () => {
  currentPage--;
  if(currentPage < 0) {
    currentPage = 0;
  }
  let page = null;
  if(currentPage === 0) {
    page = 0;
  } else {
    page = currentPage * itemsPerPage;
  }
  setData(page);
});

// Обработчики событий для кнопок сортировки
sortButtonUP.forEach((knopka) => {
  currentPage = 0;
  knopka.addEventListener('click', () => {
    const fieldName = knopka.previousElementSibling.getAttribute('value');
    sortByItemUP(fieldName);
  });
});

sortButtonDOWN.forEach((knopka) => {
  currentPage = 0;
  knopka.addEventListener('click', () => {
    const fieldName = knopka.previousElementSibling.previousElementSibling.getAttribute('value');
    sortByItemDOWN(fieldName);
  });
});

// Функция для сортировки данных по указанному полю
function sortByItemUP(item) {
  if (item === "zip") {
    data.sort((a, b) => a[item] - b[item]);
  } else if (item === "tel") {
    data.sort((a, b) => a[item].replace(/\D/g, "") - b[item].replace(/\D/g, ""));
  } else {
    data.sort((a, b) => a[item].localeCompare(b[item]));
  }

  setData(currentPage);
}

function sortByItemDOWN(item) {
  if (item === "zip") {
    data.sort((a, b) => b[item] - a[item]);
  } else if (item === "tel") {
    data.sort((a, b) => b[item].replace(/\D/g, "") - a[item].replace(/\D/g, ""));
  } else {
    data.sort((a, b) => b[item].localeCompare(a[item]));
  }

  setData(currentPage);
}

initialPage();