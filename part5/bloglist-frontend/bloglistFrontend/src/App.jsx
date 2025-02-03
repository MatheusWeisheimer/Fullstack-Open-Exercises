import { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm'
import Blog from './components/Blog'
import loginService from './services/login'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = async (e, username, password) => {
    e.preventDefault()

    try {
      const logedUser = await loginService.login(username, password)
      setUser(logedUser)
      localStorage.setItem('user', JSON.stringify(logedUser))
    } catch(error) {
      console.error(error.message)
      return null
    }
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  if (user === null) {
    return (<LoginForm handleLogin={handleLogin}/>)
  }

  return (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged in<button onClick={handleLogout}>logout</button></p>
      {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App