import { useRef } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import BlogForm from './BlogForm'
import Togglable from './Togglable'

const BlogList = () => {
  const createFormRef = useRef()
  const blogs = useSelector(state => state.blogs)

  const linkStyle = {
    display: 'block',
    paddingTop: '.5em',
    border: '1px solid black',
    marginBottom: '.25em'
  }

  return (
    <div>
      <Togglable buttonLabel='create new' ref={createFormRef}>
        <BlogForm/>
      </Togglable>
      {blogs.map(blog =>
        <Link to={`/blogs/${blog.id}`} style={linkStyle} key={blog.id}>
          {blog.title} - {blog.author}
        </Link>
      )}
    </div>
  )
} 

export default BlogList