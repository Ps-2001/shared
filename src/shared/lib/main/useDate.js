import { LOCALIZATION } from "@/shared/config/base"

/**
 * Проверяет и возвращает корректную дату.
 * Если дата не указана, возвращает текущую дату.
 *
 * @param {Date|string|boolean} [date=false] - Дата для проверки.
 *                                             Если не указана, используется текущая дата.
 * @returns {Date} - Корректный объект даты.
 * @throws {Error} - Выбрасывает ошибку, если дата некорректна.
 */
const getValidDate = (date = false) => {

  if (!date) date = new Date()
  if (!(date instanceof Date)) date = new Date(date)

  if (isNaN(date.getTime())) {
    throw new Error('Некорректная дата');
  }

  return date

}


/**
 * Добавляет заданное количество времени к дате.
 *
 * @param {Date} date - Исходная дата.
 * @param {Object} addDate - Объект с количеством времени для добавления.
 * @param {number} [addDate.years=0] - Количество лет для добавления.
 * @param {number} [addDate.months=0] - Количество месяцев для добавления.
 * @param {number} [addDate.days=0] - Количество дней для добавления.
 * @param {number} [addDate.hours=0] - Количество часов для добавления.
 * @param {number} [addDate.minutes=0] - Количество минут для добавления.
 * @param {number} [addDate.seconds=0] - Количество секунд для добавления.
 * @returns {Date} - Новая дата с добавленным временем.
 */
const addTime = (date, addDate) => {

  const { years = 0, months = 0, days = 0, hours = 0, minutes = 0, seconds = 0 } = addDate
  let newDate = new Date(date)

  newDate.setFullYear(newDate.getFullYear() + years)
  newDate.setMonth(newDate.getMonth() + months)
  newDate.setDate(newDate.getDate() + days)
  newDate.setHours(newDate.getHours() + hours)
  newDate.setMinutes(newDate.getMinutes() + minutes)
  newDate.setSeconds(newDate.getSeconds() + seconds)


  return newDate

}

// Узнать кол-во миллисекунд даты
const getDateMs = (date = false) => {

  date = getValidDate(date)

  return date.getTime()
}

// Узнать кол-во миллисекунд даты
const getDateSec = (date = false) => {

  date = getValidDate(date)

  return Math.floor(date.getTime() / 1000)
}

const isСorrectYear = (year) => {

  year = +year

  return year > 0

}

const isСorrectMonth = (month) => {

  const monthRegex = new RegExp([
    // Начало строки
    '^',

    // Либо (0?) - опциональный ноль перед числом
    '(0?[1-9]', // Месяцы от 1 до 9 с опциональным нулем (01-09)

    // Либо (1[0-2]) - месяцы от 10 до 12
    '|1[0-2])',

    // Конец строки
    '$'
  ].join(''))

  return monthRegex.test(month)

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
  ].join(''))

  return monthRegex.test(day)

}

const isСorrectHour = (hour) => {

  const monthRegex = new RegExp([
    // Начало строки
    '^',

    // Либо (0?) - опциональный ноль перед числом
    '(0?[1-9]', // Месяцы от 1 до 9 с опциональным нулем (01-09)

    // Либо (1[0-9]) - месяцы от 10 до 19
    '|1[0-9]',

    // Либо (1[0-9]) - месяцы от 20 до 23
    '|2[0-3])',

    // Конец строки
    '$'
  ].join(''));

  return monthRegex.test(hour);

}

const isСorrectMinute = (minute) => {

  const monthRegex = new RegExp([
    // Начало строки
    '^',

    // Либо (0?) - опциональный ноль перед числом
    '(0?[1-9]', // минуты от 1 до 9 с опциональным нулем (01-09)

    // Либо ([1-5][0-9]) - минуты от 10 до 59
    '|[1-5][0-9])',

    // Конец строки
    '$'
  ].join(''))

  return monthRegex.test(minute)

}

const isСorrectSecond = (second) => {

  const secondRegex = new RegExp([
    // Начало строки
    '^',

    // Либо (0?) - опциональный ноль перед числом
    '(0?[1-9]', // минуты от 1 до 9 с опциональным нулем (01-09)

    // Либо ([1-5][0-9]) - минуты от 10 до 59
    '|[1-5][0-9])',

    // Конец строки
    '$'
  ].join(''))

  return secondRegex.test(second)

}

const isСorrectMs = (ms) => {
  ms = Number(ms)

  return ms > -1 && ms <= 1000

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

export const getCurrentHours = () => {
  return new Date().getHours()
}

export const getCurrentMinutes = () => {
  return new Date().getMinutes()
}

export const getCurrentSeconds = () => {
  return new Date().getSeconds()
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

export const getDayName = (day = getCurrentDay(), options) => {
  day = +day
  const { lang = LOCALIZATION } = options

  if (!isСorrectDay(day)) day = getCurrentMonth()

  const obj = NAME_DAYS[lang][day]

  return obj
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

/**
 * Узнать является ли текущий день выходным
 * @param date
 * @returns {boolean}
 */
export const isWeekend = (date = false) => {

  date = getValidDate(date)

  const day = new Date(date).getDay()
  return (+day === 6 || +day === 0)
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
  * @returns {{month: string, hour: string, year: string, ms: string, day: string, minute: string, second: string}} Объект с компонентами даты и времени.
  * @returns {string} return.year - Год (4 цифры).
  * @returns {string} return.month - Месяц (2 цифры).
  * @returns {string} return.day - День (2 цифры).
  * @returns {string} return.hour - Час (2 цифры).
  * @returns {string} return.minute - Минуты (2 цифры).
  * @returns {string} return.second - Секунды (2 цифры).
  */
export const getObjDate = (date = false) => {

  date = getValidDate(date).toJSON()

  const year = date.slice(0, 4)
  const month = date.slice(5, 7)
  const day = date.slice(8, 10)
  const hour = date.slice(11, 13)
  const minute = date.slice(14, 16)
  const second = date.slice(17, 19)
  const ms = date.slice(20, 23)

  return {
    year, month, day, hour, minute, second, ms
  }
}

/**
 * Сместить дату на отрезок времени
 * @param {Object} dateObj - Объект с параметрами смещения.
 * @param {Date|string|boolean} [baseDate=false] - Базовая дата, на которую будет происходить смещение.
 * @param {Object} [options] - Опции для функции.
 * @param {string} [options.type='json'] - Тип возвращаемого значения ('date' или 'json').
 * @returns {Date|Object} - Возвращает новую дату или объект с компонентами даты в зависимости от типа.
 */
export const shiftDate = (dateObj, baseDate = false, options= {}) => {

  baseDate = getValidDate(baseDate)

  const { yy, mm, dd, hh, mi, ss, ms } = dateObj
  const { type = 'date' } = options
  let newDate = new Date(baseDate)

  if (yy && isСorrectYear(yy)) newDate = addTime(newDate, { years: yy })
  if (mm && isСorrectMonth(mm)) newDate = addTime(newDate, { months: mm })
  if (dd && isСorrectDay(dd)) newDate = addTime(newDate, { days: dd })

  if (hh) newDate = addTime(newDate, { hours: hh })
  if (mi) newDate = addTime(newDate, { minutes: mi })
  if (ss) newDate = addTime(newDate, { seconds: ss })

  if (type === 'date') return newDate
  if (type === 'json') return getObjDate(newDate)

}

/**
 * Получает форматированную строку даты на основе заданного формата.
 *
 * @param {Date|string|boolean} date - Дата, которую нужно отформатировать.
 *                                      Если не указана, используется текущая дата.
 * @param {string} format - Строка формата даты. По умолчанию 'DD.MM.YY'.
 * @returns {string} - Форматированная дата в виде строки.
 * @throws {Error} - Выбрасывает ошибку, если переданная дата некорректна.
 *
 * @example
 * // Пример использования с конкретной датой
 * const date = new Date('2021-01-01T00:30:00');
 * const formattedDate = getFormatDate(date, 'YYYY-MM-DD HH:MI:SS');
 * console.log(formattedDate); // "2001-01-01 00:30:00"
 */
export const getFormatDate = (date = false, format = 'DD.MM.YY') => {

  date = getValidDate(date).toJSON()
  const { year, month, day, hour, minute, second, ms } = getObjDate(date)

  const options = {
    YYYYY: String(year), // полный год
    YY: String(year), // полный год
    MM: String(month).padStart(2, '0'), // месяц (от 01 до 12)
    DD: String(day).padStart(2, '0'), // день (от 01 до 31)
    HH: String(hour).padStart(2, '0'), // часы (от 00 до 23)
    MI: String(minute).padStart(2, '0'), // минуты (от 00 до 59)
    SS: String(second).padStart(2, '0'), // секунды (от 00 до 59)
    MS: String(ms).padStart(3, '0') // миллисекунды (от 000 до 999)
  }

  return format.replace(/YYYY|YY|MM|DD|HH|MI|SS|MS/g, match => options[match]);

}

/**
 * Добавить вперед '0', если число состоит из одной цифры (символа)
 * @param number - число
 * @returns {string|*}
 */
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

//<!------------------------------------------------------------------------------------------------------------------->


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

/**
 * @deprecated
 */
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
 * @deprecated
 * @param value
 * @param type
 * @returns {string}
 */
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
