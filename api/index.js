import axios from "axios"
import { API_URL } from "@/shared/api/config.js"

export const api = async payload => {

    const { url, endPoint } = payload

    try {

        const address = endPoint
                        ? url
                            ? `${url}/${endPoint}`
                            :`${API_URL}/${endPoint}`
                        : API_URL
        const res = await axios({ ...payload, url: address }).result
        devLog({ res })

        if (!res.ok) throw new Error(`API request failed with status ${response.status}`)

        return res

    } catch (error) {

        console.error("API call failed:", error)
        throw error

    }


}