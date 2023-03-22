import { useQuery, useMutation, useQueryClient } from 'react-query'
import { useNotification } from './NotificationContext'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnecdotes, createAnecdote, updateAnecdote } from './requests'

const App = () => {
  const queryClient = useQueryClient()
  const { setNotification, clearNotification } = useNotification()

  const addAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: () => {
      const message = 'Anecdote added successfully!'
      setNotification({ message })
      setTimeout(() => clearNotification(), 5000)
      queryClient.invalidateQueries('anecdotes')
    },
    onError: (error) => {
      const message = 'too short anecdote, must have length 5 or more'
      setNotification({ message })
      setTimeout(() => clearNotification(), 5000)
    }
  })

  const getId = () => (100000 * Math.random()).toFixed(0)

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    addAnecdoteMutation.mutate({ content, id: getId(), votes: 0 })
  }

  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: (anecdote) => {
      const message = `Voted anecdote ${anecdote.content}`
      setNotification({ message })
      setTimeout(() => clearNotification(), 5000)
      queryClient.invalidateQueries('anecdotes')
    },
  })

  const handleVote = (anecdote) => {
    console.log(anecdote)
    updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1})
  }

  const result = useQuery('anecdotes', getAnecdotes, {
    retry: 1,
  })

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  if (result.isError) {
    return (
      <span>
        anecdote service not available due to problems in server:{' '}
        {result.error.message}
      </span>
    );
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm addAnecdote={addAnecdote} />
    
      {anecdotes
        .sort((a, b) => b.votes - a.votes)
        .map(anecdote =>
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
