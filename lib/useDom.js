// Изменить значение поля ввода
// selector - class или id
// value - значение

import { Type } from "@/shared/lib/useTypes.js"

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
 * Прокручивает содержимое элемента в заданной ориентации
 * @param {Object} params - Параметры функции.
 * @param {HTMLElement} params.elem - Элемент, содержимое которого нужно прокрутить.
 * @param {string} params.orin - Ориентация прокрутки ('gor' - горизонтально, 'ver' - вертикально).
 * @param {number} [params.value=0] - Значение прокрутки.
 * @param {boolean} [params.smooth=false] - Плавность прокрутки.
 */
export const elemScroll = ({ elem, orin, value = 0, smooth = false }) => {

  if (!elem || !orin || !value) return

  if (!Type.isDomElem(elem)) return

  smooth ? elem.style.behavior = 'smooth' :  elem.style.behavior = 'auto'

  switch (orin) {
    case 'gor': elem.scrollLeft += value; break
    case 'ver': elem.scrollTop += value; break
  }

}

/**
 * Прокручивает страницу к заданному элементу.
 * @param {Object} params - Параметры функции.
 * @param {HTMLElement} params.elem - Элемент, к которому нужно прокрутить страницу.
 * @param {boolean} [params.smooth] - Плавность прокрутки.
 */
export const scrollToElem = ({ elem, smooth }) => {

  if (!elem) return

  if (!Type.isDomElem(elem)) return

  const behavior = smooth ? 'smooth' : 'auto'

  elem.scrollIntoView({ behavior })

}