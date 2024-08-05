import { Type } from "@/shared/lib/useTypes.js"

/**
 * Возвращает массив из указанного диапазона (промежутка) индексов.
 * @param {Array} array - Массив.
 * @param {number} [start=0] - Начальный индекс элемента (с какого элемента).
 * @param {number} [end=0] - Конечный индекс элемента (индекс по какой элемент).
 * @returns {Array} Массив элементов.
 */
export const sliceArray = (array, start = 0, end = 0) => {

  if (!Type.isArray(array) || !array.length) return []

  return array.slice(start, end)
}
/**
 * Возвращает массив из указанного диапазона (промежутка) индексов.
 * @param {Object} params - Параметры функции.
 * @param {Array} params.array - Массив.
 * @param {number} [params.start=0] - Начальный индекс элемента (с какого элемента).
 * @param {number} [params.end=0] - Конечный индекс элемента (индекс по какой элемент).
 * @returns {Array} Массив элементов.
 */
export const sliceList = (array, start = 0, end = 0) => {

  if (!Type.isArray(array) || !array.length) return []

  return array.slice(start, end)
}

/**
 * Удаление связи объекта с переменной (возвращает данные без ссылки) - упрощенно - Создает копию объекта или массива,
 * отсекая ссылки на оригинальные объекты.
 * @param {*} data - Объект или массив для копирования.
 * @returns {*} Копия данных без ссылок или false, если передан не объект и не массив.
 */
export const parse = (data) => {
  if (!Type.isObject(data) && !Type.isArray(data)) return false
  return JSON.parse(JSON.stringify(data))
}
/**
 * Удаление связи объекта с переменной (возвращает данные без ссылки) - упрощенно - Создает копию объекта или массива,
 * отсекая ссылки на оригинальные объекты.
 * @param {*} data - Объект или массив для копирования.
 * @returns {*} Копия данных без ссылок или false, если передан не объект и не массив.
 */
export const part = (data) => {
  if (!Type.isObject(data) && !Type.isArray(data)) return false
  return JSON.parse(JSON.stringify(data))
}
/**
 * Удаление связи объекта с переменной (возвращает данные без ссылки) -
 * упрощенно - отделяет данные от родителя создает новый контейнер данных
 * @param {*} data - Объект или массив для копирования.
 * @returns {*} Копия данных без ссылок или false, если передан не объект и не массив.
 */
export const separate = (data) => {
  if (!Type.isObject(data) && !Type.isArray(data)) return false
  return JSON.parse(JSON.stringify(data))
}
/**
 * Удаление связи объекта с переменной (возвращает данные без ссылки) - упрощенно - Создает копию объекта или массива,
 * отсекая ссылки на оригинальные объекты.
 * @param {*} data - Объект или массив для копирования.
 * @returns {*} Копия данных без ссылок или false, если передан не объект и не массив.
 */
export const pattern = (data) => {
  if (!Type.isObject(data) && !Type.isArray(data)) return false
  return JSON.parse(JSON.stringify(data))
}

// TODO - написать
// Глубокое копирование, возвращает данные без ссылки, продвинутое
// data - данные
export const deepCopy = (data) => {

}

/**
 * Выполняет глубокое сравнение двух объектов на равенство (эквивалентность).
 *
 * @param {Object[]} objs - Массив, содержащий два объекта для сравнения.
 * @param {Object} [options={}] - Опции для настройки сравнения.
 * @param {string[]} [options.ignoreKeys=[]] - Массив ключей, которые следует игнорировать при сравнении.
 * @param {boolean} [options.strict=true] - Указывает, следует ли использовать строгое сравнение (===) для примитивов.
 * @param {number} [options.maxDepth=Infinity] - Максимальная глубина рекурсии для сравнения вложенных объектов.
 * @returns {boolean} Возвращает true, если объекты эквивалентны, иначе false.
 * @throws {TypeError} Если переданные параметры не соответствуют ожидаемым типам.
 */
export const deepEqualObjects = (objs = [], options= {}) => {

  const { ignoreKeys = [], strict = true, maxDepth = Infinity } = options

  if (!Type.isArray(objs) || objs?.length !== 2) return false

  let [object1, object2] = objs

  if (!Type.isObject(object1) || !Type.isObject(object2)) return false

  // Проверка на максимальную глубину
  if (maxDepth <= 0) return false

  object1 = parse(object1)
  object2 = parse(object2)

  let keys1 = Object.keys(object1)
  let keys2 = Object.keys(object2)

  // Проверка на разное кол-во ключей
  if (keys1.length !== keys2.length) {
    return false
  }

  for (const key of keys1) {

    if (ignoreKeys.includes(key)) continue

    const val1 = object1[key]
    const val2 = object2[key]

    const areObjects = Type.isObject(val1) && Type.isObject(val2)
    const equal = strict ? val1 === val2 : val1 == val2

    if (
        ( areObjects && !deepEqualObjects([val1, val2], { ignoreKeys, strict, maxDepth: maxDepth - 1 }) ) ||
        ( !areObjects && !equal )
    ) {
      return false
    }
  }

  return true
}

/**
 * Находит пересечение элементов в переданных массивах.
 * Возвращает массив, содержащий только те элементы, которые присутствуют в каждом из переданных массивов.
 * Если передан пустой массив, не массив, или хотя бы один из элементов не является массивом, возвращает пустой массив.
 *
 * @param {Array[]} arrays - Массив массивов, для которых нужно найти пересечение.
 * @param {Object} options - Объект с дополнительными опциями.
 * @returns {Array} - Массив, содержащий пересечение элементов всех переданных массивов.
 */
export const intersectArrays = (arrays = [], options= {}) => {

  if (!arrays.every(array =>Type.isArray(array)) || !arrays.length) return []

  const { } = options

  // Начинаем с первого массива, затем последовательно фильтруем его
  // через каждый из следующих массивов
  return arrays.reduce((intersection, currentArray) => {
    return intersection.filter(value => currentArray.includes(value))
  })

}

/**
 * Вычисляет симметрическую разность множества массивов.
 * Симметрическая разность двух множеств включает элементы, которые присутствуют в одном из множеств, но не в обоих.
 *
 * @param {Array<Array<*>>} arrays - Массив массивов, для которых необходимо вычислить симметрическую разность.
 * @param {Object} options - Объект с дополнительными опциями.
 * @returns {Array<*>} - Массив, содержащий симметрическую разность всех переданных массивов.
 *
 * @example
 * // Возвращает [1, 5]
 * differenceArrays([ [1, 2, 3], [2, 3, 4], [4, 5] ]);
 *
 * @example
 * // Возвращает [1, 2, 3]
 * differenceArrays([ [1, 2, 3] ]);
 *
 * @example
 * // Возвращает []
 * differenceArrays();
 */
export const differenceArrays = (arrays, options = {}) => {

  if (!arrays.every(array =>Type.isArray(array)) || !arrays.length) return []

  const { strict = true } = options

  // Если передан только один массив, возвращаем его как есть
  if (arrays.length === 1) return arrays[0]

  // Функция для вычисления симметрической разности двух массивов
  const symmetricDifference = (arr1, arr2) => {

    const set1 = new Set(arr1)
    const set2 = new Set(arr2)

    const difference = [...set1]
        .filter(x => !set2.has(x))
        .concat( [...set2].filter(x => !set1.has(x)) )

    return difference

  }

  // Начинаем с первого массива и последовательно вычисляем симметрическую разность
  return arrays.reduce((acc, curr) => symmetricDifference(acc, curr))

}

/**
 * Удаляет дубликаты из нескольких массивов.
 *
 * @param {Array<Array>} arrays - Массив массивов, из которых нужно удалить дубликаты.
 * @returns {Array<Array>} Новый массив массивов с уникальными значениями.
 */
export const removeDuplicatesArrays = (arrays, options = {}) => {

  if (!arrays.every(array => Array.isArray(array)) || !arrays.length) return []

  const {} = options

  // Сливаем все массивы в один
  const mergedArray = [].concat(...arrays)

  // Удалить дубликаты элементов массивов
  return [...new Set(mergedArray)]

}

// TODO: описать метод
const find = (obj, item) => {
  for(let key in obj) {

    if(obj[key] && Type.isObject(obj[key])) {
      let result = find(obj[key], item)
      if(result) {
        result.unshift(key)
        return result
      }
    } else if(obj[key] === item) {
      return [key]
    }

  }
}
