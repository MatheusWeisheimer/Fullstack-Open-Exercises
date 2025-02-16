import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const create = e => {
    e.preventDefault()
    const newAnecdote = e.target.anecdoteInput.value
    dispatch(createAnecdote(newAnecdote))
  }

  return (
    <form onSubmit={(e) => create(e)}>
        <div><input name='anecdoteInput'/></div>
        <button>create</button>
    </form>
  )
}

export default AnecdoteForm