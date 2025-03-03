import { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import loginService from './services/login'
import { successNotification, failureNotification } from './reducers/notificationReducer'
import { initBlogs } from './reducers/blogsReducer'

const App = () => {
  const blogs = useSelector(state => state.blogs)
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null)
  const dispatch = useDispatch()
  const createFormRef = useRef()

  useEffect(() => {
    dispatch(initBlogs())
  }, [])

  const handleLogin = async (username, password) => {
    try {
      const logedUser = await loginService.login(username, password)
      setUser(logedUser)
      localStorage.setItem('user', JSON.stringify(logedUser))
    } catch(error) {
      console.error(error.message)
      dispatch(failureNotification('wrong username or password'))
    }
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  const handleLike = async blog => {
    // try {
    //   await blogService.like({
    //     ...blog,
    //     user: blog.user.id,
    //     likes: blog.likes ? blog.likes + 1 : 1
    //   })
    //   loadBlogs()
    // } catch (error) {
    //   console.error(error.message)
    // }
  }

  if (user === null) {
    return (
      <>
        <Notification/>
        <LoginForm handleLogin={handleLogin}/>
      </>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification/>
      <p>{user.name} logged in<button onClick={handleLogout}>logout</button></p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} handleLike={handleLike} user={user}/>
      )}
      <Togglable buttonLabel='create blog' ref={createFormRef}>
        <BlogForm user={user}/>
      </Togglable>
    </div>
  )
}

export default App