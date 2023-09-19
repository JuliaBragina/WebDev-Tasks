/*Реализовать аналог библиотеки Math (можно назвать MathX) с базовым набором функций, используя замыкания:
вычисление N-го числа в ряду Фибоначчи 
вычисление всех чисел в ряду Фибоначчи до числа N
вычисление N-вычисление всех простых чисел до числа N


Будет плюсом, если задумаетесь и об оптимизации.*/

import { MathX } from './MathX.js';

const mathx = new MathX();

console.log(mathx.fibonacci(10));
console.log(mathx.fibonacciSequence(10));
console.log(mathx.primeNumbers(10));