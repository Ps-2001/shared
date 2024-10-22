import { Type } from "@/shared/lib/main/useTypes.js"

/**
 * Проверяет, является ли число четным
 * @param {string|number} num - число которое надо проверить
 * @returns {boolean} является ли число четным
 */
export const isNumberEven = (num) => {

    if (!Type.isNumber(+num)) return false

    return +num % 2 === 0

}
