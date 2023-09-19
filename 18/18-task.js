/*Подсчитать максимальный объем данных, который можно записать в localStorage вашего браузера.*/

function getMaxLocalStorageSize() {
  localStorage.clear();
  let maxStorageSize = 0;
  try {
    // Создаем строку из 1 килобайт данных (1КБ)
    const oneMegabyteData = new Array(1024).fill('a').join('');
    
    while (true) {
      //Складываем все в localStorage
      const key = `test_key_${maxStorageSize}`;
      localStorage.setItem(key, oneMegabyteData);
      
      // Если не произошло ошибки при записи, увеличиваем максимальный размер
      maxStorageSize += 1;
    }
  } catch (e) {
    // Как только произойдет ошибка (как правило, переполнение), останавливаемся
    localStorage.clear(); // Очищаем localStorage от тестовых данных
    return maxStorageSize; // Возвращаем максимальный размер
  }
}

const maxLocalStorageSize = getMaxLocalStorageSize();
console.log(`Максимальный объем данных, который можно записать в localStorage: ${maxLocalStorageSize / 1024} Mбайт`);
