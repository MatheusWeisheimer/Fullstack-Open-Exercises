import { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import loginService from './services/login'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null)
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = async (username, password) => {
    try {
      const logedUser = await loginService.login(username, password)
      setUser(logedUser)
      localStorage.setItem('user', JSON.stringify(logedUser))
    } catch(error) {
      console.error(error.message)
      displayNotification('failure', 'wrong username or password')
    }
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  const handleCreate = async (blog) => {
    try {
      const savedBlog = await blogService.create(user.token, blog)
      blogService.getAll().then(blogs => setBlogs(blogs))
      displayNotification('success', `a new blog '${savedBlog.title}' by '${savedBlog.author}' added!`)
      return savedBlog
    } catch(error) {
      console.error(error.message)
      displayNotification('failure', 'you must fill every field before submitting')
      return null
    }
  }

  const displayNotification = (status, message) => {
    setNotification({status, message})
    setTimeout(() => {
      setNotification(null)
    }, 3500)
  }

  if (user === null) {
    return (
      <>
        {notification && <Notification notification={notification}/>}
        <LoginForm handleLogin={handleLogin}/>
      </>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      {notification && <Notification notification={notification}/>}
      <p>{user.name} logged in<button onClick={handleLogout}>logout</button></p>
      {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
      )}
      <BlogForm handleCreate={handleCreate}/>
    </div>
  )
}

export default App