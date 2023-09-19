/*20.	Реализовать функцию подсчета объема памяти занимаемого данными в LocalStorage 
для предыдущей задачи. При изменении данных в localStorage в консоль должен выводиться 
объем занятой памяти / максимальный размер хранилища. */

export function getLocalStorageSize() {
  // Инициализируем переменную total, которая будет хранить общий объем данных
  let total = 0;

  // Проходимся по всем ключам в объекте localStorage
  for (const key in localStorage) {
    // Проверяем, принадлежит ли текущий ключ объекту localStorage
    if (localStorage.hasOwnProperty(key)) {
      // Если ключ принадлежит localStorage, добавляем к total длину данных, хранящихся по этому ключу
      total += localStorage.getItem(key).length;
    }
  }

  return total;
}
