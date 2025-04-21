import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { likeBlog, deleteBlog } from '../reducers/blogsReducer'
import CommentForm from './CommentForm'

const Blog = () => {
  const id = useParams().id
  const blog = useSelector(state => state.blogs.find(blog => blog.id === id))
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  if (!blog) {
    return null
  }

  const commentsJsx = blog.comments.map((comment, i) => <li key={i}>{comment}</li>)

  const handleRemove = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBlog(user.token, blog))
    }
  }

  const handleLike = () => {
    dispatch(likeBlog(blog))
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <p>
        {blog.likes} likes <button onClick={handleLike} className='likeBtn'>like</button>
      </p>
      <p>added by {blog.author}</p>
      {user && user.username === blog.user.username && <button onClick={handleRemove}>remove</button>}
      <h2>comments</h2>
      <CommentForm/>
      { commentsJsx.length ? <ul>{commentsJsx}</ul> : <p>no comments yet</p> }
    </div>
  )
}

export default Blog