import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const extractData = (promise) => {
    return promise.then(res => res.data)
}

const getAll = () => {
    const promise = axios.get(baseUrl)
    return extractData(promise)
}

const create = newContact => {
    const promise = axios.post(baseUrl, newContact)
    return promise.then(res => res.data)
}

export default { getAll, create }