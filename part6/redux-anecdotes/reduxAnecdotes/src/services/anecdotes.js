import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async content => {
  const response = await axios.post(baseUrl, { content, votes: 0 })
  return response.data
}

const vote = async id => {
  const { data: target } = await axios.get(`${baseUrl}/${id}`)
  const updated = { ...target, votes: target.votes + 1}
  const response = await axios.put(`${baseUrl}/${updated.id}`, updated)
  return response.data
}

export default { getAll, createNew, vote }