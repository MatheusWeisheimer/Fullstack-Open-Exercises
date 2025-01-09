import axios from "axios";

const api_key = import.meta.env.VITE_WEATHER__KEY
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather'

const getWeather = ([lat, lon]) => {
    const promise = axios.get(`${baseUrl}?lat=${lat}&lon=${lon}&appid=${api_key}`)
    return promise.then(res => res.data)
}

export default { getWeather }