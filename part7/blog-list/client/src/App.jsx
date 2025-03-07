import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initBlogs } from './reducers/blogsReducer'
import { logout } from './reducers/userReducer'
import { failureNotification } from './reducers/notificationReducer'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const createFormRef = useRef()

  useEffect(() => {
    dispatch(initBlogs())
  }, [])

  const handleLogout = () => {
    dispatch(logout())
  }

  if (user === null) {
    return (
      <>
        <Notification/>
        <LoginForm/>
      </>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification/>
      <p>{user.name} logged in<button onClick={handleLogout}>logout</button></p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} user={user}/>
      )}
      <Togglable buttonLabel='create blog' ref={createFormRef}>
        <BlogForm user={user}/>
      </Togglable>
    </div>
  )
}

export default App