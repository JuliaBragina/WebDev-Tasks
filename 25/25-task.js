/*Задача: Создать и добавить стиль для элемента: 
Напишите функцию, которая создает новый элемент, 
добавляет его в DOM и устанавливает для него стиль с помощью CSS. */

// получаем элемент списка
const list = document.querySelector('.main__list');
const input = document.querySelector('.main__inputForm');
const button = document.querySelector('.main__buttonForm');

button.addEventListener('click', (event) => {
  event.preventDefault(); // Предотвращаем перезагрузку страницы при отправке формы
  const listItem = document.createElement('li'); // создаём элемент списка
  listItem.textContent = input.value; //Пишем в элемент списка 
  listItem.style.color = 'blue'; // Устанавливаем цвет текста в элементе
  list.append(listItem); // добавляем элемент списка в конец списка
  input.value = ''; // Очищаем значение input
});
