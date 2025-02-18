import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from "../reducers/notificationReducer"

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const create = async e => {
    e.preventDefault()
    const content = e.target.anecdoteInput.value
    dispatch(createAnecdote(content))
    dispatch(showNotification(`you created '${content}'`))
    e.target.anecdoteInput.value = ''
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={(e) => create(e)}>
          <div><input name='anecdoteInput'/></div>
          <button>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm