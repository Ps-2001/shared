/**
 * Использовать функцию единожды после указанного времени (задержки).
 * @param {Function} func - Функция, которую необходимо вызвать.
 * @param {number} delay - Задержка перед вызовом функции в миллисекундах.
 * @returns {Function} Функция, которая будет вызвана после задержки.
 */
export const debounce = (func, delay) => {
    let timeoutId

    return function (...args) {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => func(...args), delay)
    }

}

// Композиция функций, вызывать функции по порядку
export const compose = () => {

}

export const pipe = () => {

}

export const curry = () => {

}


/**
 * Создает задержку (остановку) скрипта на указанное количество миллисекунд
 *
 * @param {number} ms - Время задержки (мс.)
 * @returns {Promise<unknown>} Промис
 *
 * @example
 * const get = async () => {
 *     console.log('Начало работы')
 *     await delay(2000)
 *     console.log('Прошло 2 секунды')
 * }
 *
 * get()
 */
export const delay = ms => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve()
        }, ms)
    })
}
