import axios from 'axios'

const baseUrl = 'https://restcountries.com/v3.1/name/'

const getCountries = input => {
    const promise = axios.get(`${baseUrl}${input}`)
    return promise.then(res => res.data)
}

export default { getCountries }