import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"
import { showNotification } from "../reducers/notificationReducer"

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const create = e => {
    e.preventDefault()
    const newAnecdote = e.target.anecdoteInput.value
    dispatch(createAnecdote(newAnecdote))
    showNotification(`you created '${newAnecdote}'`, dispatch)
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