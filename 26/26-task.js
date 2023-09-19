/*Задача: Рекурсивный обход дерева DOM:: 
Напишите функцию, которая рекурсивно обходит дерево DOM, 
начиная с указанного элемента, и выполняет определенное действие 
с каждым узлом (например, выводить информацию о теге в консоль). */

function traverseDOM(node) {
    // Получаем имя узла и удаляем пробелы и переносы строк
    const nodeName = node.nodeName;
  
    // Выводим информацию о текущем узле в консоль
    console.log(nodeName);
  
    // Рекурсивно обходим всех детей текущего узла
    for (let i = 0; i < node.children.length; i++) {
      const child = node.children[i];
      traverseDOM(child);
    }
  }
  
  const rootNode = document.querySelector('.main');
  traverseDOM(rootNode);
  