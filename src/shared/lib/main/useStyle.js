import { Type } from "@/shared/lib/main/useTypes.js"
import {inlineTagsRegex, layoutSpacingRegex} from "@/shared/config/regex/styles.js"

/**
 * Получить строку CSS для padding
 * @param {Array|String} padding - Массив значений внутреннего отступа
 * @returns {string} - Строка, представляющая значения внутреннего отступа в правильном формате
 */
export const getPadding = (padding) => {

    let res = ''

    if (!Type.isArray(padding) && !Type.isString(padding)) return ''

    if (Type.isString(padding) && !layoutSpacingRegex.test(padding)) return ''

    if (Type.isString(padding) && layoutSpacingRegex.test(padding)) padding = padding.split(' ')

     switch (padding.length) {
         case 1: res = `${padding[0]}`; break
         case 2: res = `${padding[0]} ${padding[1]}`; break
         case 3: res = `${padding[0]} ${padding[1]} ${padding[2]}`; break
         case 4: res = `${padding[0]} ${padding[1]} ${padding[2]} ${padding[3]}`; break
     }

    return res

}


/**
 * Получить строку CSS для margin
 * @param {Array|String} margin - Массив значений внешнего отступа
 * @returns {string} - Строка, представляющая значения внешнего отступа в правильном формате
 */
export const getMargin = (margin) => {

    let res = ''

    if (!Type.isArray(margin) && !Type.isString(margin)) return ''

    if (Type.isString(margin) && !layoutSpacingRegex.test(margin)) return ''

    if (Type.isString(margin) && layoutSpacingRegex.test(margin)) margin = margin.split(' ')

    switch (margin.length) {
        case 1: res = `${margin[0]}`; break
        case 2: res = `${margin[0]} ${margin[1]}`; break
        case 3: res = `${margin[0]} ${margin[1]} ${margin[2]}`; break
        case 4: res = `${margin[0]} ${margin[1]} ${margin[2]} ${margin[3]}`; break
    }

    return res

}

/**
 * Проверяет, является ли указанный тег строчным (inline).
 *
 * Эта функция использует регулярное выражение для проверки,
 * содержится ли тег в списке разрешенных строчных тегов.
 *
 * @param {string} tag - Тег, который необходимо проверить.
 * @returns {boolean} Возвращает true, если тег является строчным,
 *                   в противном случае возвращает false.
 *
 * @example
 * isInlineTag('span'); // true
 * isInlineTag('div');  // false
 * isInlineTag('B');    // true
 */
export const isInlineTag = (tag) => {
    return inlineTagsRegex.test(tag)
}
