/*Задача: Взаимодействие с формами: Напишите функцию, которая получает данные 
из формы на веб-странице 
и выполняет определенные действия с этими данными, 
например, отправляет их на сервер или 
отображает всплывающее окно с результатами. */

const button = document.querySelector('.main__buttonForm');
const popup = document.querySelector('.popup');
const popupClose = document.querySelector('.popup__buttonForm');
const inputForm = document.querySelector('.popup__input');

const form = document.forms.form;
const inputSurname = form.elements.inputSurname;
const inputName = form.elements.inputName;
const inputPatronymic = form.elements.inputPatronymic;
const inputTel = form.elements.inputTel;

button.addEventListener('click', (event) => {
  event.preventDefault();
  popup.classList.add('popup_is_opened');
  inputForm.value = inputSurname.value + ' ' + inputName.value + ' ' + inputPatronymic.value + ' ' + inputTel.value;
})

popupClose.addEventListener('click', () => {
  popupClose.classList.remove('popup_is_opened');
  inputForm.value = '';
})