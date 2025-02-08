import { useState } from "react"
import blogService from '../services/blogs'

const Blog = ({ blog, loadBlogs }) => {
  const [detailsVisible, setDetailsVisible] = useState(false)
  const detailDisplay = { display: detailsVisible ? '' : 'none' }

  const toggleVisibility = () => {
    setDetailsVisible(!detailsVisible)
  }

  const likeBlog = async () => {
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


  return (
    <div style={{ border: '2px solid black', paddingTop: '.5em', marginBottom: '.33em'}}>
      {blog.title} {blog.author} <button onClick={toggleVisibility}>{detailsVisible ? 'hide' : 'view'}</button>
      <div style={detailDisplay}>
        <div>{blog.url}</div>
        <div>likes {blog.likes}<button onClick={likeBlog}>like</button></div>
        <div>{blog.user.name}</div>
      </div>
    </div>  
  )
}

export default Blog