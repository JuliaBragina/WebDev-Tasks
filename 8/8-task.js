/*8.	Задача о замыканиях: напишите функцию, которая будет принимать массив функций и возвращать новую функцию, 
которая вызывает каждую функцию в этом массиве и возвращает массив результатов, полученных после вызова каждой функции. */

function firstFunction(massFunction) {
    function returnFunction() {
      // Создаем массив для хранения результатов.
      const results = [];
  
      // Перебираем каждую функцию в массиве и вызываем ее,
      // затем добавляем результат в массив results.
      massFunction.forEach(func => {
        const result = func();
        results.push(result);
      });
  
      // Возвращаем массив с результатами.
      return results;
    }
  
    // Возвращаем функцию returnFunction, которая будет вызывать переданные функции.
    return returnFunction;
  }
  
  // Пример использования:
  const functions = [
    () => 1 + 2,
    () => 3 * 4,
    () => "Hello, world!",
  ];
  
  const combinedFunction = firstFunction(functions);
  const results = combinedFunction();
  
  console.log(results); // Выведет [3, 12, "Hello, world!"]
  