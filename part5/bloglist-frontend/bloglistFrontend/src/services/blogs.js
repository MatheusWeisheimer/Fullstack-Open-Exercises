import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)  
  return request.then(response => response.data)
}

const create = (token, blog) => {
  const headers = { 'Authorization': `Bearer ${token}`}

  const request = axios.post(baseUrl, blog, { headers })
  return request.then(res => res.data)
}

const like = async blog => {
  const response = await axios.put(`${baseUrl}/${blog.id}`, blog)
  return response.data
}

export default { getAll, create, like }