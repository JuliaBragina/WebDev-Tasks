/*11.	Задача о замыканиях и области видимости: напишите функцию, которая возвращает другую функцию. 
Внутренняя функция должна иметь доступ к переменной, определенной во внешней функции, 
даже после того, как внешняя функция завершила свое выполнение. */

function firstFunction() {
  const a = 9;
  return function() {
    console.log(a)
  }
}

const res = firstFunction(); // Создаем замыкание
res(); // Выводит 9, так как имеет доступ к переменной a из замыкания