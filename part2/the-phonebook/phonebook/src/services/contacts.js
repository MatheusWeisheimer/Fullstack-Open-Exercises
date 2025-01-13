import axios from 'axios'

const baseUrl = '/api/persons'

const extractData = (promise) => {
    return promise.then(res => res.data)
}

const getAll = () => {
    const promise = axios.get(baseUrl)
    return extractData(promise)
}

const create = newContact => {
    const promise = axios.post(baseUrl, newContact)
    return extractData(promise)
}

const remove = id => {
    const promise = axios.delete(`${baseUrl}/${id}`)
    return extractData(promise)
}

const update = (id, newContact) => {
    const promise = axios.put(`${baseUrl}/${id}`, newContact)
    return extractData(promise)
}

export default { getAll, create, remove, update }