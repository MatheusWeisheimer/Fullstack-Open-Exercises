import { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { initBlogs } from './reducers/blogsReducer'
import { logout } from './reducers/userReducer'
import BlogList from './components/BlogList'
import NavMenu from './components/NavMenu'
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

  return (
    <div>
      <NavMenu/>
      <h2>blog app</h2>
      <Notification/>
      <Routes>
        <Route path='/blogs' element={<BlogList/>}/>
        <Route path='/blogs/:id' element={<Blog/>}/>
        <Route 
          path='/users' 
          element={user ? <UsersInfo/> : <Navigate replace to='/login'/>}
        />
        <Route 
          path='/users/:id' 
          element={user ? <User/> : <Navigate replace to='/login'/>}
        />
        <Route path='/login' element={<LoginForm/>}/>        
      </Routes> 
    </div>
  )
}

export default App