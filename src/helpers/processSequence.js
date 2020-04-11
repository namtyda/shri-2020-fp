/**
 * @file Домашка по FP ч. 2
 * 
 * Подсказки:
 * Метод get у инстанса Api – каррированый
 * GET / https://animals.tech/{id}
 * 
 * GET / https://api.tech/numbers/base
 * params:
 * – number [Int] – число
 * – from [Int] – из какой системы счисления
 * – to [Int] – в какую систему счисления
 * 
 * Иногда промисы от API будут приходить в состояние rejected, (прямо как и API в реальной жизни)
 * Ответ будет приходить в поле {result}
 */
import Api from '../tools/api';
import { __, allPass, andThen, prop, tap, ifElse, modulo, length, gte, lte, compose } from 'ramda';

const api = new Api();

const getNumFromApi = number => api.get('https://api.tech/numbers/base', { from: 10, to: 2, number });
const strToInt = str => compose(Math.round, parseFloat)(str);
const getAnimalsApi = id => api.get(`https://animals.tech/${id}`, {});
const validateNum = str => /^[0-9]+(\.)?[0-9]*$/.test(str);
const getConvertNum = num => compose(andThen(prop('result')), getNumFromApi)(num);
const getAnimals = id => compose(andThen(prop('result')), getAnimalsApi)(id);
const strLengthTen = str => lte(str.length, 10);
const strLengthTwo = str => gte(str.length, 2);
const validStr = str => allPass([strLengthTen, strLengthTwo, validateNum])(str);
const square = number => number ** 2;

const processSequence = ({ value, writeLog, handleSuccess, handleError }) => {
    return compose(
        ifElse(
            validStr,
            compose(
                andThen(handleSuccess),
                andThen(compose(getAnimals, tap(writeLog), modulo(__, 3), tap(writeLog), square, tap(writeLog), length, tap(writeLog))),
                getConvertNum,
                strToInt),
            () => handleError('ValidationError'),
        ),
        tap(writeLog)
    )(value);
}

export default processSequence;
