/**
 * Сокращает текст до указанной длины и добавляет заданный сепаратор в конце.
 * @param {Object} params - Параметры функции.
 * @param {string} [params.text=''] - Строка, которую нужно сократить.
 * @param {number} [params.length=15] - Количество символов, которые нужно показать.
 * @param {string} [params.separator='...'] - Строка, добавляемая в конец сокращенного текста.
 * @returns {string} Сокращенный текст с сепаратором или исходный текст, если его длина меньше указанной.
 */
import { Type } from "./useTypes"

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
 * @param {number} [length=16] - Количество случайных символов в середине строки.
 * @param {Object} [options={}] - Дополнительные параметры.
 * @param {string} [options.start=''] - Начало результата.
 * @param {string} [options.end=''] - Окончание результата.
 * @returns {string} Строка, состоящая из префикса, случайных символов и суффикса.
 */
export const randomText = (length = 16, { start = '', end = '' } = {}) => {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let result = ''

  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }

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
