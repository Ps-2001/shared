/**
 * Сокращает текст до указанной длины и добавляет заданный сепаратор в конце.
 * @param {Object} params - Параметры функции.
 * @param {string} [params.text=''] - Строка, которую нужно сократить.
 * @param {number} [params.length=15] - Количество символов, которые нужно показать.
 * @param {string} [params.separator='...'] - Строка, добавляемая в конец сокращенного текста.
 * @returns {string} Сокращенный текст с сепаратором или исходный текст, если его длина меньше указанной.
 */
import {Type} from "./useTypes"

export const reduction = (text = '', length = 15, separator = '...') => {

  if (!Type.isNumber(length) || !Type.isString(separator)) return ''

  if (!Type.isString(text)) return `${separator}`

  return text.length > length
    ? text?.substring(0, +length) + separator
    : text
}

/**
 * Преобразует первую букву строки в заглавную.
 * @param {string} text - Строка для преобразования.
 * @returns {string} Строка с первой заглавной буквой.
 */
export const upperFirstLetter = (text) => {
  return text.charAt(0).toUpperCase() + text.slice(1)
}

/**
 * Генерирует случайный набор символов с заданными префиксом и суффиксом.
 * @param {Object} params - Параметры функции.
 * @param {string} [params.start=''] - Начло результата.
 * @param {string} [params.end=''] - Окончание результата.
 * @param {number} [params.length=16] - Количество случайных символов в середине строки.
 * @returns {string} Строка, состоящая из префикса, случайных символов и суффикса.
 */
export const randomText = ({ start = '', end = '', length = 16 }) => {

  const chars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
  let result = ''

  for (let i = 0; i < length; i++)
    result += chars[Math.floor(Math.random() * chars.length)]

  return `${start}${result}${end}`
}

/**
 * Преобразует строку в snake_case.
 * @param {string} str - Строка для преобразования.
 * @returns {string} Строка в формате snake_case.
 */
export const snake_case_string = (str) => {
  return str && str.match(
    /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
  )
    .map(s => s.toLowerCase())
    .join('_');
}
