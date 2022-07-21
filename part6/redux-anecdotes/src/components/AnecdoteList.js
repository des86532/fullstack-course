import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateAnecdote, initializeAnecdotes } from '../reducers/anecdoteReducer'
import { createNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state =>
    state.filter
      ? state.anecdotes.filter((anecdote) =>
          anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
        )
      : state.anecdotes
  )
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    dispatch(updateAnecdote(anecdote))
    dispatch(createNotification(`You voted "${anecdote.content}"`))
  }

  useEffect(() => {
    dispatch(initializeAnecdotes());
  }, [dispatch])

  const sortAnecdotes = [...anecdotes].sort((a, b) => a.votes - b.votes)
  return (
    <>
      {sortAnecdotes.map(anecdote =>
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
    </>
  )
}

export default AnecdoteList