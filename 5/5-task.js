/*Разработайте функцию преобразования JSON в связный список. 
На входе функция должна получать JSON, содержащий список объектов, 
на выходе объект, представляющий из себя односвязный список. */

//класс представляет узел списка
class Node {
  constructor(value, next = null) {
    this.value = value; //данные узла
    this.next = next; //ссылка на следующий узел
  }
}

//класс представляет сам список
class LinkedList {
  constructor() {
    this.head = null; //ссылка на первый узел списка
    this.end = null; //ссылка на последний узел списка
  }
  
  //метод для добавления узлов в конец списка 
  append(value) {
    const newNode = new Node(value); //создаем новый узел (Node) с переданным значением

    if (!this.head && !this.end) { //проверка, существует ли в списке head (головной элемент, указывающий на первый узел). 
      //если this.head === null или undefined, это означает, что список пуст и
      //newNode становится первым и последним элементом списка. 
      this.head = newNode;
      this.end = newNode;
    } else {
      // если список не пустой
      //связываем текущий последний элемент с новым узлом
      this.end.next = newNode;
      //новый узел теперь является последним элементом
      this.end = newNode;
    }
    
    return this;
  }
}
  
  function jsonToLinkedList(jsonData) {
    const linkedList = new LinkedList();
    for (const item of jsonData.employees) {
      linkedList.append(item);
    }
    return linkedList;
  }
  
  const jsonData = {
    "employees": [
      {
        "firstName": "John",
        "lastName": "Doe",
        "age": 30
      },
      {
        "firstName": "Jane",
        "lastName": "Smith",
        "age": 25
      },
      {
        "firstName": "Bob",
        "lastName": "Johnson",
        "age": 35
      }
    ]
  };
  
  const linkedList = jsonToLinkedList(jsonData);
  console.log(linkedList);
  