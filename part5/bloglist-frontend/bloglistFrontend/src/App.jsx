import { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import loginService from './services/login'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

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
    } catch(error) {
      console.error(error.message)
      return null
    }
  }

  if (user === null) {
    return (<LoginForm handleLogin={handleLogin}/>)
  }

  return (
    <div>
      <BlogList blogs={blogs} user={user.name}/>
    </div>
  )
}

export default App