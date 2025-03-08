import { useRef } from 'react'
import { useSelector } from 'react-redux'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const BlogList = () => {
  const createFormRef = useRef()
  const blogs = useSelector(state => state.blogs)

  return (
    <div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog}/>
      )}
      <Togglable buttonLabel='create blog' ref={createFormRef}>
        <BlogForm/>
      </Togglable>
    </div>
  )
} 

export default BlogList