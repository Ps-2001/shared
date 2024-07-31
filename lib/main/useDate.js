import { LOCALIZATION } from "@/config/base.js"
import { isInRange } from "@/shared/lib/useBase.js"

const isСorrectYear = (year) => {

  year = +year

  return year > 0

}

const isСorrectMonth = (month) => {

  month = +month

  const monthRegex = new RegExp([
    // Начало строки
    '^',

    // Либо (0?) - опциональный ноль перед числом
    '(0?[1-9]', // Месяцы от 1 до 9 с опциональным нулем (01-09)

    // Либо (1[0-2]) - месяцы от 10 до 12
    '|1[0-2])',

    // Конец строки
    '$'
  ].join(''));

  return monthRegex.test(month);

}

const isСorrectDay = (day) => {

  day = +day

  const monthRegex = new RegExp([
    // Начало строки
    '^',

    // Либо (0?) - опциональный ноль перед числом
    '(0?[1-7]', // Месяцы от 1 до 7 с опциональным нулем (01-07)

    // Конец строки
    '$'
  ].join(''));

  return monthRegex.test(day);

}

// Название месяцев
const NAME_MONTHS = {
  ru: {
    1: { name: 'январь', short: 'янв' },
    2: { name: 'февраль', short: 'фев' },
    3: { name: 'март', short: 'март' },
    4: { name: 'апрель', short: 'апр' },
    5: { name: 'май', short: 'май' },
    6: { name: 'июнь', short: 'июнь' },
    7: { name: 'июль', short: 'июль' },
    8: { name: 'август', short: 'авг' },
    9: { name: 'сентябрь', short: 'сен' },
    10: { name: 'октябрь', short: 'окт' },
    11: { name: 'ноябрь', short: 'ноя' },
    12: { name: 'декабрь', short: 'дек' },
  }
}

// Название месяцев
const NAME_DAYS = {
  ru: {
    1: { name: 'понедельник', short: 'пн' },
    2: { name: 'вторник', short: 'вт' },
    3: { name: 'среда', short: 'ср' },
    4: { name: 'четверг', short: 'чт' },
    5: { name: 'пятница', short: 'пт' },
    6: { name: 'суббота', short: 'сб' },
    7: { name: 'воскресенье', short: 'вс' },
  }
}

export const getMonthName = (month = getCurrentMonth(), options) => {
  month = +month
  const { lang = LOCALIZATION } = options

  if (!isСorrectMonth(month)) month = getCurrentMonth()

  const obj = NAME_MONTHS[lang][month]

  return obj
}

export const getDayName = (day = get(), options) => {
  day = +day
  const { lang = LOCALIZATION } = options

  if (!isСorrectDay(day)) day = getCurrentMonth()

  const obj = NAME_DAYS[lang][day]

  return obj
}

export const getCurrentFullYear = () => {
  return new Date().getFullYear()
}

export const getCurrentMonth = () => {
  return new Date().getMonth() + 1
}

export const getCurrentDay = () => {
  return new Date().getDate()
}

/** Узнать количество дней в указанном месяце и году.
* Если месяц или год не указаны, используется текущий месяц и год.
*
* @param {Object} options - Объект с параметрами.
* @param {number} [options.month=getCurrentMonth()] - Месяц (1-12).
* @param {number} [options.year=getCurrentFullYear()] - Год.
* @returns {number} Количество дней в месяце.
*/
export const getCountDaysInMonth = ({ month = getCurrentMonth(), year = getCurrentFullYear() }) => {

  if (!isСorrectMonth(month) || !isСorrectYear(year)) return 0

  return new Date(year, month, 0).getDate()
}

// Узнать является ли текущий день выходным
// date - дата (01.01.2001) ?
export const isWeekend = (date) => {
  const day = new Date(date).getDay()
  return (+day === 6 || +day === 0)
}

/** @deprecated
 *
 * @param year
 * @param month
 * @param day
 * @returns {number|number}
 */
// узнать какой по счету день в неделе
export const getWeekDay = ({ year, month, day = 1 }) => {
  // Воскресенье - это 7 день

  return new Date(`${year}-${month}-${day}`).getDay() === 0
      ? 7
      : new Date(`${year}-${month}-${day}`).getDay()
}

/**
 * @deprecated
 * @param date
 * @param separate
 * @returns {string|boolean}
 */
