import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes/'

export const getAll = async () => {
  const { data: anecdotes } = await axios.get(baseUrl)
  return anecdotes
}

export const saveAnecdote = async anecdote => {
  const { data: savedAnecdote } = await axios.post(baseUrl, anecdote)
  return savedAnecdote
}

export const voteAnecdote = async anecdote => {
  const newData = { ...anecdote, votes: anecdote.votes + 1 }
  const { data: updatedAnecdote } = await axios.put(`${baseUrl}/${anecdote.id}`, newData)
  return updatedAnecdote
}