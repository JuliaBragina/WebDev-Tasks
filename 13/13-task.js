/*Задача на классы и наследование: создайте базовый класс Shape (фигура), 
который имеет методы для расчета площади и периметра. Затем создайте подклассы, 
представляющие различные фигуры, такие как прямоугольник, круг и треугольник. 
Реализуйте методы расчета площади и периметра для каждой фигуры. */

class Shape{

  square() {
    throw new Error("Метод square должен быть переопределен в подклассе");
  }
   
  perimeter() {
    throw new Error("Метод perimeter должен быть переопределен в подклассе");
  }
  
}

//Создаем подкласс Rectange
class Rectange extends Shape{
  constructor(length, height){
    super();  // Вызываем конструктор родительского класса
    this._length = length;
    this._height = height;
  }
  
  //Методы для рассчета площади и периметра
  square(){
    return this._length * this._height;
  }

  perimeter(){
    return 2 * (this._length + this._height);
  }
}

//Создаем подкласс Circle
class Circle extends Shape{
  constructor(radius){
    super();  // Вызываем конструктор родительского класса
    this._radius = radius;
  }

  //Методы для рассчета площади и периметра
  square(){
    return Math.PI * Math.pow(this._radius, 2);
  }

  perimeter(){
    return 2 * Math.PI * this._radius;
  }
    
}

//Создаем подкласс Triangle
class Triangle extends Shape{
  constructor(a, b, c){
    super();  // Вызываем конструктор родительского класса
    this._a = a;
    this._b = b;
    this._c = c;

    this._p = (this._a + this._b + this._c);
  }

  //Методы для рассчета площади и периметра
  square(){
    const p = this._p / 2;
    return Math.sqrt(p * (p - this._a) * (p - this._b) * (p - this._c));
  }

  perimeter(){
    return this._p;
  }
}

const triangle = new Triangle(5, 7, 8);
const circle = new Circle(5);
const rectangle = new Rectange(5, 10);