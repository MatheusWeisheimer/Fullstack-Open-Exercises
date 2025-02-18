import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteAnecdote(state, action) {
      const targetAnecdote = state.find(a => a.id === action.payload)
      const modifiedAnecdote = { ...targetAnecdote, votes: targetAnecdote.votes + 1 }
      return state.map(a => a.id === modifiedAnecdote.id ? modifiedAnecdote : a)
    },
    appendAnecdote(state, action) {
      console.log(action.payload)
      return state.concat(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { voteAnecdote, appendAnecdote, setAnecdotes} = anecdoteSlice.actions

export const initAnecdotes = () => {
  return async dispatch => {
    const response = await anecdoteService.getAll()
    dispatch(setAnecdotes(response))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const response = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(response))
  }
}

export default anecdoteSlice.reducer