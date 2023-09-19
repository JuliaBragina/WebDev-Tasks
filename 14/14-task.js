/*14.	Задача на промисы: напишите функцию, которая принимает URL изображения 
и возвращает промис, который разрешается с данными об изображении, когда оно загружено. 
Когда говорится "промис разрешается с данными об изображении", это означает, 
что промис должен быть успешно выполнен (resolved) с данными об изображении после того, 
как изображение будет загружено. */
const main = document.querySelector('.main');

function loadImage(imageUrl) {
  return new Promise((resolve, reject) => {
    const img = document.createElement('img');
    img.classList.add('main__img');
    
    img.onload = () => {
      resolve(img); // Изображение загружено успешно, разрешаем промис с элементом <img>.
    };

    img.onerror = (error) => {
      reject(error); // Произошла ошибка при загрузке изображения, отклоняем промис с ошибкой.
    };

    img.src = imageUrl; // Устанавливаем URL изображения для начала его загрузки.
  });
}

loadImage('./img.jpeg')
  .then((imgElement) => {
    main.appendChild(imgElement); // Добавляем элемент <img> в DOM после загрузки.
  })
  .catch((error) => {
    console.error('Произошла ошибка при загрузке изображения:', error);
  });


