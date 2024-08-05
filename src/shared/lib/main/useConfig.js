export const getEnvVariable = (key) => {

    if (import.meta.env[key] === undefined) {
        throw new Error(`Переменная окружения не найдена`);
    }

    return import.meta.env[key]
}
