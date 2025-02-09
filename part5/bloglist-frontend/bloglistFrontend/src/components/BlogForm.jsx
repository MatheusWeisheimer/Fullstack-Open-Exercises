import { useState } from 'react'

const BlogForm = ({ handleCreate }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    const res = await handleCreate({ title, author, url })
    if (res !== null) {
      setTitle('')
      setAuthor('')
      setUrl('')
    }
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={(e) => handleFormSubmit(e)}>
        <div>
            title:<input
            value={title}
            onChange={({ target }) => setTitle(target.value)}/>
        </div>
        <div>
            author:<input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}/>
        </div>
        <div>
            url:<input
            value={url}
            onChange={({ target }) => setUrl(target.value)}/>
        </div>
        <button>create</button>
      </form>
    </>
  )
}

export default BlogForm