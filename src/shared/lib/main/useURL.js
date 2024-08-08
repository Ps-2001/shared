/**
 * Добавляет или обновляет query параметр в URL без перезагрузки страницы.
 * @param {string} name - Имя - ключ query-параметра.
 * @param {string} value - Значение query параметра.
 */
export const setQueryParam = (name, value ) => {

  const searchParams = new URLSearchParams(window.location.search)
  const newRelativePathQuery = window.location.pathname + "?" + searchParams.toString()

  searchParams.set(name, value)
  history.pushState(null, "", newRelativePathQuery)

}

/**
 * Получает значение query параметра из URL.
 * @param {string} key - Название параметра, значение которого нужно получить.
 * @returns {string|null} Возвращает значение параметра, если оно существует, иначе null.
 */
export const getQueryParam = (key) => {

  if (!key) return null

  const urlParams = new URLSearchParams(window.location.search)
  return urlParams.get(key)

}

/**
 * Получает значение query параметра из URL.
 * @param {string} key - Название параметра, значение которого нужно получить.
 */
export const deleteQueryParam = (key) => {

  if (!key) return null

  const url = new URL(window.location);
  url.searchParams.delete(key);
  window.history.pushState({}, '', url);

}

/**
 * Перезагружает текущую страницу.
 */
export const reloadPage = () => {
  location.reload()
}

/**
 * Перенаправляет пользователя на указанный URL.
 * @param {string} url - Путь к сайту, на который нужно перенаправить пользователя.
 * @returns {boolean} Возвращает false, если URL не указан.
 */
export const redirect = (url) => {

  if (!url) return false

  window.location.href = url

}
