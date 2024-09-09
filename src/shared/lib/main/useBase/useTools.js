/**
 * Проверяет, находится ли число (value) в указанном диапазоне.
 * @param {number} value - Значение, которое нужно проверить.
 * @param {number} min - Минимальное значение диапазона.
 * @param {number} max - Максимальное значение диапазона.
 * @returns {boolean} Возвращает true, если число находится в диапазоне, иначе false.
 */
import {Type} from "@/shared/lib/main/useTypes.js"

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

/**
 * Получить диапазон чисел в виде массива.
 *
 * Если передан только параметр `start`, диапазон будет от 0 до `start`.
 * Если `step` не является положительным числом, он по умолчанию равен 1.
 *
 * @param {number} start - Начало диапазона. Если `end` не определен, `start` считается `end`, и диапазон начинается с 0.
 * @param {number} [end] - Конец диапазона.
 * @param {number} [step=1] - Шаг между числами в диапазоне (положительное число).
 * @returns {number[]} Массив, содержащий числа в указанном диапазоне.
 */
export const range = (start, end, step = 1) => {

    if (start === undefined && end === undefined) return []

    if (Type.isNumber(+start) && !Type.isNumber(+end)) {
        end = start
        start = 0
    }

    if (+start > +end) return []

    if (!Type.isNumber(+step) || +step <= 0) step = 1

    const result = []

    for (let i = start; i < end; i += step) {
        result.push(i)
    }

    return result

}

export const calculation = ({  }) => {

}
