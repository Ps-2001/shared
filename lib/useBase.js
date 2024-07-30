/**
 * Проверяет, находится ли число (value) в указанном диапазоне.
 * @param {Object} params - Параметры функции.
 * @param {number} params.value - Значение, которое нужно проверить.
 * @param {number} params.min - Минимальное значение диапазона.
 * @param {number} params.max - Максимальное значение диапазона.
 * @returns {boolean} Возвращает true, если число находится в диапазоне, иначе false.
 */
export const isInRange = ({ value, min, max }) => {
    // Проверяем, что все параметры определены
    if (value == null || min == null || max == null) {
        return false
    }

    // Проверяем, что все параметры являются числами
    if (![value, min, max].every(Number.isFinite)) {
        return false
    }

    // Проводим сравнение
    return value >= min && value <= max
}

/**
 * Генерирует случайное целое число в указанном диапазоне.
 * @param {Object} params - Параметры функции.
 * @param {number} [params.min=0] - Минимальное значение диапазона.
 * @param {number} [params.max=0] - Максимальное значение диапазона.
 * @returns {number} Случайное целое число в заданном диапазоне.
 */
export const rand = ({ min = 0, max = 0 }) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


export const calculation = ({  }) => {

}

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