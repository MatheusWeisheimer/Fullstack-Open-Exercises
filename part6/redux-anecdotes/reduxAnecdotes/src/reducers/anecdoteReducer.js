const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const sortByVotes = anecdotes => {
  return anecdotes.sort((a, b) => b.votes - a.votes)
}

const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)

  let newState = undefined

  switch(action.type) {
    case 'VOTE': {
      const targetAnecdote = state.find(a => a.id === action.payload.id)
      const modifiedAnecdote = { ...targetAnecdote, votes: targetAnecdote.votes + 1 }
      newState = state.map(a => a.id === modifiedAnecdote.id ? modifiedAnecdote : a)
    } break
    case 'CREATE': {
      const newAnecdote = action.payload.anecdote
      newState = state.concat(newAnecdote)
    } break
    default: return state
  }

  return sortByVotes(newState)
}

export const voteAnecdote = id => {
  return {
    type: 'VOTE',
    payload: { id }
  }
}

export const createAnecdote = newAnecdote => {
  const anecdote = asObject(newAnecdote)
  return {
    type: 'CREATE',
    payload: { anecdote }
  }
}

export default reducer