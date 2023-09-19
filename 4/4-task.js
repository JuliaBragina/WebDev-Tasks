/*Разработать функцию, изменяющую окончание слов в зависимости от падежа. Например:
  112 сообщений
  12 сообщений
  1 сообщение
  1024 пользователя
  1026 пользователей
  121 пользователь`	
Функцию надо упаковать в модуль.*/


function wordDeclension(number, words) {
  //число приволим к стрингу
  const numberStr = number.toString();

  //проверяем, какой символ последний
  if(numberStr.endsWith("1")){
    //возвращаем число и нужное слово из переданного масива слов
    return number + ' ' + words[0];
  } 

  if(numberStr.endsWith("2") || numberStr.endsWith("3") || numberStr.endsWith("4")){

    return number + ' ' + words[1];

  }

  if(numberStr.endsWith("0") || numberStr.endsWith("5") || numberStr.endsWith("6") || numberStr.endsWith("7") || numberStr.endsWith("8") || numberStr.endsWith("9")){
    return number + ' ' + words[2];
  }
};


console.log(wordDeclension(2, ['сообщение', 'сообщения', 'сообщений']))