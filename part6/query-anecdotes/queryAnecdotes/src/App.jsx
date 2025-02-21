import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAll, voteAnecdote } from './requests'
import { useNotificationDispatch } from './NotificationContext'
import { setNotification } from './NotificationContext'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

const App = () => {

  const notificationDispatch = useNotificationDispatch()
  const queryClient = useQueryClient()

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAll,
    refetchOnWindowFocus: false,
  })

  const newAnecdoteMutation = useMutation({
    mutationFn: voteAnecdote,
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      const updatedAnecdotes = anecdotes.map(a => a.id === updatedAnecdote.id ? updatedAnecdote : a)
      queryClient.setQueryData(['anecdotes'], updatedAnecdotes)
    } 
  })

  const handleVote = (anecdote) => {
    newAnecdoteMutation.mutate(anecdote)
    setNotification(notificationDispatch, `anecdote '${anecdote.content}' voted`)
  }

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
      <Notification />
      <AnecdoteForm />
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
