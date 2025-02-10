import PropTypes from 'prop-types'
import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, handleLike, loadBlogs, user }) => {
  const [detailsVisible, setDetailsVisible] = useState(false)
  const detailDisplay = { display: detailsVisible ? '' : 'none' }

  const toggleVisibility = () => {
    setDetailsVisible(!detailsVisible)
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
    <div style={{ border: '2px solid black', paddingTop: '.5em', marginBottom: '.33em' }} className='blog'>
      {blog.title} {blog.author} <button onClick={toggleVisibility} className='toggleBtn'>{detailsVisible ? 'hide' : 'view'}</button>
      <div style={detailDisplay} className='detail'>
        <div>{blog.url}</div>
        <div>likes {blog.likes}<button onClick={() => handleLike(blog)} className='likeBtn'>like</button></div>
        <div>{blog.user.name}</div>
        {user.username === blog.user.username && <button onClick={handleRemove}>remove</button>}
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  loadBlogs: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default Blog