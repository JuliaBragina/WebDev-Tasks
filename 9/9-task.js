/*9.	Реализовать функцию конвертации JSON в строку */

function jsonToString(jsonObj){

  //Создаем условия, что будем возвращать
  
  //Если тип string или string, то возращаем значение в ""
  if((typeof jsonObj === "string") || (typeof jsonObj === "string")){
    return `"${jsonObj}"`
  }

  //Если тип boolean, то возращаем значение без ""
  if(typeof jsonObj === "boolean"){
    return `${jsonObj}`
  }

  //Если тип null, то возращаем null
  if (jsonObj === null) {
    return null;
  }

  //Если тип array, то будем рукурсивно вызывать jsonToString с каждым элемемнтом массива и возвращать соотвествующий тип
  if(Array.isArray(jsonObj)){
    const elements = jsonObj.map((item) => jsonToString(item));
    return `[${elements.join(", ")}]`;
  }
  
   //Если тип object
  if(typeof jsonObj === "object")  {
    let strJson = [];

    //цикл по каждому ключу с рекурсивным вызовом jsonToString для каждого значения, потом добавляем ключ и знаение в массив
    for(let key of Object.keys(jsonObj)) {
      let valueStr = jsonToString(jsonObj[key]);
      strJson.push(`"${key}": ${valueStr}`);
    }

    return `{${strJson.join(', ')}}`;
  }
}

const jsonData = {
  name: {
    fname: "John",
    lname: "Smith",
  },
  age: 30,
  isStudent: false,
  hobbies: ["Reading", "Traveling"],
  address: {
    street: "123 Main St",
    city: "Anytown",
  },
  color: null
};

console.log(jsonToString(jsonData));
console.log(JSON.stringify(jsonData));