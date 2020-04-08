/**
 * @file Домашка по FP ч. 1
 * 
 * Основная задача — написать самому, или найти в FP библиотеках функции anyPass/allPass
 * Эти функции/их аналоги есть и в ramda и в lodash
 *
 * allPass — принимает массив функций-предикатов, и возвращает функцию-предикат, которая
 * вернет true для заданного списка аргументов, если каждый из предоставленных предикатов
 * удовлетворяет этим аргументам (возвращает true)
 *
 * anyPass — то же самое, только удовлетворять значению может единственная функция-предикат из массива.
 *
 * Если какие либо функции написаны руками (без использования библиотек) это не является ошибкой
 */


import { prop, compose, equals, allPass, not, and, length, values, filter, anyPass, gte } from 'ramda';
const colorEqual = color => compose(equals(color));
const checkColor = (figure, color) => compose(colorEqual(color), prop(figure));

// 1. Красная звезда, зеленый квадрат, все остальные белые.
export const validateFieldN1 = (obj) => {
  return allPass([checkColor('star', 'red'), checkColor('square', 'green'), checkColor('triangle', 'white'), checkColor('circle', 'white')])(obj);
};

// 2. Как минимум две фигуры зеленые.
export const validateFieldN2 = (obj) => {
  return gte(length(filter(equals('green'), values(obj))), 2);
};

// 3. Количество красных фигур равно кол-ву синих.
export const validateFieldN3 = (obj) => {
  const blue = length(filter(equals('blue'), values(obj)));
  const red = length(filter(equals('red'), values(obj)));
  return and(equals(blue, red), not(equals(red, 0)));
};

// 4. Синий круг, красная звезда, оранжевый квадрат
export const validateFieldN4 = (obj) => {
  return allPass([checkColor('star', 'red'), checkColor('square', 'orange'), checkColor('circle', 'blue')])(obj);
};
// 5. Три фигуры одного любого цвета кроме белого.
export const validateFieldN5 = (obj) => {
  const notWhite = compose(not, equals('white'))

  const arr = filter(notWhite, values(obj));
  const result = filter(equals(arr[0]), arr);
  return gte(length(result), 3);
};

// 6. Две зеленые фигуры (одна из них треугольник), еще одна любая красная.
export const validateFieldN6 = (obj) => {
  const green = anyPass([checkColor('star', 'green'), checkColor('square', 'green'), checkColor('circle', 'green')])(obj);
  const red = filter(equals('red'), values(obj));
  return and(checkColor('triangle', 'green')(obj), and(green, gte(length(red), 0)));
};

// 7. Все фигуры оранжевые.
export const validateFieldN7 = (obj) => {
  return equals(length(filter(equals('orange'), values(obj))), 4);
};

// 8. Не красная и не белая звезда.
export const validateFieldN8 = (obj) => {
  return and(not(checkColor('star', 'white')(obj)), not(checkColor('star', 'red')(obj)));
};

// 9. Все фигуры зеленые.
export const validateFieldN9 = (obj) => {
  return equals(length(filter(equals('green'), values(obj))), 4);
};

// 10. Треугольник и квадрат одного цвета (не белого)
export const validateFieldN10 = (obj) => {
  const colorTriangle = prop('triangle', obj);
  const colorSquare = prop('square', obj);

  return and(equals(colorTriangle, colorSquare), and(not(equals(colorTriangle, 'white')), not(equals(colorSquare, 'white'))));
};
