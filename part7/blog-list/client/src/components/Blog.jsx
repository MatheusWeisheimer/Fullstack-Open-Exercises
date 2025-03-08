import PropTypes from 'prop-types'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, deleteBlog } from '../reducers/blogsReducer'

const Blog = ({ blog }) => {
  const [detailsVisible, setDetailsVisible] = useState(false)
  const detailDisplay = { display: detailsVisible ? '' : 'none' }

  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const toggleVisibility = () => {
    setDetailsVisible(!detailsVisible)
  }

  const handleRemove = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBlog(user.token, blog))
    }
  }

  const handleLike = () => {
    dispatch(likeBlog(blog))
  }

  return (
    <div style={{ border: '2px solid black', paddingTop: '.5em', marginBottom: '.33em' }} className='blog'>
      {blog.title} {blog.author} <button onClick={toggleVisibility} className='toggleBtn'>{detailsVisible ? 'hide' : 'view'}</button>
      <div style={detailDisplay} className='detail'>
        <div>{blog.url}</div>
        <div>likes {blog.likes}<button onClick={handleLike} className='likeBtn'>like</button></div>
        <div>{blog.user.name}</div>
        {user.username === blog.user.username && <button onClick={handleRemove}>remove</button>}
      </div>
    </div>
  )
}

export default Blog