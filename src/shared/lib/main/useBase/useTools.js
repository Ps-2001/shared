/**
 * Проверяет, находится ли число (value) в указанном диапазоне.
 * @param {number} value - Значение, которое нужно проверить.
 * @param {number} min - Минимальное значение диапазона.
 * @param {number} max - Максимальное значение диапазона.
 * @returns {boolean} Возвращает true, если число находится в диапазоне, иначе false.
 */
export const isInRange = (value, min, max ) => {
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
 * @param {number} [min=0] - Минимальное значение диапазона.
 * @param {number} [max=0] - Максимальное значение диапазона.
 * @returns {number} Случайное целое число в заданном диапазоне.
 */
export const rand = (min = 0, max = 0) => {
    return Math.floor(Math.random() * (max - min + 1)) + min
}


export const calculation = ({  }) => {

}
