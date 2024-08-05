import packageProject from '../../../package'
import { getEnvVariable } from "@/shared/lib/main/useConfig"

export const VERSION = packageProject.version || '1.0.0'
export const LOCALIZATION = getEnvVariable('LOCALIZATION') || 'ru'
