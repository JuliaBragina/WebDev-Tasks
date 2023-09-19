/*15.	Задача на асинхронность: напишите асинхронную функцию, которая использует ключевое слово await 
для ожидания выполнения других асинхронных операций, и возвращает результат выполнения. */

//Создаем всинхронную функцию
async function asyncFunction() {
  try {
    //Ожидаем загруски цитаты Чака Норриса
    const response = await fetch('https://api.chucknorris.io/jokes/random');
    //Предусматриваем вывод ошибки
    if (!response.ok) {
      throw new Error('Ошибка загрузки цитаты');
    }
    const data = await response.json();
    return data.value;
  } catch (error) {
    throw error;
  }
}
  
// Используем асинхронную функцию:
asyncFunction()
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });
  
  