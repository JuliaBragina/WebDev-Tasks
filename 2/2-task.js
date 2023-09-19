/*Задача о странных числах: Напишите функцию, которая принимает число и возвращает true, 
если это число является странным, и false в противном случае. 
Странным числом считается число, которое равно сумме всех своих делителей, кроме самого себя.*/

function strangeNumber(number){
  let deriv = 0;

  //цикл
  for (let i = 1; i < number - 1; i++) {
    //ищем делитель числа
    if (number % i === 0) {
        deriv += i;
    }
  }
  //если число === сумме делителей, то возвращаем true
  return number === deriv;
}
  
console.log(strangeNumber(5));
console.log(strangeNumber(10));
console.log(strangeNumber(2));

console.log(strangeNumber(28));
console.log(strangeNumber(6));