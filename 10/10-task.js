/*10.	Реализовать функцию конвертации строки в JSON со всеми необходимыми проверками и валидациями.  */

// парсим объект
function parseObject(it) {
  it.setSkipSpaces(true);
  let res = {};
  for (let char = it.next(); !char.done; char = it.next()) {
    if (char.value === '}') {
      return res;
    }
    if (char.value !== '"') {
      throw new Error('" for key in object expected');
    }
    let key = parseString(it);
    char = it.next();
    if (char.done) {
      throw new Error('unexpected EOF');
    }
    if (char.value !== ':') {
      throw new Error('expected :');
    }
    let value = parseNode(it);
    res[key] = value;
    char = it.next();
    if (char.done) {
      throw new Error('unexpected EOF');
    }
    if (char.value === '}') {
      return res;
    }
    if (char.value !== ',') {
      throw new Error('expected ,');
    }
  }
  throw new Error('Expected } as the end of arrray');
}

// парсим строку
function parseString(it) {
  it.setSkipSpaces(false);
  let res = "";
  for (let char = it.next(); !char.done; char = it.next()) {
    if (char.value === '"') {
      it.setSkipSpaces(true);
      return res;
    }
    res += char.value;
  }
  throw new Error('Expected " as the end of string');
}

// парсим массив
function parseArray(it) {
  it.setSkipSpaces(true);
  let res = [];
  // итерируемся по символам по не конец строки, it.next() - следующий символ, конец строки - char.done
  for (let char = it.next(); !char.done; char = it.next()) {
    if (char.value === ']') {
      return res; // вернем результат, когда дойдем со символна ]
    }
    if (!(char.value === ',')) {
      it.prev();
      res.push(parseNode(it));
      it.setSkipSpaces(true);
    }
  }
  throw new Error('Expected ] as the end of arrray');
}

let numbers = new Set();
let spaces = new Set();
numbers.add('0');
numbers.add('1');
numbers.add('2');
numbers.add('3');
numbers.add('4');
numbers.add('5');
numbers.add('6');
numbers.add('7');
numbers.add('8');
numbers.add('9');
numbers.add('-');
numbers.add('.');
numbers.add('e');
numbers.add('+');

spaces.add(' ');
spaces.add('\t');
spaces.add('\n');

// парсим число
function parseNumber(it) {
  it.setSkipSpaces(true);
  let res = "";
  // итерируемся по символам по не конец строки, it.next() - следующий символ, конец строки - char.done
  for (let char = it.next(); !char.done; char = it.next()) {
    if (!(numbers.has(char.value))) {
      it.prev(); // если не число, то вернем итератор на предыдущий символ
      break;
    }
    res += char.value;
  }
  return parseFloat(res);
}

// парсинг bool
function parseBool(it) {
  it.setSkipSpaces(false);
  let res = "";
  // итерируемся по символам по не конец строки, it.next() - следующий символ, конец строки - char.done
  for (let char = it.next(); !char.done; char = it.next()) {
    res += char.value;
    if (res.length > 5) {
      break;
    }
    if (res === 'true') {
      return true;
    }
    if (res === 'false') {
      return false;
    }
  }
  throw new Error("boolean is expected");
}

// парсинг null
function parseNull(it) {
  it.setSkipSpaces(false);
  let res = "";
  // итерируемся по символам по не конец строки, it.next() - следующий символ, конец строки - char.done
  for (let char = it.next(); !char.done; char = it.next()) {
    res += char.value;
    if (res.length > 4) {
      break;
    }
    if (res === 'null') {
      return null;
    }
  }
  throw new Error("null is expected");
}

// функция для определения символа
function parseNode(it) {
  it.setSkipSpaces(true);
  let char = it.next();
  if (it.done) {
    throw new Error('Unexpected EOF');
  }
  switch(char.value) {
    case '[':
      return parseArray(it);
    case '"':
      return parseString(it);
    case '{':
      return parseObject(it);
    case 'n':
      it.prev();
      return parseNull(it);
    case 't':
      it.prev();
      return parseBool(it);
    case 'f':
      it.prev();
    return parseBool(it);
      default:
      if (numbers.has(char.value)) {
        it.prev();
        return parseNumber(it);
    }
    throw new Error("unexpected char ", char.value);
  }
}

// итератор, который умеет ходить назад и пропускать пробелы
function makeCustomIterator(str) {
  let i = 0;
  let skipSpaces = true;

  return {
    next: function () {
      if (skipSpaces === true) {
        while (i < str.length && spaces.has(str[i])) {
          i++;
        }
      }
      return i < str.length ? { value: str[i++], done: false } : { done: true };
    },
    prev: function () {
      if (i < 0) {
        throw new Error("end of line");
      }
      i--;
      return;
    },
    setSkipSpaces: function (skip) {
      skipSpaces = skip;
    },
  }
}

const example = '  [ [1.25,2,"3"] , " 2 " , " 3 " , null , false, true , {"1": 1, "matvey": [4,5,"6"] } ]   ';
const iterator = makeCustomIterator(example);
console.log(parseNode(iterator));