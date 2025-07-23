import axios from 'axios'
import { RadiosSchema } from '../schema/RadioSchema'
export const FetchApi = async () => {
        const url = 'https://de1.api.radio-browser.info/json/stations/bycountry/Peru'
        const { data } = await axios.get(url)

        const result = RadiosSchema.safeParse(data)

        if (result.success) {
                return result.data
        }

}
