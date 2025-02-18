import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    setAnecdotes(state, action) {
      return action.payload
    },
    appendAnecdote(state, action) {
      console.log(action.payload)
      return state.concat(action.payload)
    },
    updateAnecdote(state, action) {
      const updated = action.payload
      return state.map(a => a.id === updated.id ? updated : a)
    },
  }
})

export const { setAnecdotes, appendAnecdote, updateAnecdote} = anecdoteSlice.actions

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

export const voteAnecdote = id => {
  return async dispatch => {
    const response = await anecdoteService.vote(id)
    dispatch(updateAnecdote(response))
  }
}

export default anecdoteSlice.reducer