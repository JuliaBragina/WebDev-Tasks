const path = require('path');

module.exports = {
  entry: './16-task.js', // Замените на путь к вашему основному файлу
  output: {
    filename: 'task.js', // Имя файла, в котором будут объединены модули
    path: path.resolve(__dirname, 'dist'), // Путь для сохранения собранного файла
  },
};
