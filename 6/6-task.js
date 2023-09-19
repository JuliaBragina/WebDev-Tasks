/*Задача о сортировке объектов: у вас есть массив объектов вида { name: 'John', age: 25 }.
Напишите код, который сортирует этот массив по возрастанию возраста,
а при равных возрастах сортирует по алфавиту по полю name. */

function sortByAge(people) {
    people.sort(function(a, b) {
      // Если возрасты равны, сравниваем по полю name
      if (a.age === b.age) {
        return a.name.localeCompare(b.name);
      }
      // Сортировка по возрастанию возраста
      return a.age - b.age;
    });
  }
  
  const people = [
    { name: 'John1', age: 45 },
    { name: 'John6', age: 25 },
    { name: 'John3', age: 20 },
    { name: 'John4', age: 2 },
    { name: 'John5', age: 70 },
    { name: 'John2', age: 25 }
  ];
  
  sortByAge(people);
  console.log(people);