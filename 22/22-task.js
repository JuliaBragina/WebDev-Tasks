/*22.	Посчитайте сколько раз можно вызвать функцию document.write() внутри document.write(). Объясните результат. */

let count = 0;

function docWrite() {
  count += 1;
  try {
    document.write('Test ' + docWrite() + '<br>');
  } catch (err) {
    console.error('Reached document.write() limit at count: ' + count);
  }
}

docWrite(); //9658, document.write() вызывался столько раз, сколько позволил коллстек