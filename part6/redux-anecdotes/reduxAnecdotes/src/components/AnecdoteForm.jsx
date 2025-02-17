import { useDispatch } from 'react-redux'
import anecdoteService from '../services/anecdotes'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from "../reducers/notificationReducer"

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const create = async e => {
    e.preventDefault()
    const anecdoteObj = await anecdoteService.createNew(e.target.anecdoteInput.value)
    dispatch(createAnecdote(anecdoteObj))
    showNotification(`you created '${anecdoteObj.content}'`, dispatch)
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