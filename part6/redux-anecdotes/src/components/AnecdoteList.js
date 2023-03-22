import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { showNotification} from '../reducers/notificationReducer'

const AnecdoteList = () => {

    const anecdotes = useSelector(state => 
        state.filter === 'ALL' 
        ? state.anecdotes.sort((a, b) => b.votes - a.votes)
        : state.anecdotes.filter(anecdote =>
            anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
          ).sort((a, b) => b.votes - a.votes)
    )

    const dispatch = useDispatch()

    const vote = (anecdote) => {
        console.log('vote', anecdote.id)
        dispatch(voteAnecdote(anecdote))
        dispatch(showNotification(`You voted anecdote '${anecdote.content}'`, 5))
    }

    return (
        <div>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => vote(anecdote)}>vote</button>
                </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList