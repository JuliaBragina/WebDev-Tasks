/*23.	Анализатор сложности пароля: создайте функцию, которая оценивает 
сложность введенного пользователем пароля. Необходимо анализировать длину пароля, 
использование различных символов, наличие чисел и букв в разных регистрах. Выведите 
пользователю оценку сложности пароля и предложите улучшения, если пароль слишком 
слабый. */

function analyze_password_complexity(password) {
  if (password.length < 8) {
    return "Пароль слишком короткий";
  }

  let score = 0;
  let recommendations = [];

  // Проверяем наличие цифр
  if (password.match(/\d/)) {
    score++;
  } else {
    recommendations.push('Используйте цифры для создания пароля');
  }

  // Проверяем наличие строчных и прописных букв
  if (password.match(/[a-z]/) && password.match(/[A-Z]/)) {
    score++;
  } else {
    recommendations.push('Используйте строчные и заглавные буквы');
  }

  // Проверяем наличие специальных символов
  if (password.match(/[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/)) {
    score++;
  } else {
    recommendations.push('Используйте другие символы, такие как !, -, +');
  }

  // Оценка сложности
  let complexity = '';
  if (score >= 4) {
    complexity = "Сильный пароль";
  } else if (score >= 3) {
    complexity = "Средний пароль";
  } else if (score >= 2) {
    complexity = "Слабый пароль";
  } else {
    complexity = "Очень слабый пароль";
  }

  return { complexity, recommendations };
}

const result = analyze_password_complexity('rge№;АУА34345епеbfgFEFEF');
console.log("Оценка сложности пароля:", result.complexity);

if (result.complexity === "Пароль слишком короткий") {
  console.log(result.complexity);
} else {
  console.log("Рекомендации по улучшению пароля:");
    
  if (result.recommendations) {
    result.recommendations.forEach((recommendation, index) => {
      console.log(`${index + 1}. ${recommendation}`);
    });
  } else {
    console.log("Нет рекомендаций.");
  }
}