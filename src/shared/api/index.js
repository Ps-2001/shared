import axios from "axios"
import { API_URL } from "@/shared/config/api"

export const api = async payload => {

    const { url, endPoint } = payload

    try {

        let address

        if (endPoint) {

            if (url) {
                address = `${url}/${endPoint}`
            } else {
                address = `${API_URL}/${endPoint}`
            }

        } else {
            address = API_URL
        }

        const res = await axios({ ...payload, url: address }).result

        devLog({ res })

        if (!res.ok) throw new Error(`API request failed with status ${res.status}`)

        return res

    } catch (error) {

        console.error("API call failed:", error)
        throw error

    }

}
