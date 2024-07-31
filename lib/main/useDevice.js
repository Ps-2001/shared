import { MOBILES } from "@/shared/config";

/**
 * Проверяет, является ли текущее устройство мобильным (смартфоном).
 * @returns {boolean} Возвращает true, если устройство мобильное, иначе false.
 */
export const isMobileDevice = () => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera
    return MOBILES.test(userAgent)
}


/**
 * Переключает отображение страницы в полноэкранный режим или выходит из него.
 * @param {Object} params - Параметры функции.
 * @param {boolean|null} [params.state=null] - Если true, включает полноэкранный режим, если false, выходит из полноэкранного режима,
 *                                             если null, переключает состояние.
 *                                             [true - в полноэкранный, false - в обычный, null - переключить]
 */
export const toggleFullScreen = ({ state = null }) => {

    if (state === true) return document.documentElement.requestFullscreen()
    if (state === false) return document.fullscreenElement ? document.exitFullscreen() : null


    if (!document.fullscreenElement) document.documentElement.requestFullscreen()

    else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }

}

export const isDev = () => {
    return __VUE_PROD_DEVTOOLS__
}