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
