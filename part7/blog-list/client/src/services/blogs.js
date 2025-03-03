import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (token, blog) => {
  const headers = { 'Authorization': `Bearer ${token}` }

  const response = await axios.post(baseUrl, blog, { headers })
  return response.data
}

const like = async blog => {
  const response = await axios.put(`${baseUrl}/${blog.id}`, blog)
  return response.data
}

const remove = async (token, blog) => {
  const headers = { 'Authorization': `Bearer ${token}` }

  const response = await axios.delete(`${baseUrl}/${blog.id}`, { headers })
  return response.data
}

export default { getAll, create, like, remove }