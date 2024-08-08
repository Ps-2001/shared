import { Type } from "@/shared/lib/main/useTypes.js"

/**
 * Изменяет значение поля ввода на заданное
 * или генерирует случайное слово из русского алфавита, если значение не задано.
 * @param {string} selector - Класс или идентификатор элемента, значение которого нужно изменить.
 * @param {string} [value] - Значение, которое необходимо установить для поля ввода.
 */
export const changeInputValue = (selector, value) => {
  let alphabet = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя', word = '';

  if (!value)
    for (let i = 0; i < 6; i++) word += alphabet[Math.round(Math.random() * (alphabet.length - 1))];

  else
    word = value

  const input = document.querySelector(selector)
  input.value = word
  input.dispatchEvent(new Event('input'));
}

/**
 * Прокручивает содержимое элемента в заданной ориентации.
 * @param {HTMLElement} elem - Элемент, содержимое которого нужно прокрутить.
 * @param {number} [value=0] - Значение прокрутки.
 * @param {Object} [options={}] - Дополнительные параметры.
 * @param {string} [options.orin='gor'] - Ориентация прокрутки ('gor' - горизонтально, 'ver' - вертикально).
 * @param {boolean} [options.smooth=false] - Указывает, использовать ли плавную прокрутку.
 */
export const elemScroll = (elem, value = 0, options = {}) => {

  const { orin = 'gor',  smooth = true } = options

  if (!elem || !value) return

  if (!Type.isDomElem(elem)) return

  smooth ? elem.style.behavior = 'smooth' :  elem.style.behavior = 'auto'

  switch (orin) {
    case 'gor': elem.scrollLeft += value; break
    case 'ver': elem.scrollTop += value; break
  }

  elem.style.behavior = 'auto'

}

/**
 * Прокручивает страницу к заданному элементу.
 * @param {HTMLElement} elem - Элемент, к которому нужно прокрутить страницу.
 * @param {Object} [options={}] - Дополнительные параметры.
 * @param {boolean} [options.smooth=true] - Указывает, использовать ли плавную прокрутку.
 */
export const scrollToElem = (elem,  options = {}) => {

  const { smooth = true } = options

  if (!elem) return

  if (!Type.isDomElem(elem)) return

  const behavior = smooth ? 'smooth' : 'auto'

  elem.scrollIntoView({ behavior })

  elem.style.behavior = 'auto'

}
