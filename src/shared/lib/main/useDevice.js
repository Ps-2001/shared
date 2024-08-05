import { DESKTOPS, MOBILES, GAME_CONSOLES } from "@/shared/config";

/**
 * Проверяет, является ли текущее устройство ПК.
 * @returns {boolean} Возвращает true, если устройство мобильное, иначе false.
 */
export const isDesktopDevice = () => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera
    return DESKTOPS.test(userAgent)
}

/**
 * Проверяет, является ли текущее устройство мобильным (смартфоном).
 * @returns {boolean} Возвращает true, если устройство мобильное, иначе false.
 */
export const isMobileDevice = () => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera
    return MOBILES.test(userAgent)
}

/**
 * Проверяет, является ли текущее устройство игровой приставкой.
 * @returns {boolean} Возвращает true, если устройство мобильное, иначе false.
 */
export const isGameConsoleDevice = () => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera
    return GAME_CONSOLES.test(userAgent)
}
/**
 * Переключает отображение страницы в полноэкранный режим или выходит из него.
 * @param {boolean|null} [state=null] - Если true, включает полноэкранный режим, если false, выходит из полноэкранного режима,
 *                                             если null, переключает состояние.
 */
export const toggleFullScreen = (state = null) => {

    const isFullScreen = document.fullscreenElement !== null

    if (state === true) {
        document.documentElement.requestFullscreen()
    } else if (state === false && isFullScreen) {
        document.exitFullscreen()
    } else if (state === null) {
        isFullScreen ? document.exitFullscreen() : document.documentElement.requestFullscreen()
    }

}
