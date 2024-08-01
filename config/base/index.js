import packageProject from 'package.json'
import { getEnvVariable } from "@/shared/lib/main/useConfig"

export const VERSION = packageProject.version || '1.0.0'
export const MOBILES = /android|avantgo|blackberry|bolt|boost|cricket|docomo|fone|hiptop|mini|mmp|mobile|palm|phone|pie|tablet|up.browser|up.link|webos|wos/;
export const DESKTOPS = /Windows|Macintosh|Linux/
export const GAME_CONSOLES = /PlayStation|Xbox|Nintendo|Switch/
export const LOCALIZATION = getEnvVariable('LOCALIZATION') || 'ru'
