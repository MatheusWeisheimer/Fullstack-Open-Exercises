import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createBlog } from '../reducers/blogsReducer'
import { TextField, Button } from '@mui/material'
import { successNotification, failureNotification } from '../reducers/notificationReducer'

const BlogForm = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    try {
      await dispatch(createBlog(user.token, { title, author, url}))
      dispatch(successNotification(`'${title}' from '${author}' added to the list of blogs`))
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (error) {
      dispatch(failureNotification('you must fill all fields to submit'))
    }
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={(e) => handleFormSubmit(e)} style={{display: 'flex', gap: '.5em'}}>
        <div>
            <TextField
            size='small'
            label='Title'
            id='title'
            value={title}
            onChange={({ target }) => setTitle(target.value)}/>
        </div>
        <div>
            <TextField
            size='small'
            label='Author'
            value={author}
            id='author'
            onChange={({ target }) => setAuthor(target.value)}/>
        </div>
        <div>
            <TextField
            size='small'
            label='Url'
            id='url'
            value={url}
            onChange={({ target }) => setUrl(target.value)}/>
        </div>
        <Button 
          variant='contained' 
          color='primary' 
          type='submit' 
          >create</Button>
      </form>
    </>
  )
}

export default BlogForm