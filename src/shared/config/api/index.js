import { getEnvVariable } from "@/shared/lib/main/useConfig"

export const API_URL = getEnvVariable('API_URL') || `https://example.com`
