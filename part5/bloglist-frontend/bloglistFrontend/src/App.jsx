import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null)
  const [notification, setNotification] = useState(null)

  const createFormRef = useRef()

  useEffect(() => {
    loadBlogs()
  }, [])

  const loadBlogs = () => {
    blogService.getAll().then(blogs => {
      const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
      setBlogs(sortedBlogs)
    })
  }

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
      loadBlogs()
      displayNotification('success', `a new blog '${savedBlog.title}' by '${savedBlog.author}' added!`)
      createFormRef.current.toggleVisibility()
      return savedBlog
    } catch(error) {
      console.error(error.message)
      displayNotification('failure', 'you must fill every field before submitting')
      return null
    }
  }

  const handleLike = async blog => {
    try {
      await blogService.like({
        ...blog,
        user: blog.user.id,
        likes: blog.likes ? blog.likes + 1 : 1
      })
      loadBlogs()
    } catch (error) {
      console.error(error.message)
    }
  }

  const displayNotification = (status, message) => {
    setNotification({ status, message })
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
        <Blog key={blog.id} blog={blog} handleLike={handleLike} loadBlogs={loadBlogs} user={user}/>
      )}
      <Togglable buttonLabel='create blog' ref={createFormRef}>
        <BlogForm handleCreate={handleCreate}/>
      </Togglable>
    </div>
  )
}

export default App