// Перевести дату в формат => 2023-07-21
// data - '21.7.2023'
export const inDate = ({ date, separate = '-' }) => {

  if (!date) return false

  let [day, month, year] = date.split(separate)

  day = totalNum(day)
  month = totalNum(month)

  return `${year}-${month}-${day}`
}

/**
 * @deprecated
 * @param date
 * @param separate
 * @returns {string|boolean}
 */
// Перевести дату в формат => 21.07.2023
// data - '2023-7-21'
export const normalizeDate = ({ date, separate = '-' }) => {

  if (!date) return false

  let [year, month, day] = date.split(separate)

  day = totalNum(day)
  month = totalNum(month)

  return `${day}.${month}.${year}`
}

// Добавить или убавить дату
// date_data - дата (2024-04-23T05:36:11; 1710240000000; 2024, 3, 23, 5, 36, 11 )
// day - день
// month - месяц
// year - год
export const setDate = ({ date_data, day, month, year }) => {

  const date = date_data ? new Date(date_data) : new Date()

  if (year) date.setFullYear(date.getFullYear() + year)

  if (month) date.setMonth(date.getMonth() + month)

  if (day) date.setDate(date.getDate() + day)

  return date

}

/**
 * получить объект переданной даты
 *
  * @param {Date|string|boolean} [date=false] - Дата, которую нужно обработать.
  * Если не передана, используется текущая дата. Может быть либо объектом Date,
  * либо строкой, представляющей дату.
  *
  * @throws {Error} Если переданная дата некорректна.
  *
  * @returns {Object} Объект с компонентами даты и времени.
  * @returns {string} return.year - Год (4 цифры).
  * @returns {string} return.month - Месяц (2 цифры).
  * @returns {string} return.day - День (2 цифры).
  * @returns {string} return.hour - Час (2 цифры).
  * @returns {string} return.minute - Минуты (2 цифры).
  * @returns {string} return.second - Секунды (2 цифры).
  */
export const getObjDate = (date = false) => {

  if (!date) date = new Date()
  if (!(date instanceof Date)) date = new Date(date)

  if (isNaN(date.getTime())) {
    throw new Error('Некорректная дата');
  }

  date = new Date().toJSON()

  const year = date.slice(0, 4)
  const month = date.slice(5, 7)
  const day = date.slice(8, 10)
  const hour = date.slice(11, 13)
  const minute = date.slice(14, 16)
  const second = date.slice(17, 19)

  return {
    year, month, day, hour, minute, second
  }
}

/**
 * @deprecated
 * @param date
 * @returns {`${string}-${string}-${string}`}
 */
// Получить год-месяц-день
export const getBasic = (date = false) => {

  // console.log(date)
  const { year, month, day } = getObjDate({ date })

  // console.log(`${year}-${month}-${day}`)

  return `${year}-${month}-${day}`

}

// Узнать кол-во милесукунд даты
export const getDateMs = (date = false) => {

  if (!date) date = new Date()
  if (!(date instanceof Date)) date = new Date(date)

  if (isNaN(date.getTime())) {
    throw new Error('Некорректная дата');
  }
  if (!date) return new Date().getTime()

  return new Date(date).getTime()
}

// Добавить вперед '0', если число состоит из одной цифры (символа)
// number - число
export const padWithZeros = (number) => {
  if (String(number).length === 1) return `0${number}`

  return number
}


// date - дата ({ years, months, days })
export const formatDateOffset = ({ date }) => {

  if (!date) return ''

  const parts = []
  if (date?.years) parts.push(formatUnit({ value: date.years, type: 'years' }));
  if (date?.months) parts.push(formatUnit({ value: date.months, type: 'months' }));
  if (date?.days) parts.push(formatUnit({ value: date.days, type: 'days' }));
  return parts.join(' ')
}

// Корректно обработать склонения даты
// value - значение (число)
// type - тип данных ('years', 'months', 'days')
const formatUnit = ({ value, type }) => {

  if (!value || !type) return ''

  value = Math.abs(value)

  const cases = [2, 0, 1, 1, 1, 2];
  const titles = {
    years: ['год', 'года', 'лет'],
    months: ['месяц', 'месяца', 'месяцев'],
    days: ['день', 'дня', 'дней']
  }

  return value + ' ' + titles[type][(value % 100 > 4 && value % 100 < 20) ? 2 : cases[(value % 10 < 5) ? value % 10 : 5]]
}
