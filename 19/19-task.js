/*19.	Реализовать виджет, отображающий список постов из любого паблика в VK 
(подойдет любой паблик, где постов очень много). Например, с помощью этой функции API VK. 
Виджет должен иметь фиксированные размеры и возможность прокрутки. При прокрутке содержимого виджета до 
конца должны подгружаться новые посты. Необходимо реализовать возможность кэширования уже загруженных данных: 
если пользователь закрыл страницу, а потом снова открыл ее, виджет должен отображать все загруженные ранее данные 
(новые данные должны подгружаться из учетом уже загруженных ранее).

При переполнении localStorage, данные, загруженные последними должны вытеснять данные загруженные первыми
 */

import api from './api.js';
import { getLocalStorageSize } from '../20/20-task.js';

let counter = 0;
const localStorageSize = 0;
const widget = document.querySelector('.news-widget');

async function loadNextPage(counter) {
  try {
    // запрашиваем посты
    const message = await api.getPosts(counter);

    // сладываем из в localStorage
    localStorage.setItem(`posts_${counter}`, JSON.stringify(message.response.items));
    const postsList = JSON.parse(localStorage.getItem(`posts_${counter}`));

    const list = document.querySelector('.news-widget');
    const listTemplate = document.querySelector('#news-template').content;

    // подсчитываем, объем данных в localStorage
    let localStorageSize = getLocalStorageSize();
    console.log(`Текущий объем данных в localStorage: ${localStorageSize / (1024 * 1024)} Mбайт`);
  
    // вызываем функцию для печати постов
    printPosts(postsList, list, listTemplate);
  }
  catch {err => console.log(err)}
}

// функция для печати постов
function printPosts(postsList, list, listTemplate) {

  // для каждого поста формируем контейнер
  postsList.forEach(element => {
    const listElement = listTemplate.querySelector('.news-container').cloneNode(true);
    listElement.querySelector('.news-container__title').textContent = element.text;

    const frameContainer = document.createElement('div');
    frameContainer.classList.add('news-container__frame-container');

    if (element.attachments.length === 1) {
      frameContainer.classList.add('news-container__frame-container_aloneFrame');
    }

    // определяем тип содержимого в посте и в зависимости от типа выводим
    element.attachments.forEach(attachment => {

      if (attachment.type === 'photo') {
        printImg(attachment, frameContainer)
        
      } else if (attachment.type === 'video') {
        printVideo(listElement, attachment, frameContainer);

      } else if (attachment.type === 'link') {
        printArticles(listElement, attachment, frameContainer)
      }
    });

    listElement.appendChild(frameContainer);
    list.append(listElement);
  });
}

//Функция для вывода изображений
function printImg(attachment, frameContainer) {
  attachment.photo.sizes.forEach(img => {
    if(img.type === 'q') {
      const imgElement = document.createElement('img'); //создаем элемент img
      imgElement.classList.add('news-container__img'); // добавляем название класса для стилизации
      imgElement.setAttribute('alt', 'картинка'); // добавляем атрибут alt
      imgElement.src = img.url; // присаиваем url картинки

      frameContainer.appendChild(imgElement); // вставляем полученный фрейм
    }
  });
}

//Функция для вывода видео
function printVideo(listElement, attachment, frameContainer) {
  listElement.querySelector('.news-container__title').textContent = attachment.video.title && attachment.video.description; // присваиваем название поста
  const videoElement = document.createElement('iframe'); //создаем элемент iframe
  videoElement.classList.add('news-container__video'); // добавляем название класса для стилизации
  videoElement.src = `https://vk.com/video_ext.php?oid=${attachment.video.owner_id}&id=${attachment.video.id}&hash=${attachment.video.track_code}&hd=2`; // присаиваем url видео

  frameContainer.appendChild(videoElement); // вставляем полученный фрейм
}

//Функция для вывода статей
function printArticles(listElement, attachment, frameContainer) {
  listElement.querySelector('.news-container__title').textContent = attachment.link.title; // присваиваем название поста

  const imgElement = document.createElement('img'); //создаем элемент img
  imgElement.classList.add('news-container__img'); // добавляем название класса для стилизации
  imgElement.setAttribute('alt', 'картинка'); // добавляем атрибут alt
  imgElement.src = attachment.link.photo.sizes[5].url; // присаиваем url картинки

  const linkElement = document.createElement('a'); //создаем элемент а
  linkElement.classList.add('news-container__link'); // добавляем название класса для стилизации
  linkElement.textContent = 'Подробнее'; // создаем описание
  linkElement.href = attachment.link.url; // присаиваем url статьи

  frameContainer.appendChild(imgElement); // вставляем полученные фреймы
  frameContainer.appendChild(linkElement);
}

let isLoading = false; // Флаг, который показывает, идет ли загрузка

widget.addEventListener('scroll', () => {
  const scrollHeight = widget.scrollHeight;
  const scrollTop = widget.scrollTop;
  const clientHeight = widget.clientHeight;

  // Проверяем, достиг ли пользователь конца области виджета и не была ли уже загружена следующая порция
  if (scrollHeight - scrollTop <= clientHeight + 10 && !isLoading) {
    isLoading = true; // Устанавливаем флаг, что началась загрузка
    counter += 1;
    loadNextPage(counter)
      .then(() => {
        isLoading = false; // Устанавливаем флаг обратно в false после завершения загрузки
      })
      .catch(error => {
        isLoading = false; // В случае ошибки также снимаем флаг
        console.error(error);
      });
  }
});

// Загружаем первую порцию данных при загрузке страницы
localStorage.clear();
loadNextPage(counter);