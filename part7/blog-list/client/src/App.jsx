import { useEffect } from 'react'
import { Routes, Route, useMatch } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { initBlogs } from './reducers/blogsReducer'
import { logout } from './reducers/userReducer'
import BlogList from './components/BlogList'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import UsersInfo from './components/UsersInfo'
import User from './components/User'

const App = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

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
      <Routes>
        <Route path='/blogs' element={<BlogList/>}/>
        <Route path='/blogs/:id' element={<Blog/>}/>
        <Route path='/users' element={<UsersInfo/>}/>
        <Route path='/users/:id' element={<User/>}/>        
      </Routes> 
    </div>
  )
}

export default App