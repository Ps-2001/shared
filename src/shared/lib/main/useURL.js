/**
 * Добавляет или обновляет query параметр в URL без перезагрузки страницы.
 * @param {Object} params - Параметры функции.
 * @param {string} params.name - Имя - ключ query-параметра.
 * @param {string} params.value - Значение query параметра.
 */
export const setQueryParam = (name, value ) => {

  const searchParams = new URLSearchParams(window.location.search)
  const newRelativePathQuery = window.location.pathname + "?" + searchParams.toString()

  searchParams.set(name, value)
  history.pushState(null, "", newRelativePathQuery)

}

/**
 * Получает значение query параметра из URL.
 * @param {Object} params - Параметры функции.
 * @param {string} params.key - Название параметра, значение которого нужно получить.
 * @returns {string|null} Возвращает значение параметра, если оно существует, иначе null.
 */
export const getQueryParam = (key) => {

  if (!key) return null

  const urlParams = new URLSearchParams(window.location.search)
  return urlParams.get(key)

}

/**
 * Перезагружает текущую страницу.
 */
export const reloadPage = () => {
  location.reload()
}

/**
 * Перенаправляет пользователя на указанный URL.
 * @param {Object} params - Параметры функции.
 * @param {string} params.url - Путь к сайту, на который нужно перенаправить пользователя.
 * @returns {boolean} Возвращает false, если URL не указан.
 */
export const redirect = (url) => {

  if (!url) return

  window.location.href = url

}
