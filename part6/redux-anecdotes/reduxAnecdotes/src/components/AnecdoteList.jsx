import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { activateNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(({anecdotes, filter}) => (
    filter 
    ? anecdotes.filter(a => a.content.includes(filter))
    : anecdotes
  ))
  const sortedAnecdotes = [ ...anecdotes ].sort((a, b) => b.votes - a.votes)

  const vote = id => {
    dispatch(voteAnecdote(id))
    const content = anecdotes.find(a => a.id === id).content
    dispatch(activateNotification(`you voted '${content}'`, 3000))
  }

  return (
    <div>
      {sortedAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList