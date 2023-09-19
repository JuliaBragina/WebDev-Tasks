/*Задача на работу с объектами: создайте объект, представляющий собой книгу. 
Объект должен иметь свойства, такие как: название книги, автор и год издания. 
Напишите методы для получения и изменения значений свойств книги. */

const book = {
  name: '',
  author: '',
  year: 0
}

function changeName(name) {
  book.name = name;
}

function changeAuthor(author) {
  book.author = author;
}

function changeYear(year) {
  book.year = year;
}

changeName("Преступление и наказание");
changeAuthor("Федор Достоевский");
changeYear(1866);

console.log(book);