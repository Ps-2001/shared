/**
 * Получить переменную окружения по названию
 * @param {string} key - Название переменной окружения без префикса VITE_
 * @returns {string} - Значение переменной окружения
 * @throws {Error} - Если переменная окружения не найдена
 */
export const getEnvVariable = (key) => {

    const name = `VITE_${key}`

    if (import.meta.env[name] === undefined) {
        throw new Error(`Переменная окружения ${name} не найдена`)
    }

    return import.meta.env[name]
}
