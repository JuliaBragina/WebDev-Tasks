/*Задача о палиндроме: напишите функцию, которая проверяет, является ли заданная строка палиндромом.
Палиндром — это строка, которая читается одинаково в обоих направлениях 
(например, «аргентина манит негра »).*/

function isPalindrome(str) {
  // Удаляем пробелы из строки и приводим к нижнему регистру, cоздаем массив символов строки
  const arr = str.replace(/\s/g, '').toLowerCase().split('');
  // Сравниваем исходный массив с обратным
  return arr.join('') === arr.reverse().join('');
}
  
console.log(isPalindrome('аргентина манит негра'));
console.log(isPalindrome('hello world')); 