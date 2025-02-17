import { createSlice } from "@reduxjs/toolkit"

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteAnecdote(state, action) {
      const targetAnecdote = state.find(a => a.id === action.payload)
      const modifiedAnecdote = { ...targetAnecdote, votes: targetAnecdote.votes + 1 }
      return state.map(a => a.id === modifiedAnecdote.id ? modifiedAnecdote : a)
    },
    createAnecdote(state, action) {
      return state.concat(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { voteAnecdote, createAnecdote, setAnecdotes} = anecdoteSlice.actions
export default anecdoteSlice.reducer