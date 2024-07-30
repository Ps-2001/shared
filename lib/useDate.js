import { isInRange } from "@/shared/lib/useBase.js";

// Название месяцев
export const nameMonths = {
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

// Название месяцев
export const nameDays = {
  1: { name: 'понедельник', short: 'пн' },
  2: { name: 'вторник', short: 'вт' },
  3: { name: 'среда', short: 'ср' },
  4: { name: 'четверг', short: 'чт' },
  5: { name: 'пятница', short: 'пт' },
  6: { name: 'суббота', short: 'сб' },
  7: { name: 'воскресенье', short: 'вс' },
}

// Узнать количество дней по месяцу(month) и году(year)
export const daysInMonth = ({ month, year }) => {
  return new Date(year, month, 0).getDate()
}

// Узнать является ли текущий день выходным
// date - дата (01.01.2001) ?
export const isDayWeekend = ({ date }) => {
  const day = new Date(date).getDay()
  return (+day === 6 || +day === 0)
}

// узнать какой по счету день в неделе
export const getWeekDay = ({ year, month, day = 1 }) => {
  // Воскресенье - это 7 день

  return new Date(`${year}-${month}-${day}`).getDay() === 0
      ? 7
      : new Date(`${year}-${month}-${day}`).getDay()
}

// Перевести дату в формат => 2023-07-21
// data - '21.7.2023'
export const inDate = ({ date, separate = '-' }) => {

  if (!date) return false

  let [day, month, year] = date.split(separate)

  day = totalNum(day)
  month = totalNum(month)

  return `${year}-${month}-${day}`
}

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

export const getValidMonth = ({ month = false }) => {
  if (month) return false

  if (!isInRange({ value: month, min: 1, max: 12 })) return 0

  return month
}

export const getValidDay = ({ day = false }) => {
  if (day) return false

  if (!isInRange({ value: day, min: 1, max: 31 })) return 0

  return day
}

// получить обработанные данные даты
// data - '2024-02-11T13:44:41.771Z', экземпляр Date
export const getDate1 = ({ date = false }) => {

  if (!date) date = new Date().toJSON()
  if (date instanceof Date) date = date.toJSON()

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

// Получить год-месяц-день
export const getBasic = (date = false) => {

  // console.log(date)
  const { year, month, day } = getDate1({ date })

  // console.log(`${year}-${month}-${day}`)

  return `${year}-${month}-${day}`

}

// Получить { год, месяц, день }
export const getBasicJSON = (date = false) => {

  const { year, month, day } = getDate1({ date })

  return{ year, month, day }

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

// Узнать кол-во милесукунд даты
// date - '2023-07-01'
export const getDateMs = ({ date }) => {

  if (!date) return new Date().getTime()

  return new Date(date).getTime()
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

// Добавить вперед '0', если число состоит из одной цифры (символа)
// number - число
export const totalNum = (number) => {
  if (String(number).length === 1) return `0${number}`

  return number
}

// Вычислить "завтрешний" день
// date - дата (2023-07-01), по умолчанию сегодняшняя дата
// summand - слагаемое (миллесекунды, которые надо: прибавить, отнять)
export const calculateDate = ({ date, summand }) => {

  if (!date)
    return new Date(new Date().getTime() + summand).toJSON()

  return new Date(new Date(date).getTime() + summand).toJSON()

}