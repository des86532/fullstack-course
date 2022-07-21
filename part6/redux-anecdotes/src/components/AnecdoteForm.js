// import { useDispatch } from 'react-redux'
// import { createAnecdote } from '../reducers/anecdoteReducer'
// import { createNotification } from '../reducers/notificationReducer'

// const AnecdoteForm = () => {
//   const dispatch = useDispatch()

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     const anecdote = e.target.anecdote.value;
//     dispatch(createAnecdote(anecdote))
//     dispatch(createNotification(`created "${anecdote}" success !`))
//   }

//   return (
//     <>
//       <h2>create new</h2>
//       <form onSubmit={handleSubmit}>
//         <div><input name="anecdote" /></div>
//         <button>create</button>
//       </form>
//     </>
//   )
// }

// export default AnecdoteForm

import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { createNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  const handleSubmit = (e) => {
    e.preventDefault()
    const anecdote = e.target.anecdote.value;
    props.createAnecdote(anecdote)
    props.createNotification(`created "${anecdote}" success !`)
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div><input name="anecdote" /></div>
        <button>create</button>
      </form>
    </>
  )
}

const mapDispatchToProps = {
  createNotification,
  createAnecdote
}

const ConnectedAnecdote = connect(null, mapDispatchToProps)(AnecdoteForm)

export default ConnectedAnecdote