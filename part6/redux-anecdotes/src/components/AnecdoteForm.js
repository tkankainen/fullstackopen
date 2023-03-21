import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { showNotification} from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const create = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(createAnecdote(content))
        dispatch(showNotification(`You created anecdote '${content}'`))
    }

    return (
        <div>
        <h2>create new</h2>
        <form onSubmit={create}>
            <input name="anecdote"/>
            <button type="submit">create</button>
        </form>
      </div>
    )
}

export default AnecdoteForm