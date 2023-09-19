import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import fetch from 'node-fetch';

const port = 3000;
const app = express();

app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// формируем корс
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://localhost:3000',
    'http://127.0.0.1:5500'
  ],
  credentials: true,
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'PATCH'],
  allowedHeaders: ['Authorization', 'Content-type'],
}));

app.get('/getPosts', async (req, res) => {
  const accessToken = 'b0a07b7cb0a07b7cb0a07b7c2eb3b5dee1bb0a0b0a07b7cd5a4d4d2446441feb784449b';
  const ownerId = -38594501; // ID паблика или пользователя
  const count = 3;
  const offset = req.query.counter * count;

  console.log('counter = ' + req.query.counter, 'offset = ' + offset, typeof req.query.counter);

  // URL для запроса к VK API
  const apiUrl = `https://api.vk.com/method/wall.get?owner_id=${ownerId}&filter=all&count=${count}&offset=${offset}&access_token=${accessToken}&filter=all&v=5.131`;
  
  // Отправляем запрос к VK API
  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error(`VK API request failed with status ${response.status}`);
      }
      return response.json(); // Прочитать JSON из ответа
    })
    .then(data => {
      res.json(data); // Отправить данные клиенту
    })
    .catch(err => {
      console.error('Error:', err);
      res.status(500).json({ error: 'Server error' });
    });
});

// Запускаем сервер
app.listen(port);