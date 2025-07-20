import axios from 'axios'
export const FetchApi = async () => {
        const url = 'https://de1.api.radio-browser.info/json/stations/bycountry/Peru'
        const {data} = await axios.get(url)
        console.log(typeof data)
        console.log(data)
}
