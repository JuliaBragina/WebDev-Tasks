/*
7.	Задача о коллекции функций: у вас есть массив функций, напишите код, который вызовет 
каждую функцию в этом массиве и выведет их порядковый номер. Однако, вызов каждой функции 
должен происходить только после вызова предыдущей функции.
Другими словами, нужно выполнить следующие шаги:
a.	Вызвать первую функцию из массива.
b.	После завершения работы первой функции вызвать вторую функцию.
c.	После завершения работы второй функции вызвать третью функцию.
d.	И так далее, пока все функции в массиве не будут вызваны по порядку.
 */

function collectionFunc() {
  //массив функций
  const functions = [
    () => new Promise((resolve) => {
      //устанавливаем таймер
      setTimeout(() => {
        console.log('Function 1');
        //callback для разрешения Promise, Promise будет разрешен после завершения этой асинхронной операции
        resolve();
      }, 3000);
    }),
    () => new Promise((resolve) => {
      setTimeout(() => {
        console.log('Function 2');
        resolve();
      }, 1000);
    }),
    () => new Promise((resolve) => {
      setTimeout(() => {
        console.log('Function 3');
        resolve();
      }, 2000);
    })
  ];

  async function executeFunctions() {
    for (const func of functions) {
      await func();
    }
  }

  executeFunctions();
}

collectionFunc();
