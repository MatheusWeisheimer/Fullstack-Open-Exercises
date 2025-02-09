import { useState } from "react"
import blogService from '../services/blogs'

const Blog = ({ blog, loadBlogs, user }) => {
  const [detailsVisible, setDetailsVisible] = useState(false)
  const detailDisplay = { display: detailsVisible ? '' : 'none' }

  const toggleVisibility = () => {
    setDetailsVisible(!detailsVisible)
  }

  const handleLike = async () => {
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

  const handleRemove = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        await blogService.remove(user.token, blog)
        loadBlogs()
      } catch (error) {
        console.error(error.message)
      }
    }
  }

  return (
    <div style={{ border: '2px solid black', paddingTop: '.5em', marginBottom: '.33em'}}>
      {blog.title} {blog.author} <button onClick={toggleVisibility}>{detailsVisible ? 'hide' : 'view'}</button>
      <div style={detailDisplay}>
        <div>{blog.url}</div>
        <div>likes {blog.likes}<button onClick={handleLike}>like</button></div>
        <div>{blog.user.name}</div>
        {user.username === blog.user.username && <button onClick={handleRemove}>remove</button>}
      </div>
    </div>  
  )
}

export default Blog