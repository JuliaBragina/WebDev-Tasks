/*Задача: Создать и добавить элемент с использованием шаблонов: 
Напишите функцию, которая создает новый элемент с использованием 
шаблонов (например, с помощью тега <template>) и добавляет его в DOM.
 */

// получаем элемент списка
const list = document.querySelector('.main__list');
const input = document.querySelector('.main__inputForm');
const button = document.querySelector('.main__buttonForm');

const listTemplate = document.querySelector('#tempalate').content; 

button.addEventListener('click', (event) => {
  event.preventDefault(); // Предотвращаем перезагрузку страницы при отправке формы
  const listElement = listTemplate.querySelector('.tempalate').cloneNode(true);
  listElement.textContent = input.value; // Устанавливаем текст элемента из значения input

  list.append(listElement); // Добавляем элемент в список
  input.value = ''; // Очищаем значение input
});